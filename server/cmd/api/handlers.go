package main

import (
	"fmt"
	"net/http"
)

// using app is receiver (allowing handlre Hello to access all info in type applicaion)
// every handler in go takes 2 args (where we write final content to be send to client, request)
func (app *application) Hello(w http.ResponseWriter, r *http.Request){
	fmt.Fprintf(w, "hello React_Golang app from domain: %s", app.Domain)
}