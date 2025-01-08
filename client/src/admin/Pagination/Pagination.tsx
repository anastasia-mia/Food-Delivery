import './Pagination.scss';

interface PaginationProps {
    page: number,
    hasNextPage: boolean,
    setNewPage: (page: number) => void;
}

export const Pagination = ({page, hasNextPage, setNewPage}: PaginationProps) => {

    const changePage = (parameter: string) => {
        if (parameter === "prev" && page > 1) {
            setNewPage(page - 1);
        } else if (parameter === "next" && hasNextPage) {
            setNewPage(page + 1);
        }
    }

    return (
        <div className="pagination">
            <div className={`pagination-button ${page === 1 ? 'pagination-button-disabled' : ''}`}
                 onClick={() => changePage("prev")}
            >
                {"<"}
            </div>
            <p className="pagination-page">{page}</p>
            <div className={`pagination-button ${!hasNextPage ? 'pagination-button-disabled' : ''}`}
                 onClick={() => changePage("next")}
            >
                {">"}
            </div>
        </div>
    )
}