<template>
	<nav>
		<el-breadcrumb separator="/">
			<el-breadcrumb-item to="/">首页</el-breadcrumb-item>
			<el-breadcrumb-item to="/goods">全部商品</el-breadcrumb-item>
			<el-breadcrumb-item to="/goods">品牌周边</el-breadcrumb-item>
			<el-breadcrumb-item to="/thanks">捐赠名单</el-breadcrumb-item>
		</el-breadcrumb>
	</nav>
</template>

<script>
import { getNav } from "api/index.js";
export default {
	data() {
		return {
			navlist: [],
			listitem: {},
		};
	},
	created() {
		getNav().then((result) => {
			console.log(result);
			this.navlist = result.data.list;
			let map = new Map();
			for (let i in list) {
				map.set(list[i].NAME, result[i]);
			}
		});
	},
};
</script>

<style scoped>
nav {
	height: 90px;
	background-color: #fcfcfc;
	box-shadow: 0 3px 3px rgba(100, 100, 100, 0.2);
	width: 100%;
	display: flex;
	align-items: center;
}
</style>