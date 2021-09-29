<!--商品详情-->
<template>
	<div class="w store-content">
		<div class="gray-box">
			<div class="gallery-wrapper">
				<div class="gallery">
					<!-- <div class="thumbnail">
						<ul>
							<li
								v-for="(item, i) in small"
								:key="i"
								:class="{ on: big === item }"
								@click="big = item"
							>
								<img v-lazy="item" :alt="product.product_title" />
							</li>
						</ul>
					</div> -->
					<div class="thumb">
						<div class="big">
							<img :src="product.product_img" :alt="product.product_title" />
						</div>
					</div>
				</div>
			</div>
			<!--右边-->
			<div class="banner">
				<div class="sku-custom-title">
					<h4>{{ product.product_title }}</h4>
					<h6>
						<span>{{ product.product_desc }}</span>
						<span class="price">
							<em>¥</em><i>{{ Number(product.price).toFixed(2) }}</i></span
						>
					</h6>
				</div>
				<div class="select-color">
					<span class="color">颜色选择</span>
					<ul class="color-count">
						<li
							v-for="(item, index) in color"
							class="color-item"
							@click="colorClick(index)"
							:class="{ active: colorCurrent === index }"
						>
							{{ item }}
						</li>
					</ul>
				</div>
				<div class="num">
					<span class="params-name">数量</span>
					<buy-num @editNum="editNum" :limit="Number(product.limit_num)" />
				</div>

				<div class="buy">
					<w-button
						text="加入购物车"
						@btnClick="
							addCart(
								product.productId,
								product.salePrice,
								product.productName,
								product.productImageBig
							)
						"
						classStyle="main-btn"
						style="width: 145px; height: 50px; line-height: 48px"
					></w-button>
					<w-button
						text="现在购买"
						@btnClick="checkout(product.productId)"
						style="
							width: 145px;
							height: 50px;
							line-height: 48px;
							margin-left: 10px;
						"
					></w-button>
				</div>
			</div>
		</div>
		<!--产品信息-->
		<div class="item-info">
			<shelf title="产品信息">
				<template #content>
					<div>
						<div class="img-item" v-if="productMsg">
							<div v-html="productMsg">{{ productMsg }}</div>
						</div>
						<div class="no-info" v-else>
							<img src="~assets/img/no-data.png" />
							<br />
							该商品暂无内容数据
						</div>
					</div>
				</template>
			</shelf>
		</div>
	</div>
</template>
<script>
import { getDetail } from "api/goods.js";
// import { productDet, addCart } from "/api/goods";
// import { mapMutations, mapState } from "vuex";
import Shelf from "components/content/shelf/Shelf.vue";
import BuyNum from "components/content/BuyNum.vue";
import WButton from "components/content/WButton.vue";
// import { getStore } from "/utils/storage";
export default {
	data() {
		return {
			productId: null,
			productMsg: {},
			big: [],
			product: {},
			color: [],
			colorCurrent: 0,
			productNum: 1,
			userId: "",
		};
	},
	// filters: {
	// 	showPrice(val) {
	// 		return val.toFixed(2);
	// 	},
	// },
	computed: {
		// ...mapState(["login", "showMoveImg", "showCart"]),
	},
	methods: {
		colorClick(index) {
			this.colorCurrent = index;
		},
		// ...mapMutations(["ADD_CART", "ADD_ANIMATION", "SHOW_CART"]),
		_productDet(productId) {
			productDet({ params: { productId } }).then((res) => {
				let result = res.result;
				this.product = result;
				this.productMsg = result.detail || "";
				this.small = result.productImageSmall;
				this.big = this.small[0];
			});
		},
		// addCart(id, price, name, img) {
		// 	if (!this.showMoveImg) {
		// 		// 动画是否在运动
		// 		if (this.login) {
		// 			// 登录了 直接存在用户名下
		// 			addCart({
		// 				userId: this.userId,
		// 				productId: id,
		// 				productNum: this.productNum,
		// 			}).then((res) => {
		// 				// 并不重新请求数据
		// 				this.ADD_CART({
		// 					productId: id,
		// 					salePrice: price,
		// 					productName: name,
		// 					productImg: img,
		// 					productNum: this.productNum,
		// 				});
		// 			});
		// 		} else {
		// 			// 未登录 vuex
		// 			this.ADD_CART({
		// 				productId: id,
		// 				salePrice: price,
		// 				productName: name,
		// 				productImg: img,
		// 				productNum: this.productNum,
		// 			});
		// 		}
		// 		// 加入购物车动画
		// 		var dom = event.target;
		// 		// 获取点击的坐标
		// 		let elLeft = dom.getBoundingClientRect().left + dom.offsetWidth / 2;
		// 		let elTop = dom.getBoundingClientRect().top + dom.offsetHeight / 2;
		// 		// 需要触发
		// 		this.ADD_ANIMATION({
		// 			moveShow: true,
		// 			elLeft: elLeft,
		// 			elTop: elTop,
		// 			img: img,
		// 		});
		// 		if (!this.showCart) {
		// 			this.SHOW_CART({ showCart: true });
		// 		}
		// 	}
		// },
		// checkout(productId) {
		// 	this.$router.push({
		// 		path: "/checkout",
		// 		query: { productId, num: this.productNum },
		// 	});
		// },
		editNum(num) {
			this.productNum = num;
		},
	},
	components: {
		Shelf,
		WButton,
		BuyNum,
	},
	created() {
		this.productId = this.$route.query.productId;
		// this.userId = getStore("userId");
		getDetail(this.productId).then((res) => {
			console.log(res.data);
			this.product = res.data[0];

			this.color = new Set(
				this.product.otherProd.map((item) => {
					return item.product_color;
				})
			);
			this.big = this.product.otherProd.map((item) => {
				return this.color.filter((color) => {
					color === item.product_color;
				});
			});
			this.productMsg = this.product.prod_del_img || "";
		});
	},
};
</script>
<style lang="scss" scoped>
@import "assets/style/mixin";
* {
	box-sizing: border-box;
}
.store-content {
	clear: both;
	width: 1220px;
	min-height: 600px;
	padding: 0 0 25px;
	margin: 0 auto;
}

.gray-box {
	display: flex;
	padding: 60px;
	margin: 20px 0;
	.gallery-wrapper {
		.gallery {
			display: flex;
			width: 540px;
			.thumbnail {
				li:first-child {
					margin-top: 0px;
				}
				li {
					@include wh(80px);
					margin-top: 10px;
					padding: 12px;
					border: 1px solid #f0f0f0;
					border: 1px solid rgba(0, 0, 0, 0.06);
					border-radius: 5px;
					cursor: pointer;
					&.on {
						padding: 10px;
						border: 3px solid #ccc;
						border: 3px solid rgba(0, 0, 0, 0.2);
					}
					img {
						display: block;
						@include wh(100%);
					}
				}
			}
			.thumb {
				.big {
					margin-left: 20px;
				}
				img {
					display: block;
					@include wh(440px);
				}
			}
		}
	}
	// 右边
	.banner {
		width: 450px;
		margin-left: 10px;
		h4 {
			font-size: 24px;
			line-height: 1.25;
			color: #000;
			margin-bottom: 13px;
		}
		h6 {
			font-size: 14px;
			line-height: 1.5;
			color: #bdbdbd;
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
		.sku-custom-title {
			overflow: hidden;
			padding: 8px 8px 18px 10px;
			position: relative;
		}
		.params-name,
		.color {
			padding-right: 20px;
			font-size: 14px;
			color: #8d8d8d;
			line-height: 36px;
		}
		.num,
		.select-color {
			padding: 29px 0 8px 10px;
			border-top: 1px solid #ebebeb;
			display: flex;
			align-items: center;
			.color-count {
				display: flex;
				width: 70%;
				justify-content: space-around;
				.color-item {
					border: solid 1px #ebebeb;
					padding: 10px 20px;
					font-weight: 350;
					font-size: 18px;
					border-radius: 10px;

					cursor: pointer;
					&:hover {
						border: solid 1px #aaa;
					}
				}
				.active {
					border-color: rgba($color: #125698, $alpha: 0.8);
					font-weight: 700;
					color: #000;
				}
			}
		}

		.buy {
			position: relative;
			border-top: 1px solid #ebebeb;
			padding: 30px 0 0 10px;
		}
	}
}

.item-info {
	.gray-box {
		padding: 0;
		display: block;
	}
	.img-item {
		width: 1220px;
		// padding: 1vw;
		text-align: center;
		img {
			width: 100%;
			height: auto;
			display: block;
		}
	}
}

.no-info {
	padding: 200px 0;
	text-align: center;
	font-size: 30px;
}

.price {
	display: block;
	color: #d44d44;
	font-weight: 700;
	font-size: 16px;
	line-height: 20px;
	text-align: right;
	i {
		padding-left: 2px;
		font-size: 24px;
	}
}
</style>
