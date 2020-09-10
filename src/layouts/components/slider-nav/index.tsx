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

  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [currentKeys, setCurrentKeys] = useState<string[]>([]);

  const location = useLocation();

  function handleOpenChange(keys: Array<string>): any {
    if (keys.length === 0 || keys.length === 1) {
      setOpenKeys(keys);
      return;
    }
    const latestOpenKey = keys[keys.length - 1];
    setOpenKeys([latestOpenKey]);
  }

  function handleClickMenu({ key }: any): any {
    setCurrentKeys([key]);
  }

  const defaultSelectedKeys = useMemo<string[]>(() => {
    if (!routes || !routes.length) return [];
    return [routes[0].path];
  }, [routes]);

  useEffect(() => {
    const paths = location.pathname;
    const openKey = paths.substr(0, paths.lastIndexOf('/'));
    setCurrentKeys([paths]);
    setOpenKeys([openKey]);
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
      openKeys={openKeys}
      selectedKeys={currentKeys}
      onOpenChange={handleOpenChange as any}
      onClick={handleClickMenu}
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
