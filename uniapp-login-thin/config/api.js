const http = uni.$u.http

//登录
export const loginApi = (data) => http.post('/api/wx/login', data, {
	custom: {
		auth: false,
	}
})
//我的
export const getwxuser = () => http.get('/api/wx/wxuser', {params:{}})
