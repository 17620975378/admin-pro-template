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
				parentNode: 'Layout',
				parentNodeName: '首页'
			}
		},
		{
			path: '/child1',
			name: 'MenuPage',
			redirect: '/child1',
			meta: {
				title: '主菜单',
				isShow: true,
				parentNode: 'Layout',
				parentNodeName: '首页'
			},
			children: [
				{
					path: '/child1',
					name: 'ChildPage1',
					component: () => import('@/views/parent/child1/index.vue'),
					meta: {
						title: '子菜单1',
						isShow: true,
						parentNode: 'MenuPage',
						parentNodeName: '主菜单'
					}
				},
				{
					path: '/child2',
					name: 'ChildPage2',
					component: () => import('@/views/parent/child2/index.vue'),
					meta: {
						title: '子菜单2',
						isShow: true,
						parentNode: 'MenuPage',
						parentNodeName: '主菜单'
					}
				},
				{
					path: '/child3',
					name: 'ChildPage3',
					component: () => import('@/views/parent/child3/index.vue'),
					meta: {
						title: '子菜单3',
						isShow: true,
						parentNode: 'MenuPage',
						parentNodeName: '主菜单'
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
				parentNode: 'Layout',
				parentNodeName: '首页'
			}
		},
		{
			path: '/user',
			name: 'UserPage',
			component: () => import('@/views/user/index.vue'),
			meta: {
				title: '用户列表',
				isShow: true,
				parentNode: 'Layout',
				parentNodeName: '首页'
			}
		},
		{
			path: '/role',
			name: 'RolePage',
			component: () => import('@/views/role/index.vue'),
			meta: {
				title: '角色列表',
				isShow: true,
				parentNode: 'Layout',
				parentNodeName: '首页'
			}
		},
		{
			path: '/auth',
			name: 'AuthPage',
			component: () => import('@/views/auth/index.vue'),
			meta: {
				title: '权限模块',
				isShow: true,
				parentNode: 'Layout',
				parentNodeName: '首页'
			}
		}
	]
} as RouteRecordRaw;
