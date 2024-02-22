<template>
	<view class="tip-box">
		{{txt}}
		<tn-loading v-if="tip == 3" mode="flower" :show="true"></tn-loading>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		props: {
			tip: {
				type: Number | String,
				default: 1
			}
		},
		computed: {
			txt() {
				if (this.tip == 1) {
					return '上拉加载更多'
				} else if (this.tip == 2) {
					return '暂无更多数据'
				} else if (this.tip == 3) {
					return '正在加载中'
				}
			}
		},
		methods: {

		}
	}
</script>

<style scoped lang="scss">
	.tip-box {
		width: 100%;
		height: 18px;
		display: flex;
		font-size: 13px;
		color: #999;
		align-items: center;
		justify-content: center;
	}
</style>