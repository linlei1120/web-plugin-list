<template>
	<view class="template-job tn-safe-area-inset-bottom tn-skeleton">

		<!-- 顶部自定义导航 -->
		<tn-nav-bar fixed :isBack="false" :bottomShadow="false" backgroundColor="unset">
			<text class="page-title">首页</text>
		</tn-nav-bar>

		<tn-skeleton :show="showSkeleton"></tn-skeleton>
		<successCom ref="refSuccess"></successCom>

	</view>
</template>

<script>
	import successCom from '@/components/success.vue'
	
	import {
		minLogin
	} from '@/js/minLogin.js'
	import {
		pagesHome
	} from '@/js/pages/home.js'
	export default {
		mixins: [minLogin, pagesHome],
		components: {
			successCom
		},
		data() {
			return {
				showSkeleton: true,
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#F93737',
					}
				}, ],
				boxKey: 0,
				scrollHeight: 500,
				paddingTop: 60,
				emitDate: 'indexHome',
				show: false,
				time: '',
				list: [],
				options1: [{
					text: '删除',
					style: {
						backgroundColor: '#F93737'
					}
				}]
			}
		},
		computed:{
			countList(){
				let num = 0;
				for (let i in this.list) {
					num += this.list[i].fQty;
				}
				return num;
			}
		},
		mounted() {
			setTimeout(() => {
				this.showSkeleton = false
			}, 1000)
			
			this.$refs.refSuccess.showBox({
				type:'error',//success/error/warning,
				txt:'操作失败，请重试！'
			})
			
			this.scrollHeight = this.screenHeight - 282;

			setTimeout(() => {
				this.paddingTop = this.vuex_padding_top
				this.paddingTop += 5
			}, 400)
			
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>

</style>