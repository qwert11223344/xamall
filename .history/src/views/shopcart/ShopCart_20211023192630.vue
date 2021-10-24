<template>
	<div class="shopping-cart">
		<w-header> </w-header>
		<div class="store-content page-cart">
			<div class="gray-box">
				<div class="title"><h2>购物清单</h2></div>
				<!--内容-->
				<div v-if="cartList.length">
					<div class="ui-cart">
						<div>
							<!--标题-->
							<div class="cart-table-title">
								<span class="name">商品信息</span>
								<span class="operation">操作</span>
								<span class="subtotal">小计</span>
								<span class="num">数量</span> <span class="price1">单价</span>
							</div>
							<!--列表-->
							<div class="cart-table" v-for="(item, i) in cartList" :key="i">
								<div
									class="cart-group divide pr"
									:data-productid="item.productId"
								>
									<div class="cart-top-items">
										<div class="cart-items clearfix">
											<!--勾选-->
											<div class="items-choose">
												<span
													class="blue-checkbox-new"
													:class="{ 'checkbox-on': item.checked === '1' }"
													@click="editCart('check', item)"
												></span>
											</div>
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
											<!--删除按钮-->
											<div class="operation">
												<a
													class="items-delete-btn"
													@click="cartdel(item.productId)"
												></a>
											</div>
											<!--商品数量-->
											<div>
												<!--总价格-->
												<div class="subtotal" style="font-size: 14px">
													¥ {{ item.salePrice * item.productNum }}
												</div>
												<!--数量-->
												<buy-num
													:num="item.productNum"
													:id="item.productId"
													:checked="item.checked"
													style="
														height: 140px;
														display: flex;
														align-items: center;
														justify-content: center;
													"
													:limit="item.limitNum"
													@edit-num="EditNum"
												>
												</buy-num>
												<!--价格-->
												<div class="price1">¥ {{ item.salePrice }}</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="cart-bottom-bg fix-bottom">
						<div class="fix-bottom-inner">
							<div class="cart-bar-operation">
								<div>
									<div class="choose-all">
										<span
											:class="{ 'checkbox-on': checkAllFlag }"
											class="blue-checkbox-new"
											@click="editCheckAll"
										></span>
										<span @click="editCheckAll">全选</span>
									</div>
									<div class="delete-choose-goods" @click="delChecked">
										删除选中的商品
									</div>
								</div>
							</div>
							<div class="shipping">
								<div class="shipping-box">
									<div class="shipping-total shipping-num">
										<h4 class="highlight">
											已选择 <i v-text="checkNum"></i> 件商品
										</h4>
										<h5>共计 <i v-text="totalNum"></i> 件商品</h5>
									</div>
									<div class="shipping-total shipping-price">
										<h4 class="highlight">
											应付总额：<span>￥</span><i v-text="checkPrice"></i>
										</h4>
										<h5 class="shipping-tips ng-scope">应付总额不含运费</h5>
									</div>
								</div>
								<w-button
									:classStyle="
										checkNum > 0 && submit ? 'main-btn' : 'disabled-btn'
									"
									class="big-main-btn"
									style="
										margin: 0;
										width: 130px;
										height: 50px;
										line-height: 50px;
										font-size: 16px;
									"
									:text="checkoutNow"
									@btnClick="checkout"
								></w-button>
							</div>
						</div>
					</div>
				</div>
				<div v-else style="padding: 50px">
					<div class="cart-e"></div>
					<p style="text-align: center; padding: 20px; color: #8d8d8d">
						你的购物车空空如也
					</p>
					<div style="text-align: center">
						<router-link to="/goods">
							<w-button
								text="现在选购"
								style="
									width: 150px;
									height: 40px;
									line-height: 38px;
									color: #8d8d8d;
								"
							></w-button>
						</router-link>
					</div>
				</div>
			</div>
		</div>
		<w-footer></w-footer>
	</div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { goodsDetailMixin, messageMixin } from "common/mixin/mixin.js";

import WHeager from "common/Header.vue";
import WFooter from "common/Footer.vue";
import BuyNum from "components/content/BuyNum.vue";
import WButton from "components/content/WButton.vue";
export default {
	data() {
		return {
			userId: 0,
			checkoutNow: "现在结算",
			submit: true,
		};
	},
	components: {
		WHeager,
		WFooter,
		BuyNum,
		WButton,
	},
	computed: {
		...mapState(["cartList"]),
		// 是否全选
		checkAllFlag() {
			return this.checkedCount === this.cartList.length;
		},
		// 勾选的数量
		checkedCount() {
			var i = 0;
			this.cartList &&
				this.cartList.forEach((item) => {
					if (item.checked === "1") i++;
				});
			return Number(i);
		},
		// 计算总数量
		totalNum() {
			var totalNum = 0;
			this.cartList &&
				this.cartList.forEach((item) => {
					totalNum += item.productNum;
				});
			return Number(totalNum);
		},
		// 选中的总价格
		checkPrice() {
			var totalPrice = 0;
			this.cartList &&
				this.cartList.forEach((item) => {
					if (item.checked === "1") {
						totalPrice += item.productNum * item.salePrice;
					}
				});
			return totalPrice;
		},
		// 选中的商品数量
		checkNum() {
			var checkNum = 0;
			this.cartList &&
				this.cartList.forEach((item) => {
					if (item.checked === "1") {
						checkNum += item.productNum;
					}
				});
			return checkNum;
		},
	},
};
</script>

<style>
</style>