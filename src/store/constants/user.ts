export interface IUserInfo {
  email?: string;
  name?: string;
  [key: string]: any;
}

export interface UserState {
  userInfo: IUserInfo;
  loginStatus: string;
}

export const INITIAL_STATE: UserState = {
  userInfo: {},
  loginStatus: "login",
};
export type Action =
  | {
      type: "SAVE_USER";
      userInfo: IUserInfo;
      loginStatus: string;
    }
  | {
      type: "LOGOUT_SUCCESS";
      loginStatus: string;
    };

export const SAVE_USER = "SAVE_USER";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
