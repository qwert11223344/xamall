<template>
	<div>
		<w-header> </w-header>
		<div class="w" style="padding-bottom: 100px">
			<y-shelf title="支付订单">
				<div slot="content">
					<div class="box-inner order-info">
						<h3>提交订单成功，请填写捐赠信息</h3>
						<p class="payment-detail">
							请在 <span>24 小时内</span>完成支付，超时订单将自动取消。
						</p>
						<p class="payment-detail">
							我们不会在您完成支付后的 72 小时内发货，您的支付将用作捐赠
						</p>
						<p class="payment-detail" style="color: red">
							支付成功后文档或源码将自动发至您填写的邮箱中
						</p>
					</div>
					<div class="pay-info">
						<span style="color: red">*</span> 昵称：<el-input
							v-model="nickName"
							placeholder="请输入您的昵称"
							@change="checkValid"
							:maxlength="maxLength"
							class="input"
						></el-input
						><br />
						<span style="color: red">*</span> 捐赠金额：<el-select
							class="money-select"
							v-model="moneySelect"
							placeholder="请选择支付金额"
							@change="changeSelect"
						>
							<el-option
								label="￥1.00 支付测试（XMall分布式详细文档）"
								value="1.00"
							></el-option>
							<el-option
								label="￥38.00 感谢捐赠（XMall单体版源码及文档）"
								value="38.00"
							></el-option>
							<el-option
								label="自定义 随意撒币"
								value="custom"
							></el-option> </el-select
						><br />
						<div v-if="moneySelect === 'custom'">
							<span style="color: red">*</span> 输入金额：<el-input
								v-model="money"
								placeholder="请输入捐赠金额(最多2位小数，不得低于0.1元)"
								@change="checkValid"
								:maxlength="maxLength"
								class="input"
								style="margin-left: 10px"
							></el-input
							><br />
						</div>
						<span style="color: red">*</span> 通知邮箱：<el-input
							v-model="email"
							placeholder="支付审核结果将以邮件方式发送至您的邮箱"
							@change="checkValid"
							:maxlength="maxLength"
							class="input"
							style="margin-left: 10px"
						></el-input
						><br />
						&nbsp;&nbsp; 留言：<el-input
							v-model="info"
							placeholder="请输入您的留言内容"
							:maxlength="maxLength"
							class="input"
						></el-input>
					</div>
					<!--支付方式-->
					<div class="pay-type">
						<div class="p-title">支付方式</div>
						<div class="pay-item">
							<div :class="{ active: payType == 1 }" @click="payType = 1">
								<img src="/static/images/alipay@2x.png" alt="" />
							</div>
							<div :class="{ active: payType == 2 }" @click="payType = 2">
								<img src="/static/images/weixinpay@2x.png" alt="" />
							</div>
							<div :class="{ active: payType == 3 }" @click="payType = 3">
								<img src="/static/images/qqpay.png" alt="" />
							</div>
						</div>
					</div>

					<div>
						<div class="box-inner">
							<div>
								<span> 订单金额： </span>
								<em><span>¥</span>{{ orderTotal.toFixed(2) }}</em>
								<span> 实际应付金额： </span>
								<em><span>¥</span>{{ money }}</em>
								<y-button
									:text="payNow"
									:classStyle="submit ? 'main-btn' : 'disabled-btn'"
									style="
										width: 120px;
										height: 40px;
										font-size: 16px;
										line-height: 38px;
									"
									@btnClick="paySuc()"
								></y-button>
							</div>
						</div>
					</div>
				</div>
			</y-shelf>
			<!--地址信息-->
			<div class="p-msg w">
				<div class="confirm-detail">
					<div class="info-title">收货信息</div>
					<p class="info-detail">姓名：{{ userName }}</p>
					<p class="info-detail">联系电话：{{ tel }}</p>
					<p class="info-detail">详细地址：{{ streetName }}</p>
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
				<div class="cart-items" v-for="(item, i) in cartList" :key="i">
					<div class="name">
						<div class="name-cell ellipsis">
							<a
								@click="goodsDetails(item.productId)"
								title=""
								target="_blank"
								>{{ item.productName }}</a
							>
						</div>
					</div>
					<div class="n-b">
						<div class="price">¥ {{ item.salePrice }}</div>
						<div class="goods-num">{{ item.productNum }}</div>
						<div class="subtotal">
							<div class="subtotal-cell">
								¥ {{ item.salePrice * item.productNum }}<br />
							</div>
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
			</div>
		</div>
		<router-view style="margin-top: 40px"></router-view>
		<w-footer></w-footer>
	</div>
</template>
<script>
import WHeader from "common/Header.vue";
import WFooter from "common/Footer.vue";
export default {
	components: {
		WHeader,
		WFooter,
	},
};
</script>
