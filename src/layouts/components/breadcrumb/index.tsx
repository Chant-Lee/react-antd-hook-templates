import React, { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { IRoute } from '@/project/routes';

const styles = require('./index.module.less');

interface IProp {
  routes: IRoute[];
  activePath: string[];
}

const Breadcrumbs = (props: IProp) => {
  const { routes, activePath } = props;

  const defaultSelectedKeys = useMemo<string[]>(() => {
    if (!routes || !routes.length) return [];
    return [routes[0].path];
  }, [routes]);

  const routeMapping = useMemo(() => {
    return routes.reduce((prev: any, route: IRoute) => {
      prev[route.path] = route.breadcrumb;
      return prev;
    }, {});
  }, [routes]);
  const paths = activePath.length > 0 ? activePath : defaultSelectedKeys;
  return (
    <>
      <Breadcrumb>
        {paths.map((path: string) => {
          return (
            <Breadcrumb.Item key={path}>
              {path && routeMapping[path] ? (
                <NavLink to={path}>{routeMapping[path]}</NavLink>
              ) : null}
            </Breadcrumb.Item>
          );
        })}
      </Breadcrumb>
    </>
  );
};

export default Breadcrumbs;
