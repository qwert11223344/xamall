<template>
	<div>
		<w-header />
		<w-nav />
		<keep-alive exclude="GoodsDetail">
			<router-view />
		</keep-alive>
		<w-footer />
	</div>
</template>

<script>
import WHeader from "common/Header.vue";
import WNav from "common/Nav.vue";
import WFooter from "common/Footer.vue";

import { ADD_ANIMATION } from "store/mutation-types";
export default {
	components: {
		WHeader,
		WNav,
		WFooter,
	},
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "assets/style/mixin.scss";
</style>