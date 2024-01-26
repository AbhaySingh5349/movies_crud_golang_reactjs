package main

import (
	"fmt"
	"net/http"
	"encoding/json"
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

	out, err := json.Marshal(payload)
	if err != nil {
		fmt.Println(err)
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(out)
}

func (app *application) AllMovies(w http.ResponseWriter, r *http.Request) {
/*	var movies []models.MovieStruct

	rd, _ := time.Parse("2006-01-02", "1986-03-07")

	highlander := models.MovieStruct {
		ID: 1,
		Title: "Highlander",
		ReleaseDate: rd,
		Rating: 8,
		RunTime: 116,
		Description: "A very nice movie",
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}

	movies = append(movies, highlander)

	rd, _ = time.Parse("2006-01-02", "1981-06-12")

	rotla := models.MovieStruct {
		ID: 2,
		Title: "Raiders of the Lost Ark",
		ReleaseDate: rd,
		Rating: 9,
		RunTime: 115,
		Description: "Another very nice movie",
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}

	movies = append(movies, rotla)
*/

	movies, err := app.PostgresDB.AllMovies()
	if err != nil {
		fmt.Println(err)
		return
	}

	var out []byte
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
}
