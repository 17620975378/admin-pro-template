// 角色权限数据模拟
import { MockMethod } from 'vite-plugin-mock';

export default [
	{
		url: '/mock/api/getAuthList',
		method: 'get',
		response: () => {
			return {
				code: 0,
				message: '获取权限列表成功',
				data: [
					{
						name: '项目列表',
						authId: 1,
						viewRole: '',
						authList: [
							{
								name: '项目详情',
								authId: 4,
								viewRole: '',
								authList: [
									{
										name: '审核',
										authId: 5
									}
								]
							},
							{
								name: '查看',
								authId: 2
							},
							{
								name: '删除',
								authId: 3
							}
						]
					},
					{
						name: '工程列表',
						authId: 6,
						viewRole: '',
						authList: [
							{
								name: '工程详情',
								authId: 9,
								viewRole: '',
								authList: [
									{
										name: '修改',
										authId: 10
									}
								]
							},
							{
								name: '查看',
								authId: 7
							},
							{
								name: '删除',
								authId: 8
							}
						]
					},
					{
						name: '用户管理',
						authId: 11,
						viewRole: '',
						authList: [
							{
								name: '删除',
								authId: 14,
								viewRole: ''
							},
							{
								name: '查看',
								authId: 12
							},
							{
								name: '修改',
								authId: 13
							}
						]
					},
					{
						name: '角色管理',
						authId: 15,
						viewRole: '',
						authList: [
							{
								name: '角色删除',
								authId: 17,
								viewRole: ''
							},
							{
								name: '查看',
								authId: 18
							},
							{
								name: '修改',
								authId: 16
							}
						]
					}
				]
			};
		}
	}
] as MockMethod[];
