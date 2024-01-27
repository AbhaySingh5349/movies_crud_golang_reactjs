package repository

import (
	"server/internal/models"
	"database/sql"
)

// in order for something to satisfy interface of type DatabaseRepo, we need to list all methods that this type must have
type DatabaseRepo interface {
	Connection() *sql.DB
	AllMovies() ([]*models.MovieStruct, error)
	GetMovieById(id int) (*models.MovieStruct, error)
	GetMovieByIdForEdit(id int) (*models.MovieStruct, []*models.GenreStruct, error)
	GetUserByEmail(email string) (*models.UserStruct, error)
	GetUserByID(id int) (*models.UserStruct, error)
	AllGenres() ([]*models.GenreStruct, error)
	InsertMovie(movie models.MovieStruct) (int, error)
	UpdateMovieGenres(id int, genreIDs []int) error
}