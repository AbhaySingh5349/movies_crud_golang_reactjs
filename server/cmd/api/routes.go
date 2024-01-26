package main


import (
	chi "github.com/go-chi/chi/v5"
	middleware "github.com/go-chi/chi/v5/middleware"
	"net/http"
)

// giving receiver app pointer to type application
func (app *application) routes() http.Handler {
	// create mux router
	mux := chi.NewRouter()

	// middlewares
	mux.Use(middleware.Recoverer) // when app run into panics, it logs with backtrace, send necessary headers (HTTP500) and brings things back up so that app does not grind to halt
	mux.Use(app.enableCORS)

	// execute Hello function when we are looking at root/hello level of app i.e http://localhost:8080/hello
	mux.Get("/hello", app.Hello) 

	mux.Get("/", app.Home)

	mux.Get("/movies", app.AllMovies)

	return mux;
	
}
