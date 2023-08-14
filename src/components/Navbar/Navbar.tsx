import { Link, useLocation } from "react-router-dom"
import homeIcon from "../../assets/icons/home.svg"
import searchIcon from "../../assets/icons/search.svg"
import "./Navbar.css"

interface INavbarProps {
    title?: string,
}

const Navbar = (props: INavbarProps) => {
    const location = useLocation()
    const isHome = location.pathname === '/'

    return (
        <nav>
            {props.title &&
                <h3 data-testid="title">{props.title}</h3>
            }
            {isHome &&
                <div className="search-bar">
                    <span>
                        <img src={searchIcon} alt="search" width={'18px'} height={'18px'}/>
                    </span>
                    <input data-testid="search-bar" type="search" placeholder="Search" aria-label="Search" />
                </div>
            }
            <Link to="/" data-testid="home-icon-btn" className="home-icon">
                <img src={homeIcon} alt="home" width={'28px'} height={'28px'} />
            </Link>
        </nav>
    )
}

export default Navbar