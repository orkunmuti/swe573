import React, { useState, useEffect } from 'react';
import Pagination from '@material-ui/lab/Pagination';

export default function AppPagination(props) {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const dataLength = props.data.length / rowsPerPage - 1;

  useEffect(() => {
    let initialData = props.data.slice(page, rowsPerPage);
    props.updateData(initialData);
  }, []);

  const handleChangePage = (event, page) => {
    setPage(page);
    const { data, updateData } = props;

    const dataStart = page * rowsPerPage;
    const dataEnd = dataStart + rowsPerPage;

    const newData = data.slice(dataStart, dataEnd);
    updateData(newData);
  };

  return (
    <Pagination
      className={props.className}
      color={'secondary'}
      count={dataLength}
      page={page}
      onChange={handleChangePage}
    />
  );
}
