import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import MovieCard from '../MovieCard/MovieCard'

describe('MovieCard', () => {
    it('should render properly with props', () => {
        const movieId = 123
        render(<MovieCard imgUrl='movieImageUrl' id={movieId} title='movieTitle' description='dummy description' rating='4.5' />)
        const image = screen.getByTestId('image')
        const title = screen.getByTestId('title')
        const description = screen.getByTestId('description')
        const rating = screen.getByTestId('rating')
        expect(image).toBeInTheDocument()
        expect(title).toBeInTheDocument()
        expect(description).toBeInTheDocument()
        expect(rating).toBeInTheDocument()
    })

    it('should go to the details page on click of the card', () => {
        const movieId = 123
        render(<MovieCard imgUrl='movieImageUrl' id={movieId} title='movieTitle' description='dummy description' rating='4.5' />)
        const card = screen.getByTestId('card')
        fireEvent.click(card)
        const path = window.location.pathname
        expect(path).toBe('/details/movie/' + movieId);
    })

    it('should show title only in one line', () => {
        const movieId = 123
        render(<MovieCard imgUrl='movieImageUrl' id={movieId} title='movieTitle' description='dummy description' rating='4.5' />)
        const title = screen.getByTestId('title');
        expect(title).toHaveStyle({
            'white-space': 'nowrap',
            'text-overflow': 'ellipsis',
            'overflow': 'hidden',
        });
    })

    it.skip('should show description only in two lines',()=>{})
})