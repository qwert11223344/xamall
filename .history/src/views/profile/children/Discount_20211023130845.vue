<template>
	<div class="discount">
		<w-shelf title="我的优惠">
			<template #content>
				<div class="dis_nav">
					<a
						href="javascript:;"
						@click="sortPrice(1)"
						:class="{ active: sortType === 1 }"
						>价格从低到高</a
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

<style>
</style>