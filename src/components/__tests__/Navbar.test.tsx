import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter as Router, useLocation } from 'react-router-dom';

import Navbar from '../Navbar';

const handleHomeIconClick = jest.fn();
describe('Navbar', () => {
    it('should render properly', () => {
        render(<Navbar />);
        expect(screen.getByTestId('home-icon')).toBeInTheDocument();
    })

    it('should have title when title prop is passed', () => {
        render(<Navbar title={'DummyTitle'} />);
        const titleElement = screen.getByTestId('title');
        expect(titleElement).toBeInTheDocument();
    })

    it('should not have title when no props passed', () => {
        render(<Navbar />);
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

    it('home icon should not perfrom any action in homepage', () => {
        render(
            <Router initialEntries={['/']}>
                <Navbar />
            </Router>
        )
        const homeIcon = screen.getByTestId('home-icon')
        fireEvent.click(homeIcon)
        expect(handleHomeIconClick).not.toBeCalled();
    })

    it('home button call the click function and navigate to the home route', () => {
        const location = useLocation();
        render(
            <Router initialEntries={['/details']}>
                <Navbar />
            </Router>
        )
        const homeIcon = screen.getByTestId('home-icon')
        fireEvent.click(homeIcon)
        expect(handleHomeIconClick).toBeCalled();
        const currentPathname = location.pathname;
        expect(currentPathname).toBe('/');
    })
})