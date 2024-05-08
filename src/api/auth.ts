// import { get } from '@/utils/request';

// export const getAuthList = () => {
// 	return get({}, '/getAuthList');
// };

// 获取角色权限列表
import service from '@/utils/request';
export function getAuthList() {
	return service({
		url: '/getAuthList',
		method: 'get'
	});
}
