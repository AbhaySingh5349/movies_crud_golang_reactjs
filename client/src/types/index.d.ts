export interface LoginData {
  email: string;
  password: string;
}

export interface MovieData {
  title: string;
  release_date: Date;
  runtime: number;
  mpaa_rating: string;
  description: string;
  genre_Action: boolean;
  genre_Adventure: boolean;
  genre_Animation: boolean;
  genre_Comedy: boolean;
  genre_Drama: boolean;
  genre_Fantasy: boolean;
  genre_Horror: boolean;
  genre_Mystery: boolean;
  genre_Romance: boolean;
  'genre_Sci-Fi': boolean;
  genre_Superhero: boolean;
  genre_Thriller: boolean;
  genre_Crime: boolean;
}
