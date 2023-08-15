import '@testing-library/jest-dom'
import { act, render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter as Router } from 'react-router-dom'
import store from './features/redux/store/store'
import apiClient from './features/api/apiClient'
import App from "./App"

jest.mock('./features/api/apiClient')

const responseData = {
    results: [
        { adult: false, backdrop_path: '/zN41DPmPhwmgJjHwezALdrdvD0h.jpg', genre_ids: Array(3), id: 615656, original_language: 'en', },
        { adult: false, backdrop_path: '/iEFuHjqrE059SmflBva1JzDJutE.jpg', genre_ids: Array(5), id: 496450, original_language: 'fr', },
        { adult: false, backdrop_path: '/fm6KqXpk3M2HVveHwCrBSSBaO0V.jpg', genre_ids: Array(2), id: 872585, original_language: 'en', },
    ]
}

describe('App', () => {
    beforeEach(() => {
        (apiClient.get as jest.Mock).mockResolvedValue({ data: responseData })
        act(() => {
            render(
                <Provider store={store}>
                    <Router>
                        <App />
                    </Router>
                </Provider>
            )
        })
    })
    it('should render properly with all components', async () => {
        const navbarComponent = screen.getByRole('navigation')
        expect(navbarComponent).toBeInTheDocument()
        await waitFor(() => {
            const movieCard = screen.getAllByTestId('card')
            expect(movieCard.length).toBeGreaterThan(0)
        })
    })

    it('should have cards equal to the number of movies fetched from api', async () => {
        const resultLength = responseData.results.length
        const cards = screen.getAllByTestId('card')
        await waitFor(() => {
            expect(cards.length).toBe(resultLength)
        })
    })

})