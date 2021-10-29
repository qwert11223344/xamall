<template>
	<popup :open="popupOpen" @close="popupOpen = false" :title="popupTitle">
		<template #content>
			<el-form :model="msg" status-icon :rules="rules">
				<div class="md">
					<div>
						<el-form-item prop="nickName">
							<el-input
								v-model.lazy="msg.nickName"
								clearable
								maxlength="10"
								show-word-limit
								placeholder="收货人姓名"
							/>
						</el-form-item>
					</div>
					<div>
						<el-form-item prop="tel">
							<el-input
								v-model.lazy="msg.tel"
								clearable
								placeholder="手机号码"
							/>
						</el-form-item>
					</div>
					<div>
						<el-select
							v-model="msg.province"
							placeholder="请选择省份"
							@change="currentProvince"
							style="width: 100%"
						>
							<el-option
								v-for="(item, index) in province"
								:key="index"
								:value="item.name"
							/>
						</el-select>
					</div>
					<div class="selectCity">
						<el-select
							v-model="msg.downtown_area"
							placeholder="请选择城市"
							@change="currentCity"
							style="width: 48%"
						>
							<el-option
								v-for="(item, index) in downtown_area"
								:key="index"
								:value="item.name"
							/>
						</el-select>
						<el-select
							v-model="msg.county"
							placeholder="请选择区县"
							style="width: 48%"
						>
							<el-option
								v-for="(item, index) in county"
								:key="index"
								:value="item.name"
							/>
						</el-select>
					</div>
					<div>
						<el-form-item prop="streetName">
							<el-input
								v-model.lazy="msg.streetName"
								clearable
								maxlength="20"
								show-word-limit
								placeholder="详细地址"
							/>
						</el-form-item>
					</div>
					<div>
						<!-- <el-checkbox v-model="msg.isDefault">设为默认</el-checkbox> -->
					</div>
					<div class="button_wrap">
						<el-button
							type="primary"
							plain
							style="width: 120px"
							:disabled="!msgIsEmity"
							@click="save"
							>保存</el-button
						>
						<el-button
							type="info"
							plain
							style="width: 120px"
							@click="popupOpen = false"
							>取消</el-button
						>
					</div>
				</div>
			</el-form>
		</template>
	</popup>
</template>

<script>
import Popup from "components/content/popup/Popup.vue";
export default {
	data() {
		return {};
	},
	components: {
		Popup,
	},
};
</script>

<style>
</style>