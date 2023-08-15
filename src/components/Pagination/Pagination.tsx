import ReactPaginate from "react-paginate";
import "./Pagination.css"
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { getUpcomingMovies } from "../../features/redux/reducers/moviesReducer";
import { AppDispatch } from "../../features/redux/store/store";

const Pagination = (props: { totalPages: number, initialPage?: number }) => {

    const dispatch = useDispatch<AppDispatch>()
    const currentPage = props.initialPage ? props.initialPage - 1 : 0

    const handlePageClick = (event: any) => {
        const selected = event.selected
        dispatch(getUpcomingMovies(selected + 1))
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