<template>
	<div class="checkout">
		<y-header>
			<div slot="nav"></div>
		</y-header>
		<div class="w" style="padding-top: 40px">
			<!-- 收货地址 -->
			<y-shelf title="收货信息">
				<div slot="content">
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
								收货人: {{ item.userName }}
								{{ item.isDefault ? "(默认地址)" : "" }}
							</p>
							<p class="street-name ellipsis">
								收货地址: {{ item.streetName }}
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
									:data-id="item.addressId"
									@click="del(item.addressId)"
									>删除</span
								>
							</div>
						</li>

						<li class="add-address-item" @click="update()">
							<img src="../../../static/svg/jia.svg" alt="" />
							<p>使用新地址</p>
						</li>
					</ul>
				</div>
			</y-shelf>
			<!-- 购物清单 -->
			<y-shelf title="购物清单">
				<div slot="content">
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
							<div
								class="cart-table"
								v-for="(item, i) in cartList"
								:key="i"
								v-if="item.checked === '1'"
							>
								<div
									class="cart-group divide pr"
									:data-productid="item.productId"
								>
									<div class="cart-top-items">
										<div class="cart-items clearfix">
											<!--图片-->
											<div class="items-thumb fl">
												<img :alt="item.productName" :src="item.productImg" />
												<a
													@click="goodsDetails(item.productId)"
													:title="item.productName"
													target="_blank"
												></a>
											</div>
											<!--信息-->
											<div class="name hide-row fl">
												<div class="name-table">
													<a
														@click="goodsDetails(item.productId)"
														:title="item.productName"
														target="_blank"
														v-text="item.productName"
													></a>
													<!-- <ul class="attribute">
                            <li>白色</li>
                          </ul> -->
												</div>
											</div>
											<!--商品数量-->
											<div>
												<!--总价格-->
												<div class="subtotal" style="font-size: 14px">
													¥ {{ item.salePrice * item.productNum }}
												</div>
												<!--数量-->
												<div class="item-cols-num">
													<span v-text="item.productNum"></span>
												</div>
												<!--价格-->
												<div class="price">¥ {{ item.salePrice }}</div>
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
									<y-button
										class="big-main-btn"
										:classStyle="submit ? 'disabled-btn' : 'main-btn'"
										style="
											margin: 0;
											width: 130px;
											height: 50px;
											line-height: 50px;
											font-size: 16px;
										"
										:text="submitOrder"
										@btnClick="_submitOrder"
									>
									</y-button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</y-shelf>

			<y-popup :open="popupOpen" @close="popupOpen = false" :title="popupTitle">
				<div slot="content" class="md" :data-id="msg.addressId">
					<div>
						<input
							type="text"
							placeholder="收货人姓名"
							v-model="msg.userName"
						/>
					</div>
					<div>
						<input type="number" placeholder="手机号码" v-model="msg.tel" />
					</div>
					<div>
						<input
							type="text"
							placeholder="收货地址"
							v-model="msg.streetName"
						/>
					</div>
					<div>
						<el-checkbox class="auto-login" v-model="msg.isDefault"
							>设为默认</el-checkbox
						>
					</div>
					<y-button
						text="保存"
						class="btn"
						:classStyle="btnHighlight ? 'main-btn' : 'disabled-btn'"
						@btnClick="
							save({
								userId: userId,
								addressId: msg.addressId,
								userName: msg.userName,
								tel: msg.tel,
								streetName: msg.streetName,
								isDefault: msg.isDefault,
							})
						"
					>
					</y-button>
				</div>
			</y-popup>
		</div>
		<y-footer></y-footer>
	</div>
</template>

<script>
import WShelf from "components/content/shelf/Shelf.vue";
import WButton from "components/content/WButton.vue";
import YPopup from "components/content/popup/Popup.vue";
import WHeader from "common/Header.vue";
import WFooter from "common/Footer.vue";

export default {
	data() {
		return {
			cartList: [],
			addList: [],
			addressId: "0",
			popupOpen: false,
			popupTitle: "管理收货地址",
			num: "", // 立刻购买
			productId: "",
			msg: {
				addressId: "",
				userName: "",
				tel: "",
				streetName: "",
				isDefault: false,
			},
			userName: "",
			tel: "",
			streetName: "",
			userId: "",
			orderTotal: 0,
			submit: false,
			submitOrder: "提交订单",
		};
	},
	component: {
		WShelf,
		WButton,
		YPopup,
		WHeader,
		WFooter,
	},
	computed: {
		btnHighlight() {
			let msg = this.msg;
			return msg.userName && msg.tel && msg.streetName;
		},
		// 选中的总价格
		checkPrice() {
			let totalPrice = 0;
			this.cartList &&
				this.cartList.forEach((item) => {
					if (item.checked === "1") {
						totalPrice += item.productNum * item.salePrice;
					}
				});
			this.orderTotal = totalPrice;
			return totalPrice;
		},
	},
	methods: {
		message(m) {
			this.$message.error({
				message: m,
			});
		},
		goodsDetails(id) {
			window.open(window.location.origin + "#/goodsDetails?productId=" + id);
		},
		_getCartList() {
			getCartList({ userId: this.userId }).then((res) => {
				this.cartList = res.result;
			});
		},
		_addressList() {
			addressList({ userId: this.userId }).then((res) => {
				let data = res.result;
				if (data.length) {
					this.addList = data;
					this.addressId = data[0].addressId || "1";
					this.userName = data[0].userName;
					this.tel = data[0].tel;
					this.streetName = data[0].streetName;
				} else {
					this.addList = [];
				}
			});
		},
		_addressUpdate(params) {
			addressUpdate(params).then((res) => {
				this._addressList();
			});
		},
		_addressAdd(params) {
			addressAdd(params).then((res) => {
				if (res.success === true) {
					this._addressList();
				} else {
					this.message(res.message);
				}
			});
		},
		_addressDel(params) {
			addressDel(params).then((res) => {
				this._addressList();
			});
		},
		// 提交订单后跳转付款页面
		_submitOrder() {
			this.submitOrder = "提交订单中...";
			this.submit = true;
			var array = [];
			if (this.addressId === "0") {
				this.message("请选择收货地址");
				this.submitOrder = "提交订单";
				this.submit = false;
				return;
			}
			if (this.cartList.length === 0) {
				this.message("非法操作");
				this.submitOrder = "提交订单";
				this.submit = false;
				return;
			}
			for (var i = 0; i < this.cartList.length; i++) {
				if (this.cartList[i].checked === "1") {
					array.push(this.cartList[i]);
				}
			}
			let params = {
				userId: this.userId,
				tel: this.tel,
				userName: this.userName,
				streetName: this.streetName,
				goodsList: array,
				orderTotal: this.orderTotal,
			};
			submitOrder(params).then((res) => {
				if (res.success === true) {
					this.payment(res.result);
				} else {
					this.message(res.message);
					this.submitOrder = "提交订单";
					this.submit = false;
				}
			});
		},
		// 付款
		payment(orderId) {
			// 需要拿到地址id
			this.$router.push({
				path: "/order/payment",
				query: {
					orderId: orderId,
				},
			});
		},
		// 选择地址
		chooseAddress(addressId, userName, tel, streetName) {
			this.addressId = addressId;
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
		save(p) {
			this.popupOpen = false;
			if (p.addressId) {
				this._addressUpdate(p);
			} else {
				delete p.addressId;
				this._addressAdd(p);
			}
		},
		// 删除
		del(addressId) {
			this._addressDel({ addressId });
		},
		_productDet(productId) {
			productDet({ params: { productId } }).then((res) => {
				let item = res.result;
				item.checked = "1";
				item.productImg = item.productImageBig;
				item.productNum = this.num;
				item.productPrice = item.salePrice;
				this.cartList.push(item);
			});
		},
	},
	created() {
		this.userId = getStore("userId");
		let query = this.$route.query;
		if (query.productId && query.num) {
			this.productId = query.productId;
			this.num = query.num;
			this._productDet(this.productId);
		} else {
			this._getCartList();
		}
		this._addressList();
	},
};
</script>

<style>
</style>