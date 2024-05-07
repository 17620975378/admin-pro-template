import { get } from '@/utils/request';

// 获取项目列表
export const getProjectList = () => {
	return get({}, '/projects');
};
