import { get, post } from '@/utils/request';

export type LoginRequest = {
	username: string;
	password: string;
};
// 刷新登录信息需要的参数
export type reLoginRequest = {
	accessToken: string;
};
export type LoginResponse = {
	username: string;
	roles: string[];
	accessToken: string;
};
// 登录请求
export const userLogin = async (data?: LoginRequest) => {
	return post<LoginResponse>({}, '/login', data);
};

export const refreshUserInfo = async (data?: reLoginRequest) => {
	return post<LoginResponse>({}, '/getUserInfo', data);
};

// 获取用户列表
export const getUserList = async () => {
	return get({}, '/getUserList');
};
