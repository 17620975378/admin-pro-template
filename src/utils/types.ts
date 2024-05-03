// 定义接口的规范,所有接口均会按照这样的格式返回
export interface BaseResponse<T = any> {
	code: number;
	message: string;
	data: T;
}
