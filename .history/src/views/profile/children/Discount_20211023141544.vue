<template>
	<div class="discount">
		<w-shelf title="我的优惠">
			<template #content>
				<div class="dis_nav">
					<a
						href="javascript:;"
						@click="sort(0)"
						:class="{ active: currentIndex === 0 }"
						>未使用(0)</a
					>
					<a
						href="javascript:;"
						@click="sort(1)"
						:class="{ active: currentIndex === 1 }"
						>已使用(0)</a
					>
					<a
						href="javascript:;"
						@click="sort(2)"
						:class="{ active: currentIndex === 2 }"
						>已失效(0)</a
					>

					<a
						href="javascript:;"
						@click="sort(3)"
						:class="{ active: currentIndex === 3 }"
						>全部优惠券</a
					>
				</div>
				<el-empty
					image="http://localhost:3333/no-data.png"
					description="您暂时还没有优惠哦~"
				>
					<el-button type="text">返回首页</el-button>
				</el-empty>
			</template>
		</w-shelf>
	</div>
</template>

<script>
import WShelf from "components/content/shelf/Shelf.vue";

export default {
	data() {
		return {
			currentIndex: 0,
		};
	},
	components: {
		WShelf,
	},
	methods: {
		sort(num) {
			this.currentIndex = num;
		},
	},
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "assets/style/mixin.scss";

.dis_nav {
	height: 40px;
	background-color: #f3f3f3;
	display: flex;
	align-items: center;
	a {
		padding: 0 15px;
		height: 100%;
		@extend %block-center;
		font-size: 12px;
		color: #999;
		&.active {
			color: #5683ea;
		}
		&:hover {
			color: #5683ea;
		}
		&:nth-child(3) {
			margin-right: auto;
		}
	}
}
</style>