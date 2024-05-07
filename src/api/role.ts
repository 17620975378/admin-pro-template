import { get } from '@/utils/request';

// 获取角色列表
export const getRoleList = () => {
	return get({}, '/getRole');
};
