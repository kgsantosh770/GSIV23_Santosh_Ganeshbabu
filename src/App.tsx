import { useEffect } from "react"
import { Routes, Route, useLocation } from "react-router-dom"
import Navbar from "./components/Navbar/Navbar"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, StoreState } from "./features/redux/store/store"
import { getUpcomingMovies } from "./features/redux/reducers/moviesReducer"
import MovieCard, { MovieCardSkimmer } from "./components/MovieCard/MovieCard"
import Pagination from "./components/Pagination/Pagination"
import defaultMovieImg from './assets/icons/default-movie.png'
import Details from "./components/Details/Details"

function App() {
  const location = useLocation()

  const dispatch = useDispatch<AppDispatch>()
  const { movies, loading } = useSelector((state: StoreState) => state.movies)

  useEffect(() => {
    dispatch(getUpcomingMovies(1));
  }, [dispatch])

  const skimmerCards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(card => <MovieCardSkimmer key={card} />)
  const allMovies = Object.keys(movies).length <= 0 ? [] : movies.results
  const movieCards = allMovies.map((movie, index) => <MovieCard key={index} id={movie.id} imgUrl={movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : defaultMovieImg} title={movie.title} description={movie.overview} rating={movie.vote_average} />)

  const AllCards = () => (
    Object.keys(movies).length > 0 && movies.results.length > 0 ?
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', padding: '.5rem 1rem' }}>
        {movieCards}
      </div>
      {movies.total_pages && movies.total_pages > 1 && <Pagination totalPages={movies.total_pages} initialPage={movies.page} />}
    </> :
    <h1 data-testid="no-result" style={{textAlign: 'center'}}>No results found</h1>
  )

  return (
    <>
      {
        location.pathname.startsWith('/details/movie') ?
          <Navbar title="Movie Detials" /> :
          <Navbar />
      }
      {loading ?
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', padding: '.5rem 1rem' }}>
          {skimmerCards}
        </div> :
        <Routes>
          <Route path="/" element={<AllCards />} />
          <Route path="/details/movie/:id" element={<Details />} />
          <Route path="*" element={<h1 style={{textAlign: 'center'}}>404: Page Not Fount</h1>} />
        </Routes>
      }
    </>
  );
}

export default App;
