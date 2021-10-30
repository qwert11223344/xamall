<template>
	<div id="app">
		<el-backtop
			target="#app"
			:visibility-height="20"
			:right="50"
			:bottom="50"
		></el-backtop>
		<router-view />
	</div>
</template>

<script>
export default {
	name: "App",
	components: {},
};
</script>

<style scoped>
@import url("assets/fonts/iconfont.css");
@import url("assets/style/index.scss");
#app {
	overflow-y: scroll;
	height: 100vh;
}
</style>
