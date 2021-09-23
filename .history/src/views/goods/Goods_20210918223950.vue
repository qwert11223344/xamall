<template>
	<div class="goods">商品</div>
</template>

<script>
import { getAllgoods } from "api/goods";
export default {
	data() {
		return {};
	},
	components: {},
	methods: {},
	created() {
		getAllgoods().then((res) => {
			console.log(res);
		});
	},
};
</script>

<style scoped>
</style>