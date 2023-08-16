import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { MemoryRouter as Router } from 'react-router-dom'
import apiClient from '../../features/api/apiClient'
import Details from '../Details/Details'

jest.mock('./features/api/apiClient')

describe('Details', () => {
    const mockMovieData = {
        "adult": false,
        "backdrop_path": "/zN41DPmPhwmgJjHwezALdrdvD0h.jpg",
        "belongs_to_collection": {
            "id": 742536,
            "name": "The Meg Collection",
            "poster_path": "/7sAnVGMn5he5NZBZCE6fhDpA7fl.jpg",
            "backdrop_path": "/rNoyJmjdhgn30bVbvd8n3DJMocB.jpg"
        },
        "budget": 129000000,
        "genres": [
            {
                "id": 28,
                "name": "Action"
            },
            {
                "id": 878,
                "name": "Science Fiction"
            },
            {
                "id": 27,
                "name": "Horror"
            }
        ],
        "homepage": "https://www.themeg.movie",
        "id": 615656,
        "imdb_id": "tt9224104",
        "original_language": "en",
        "original_title": "Meg 2: The Trench",
        "overview": "An exploratory dive into the deepest depths of the ocean of a daring research team spirals into chaos when a malevolent mining operation threatens their mission and forces them into a high-stakes battle for survival.",
        "popularity": 1847.433,
        "poster_path": "/4m1Au3YkjqsxF8iwQy0fPYSxE0h.jpg",
        "production_companies": [
            {
                "id": 56242,
                "logo_path": "/1YORRYmg7hgYIgoJek8jU3cykuQ.png",
                "name": "Apelles Entertainment",
                "origin_country": "US"
            },
            {
                "id": 174,
                "logo_path": "/IuAlhI9eVC9Z8UQWOIDdWRKSEJ.png",
                "name": "Warner Bros. Pictures",
                "origin_country": "US"
            },
            {
                "id": 435,
                "logo_path": "/AjzK0s2w1GtLfR4hqCjVSYi0Sr8.png",
                "name": "di Bonaventura Pictures",
                "origin_country": "US"
            },
            {
                "id": 92484,
                "logo_path": "/dfWwoWRp8snHjzDKO5IFkiCAUe7.png",
                "name": "CMC Pictures",
                "origin_country": "CN"
            },
            {
                "id": 48778,
                "logo_path": "/tto2UKph873Xh1ytxfNBgCxT8NO.png",
                "name": "Gravity Pictures",
                "origin_country": "CN"
            }
        ],
        "production_countries": [
            {
                "iso_3166_1": "CN",
                "name": "China"
            },
            {
                "iso_3166_1": "US",
                "name": "United States of America"
            }
        ],
        "release_date": "2023-08-02",
        "revenue": 256000000,
        "runtime": 116,
        "spoken_languages": [
            {
                "english_name": "English",
                "iso_639_1": "en",
                "name": "English"
            }
        ],
        "status": "Released",
        "tagline": "Back for seconds.",
        "title": "Meg 2: The Trench",
        "video": false,
        "vote_average": 7.025,
        "vote_count": 439
    };

    beforeEach(() => {
        render(
            <Router>
                <Details />
            </Router>
        )
    })

    it('should render properly', () => {
        const image = screen.getByTestId('image')
        expect(image).toBeInTheDocument()
        const title = screen.getByTestId('title')
        expect(title).toBeInTheDocument()
        const rating = screen.getByTestId('rating')
        expect(rating).toBeInTheDocument()
    })

    it('should show default image if there is no image from api data', ()=>{
        const mockData = {
            ...mockMovieData,
            poster_path: null,
        };
        (apiClient.get as jest.Mock).mockResolvedValue({ data: mockData })
        const image = screen.getByTestId('image')
        expect(image.getAttribute('src')).toBe('default-img.png')
    })

})
