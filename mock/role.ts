// 用户登录数据模拟
import { MockMethod } from 'vite-plugin-mock';

export default [
	// 获取角色列表
	{
		url: '/mock/api/getRole',
		method: 'get',
		response: () => {
			return {
				code: 0,
				message: '获取角色列表成功',
				data: [
					{
						roleName: '超级管理员',
						roleId: 1,
						authority: [1, 2, 4, 5, 6, 7, 8, 9, 11, 13, 14, 15, 16]
					},
					{
						roleName: '管理员',
						roleId: 2,
						authority: [1, 2, 4, 5, 8, 9, 11, 13, 14, 15, 16]
					},
					{
						roleName: '普通用户',
						roleId: 3,
						authority: [6, 7, 8, 9, 11, 12, 13]
					}
				]
			};
		}
	}
] as MockMethod[];
