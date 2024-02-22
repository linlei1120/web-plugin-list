<template>
	<view class="success-box">
		<tn-popup v-model="show" mode="center" length="84%" :borderRadius="20">
			<view class="pop-box">
				<view class="pop-img-box" v-if="type == 'success'">
					<image src="../static/success.png" style="width:60px;height:60px;"></image>
				</view>
				<view class="pop-tip" v-if="type == 'success'">{{txt}}</view>

				<view class="pop-alert-box" v-if="type == 'error' || type == 'warning'">
					<image class="error-icon" src="../static/error.png" v-if="type == 'error'"
						style="width:38px;height:38px;"></image>
					<image class="error-icon" src="../static/warning.png" v-if="type == 'warning'"
						style="width:38px;height:38px;"></image>
				</view>

				<view class="pop-alert-tip" v-if="type == 'error' || type == 'warning'">{{txt}}</view>
				<view class="pop-alert-know" v-if="type == 'error' || type == 'warning'" @click="closeBox">我知道了</view>

			</view>
		</tn-popup>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				show: false,
				type: 'success',
				txt: '提交成功！'
			}
		},
		props: {

		},
		methods: {

			showBox(obj) {
				this.type = obj.type
				this.txt = obj.txt
				this.show = true;
				if (this.type == 'success') {
					setTimeout(() => {
						this.show = false;
					}, 2000)
				}
			},
			closeBox() {
				this.show = false;
			},
			confirm() {

			}
		}
	}
</script>

<style scoped lang="scss">
	.success-box {
		width: 100%;
		background-color: #fff;
		border-radius: 8px;

		.pop-box {
			position: relative;

		}

		.pop-img-box {
			margin-top: 25px;
			height: 60px;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.pop-alert-box {
			height: 74px;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.pop-tip {
			height: 22px;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #000;
			font-size: 16px;
			margin-top: 20px;
			margin-bottom: 20px;
		}

		@keyframes print {
			from {
				opacity: 0.1;
			}

			/* 第二种状态 */
			to {
				opacity: 1;
			}

			/* 结束状态 */
		}

		.pop-alert-tip {
			min-height: 20px;
			padding:0 15px;
			display: flex;
			align-items: center;
			justify-content: center;
			color: rgba(35, 35, 35, 0.8);
			font-size: 14px;
			padding-bottom: 15px;
			margin-bottom: 10px;
			animation-name: print;
			animation-duration: 1s;
			animation-iteration-count: 1;
		}

		.pop-alert-know {
			height: 46px;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #000;
			font-size: 16px;
			border-top: 1px solid rgba(35, 35, 35, 0.2);
		}

		.error-icon {
			animation: shake-left 1s 1;
		}

		@keyframes shake-left {
			from {
				transform: rotate(-45deg) translateX(-10px);
			}

			/* 初始位置 */
			to {
				transform: rotate(0deg) translateX(0px);
			}

			/* 返回原位置 */
		}

	}
</style>