import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter as Router } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import { Provider } from 'react-redux';
import store from '../../features/redux/store/store';

describe('Navbar', () => {
    describe('when rendered in homepage with props', () => { 
        it('should have title when title prop is passed', () => {
            const mockTitle = "dummyTitle"
            render(
                <Provider store={store}>
                    <Router>
                        <Navbar title={mockTitle}/>
                    </Router>
                </Provider>
            )
            const titleElement = screen.getByTestId('title');
            expect(titleElement).toBeInTheDocument();
            expect(titleElement).toHaveTextContent(mockTitle);
        })
     })
    describe('when rendered in homepage without any props', () => {
        beforeEach(() => {
            render(
                <Provider store={store}>
                    <Router>
                        <Navbar />
                    </Router>
                </Provider>
            )
        })

        it('should render properly', () => {
            const homeIcon = screen.getByTestId('home-icon-btn');
            expect(homeIcon).toBeInTheDocument();
        })

        it('should not have title when no props passed', () => {
            const titleElement = screen.queryByTestId('title');
            expect(titleElement).not.toBeInTheDocument();
        })

        it('should have the searchbar when it is in homepage', () => {
            const searchbar = screen.getByTestId('search-bar');
            expect(searchbar).toBeInTheDocument();
        })
    })

    describe('when rendered in details page', () => {
        beforeEach(() => {
            render(
                <Provider store={store}>
                    <Router initialEntries={['/details']}>
                        <Navbar />
                    </Router>
                </Provider>
            )
        })
        it('should not have searcbar in other pages', () => {
            const searchbar = screen.queryByTestId('search-bar');
            expect(searchbar).not.toBeInTheDocument();
        })

        it('should navigate to the home route on home icon click', () => {
            const homeIcon = screen.getByTestId('home-icon-btn')
            fireEvent.click(homeIcon)
            const currentPathname = window.location.pathname;
            expect(currentPathname).toBe('/');
        })
    })

})