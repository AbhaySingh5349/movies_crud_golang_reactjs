package main

import (
	"fmt"
	"net/http"
)

// every handler in go takes 2 args (where we write final content to be send to client, request)
func Hello(w http.ResponseWriter, r *http.Request){
	fmt.Fprint(w, "hello React_Golang app")
}