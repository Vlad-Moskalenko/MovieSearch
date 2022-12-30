import 'rc-pagination/assets/index.css';

import Pagination from 'rc-pagination';

export const PagePagination = ({ totalResults, page, setPage }) => {
  const handlePageClick = e => {
    setPage(e);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Pagination
      onChange={handlePageClick}
      current={page}
      total={totalResults}
      pageSize={20}
      showLessItems
      showTitle={false}
    />
  );
};
