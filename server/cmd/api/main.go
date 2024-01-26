package main

import (
	"flag"
	"log"
	"net/http"
	
	"server/internal/repository"
	"server/internal/repository/dbrepo"
)

const (
	port = ":8080" // port for api to listen during development
) 

// to hold application configuration info
type application struct {
	DataSourceName string
	Domain string
	PostgresDB repository.DatabaseRepo
}

func main(){
	// set application config
	var app application

	// read from command line
	flag.StringVar(&app.DataSourceName, "dsn", "host=localhost port=5432 user=postgres password=postgres dbname=movies sslmode=disable timezone=UTC connect_timeout=5", "Postgres connection string")
	flag.Parse() // parse everything we read from cmd line

	// connect to db
	conn, err := app.connectToDB()
	if err != nil{
		log.Fatalf("failed to connect Postgres: %v", err)
	}
	app.PostgresDB = &dbrepo.PostgresDBRepo{DB: conn}
	defer app.PostgresDB.Connection().Close() // closing connection pool after using

	app.Domain = "example.com"

	log.Println("Starting application on port", port)

	// start web-server
	err = http.ListenAndServe(port, app.routes())
	if err != nil {
		log.Fatal(err)
	}
}