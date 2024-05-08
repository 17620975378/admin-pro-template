// import { get } from '@/utils/request';

// export const getRoleList = () => {
// 	return get({}, '/getRole');
// };

// 获取角色列表
import service from '@/utils/request';
export function getRoleList() {
	return service({
		url: '/getRole',
		method: 'get'
	});
}
