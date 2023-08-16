import axios from "axios";
import apiClient from "./apiClient";
import { UPCOMING_MOVIES } from "./endpoints";

interface IMoivie {
    adult: boolean,
    backdrop_path: string,
    genre_ids: [],
    id: number,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    release_date: string,
    title: string,
    video: boolean
    vote_average: number,
    vote_count: number,
}

interface ICast {
    adult: boolean,
    gender: number,
    id: number,
    known_for_department: string,
    name: string,
    original_name: string,
    popularity: number,
    profile_path: string,
    cast_id: number,
    character: string,
    credit_id: string,
    order: number,
}

interface ICrew {
    adult: boolean,
    gender: number,
    id: number,
    known_for_department: string,
    name: string,
    original_name: string,
    popularity: number,
    profile_path: string,
    credit_id: string,
    department: string,
    job: string,
}

export interface IMoviesData {
    dates?: {},
    page: number,
    results: IMoivie[],
    total_pages: number,
    total_results: number,
}

export interface ISingleMovie {
    adult: boolean,
    backdrop_path: string,
    belongs_to_collection: {},
    budget: number,
    genres: [],
    homepage: string,
    id: number,
    imdb_id: string,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    production_companies: [],
    production_countries: [],
    release_date: string,
    revenue: number,
    runtime: number,
    spoken_languages: [],
    status: string,
    tagline: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number,
    director: string | undefined,
    cast: string[],
}

interface ICastAndCrew {
    id: Number,
    cast: ICast[],
    crew: ICrew[],
}

export const fetchUpcomingMovies = async (page: number) => {
    try {
        const endpoint = `${UPCOMING_MOVIES}?page=${page}`
        const response = await apiClient.get(endpoint)
        const data: IMoviesData = response.data
        return data
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            return error.response
        } else {
            return error;
        }
    }
}

export const fetchMovie = async (id: number) => {
    try {
        const detailsEndpoint = `/movie/${id}`
        const creditsEndpoint = `${detailsEndpoint}/credits`
        const movieDetails: ISingleMovie = (await apiClient.get(detailsEndpoint)).data
        const credits: ICastAndCrew = (await apiClient.get(creditsEndpoint)).data
        let data: ISingleMovie = movieDetails
        const directors = credits.crew.filter(({ job }) => job === 'Director')
        const director = directors.length > 0 ? directors[0] : undefined
        data.director = director !== undefined ? director.name : undefined
        data.cast = credits.cast.map((person) => person.name)
        return data
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            return error.response
        } else {
            return error;
        }
    }
}

export const searchMovie = async (name: string, page: number) => {
    try {
        const endpoint = `/search/movie?query=${name}&include_adult=false&page=${page}`
        const response = await apiClient.get(endpoint)
        const data: IMoviesData = response.data
        return data
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            return error.response
        } else {
            return error;
        }
    }
}