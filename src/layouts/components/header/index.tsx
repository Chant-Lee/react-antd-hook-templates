import React from 'react';
import { Tooltip } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

const styles = require('./index.module.less');

const TOOL_TIP = 'Logout';
interface HeaderProps {
  username: string;
  collapsed: boolean;
  onToggle: Function;
  onLogout: Function;
  [key: string]: any;
}
const HeaderBar = (props: HeaderProps) => {
  const { username, collapsed, onLogout, onToggle } = props;

  return (
    <div className={styles.header}>
      <div className={styles.title}>
        <span className={styles.outline} onClick={onToggle as any}>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </span>
      </div>
      <div className={styles.operate}>
        <div className={styles.user}>
          <span>Hi, {username}</span>
          <Tooltip placement="bottom" title={TOOL_TIP}>
            <LogoutOutlined className={styles.off} onClick={onLogout as any} />
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default HeaderBar;
