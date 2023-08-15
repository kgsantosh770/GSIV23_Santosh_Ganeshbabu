import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import MovieCard from '../MovieCard/MovieCard'
import { MemoryRouter as Router } from 'react-router-dom'

describe('MovieCard', () => {
    it('should render properly with props', () => {
        const movieId = 123
        render(
            <Router>
                <MovieCard imgUrl='movieImageUrl' id={movieId} title='movieTitle' description='dummy description' rating={4.5} />
            </Router>
        )
        const image = screen.getByTestId('image')
        const title = screen.getByTestId('title')
        const description = screen.getByTestId('description')
        const rating = screen.getByTestId('rating')
        expect(image).toBeInTheDocument()
        expect(title).toBeInTheDocument()
        expect(description).toBeInTheDocument()
        expect(rating).toBeInTheDocument()
    })

    it('should have the correct url to navigate', () => {
        const movieId = 123
        render(
            <Router>
                <MovieCard imgUrl='movieImageUrl' id={movieId} title='movieTitle' description='dummy description' rating={4.5} />
            </Router>
        )
        const card = screen.getByTestId('card')
        const url = '/details/movie/' + movieId
        expect(card).toHaveAttribute('href', url);
    })

    it('should show title only in one line', () => {
        const movieId = 123
        render(
            <Router>
                <MovieCard imgUrl='movieImageUrl' id={movieId} title='movieTitle' description='dummy description' rating={4.5} />
            </Router>
        )
        const title = screen.getByTestId('title')
        expect(title).toHaveClass('ellipsis')
    })

    it('should show rating only if it is greater than 0', ()=>{
        render(
            <Router>
                <MovieCard imgUrl='movieImageUrl' id={123} title='movieTitle' description='dummy description' rating={0} />
            </Router>
        )
        const ratingElement = screen.queryByTestId('rating')
        expect(ratingElement).not.toBeInTheDocument()
    })
})