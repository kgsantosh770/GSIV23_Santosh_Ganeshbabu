import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { MemoryRouter as Router } from 'react-router-dom'
import apiClient from '../../features/api/apiClient'
import { Provider } from 'react-redux';
import store from '../../features/redux/store/store';
import Details from '../Details/Details'
import { ISingleMovie } from '../../features/api/moviesApi'

jest.mock('../../features/api/apiClient')

const mockMovieData: ISingleMovie = {
    "adult": false,
    "backdrop_path": "/zN41DPmPhwmgJjHwezALdrdvD0h.jpg",
    "belongs_to_collection": {
        "id": 742536,
        "name": "The Meg Collection",
        "poster_path": "/7sAnVGMn5he5NZBZCE6fhDpA7fl.jpg",
        "backdrop_path": "/rNoyJmjdhgn30bVbvd8n3DJMocB.jpg"
    },
    "budget": 129000000,
    "genres": [],
    "homepage": "https://www.themeg.movie",
    "id": 615656,
    "imdb_id": "tt9224104",
    "original_language": "en",
    "original_title": "Meg 2: The Trench",
    "overview": "An exploratory dive into the deepest depths of the ocean of a daring research team spirals into chaos when a malevolent mining operation threatens their mission and forces them into a high-stakes battle for survival.",
    "popularity": 1847.433,
    "poster_path": "/4m1Au3YkjqsxF8iwQy0fPYSxE0h.jpg",
    "production_companies": [],
    "production_countries": [],
    "release_date": "2023-08-02",
    "revenue": 256000000,
    "runtime": 116,
    "spoken_languages": [],
    "status": "Released",
    "tagline": "Back for seconds.",
    "title": "Meg 2: The Trench",
    "video": false,
    "vote_average": 7.025,
    "vote_count": 439,
    "cast": ['hienry'],
    "director": 'james',
};
const mockData = {
    ...mockMovieData,
    poster_path: null,
};

describe('Details', () => {

    beforeEach(() => {
        (apiClient.get as jest.Mock).mockResolvedValue({ data: mockData })
        render(
            <Provider store={store}>
                <Router>
                    <Details />
                </Router>
            </Provider>
        )
    })

    it('should render properly', async () => {
        setTimeout(function () {
            const image = screen.getByTestId('image')
            expect(image).toBeInTheDocument()
            const title = screen.getByTestId('title')
            expect(title).toBeInTheDocument()
            const rating = screen.getByTestId('rating')
            expect(rating).toBeInTheDocument()
        }, 500);
    })

    it('should show default image if there is no image from api data', async () => {
        setTimeout(function () {
            const image = screen.getByTestId('image')
            expect(image.getAttribute('src')).toBe('default-img.png')
        }, 500);
    })

})
