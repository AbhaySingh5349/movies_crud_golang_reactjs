package main

import (
	"fmt"
	"net/http"
	"strconv"
	"errors"

	"github.com/golang-jwt/jwt/v5"
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

func (app *application) Authenticate(w http.ResponseWriter, r *http.Request) {
	// read json payload
	var requestPayload struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	err := app.readJSON(w, r, &requestPayload)
	if err != nil {
		app.errorJSON(w, err, http.StatusBadRequest)
		return
	}

	// validate user against database
	user, err := app.PostgresDB.GetUserByEmail(requestPayload.Email)
	if err != nil {
		app.errorJSON(w, errors.New("invalid credentials"), http.StatusBadRequest)
		return
	}

	// check password
	valid, err := user.PasswordMatches(requestPayload.Password)
	if err != nil || !valid {
		app.errorJSON(w, errors.New("invalid credentials"), http.StatusBadRequest)
		return
	}

	// create a jwt user
	u := jwtUser{
		ID:        user.ID,
		FirstName: user.FirstName,
		LastName:  user.LastName,
	}

	// generate tokens
	tokens, err := app.auth.GenerateTokenPair(&u)
	if err != nil {
		app.errorJSON(w, err)
		return
	}

	// log.Println("TOKEN: ", tokens.Token)
	// log.Println("tokens.RefreshToken: ", tokens.RefreshToken)

	// w.Write([]byte(tokens.Token)) // to write token in browser window

	refreshCookie := app.auth.GetRefreshCookie(tokens.RefreshToken)
	http.SetCookie(w, refreshCookie) // sending cookie along with response

	app.writeJSON(w, http.StatusAccepted, tokens) 
}

func (app *application) RefreshToken(w http.ResponseWriter, r *http.Request) {
	// every req made by user that has cookie will include that cookie in req 
	for _, cookie := range r.Cookies() {
		if cookie.Name == app.auth.CookieName {
			claims := &Claims{}
			refreshToken := cookie.Value // if refresh token hasn't expired, we will issue new tokens

			// parse the token to get the claims
			_, err := jwt.ParseWithClaims(refreshToken, claims, func(token *jwt.Token) (interface{}, error) {
				return []byte(app.JWTSecret), nil
			})
			if err != nil {
				app.errorJSON(w, errors.New("unauthorized"), http.StatusUnauthorized)
				return
			}

			// get the user id from the token claims
			userID, err := strconv.Atoi(claims.Subject)
			if err != nil {
				app.errorJSON(w, errors.New("unknown user"), http.StatusUnauthorized)
				return
			}

			user, err := app.PostgresDB.GetUserByID(userID)
			if err != nil {
				app.errorJSON(w, errors.New("unknown user"), http.StatusUnauthorized)
				return
			}

			u := jwtUser{
				ID: user.ID,
				FirstName: user.FirstName,
				LastName: user.LastName,
			}

			tokenPairs, err := app.auth.GenerateTokenPair(&u)
			if err != nil {
				app.errorJSON(w, errors.New("error generating tokens"), http.StatusUnauthorized)
				return
			}

			http.SetCookie(w, app.auth.GetRefreshCookie(tokenPairs.RefreshToken))

			app.writeJSON(w, http.StatusOK, tokenPairs)

		}
	}
}

func (app *application) Logout(w http.ResponseWriter, r *http.Request) {
	http.SetCookie(w, app.auth.GetExpiredRefreshCookie())
	w.WriteHeader(http.StatusAccepted)
}