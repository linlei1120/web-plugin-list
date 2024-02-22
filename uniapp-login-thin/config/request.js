// 此vm参数为页面的实例，可以通过它引用vuex中的变量
import store from '@/store/index.js'
module.exports = (vm) => {
	// 初始化请求配置
	uni.$u.http.setConfig((config) => {
		/* config 为默认全局配置*/
		// config.baseURL = 'http://test.com'; /* 测试-根域名 */
		config.baseURL = 'https://zhengshi.com'; /* 正式-根域名 */
		config.custom = {
			auth: true
		}
		config.dataType = 'json'
		return config
	})

	// 请求拦截
	uni.$u.http.interceptors.request.use((config) => { // 可使用async await 做异步操作
		// 初始化请求拦截器时，会执行此方法，此时data为undefined，赋予默认{}
		config.data = config.data || {}
		// 根据custom参数中配置的是否需要token，添加对应的请求头
		if (config?.custom?.auth) {
			// 可以在此通过vm引用vuex中的变量，具体值在vm.$store.state中
			config.header.Authorization = uni.getStorageSync('access_token')
		}
		return config
	}, config => { // 可使用async await 做异步操作
		return Promise.reject(config)
	})

	// 响应拦截
	uni.$u.http.interceptors.response.use((response) => {
		/* 对响应成功做点什么 可使用async await 做异步操作*/
		console.info('response',response)
		const data = response.data
		// 自定义参数
		const custom = response.config?.custom
		if (!data.success) {
			// 如果没有显式定义custom的toast参数为false的话，默认对报错进行toast弹出提示
			if (custom.toast !== false) {
				// uni.$u.toast(data.message)
			}

			// 如果需要catch返回，则进行reject
			if (custom?.catch) {
				// return Promise.reject(data)
			} else {
				// 否则返回一个pending中的promise，请求不会进入catch中
				// return new Promise(() => {})
			}
		}
		return data.data === undefined ? {} : data
	}, (response) => {
		// 对响应错误做点什么 （statusCode !== 200）
		console.info('response-error',response)
		if (response.statusCode == 401) {
			store.commit('$tStore', {
				name: 'vuex_is_login',
				value: false
			})
			uni.reLaunch({
				url: '/pages/index/login'
			});
		}
		return Promise.reject(response)
	})
}