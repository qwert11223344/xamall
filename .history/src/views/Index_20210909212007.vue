<template>
	<div>
		<w-header />
		<w-nav />
		<router-view />
	</div>
</template>

<script>
import WHeader from "common/Header.vue";
import WNav from "common/Nav.vue";
export default {
	components: {
		WHeader,
		WNav,
	},
};
</script>

<style scoped>
</style>