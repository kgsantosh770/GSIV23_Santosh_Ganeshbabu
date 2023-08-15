import { Link } from "react-router-dom"
import "./MovieCard.css"

interface IMovieCardProps {
  id: number,
  imgUrl: string,
  title: string,
  description: string,
  rating: number,
}

const MovieCard = (props: IMovieCardProps) => {
  return (
    <Link to={`/details/movie/${props.id}`} data-testid="card" className="card">
      <div className={props.imgUrl.startsWith('data:') ? 'card-img default' : 'card-img'}>
        <img data-testid="image" src={props.imgUrl} alt="movie" />
      </div>
      <div className="card-content">
        <p data-testid="title" className="title ellipsis">{props.title}</p>
        <p data-testid="description" className="desc">{props.description}</p>
        {props.rating > 0 && <p data-testid="rating" className="rating">⭐ {props.rating}</p>}
      </div>
    </Link>
  )
}

export const MovieCardSkimmer = () => {
  return (
    <div className="card">
      <div className="img-skimmer skimmer-bg"></div>
      <div className="card-content">
        <p className="title-skimmer skimmer-bg"></p>
        <p className="desc desc-skimmer skimmer-bg"></p>
        <p className="rating-skimmer skimmer-bg"></p>
      </div>
    </div>
  )
}

export default MovieCard