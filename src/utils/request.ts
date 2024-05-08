import axios from 'axios';
import { AxiosError, AxiosResponse, InternalAxiosRequestConfig, AxiosInstance } from 'axios';
import { getMessageInfo } from './status';
import { ElMessage } from 'element-plus';
// import { BaseResponse } from './types';

// interface BaseResponse<T = any> {
// 	code: number | string;
// 	message: string;
// 	data: T;
// 	status?: number | string;
// }

const service: AxiosInstance = axios.create({
	baseURL: import.meta.env.VITE_APP_USE_MOCK
		? import.meta.env.VITE_APP_MOCK_BASEURL
		: import.meta.env.VITE_APP_API_BASEURL,
	timeout: 15000
});

// axios实例拦截请求
service.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		return config;
	},
	(error: AxiosError) => {
		return Promise.reject(error);
	}
);
// axios实例拦截响应
service.interceptors.response.use(
	(response: AxiosResponse) => {
		if (response.status === 200) {
			if (response.data.code !== 0) {
				ElMessage({
					type: 'error',
					message: response.data.messages
				});
				return Promise.reject(response.data);
			} else {
				return response.data;
			}
		}
		ElMessage({
			message: getMessageInfo(response.status),
			type: 'error'
		});
		return response;
	},
	// 请求失败
	(error: any) => {
		const { response } = error;
		if (response) {
			ElMessage({
				message: getMessageInfo(response.status),
				type: 'error'
			});
			return Promise.reject(response.data);
		}
		ElMessage({
			message: '网络连接异常,请稍后再试!',
			type: 'error'
		});
	}
);
export default service;

// 此处相当于二次响应拦截
// 为响应数据进行定制化处理
// const requestInstance = <T = any>(config: AxiosRequestConfig): Promise<T> => {
// 	const conf = config;
// 	return new Promise((resolve, reject) => {
// 		service.request<any, AxiosResponse<BaseResponse>>(conf).then((res: AxiosResponse<BaseResponse>) => {
// 			const data = res.data; // 如果data.code为错误代码返回message信息
// 			if (data.code != 0) {
// 				ElMessage({
// 					message: data.message,
// 					type: 'error'
// 				});
// 				reject(data.message);
// 			} else {
// 				ElMessage({
// 					message: data.message,
// 					type: 'success'
// 				}); // 此处返回data信息 也就是 api 中配置好的 Response类型
// 				resolve(data as T);
// 			}
// 		});
// 	});
// };

// // 在最后使用封装过的axios导出不同的请求方式
// export function get<T = any, U = any>(config: AxiosRequestConfig, url: string, parms?: U): Promise<T> {
// 	return requestInstance({ ...config, url, method: 'GET', params: parms });
// }

// export function post<T = any, U = any>(config: AxiosRequestConfig, url: string, data: U): Promise<T> {
// 	return requestInstance({ ...config, url, method: 'POST', data: data });
// }
