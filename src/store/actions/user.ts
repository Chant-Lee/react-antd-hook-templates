import { SAVE_USER, LOGOUT_SUCCESS } from '../constants/user';
import { getUserInfo, logout } from '@/services/user';

export async function getUser() {
  try {
    const options = await getUserInfo();
    return {
      type: SAVE_USER,
      userInfo: options,
    };
  } catch (e) {
    console.log('error ', e);
    return {
      type: LOGOUT_SUCCESS,
    };
  }
}

export async function loginOut() {
  try {
    await logout();
    return {
      type: LOGOUT_SUCCESS,
    };
  } catch (e) {
    return {
      type: LOGOUT_SUCCESS,
    };
  }
}
