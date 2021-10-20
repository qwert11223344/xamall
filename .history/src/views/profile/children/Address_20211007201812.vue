<template>
	<div>
		<w-shelf title="收货地址">
			<span slot="right"
				><w-button
					text="添加收货地址"
					style="margin: 0"
					@btnClick="update()"
				></w-button
			></span>
			<template #content>
				<div>
					<!--标题-->
					<div class="table-title">
						<span class="name">姓名</span> <span class="address">详细地址</span>
						<span class="tel">电话</span>
					</div>
					<div v-if="addList.length" class="all_address">
						<div
							class="address-item"
							v-for="(item, i) in addList"
							:key="i"
							:class="{ 'defalut-address': item.is_default }"
						>
							<div class="name">{{ item.nick_name }}</div>
							<div class="address-msg">
								<span>{{ item.province }}</span>
								<span>{{ item.downtown_area }}</span>
								<span>{{ item.county }}</span>
								<span>{{ item.street }}</span>
							</div>
							<div class="telephone">{{ item.tel }}</div>
							<div class="defalut">
								<a
									@click="changeDef(item)"
									href="javascript:;"
									v-text="item.is_default ? '( 默认地址 )' : '设为默认'"
								></a>
							</div>
							<div class="operation">
								<el-button
									type="primary"
									icon="el-icon-edit"
									size="small"
									@click="update(item)"
								></el-button>
								<el-button
									type="danger"
									icon="el-icon-delete"
									size="small"
									@click="_delAddress(item.address_id)"
								></el-button>
							</div>
						</div>
					</div>
					<div v-else>
						<div style="padding: 80px 0; text-align: center">
							<div style="font-size: 20px">你还未添加收货地址</div>
							<div style="margin: 20px">
								<w-button text="添加地址" @btnClick="update()"></w-button>
							</div>
						</div>
					</div>
				</div>
			</template>
		</w-shelf>
		<popup :open="popupOpen" @close="popupOpen = false" :title="popupTitle">
			<template #content>
				<div class="md">
					<div>
						<el-input
							v-model="msg.nickName"
							clearable
							placeholder="收货人姓名"
						/>
					</div>
					<div>
						<el-input v-model="msg.tel" clearable placeholder="手机号码" />
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
						<el-input
							v-model="msg.streetName"
							clearable
							placeholder="详细地址"
						/>
					</div>
					<div>
						<el-checkbox v-model="msg.isDefault">设为默认</el-checkbox>
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
			</template>
		</popup>
	</div>
</template>
<script>
import {
	getAddressList,
	addAddress,
	updateAddress,
	delAddress,
	changeDef,
} from "api/user.js";
import { getRegion } from "api/thirdParty.js";
import WButton from "components/content/WButton.vue";
import Popup from "components/content/popup/Popup.vue";
import WShelf from "components/content/shelf/Shelf.vue";
export default {
	data() {
		return {
			addList: [],
			currentAddressId: "",
			popupOpen: false,
			popupTitle: "管理收货地址",
			msg: {
				nickName: "",
				province: "",
				downtown_area: "",
				county: "",
				tel: "",
				streetName: "",
				isDefault: false,
			},
			userId: "",
			province: [],
			downtown_area: [],
			county: [],
		};
	},
	components: {
		Popup,
		WShelf,
		WButton,
	},
	computed: {
		msgIsEmity() {
			// return Object.keys(this.msg).some((v) => this.msg[v] === "");
			return (
				this.msg.nickName != "" &&
				this.msg.province != "" &&
				this.msg.downtown_area != "" &&
				this.msg.county != "" &&
				this.msg.streetName != "" &&
				this.msg.tel != ""
			);
		},
	},
	methods: {
		//弹出错误信息
		message(message, type) {
			this.$message({
				message,
				type,
			});
		},
		// 获取地址列表
		_getAddressList() {
			getAddressList({ userId: this.userId }).then((res) => {
				if (res.success === true) {
					this.addList = res.data;
				}
			});
		},
		//获取所有的省份
		_getRegion() {
			getRegion(100000).then((res) => {
				if (res.status == 1) {
					this.province = res.districts[0].districts;
				}
			});
		},
		// 获取当前省份的子城市
		currentProvince(item) {
			getRegion(item).then((res) => {
				if (res.status == 1) {
					this.downtown_area = res.districts[0].districts;
				}
			});
		},
		// 获取当前城市的子县区
		currentCity(item) {
			getRegion(item).then((res) => {
				if (res.status == 1) {
					this.county = res.districts[0].districts;
				}
			});
		},
		//修改收货地址
		_updateAddress() {
			let params = {
				addressId: this.currentAddressId,
				nickName: this.msg.nickName,
				tel: this.msg.tel,
				province: this.msg.province,
				downtownArea: this.msg.downtown_area,
				county: this.msg.county,
				street: this.msg.streetName,
				isDefault: this.msg.isDefault ? 1 : 0,
			};
			updateAddress(params).then((res) => {
				if (res.success === true) {
					this.message(res.message, "success");
					this._getAddressList();
				} else {
					this.message(res.message, "error");
				}
			});
		},
		// 添加收获地址
		_addressAdd() {
			let params = {
				userId: this.userId,
				nickName: this.msg.nickName,
				tel: this.msg.tel,
				province: this.msg.province,
				downtownArea: this.msg.downtown_area,
				county: this.msg.county,
				street: this.msg.streetName,
				isDefault: this.msg.isDefault ? 1 : 0,
			};
			addAddress(params).then((res) => {
				if (res.success === true) {
					this.message(res.message, "success");
					this._getAddressList();
				} else {
					this.message(res.message, "error");
				}
			});
		},
		changeDef(item) {
			if (!item.is_default) {
				item.is_default = true;
				this._updateAddress(item);
			}
			return false;
		},
		// 保存
		save() {
			this.popupOpen = false;
			if (this.currentAddressId === "") {
				this._addressAdd();
			} else {
				this._updateAddress();
			}
		},
		// 删除收货地址
		_delAddress(addressId) {
			delAddress({ addressId }).then((res) => {
				if (res.success === true) {
					this.message(res.message, "success");
					this._getAddressList();
				} else {
					this.message(res.message, "error");
				}
			});
		},
		// 修改
		update(item) {
			this.popupOpen = true;
			this.currentAddressId = "";
			if (item) {
				this.currentAddressId = item.address_id;
				this.popupTitle = "管理收货地址";
				this.msg.nickName = item.nick_name;
				this.msg.tel = item.tel;
				this.msg.province = item.province;
				this.msg.downtown_area = item.downtown_area;
				this.msg.county = item.county;
				this.msg.streetName = item.street;
				this.msg.isDefault = item.is_default;
			} else {
				this.popupTitle = "新增收货地址";
				this.msg.nickName = "";
				this.msg.tel = "";
				this.msg.province = "";
				this.msg.downtown_area = "";
				this.msg.county = "";
				this.msg.streetName = "";
				this.msg.isDefault = false;
			}
		},
	},
	created() {
		this.userId = this.$store.state.userInfo.id;
		this._getAddressList();
		this._getRegion();
	},
};
</script>
<style scoped lang="scss">
.table-title {
	position: relative;
	z-index: 1;
	line-height: 38px;
	height: 38px;
	padding: 0 0 0 38px;
	font-size: 12px;
	background: #eee;
	border-bottom: 1px solid #dbdbdb;
	border-bottom-color: rgba(0, 0, 0, 0.08);
	.name {
		float: left;
		text-align: left;
	}
	span {
		width: 137px;
		float: left;
		text-align: center;
		color: #838383;
	}
	.address {
		margin-left: 115px;
	}
	.tel {
		margin-left: 195px;
	}
}
.all_address {
	display: flex;
	flex-direction: column;
}
.address-item {
	display: flex;
	align-items: center;
	height: 85px;
	text-align: center;
	.name {
		width: 106px;
	}
	.address-msg {
		flex: 1;
	}
	.telephone {
		width: 160px;
	}
	.defalut {
		width: 80px;
		> a {
			text-align: center;
			font-size: 12px;
		}
	}
	.operation {
		width: 135px;
		a {
			padding: 10px 5px;
		}
	}
}

.address-item {
	border-top: 1px solid #cfcfcf;
}

.defalut-address {
	order: -1;
	border-top: none;
	pointer-events: none;
	cursor: default;
	a {
		color: #626262;
	}
}

.md {
	> div {
		text-align: left;
		margin-bottom: 15px;
		> input {
			width: 100%;
			height: 30px;
			font-size: 14px;
			padding: 0 20px;
			border: 1px solid #ccc;
			border-radius: 6px;
			box-shadow: 0 3px 5px -4px rgba(0, 0, 0, 0.4) inset,
				-1px 0 3px -2px rgba(0, 0, 0, 0.1) inset;
			line-height: 46px;
		}
	}
	.selectCity {
		display: flex;
		justify-content: space-between;
	}
	.button_wrap {
		display: flex;
		justify-content: space-around;
		.btn {
			width: 40%;
			height: 50px;
			font-size: 14px;
			display: inline-flex;
			align-items: center;
			justify-content: center;
		}
	}
}
</style>
