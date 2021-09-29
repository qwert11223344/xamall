<template>
	<nav>
		<el-breadcrumb separator="/">
			<el-breadcrumb-item to="/">首页</el-breadcrumb-item>
			<el-breadcrumb-item to="/goods">全部商品</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="list">
			<span v-for="(item, index) in navlist">{{ item.name }}</span>
		</div>
	</nav>
</template>

<script>
import { getNav } from "api/index.js";
export default {
	data() {
		return {
			navlist: [],
			listitem: Map,
		};
	},
	created() {
		getNav().then((result) => {
			console.log(result);
			this.navlist = result.data.list;
			let map = new Map();
			for (let i in this.navlist) {
				map.set(this.navlist[i].name, result.data[i]);
			}
			this.listitem = map;
		});
		console.log(this.listitem);
	},
};
</script>

<style lang="scss" scoped>
nav {
	height: 90px;
	background-color: #fcfcfc;
	box-shadow: 0 3px 3px rgba(100, 100, 100, 0.2);
	width: 100%;
	display: flex;
	align-items: center;
	.list {
		display: flex;
		justify-content: space-around;
		width: 70%;
	}
}
</style>