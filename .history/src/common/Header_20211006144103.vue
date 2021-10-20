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
															><span class="price-num">{{ item.price }}</span
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
								<w-button
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
								></w-button>
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
@import "~assets/style/mixin.scss";
.move_in_cart {
	animation: mymove 0.5s ease-in-out;
}

@keyframes mymove {
	0% {
		transform: scale(1);
	}
	25% {
		transform: scale(0.8);
	}
	50% {
		transform: scale(1.2);
	}
	75% {
		transform: scale(0.9);
	}
	100% {
		transform: scale(1);
	}
}

@-moz-keyframes mymove {
	0% {
		transform: scale(1);
	}
	25% {
		transform: scale(0.8);
	}
	50% {
		transform: scale(1.2);
	}
	75% {
		transform: scale(0.9);
	}
	100% {
		transform: scale(1);
	}
}
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
.nav-user-wrapper {
	width: 168px;
	transform: translate(-50%);
	left: 50%;
}
.nav-user-list {
	width: 168px;
	&:before {
		left: 50%;
	}
}
.shop {
	position: relative;
	float: left;
	margin-left: 21px;
	width: 61px;
	z-index: 99;
	&:hover {
		a:before {
			content: " ";
			background-position: 0 -22px;
		}
	}
	.nav-user-wrapper.active {
		top: 18px;
		visibility: visible;
		opacity: 1;
		-webkit-transition: opacity 0.15s ease-out;
		transition: opacity 0.15s ease-out;
	}
	> a {
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		display: block;
		right: 0;
		z-index: 1;
		&:before {
			display: block;
			@include wh(30px, 100%);
			content: " ";
			background: url(/static/images/account-icon@2x.32d87deb02b3d1c3cc5bcff0c26314ac.png)
				0 -22px;
			background-size: 240px 107px;
			background-position: -150px -22px;
		}
	}
	.cart-num {
		position: relative;
		display: block;
		margin-left: 31px;
		margin-top: -1px;
		min-width: 30px;
		text-indent: 0;
		line-height: 20px;
		> i {
			background: #eb746b;
			background-image: -webkit-linear-gradient(#eb746b, #e25147);
			background-image: linear-gradient(#eb746b, #e25147);
			box-shadow: inset 0 0 1px hsla(0, 0%, 100%, 0.15),
				0 1px 2px hsla(0, 0%, 100%, 0.15);
			text-align: center;
			font-style: normal;
			display: inline-block;
			@include wh(20px);
			line-height: 20px;
			border-radius: 10px;
			color: #fff;
			font-size: 12px;
			&.no {
				background: #969696;
				background-image: -webkit-linear-gradient(#a4a4a4, #909090);
				background-image: linear-gradient(#a4a4a4, #909090);
				box-shadow: inset 0 0 1px #838383, 0 1px 2px #838383;
			}
		}
	}
	.nav-user-wrapper {
		right: 0;
		width: 360px;
		.nav-user-list {
			&:before {
				right: 34px;
			}
		}
	}
	.nav-user-list {
		padding: 0;
		width: 100%;
		.full {
			border-radius: 8px;
			overflow: hidden;
		}
		.nav-cart-items {
			max-height: 363px;
			overflow-x: hidden;
			overflow-y: auto;
		}
		.cart-item {
			height: 120px;
			width: 100%;
			overflow: hidden;
			border-top: 1px solid #f0f0f0;
			&:hover {
				background: #fcfcfc;
				.del {
					display: block;
				}
			}
		}
		li:first-child .cart-item:first-child {
			border-top: none;
			border-radius: 8px 8px 0 0;
			overflow: hidden;
		}
		.cart-item-inner {
			padding: 20px;
			position: relative;
		}
		.item-thumb {
			position: relative;
			float: left;
			width: 80px;
			height: 80px;
			border-radius: 3px;
			&:before {
				content: "";
				position: absolute;
				left: 0;
				right: 0;
				top: 0;
				bottom: 0;
				z-index: 2;
				border: 1px solid #f0f0f0;
				border: 0 solid transparent;
				box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.06);
				border-radius: 3px;
			}
			img {
				display: block;
				@include wh(80px, 80px);
				border-radius: 3px;
				overflow: hidden;
			}
		}
		.item-desc {
			margin-left: 98px;
			display: table;
			@include wh(205px, 80px);
			h4 {
				color: #000;
				width: 185px;
				overflow: hidden;
				word-break: keep-all;
				white-space: nowrap;
				text-overflow: ellipsis;
				font-size: 14px;
				line-height: 16px;
				margin-bottom: 10px;
			}
			.attrs span {
				position: relative;
				display: inline-block;
				margin-right: 20px;
				font-size: 14px;
				line-height: 14px;
				color: #999;
			}
			.attrs span:last-child {
				margin-right: 0;
			}
			h6 {
				color: #cacaca;
				font-size: 12px;
				line-height: 14px;
				margin-top: 20px;
				span {
					display: inline-block;
					font-weight: 700;
					color: #cacaca;
				}
				.price-icon,
				.price-num {
					color: #d44d44;
				}
				.price-num {
					margin-left: 5px;
					font-size: 14px;
				}
				.item-num {
					margin-left: 10px;
				}
			}
		}
		.cart-cell {
			display: table-cell;
			vertical-align: middle;
		}
		.del {
			display: none;
			overflow: hidden;
			position: absolute;
			right: 20px;
			top: 50%;
			transform: translateY(-50%);
		}
	}
	.nav-cart-total {
		box-sizing: content-box;
		position: relative;
		padding: 20px;
		height: 40px;
		background: #fafafa;
		border-top: 1px solid #f0f0f0;
		border-radius: 0 0 8px 8px;
		box-shadow: inset 0 -1px 0 hsla(0, 0%, 100%, 0.5),
			0 -3px 8px rgba(0, 0, 0, 0.04);
		background: -webkit-linear-gradient(#fafafa, #f5f5f5);
		background: linear-gradient(#fafafa, #f5f5f5);
		p {
			margin-bottom: 4px;
			line-height: 16px;
			font-size: 12px;
			color: #c1c1c1;
		}
		h5 {
			line-height: 20px;
			font-size: 14px;
			color: #6f6f6f;
			span {
				font-size: 18px;
				color: #de4037;
				display: inline-block;
				font-weight: 700;
			}
			span:first-child {
				font-size: 12px;
				margin-right: 5px;
			}
		}
		h6 {
			position: absolute;
			right: 20px;
			top: 20px;
			width: 108px;
		}
	}
}
</style>