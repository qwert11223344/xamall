<template>
	<div>
		<w-header />
		<w-nav />

		<router-view />
		<el-backtop
			target=".page-component__scroll .el-scrollbar__wrap"
		></el-backtop>
		<w-footer />
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
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
</style>