import 'rc-pagination/assets/index.css';

import Pagination from 'rc-pagination';

import './Pagination.css';

export const PagePagination = ({ totalResults, currentPage, setPage }) => {
  const handlePageClick = e => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    setPage({ page: e });
  };

  return (
    <Pagination
      hideOnSinglePage
      showPrevNextJumpers
      showSizeChanger
      onChange={handlePageClick}
      current={currentPage}
      total={totalResults}
      pageSize={20}
      showTitle={false}
    />
  );
};
