export const minLogin = {
	data() {
		return {

		}
	},
	methods: {
		checkLogin() {
			let res = false;
			if (!this.vuex_is_login) {
				uni.showToast({
					title: '暂未登录',
					duration: 1500,
					icon: 'none'
				});
				res = true;
				setTimeout(() => {
					uni.reLaunch({
						url: '/pages/index/login'
					});
				}, 1500)

			}
			return res;

		},


	}
}