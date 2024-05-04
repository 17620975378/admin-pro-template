import { RouteRecordRaw } from 'vue-router';
export default {
	path: '/',
	name: 'Layout',
	component: () => import('@/layout/index.vue'),
	meta: {},
	children: [
		{
			path: '/',
			name: 'Home',
			component: () => import('@/views/home/index.vue'),
			meta: {}
		}
	]
} as RouteRecordRaw;
