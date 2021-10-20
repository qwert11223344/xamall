<template>
	<header>
		<div class="nav-logo">
			<router-link to="/" title="XMall商城官网">
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
			<router-link class="link" to="/thanks">捐赠</router-link>
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
							<router-link to="/profile/addressList">收货地址</router-link>
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

		<div class="shopcart">
			<router-link class="link" to="/shopcart">
				<i class="iconfont">&#xe602;</i>
			</router-link>
			<!--购物车显示块-->
			<div class="nav-user-wrapper pa active" v-show="showCart">
				<div class="nav-user-list">
					<div class="full" v-show="totalNum">
						<!--购物列表-->
						<div class="nav-cart-items">
							<ul>
								<li class="clearfix" v-for="(item, i) in cartList" :key="i">
									<div class="cart-item">
										<div class="cart-item-inner">
											<a @click="openProduct(item.productId)">
												<div class="item-thumb">
													<img :src="item.productImg" />
												</div>
												<div class="item-desc">
													<div class="cart-cell">
														<h4>
															<a href="" v-text="item.productName"></a>
														</h4>
														<!-- <p class="attrs"><span>白色</span></p> -->
														<h6>
															<span class="price-icon">¥</span
															><span class="price-num">{{
																item.salePrice
															}}</span
															><span class="item-num"
																>x {{ item.productNum }}</span
															>
														</h6>
													</div>
												</div>
											</a>
											<div
												class="del-btn del"
												@click="delGoods(item.productId)"
											>
												删除
											</div>
										</div>
									</div>
								</li>
							</ul>
						</div>
						<!--总件数-->
						<div class="nav-cart-total">
							<p>
								共 <strong>{{ totalNum }}</strong> 件商品
							</p>
							<h5>
								合计：<span class="price-icon">¥</span
								><span class="price-num">{{ totalPrice }}</span>
							</h5>
							<h6>
								<y-button
									classStyle="main-btn"
									style="
										height: 40px;
										width: 100%;
										margin: 0;
										color: #fff;
										font-size: 14px;
										line-height: 38px;
									"
									text="去购物车"
									@btnClick="toCart"
								></y-button>
							</h6>
						</div>
					</div>
					<div
						v-show="!totalNum"
						style="height: 313px; text-align: center"
						class="cart-con"
					>
						<p>您的购物车竟然是空的!</p>
					</div>
				</div>
			</div>
		</div>
	</header>
</template>

<script>
import { mapState } from "vuex";
import { REMOVE_USER } from "store/mutation-types";
export default {
	data() {
		return {
			restaurants: [],
			state: "",
			timeout: null,
			isShowUser: false,
		};
	},
	computed: mapState({
		login: "login",
		userInfo: "userInfo",
	}),
	methods: {
		enterUser() {
			this.isShowUser = true;
		},
		leaveUser() {
			this.isShowUser = false;
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
		_loginOut() {
			localStorage.removeItem("token");
			this.$store.commit(REMOVE_USER);
			window.location.href = "/";
		},
	},
	mounted() {
		this.restaurants = this.loadAll();
	},
};
</script>

<style lang="scss" scoped>
header {
	position: relative;
	z-index: 999;
	height: 80px;
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
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
	opacity: 0;
}
</style>