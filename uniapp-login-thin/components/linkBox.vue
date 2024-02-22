<template>
	<view class="link-box">
		<view :class="['link-bottom',index != 0 ? '' : '']" v-for="(item,index) in list" :key="index"
			@click="toPage(item.route)">
			<view style="color:#555;" class="link-left">
				<image :src="item.icon" style="width:22px;height:22px;margin-right:10px;"></image>
				{{item.title}}
			</view>
			<image src="../static/right.png" style="width:20px;height:20px;"></image>
		</view>
	</view>
</template>

<script>
	import {
		minLogin
	} from '@/js/minLogin.js'
	export default {
		mixins: [minLogin],
		data() {
			return {

			}
		},
		props: {
			list: {
				type: Array,
				default: () => {
					return []
				}
			}
		},
		methods: {
			toPage(url) {
				if (url) {
					let isLogin = this.checkLogin()
					if (isLogin) {
						return false;
					}
					uni.navigateTo({
						url: url
					});
				}

			}
		}
	}
</script>

<style scoped lang="scss">
	.link-box {
		width: 100%;
		background-color: #fff;
		border-radius: 8px;
		padding: 10px 0;
	}

	.link-left {
		display: flex;
		align-items: center;
	}

	.link-bottom {
		min-height: 42px;
		padding: 0 10px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.link-bottom-border {
		border-top: 1px solid rgba(35, 35, 35, 0.1);
	}
</style>