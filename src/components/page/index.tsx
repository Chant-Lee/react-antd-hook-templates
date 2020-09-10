import React, { useState, useCallback, useRef } from 'react';
import { Row, Col } from 'antd';
import Loading from '../loading';
import './style.less';

export interface IFragment {
  title?: string | React.ReactNode;
  extra?: string | React.ReactNode;
  content?: string | React.ReactNode;
  footer?: string | React.ReactNode;
}

export interface IProp extends IFragment {
  children: any;
}

const NoData = () => {
  return <div>No Data</div>;
};

type RenderFunc = (...args: any[]) => React.ReactNode;
type LoadingFunc = (...args: any[]) => Promise<any>;

export const usePage = (): [
  IFragment,
  RenderFunc,
  RenderFunc,
  (func: LoadingFunc) => LoadingFunc
] => {
  const [loading, setLoading] = useState<number>(0);
  const fragment = useRef<IFragment>({
    content: <NoData />,
  });
  const deferGroup = useRef<Function[]>([]);
  const withLocker = useCallback(
    () => async (func: (...args: any[]) => Promise<any>) => {
      if (loading > 0) return;
      setLoading(loading + 1);
      try {
        await func(loading);
      } catch (err) {
        // TODO
      } finally {
        setLoading(loading - 1);
      }
    },
    [loading]
  );

  const withLoading = (func: RenderFunc): React.ReactNode => {
    return func(loading > 0);
  };

  // TODO deal with task before component destroyed
  // const withDefer = (func: Function) => {
  //   deferGroup.current.push();
  // };

  const renderPage = (): React.ReactNode => {
    return (
      <Page title={fragment.current.title}>
        <Loading loading={loading > 0}>{fragment.current.content}</Loading>
      </Page>
    );
  };
  return [fragment.current, renderPage, withLoading, withLocker];
};

/**
 * @name page
 * @func 全局列表页面布局组件
 */
const Page = (props: IProp) => {
  const { children, title, footer, extra } = props;

  return (
    <div>
      <Row justify="space-between">
        <Col>{title}</Col>
        {!!extra && <Col>{extra}</Col>}
      </Row>
      <Row>{children}</Row>
      {!!footer && <Row>{footer}</Row>}
    </div>
  );
};

export default Page;
