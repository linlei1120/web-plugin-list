<template>
	<view class="template-login ">
		<image src="../../static/login/bj.png" class="bg-login" mode="scaleToFill"></image>
		<view class="login">
			<view class="login-title-box">
				<view class="login-title-top">您好，欢迎使用</view>
				<view class="login-title-bottom">前端模板系统</view>
			</view>
			<view class="login__wrapper">

				<!-- 输入框内容-->
				<view
					class="login__info tn-flex tn-flex-direction-column tn-flex-col-center tn-flex-row-center tn-skeleton">

					<!-- 登录 -->
					<block v-if="currentModeIndex === 0">
						<view
							class="login__info__item__input tn-flex tn-flex-direction-row tn-flex-nowrap tn-flex-col-center tn-flex-row-left tn-skeleton-fillet">
							<view class="login__info__item__input__left-icon">
								<view class="tn-icon-my-reduce"></view>
							</view>
							<view class="login__info__item__input__content">
								<input maxlength="20" placeholder-class="input-placeholder" v-model="username"
									placeholder="请输入账号" />
							</view>
						</view>

						<view
							class="login__info__item__input tn-flex tn-flex-direction-row tn-flex-nowrap tn-flex-col-center tn-flex-row-left tn-skeleton-fillet">
							<view class="login__info__item__input__left-icon">
								<view class="tn-icon-lock"></view>
							</view>
							<view class="login__info__item__input__content">
								<input :password="!showPassword" v-model="password"
									placeholder-class="input-placeholder" placeholder="请输入密码" />
							</view>
							<view class="login__info__item__input__right-icon" @click="showPassword = !showPassword">
								<view :class="[showPassword ? 'tn-icon-eye' : 'tn-icon-eye-hide']"></view>
							</view>
						</view>
					</block>

					<view
						:class="['login__info__item__button', 'tn-skeleton-circle', 'tn-cool-bg-color-7--reverse',canLogin ? 'can-login' : '']"
						hover-class="tn-hover" :hover-stay-time="150" @click="login">登录</view>

					<view class="login__info__item__tips tn-skeleton-fillet" @click="unLogin">暂不登录</view>

					<!-- <view v-if="currentModeIndex === 0" class="login__info__item__tips">忘记密码?</view> -->
				</view>

			</view>

		</view>

		<tn-skeleton :show="showSkeleton"></tn-skeleton>

		<!-- #ifdef MP-WEIXIN -->
		<privacy-popup v-if="showPrivacyPopup" ref="privacyComponent"></privacy-popup>
		<!-- #endif -->
		
		<successCom ref="refSuccess"></successCom>

	</view>
</template>

<script>
	import store from '@/store/index.js'
	import {
		loginApi
	} from '@/config/api.js';
	import template_page_mixin from '@/libs/mixin/template_page_mixin.js'
	import PrivacyPopup from '@/components/privacy-popup/privacy-popup.vue';
	import successCom from '@/components/success.vue'
	import {
		pagesLogin
	} from '@/js/pages/login.js'
	export default {
		name: 'login-demo-1',
		mixins: [pagesLogin, template_page_mixin],
		components: {
			PrivacyPopup,
			successCom
		},
		data() {
			return {
				showSkeleton: true,
				username: '',
				password: '',
				// 当前选中的模式
				currentModeIndex: 0,
				// 模式选中滑块
				modeSliderStyle: {
					left: 0
				},
				// 是否显示密码
				showPassword: false,
				// 倒计时提示文字
				tips: '获取验证码',
				showPrivacyPopup: false,
			}
		},
		onLoad(option) {
			let _this = this
			uni.login({
				provider: 'weixin',
				success: function (loginRes) {
					console.log('id:',loginRes);
				},
				fail:function(res){
					uni.showToast({
						title:res,
						icon:'none'
					})
				}
			})	

		},
		watch: {
			currentModeIndex(value) {
				const sliderWidth = uni.upx2px(476 / 2)
				this.modeSliderStyle.left = `${sliderWidth * value}px`
			}
		},
		computed: {
			canLogin() {
				let flag = false;
				if (this.username && this.password) {
					flag = true;
				}
				return flag;
			}
		},
		mounted() {
			setTimeout(() => {
				this.showSkeleton = false
			}, 1000)
			// #ifdef MP-WEIXIN
			wx.getPrivacySetting().then(res => {
				if (!res) {
					this.showPrivacyPopup = true;
				}
			})
			// #endif
			
			let vuex_is_login = uni.getStorageSync('vuex_is_login')
			if (vuex_is_login) {
				uni.reLaunch({
					url: '/pages/index/index'
				});
			}
		},
		methods: {
			login() {
				if (!this.username) {
					this.$refs.refSuccess.showBox({
						type: 'error',
						txt: '账号不能为空！'
					});
					return false;
				}
				if (!this.password) {
					this.$refs.refSuccess.showBox({
						type: 'error',
						txt: '密码不能为空！'
					});
					return false;
				}
				uni.showLoading({
					title: '登录中'
				});
				let data = {
					usercode:this.username,
					pwd:this.password
				}
				
				// 登录成功后跳转首页 - 测试
				
						store.commit('$tStore', {
							name: 'vuex_user',
							value: this.username
						})
						store.commit('$tStore', {
							name: 'uuid',
							value: 1
						})
						store.commit('$tStore', {
							name: 'access_token',
							value: 'token'
						})
						store.commit('$tStore', {
							name: 'usercode',
							value: '上海市青浦区'
						})
						store.commit('$tStore', {
							name: 'vuex_is_login',
							value: true
						})
						uni.reLaunch({
							url: '/pages/index/index'
						});
				// 登录成功后跳转首页 - 正式
				// loginApi(data).then((res)=>{
				// 	uni.hideLoading();
				// 	if (res.success) {
				// 		store.commit('$tStore', {
				// 			name: 'vuex_user',
				// 			value: this.username
				// 		})
				// 		store.commit('$tStore', {
				// 			name: 'uuid',
				// 			value: res.data.uuid
				// 		})
				// 		store.commit('$tStore', {
				// 			name: 'access_token',
				// 			value: res.data.token_type + ' ' + res.data.access_token
				// 		})
				// 		store.commit('$tStore', {
				// 			name: 'usercode',
				// 			value: res.data.usercode
				// 		})
				// 		store.commit('$tStore', {
				// 			name: 'vuex_is_login',
				// 			value: true
				// 		})
				// 		uni.reLaunch({
				// 			url: '/pages/index/index'
				// 		});
				// 	} else {
				// 		this.$refs.refSuccess.showBox({
				// 			type: 'error',
				// 			txt: res.message
				// 		});
				// 	}
					
				// })
				
			},
			unLogin() {
				uni.reLaunch({
					url: '/pages/index/index'
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/static/css/templatePage/custom_nav_bar.scss';

	/* 悬浮 */
	.rocket-sussuspension {
		animation: suspension 3s ease-in-out infinite;
	}

	@keyframes suspension {

		0%,
		100% {
			transform: translate(0, 0);
		}

		50% {
			transform: translate(-0.8rem, 1rem);
		}
	}

	.login {
		position: relative;
		height: 100%;
		z-index: 1;

		/* 背景图片 start */
		&__bg {
			z-index: -1;
			position: fixed;

			&--top {
				top: 0;
				left: 0;
				right: 0;
				width: 100%;

				.bg {
					width: 750rpx;
					will-change: transform;
				}

				.rocket {
					margin: 50rpx 28%;
					width: 400rpx;
					will-change: transform;
				}
			}

			&--bottom {
				bottom: -10rpx;
				left: 0;
				right: 0;
				width: 100%;
				// height: 144px;
				margin-bottom: env(safe-area-inset-bottom);

				image {
					width: 750rpx;
					will-change: transform;
				}
			}
		}

		/* 背景图片 end */

		/* 内容 start */
		&__wrapper {
			margin-top: 403rpx;
			width: 100%;
		}

		/* 切换 start */
		&__mode {
			position: relative;
			margin: 0 auto;
			width: 476rpx;
			height: 77rpx;
			background-color: #FFFFFF;
			box-shadow: 0rpx 10rpx 50rpx 0rpx rgba(0, 3, 72, 0.1);
			border-radius: 39rpx;

			&__item {
				height: 77rpx;
				width: 100%;
				line-height: 77rpx;
				text-align: center;
				font-size: 31rpx;
				color: #908f8f;
				letter-spacing: 1em;
				text-indent: 1em;
				z-index: 2;
				transition: all 0.4s;

				&--active {
					font-weight: bold;
					color: #FFFFFF;
				}
			}

			&__slider {
				position: absolute;
				height: inherit;
				width: calc(476rpx / 2);
				border-radius: inherit;
				box-shadow: 0rpx 18rpx 72rpx 18rpx rgba(0, 195, 255, 0.1);
				z-index: 1;
				transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
			}
		}

		/* 切换 end */

		/* 登录注册信息 start */
		&__info {
			margin: 0 30rpx;
			margin-top: 105rpx;
			padding: 30rpx 51rpx;
			padding-bottom: 0;
			border-radius: 20rpx;
			background-color: #ffff;
			box-shadow: 0rpx 10rpx 50rpx 0rpx rgba(0, 3, 72, 0.1);

			&__item {

				&__input {
					margin-top: 59rpx;
					width: 100%;
					height: 77rpx;
					border: 1rpx solid #E6E6E6;
					border-radius: 39rpx;

					&__left-icon {
						width: 10%;
						font-size: 44rpx;
						margin-left: 20rpx;
						color: #AAAAAA;
					}

					&__content {
						width: 80%;
						padding-left: 10rpx;

						&--verify-code {
							width: 56%;
						}

						input {
							font-size: 24rpx;
							// letter-spacing: 0.1em;
						}
					}

					&__right-icon {
						width: 10%;
						font-size: 44rpx;
						margin-right: 20rpx;
						color: #AAAAAA;
					}

					&__right-verify-code {
						width: 34%;
						margin-right: 20rpx;
					}
				}

				&__button {
					margin-top: 75rpx;
					margin-bottom: 39rpx;
					width: 100%;
					height: 77rpx;
					text-align: center;
					font-size: 31rpx;
					font-weight: bold;
					line-height: 77rpx;
					letter-spacing: 1em;
					text-indent: 1em;
					border-radius: 39rpx;
					box-shadow: 1rpx 10rpx 24rpx 0rpx rgba(60, 129, 254, 0.35);
				}

				&__tips {
					margin: 30rpx 0;
					color: #AAAAAA;
				}
			}
		}

		/* 登录注册信息 end */

		/* 登录方式切换 start */
		&__way {
			margin: 0 auto;
			margin-top: 110rpx;

			&__item {
				&--icon {
					width: 77rpx;
					height: 77rpx;
					font-size: 50rpx;
					border-radius: 100rpx;
					margin-bottom: 18rpx;
					position: relative;
					z-index: 1;

					&::after {
						content: " ";
						position: absolute;
						z-index: -1;
						width: 100%;
						height: 100%;
						left: 0;
						bottom: 0;
						border-radius: inherit;
						opacity: 1;
						transform: scale(1, 1);
						background-size: 100% 100%;
						background-image: url(https://resource.tuniaokj.com/images/cool_bg_image/icon_bg5.png);
					}
				}
			}
		}

		/* 登录方式切换 end */
		/* 内容 end */

	}

	/deep/.input-placeholder {
		font-size: 24rpx;
		color: #999;
	}

	.bg-login {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
	}

	.login-title-box {
		position: absolute;
		left: 15px;
		top: -96px;

		.login-title-top,
		.login-title-bottom {
			font-size: 20px;
			font-weight: bold;
			height: 38px;
			line-height: 38px;
			color: #084338;
		}
	}

	.login__info__item__input {
		border-radius: 8px;
		background: #F4F8FA;
		border: 0;
		height: 45px;
		line-height: 45px;
	}

	.tn-icon-my-reduce:before,
	.tn-icon-lock:before {
		color: #4A7971;
	}

	.login__info__item__button {
		background: rgba(62, 152, 157, 0.6);
		margin-top: 120px;
		height: 45px;
		line-height: 45px;
		border-radius: 23px;
		font-size: 16px;
	}

	.can-login {
		background: $uni-color-app;
	}
</style>