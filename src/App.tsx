import { useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar/Navbar"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, StoreState } from "./features/redux/store/store"
import { getUpcomingMovies } from "./features/redux/reducers/moviesReducer"
import MovieCard, { MovieCardSkimmer } from "./components/MovieCard/MovieCard"
import Pagination from "./components/Pagination/Pagination"
import defaultMovieImg from './assets/icons/default-movie.png'

function App() {
  const dispatch = useDispatch<AppDispatch>()
  const { movies, loading } = useSelector((state: StoreState) => state.movies)

  useEffect(() => {
    dispatch(getUpcomingMovies(1));
  }, [])

  const skimmerCards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(card => <MovieCardSkimmer key={card} />)
  const allMovies = Object.keys(movies).length <= 0 ? [] : movies.results
  const movieCards = allMovies.map((movie, index) => <MovieCard key={index} id={movie.id} imgUrl={movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : defaultMovieImg} title={movie.title} description={movie.overview} rating={movie.vote_average} />)

  const AllCards = () => (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', padding: '.5rem 1rem' }}>
        {movieCards}
      </div>
      {movies.total_pages && movies.total_pages > 1 && <Pagination totalPages={movies.total_pages} initialPage={movies.page} />}
    </>
  )

  return (
    <>
      <Navbar />
      {loading ?
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', padding: '.5rem 1rem' }}>
          {skimmerCards}
        </div> :
        <Routes>
          <Route path="/" element={<AllCards />} />
          <Route path="/details" />
        </Routes>
      }
    </>
  );
}

export default App;
