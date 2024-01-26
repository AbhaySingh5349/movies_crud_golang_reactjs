package main

import (
	"log"
	"net/http"
)

const (
	port = ":8080" // port for api to listen during development
) 

// to hold application configuration info
type application struct {
	Domain string
}

func main(){
	// set application config
	var app application

	app.Domain = "example.com"

	log.Println("Starting application on port", port)

	

	// start web-server
	err := http.ListenAndServe(port, app.routes())
	if err != nil {
		log.Fatal(err)
	}
}