<template>
	<view class="template-job tn-safe-area-inset-bottom">

		<!-- 顶部自定义导航 -->
		<tn-nav-bar fixed :isBack="false" :bottomShadow="false" backgroundColor="unset">
			<text class="page-title">我的</text>
		</tn-nav-bar>

		<view class="home-top-bg"></view>

		<view class="home-top-box" :style="{paddingTop:paddingTop+'px'}">
			<view class="userinfo-box">
				<view class="userinfo-img">
					<image src="../../static/user.png" style="width:50px;height:50px;"></image>
				</view>
				<view class="userinfo-value-box">
					<view class="user-nickname">{{ vuex_is_login ? vuex_user :'昵称' }}</view>
					<view class="user-company">{{ vuex_is_login ? usercode :'暂未登录' }}</view>
				</view>
			</view>

			<view style="margin:0 15px;margin-top:20px;">
				<linkCom :list="list"></linkCom>
			</view>
		</view>

		<scroll-view scroll-y="true" class="scroll-Y">
			<view class="scroll-box">

			</view>
		</scroll-view>

		<view class="confirm-box">
			<view class="confirm-right" @click="logout" v-if="vuex_is_login">退出登录</view>
			<view class="confirm-right" @click="confirm" v-if="!vuex_is_login">去登录</view>
		</view>

		<u-modal :show="show" :title="title" @cancel="cancel" @confirm="confirm" ref="uModal" :showCancelButton="true"
			:content='content'></u-modal>

	</view>
</template>

<script>
	import store from '@/store/index.js'
	import linkCom from '@/components/linkBox.vue'

	import {
		minLogin
	} from '@/js/minLogin.js'
	import {
		pagesPerson
	} from '@/js/pages/person.js'
	export default {
		mixins: [pagesPerson, minLogin],
		components: {
			linkCom
		},
		data() {
			return {
				show: false,
				title: '退出登录',
				content: '确认退出当前登录？',
				scrollHeight: 500,
				paddingTop: 60,
				list: [{
						title: '设置',
						route: '',
						icon: '/static/my/上报历史.png'
					},
					{
						title: '历史记录',
						route: '',
						icon: '/static/my/产品流向.png'
					}
				]
			}
		},
		mounted() {
			this.getInfo();
			setTimeout(() => {
				this.paddingTop = this.vuex_padding_top
				this.paddingTop += 5
			}, 700)

		},
		methods: {
			getInfo() {

			},
			cancel() {
				this.show = false;
			},
			confirm() {
				store.commit('$tStore', {
					name: 'vuex_is_login',
					value: false
				})
				uni.reLaunch({
					url: '/pages/index/login'
				});
			},
			logout() {
				this.show = true;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.home-top-bg {
		width: 100%;
		height: 175px;

		background: linear-gradient(225deg, #D1EEE8 0%, #D0EEE7 0%, #F5F5F5 100%);
		border-radius: 0px 0px 0px 0px;
		opacity: 1;
		filter: blur(220px);
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1;
	}

	.home-top-box {
		width: 100%;
		height: 302px;
		position: fixed;
		top: 0;
		left: 0;
		border-bottom-left-radius: 30px;
		border-bottom-right-radius: 30px;
		z-index: 1;
	}

	.scroll-Y {
		width: 100%;
		margin-top: 232px;
		position: relative;
	}

	.scroll-box {
		padding-top: 30px;
		padding-bottom: 50px;
		display: flex;
		flex-wrap: wrap;
	}

	.confirm-box {
		position: fixed;
		width: 100%;
		height: 65px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: env(safe-area-inset-bottom);
		bottom: 70px;
		padding: 0 30px;

		.confirm-left {
			font-size: 14px;
			color: rgba(35, 35, 35, 0.5);
		}

		.confirm-right {
			height: 45px;
			background: #3E989D;
			border-radius: 32px;
			color: #fff;
			font-size: 15px;
			font-weight: bold;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
		}
	}

	.userinfo-box {
		padding: 0 15px;
		margin-top: 20px;
		display: flex;

		.userinfo-img {
			padding-left: 15px;
			height: 50px;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.userinfo-value-box {
			padding-left: 20px;

			.user-nickname {
				height: 28px;
				font-size: 15px;
				font-weight: bold;
				color: #000000;
			}

			.user-company {
				height: 22px;
				font-size: 12px;
				color: rgba(35, 35, 35, 0.7);
			}
		}
	}
</style>