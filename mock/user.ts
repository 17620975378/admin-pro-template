// 用户登录数据模拟
import { MockMethod } from 'vite-plugin-mock';

export default [
	// 登录接口
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
			} else if (body.username === 'admin') {
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
	},
	// 获取用户列表接口
	{
		url: '/mock/api/getUserList',
		method: 'get',
		response: () => {
			return {
				code: 0,
				message: '获取用户列表成功',
				data: [
					{
						id: 0,
						nickName: '大伟',
						userName: '大伟',
						role: [
							{
								role: 1,
								roleName: '管理员'
							},
							{
								role: 2,
								roleName: '普通用户'
							}
						]
					},
					{
						id: 1,
						nickName: '张三',
						userName: '张三',
						role: [
							{
								role: 1,
								roleName: '管理员'
							}
						]
					},
					{
						id: 2,
						nickName: '李四',
						userName: '李四',
						role: [
							{
								role: 1,
								roleName: '管理员'
							}
						]
					},
					{
						id: 3,
						nickName: '王五',
						userName: '王五',
						role: [
							{
								role: 2,
								roleName: '普通用户'
							}
						]
					},
					{
						id: 4,
						nickName: '赵六',
						userName: '赵六',
						role: [
							{
								role: 2,
								roleName: '普通用户'
							}
						]
					}
				]
			};
		}
	}
] as MockMethod[];
