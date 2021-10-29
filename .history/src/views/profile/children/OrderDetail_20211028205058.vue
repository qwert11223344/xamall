<template>
	<div>
		<y-shelf v-bind:title="orderTitle">
			<div slot="content">
				<div
					v-loading="loading"
					element-loading-text="加载中..."
					style="min-height: 10vw"
					v-if="orderList.length"
				>
					<div
						class="orderStatus"
						v-if="orderStatus !== -1 && orderStatus !== 6"
					>
						<el-steps :space="200" :active="orderStatus">
							<el-step title="下单" v-bind:description="createTime"></el-step>
							<el-step title="付款" v-bind:description="payTime"></el-step>
							<el-step title="配货" description=""></el-step>
							<el-step title="出库" description=""></el-step>
							<el-step
								title="交易成功"
								v-bind:description="finishTime"
							></el-step>
						</el-steps>
					</div>
					<div class="orderStatus-close" v-if="orderStatus === -1">
						<el-steps :space="780" :active="2">
							<el-step title="下单" v-bind:description="createTime"></el-step>
							<el-step
								title="交易关闭"
								v-bind:description="closeTime"
							></el-step>
						</el-steps>
					</div>
					<div class="orderStatus-close" v-if="orderStatus === 6">
						<el-steps :space="780" :active="2">
							<el-step title="下单" v-bind:description="createTime"></el-step>
							<el-step
								title="交易关闭"
								v-bind:description="closeTime"
							></el-step>
						</el-steps>
					</div>
					<div class="status-now" v-if="orderStatus === 1">
						<ul>
							<li class="status-title"><h3>订单状态：待付款</h3></li>
							<li class="button">
								<el-button
									@click="orderPayment(orderId)"
									type="primary"
									size="small"
									>现在付款</el-button
								>
								<el-button @click="_cancelOrder()" size="small"
									>取消订单</el-button
								>
							</li>
						</ul>
						<p class="realtime">
							<span>您的付款时间还有 </span>
							<span class="red"
								><countDown
									v-bind:endTime="countTime"
									endText="已结束"
								></countDown
							></span>
							<span>，超时后订单将自动取消。</span>
						</p>
					</div>
					<div class="status-now" v-if="orderStatus === 2">
						<ul>
							<li class="status-title">
								<h3>订单状态：已支付，待系统审核确认</h3>
							</li>
						</ul>
						<p class="realtime">
							<span
								>请耐心等待审核，审核结果将发送到您的邮箱，并且您所填写的捐赠数据将显示在捐赠表中。</span
							>
						</p>
					</div>
					<div
						class="status-now"
						v-if="orderStatus === -1 || orderStatus === 6"
					>
						<ul>
							<li class="status-title"><h3>订单状态：已关闭</h3></li>
						</ul>
						<p class="realtime">
							<span>您的订单已关闭。</span>
						</p>
					</div>
					<div class="status-now" v-if="orderStatus === 5">
						<ul>
							<li class="status-title"><h3>订单状态：已完成</h3></li>
						</ul>
						<p class="realtime">
							<span>您的订单已交易成功，感谢您的惠顾！</span>
						</p>
					</div>
					<div class="gray-sub-title cart-title">
						<div class="first">
							<div>
								<span class="order-id">商品名称</span>
							</div>
							<div class="f-bc">
								<span class="price">单价</span>
								<span class="num">数量</span>
								<span class="operation">小计</span>
							</div>
						</div>
					</div>

					<!--商品-->
					<div class="goods-table">
						<div class="cart-items" v-for="(item, i) in orderList" :key="i">
							<a @click="goodsDetails(item.productId)" class="img-box"
								><img :src="item.productImg" alt=""
							/></a>
							<div class="name-cell ellipsis">
								<a
									@click="goodsDetails(item.productId)"
									title=""
									target="_blank"
									>{{ item.productName }}</a
								>
							</div>
							<div class="n-b">
								<div class="price">
									¥ {{ Number(item.salePrice).toFixed(2) }}
								</div>
								<div class="goods-num">{{ item.productNum }}</div>
								<div class="subtotal">
									¥ {{ Number(item.salePrice * item.productNum).toFixed(2) }}
								</div>
							</div>
						</div>
					</div>
					<!--合计-->
					<div class="order-discount-line">
						<p style="font-size: 14px; font-weight: bolder">
							<span style="padding-right: 47px">商品总计：</span>
							<span style="font-size: 16px; font-weight: 500; line-height: 32px"
								>¥ {{ orderTotal }}</span
							>
						</p>
						<p>
							<span style="padding-right: 30px">运费：</span
							><span style="font-weight: 700">+ ¥ 0.00</span>
						</p>
						<p class="price-total">
							<span>应付金额：</span
							><span class="price-red">¥ {{ orderTotal }}</span>
						</p>
					</div>

					<div class="gray-sub-title cart-title">
						<div class="first">
							<div>
								<span class="order-id">收货信息</span>
							</div>
						</div>
					</div>
					<div style="height: 155px; padding: 20px 30px">
						<p class="address">姓名：{{ userName }}</p>
						<p class="address">联系电话：{{ tel }}</p>
						<p class="address">详细地址：{{ streetName }}</p>
					</div>
				</div>
				<div v-loading="loading" element-loading-text="加载中..." v-else>
					<div style="padding: 100px 0; text-align: center">
						获取该订单信息失败
					</div>
				</div>
			</div>
		</y-shelf>
	</div>
</template>

<script>
import { getOrderDet, cancelOrder } from "/api/goods";
import YShelf from "/components/shelf";
import { getStore } from "/utils/storage";
import countDown from "/components/countDown";
export default {
	data() {
		return {
			orderList: [0],
			userId: "",
			orderStatus: 0,
			orderId: "",
			userName: "",
			tel: "",
			streetName: "",
			orderTitle: "",
			createTime: "",
			payTime: "",
			closeTime: "",
			finishTime: "",
			orderTotal: "",
			loading: true,
			countTime: 0,
		};
	},
	methods: {
		message(m) {
			this.$message.error({
				message: m,
			});
		},
		orderPayment(orderId) {
			window.open(
				window.location.origin + "#/order/payment?orderId=" + orderId
			);
		},
		goodsDetails(id) {
			window.open(window.location.origin + "#/goodsDetails?productId=" + id);
		},
		_getOrderDet() {
			let params = {
				params: {
					orderId: this.orderId,
				},
			};
			getOrderDet(params).then((res) => {
				if (res.result.orderStatus === "0") {
					this.orderStatus = 1;
				} else if (res.result.orderStatus === "1") {
					this.orderStatus = 2;
				} else if (res.result.orderStatus === "4") {
					this.orderStatus = 5;
				} else if (res.result.orderStatus === "5") {
					this.orderStatus = -1;
				} else if (res.result.orderStatus === "6") {
					this.orderStatus = 6;
				}
				this.orderList = res.result.goodsList;
				this.orderTotal = res.result.orderTotal;
				this.userName = res.result.addressInfo.userName;
				this.tel = res.result.addressInfo.tel;
				this.streetName = res.result.addressInfo.streetName;
				this.createTime = res.result.createDate;
				this.closeTime = res.result.closeDate;
				this.payTime = res.result.payDate;
				if (this.orderStatus === 5) {
					this.finishTime = res.result.finishDate;
				} else {
					this.countTime = res.result.finishDate;
				}
				this.loading = false;
			});
		},
		_cancelOrder() {
			cancelOrder({ orderId: this.orderId }).then((res) => {
				if (res.success === true) {
					this._getOrderDet();
				} else {
					this.message("取消失败");
				}
			});
		},
	},
	created() {
		this.userId = getStore("userId");
		this.orderId = this.$route.query.orderId;
		this.orderTitle = "订单号：" + this.orderId;
		this._getOrderDet();
	},
	components: {
		YShelf,
		countDown,
	},
};
</script>

<style>
</style>