import ReactPaginate from "react-paginate";
import "./Pagination.css"
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { getSearchResults, getUpcomingMovies } from "../../features/redux/reducers/moviesReducer";
import { AppDispatch, StoreState } from "../../features/redux/store/store";
import { useSelector } from "react-redux";

const Pagination = (props: { totalPages: number, initialPage?: number }) => {

    const dispatch = useDispatch<AppDispatch>()
    const currentPage = props.initialPage ? props.initialPage - 1 : 0
    const { searchText } = useSelector((state: StoreState) => state.movies)

    const handlePageClick = (event: any) => {
        const page: number = event.selected + 1
        if (searchText !== '')
            dispatch(getSearchResults(page))
        else
            dispatch(getUpcomingMovies(page))
    }

    return (
        <ReactPaginate
            nextLabel="▶"
            onPageChange={handlePageClick}
            pageRangeDisplayed={2}
            marginPagesDisplayed={2}
            pageCount={props.totalPages}
            initialPage={currentPage}
            disableInitialCallback={true}
            previousLabel="◀"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
        />
    );
}

export default Pagination