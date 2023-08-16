import { Link, useLocation } from "react-router-dom"
import homeIcon from "../../assets/icons/home.svg"
import searchIcon from "../../assets/icons/search.svg"
import "./Navbar.css"
import { AppDispatch, StoreState } from "../../features/redux/store/store"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { getSearchResults, getUpcomingMovies } from "../../features/redux/reducers/moviesReducer"
import { setSearchText } from "../../features/redux/reducers/moviesReducer"
interface INavbarProps {
    title?: string,
}

const Navbar = (props: INavbarProps) => {
    const location = useLocation()
    const isHome = location.pathname === '/'
    const dispatch = useDispatch<AppDispatch>()
    const stateDispatch = useDispatch()
    const { searchText } = useSelector((state: StoreState) => state.movies)
    const [inputSearchText, setInputSearchText] = useState<string>(searchText)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputSearchText(event.target.value)
        if (event.target.value === '')
            dispatch(getUpcomingMovies(1))
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch()
        }
    };

    const handleSearch = () => {
        const page: number = 1
        if (searchText !== inputSearchText)
            stateDispatch(setSearchText(inputSearchText))
        if (inputSearchText !== '' && searchText !== inputSearchText)
            dispatch(getSearchResults(page))
    }

    return (
        <nav>
            {props.title &&
                <h3 data-testid="title">{props.title}</h3>
            }
            {isHome &&
                <div className="search-bar">
                    <span>
                        <img src={searchIcon} alt="search" width={'18px'} height={'18px'} />
                    </span>
                    <input
                        data-testid="search-bar"
                        value={inputSearchText}
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                    />
                    <button data-testid="search-btn" onClick={handleSearch}>Search</button>
                </div>
            }
            <Link to="/" data-testid="home-icon-btn" className="home-icon">
                <img src={homeIcon} alt="home" width={'28px'} height={'28px'} />
            </Link>
        </nav>
    )
}

export default Navbar