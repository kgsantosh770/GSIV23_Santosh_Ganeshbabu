import { render, screen } from '@testing-library/react'
import {MemoryRouter as Router} from 'react-router-dom';

import Navbar from '../Navbar';

describe('Navbar', () => {
    it('should render properly', () => {
        render(<Navbar />);
        expect(screen.getByTestId('home-icon')).toBeInTheDocument();
    })

    it('should have title when title prop is passed',()=>{
        render(<Navbar title={'DummyTitle'} />);
        const titleElement = screen.getByTestId('title');
        expect(titleElement).toBeInTheDocument();
    })

    it('should not have title when no props passed', ()=>{
        render(<Navbar />);
        const titleElement = screen.queryByTestId('title');
        expect(titleElement).not.toBeInTheDocument();
    })

    it('should have the searchbar when it is in homepage', ()=>{
        render(
            <Router initialEntries={['/']}>
                <Navbar />
            </Router>
        )
        const searchbar = screen.getByTestId('search-bar');
        expect(searchbar).toBeInTheDocument();
    })
    
    it('should not have searcbar in other pages', ()=>{
        render(
            <Router initialEntries={['/other']}>
                <Navbar />
            </Router>
        )
        const searchbar = screen.queryByTestId('search-bar');
        expect(searchbar).not.toBeInTheDocument();
    })
})