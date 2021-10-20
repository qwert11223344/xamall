<template>
	<div>
		<w-header />
		<w-nav />
		<keep-alive exclude="GoodsDetail">
			<router-view />
		</keep-alive>
		<w-footer />
		<transition @after-enter="afterEnter" @before-enter="beforeEnter">
			<!--整张图片-->
			<div
				class="move_img"
				v-if="showMoveImg"
				:style="{
					left: cartPositionL - 10 + 'px',
					top: cartPositionT - 10 + 'px',
				}"
			>
				<div><img :src="moveImgUrl" /></div>
			</div>
		</transition>
	</div>
</template>

<script>
import WHeader from "common/Header.vue";
import WNav from "common/Nav.vue";
import WFooter from "common/Footer.vue";
export default {
	components: {
		WHeader,
		WNav,
		WFooter,
	},
	computed: {
		computed: {
			...mapState([
				"cartPositionT",
				"cartPositionL",
				"showMoveImg",
				"elLeft",
				"elTop",
				"moveImgUrl",
			]),
		},
	},
};
</script>

<style scoped>
</style>