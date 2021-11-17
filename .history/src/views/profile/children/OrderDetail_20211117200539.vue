<template>
	<div>
		<y-shelf v-bind:title="orderTitle">
			<template #content>
				<div
					v-loading="loading"
					element-loading-text="加载中..."
					v-if="orderList.length"
				>
					<div class="orderStatus" v-if="orderStatus !== 4">
						<el-steps
							:space="200"
							:active="
								orderStatus === 0 || orderStatus === 1
									? orderStatus + 1
									: orderStatus + 2
							"
							align-center
							finish-status="success"
							style="width: 100%"
						>
							<el-step title="下单" :description="createTime"></el-step>
							<el-step title="付款" :description="payTime"></el-step>
							<el-step title="配货" description=""></el-step>
							<el-step title="出库" description="deliveryTime"></el-step>
							<el-step
								title="交易成功"
								v-bind:description="finishTime"
							></el-step>
						</el-steps>
					</div>
					<div class="orderStatus-close" v-if="orderStatus === 4">
						<el-steps :space="780" :active="2" style="width: 100%">
							<el-step title="下单" v-bind:description="createTime"></el-step>
							<el-step
								title="交易关闭"
								v-bind:description="closeTime"
							></el-step>
						</el-steps>
					</div>
					<div class="status-now" v-if="orderStatus === 0">
						<ul>
							<li class="status-title"><h3>订单状态：待付款</h3></li>
							<li class="button">
								<el-button
									@click="_payment"
									type="primary"
									size="mini"
									plain
									round
									>现在付款</el-button
								>
								<el-popconfirm
									confirm-button-text="好的"
									cancel-button-text="不用了"
									icon="el-icon-info"
									icon-color="red"
									title="确定要取消订单么？"
									@confirm="_cancelOrder"
									@cancel="_getOrderDetail"
									style="margin-left: 10px"
								>
									<el-button
										slot="reference"
										size="mini"
										plain
										round
										type="danger"
										>取消订单</el-button
									>
								</el-popconfirm>
							</li>
						</ul>
						<p class="realtime">
							<span>您的付款时间还有 </span>
							<span class="red">
								<countDown
									v-bind:endTime="countTime"
									endText="已结束"
									@countDownEnd="countDownEnd"
								></countDown>
							</span>
							<span>，超时后订单将自动取消。</span>
						</p>
					</div>
					<div class="status-now" v-if="orderStatus === 1">
						<ul>
							<li class="status-title">
								<h3>订单状态：已支付，商家正在配货中</h3>
							</li>
						</ul>
					</div>
					<div class="status-now" v-if="orderStatus === 4">
						<ul>
							<li class="status-title"><h3>订单状态：已关闭</h3></li>
						</ul>
						<p class="realtime">
							<span>您的订单已关闭。</span>
						</p>
					</div>
					<div class="status-now" v-if="orderStatus === 3">
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
							<a
								@click="goodsDetails(item.prod_id, item.group_id)"
								class="img-box"
								><img :src="item.prod_img" alt=""
							/></a>
							<div class="name-cell ellipsis">
								<a
									@click="goodsDetails(item.prod_id, item.group_id)"
									title=""
									target="_blank"
									>{{ item.prod_title }}</a
								>
							</div>
							<div class="n-b">
								<div class="price">¥ {{ item.prod_price }}</div>
								<div class="goods-num">{{ item.prod_count }}</div>
								<div class="subtotal">
									¥ {{ Number(item.prod_price * item.prod_count).toFixed(2) }}
								</div>
							</div>
						</div>
					</div>
					<!--合计-->

					<div class="order-discount-line">
						<div class="express" v-if="orderStatus === 2 || orderStatus === 3">
							<p>
								<span>物流公司：</span><span>{{ express }}</span>
							</p>
							<p>
								<span>物流单号：</span><span>{{ express_num }}</span>
							</p>
						</div>
						<p class="total">
							<span>商品总计：</span>
							<span>¥ {{ totalPrice }}</span>
						</p>
						<p class="total">
							<span style="margin-right: 5px">运 费：</span>
							<span>¥ 0.00</span>
						</p>
						<p class="price-total">
							<span>应付金额：</span
							><span class="price-red">¥ {{ totalPrice }}</span>
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
			</template>
		</y-shelf>
	</div>
</template>

<script>
import YShelf from "components/content/shelf/Shelf.vue";
import { getOrderDetail, cancelOrder } from "api/user.js";
import { formatDate } from "until/utils.js";
import { messageMixin, goodsDetailMixin } from "common/mixin/mixin.js";
import CountDown from "components/content/CountDown.vue";
export default {
	data() {
		return {
			orderList: [],
			userId: "",
			orderStatus: 0,
			orderId: "",
			userName: "",
			express_num: "",
			express: "",
			tel: "",
			streetName: "",
			orderTitle: "",
			totalPrice: "",
			createTime: "",
			payTime: "",
			deliveryTime: "",
			closeTime: "",
			finishTime: "",
			loading: true,
			countTime: 0,
		};
	},
	mixins: [messageMixin, goodsDetailMixin],
	methods: {
		// 获取订单详情
		_getOrderDetail() {
			let params = {
				orderId: this.orderId,
			};
			getOrderDetail(params).then((res) => {
				let data = res.data.result;
				this.express_num = data.express_num;
				this.express = data.express;
				this.orderList = data.prod_list;
				this.totalPrice = data.total_price;
				this.userName = data.address_list[0].nick_name;
				this.tel = data.address_list[0].tel;
				this.streetName =
					data.address_list[0].province +
					data.address_list[0].downtown_area +
					data.address_list[0].county +
					data.address_list[0].street;
				this.createTime = formatDate(
					new Date(data.created * 1),
					"yyyy-MM-dd hh:mm:ss"
				);
				this.closeTime = formatDate(
					new Date(data.updated * 1),
					"yyyy-MM-dd hh:mm:ss"
				);
				this.payTime =
					"pay_time" in data
						? formatDate(new Date(data.pay_time * 1), "yyyy-MM-dd hh:mm:ss")
						: "";
				this.deliveryTime =
					"delivery_time" in data
						? formatDate(
								new Date(data.delivery_time * 1),
								"yyyy-MM-dd hh:mm:ss"
						  )
						: "";
				this.orderStatus = data.state;
				this.orderTitle = "订单号：" + data.order_num;
				this.countTime = (data.created * 1 + 86400000).toString();
				this.loading = false;
			});
		},
		//倒计时结束后的回调
		countDownEnd() {
			this._cancelOrder();
		},
		//取消订单
		_cancelOrder() {
			cancelOrder({ _id: this.orderId }).then((res) => {
				if (res.success === true) {
					this.message(res.message, "success");
					this._getOrderDetail();
				} else {
					this.message(res.message, "error");
				}
			});
		},
		// 付款
		_payment() {
			this.$router.push({
				path: "/payment",
				query: {
					orderId: this.orderId,
				},
			});
		},
	},
	created() {
		this.orderId = this.$route.query.orderId;
		this._getOrderDetail();
	},
	components: {
		YShelf,
		CountDown,
	},
};
</script>

<style lang="scss" scoped>
@import "~assets/style/mixin.scss";

.orderStatus {
	display: flex;
	height: 120px;
	align-items: center;
}

.orderStatus-close {
	display: flex;
	align-items: center;
	margin: 50px -800px 20px 60px;
}

.status-now {
	background: #f6f6f6;
	border: 1px solid #dadada;
	border-radius: 5px;
	padding: 22px 30px 20px;
	margin: 0 30px 30px 30px;
	line-height: 38px;
}

.status-title {
	font-size: 18px;
	color: #666;
}

.button {
	float: right;
	margin: -37px 0 20px 0;
}

.realtime {
	border-top: 1px solid #dcdcdc;
	margin-top: 20px;
	padding-top: 26px;
}

.red {
	color: #d44d44;
}

.address {
	line-height: 38px;
	word-wrap: break-word;
	word-spacing: normal;
	word-break: break-all;
	color: #626262;
}

.img-box {
	border: 1px solid #ebebeb;
	margin-left: -80px;
}

img {
	display: block;
	@include wh(80px);
}

.goods-table {
	.n-b {
		display: flex;
		align-items: center;
		justify-content: center;
		> div {
			color: #626262;
			font-weight: 700;
			width: 165px;
			text-align: center;
		}
	}
	.cart-items {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 110px;
		padding: 15px 0 15px 120px;
		border-bottom: 1px solid #efefef;
		a {
			color: #333;
		}
	}
	.price {
		padding-left: 120px;
	}
	.goods-num {
		padding-left: 60px;
	}
}

.order-discount-line {
	padding: 22px 30px 20px;
	line-height: 24px;
	text-align: right;
	font-weight: bolder;
}

.gray-sub-title {
	height: 38px;
	padding: 0 24px;
	background: #eee;
	border-top: 1px solid #dbdbdb;
	border-bottom: 1px solid #dbdbdb;
	line-height: 38px;
	font-size: 12px;
	color: #666;
	display: flex;
	span {
		display: inline-block;
		height: 100%;
	}
	.express {
		display: inline-flex;
		flex-direction: column;
	}
	.first {
		display: inline-flex;
		justify-content: space-between;
		flex: 1;
		.f-bc {
			> span {
				width: 130px;
				text-align: center;
			}
		}
	}
	.last {
		width: 230px;
		text-align: center;
		display: flex;
		border-left: 1px solid #ccc;
		span {
			flex: 1;
		}
	}
}

.bt {
	border-top: 1px solid #efefef;
}

.date {
	padding-left: 0px;
}

.order-id {
	margin-left: 10px;
}

.cart {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 24px;
	&:hover {
		.del-order {
			display: block;
		}
	}
	.del-order {
		display: none;
	}
	.cart-l {
		display: flex;
		align-items: center;
		flex: 1;
		padding: 15px 0;
		justify-content: space-between;
		position: relative;
		&:before {
			position: absolute;
			content: " ";
			right: -1px;
			top: 0;
			width: 1px;
			background-color: #efefef;
			height: 100%;
		}
		.ellipsis {
			margin-left: 20px;
			width: 220px;
		}
		.img-box {
			border: 1px solid #ebebeb;
		}
		img {
			display: block;
			@include wh(80px);
		}
		.cart-l-r {
			display: flex;
			> div {
				text-align: center;
				width: 112px;
			}
		}
		.car-l-l {
			display: flex;
			align-items: center;
		}
	}
	.cart-r {
		width: 230px;
		display: flex;
		span {
			text-align: center;
			flex: 1;
		}
	}
}

.prod-operation {
	height: 110px;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 254px;
	div {
		width: 100%;
		text-align: center;
	}
	div:last-child {
		padding-right: 24px;
	}
}

.price-total {
	height: 54px;
	line-height: 54px;
	font-size: 18px;
}

.price-red {
	font-weight: 700;
	color: #d44d44;
}
</style>
