<template>
	<div class="checkout">
		<w-header></w-header>
		<div class="w" style="padding-top: 40px">
			<!-- 收货地址 -->
			<w-shelf title="收货信息">
				<template #content>
					<ul class="address-item-list clearfix">
						<li
							v-for="(item, i) in addList"
							:key="i"
							class="address pr"
							:class="{ checked: addressId === item.addressId }"
							@click="
								chooseAddress(
									item.addressId,
									item.userName,
									item.tel,
									item.streetName
								)
							"
						>
							<span v-if="addressId === item.addressId" class="pa">
								<svg viewBox="0 0 1473 1024" width="17.34375" height="12">
									<path
										d="M1388.020 57.589c-15.543-15.787-37.146-25.569-61.033-25.569s-45.491 9.782-61.023 25.558l-716.054 723.618-370.578-374.571c-15.551-15.769-37.151-25.537-61.033-25.537s-45.482 9.768-61.024 25.527c-15.661 15.865-25.327 37.661-25.327 61.715 0 24.053 9.667 45.849 25.327 61.715l431.659 436.343c15.523 15.814 37.124 25.615 61.014 25.615s45.491-9.802 61.001-25.602l777.069-785.403c15.624-15.868 25.271-37.66 25.271-61.705s-9.647-45.837-25.282-61.717M1388.020 57.589z"
										fill="#6A8FE5"
										p-id="1025"
									></path>
								</svg>
							</span>
							<p>
								收货人: {{ item.nick_name }}
								{{ item.isDefault ? "(默认地址)" : "" }}
							</p>
							<p class="street-name ellipsis">
								收货地址: {{ item.province }}{{ item.downtown_area
								}}{{ item.county }}{{ item.street }}
							</p>
							<p>手机号码: {{ item.tel }}</p>
							<div class="operation-section">
								<span
									class="update-btn"
									style="font-size: 12px"
									@click="update(item)"
									>修改</span
								>
								<span
									class="delete-btn"
									style="font-size: 12px"
									:data-id="item.address_id"
									@click=""
									>删除</span
								>
							</div>
						</li>

						<li class="add-address-item" @click="update">
							<img src="" alt="" />
							<p>使用新地址</p>
						</li>
					</ul>
				</template>
			</w-shelf>
			<!-- 购物清单 -->
			<w-shelf title="购物清单">
				<template #content>
					<div class="box-inner ui-cart">
						<div>
							<!--标题-->
							<div class="cart-table-title">
								<span class="name">商品信息</span>
								<span class="subtotal">小计</span>
								<span class="num">数量</span>
								<span class="price">单价</span>
							</div>
							<!--列表-->
							<div class="cart-table" v-for="(item, i) in cartList" :key="i">
								<div
									class="cart-group divide pr"
									:data-productid="item.productId"
								>
									<div class="cart-top-items">
										<div class="cart-items clearfix">
											<!--图片-->
											<div class="items-thumb fl">
												<img :alt="item.prod_title" :src="item.prod_img" />
												<a :title="item.prod_title" target="_blank"></a>
											</div>
											<!--信息-->
											<div class="name hide-row fl">
												<div class="name-table">
													<a
														:title="item.prod_title"
														target="_blank"
														v-text="item.prod_title"
													></a>
												</div>
											</div>
											<!--商品数量-->
											<div>
												<!--总价格-->
												<div class="subtotal" style="font-size: 14px">
													¥ {{ item.prod_price * item.prod_count }}
												</div>
												<!--数量-->
												<div class="item-cols-num">
													<span v-text="item.prod_count"></span>
												</div>
												<!--价格-->
												<div class="price">¥ {{ item.prod_price }}</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<!-- 合计 -->
						<div class="cart-bottom-bg fix-bottom">
							<div class="fix-bottom-inner">
								<div class="shipping">
									<div class="shipping-box" style="padding: 0 40px">
										<div class="shipping-total shipping-price">
											<h4 class="highlight">
												应付总额：<em>￥{{ checkPrice }}</em>
											</h4>
										</div>
									</div>
									<el-button type="success" round>提交订单</el-button>
								</div>
							</div>
						</div>
					</div>
				</template>
			</w-shelf>

			<y-popup :open="popupOpen" @close="popupOpen = false" :title="popupTitle">
				<template #content>
					<el-form :model="msg" status-icon :rules="rules">
						<div class="md">
							<div>
								<el-form-item prop="nickName">
									<el-input
										v-model.lazy="msg.nickName"
										clearable
										maxlength="10"
										show-word-limit
										placeholder="收货人姓名"
									/>
								</el-form-item>
							</div>
							<div>
								<el-form-item prop="tel">
									<el-input
										v-model.lazy="msg.tel"
										clearable
										placeholder="手机号码"
									/>
								</el-form-item>
							</div>
							<div>
								<el-select
									v-model="msg.province"
									placeholder="请选择省份"
									@change="currentProvince"
									style="width: 100%"
								>
									<el-option
										v-for="(item, index) in province"
										:key="index"
										:value="item.name"
									/>
								</el-select>
							</div>
							<div class="selectCity">
								<el-select
									v-model="msg.downtown_area"
									placeholder="请选择城市"
									@change="currentCity"
									style="width: 48%"
								>
									<el-option
										v-for="(item, index) in downtown_area"
										:key="index"
										:value="item.name"
									/>
								</el-select>
								<el-select
									v-model="msg.county"
									placeholder="请选择区县"
									style="width: 48%"
								>
									<el-option
										v-for="(item, index) in county"
										:key="index"
										:value="item.name"
									/>
								</el-select>
							</div>
							<div>
								<el-form-item prop="streetName">
									<el-input
										v-model.lazy="msg.streetName"
										clearable
										maxlength="20"
										show-word-limit
										placeholder="详细地址"
									/>
								</el-form-item>
							</div>
							<div>
								<!-- <el-checkbox v-model="msg.isDefault">设为默认</el-checkbox> -->
							</div>
							<div class="button_wrap">
								<el-button
									type="primary"
									plain
									style="width: 120px"
									:disabled="!msgIsEmity"
									@click="save"
									>保存</el-button
								>
								<el-button
									type="info"
									plain
									style="width: 120px"
									@click="popupOpen = false"
									>取消</el-button
								>
							</div>
						</div>
					</el-form>
				</template>
			</y-popup>
		</div>
		<w-footer></w-footer>
	</div>
</template>

<script>
import WShelf from "components/content/shelf/Shelf.vue";
import WButton from "components/content/WButton.vue";
import YPopup from "components/content/popup/Popup.vue";
import WHeader from "common/Header.vue";
import WFooter from "common/Footer.vue";

import { mapState } from "vuex";
import {
	getAddressList,
	getCartList,
	addAddress,
	updateAddress,
} from "api/user.js";
import { getRegion } from "api/thirdParty.js";
import { messageMixin } from "common/mixin/mixin.js";
export default {
	data() {
		let validateNickName = (rule, value, callback) => {
			if (value === "") {
				callback(new Error("请输入收货人姓名"));
			}
		};
		let validateTel = (rule, value, callback) => {
			if (value === "") {
				callback(new Error("请输入手机号"));
			}
			let reg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
			if (!reg.test(value)) {
				callback(new Error("请输入正确的手机号"));
			}
		};
		let validateStreet = (rule, value, callback) => {
			if (value === "") {
				callback(new Error("请输入详细地址"));
			}
		};
		return {
			cartList: [],
			addList: [],
			currentAddressId: "",
			popupOpen: false,
			popupTitle: "管理收货地址",
			num: "", // 立刻购买
			productId: "",
			userId: "",
			orderTotal: 0,
			msg: {
				nickName: "",
				province: "",
				downtown_area: "",
				county: "",
				tel: "",
				streetName: "",
				isDefault: false,
			},
			province: [],
			downtown_area: [],
			county: [],
			rules: {
				nickName: [{ validator: validateNickName, trigger: "blur" }],
				tel: [{ validator: validateTel, trigger: "blur" }],
				streetName: [{ validator: validateStreet, trigger: "blur" }],
			},
		};
	},
	components: {
		WShelf,
		WButton,
		YPopup,
		WHeader,
		WFooter,
	},
	mixins: [messageMixin],
	computed: {
		...mapState(["userInfo"]),
		// 选中的总价格
		checkPrice() {
			return this.cartList.reduce((oldValue, cur) => {
				return oldValue + cur.prod_count * cur.prod_price;
			}, 0);
		},
		msgIsEmity() {
			// return Object.keys(this.msg).some((v) => this.msg[v] === "");
			return (
				this.msg.nickName != "" &&
				this.msg.province != "" &&
				this.msg.downtown_area != "" &&
				this.msg.county != "" &&
				this.msg.streetName != "" &&
				this.msg.tel != ""
			);
		},
	},
	methods: {
		//获取所有的省份
		_getRegion() {
			getRegion(100000).then((res) => {
				if (res.status == 1) {
					this.province = res.districts[0].districts;
				}
			});
		},
		// 获取当前省份的子城市
		currentProvince(item) {
			getRegion(item).then((res) => {
				if (res.status == 1) {
					this.downtown_area = res.districts[0].districts;
				}
			});
		},
		// 获取当前城市的子县区
		currentCity(item) {
			getRegion(item).then((res) => {
				if (res.status == 1) {
					this.county = res.districts[0].districts;
				}
			});
		},
		//获取购物车列表
		_getCartList() {
			getCartList({
				userId: this.userId,
			}).then((res) => {
				if (res.success === true) {
					this.cartList = res.data;
				}
			});
			// this.$store.commit(RESET_PROD);
		},
		//获取收获地址
		_getAddressList() {
			getAddressList({ userId: this.userId }).then((res) => {
				if (res.success === true) {
					this.addList = res.data;
				}
			});
		},
		_addressUpdate(params) {
			addressUpdate(params).then((res) => {
				this._addressList();
			});
		},
		// 添加收获地址
		_addressAdd() {
			let params = {
				userId: this.userId,
				nickName: this.msg.nickName,
				tel: this.msg.tel,
				province: this.msg.province,
				downtownArea: this.msg.downtown_area,
				county: this.msg.county,
				street: this.msg.streetName,
				isDefault: this.msg.isDefault ? 1 : 0,
			};
			addAddress(params).then((res) => {
				if (res.success === true) {
					this.message(res.message, "success");
					this._getAddressList();
				} else {
					this.message(res.message, "error");
				}
			});
		},
		//修改收货地址
		_updateAddress() {
			let params = {
				addressId: this.currentAddressId,
				nickName: this.msg.nickName,
				tel: this.msg.tel,
				province: this.msg.province,
				downtownArea: this.msg.downtown_area,
				county: this.msg.county,
				street: this.msg.streetName,
				isDefault: this.msg.isDefault ? 1 : 0,
			};
			updateAddress(params).then((res) => {
				if (res.success === true) {
					this.message(res.message, "success");
					this._getAddressList();
				} else {
					this.message(res.message, "error");
				}
			});
		},
		// 修改
		update(item) {
			this.popupOpen = true;
			this.currentAddressId = "";
			if (item) {
				this.currentAddressId = item.address_id;
				this.popupTitle = "管理收货地址";
				this.msg.nickName = item.nick_name;
				this.msg.tel = item.tel;
				this.msg.province = item.province;
				this.msg.downtown_area = item.downtown_area;
				this.msg.county = item.county;
				this.msg.streetName = item.street;
				this.msg.isDefault = 0;
			} else {
				this.popupTitle = "新增收货地址";
				this.msg.nickName = "";
				this.msg.tel = "";
				this.msg.province = "";
				this.msg.downtown_area = "";
				this.msg.county = "";
				this.msg.streetName = "";
				this.msg.isDefault = false;
			}
		},
		// 提交订单后跳转付款页面
		// _submitOrder() {
		// 	this.submitOrder = "提交订单中...";
		// 	this.submit = true;
		// 	var array = [];
		// 	if (this.addressId === "0") {
		// 		this.message("请选择收货地址");
		// 		this.submitOrder = "提交订单";
		// 		this.submit = false;
		// 		return;
		// 	}
		// 	if (this.cartList.length === 0) {
		// 		this.message("非法操作");
		// 		this.submitOrder = "提交订单";
		// 		this.submit = false;
		// 		return;
		// 	}
		// 	for (var i = 0; i < this.cartList.length; i++) {
		// 		if (this.cartList[i].checked === "1") {
		// 			array.push(this.cartList[i]);
		// 		}
		// 	}
		// 	let params = {
		// 		userId: this.userId,
		// 		tel: this.tel,
		// 		userName: this.userName,
		// 		streetName: this.streetName,
		// 		goodsList: array,
		// 		orderTotal: this.orderTotal,
		// 	};
		// 	submitOrder(params).then((res) => {
		// 		if (res.success === true) {
		// 			this.payment(res.result);
		// 		} else {
		// 			this.message(res.message);
		// 			this.submitOrder = "提交订单";
		// 			this.submit = false;
		// 		}
		// 	});
		// },
		// // 付款
		// payment(orderId) {
		// 	// 需要拿到地址id
		// 	this.$router.push({
		// 		path: "/order/payment",
		// 		query: {
		// 			orderId: orderId,
		// 		},
		// 	});
		// },
		// 选择地址
		chooseAddress(addressId, userName, tel, streetName) {
			this.currentAddressId = addressId;
			this.userName = userName;
			this.tel = tel;
			this.streetName = streetName;
		},
		// 修改
		update(item) {
			this.popupOpen = true;
			if (item) {
				this.popupTitle = "管理收货地址";
				this.msg.userName = item.userName;
				this.msg.tel = item.tel;
				this.msg.streetName = item.streetName;
				this.msg.isDefault = item.isDefault;
				this.msg.addressId = item.addressId;
			} else {
				this.popupTitle = "新增收货地址";
				this.msg.userName = "";
				this.msg.tel = "";
				this.msg.streetName = "";
				this.msg.isDefault = false;
				this.msg.addressId = "";
			}
		},
		// 保存
		// save(p) {
		// 	this.popupOpen = false;
		// 	if (p.addressId) {
		// 		this._addressUpdate(p);
		// 	} else {
		// 		delete p.addressId;
		// 		this._addressAdd(p);
		// 	}
		// },
		// 删除
		// del(addressId) {
		// 	this._addressDel({ addressId });
		// },
		// _productDet(productId) {
		// 	productDet({ params: { productId } }).then((res) => {
		// 		let item = res.result;
		// 		item.checked = "1";
		// 		item.productImg = item.productImageBig;
		// 		item.productNum = this.num;
		// 		item.productPrice = item.salePrice;
		// 		this.cartList.push(item);
		// 	});
		// },
	},
	created() {
		this.userId = this.userInfo.id;
		let query = this.$route.query;
		if (query.productId && query.num) {
			this.productId = query.productId;
			this.num = query.num;
			// this._productDet(this.productId);
		} else {
			this._getCartList();
		}
		this._getAddressList();
	},
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
// 收货地址
.address-item-list {
	padding: 30px 13px 0;
	.address {
		padding: 19px 14px 0 19px;
		p {
			line-height: 26px;
		}
	}
	li.checked {
		border-color: #6a8fe5;
		position: relative;
		background: #fff;
		.pa {
			right: 15px;
			top: 18px;
		}
		&:hover {
			background: #fff;
		}
	}
	li {
		position: relative;
		overflow: hidden;
		float: left;
		width: 276px;
		height: 158px;
		margin: 0 0 30px 16px;
		border: 1px solid #e5e5e5;
		border-radius: 3px;
		background: #fafafa;
		line-height: 14px;
		text-align: left;
		word-wrap: break-word;
		word-break: normal;
		color: #626262;
		cursor: pointer;
		-moz-user-select: -moz-none;
		-webkit-user-select: none;
		-o-user-select: none;
		user-select: none;
		&:hover {
			background: #f2f2f2;
			.operation-section {
				visibility: visible;
				transform: translate(0, 0);
			}
		}
		&.add-address-item {
			text-align: center;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			p {
				margin-top: 5px;
			}
		}
		.operation-section {
			visibility: hidden;
			position: absolute;
			left: 0;
			bottom: 0;
			width: 100%;
			height: 28px;
			background: #e1e1e1;
			border-top: 1px solid #e1e1e1;
			transition: all 0.2s ease;
			transform: translate(0, 29px);
			border-top: 1px solid #e1e1e1;
			display: flex;
			align-items: center;
			justify-content: center;
			z-index: 11;
			span {
				background: #fff;
				display: flex;
				align-items: center;
				justify-content: center;
				flex: 1;
				height: 100%;
				&:hover {
					background: #f2f2f2;
				}
			}

			span + span {
				border-left: 1px solid #e1e1e1;
			}
		}
	}
}

.s-content {
	.md {
		> div {
			text-align: left;
			margin-bottom: 15px;
			> input {
				width: 100%;
				height: 50px;
				font-size: 18px;
				padding: 10px 20px;
				border: 1px solid #ccc;
				border-radius: 6px;
				box-shadow: 0 3px 5px -4px rgba(0, 0, 0, 0.4) inset,
					-1px 0 3px -2px rgba(0, 0, 0, 0.1) inset;
				line-height: 46px;
			}
		}
	}

	.btn {
		margin: 0;
		width: 100%;
		height: 50px;
		font-size: 14px;
		line-height: 48px;
	}
}

.ui-cart {
	img {
		width: 80px;
		height: 80px;
	}

	.cart-table-title {
		position: relative;
		z-index: 1;
		line-height: 38px;
		height: 38px;
		padding: 0 0 0 30px;
		font-size: 12px;
		background: #eee;
		border-bottom: 1px solid #dbdbdb;
		border-bottom-color: rgba(0, 0, 0, 0.08);
		.name {
			float: left;
			text-align: left;
		}
		span {
			width: 137px;
			float: right;
			text-align: center;
			color: #838383;
		}
	}
	.cart-group.divide {
		.cart-items {
			border-top: 1px dashed #eee;
		}
	}
	.cart-items {
		position: relative;
		height: 140px;
		margin-left: 74px;
		.subtotal {
			font-weight: 700;
		}
		.item-cols-num,
		.price,
		.subtotal {
			overflow: hidden;
			float: right;
			width: 137px;
			text-align: center;
			color: #666;
			line-height: 140px;
		}
		/*数量*/
		.subtotal,
		.item-cols-num {
			padding-top: 50px;
			line-height: 40px;
		}
		.select {
			width: 112px;
			height: 40px;
			padding-top: 4px;
			margin: 0 auto;
			line-height: 40px;
			.down {
				background-position: 0 -60px;
			}
			.down.down-disabled:hover {
				background-position: 0 -300px;
				cursor: not-allowed;
			}
			.num {
				position: relative;
				overflow: hidden;
				display: inline-block;
				width: 36px;
				height: 18px;
				margin: 7px 0 0;
				border: none;
				border-radius: 3px;
				line-height: 18px;
				text-align: center;
				font-size: 14px;
				transition: all 0.2s ease-out;
			}
		}
	}
	.down.down-disabled {
		background-position: 0 -300px;
		cursor: not-allowed;
	}
}

.cart-group.divide .cart-top-items:first-child .cart-items {
	border-top: none;
}

.items-choose {
	position: absolute;
	left: -74px;
	top: 0;
	width: 74px;
	height: 20px;
	padding: 60px 0 0 31px;
	font-size: 12px;
	color: #999;
}

.items-thumb {
	position: relative;
	margin-top: 30px;
	overflow: hidden;
	width: 80px;
	height: 80px;
}

.cart-items .items-thumb > a,
.ui-cart .cart-items .items-thumb > i {
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	border: 1px solid #fff;
	border-radius: 3px;
	border: 0 solid rgba(255, 255, 255, 0.1);
	box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.06);
}

.name {
	width: 380px;
	margin-left: 20px;
	color: #323232;
	display: table;
	a {
		color: #333;
		font-size: 16px;
	}
}

.name-table {
	display: table-cell;
	vertical-align: middle;
	height: 140px;
}

.fix-bottom {
	padding: 22px 29px 19px 30px;
	height: 90px;
	width: 100%;
	z-index: 1;
	background-position: center;
	background: #fdfdfd;
	background: -webkit-linear-gradient(#fdfdfd, #f9f9f9);
	background: linear-gradient(#fdfdfd, #f9f9f9);
	border-top: 1px solid #e9e9e9;
	box-shadow: 0 -3px 8px rgba(0, 0, 0, 0.04);
	.cart-bottom-bg {
		height: 80px;
		border-top: 1px solid #d9d9d9;
		border-radius: 0 0 8px 8px;
	}
	.fix-bottom-inner {
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}
	.shipping {
		display: flex;
		align-items: center;
	}
	em {
		display: inline-block;
		position: relative;
		top: 3px;
		margin-top: -4px;
		font-size: 24px;
		color: #d44d44;
		font-weight: 700;
	}
}

.attribute,
.name p {
	color: #999;
	font-size: 12px;
	padding-top: 4px;
	line-height: 17px;
}
.selectCity {
	display: flex;
	justify-content: space-between;
}
.button_wrap {
	display: flex;
	justify-content: space-around;
	.btn {
		width: 40%;
		height: 50px;
		font-size: 14px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
	}
}
</style>