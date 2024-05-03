// 用户登录数据模拟
import { MockMethod } from 'vite-plugin-mock';

export default [
	{
		url: '/mock/api/login',
		method: 'post',
		response: ({ body }) => {
			if (body.username !== body.password) {
				return {
					code: 1,
					message: '密码错误',
					data: {
						username: '',
						roles: [],
						accessToken: ''
					}
				};
			}
			if (body.username === 'admin') {
				return {
					code: 0,
					message: '登录成功admin',
					data: {
						username: 'admin',
						roles: ['admin'],
						accessToken: 'admin'
					}
				};
			} else {
				return {
					code: 0,
					message: '登录成功common',
					data: {
						username: 'common',
						roles: ['common'],
						accessToken: 'common'
					}
				};
			}
		}
	}
] as MockMethod[];
