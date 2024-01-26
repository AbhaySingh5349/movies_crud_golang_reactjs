package main

import (
	"database/sql"
	"log"

	// normally when using go, we can't have unused imports, but library we are using is in standard library i.e db/sql 
	// which requires underlying driver to connect to specifc db
	// _ says, even though we are not explicitly using anything inside packages, we still need to include these
	_ "github.com/jackc/pgconn"
	_ "github.com/jackc/pgx/v5"
	_ "github.com/jackc/pgx/v5/stdlib"
)

// sql.DB is pointer to pool of db connections
func openDB(dsn string) (*sql.DB, error) {
	db, err := sql.Open("pgx", dsn) // pgx is driver & dsn is connection string
	if err != nil {
		return nil, err
	}

	err = db.Ping() // if we can ping db, means we are connected
	if err != nil {
		log.Println("Failed to connect to Postgres!")
		return nil, err
	}

	return db, nil
}

func (app *application) connectToDB() (*sql.DB, error) {
	connection, err := openDB(app.DataSourceName)
	if err != nil {
		return nil, err
	}

	log.Println("Connected to Postgres!")
	return connection, nil
}