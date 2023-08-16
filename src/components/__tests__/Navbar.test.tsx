import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter as Router } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

const handleSearch = jest.fn()

describe('Navbar', () => {
    it('should render properly', () => {
        render(
            <Router>
                <Navbar />
            </Router>
        )
        const homeIcon = screen.getByTestId('home-icon-btn');
        expect(homeIcon).toBeInTheDocument();
    })

    it('should have title when title prop is passed', () => {
        render(
            <Router>
                <Navbar title={'DummyTitle'} />
            </Router>
        )
        const titleElement = screen.getByTestId('title');
        expect(titleElement).toBeInTheDocument();
    })

    it('should not have title when no props passed', () => {
        render(
            <Router>
                <Navbar />
            </Router>
        )
        const titleElement = screen.queryByTestId('title');
        expect(titleElement).not.toBeInTheDocument();
    })

    it('should have the searchbar when it is in homepage', () => {
        render(
            <Router initialEntries={['/']}>
                <Navbar />
            </Router>
        )
        const searchbar = screen.getByTestId('search-bar');
        expect(searchbar).toBeInTheDocument();
    })

    it('should not have searcbar in other pages', () => {
        render(
            <Router initialEntries={['/details']}>
                <Navbar />
            </Router>
        )
        const searchbar = screen.queryByTestId('search-bar');
        expect(searchbar).not.toBeInTheDocument();
    })

    it('should navigate to the home route on home icon click', () => {
        render(
            <Router initialEntries={['/details']}>
                <Navbar />
            </Router>
        )
        const homeIcon = screen.getByTestId('home-icon-btn')
        fireEvent.click(homeIcon)
        const currentPathname = window.location.pathname;
        expect(currentPathname).toBe('/');
    })

    it('should call the handleSearch function on button click', ()=>{
        render(
            <Router>
                <Navbar />
            </Router>
        )
        const button = screen.getByTestId('search-btn')
        fireEvent.click(button)
        expect(handleSearch).toHaveBeenCalled()
    })

})