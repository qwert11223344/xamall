<template>
	<div>
		<w-header>
			<div slot="nav"></div>
		</w-header>
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
