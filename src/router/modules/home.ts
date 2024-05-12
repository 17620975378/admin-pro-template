import { RouteRecordRaw } from 'vue-router';
export default {
	path: '/',
	name: 'Layout',
	redirect: '/',
	component: () => import('@/layout/index.vue'),
	meta: {
		title: '首页'
	},
	children: [
		{
			path: '/',
			name: 'HomePage',
			component: () => import('@/views/home/index.vue'),
			meta: {
				title: '首页',
				isShow: true,
				parentNode: 'Layout'
			}
		},
		{
			path: '/child1',
			name: 'MenuPage',
			redirect: '/infoPage1',
			meta: {
				title: '主菜单',
				isShow: true,
				parentNode: 'Layout'
			},
			children: [
				{
					path: '/infoPage1',
					name: 'ChildPage1',
					redirect: '/infoPage1',
					component: () => import('@/views/parent/child1/index.vue'),
					meta: {
						title: '子菜单1',
						parentNode: 'MenuPage'
					},
					children: [
						{
							path: '/infoPage1',
							name: 'InfoPage1',
							component: () => import('@/views/parent/child1/component/InfoPage1.vue'),
							meta: {
								title: '信息页1',
								isShow: true,
								parentNode: 'ChildPage1'
							}
						},
						{
							path: '/infoPage2',
							name: 'InfoPage2',
							component: () => import('@/views/parent/child1/component/InfoPage2.vue'),
							meta: {
								title: '信息页2',
								isShow: true,
								parentNode: 'ChildPage1'
							}
						},
						{
							path: '/infoPage3',
							name: 'InfoPage3',
							component: () => import('@/views/parent/child1/component/InfoPage3.vue'),
							meta: {
								title: '信息页3',
								isShow: true,
								parentNode: 'ChildPage1'
							}
						}
					]
				},
				{
					path: '/child2',
					name: 'ChildPage2',
					component: () => import('@/views/parent/child2/index.vue'),
					meta: {
						title: '子菜单2',
						isShow: true,
						parentNode: 'MenuPage'
					}
				},
				{
					path: '/child3',
					name: 'ChildPage3',
					component: () => import('@/views/parent/child3/index.vue'),
					meta: {
						title: '子菜单3',
						isShow: true,
						parentNode: 'MenuPage'
					}
				}
			]
		},
		{
			path: '/project',
			name: 'ProjectPage',
			component: () => import('@/views/project/index.vue'),
			meta: {
				title: '项目介绍',
				isShow: true,
				parentNode: 'Layout'
			}
		},
		{
			path: '/user',
			name: 'UserPage',
			component: () => import('@/views/user/index.vue'),
			meta: {
				title: '用户列表',
				isShow: true,
				parentNode: 'Layout'
			}
		},
		{
			path: '/role',
			name: 'RolePage',
			component: () => import('@/views/role/index.vue'),
			meta: {
				title: '角色列表',
				isShow: true,
				parentNode: 'Layout'
			}
		},
		{
			path: '/auth',
			name: 'AuthPage',
			component: () => import('@/views/auth/index.vue'),
			meta: {
				title: '权限模块',
				isShow: true,
				parentNode: 'Layout'
			}
		}
	]
} as RouteRecordRaw;
