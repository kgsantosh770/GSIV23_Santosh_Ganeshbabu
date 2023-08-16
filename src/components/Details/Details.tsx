import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, StoreState } from "../../features/redux/store/store"
import { getMovie } from "../../features/redux/reducers/singleMovieReducer"
import defaultImage from "../../assets/icons/default-movie.png"
import './Details.css'

const DetailSkimmer = () => {
    return (
        <div className="details-skimmer">
            <div className="left-skimmer"></div>
            <div className="right-skimmer">
                <div className="title-skimmer"></div>
                <div className="subtitle-skimmer"></div>
                <div className="desc-skimmr"></div>
            </div>
        </div>
    )
}

const Details = () => {
    const { id } = useParams()
    const navigate = useNavigate();
    const { movieData, loading } = useSelector((state: StoreState) => state.singleMovie)
    const dispatch = useDispatch<AppDispatch>()

    function toHoursAndMinutes(totalMinutes: number) {
        const hours = ("0" + Math.floor(totalMinutes / 60)).slice(-2)
        const minutes = ("0" + (totalMinutes % 60)).slice(-2)

        return `${hours}:${minutes}`
    }

    useEffect(() => {
        if (id === undefined)
            navigate("/")
        else
            dispatch(getMovie(parseInt(id)))
    }, [id])

    return (
        <>
            {
                loading || Object.keys(movieData).length <= 0 ?
                    <DetailSkimmer /> :
                    <div className="details-wrapper">
                        <div className="left-content">
                            <img src={movieData.poster_path ? `https://image.tmdb.org/t/p/w300/${movieData.poster_path}` : defaultImage} alt="movie-poster" />
                        </div>
                        <div className="right-content">
                            <div className="group">
                                <h3 className="movie-title">{movieData.title}</h3>
                                {
                                    movieData.vote_average > 0 &&
                                    <span className="rating chip">⭐ {movieData.vote_average}</span>
                                }
                            </div>
                            <div className="group">
                                {
                                    movieData.release_date &&
                                    <span className="year">
                                        <span className="label">Release Date: </span>
                                        {movieData.release_date}
                                    </span>
                                }
                                {
                                    movieData.runtime &&
                                        movieData.runtime > 0 ?
                                        <span className="length">
                                            <span className="label">Length: </span>
                                            {toHoursAndMinutes(movieData.runtime)}
                                        </span> : ''
                                }
                                {
                                    movieData.director &&
                                    <span className="director">
                                        <span className="label">Director: </span>
                                        {movieData.director}
                                    </span>
                                }
                            </div>
                            {
                                movieData.cast &&
                                movieData.cast.length > 0 &&
                                <p className="cast">
                                    <p className="label">Cast: </p>
                                    {
                                        Object.keys(movieData).length > 0 &&
                                        movieData.cast.length > 0 &&
                                        movieData.cast.slice(0, 10).map((name: string, index: number) =>
                                            <span key={index} className="chip">{name}</span>)
                                    }
                                    <span>...</span>
                                </p>
                            }
                            {
                                movieData.overview &&
                                <p className="desc">
                                    <p className="label">Description:</p>
                                    <span>{movieData.overview}</span>
                                </p>
                            }
                        </div>
                    </div>
            }
        </>
    )
}

export default Details