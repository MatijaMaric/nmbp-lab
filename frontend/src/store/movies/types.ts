
export interface MoviesState {
    movies: Movie[];
}

export interface Movie {
    id: number;
    title: string;
    categories: string[];
    summary: string;
    description: string;    
}