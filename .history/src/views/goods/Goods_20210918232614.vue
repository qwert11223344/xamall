<template>
	<div class="goods">
		<div class="nav">
			<div class="w">
				<a
					href="javascript:;"
					:class="{ active: sortType === 1 }"
					@click="reset()"
					>综合排序</a
				>
				<a
					href="javascript:;"
					@click="sortByPrice(1)"
					:class="{ active: sortType === 2 }"
					>价格从低到高</a
				>
				<a
					href="javascript:;"
					@click="sortByPrice(-1)"
					:class="{ active: sortType === 3 }"
					>价格从高到低</a
				>
				<div class="price-interval">
					<input type="number" class="input" placeholder="价格" v-model="min" />
					<span style="margin: 0 5px"> - </span>
					<input type="number" placeholder="价格" v-model="max" />
					<w-button
						text="确定"
						classStyle="main-btn"
						@btnClick="reset"
						style="margin-left: 10px"
					></w-button>
				</div>
			</div>
		</div>

		<div
			v-loading="loading"
			element-loading-text="加载中..."
			style="min-height: 35vw"
		>
			<div class="img-item" v-if="!noResult">
				<!--商品-->
				<div class="goods-box w">
					<mall-goods
						v-for="(item, i) in goods"
						:key="i"
						:msg="item"
					></mall-goods>
				</div>

				<el-pagination
					v-if="!noResult && !error"
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page="currentPage"
					:page-sizes="[8, 20, 40, 80]"
					:page-size="pageSize"
					layout="total, sizes, prev, pager, next, jumper"
					:total="total"
				>
				</el-pagination>
			</div>
			<div class="no-info" v-if="noResult">
				<div class="no-data">
					<img src="~assets/img/no-search.png" />
					<br />
					抱歉！暂时还没有商品
				</div>
				<section class="section">
					<w-shelf :title="recommendPanel.name">
						<div slot="content" class="recommend">
							<mall-good
								:msg="item"
								v-for="(item, i) in recommendPanel.panelContents"
								:key="i"
							></mall-good>
						</div>
					</w-shelf>
				</section>
			</div>
			<div class="no-info" v-if="error">
				<div class="no-data">
					<img src="~assets/img/error.png" />
					<br />
					抱歉！出错了...
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { getAllGoods } from "api/goods";

import MallGood from "components/content/mallgoods/MallGood.vue";
import WButton from "components/content/WButton.vue";
import Shelf from "components/content/shelf/Shelf.vue";
export default {
	data() {
		return {
			goods: [],
			noResult: false,
			error: false,
			min: "",
			max: "",
			loading: true,
			timer: null,
			sortType: 1,
			windowHeight: null,
			windowWidth: null,
			recommendPanel: [],
			sort: "",
			currentPage: 1,
			total: 0,
			pageSize: 20,
		};
	},
	components: {
		MallGood,
		WButton,
		Shelf,
	},
	methods: {},
	created() {
		getAllGoods().then((res) => {
			console.log(res);
		});
	},
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
@import "assets/style/mixin.scss";
@import "assets/style/theme.scss";

.nav {
	height: 60px;
	line-height: 60px;
	> div {
		display: flex;
		align-items: center;
		a {
			padding: 0 15px;
			height: 100%;
			@extend %block-center;
			font-size: 12px;
			color: #999;
			&.active {
				color: #5683ea;
			}
			&:hover {
				color: #5683ea;
			}
		}
		input {
			@include wh(80px, 30px);
			border: 1px solid #ccc;
		}
		input + input {
			margin-left: 10px;
		}
	}
	.price-interval {
		padding: 0 15px;
		@extend %block-center;
		input[type="number"] {
			border: 1px solid #ccc;
			text-align: center;
			background: none;
			border-radius: 5px;
		}
	}
}

.goods-box {
	> div {
		float: left;
		border: 1px solid #efefef;
	}
}

.no-info {
	padding: 100px 0;
	text-align: center;
	font-size: 30px;
	display: flex;
	flex-direction: column;
	.no-data {
		align-self: center;
	}
}

.img-item {
	display: flex;
	flex-direction: column;
}

.el-pagination {
	align-self: flex-end;
	margin: 3vw 10vw 2vw;
}

.section {
	padding-top: 8vw;
	margin-bottom: -5vw;
	width: 1218px;
	align-self: center;
}

.recommend {
	display: flex;
	> div {
		flex: 1;
		width: 25%;
	}
}
</style>
