import React, { useEffect, useCallback } from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { useMappedState, useDispatch } from 'redux-react-hook';
import { getUser } from './store/actions/user';
import PageLoading from './components/loading';

import './App.css';

import Login from './pages/login';
import RouteManage from './routes';

const App = (props: any) => {
  const { history } = props;
  const dispatch = useDispatch();
  const { user } = useMappedState(
    useCallback(
      (state) => ({
        user: state.user,
      }),
      []
    )
  );
  const { loginStatus } = user;
  useEffect(() => {
    // 检查是否登陆
    getUser()
      .then((data) => {
        dispatch(data);
      })
      .catch((err) => {
        dispatch(err);
      });
  }, [dispatch]);

  useEffect(() => {
    switch (loginStatus) {
      default:
      case 'waiting':
      case 'login':
        break;
      case 'logout':
        history.replace('/login');
        break;
    }
  }, [loginStatus, history]);

  function renderLogin(loginStatus: any) {
    switch (loginStatus) {
      case 'login':
        return (
          <Switch>
            <RouteManage />
            <Route path="/login" render={() => <Redirect to="/" />} />
          </Switch>
        );
      case 'logout':
        return (
          <Switch>
            <Route path="/login" component={Login} />
          </Switch>
        );
      default:
        return <PageLoading loading={true} />;
    }
  }

  return <>{renderLogin(loginStatus)}</>;
};

export default withRouter(App);
