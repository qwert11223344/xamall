<template>
	<header>
		<div class="nav-logo">
			<router-link to="/" title="">
				<img src="~assets/img/home/logo.jpg" alt="" srcset="" />
			</router-link>
		</div>

		<div class="search-box">
			<el-autocomplete
				v-model="state"
				:fetch-suggestions="querySearchAsync"
				placeholder="请输入内容"
				@select="handleSelect"
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
							<span class="avatar">
								<img :src="userInfo.file" alt="" />
							</span>
							<p class="name">{{ userInfo.username }}</p>
						</li>
						<li>
							<router-link to="/profile/order">我的订单</router-link>
						</li>
						<li>
							<router-link to="/profile/information">帐号资料</router-link>
						</li>
						<li>
							<router-link to="/profile/address">收货地址</router-link>
						</li>
						<li>
							<router-link to="/profile/support">售后服务</router-link>
						</li>
						<li>
							<router-link to="/profile/coupon">我的优惠</router-link>
						</li>
						<li @click="_loginOut">
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
			<div class="shop-content" v-show="showCart">
				<el-empty
					v-if="cartList.length === 0 && !login"
					description="您还没有登录呢，快去登录吧~"
				/>
				<el-empty
					v-else-if="cartList.length === 0 && login"
					description="购物车中还没有商品呢，快去添加吧~~"
				/>
				<li class="cart_item" v-for="(item, index) in cartList" :key="index">
					<div class="product_item">
						<img :src="item.prod_img" alt="" />
						<div class="prod_detail">
							<p class="desc">{{ item.prod_title }}</p>
							<div>
								<span>{{ item.prod_price }}</span>
								<span>{{ item.prod_count }}</span>
							</div>
						</div>
						<i class="el-icon-delete"></i>
					</div>
				</li>
			</div>
		</div>
	</header>
</template>

<script>
import { mapState } from "vuex";
import { REMOVE_USER } from "store/mutation-types";
import { getCartList, delCartProd } from "api/user.js";
export default {
	data() {
		return {
			restaurants: [],
			state: "",
			user: {},
			cartList: [],
			isShowUser: false,
			showCart: false,
		};
	},
	computed: {
		...mapState({
			login: "login",
			userInfo: "userInfo",
		}),
	},
	methods: {
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
				console.log(res);
				if (res.success === true) {
					this.cartList = res.data;
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
	background-color: #fff;
	transform: translate(-43%, 20px);
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
	li:first-child {
		flex-direction: column;
	}
	li {
		list-style: none;
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		border-bottom: 1px solid #f0f0f0;
	}
}
.nav-user-wrapper li:hover {
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
	height: 300px;
	width: 300px;
	background-color: #f3f3f3;
	border-radius: 10px;
	box-shadow: 0 5px 5px rgba($color: #000000, $alpha: 0.2);
	position: absolute;
	z-index: 99;
	right: 0;
	top: 37px;
	.cart_item {
		display: flex;
		align-items: center;
		height: 120px;
		width: 100%;
		border-bottom: 1px solid #ccc;
		.product_item {
			display: flex;
			width: 100%;
			justify-content: space-around;
			img {
				width: 80px;
			}
			.prod_detail {
				width: 40%;
				background: lime;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				.desc {
					color: #409eff;
				}
			}
		}
	}
}
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
	opacity: 0;
}
</style>