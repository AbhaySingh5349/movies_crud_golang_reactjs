package repository

import (
	"server/internal/models"
	"database/sql"
)

// in order for something to satisfy interface of type DatabaseRepo, we need to list all methods that this type must have
type DatabaseRepo interface {
	Connection() *sql.DB
	AllMovies() ([]*models.MovieStruct, error)
}