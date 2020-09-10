import React from 'react';
import { TagsOutlined } from '@ant-design/icons';

export interface IRoute {
  path: string;
  name: string | React.ReactNode;
  breadcrumb?: string;
  icon?: React.ReactNode;
  subs?: Array<IRoute>;
}

export const routeMapping: IRoute[] = [
  {
    path: '/home',
    name: 'Home',
    breadcrumb: 'home 22',
    icon: <TagsOutlined />,
  },
];

export const projectName = 'Test';
export default routeMapping;
