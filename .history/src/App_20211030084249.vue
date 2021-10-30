<template>
	<div id="app">
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
