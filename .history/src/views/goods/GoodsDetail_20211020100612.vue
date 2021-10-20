<!--商品详情-->
<template>
	<div class="goods-detail">
		<div class="w store-content">
			<div class="gray-box">
				<div class="gallery-wrapper">
					<div class="gallery">
						<!-- <div class="thumbnail" v-if="Object.keys(small).length !== 0">
							<ul>
								<li
									v-for="(item, i) in small"
									:key="i"
									:class="{ on: big === item }"
									@click="big = item"
								>
									<img v-lazy="item" :alt="product.productName" />
								</li>
							</ul>
						</div> -->
						<div class="thumb">
							<div class="big">
								<img :src="big[colorCurrent]" :alt="product.product_title" />
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
								<em>¥</em><i>{{ Number(selectProd.price).toFixed(2) }}</i></span
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
					<div class="select-specification">
						<span class="specification">规格选择</span>
						<ul class="specification-count">
							<li
								v-for="(item, index) in specification"
								class="specification-item"
								@click="specificationClick(index)"
								:class="{ active: specificationCurrent === index }"
								:key="index"
							>
								{{ item }}
							</li>
						</ul>
					</div>
					<div class="num" v-if="selectProd.count > 0">
						<span class="params-name">数量</span>
						<buy-num @editNum="editNum" :limit="Number(product.limit_num)" />
					</div>
					<div class="num" v-else>
						<span>该商品暂时没有库存哦~请及时提醒掌柜添加商品</span>
						<el-button
							type="success"
							@click="tixing"
							style="border-radius: 20px; margin: 10px 0 0 80px"
							>提醒掌柜</el-button
						>
					</div>
				</div>
				<div class="cart" v-if="selectProd.count > 0">
					<span>您已选择了</span>
					<div class="cart-content">
						<p>
							<span>{{ product.product_title }}</span>
							<span>{{ Number(selectProd.price).toFixed(2) }}</span>
						</p>
						<span class="cart-specification"
							>{{ color[colorCurrent] }} |
							{{ specification[specificationCurrent] }}</span
						>
					</div>
					<span class="total-price">
						￥{{ Number(selectProd.price * productNum).toFixed(2) }}
					</span>
					<div class="buy">
						<w-button
							text="加入购物车"
							@btnClick="addCart"
							class="add-cart"
						></w-button>
						<w-button
							text="现在购买"
							@btnClick="checkout(product.productId)"
							class="buy-now"
						></w-button>
					</div>
				</div>
			</div>
			<!--产品信息-->
		</div>
		<div class="item-info">
			<div>
				<div class="img-item" v-if="detailImage">
					<img v-for="item in detailImage" :src="item" alt="" />
				</div>
				<div class="no-info" v-else>
					<img src="~assets/img/no-data.png" />
					<br />
					该商品暂无内容数据
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { getDetail } from "api/goods.js";
import { addToCart } from "api/user.js";
import { mapState } from "vuex";
import Shelf from "components/content/shelf/Shelf.vue";
import BuyNum from "components/content/BuyNum.vue";
import WButton from "components/content/WButton.vue";
import { ADD_CART } from "store/mutation-types";
import { messageMixin } from "common/mixin/mixin.js";
export default {
	name: "GoodsDetail",
	data() {
		return {
			productMsg: [],
			big: [],
			product: {},
			color: [],
			colorCurrent: 0,
			specification: [],
			specificationCurrent: 0,
			productNum: 1,
			detailImage: [],
			userId: "",
			selectProd: {},
		};
	},
	mixins: [messageMixin],
	computed: mapState({
		login: "login",
		userInfo: "userInfo",
		productId() {
			return this.$route.query.productId;
		},
		groupId() {
			return;
		},
	}),

	methods: {
		colorClick(index) {
			this.colorCurrent = index;
			let specificationArr = this.product.allProds.filter((item) => {
				return item.product_color === this.color[this.colorCurrent];
			});
			this.specification = specificationArr.map((item) => {
				return item.product_capacity;
			});
			this.selected();
		},
		specificationClick(index) {
			this.specificationCurrent = index;
			this.selected();
		},
		tixing() {
			this.$notify.info({
				type: "success",
				message: "提醒成功",
			});
		},
		//选中的商品
		selected() {
			this.selectProd = this.product.allProds.filter((item) => {
				return (
					item.product_color === this.color[this.colorCurrent] &&
					item.product_capacity ===
						this.specification[this.specificationCurrent]
				);
			})[0];
		},
		// ...mapMutations(["ADD_CART", "ADD_ANIMATION", "SHOW_CART"]),
		// checkout(productId) {
		// 	this.$router.push({
		// 		path: "/checkout",
		// 		query: { productId, num: this.productNum },
		// 	});
		// },
		editNum(num) {
			this.productNum = num;
		},
		//添加购物车
		addCart() {
			if (!this.login) {
				this.$router.push("/login");
			} else {
				let prodTitle =
					"product_title" in this.selectProd
						? this.selectProd.product_title +
						  " " +
						  this.selectProd.product_color +
						  " " +
						  this.selectProd.product_capacity
						: this.product.product_title +
						  " " +
						  this.selectProd.product_color +
						  " " +
						  this.selectProd.product_capacity;
				let params = {
					userId: this.userInfo.id,
					count: this.productNum,
					prodId: this.$route.query.productId,
					prodImg: this.selectProd.product_img,
					prodTitle,
					prodPrice: this.selectProd.price,
					groupId: this.product.groups,
				};
				addToCart(params).then((res) => {
					if (res.success === true) {
						this.message(res.message, "success");
						this.$store.commit(ADD_CART);
					} else {
						this.message(res.message, "error");
					}
				});
			}
		},
		//获取数据
		getAttribute(attribute) {
			return Array.from(
				new Set(
					this.product.allProds.map((item) => {
						return item[attribute];
					})
				)
			);
		},
		_getDetail() {
			getDetail(this.productId, this.groupId).then((res) => {
				this.product = res.data[0];
				this.color = this.getAttribute("product_color");
				this.big = this.getAttribute("product_img");
				this.selectProd = this.product;
				this.specification = this.getAttribute("product_capacity");
				this.detailImage = this.product.detailImages || "";
			});
		},
	},
	components: {
		Shelf,
		WButton,
		BuyNum,
	},
	created() {
		window.scrollTo(0, 0);
		this._getDetail();
	},
	watch: {
		selectProd() {
			console.log(this.selectProd.product_id != this.$route.query.productId);
			if (this.$route.query.productId != this.selectProd.product_id) {
				this.$router.replace({
					path: "/goodsDetail",
					query: {
						productId: this.selectProd.product_id,
						groupId: this.product.groups,
					},
				});
			}
		},
		$route: {
			handler() {
				this._getDetail();
			},
		},
	},
};
</script>
<style lang="scss" scoped>
@import "assets/style/mixin";
* {
	box-sizing: border-box;
}
.goods-detail {
	width: 100%;
	overflow-x: hidden;
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
			.color,
			.specification {
				padding-right: 20px;
				font-size: 14px;
				color: #8d8d8d;
				line-height: 36px;
			}
			.num,
			.select-color,
			.select-specification {
				padding: 29px 0 8px 10px;
				border-top: 1px solid #ebebeb;
				display: flex;
				align-items: center;
				.color-count,
				.specification-count {
					display: flex;
					width: 70%;
					justify-content: flex-start;
					.color-item,
					.specification-item {
						height: 45px;
						border: solid 1px #ebebeb;
						margin: 5px;
						padding: 10px;
						min-width: 95px;
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
				.specification-count {
					justify-content: flex-start;
					flex-wrap: wrap;
					.specification-item {
						font-size: 15px;
						min-width: 60px;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
						display: flex;
						align-items: center;
						// margin-left: 15px;
					}
				}
			}
		}
		.cart {
			position: fixed;
			z-index: 99;
			left: 0;
			right: 0;
			bottom: 0;
			height: 58px;
			display: flex;
			background-color: #f9f9f9;
			padding: 10px 0 0 150px;
			& > span {
				font-size: 13px;
				padding: 0 20px 0 0;
			}
			.cart-content {
				margin-right: auto;
			}
			.cart-content > p {
				span:nth-child(1) {
					font-weight: 700;
					margin: 0 20px 0 0;
				}
				span:nth-child(2) {
					font-weight: 700;
					color: #d44d44;
				}
				span:nth-child(2)::before {
					content: "￥";
				}
			}
			.cart-specification {
				font-size: 12px;
				display: inline-block;
				padding: 5px 0;
			}
			.total-price {
				color: #d44d44;
				font-size: 16px;
				display: flex;
				align-items: center;
				font-weight: 600;
			}
			.add-cart,
			.buy-now {
				width: 100px;
				height: 40px;
				font-weight: 700;
				font-family: "黑体";
				font-size: 14px;
				color: #ffffff;
			}
			.add-cart {
				background: #ffd700;
			}
			.buy-now {
				margin: 0 20px;
				background: #dc143c;
			}
		}
	}

	.item-info {
		.img-item {
			img {
				width: 100%;
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
}
</style>
