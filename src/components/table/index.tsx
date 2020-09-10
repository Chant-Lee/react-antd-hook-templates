import React from 'react';
import { Table } from 'antd';
import { TableProps, TablePaginationConfig } from 'antd/lib/table';
const DEFAULT_PAGINATION = ['10', '25', '50', '100'];
const defaultPagination: TablePaginationConfig = {
  showQuickJumper: false,
  hideOnSinglePage: true,
  pageSizeOptions: DEFAULT_PAGINATION,
};

interface IProps extends TableProps<any> {}

const CustomTable = (props: IProps) => {
  const { pagination, ...resetProps } = props;

  return (
    <div>
      <Table
        pagination={{ ...defaultPagination, ...pagination }}
        {...resetProps}
      />
    </div>
  );
};

export default CustomTable;
