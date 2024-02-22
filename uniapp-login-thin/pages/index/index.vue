<template>
	<view class="index ">

		<scroll-view scroll-y="true" class="scroll-Y custom-tabbar-page" @scrolltolower="lower">
			<homeCom v-show="currentIndex == 0"></homeCom>
			<mainCom v-show="currentIndex == 1" ref="mainRef"></mainCom>
			<personCom v-show="currentIndex == 2"></personCom>
		</scroll-view>

		<view class="tn-skeleton tn-skeleton-fillet">
			<tn-tabbar @change="chenge" :shadow="false" v-model="currentIndex" :safeAreaInsetBottom="true"
				:list="tabbarList" activeColor="#838383" inactiveColor="#AAAAAA" activeIconColor="tn-cool-bg-color-7"
				:animation="true" v-if="showTabbar"></tn-tabbar>
		</view>

		<tn-skeleton :show="showSkeleton"></tn-skeleton>

	</view>
</template>

<script>
	import store from '@/store/index.js'

	import homeCom from './home.vue';
	import mainCom from './main.vue';
	import personCom from './person.vue';

	export default {
		components: {
			homeCom,
			mainCom,
			personCom
		},
		data() {
			return {
				showSkeleton: true,
				currentIndex:0,
				showTabbar: true,
				scrollHeight: 800,
				title: 'Hello',
				list: [{
					text: '分享'
				}],
				tabbarList: [{
						title: '首页',
						activeIcon: '/static/tabbar/上报_f_icon.png',
						inactiveIcon: '/static/tabbar/上报_l_icon.png',
						iconSize: 52,
						activeColor: '#40A290',
					},

					{
						title: '主页',
						activeIcon: '/static/tabbar/数据_f_icon.png',
						inactiveIcon: '/static/tabbar/数据_l_icon.png',
						iconSize: 52,
						activeColor: '#40A290',
						// activeIconColor: '#FFFFFF',
						// inactiveIconColor: '#FFFFFF',
						// iconSize: 50,
						// out: true
					},

					{
						title: '我的',
						activeIcon: '/static/tabbar/我的_f_icon.png',
						inactiveIcon: '/static/tabbar/我的_l_icon.png',
						iconSize: 52,
						activeColor: '#40A290',
					}
				],

			}
		},
		onLoad() {

		},
		computed: {
			pageTitle() {
				return this.tabbarList[this.currentIndex].title
			},
			heHeight() {
				let num = 0;
				return num;
			}
		},
		onReachBottom() {

		},
		watch: {

		},
		mounted() {

			let indexHeight = 0
			// #ifdef MP-WEIXIN
			this.marginTop = this.vuex_custom_bar_height
			indexHeight = 40
			// #endif

			// #ifdef APP-PLUS || APP
			this.marginTop = this.vuex_custom_bar_height
			indexHeight = 20
			// #endif

			// #ifdef H5
			this.marginTop = this.vuex_custom_bar_height + this.vuex_status_bar_height
			indexHeight = 50
			// #endif

			store.commit('$tStore', {
				name: 'vuex_custom_scroll_height',
				value: this.scrollHeight
			})

			store.commit('$tStore', {
				name: 'vuex_padding_top',
				value: this.marginTop
			})
			store.commit('$tStore', {
				name: 'vuex_custom_index_height',
				value: this.indexHeight
			})


			setTimeout(() => {
				this.showSkeleton = false
			}, 1000)
		},
		methods: {

			chenge(index) {
				this.currentIndex = index;
				if (index == 1) {

				}
			},
			click(index) {

			}
		}
	}
</script>

<style>
	.index {
		overflow: hidden;
		height: 100%;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.home-search {
		background-color: #fff !important;
		z-index: 2;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}

	.custom-tabbar-page {
		height: calc(100vh - (100rpx + env(safe-area-inset-bottom) / 2));
		background-color: #f8f8f8;
	}
</style>