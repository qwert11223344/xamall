<template>
	<div class="goods">商品</div>
</template>

<script>
import { getAllGoods } from "api/goods";
export default {
	data() {
		return {};
	},
	components: {},
	methods: {},
	created() {
		getAllGoods().then((res) => {
			console.log(res);
		});
	},
};
</script>

<style scoped>
</style>