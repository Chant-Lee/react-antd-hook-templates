import React from 'react';
import { usePage } from '@/components/page';

const styles = require('./index.module.less');

const Home = () => {
  const [fragment, renderPage, withLoading] = usePage();

  fragment.title = <span>Home Page</span>;
  fragment.content = withLoading(() => (
    <div className={styles.wrapper}>
      <div className={styles.wrapperInfo}>5555</div>
    </div>
  ));
  return <div>{renderPage()}</div>;
};

export default Home;
