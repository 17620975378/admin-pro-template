export const getMessageInfo = (status: number | string): string => {
	const msg = '';
	switch (status) {
		case 400:
			'请求错误(400)';
			break;
		case 403:
			'拒接访问(403)';
			break;
		case 401:
			'未授权(401)';
			break;
		case 500:
			'服务器错误(500)';
			break;
		case 503:
			'服务不可用(503)';
			break;
		default:
			`连接出错(${status})`;
	}
	return msg;
};
