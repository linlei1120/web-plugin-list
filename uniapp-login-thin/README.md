本项目可直接进行项目开发，来减少开发时间。
项目含有登录页、我的页面和信息弹窗组件等，登录和退出登录逻辑已完成，登录页还含有微信小程序隐私弹窗组件和逻辑。
本项目使用了uview和图鸟UI架构，也可以使用uniapp内置组件。

使用说明：
	1：配置接口域名并使用
		1.1 文件/config/request.js内配置实际接口config.baseURL
		1.2 在/config/api.js内添加接口函数例如
		
```javascript  api.js     auth: false 跳过验证token
		export const loginApi = (data) => http.post('/api/wx/login', data, {
			custom: {
				auth: false,
			}
		})
```
		
```javascript
		import {
			loginApi
		} from '@/config/api.js';

		let data = {}
		loginApi(data).then((res)=>{
			console.info('接口返回结果',res)
		})
```
	2：在/pages/index/login.vue内203行处修改自己项目的登录逻辑
	
	3：弹窗使用例如/pages/home.vue内
	
```javascript
	this.$refs.refSuccess.showBox({
		type:'error',//success/error/warning,
		txt:'操作失败，请重试！'
	})
```

	
	
	

