<template>
	<div class="nav" @mouseover="move" @mouseleave="currentMouseLeave">
		<nav>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item to="/">首页</el-breadcrumb-item>
				<el-breadcrumb-item to="/goods">全部商品</el-breadcrumb-item>
				<el-breadcrumb-item></el-breadcrumb-item>
			</el-breadcrumb>
			<div class="list">
				<span
					class="list-item"
					v-for="(item, index) in navlist"
					@mouseenter="currentMouseEnter(item)"
					>{{ item.name }}</span
				>
			</div>
			<div class="search-box">
				<el-autocomplete
					:popper-append-to-body="false"
					v-model="queryString"
					:fetch-suggestions="querySearchAsync"
					placeholder="请输入内容"
					@select="handleSelect"
					@change="searchGoods"
					suffix-icon="el-icon-search"
					class="input"
				></el-autocomplete>
			</div>
		</nav>

		<transition name="translate">
			<div
				class="list-content"
				v-show="showListContent && currentContent.length !== 0"
			>
				<div
					v-for="(item, index) in currentContent"
					:key="index"
					class="goods-item"
					@click="goodsDetails(item.product_id, item.groups)"
				>
					<div class="img"><img :src="item.product_img" alt="" /></div>
					<span class="title">{{ item.product_title }}</span>
					<span class="price">{{ item.price }}</span>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
import { getNav } from "api/index.js";
import { goodsDetailMixin } from "common/mixin/mixin.js";
export default {
	data() {
		return {
			navlist: [],
			listitem: Map,
			currentContent: [],
			showListContent: false,
			restaurants: [],
			queryString: "",
		};
	},
	mixins: [goodsDetailMixin],
	methods: {
		currentMouseEnter(item) {
			this.currentContent = this.listitem.get(item.name);
		},
		currentMouseLeave() {
			// this.currentContent = [];
			this.showListContent = false;
		},
		move() {
			this.showListContent = true;
		},
		searchGoods() {
			this.$router.push({
				path: "/search",
				query: {
					keywords: this.queryString,
				},
			});
		},
		loadAll() {
			return [];
		},
		querySearchAsync(queryString, cb) {
			var restaurants = this.restaurants;
			var results = queryString
				? restaurants.filter(this.createStateFilter(queryString))
				: restaurants;

			clearTimeout(this.timeout);
			this.timeout = setTimeout(() => {
				cb(results);
			}, 3000 * Math.random());
		},
		createStateFilter(queryString) {
			return (state) => {
				return (
					state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
				);
			};
		},
		handleSelect(item) {
			console.log(item);
		},
	},
	created() {
		getNav().then((result) => {
			this.navlist = result.data.list;
			let map = new Map();
			for (let i in this.navlist) {
				map.set(this.navlist[i].name, result.data[i]);
			}
			this.listitem = map;
		});
	},
	mounted() {
		this.restaurants = this.loadAll();
	},
};
</script>

<style lang="scss" scoped>
nav {
	height: 70px;
	padding: 0 20px;
	background-color: #fcfcfc;
	box-shadow: 0 3px 3px rgba(100, 100, 100, 0.2);
	width: 100%;
	display: flex;
	position: relative;
	z-index: 99;
	align-items: center;

	.list {
		display: flex;
		justify-content: space-around;
		margin-left: 10%;
		width: 50%;
		.list-item {
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 10px 20px;
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
	z-index: 98;
	text-align: center;
	box-shadow: 0 5px 8px rgba($color: #000000, $alpha: 0.3);
	.goods-item {
		cursor: pointer;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 15vw;
		height: 100%;
		font-size: 12px;
		overflow: hidden;
		&:hover {
			background: #fcfcfc;
		}
		.img {
			width: 15vw;
			border-right: 2px solid #e3e3e3;
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
				content: "元起";
			}
		}
	}
}
.translate-enter-active,
.translate-leave-active {
	transition: transform 0.5s;
}
.translate-enter {
	transform: translateY(-200px);
}
.translate-leave-to {
	transform: translateY(-200px);
	box-shadow: none;
	z-index: 98;
}
.search-box {
	margin-left: 50px;
	.input {
		border-radius: 40px;
	}
}
</style>