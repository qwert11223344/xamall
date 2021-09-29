<template>
	<div class="good-item">
		<div style="">
			<div class="good-img">
				<a @click="openProduct(item.product_id)">
					<img v-lazy="item.product_img" />
				</a>
			</div>
			<h6 class="good-title" v-html="item.product_title">
				{{ item.product_title }}
			</h6>
			<h3 class="sub-title ellipsis">{{ item.product_desc }}</h3>
			<div class="good-price pr">
				<div class="ds pa">
					<a @click="openProduct(item.product_id)">
						<w-button text="查看详情" style="margin: 0 5px"></w-button>
					</a>
					<w-button
						text="加入购物车"
						style="margin: 0 5px"
						@btnClick="
							addCart(
								item.product_id,
								item.price,
								item.product_title,
								item.product_img
							)
						"
						classStyle="main-btn"
					></w-button>
				</div>
				<p>
					<span style="font-size: 14px">￥</span
					>{{ Number(item.price).toFixed(2) }}
				</p>
			</div>
		</div>
	</div>
</template>
<script>
import WButton from "components/content/WButton";

export default {
	props: {
		item: {
			type: Object,
			default() {
				return {};
			},
		},
	},
	data() {
		return {};
	},
	methods: {
		goodsDetails(id) {
			this.$router.push({
				path: "goodsDetail",
				query: {
					productId: id,
				},
			});
		},
		openProduct(id) {
			window.open("//" + window.location.host + "/goodsDetail?productId=" + id);
		},
	},

	mounted() {},
	components: {
		WButton,
	},
};
</script>
<style lang="scss" scoped>
@import "assets/style/mixin.scss";
@import "assets/style/theme.scss";
.good-item {
	background: #fff;
	width: 25%;
	transition: all 0.5s;
	height: 430px;
	&:hover {
		transform: translateY(-3px);
		box-shadow: 1px 1px 20px #999;
		.good-price p {
			display: none;
		}
		.ds {
			display: flex;
		}
	}
	.ds {
		@extend %block-center;
		width: 100%;
		display: none;
	}

	.good-img {
		img {
			margin: 50px auto 10px;
			@include wh(206px);
			display: block;
		}
	}
	.good-price {
		margin: 15px 0;
		height: 30px;
		text-align: center;
		line-height: 30px;
		color: #d44d44;
		font-family: Arial;
		font-size: 18px;
		font-weight: 700;
	}
	.good-title {
		line-height: 1.2;
		font-size: 16px;
		color: #424242;
		margin: 0 auto;
		padding: 0 14px;
		text-align: center;
		overflow: hidden;
	}
	h3 {
		text-align: center;
		line-height: 1.2;
		font-size: 12px;
		color: #d0d0d0;
		padding: 10px;
	}
}
</style>
