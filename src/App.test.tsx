import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter as Router } from 'react-router-dom'
import store from './features/redux/store/store'
import apiClient from './features/api/apiClient'
import App from "./App"
import { act } from 'react-dom/test-utils'

jest.mock('./features/api/apiClient')

const responseData = {
    results: [
        { adult: false, poster_path: null, genre_ids: Array(3), id: 615656, original_language: 'en', },
        { adult: false, poster_path: '/iEFuHjqrE059SmflBva1JzDJutE.jpg', genre_ids: Array(5), id: 496450, original_language: 'fr', },
        { adult: false, poster_path: '/fm6KqXpk3M2HVveHwCrBSSBaO0V.jpg', genre_ids: Array(2), id: 872585, original_language: 'en', },
    ],
}

describe('App', () => {
    it('should render properly with all components', async () => {
        (apiClient.get as jest.Mock).mockResolvedValue({ data: responseData })
        await act(async () => {
            render(
                <Provider store={store}>
                    <Router>
                        <App />
                    </Router>
                </Provider>
            )
        })
        await waitFor(() => {
            const navbarComponent = screen.getAllByRole('navigation').at(0)
            expect(navbarComponent).toBeInTheDocument()
            const paginationComponent = screen.getAllByRole('navigation').at(-1)
            expect(paginationComponent).toBeInTheDocument()
            const movieCard = screen.getAllByTestId('card')
            expect(movieCard.length).toBeGreaterThan(0)
        })
    })

    it('should have cards equal to the number of movies fetched from api', async () => {
        (apiClient.get as jest.Mock).mockResolvedValue({ data: responseData })
        const resultLength = responseData.results.length
        await act(async () => {
            render(
                <Provider store={store}>
                    <Router>
                        <App />
                    </Router>
                </Provider>
            )
        })
        await waitFor(() => {
            const cards = screen.getAllByTestId('card')
            expect(cards.length).toBe(resultLength)
        })
    })

    it('should not show pagination component if the pagecount is <= 1', async () => {
        const modifiedResponseData = {
            ...responseData,
            total_pages: 1,
        };
        (apiClient.get as jest.Mock).mockResolvedValue({ data: modifiedResponseData })
        await act(async () => {
            render(
                <Provider store={store}>
                    <Router>
                        <App />
                    </Router>
                </Provider>
            )
        })
        await waitFor(() => {
            const paginationComponent = screen.getAllByRole('navigation')
            expect(paginationComponent).toHaveLength(1)
            expect(paginationComponent[0]).not.toHaveClass('pagination')
        })
    })

    it('should show default image poster path is null', async () => {
        (apiClient.get as jest.Mock).mockResolvedValue({ data: responseData })
        await act(async () => {
            render(
                <Provider store={store}>
                    <Router>
                        <App />
                    </Router>
                </Provider>
            )
        })
        await waitFor(() => {
            const cards = screen.getAllByTestId('card')
            const imgUrl = cards.at(0)?.getElementsByTagName('img')[0].getAttribute('src')
            expect(imgUrl).toBe('default-movie.png')
        })
    })

    it('should show no results element when the api has returned empty results', async()=>{
        (apiClient.get as jest.Mock).mockResolvedValue({ data: {results: []} })
        await act(async () => {
            render(
                <Provider store={store}>
                    <Router>
                        <App />
                    </Router>
                </Provider>
            )
        })
        await waitFor(() => {
            const noResultsElement = screen.getByTestId('no-result')
            expect(noResultsElement).toBeInTheDocument()
        })
    })
})