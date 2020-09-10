import React, { useCallback, useState } from 'react';
import { Layout } from 'antd';
import { useDispatch, useMappedState } from 'redux-react-hook';
import { loginOut } from '@/store/actions/user';
import { MonitorOutlined } from '@ant-design/icons';

// import Breadcrumbs from './components/breadcrumb';
import SliderNav from './components/slider-nav';
import HeaderBar from './components/header';
import routeMapping, { projectName } from '@/project/routes';

import './index.less';

const { Sider, Header, Content } = Layout;

interface IProp {
  children: React.ReactNode;
  theme?: 'light' | 'dark';
}

const BasicLayout = (props: IProp) => {
  const { children, theme = 'dark' } = props;
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [activePath, setActivePath] = useState<string[]>([]);

  const handleChange = (keyPath) => setActivePath(keyPath);

  const { user } = useMappedState(
    useCallback(
      (state) => ({
        user: state.user,
      }),
      []
    )
  );

  const dispatch = useDispatch();
  const handleToggle = () => setCollapsed((prev) => !prev);
  const handleLogout = useCallback(() => {
    loginOut().then((res) => {
      dispatch(res);
    });
  }, [dispatch]);

  const { name } = user.userInfo;
  return (
    <Layout className="basic-layout">
      <Sider
        className="basic-layout__slider"
        collapsible
        trigger={null}
        collapsed={collapsed}
      >
        <div className="basic-layout__slider-name">
          {collapsed ? <MonitorOutlined /> : projectName}
        </div>
        <SliderNav
          routes={routeMapping}
          theme={theme}
          onChange={handleChange}
        />
      </Sider>

      <Layout>
        <Header
          style={{ background: '#fff', padding: 0, position: 'sticky', top: 0 }}
          className="basic-layout__header"
        >
          <HeaderBar
            username={name}
            collapsed={collapsed}
            onToggle={handleToggle as any}
            onLogout={handleLogout}
          />
        </Header>
        <Content>
          {/*@TODO 面包屑暂未完成
           <section className="basic-layout__breadcrumb">
            <Breadcrumbs routes={routeMapping} activePath={activePath} />
          </section> */}
          <div className="basic-layout__content">{children}</div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default BasicLayout;
