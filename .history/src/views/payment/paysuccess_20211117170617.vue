<template>
	<div class="w">
		<y-shelf title="支付成功" style="text-align: center">
			<div slot="content" class="content">
				<p>
					<i class="el-icon-circle-check icon-success"></i>
					恭喜您支付成功，您的订单将以快马加鞭的速度送到您手中
				</p>
				<p>
					总共花费
					<span class="price"
						><em style="font-size: 18px">¥</em>{{ price }}</span
					>
					元
				</p>
				<div class="btn" style="margin-top: 20px">
					<router-link to="/profile">
						<el-button round plain type="primary">查看订单</el-button>
					</router-link>
					<router-link to="/goods">
						<el-button round plain type="primary">继续选购</el-button>
					</router-link>
				</div>
			</div>
		</y-shelf>
	</div>
</template>
<script>
import YShelf from "components/content/shelf/Shelf.vue";
import WButton from "components/content/WButton.vue";
export default {
	data() {
		return {
			price: 0,
		};
	},
	components: {
		YShelf,
		WButton,
	},
	created() {
		this.price = this.$route.query.price;
	},
};
</script>
<style lang="scss" scoped>
.content {
	padding: 150px 0;
	font-size: 30px;
}

.icon-success {
	font-size: 33px;
	color: #01b401;
}

span.price {
	color: #d44d44;
	font-weight: 700;
	line-height: 20px;
	text-align: right;
}
.btn {
	background: royalblue;
	display: flex;
	justify-content: space-around;
}
</style>
