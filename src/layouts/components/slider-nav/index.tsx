import React, { useState, useMemo, useEffect } from 'react';
import { NavLink, withRouter, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import { IRoute } from '@/project/routes';
const { Item, SubMenu } = Menu;

interface IProp {
  theme: 'light' | 'dark';
  routes: IRoute[];
  onChange?: Function;
}

const MenuNav = (props: IProp) => {
  const { theme, routes } = props;

  const [activePath, setActivePath] = useState<string[]>([]);
  const location = useLocation();

  const handleChange = (info: any) => {
    props.onChange && props.onChange(info.keyPath);
    setActivePath(info.keyPath);
  };

  const defaultSelectedKeys = useMemo<string[]>(() => {
    if (!routes || !routes.length) return [];
    return [routes[0].path];
  }, [routes]);

  useEffect(() => {
    const paths = location.pathname
      .split('/')
      .map((path: string) => `/${path}`);
    setActivePath(paths);
  }, [location]);

  function renderMenuItem({ path, icon, name }: MenuItem): any {
    return (
      <Item key={path} icon={icon}>
        <NavLink to={path}>{name}</NavLink>
      </Item>
    );
  }

  function renderSubMenu({ path, icon, name, subs }: MenuItem) {
    return (
      <SubMenu key={path} icon={icon} title={name}>
        {subs &&
          subs.map((item) => {
            return item.subs && item.subs.length > 0
              ? renderSubMenu(item)
              : renderMenuItem(item);
          })}
      </SubMenu>
    );
  }

  return (
    <Menu
      theme={theme}
      mode="inline"
      defaultSelectedKeys={defaultSelectedKeys}
      selectedKeys={activePath}
      onClick={handleChange}
    >
      {routes.map((item: MenuItem) => {
        return item.subs && item.subs.length > 0
          ? renderSubMenu(item)
          : renderMenuItem(item);
      })}
    </Menu>
  );
};

MenuNav.defaultProps = {
  theme: 'light',
};

interface MenuItem extends IRoute {}
export default withRouter(MenuNav);
