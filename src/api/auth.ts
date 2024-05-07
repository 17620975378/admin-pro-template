import { get } from '@/utils/request';

// 获取角色权限列表
export const getAuthList = () => {
	return get({}, '/getAuthList');
};
