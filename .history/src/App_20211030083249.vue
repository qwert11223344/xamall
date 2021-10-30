<template>
	<div id="app">
		<el-backtop target="#app"></el-backtop>
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
</style>
