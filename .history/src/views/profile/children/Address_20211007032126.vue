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
					<div v-if="addList.length">
						<div class="address-item" v-for="(item, i) in addList" :key="i">
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
									v-text="item.isDefault ? '( 默认地址 )' : '设为默认'"
									:class="{ 'defalut-address': item.isDefault }"
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
									:data-id="item.addressId"
									@click="del(item.addressId, i)"
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
							<el-option v-for="item in province" :value="item.name" />
						</el-select>
					</div>
					<div class="selectCity">
						<el-select
							v-model="msg.downtown_area"
							placeholder="请选择城市"
							@change="currentCity"
							style="width: 48%"
						>
							<el-option v-for="item in downtown_area" :value="item.name" />
						</el-select>
						<el-select
							v-model="msg.county"
							placeholder="请选择区县"
							style="width: 48%"
						>
							<el-option v-for="item in county" :value="item.name" />
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
						<!-- <w-button
							text="保存"
							class="btn"
							:classStyle="btnHighlight ? 'main-btn' : 'disabled-btn'"
							@btnClick="
								save({
									userId: userId,
									addressId: msg.addressId,
									userName: msg.userName,
									tel: msg.tel,
									streetName: msg.streetName,
									isDefault: msg.isDefault,
								})
							"
						/>
						<w-button text="取消" class="btn" @btnClick="popupOpen = false" /> -->
						<el-button
							type="primary"
							plain
							style="width: 120px"
							:disabled="msgIsEmity"
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
} from "api/user.js";
import { getRegion } from "api/thirdParty.js";
import Popup from "components/content/popup/Popup.vue";
import WShelf from "components/content/shelf/Shelf.vue";
export default {
	data() {
		return {
			addList: [],
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
	},
	computed: {
		btnHighlight() {
			let msg = this.msg;
			return msg.userName && msg.tel && msg.streetName;
		},
		msgIsEmity() {
			let arr = Object.keys(this.msg).filter((v) => !this.msg[v]);
			if (arr.length <= 0) {
			}
		},
	},
	methods: {
		message(m) {
			this.$message.error({
				message: m,
			});
		},
		_getAddressList() {
			getAddressList({ userId: this.userId }).then((res) => {
				if (res.success === true) {
					this.addList = res.data;
				}
			});
		},
		_getRegion() {
			getRegion(100000).then((res) => {
				if (res.status == 1) {
					this.province = res.districts[0].districts;
				}
			});
		},
		currentProvince(item) {
			getRegion(item).then((res) => {
				if (res.status == 1) {
					this.downtown_area = res.districts[0].districts;
				}
			});
		},
		currentCity(item) {
			getRegion(item).then((res) => {
				if (res.status == 1) {
					this.county = res.districts[0].districts;
				}
			});
		},
		_addressList() {
			addressList({ userId: this.userId }).then((res) => {
				let data = res.result;
				if (data.length) {
					this.addList = res.result;
					this.addressId = res.result[0].addressId || "1";
				} else {
					this.addList = [];
				}
			});
		},
		_addressUpdate(params) {
			addressUpdate(params).then((res) => {
				this._addressList();
			});
		},
		_addressAdd(params) {
			addressAdd(params).then((res) => {
				if (res.success === true) {
					this._addressList();
				} else {
					this.message(res.message);
				}
			});
		},
		changeDef(item) {
			if (!item.isDefault) {
				item.isDefault = true;
				this._addressUpdate(item);
			}
			return false;
		},
		// 保存
		save(p) {
			this.popupOpen = false;
			if (p.addressId) {
				this._addressUpdate(p);
			} else {
				delete p.addressId;
				this._addressAdd(p);
			}
		},
		// 删除
		del(addressId, i) {
			addressDel({ addressId: addressId }).then((res) => {
				if (res.success === true) {
					this.addList.splice(i, 1);
				} else {
					this.message("删除失败");
				}
			});
		},
		// 修改
		update(item) {
			this.popupOpen = true;
			if (item) {
				this.popupTitle = "管理收货地址";
				this.msg.userName = item.userName;
				this.msg.tel = item.tel;
				this.msg.streetName = item.streetName;
				this.msg.isDefault = item.isDefault;
				this.msg.addressId = item.addressId;
			} else {
				this.popupTitle = "新增收货地址";
				this.msg.userName = "";
				this.msg.tel = "";
				this.msg.streetName = "";
				this.msg.isDefault = false;
				this.msg.addressId = "";
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
			display: none;
		}
	}
	.operation {
		width: 135px;
		a {
			padding: 10px 5px;
		}
	}
	&:hover {
		.defalut > a {
			display: block;
		}
	}
}

.address-item + .address-item {
	border-top: 1px solid #cfcfcf;
}

.defalut-address {
	color: #626262;
	display: block;
	pointer-events: none;
	cursor: default;
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
