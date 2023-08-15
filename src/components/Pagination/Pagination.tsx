import ReactPaginate from "react-paginate";
import "./Pagination.css"

const Pagination = (props: { totalPages: number }) => {
    const handlePageClick = (event: any) => {
        console.log(event.selected);
    }

    return (
        <ReactPaginate
            nextLabel="▶"
            onPageChange={handlePageClick}
            pageRangeDisplayed={2}
            marginPagesDisplayed={2}
            pageCount={props.totalPages}
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