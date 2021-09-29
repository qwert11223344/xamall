<template>
	<div class="nav">
		<nav>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item to="/">首页</el-breadcrumb-item>
				<el-breadcrumb-item to="/goods">全部商品</el-breadcrumb-item>
			</el-breadcrumb>
			<div class="list">
				<span
					class="list-item"
					v-for="(item, index) in navlist"
					@mouseenter="currentMouse(item)"
					>{{ item.name }}</span
				>
			</div>
		</nav>
		<div class="list-content">
			<div
				v-for="(item, index) in currentContent"
				:key="index"
				class="goods-item"
			>
				<div class="img"><img :src="item.product_img" alt="" /></div>
				<span class="title">{{ item.product_title }}</span>
				<span class="price">{{ item.price }}</span>
			</div>
		</div>
	</div>
</template>

<script>
import { getNav } from "api/index.js";
export default {
	data() {
		return {
			navlist: [],
			listitem: Map,
			currentContent: [],
		};
	},
	methods: {
		currentMouse(item) {
			this.currentContent = this.listitem.get(item.name);
		},
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
			this.currentContent = this.listitem.get(this.navlist[0].name);
		});
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
		.list-item {
			display: flex;
			justify-content: center;
			align-items: center;
			color: #000;
			&:hover {
				cursor: pointer;
				color: #f36f52;
			}
		}
	}
}
.list-content {
	width: 100%;
	height: 200px;
	background-color: #ffffff;
	display: flex;
	position: absolute;
	top: 180px;
	z-index: 999;
	text-align: center;
	box-shadow: 0 5px 8px rgba($color: #000000, $alpha: 0.3);
	.goods-item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 15vw;
		height: 100%;

		font-size: 12px;
		overflow: hidden;
		.img {
			width: 15vw;

			border-right: 2px solid #f1f2f3;
			img {
				width: 130px;
			}
		}

		.title {
			display: inline-block;
			width: 100%;

			color: #000;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
		}
		.price {
			color: #f36f52;
			margin-top: 5px;
			&::after {
				content: "起";
			}
		}
	}
}
</style>