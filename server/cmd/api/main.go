package main

import (
	"flag"
	"log"
	"net/http"
	
	"server/internal/repository"
	"server/internal/repository/dbrepo"
	"time"
)

const (
	port = ":8080" // port for api to listen during development
) 

// to hold application configuration info
type application struct {
	DataSourceName string
	Domain string
	PostgresDB repository.DatabaseRepo
	auth         AuthStruct
	JWTSecret    string
	JWTIssuer    string
	JWTAudience  string
	CookieDomain string
	TmdbApiKey string
}

func main(){
	// set application config
	var app application

	// read from command line
	flag.StringVar(&app.DataSourceName, "dsn", "host=localhost port=5432 user=postgres password=postgres dbname=movies sslmode=disable timezone=UTC connect_timeout=5", "Postgres connection string")
	flag.StringVar(&app.JWTSecret, "jwt-secret", "secretstring", "signing secret") // var, key, value, help-text
	flag.StringVar(&app.JWTIssuer, "jwt-issuer", "example.com", "signing issuer")
	flag.StringVar(&app.JWTAudience, "jwt-audience", "example.com", "signing audience")
	flag.StringVar(&app.CookieDomain, "cookie-domain", "localhost", "cookie domain")
	flag.StringVar(&app.Domain, "domain", "example.com", "domain")
	flag.StringVar(&app.TmdbApiKey, "tmdb-api-key", "bef08c069204e77bfb3c3fd749b983ca", "tmdb api key")
	flag.Parse() // parse everything we read from cmd line

	// connect to db
	conn, err := app.connectToDB()
	if err != nil{
		log.Fatalf("failed to connect Postgres: %v", err)
	}
	app.PostgresDB = &dbrepo.PostgresDBRepo{DB: conn}
	defer app.PostgresDB.Connection().Close() // closing connection pool after using

	app.auth = AuthStruct{
		Issuer: app.JWTIssuer,
		Audience: app.JWTAudience,
		Secret: app.JWTSecret,
		TokenExpiry: time.Minute * 15,
		RefreshExpiry: time.Hour * 24,
		CookiePath: "/", // root-level of application
		CookieName: "go_refresh_token",
		CookieDomain: app.CookieDomain,
	}

	log.Println("Starting application on port", port)

	// start web-server
	err = http.ListenAndServe(port, app.routes())
	if err != nil {
		log.Fatal(err)
	}
}