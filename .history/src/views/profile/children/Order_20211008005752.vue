<template>
	<div>
		<y-shelf title="我的订单">
			<div slot="content">
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
									<span class="date" v-text="item.createDate"></span>
									<span class="order-id">
										订单号：
										<a @click="orderDetail(item.orderId)">{{ item.orderId }}</a>
									</span>
								</div>
								<div class="f-bc">
									<span class="price">单价</span>
									<span class="num">数量</span>
									<span class="operation">商品操作</span>
								</div>
							</div>
							<div class="last">
								<span class="sub-total">实付金额</span>
								<span class="order-detail">
									<a @click="orderDetail(item.orderId)"
										>查看详情 ><em class="icon-font"></em
									></a>
								</span>
							</div>
						</div>
						<div class="pr">
							<div class="cart" v-for="(good, j) in item.goodsList" :key="j">
								<div class="cart-l" :class="{ bt: j > 0 }">
									<div class="car-l-l">
										<div class="img-box">
											<a @click="goodsDetails(good.productId)"
												><img :src="good.productImg" alt=""
											/></a>
										</div>
										<div class="ellipsis">
											<a
												style="color: #626262"
												@click="goodsDetails(good.productId)"
												>{{ good.productName }}</a
											>
										</div>
									</div>
									<div class="cart-l-r">
										<div>¥ {{ Number(good.salePrice).toFixed(2) }}</div>
										<div class="num">{{ good.productNum }}</div>
										<div class="type">
											<el-button
												style="margin-left: 20px"
												@click="_delOrder(item.orderId, i)"
												type="danger"
												size="small"
												v-if="j < 1"
												class="del-order"
												>删除此订单</el-button
											>
											<!-- <a @click="_delOrder(item.orderId,i)" href="javascript:;" v-if="j<1" class="del-order">删除此订单</a> -->
										</div>
									</div>
								</div>
								<div class="cart-r">
									<span></span>
									<span></span>
								</div>
							</div>
							<div class="prod-operation pa" style="right: 0; top: 0">
								<div class="total">¥ {{ item.orderTotal }}</div>
								<div v-if="item.orderStatus === '0'">
									<el-button
										@click="orderPayment(item.orderId)"
										type="primary"
										size="small"
										>现在付款</el-button
									>
								</div>
								<div class="status" v-if="item.orderStatus !== '0'">
									{{ getOrderStatus(item.orderStatus) }}
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
					<div style="padding: 100px 0; text-align: center">
						你还未创建过订单
					</div>
				</div>
			</div>
		</y-shelf>
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
export default {
  import { orderList, delOrder } from '/api/goods'
  import YShelf from '/components/shelf'
  import { getStore } from '/utils/storage'
  export default {
    data () {
      return {
        orderList: [0],
        userId: '',
        orderStatus: '',
        loading: true,
        currentPage: 1,
        pageSize: 5,
        total: 0
      }
    },
    methods: {
      message (m) {
        this.$message.error({
          message: m
        })
      },
      handleSizeChange (val) {
        this.pageSize = val
        this._orderList()
      },
      handleCurrentChange (val) {
        this.currentPage = val
        this._orderList()
      },
      orderPayment (orderId) {
        window.open(window.location.origin + '#/order/payment?orderId=' + orderId)
      },
      goodsDetails (id) {
        window.open(window.location.origin + '#/goodsDetails?productId=' + id)
      },
      orderDetail (orderId) {
        this.$router.push({
          path: 'orderDetail',
          query: {
            orderId: orderId
          }
        })
      },
      getOrderStatus (status) {
        if (status === '1') {
          return '支付审核中'
        } else if (status === '2') {
          return '待发货'
        } else if (status === '3') {
          return '待收货'
        } else if (status === '4') {
          return '交易成功'
        } else if (status === '5') {
          return '交易关闭'
        } else if (status === '6') {
          return '支付失败'
        }
      },
      _orderList () {
        let params = {
          params: {
            userId: this.userId,
            size: this.pageSize,
            page: this.currentPage
          }
        }
        orderList(params).then(res => {
          this.orderList = res.result.data
          this.total = res.result.total
          this.loading = false
        })
      },
      _delOrder (orderId, i) {
        let params = {
          params: {
            orderId: orderId
          }
        }
        delOrder(params).then(res => {
          if (res.success === true) {
            this.orderList.splice(i, 1)
          } else {
            this.message('删除失败')
          }
        })
      }
    },
    created () {
      this.userId = getStore('userId')
      this._orderList()
    },
    components: {
      YShelf
    }
  }
};
</script>

<style>
</style>