<template>
	<div>
		<w-header> </w-header>
		<div class="w" style="padding-bottom: 100px">
			<y-shelf title="支付订单">
				<div slot="content">
					<div class="box-inner order-info">
						<h3>准备下单了吗？</h3>
						<h3>请确保以下信息均准确无误。</h3>
						<h3>订单送达日期：根据您的付款时间来计算</h3>
					</div>
					<!--支付方式-->
					<div class="pay-type">
						<div class="p-title">支付方式</div>
						<div class="pay-item">
							<div :class="{ active: payType == 1 }" @click="payType = 1">
								<img src="~assets/img/alipay@2x.png" alt="" />
							</div>
							<div :class="{ active: payType == 2 }" @click="payType = 2">
								<img src="~assets/img/weixinpay@2x.png" alt="" />
							</div>
						</div>
					</div>
					<div class="confirm-table-title">
						<span class="name">商品信息</span>
						<div>
							<span class="price">单价</span>
							<span class="num">数量</span>
							<span class="subtotal">小计</span>
						</div>
					</div>
					<!--商品-->
					<div class="confirm-goods-table">
						<div
							class="cart-items"
							v-for="(item, i) in prod_list"
							:key="item.prod_id"
						>
							<div class="name">
								<div class="name-cell ellipsis">
									<span class="prod_img">
										<img :src="item.prod_img" alt="" srcset="" />
									</span>
									<a>{{ item.prod_title }}</a>
								</div>
							</div>
							<div class="n-b">
								<div class="price">¥ {{ item.prod_price }}</div>
								<div class="goods-num">x{{ item.prod_count }}</div>
								<div class="subtotal">
									<div class="subtotal-cell">
										¥ {{ item.prod_price * item.prod_count }}<br />
									</div>
								</div>
							</div>
						</div>
					</div>
					<!--合计-->
					<div
						class="order-discount-line"
						style="font-size: 14px; font-weight: bolder"
					>
						<p>
							<span>商品总计：</span>
							<span>¥ {{ orderTotal }}</span>
						</p>
						<p><span>运费：</span><span> ¥ 0.00</span></p>
					</div>
					<!--地址信息-->
					<div class="p-msg w">
						<div class="confirm-detail">
							<div class="info-title">收货信息</div>
							<p class="info-detail">姓名：{{ nickName }}</p>
							<p class="info-detail">联系电话：{{ tel }}</p>
							<p class="info-detail">详细地址：{{ street }}</p>
						</div>
					</div>

					<div>
						<div class="box-inner">
							<div>
								<span> 订单金额： </span>
								<em><span>¥</span>{{ orderTotal.toFixed(2) }}</em>
								<span> 应付金额： </span>
								<em><span>¥</span>{{ orderTotal.toFixed(2) }}</em>
								<w-button
									:text="payNow"
									style="
										width: 120px;
										height: 40px;
										font-size: 16px;
										line-height: 38px;
									"
									@btnClick="paySuc()"
								></w-button>
							</div>
						</div>
					</div>
				</div>
			</y-shelf>
		</div>
		<router-view style="margin-top: 40px"></router-view>
		<w-footer></w-footer>
	</div>
</template>
<script>
import WHeader from "common/Header.vue";
import WFooter from "common/Footer.vue";
import WButton from "components/content/WButton.vue";
import YShelf from "components/content/shelf/Shelf.vue";
import { getOrderDetail } from "api/user.js";
export default {
	data() {
		return {
			payType: 1,
			address: {},
			prod_list: [],
			addressId: 0,
			userId: "",
			orderId: "",
			orderTotal: 0,
			userName: "",
			payNow: "立刻支付",
		};
	},
	computed: {
		nickName() {
			return this.address.nick_name;
		},
		tel() {
			return this.address.tel;
		},
		street() {
			return (
				this.address.province +
				this.address.downtown_area +
				this.address.county +
				this.address.street
			);
		},
	},
	methods: {
		_getOrderDetail() {
			let params = {
				orderId: this.orderId,
			};
			getOrderDetail(params).then((res) => {
				if (res.success === true) {
					let data = res.data.result;
					this.prod_list = data.prod_list;
					this.address = data.address_list[data.address_list.length - 1];
					this.orderTotal = data.total_price;
				}
			});
		},
		paySuc() {
			this.payNow = "支付中...";
			let pay_time = Date.now();
			if (this.payType === 1) {
				this.$router.push({
					name: "Alipay",
					params: {
						pay_time,
						orderTotal: this.orderTotal,
						orderId: this.orderId,
					},
				});
			} else if (this.payType === 2) {
				this.$router.push({
					name: "WeChat",
					params: { pay_time, orderTotal: this.orderTotal },
				});
			}
		},
	},
	created() {
		this.orderId = this.$route.query.orderId;
		if (this.orderId) {
			this._getOrderDetail();
		} else {
			this.$router.push({ path: "/" });
		}
	},
	components: {
		WHeader,
		WFooter,
		YShelf,
		WButton,
	},
};
</script>
<style lang="scss" scoped rel="stylesheet/scss">
.w {
	padding-top: 39px;
}

.order-info {
	padding: 60px 0 55px;
	color: #333;
	background: #fff !important;
	h3 {
		padding-bottom: 14px;
		line-height: 36px;
		text-align: center;
		font-size: 36px;
		color: #212121;
	}
	.payment-detail {
		text-align: center;
		line-height: 24px;
		font-size: 14px;
		color: #999;
	}
}

/*支付类型*/
.pay-type {
	margin: 0 auto;
	width: 90%;
	padding-bottom: 30px;
	.p-title {
		font-size: 18px;
		line-height: 40px;
		padding: 0 10px;
		position: relative;
		&:before {
			content: " ";
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			border-bottom: 1px solid #ccc;
		}
	}
}

.pay-type {
	.pay-item {
		display: flex;
		align-items: center;
		div {
			margin-top: 20px;
			width: 175px;
			height: 50px;
			display: flex;
			align-items: center;
			justify-content: center;
			border: 1px solid #e5e5e5;
			cursor: pointer;
			border-radius: 6px;
			margin-right: 10px;
			background: #fafafa;
			&.active {
				border-color: #6a8fe5;
				background: #fff;
			}
			img {
				display: block;
				height: 34px;
				margin: 8px auto;
			}
		}
	}
}

.box-inner {
	line-height: 60px;
	background: #f9f9f9;
	border-top: 1px solid #e5e5e5;
	box-sizing: border-box;
	> div {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		padding: 0 20px;
	}
	em {
		margin-left: 5px;
		font-size: 24px;
		color: #d44d44;
		font-weight: 700;
		margin-right: 20px;
		span {
			margin-right: 4px;
			font-size: 16px;
		}
	}
}

.confirm-detail {
	padding: 0 30px 25px;
	border-top: 1px solid #d5d5d5;
	.info-title {
		height: 14px;
		margin: 30px 0 17px;
		line-height: 14px;
		font-weight: bolder;
		color: #333;
	}
	.info-detail {
		line-height: 24px;
		color: #666;
	}
}

.confirm-table-title {
	padding: 3px 0 0 33px;
	border-top: 1px solid #d5d5d5;
	line-height: 54px;
	font-weight: bolder;
	color: #000;
	display: flex;
	justify-content: space-between;
	span {
		display: inline-block;
		width: 175px;
		text-align: left;
	}
	.price {
		padding-left: 70px;
	}
	.num {
		padding-left: 75px;
	}
	.subtotal {
		padding-left: 72px;
	}
}

.confirm-goods-table {
	border-top: 1px solid #d5d5d5;
	.cart-items {
		height: 80px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		a {
			color: #333;
		}
	}
	.n-b {
		display: flex;
		align-items: center;
		justify-content: center;
		> div {
			color: #626262;
			font-weight: 700;
			width: 175px;
			text-align: center;
		}
	}
}

.order-discount-line {
	padding: 20px 20px 0 0;
	border-top: 1px solid #d5d5d5;
	line-height: 24px;
	text-align: right;
	font-size: 12px;
	&:first-child {
		line-height: 32px;
		text-align: right;
		font-size: 14px;
		font-weight: bolder;
	}
}

.name {
	width: 40%;
}

.name-cell {
	padding-left: 33px;
	display: flex;
	align-items: center;
	.prod_img {
		display: inline-block;
		width: 180px;
		height: 80px;
		// overflow: hidden;
		img {
			width: 100%;
		}
	}
}

.input {
	width: 30%;
	margin: 0 0 1vw 38px;
}

.pay-info {
	margin-top: -2vw;
	text-align: center;
}

.money-select {
	width: 31%;
	padding-left: 10px;
	margin-bottom: 1vw;
}
</style>
