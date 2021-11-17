<template>
	<div>
		<w-shelf title="我的订单">
			<template #content>
				<div
					v-loading="loading"
					element-loading-text="加载中..."
					v-if="orderList.length"
					style="min-height: 10vw"
				>
					<div v-for="(item, i) in orderList" :key="i">
						<div class="gray-sub-title cart-title">
							<div class="first">
								<div>
									<span class="date">{{ item.created | showTime }}</span>
									<span class="order-id">
										订单号：
										<a @click="orderDetail(item._id)">{{ item.order_num }}</a>
									</span>
								</div>
								<div class="f-bc">
									<span class="price">单价</span>
									<span class="num">数量</span>
									<span class="operation">商品操作</span>
								</div>
							</div>
							<div class="last">
								<span
									class="sub-total"
									v-html="item.state === 0 ? '应付金额' : '实付金额'"
								></span>
								<span class="order-detail">
									<a @click="orderDetail(item._id)"
										>查看详情 ><em class="icon-font"></em
									></a>
								</span>
							</div>
						</div>
						<div class="pr">
							<div class="cart" v-for="(good, j) in item.prod_list" :key="j">
								<div class="cart-l" :class="{ bt: j > 0 }">
									<div class="car-l-l">
										<div class="img-box">
											<a @click="goodsDetails(good.prod_id, good.group_id)"
												><img :src="good.prod_img" alt=""
											/></a>
										</div>
										<div class="ellipsis">
											<a
												style="color: #626262"
												@click="goodsDetails(good.prod_id, good.group_id)"
												>{{ good.prod_title }}</a
											>
										</div>
									</div>
									<div class="cart-l-r">
										<div>¥ {{ Number(good.prod_price).toFixed(2) }}</div>
										<div class="num">x{{ good.prod_count }}</div>

										<div class="type">
											<span v-if="item.state === 0"
												><el-tag type="danger">未付款</el-tag></span
											>
											<span v-else-if="item.state === 1"
												><el-tag type="warning">未发货</el-tag></span
											>
											<span v-else-if="item.state === 2"
												><el-tag type="success">已发货</el-tag></span
											>
											<span v-else-if="item.state === 3"
												><el-tag>已完成</el-tag></span
											>
											<span v-else-if="item.state === 4"
												><el-tag type="info">订单关闭</el-tag></span
											>
										</div>
									</div>
								</div>
								<div class="cart-r">
									<span></span>
									<span></span>
								</div>
							</div>
							<div class="prod-operation pa" style="right: 0; top: 0">
								<div class="total">¥ {{ item.total_price }}</div>
								<div
									v-if="item.state === 3 || item.state === 4"
									class="operation-btn"
								>
									<el-button
										@click="_delOrder(item._id)"
										type="danger"
										plain
										round
										size="mini"
										>删除订单</el-button
									>
								</div>
								<div v-if="item.state === 0" class="operation-btn">
									<el-button
										@click="_payment(item._id)"
										type="primary"
										plain
										round
										size="mini"
										>现在付款</el-button
									>
								</div>
								<div class="status" v-else>
									{{ getOrderStatus(item.state) }}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div
					v-loading="loading"
					element-loading-text="加载中..."
					class="no-info"
					v-else
				>
					<el-empty description="您还没有创建过订单哦~"></el-empty>
				</div>
			</template>
		</w-shelf>
		<div style="float: right">
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="currentPage"
				:page-sizes="[5, 10, 20, 50]"
				:page-size="pageSize"
				layout="total, sizes, prev, pager, next"
				:total="total"
			>
			</el-pagination>
		</div>
	</div>
</template>

<script>
import { getOrderList, delOrder } from "api/user.js";
import { mapState } from "vuex";
import { messageMixin, goodsDetailMixin } from "common/mixin/mixin.js";
import { formatDate } from "until/utils.js";

import WShelf from "components/content/shelf/Shelf.vue";
export default {
	data() {
		return {
			orderList: [],
			userId: "",
			orderStatus: "",
			loading: true,
			currentPage: 1,
			pageSize: 5,
			total: 0,
		};
	},
	components: {
		WShelf,
	},
	filters: {
		showTime(val) {
			return formatDate(new Date(val * 1), "yyyy-MM-dd hh:mm:ss");
		},
	},
	mixins: [messageMixin, goodsDetailMixin],
	computed: {
		...mapState(["userInfo"]),
	},
	methods: {
		handleSizeChange(val) {
			this.pageSize = val;
			this._getOrderList();
		},
		handleCurrentChange(val) {
			this.currentPage = val;
			this._getOrderList();
		},
		// 付款
		_payment(orderId) {
			this.$router.push({
				path: "/payment",
				query: {
					orderId,
				},
			});
		},
		//删除订单
		_delOrder() {
			// delOrder()
		},
		orderDetail(orderId) {
			this.$router.push({
				path: "orderDetail",
				query: {
					orderId,
				},
			});
		},
		getOrderStatus(status) {
			if (status === "1") {
				return "支付审核中";
			} else if (status === "2") {
				return "待发货";
			} else if (status === "3") {
				return "待收货";
			} else if (status === "4") {
				return "交易成功";
			} else if (status === "5") {
				return "交易关闭";
			} else if (status === "6") {
				return "支付失败";
			}
		},
		_getOrderList() {
			let params = {
				user_id: this.userId,
				limit: this.pageSize,
				skip: (this.currentPage - 1) * this.pageSize,
			};
			getOrderList(params).then((res) => {
				this.orderList = res.data.result;
				this.total = res.data.total;
				this.loading = false;
			});
		},
	},
	created() {
		this.userId = this.userInfo.id;
		this._getOrderList();
	},
};
</script>

<style lang="scss" scoped>
@import "~assets/style/mixin.scss";

.gray-sub-title {
	height: 38px;
	padding: 0 24px;
	background: #eee;
	border-top: 1px solid #dbdbdb;
	border-bottom: 1px solid #dbdbdb;
	font-size: 12px;
	color: #666;
	display: flex;
	align-items: center;
	span {
		display: inline-block;
		height: 100%;
	}
	.first {
		display: flex;
		justify-content: space-between;
		flex: 1;
		.f-bc {
			> span {
				width: 112px;
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
	margin-left: 25px;
}

.cart {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 24px;
	&:hover {
		.btn {
			visibility: inherit;
		}
	}
	.btn {
		visibility: hidden;
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
			.type {
				span {
					font-size: 12px;
				}
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
	width: 254px;
	.total {
		margin-left: 35px;
		margin-right: auto;
	}
	.operation-btn {
		margin-right: 50px;
	}
}
</style>
