import { createAllAsyncAction } from '../actionTypes';
import { Movie } from './types';

export const fetchMovies = createAllAsyncAction('@Movies/FETCH_MOVIES')<void, Movie[], Error>();