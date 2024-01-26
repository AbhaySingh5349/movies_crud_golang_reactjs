export interface LoginData {
  email: string;
  password: string;
}

export interface MovieData {
  title: string;
  releaseDate: Date;
  description: string;
  genre_action: boolean;
  genre_animation: boolean;
  genre_comedy: boolean;
  genre_thriller: boolean;
  genre_horror: boolean;
  genre_romance: boolean;
  genre_scifi: boolean;
  mpaa_rating: string;
}
