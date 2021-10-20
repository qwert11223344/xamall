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

import { mapState, mapMutations } from "vuex";
export default {
	components: {
		WHeader,
		WNav,
		WFooter,
	},
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
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "assets/style/mixin.scss";

.main {
	min-height: calc(100vh - 454px);
	background: #ededed;
	overflow: hidden;
	width: 100%;
}

.bn {
	border-style: none;
	border-width: 0;
	border: none;
}

.move_img {
	position: fixed;
	@include wh(40px);
	width: 45px;
	z-index: 29;
	height: 45px;
	div {
		@extend .bn;
	}
	img {
		border-radius: 50%;
		width: 100%;
		height: 100%;
		display: block;
		@extend .bn;
	}
}
</style>