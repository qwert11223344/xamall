<template>
	<header>
		<div class="nav-logo">
			<router-link to="/" title="">
				<img src="~assets/img/home/logo.jpg" alt="" srcset="" />
			</router-link>
		</div>

		<div class="search-box">
			<el-autocomplete
				v-model="queryString"
				:fetch-suggestions="querySearchAsync"
				placeholder="请输入内容"
				@select="handleSelect"
				@change="searchGoods"
				suffix-icon="el-icon-search"
				class="input"
			></el-autocomplete>

			<router-link class="link" to="/goods">全部商品</router-link>
		</div>

		<div
			class="user"
			@mouseenter="enterUser"
			@mousemove="enterUser"
			@mouseleave="leaveUser"
		>
			<router-link class="link" to="/profile">
				<i class="iconfont">&#xe605;</i>
			</router-link>
			<!--用户信息显示-->
			<transition name="fade">
				<div
					class="nav-user-wrapper"
					v-if="login && isShowUser"
					@mousemove="enterUser"
				>
					<ul>
						<!--头像-->
						<li class="nav-user-avatar">
							<span class="avatar" v-if="userInfo.file">
								<img :src="userInfo.file" alt="" />
							</span>
							<el-avatar
								v-else
								style="width: 50px; height: 50px; margin: 20px 0 10px 0"
								src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
							></el-avatar>
							<p class="name">{{ userInfo.username }}</p>
						</li>
						<li>
							<i class="iconfont">&#xe897;</i>
							<router-link to="/profile/order">我的订单</router-link>
						</li>
						<li>
							<i class="iconfont">&#xe6a8;</i>
							<router-link to="/profile/infomation">帐号资料</router-link>
						</li>
						<li>
							<i class="iconfont">&#xe63f;</i>
							<router-link to="/profile/address">收货地址</router-link>
						</li>
						<li>
							<i class="iconfont">&#xe64c;</i>
							<router-link to="/profile/support">售后服务</router-link>
						</li>
						<li>
							<i class="iconfont">&#xe8c0;</i>
							<router-link to="/profile/discount">我的优惠</router-link>
						</li>
						<li @click="_loginOut">
							<i class="iconfont">&#xe606;</i>
							<a href="javascript:;">退出</a>
						</li>
					</ul>
				</div>
			</transition>
		</div>
		<div
			class="shopcart"
			@mouseenter="enterCart"
			@mousemove="enterCart"
			@mouseleave="leaveCart"
		>
			<router-link class="link" to="/shopcart">
				<i class="iconfont">&#xe602;</i>
			</router-link>
			<transition name="fade">
				<div class="shop-content" v-show="showCart">
					<el-empty
						v-if="cartList.length === 0 && !login"
						description="您还没有登录呢，快去登录吧~"
					/>
					<el-empty
						v-else-if="cartList.length === 0 && login"
						description="购物车中还没有商品呢，快去添加吧~~"
					/>
					<ul>
						<li
							class="cart_item"
							v-for="(item, index) in cartList"
							:key="index"
							@click="goodsDetails(item.prod_id, item.group_id)"
						>
							<div class="product_item">
								<img :src="item.prod_img" alt="" />
								<div class="prod_detail">
									<p class="desc">{{ item.prod_title }}</p>
									<div class="prod_other">
										<span class="price"
											>￥{{ Number(item.prod_price).toFixed(2) }}</span
										>
										<span class="count">x{{ item.prod_count }}</span>
									</div>
								</div>
								<div class="delete">
									<span @click.stop="_delProd({ prodId: item.prod_id })">
										<i class="el-icon-delete"></i
									></span>
								</div>
							</div>
						</li>
					</ul>
					<div class="cart_footer">
						<span>
							<p class="total_count">共{{ totalCount }}件商品</p>
							<p>
								合计：<span class="total_price"
									>￥{{ Number(totalPrice).toFixed(2) }}</span
								>
							</p>
						</span>
						<el-button type="primary" round plain>去购物车 </el-button>
					</div>
				</div>
			</transition>
		</div>
	</header>
</template>

<script>
import { mapState } from "vuex";
import { REMOVE_USER } from "store/mutation-types";
import { getCartList, delCartProd } from "api/user.js";
import { RESET_PROD, RECORD_CARTPOSTION } from "store/mutation-types.js";

import { goodsDetailMixin } from "common/mixin/mixin.js";
export default {
	data() {
		return {
			restaurants: [],
			state: "",
			user: {},
			isShowUser: false,
			showCart: false,
			cartList: [],
			queryString: "",
		};
	},
	mixins: [goodsDetailMixin],
	computed: {
		...mapState({
			login: "login",
			userInfo: "userInfo",
			isAdd: "isAdd",
		}),
		totalCount() {
			return this.cartList.reduce((oldValue, cur) => {
				return oldValue + cur.prod_count;
			}, 0);
		},
		totalPrice() {
			return this.cartList.reduce((oldValue, cur) => {
				return oldValue + cur.prod_count * cur.prod_price;
			}, 0);
		},
	},
	methods: {
		//弹出信息
		message(message, type) {
			this.$message({
				message,
				type,
			});
		},
		enterUser() {
			this.isShowUser = true;
		},
		leaveUser() {
			this.isShowUser = false;
		},
		enterCart() {
			this.showCart = true;
		},
		leaveCart() {
			this.showCart = false;
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
		//退出
		_loginOut() {
			localStorage.removeItem("token");
			localStorage.removeItem("user");
			this.$store.commit(REMOVE_USER);
			window.location.href = "/";
		},
		//获取购物车列表
		_getCartList() {
			getCartList({
				userId: this.userInfo.id,
			}).then((res) => {
				if (res.success === true) {
					this.cartList = res.data;
				}
			});
			this.$store.commit(RESET_PROD);
		},
		//删除购物车中的商品
		_delProd(params) {
			delCartProd(params).then((res) => {
				if (res.success === true) {
					this.message(res.message, "success");
					this._getCartList();
				} else {
					this.message(res.message, "error");
				}
			});
		},
	},
	mounted() {
		this.restaurants = this.loadAll();
	},
	created() {
		this.user = JSON.parse(window.localStorage.getItem("user")) || null;
	},
	watch: {
		user() {
			if (this.user != null) {
				this._getCartList();
			}
		},
		isAdd() {
			if (this.isAdd) {
				this._getCartList();
			}
		},
	},
};
</script>

<style lang="scss" scoped>
header {
	position: relative;
	z-index: 999;
	height: 50px;
	background-color: #000;
	display: flex;
	align-items: center;
	font-size: 14px;
}
.nav-logo {
	width: 2.5rem;
	margin-left: 10rem;
}
.nav-logo img {
	width: 100%;
	border-radius: 50%;
}
.search-box {
	width: 350px;
	display: flex;
	justify-content: space-around;
	align-items: center;
	margin: 0 200px 0 500px;
}
.link {
	color: #ccc;
	text-decoration: none;
}
.user,
.shopcart {
	position: relative;

	margin-left: 20px;
}
.user .iconfont,
.shopcart .iconfont {
	font-size: 1.2rem;
	color: #8a8a8a;
}
.link:hover,
.user .iconfont:hover,
.shopcart .iconfont:hover {
	color: #f3f3f3;
}
.nav-user-wrapper {
	position: absolute;
	z-index: 9;
	background-color: #fff;
	transform: translate(-43%, 15px);
	border-radius: 10px;
	width: 150px;
	height: 380px;
}
.nav-user-wrapper::before {
	content: "";
	height: 17px;
	width: 17px;
	background-color: #fff;
	transform: translateX(-50%) rotate(-45deg);
	top: -7px;
	left: 50%;
	border-radius: 5px;
	position: absolute;
}
.nav-user-wrapper ul {
	height: 100%;
	display: flex;
	flex-direction: column;
	overflow: hidden;
}
.avatar {
	width: 50px;
	height: 50px;
	overflow: hidden;
	border-radius: 50%;
	margin-top: 20px;
	display: block;
	margin-bottom: 10px;
	img {
		width: 100%;
	}
}
.name {
	margin-bottom: 15px;
}
.nav-user-wrapper {
	.iconfont {
		left: 20px;
		position: absolute;
		font-size: 15px;
	}
	li:first-child {
		flex-direction: column;
	}
	li {
		position: relative;
		list-style: none;
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		border-bottom: 1px solid #f0f0f0;
	}
}
.nav-user-wrapper li ~ li:hover {
	background-color: #f3f3f3;
}
.nav-user-wrapper li a {
	text-decoration: none;
	color: #616161;
	font-size: 12px;
}
.nav-user-avatar {
	border-radius: 10px 10px 0 0;
}
.shop-content {
	width: 400px;
	background-color: #fff;
	border-radius: 10px;
	box-shadow: 0 5px 5px rgba($color: #000000, $alpha: 0.2);
	position: absolute;
	z-index: 99;
	right: 0;
	top: 37px;
	ul {
		max-height: 360px;
		overflow: auto;
	}
	.cart_item {
		display: flex;
		align-items: center;
		height: 120px;
		width: 100%;
		padding: 0 20px;
		border-bottom: 1px solid #f3f3f3;
		&:hover .delete {
			visibility: inherit;
		}
		&:hover {
			background-color: #f1f1f1;
			cursor: pointer;
		}
		.product_item {
			display: flex;
			width: 100%;
			justify-content: space-around;
			img {
				width: 80px;
				border: 1px solid #ccc;
				border-radius: 10px;
			}
			.prod_detail {
				width: 60%;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				.desc {
					color: #409eff;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					font-size: 14px;
				}
				.prod_other {
					.price {
						color: #d44d44;
						font-weight: 650;
						margin-right: 10px;
					}
					.count {
						font-size: 12px;
						color: #999;
					}
				}
			}
		}
		.delete {
			display: flex;
			visibility: hidden;
			align-items: center;
			span {
				border-radius: 50%;
				padding: 5px;
				&:hover {
					background-color: #cccccc;
				}
			}
		}
	}
	.cart_footer {
		padding: 20px;
		display: flex;
		justify-content: space-between;
		.total_count {
			font-size: 12px;
			color: #999;
		}
		.total_price {
			color: #d44d44;
			font-size: 18px;
			font-weight: 700;
		}
	}
}
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.2s;
	transition-timing-function: cubic-bezier(0.1, 0.17, 1, -0.3);
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
	opacity: 0;
}
</style>