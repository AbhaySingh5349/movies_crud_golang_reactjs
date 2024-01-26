package main

import (
	"fmt"
	"net/http"
)

type PayloadStruct struct {
	Status string `json:"status"`
	Message string `json:"message"`
	Version string `json:"version"`
}

// using app is receiver (allowing handlre Hello to access all info in type applicaion)
// every handler in go takes 2 args (where we write final content to be send to client, request)
func (app *application) Hello(w http.ResponseWriter, r *http.Request){
	fmt.Fprintf(w, "hello React_Golang Movies app from domain: %s", app.Domain)
}

func (app *application) Home(w http.ResponseWriter, r *http.Request) {
	payload := PayloadStruct{
		Status: "active",
		Message: "Reatc_Golang Movies app up and running",
		Version: "1.0.0",
	}

/*	out, err := json.Marshal(payload)
	if err != nil {
		fmt.Println(err)
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(out)
*/
	_ = app.writeJSON(w, http.StatusOK, payload)
}

func (app *application) AllMovies(w http.ResponseWriter, r *http.Request) {
	movies, err := app.PostgresDB.AllMovies()
	if err != nil {
		fmt.Println(err)
		return
	}

/*	var out []byte
	if len(movies) == 0{
		out, err = json.Marshal([]string{})
	}else{
		out, err = json.Marshal(movies)
	}
	
	if err != nil {
		fmt.Println(err)
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(out)
*/
	_ = app.writeJSON(w, http.StatusOK, movies)
}
