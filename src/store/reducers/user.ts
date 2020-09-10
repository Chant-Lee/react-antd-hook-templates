import {
  Action,
  SAVE_USER,
  UserState,
  INITIAL_STATE,
  LOGOUT_SUCCESS,
} from '../constants/user';

export default function userReducer(
  state: UserState = INITIAL_STATE,
  action: Action
) {
  switch (action.type) {
    case SAVE_USER:
      const { userInfo } = action;
      return {
        ...state,
        userInfo,
        loginStatus: 'login',
      };

    case LOGOUT_SUCCESS:
      return {
        ...INITIAL_STATE,
        loginStatus: 'logout',
      };
    default:
      return state;
  }
}
