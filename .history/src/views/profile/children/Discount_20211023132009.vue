<template>
	<div class="discount">
		<w-shelf title="我的优惠">
			<template #content>
				<div class="dis_nav">
					<a
						href="javascript:;"
						@click="sort(1)"
						:class="{ active: sortType === 1 }"
						>未使用</a
					>
					<a
						href="javascript:;"
						@click="sort(2)"
						:class="{ active: sortType === 2 }"
						>已使用</a
					>
					<a
						href="javascript:;"
						@click="sort(3)"
						:class="{ active: sortType === 3 }"
						>已失效</a
					>
				</div>
			</template>
		</w-shelf>
	</div>
</template>

<script>
import WShelf from "components/content/shelf/Shelf.vue";

export default {
	data() {
		return {};
	},
	components: {
		WShelf,
	},
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "assets/style/mixin.scss";

.dis_nav {
	height: 40px;
	background-color: #f3f3f3;
	display: flex;
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
	}
}
</style>