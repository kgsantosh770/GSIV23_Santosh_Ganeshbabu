import axios, { AxiosError } from "axios";
import apiClient from "./apiClient";
import { UPCOMING_MOVIES } from "./endpoints";

export interface IMoviesData {
    dates: {},
    page: number,
    results: [
        {
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
    ],
    total_pages: number,
    total_results: number,
}

export const fetchUpcomingMovies = async (queryParams?: string) => {
    try {
        const endpoint = queryParams ? `${UPCOMING_MOVIES}/${queryParams}` : UPCOMING_MOVIES
        const response = await apiClient.get(endpoint)
        const data: IMoviesData = response.data
        return data
    } catch (err: AxiosError | any) {
        if (axios.isAxiosError(err)) {
            return err.response
        } else {
            return err;
        }
    }
}
