import React from 'react';
import { Spin } from 'antd';
import { SpinProps } from 'antd/lib/spin';
import "./style.less";

export interface LoadingProps extends SpinProps {
  children?: React.ReactNode | string
  loading?: boolean
}

const Loading = (props: LoadingProps) => {
  const { children, loading, ...restProps } = props;
  return <div className="fs-loading-container">
    {children
      ? <Spin {...restProps} spinning={loading}>{children}</Spin>
      : <div className="fs-loading-wrapper"><Spin {...restProps} spinning={loading} /></div>}
  </div>
};

export default Loading;