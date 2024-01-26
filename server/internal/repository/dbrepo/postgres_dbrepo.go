package dbrepo

import (
	"server/internal/models"
	"context"
	"database/sql"
	"time"

	"fmt"
)

// since type "PostgresDBRepo" implements required function in "DatabaseRepo interface"
// it means if we create var of type "PostgresDBRepo", by default it will be of type "DatabaseRepo interface"
type PostgresDBRepo struct {
	DB *sql.DB // ppol of db connection
}

// clients may disappear without warning (eg lost connection, close machine)
// giving 3 sec to interact with db, else close request
const dbTimeout = time.Second * 3

func (m *PostgresDBRepo) Connection() *sql.DB {
	return m.DB
}

func (m *PostgresDBRepo) AllMovies() ([]*models.MovieStruct, error) {
	ctx, cancel := context.WithTimeout(context.Background(), dbTimeout) // ctx will timeout after 3 seconds
	defer cancel()

	query := `
		select
			id, title, release_date, runtime,
			mpaa_rating, description, coalesce(image, ''),
			created_at, updated_at
		from
			movies
		order by
			title
	`

	rows, err := m.DB.QueryContext(ctx, query)
	if err != nil {
		return nil, err
	}
	defer rows.Close() // else we will run out of db connections

	var movies []*models.MovieStruct

	for rows.Next() {
		var movie models.MovieStruct
		err := rows.Scan(
			&movie.ID,
			&movie.Title,
			&movie.ReleaseDate,
			&movie.RunTime,
			&movie.MPAARating,
			&movie.Description,
			&movie.Image,
			&movie.CreatedAt,
			&movie.UpdatedAt,
		)
		if err != nil {
			return nil, err
		}

		fmt.Println("movie: ", movie)
		movies = append(movies, &movie)
	}
	fmt.Println("movies: ", movies)
	return movies, nil
}

func (m *PostgresDBRepo) GetUserByEmail(email string) (*models.UserStruct, error) {
	ctx, cancel := context.WithTimeout(context.Background(), dbTimeout)
	defer cancel()

	query := `select id, email, first_name, last_name, password,
			created_at, updated_at from users where email = $1`

	var user models.UserStruct
	row := m.DB.QueryRowContext(ctx, query, email)

	err := row.Scan(
		&user.ID,
		&user.Email,
		&user.FirstName,
		&user.LastName,
		&user.Password,
		&user.CreatedAt,
		&user.UpdatedAt,
	)

	if err != nil {
		return nil, err
	}

	return &user, nil
}

func (m *PostgresDBRepo) GetUserByID(id int) (*models.UserStruct, error) {
	ctx, cancel := context.WithTimeout(context.Background(), dbTimeout)
	defer cancel()

	query := `select id, email, first_name, last_name, password,
			created_at, updated_at from users where id = $1`

	var user models.UserStruct
	row := m.DB.QueryRowContext(ctx, query, id)

	err := row.Scan(
		&user.ID,
		&user.Email,
		&user.FirstName,
		&user.LastName,
		&user.Password,
		&user.CreatedAt,
		&user.UpdatedAt,
	)

	if err != nil {
		return nil, err
	}

	return &user, nil
}