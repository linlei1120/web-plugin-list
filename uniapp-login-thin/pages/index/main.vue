<template>
	<view class="template-job tn-safe-area-inset-bottom">

		<!-- 顶部自定义导航 -->
		<tn-nav-bar fixed :isBack="false" :bottomShadow="false" backgroundColor="unset">
			<text class="page-title">主页</text>
		</tn-nav-bar>


	</view>
</template>

<script>
	
	import {
		pagesMain
	} from '@/js/pages/main.js'
	export default {
		mixins: [pagesMain],
		components: {

		},
		data() {
			return {

			}
		},
		computed:{

		},
		onLoad() {

		},
		mounted() {
			

		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>

</style>