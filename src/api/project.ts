// import { get } from '@/utils/request';

// export const getProjectList = () => {
// 	return get({}, '/projects');
// };

// 获取项目列表
import service from '@/utils/request';
export function getProjectList() {
	return service({
		url: '/projects',
		method: 'get'
	});
}
