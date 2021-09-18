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
import WFooter from "common/Footer.vue";
export default {
	components: {
		WHeader,
		WNav,
		WFooter,
	},
};
</script>

<style scoped>
</style>