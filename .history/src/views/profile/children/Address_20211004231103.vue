<template>
	<div>123</div>
</template>
<script>
// import {
// 	getAddressList,
// 	addAddress,
// 	updateAddress,
// 	delAddress,
// } from "api/user.js";
// import WButton from "components/content/WButton.vue";
// import Popup from "components/content/popup/Popup.vue";
// import WShelf from "components/content/shelf/Shelf.vue";
// export default {
// 	data() {
// 		return {
// 			addList: [],
// 			popupOpen: false,
// 			popupTitle: "管理收货地址",
// 			msg: {
// 				addressId: "",
// 				userName: "",
// 				tel: "",
// 				streetName: "",
// 				isDefault: false,
// 			},
// 			userId: "",
// 		};
// 	},
// 	components: {
// 		WButton,
// 		Popup,
// 		WShelf,
// 	},
// 	computed: {
// 		btnHighlight() {
// 			let msg = this.msg;
// 			return msg.userName && msg.tel && msg.streetName;
// 		},
// 	},
// 	methods: {
// 		message(m) {
// 			this.$message.error({
// 				message: m,
// 			});
// 		},
// 		_getAddressList() {
// 			getAddressList(this.userId).then((res) => {
// 				console.log(res);
// 			});
// 		},
// 		_addressList() {
// 			addressList({ userId: this.userId }).then((res) => {
// 				let data = res.result;
// 				if (data.length) {
// 					this.addList = res.result;
// 					this.addressId = res.result[0].addressId || "1";
// 				} else {
// 					this.addList = [];
// 				}
// 			});
// 		},
// 		_addressUpdate(params) {
// 			addressUpdate(params).then((res) => {
// 				this._addressList();
// 			});
// 		},
// 		_addressAdd(params) {
// 			addressAdd(params).then((res) => {
// 				if (res.success === true) {
// 					this._addressList();
// 				} else {
// 					this.message(res.message);
// 				}
// 			});
// 		},
// 		changeDef(item) {
// 			if (!item.isDefault) {
// 				item.isDefault = true;
// 				this._addressUpdate(item);
// 			}
// 			return false;
// 		},
// 		// 保存
// 		save(p) {
// 			this.popupOpen = false;
// 			if (p.addressId) {
// 				this._addressUpdate(p);
// 			} else {
// 				delete p.addressId;
// 				this._addressAdd(p);
// 			}
// 		},
// 		// 删除
// 		del(addressId, i) {
// 			addressDel({ addressId: addressId }).then((res) => {
// 				if (res.success === true) {
// 					this.addList.splice(i, 1);
// 				} else {
// 					this.message("删除失败");
// 				}
// 			});
// 		},
// 		// 修改
// 		update(item) {
// 			this.popupOpen = true;
// 			if (item) {
// 				this.popupTitle = "管理收货地址";
// 				this.msg.userName = item.userName;
// 				this.msg.tel = item.tel;
// 				this.msg.streetName = item.streetName;
// 				this.msg.isDefault = item.isDefault;
// 				this.msg.addressId = item.addressId;
// 			} else {
// 				this.popupTitle = "新增收货地址";
// 				this.msg.userName = "";
// 				this.msg.tel = "";
// 				this.msg.streetName = "";
// 				this.msg.isDefault = false;
// 				this.msg.addressId = "";
// 			}
// 		},
// 	},
// 	created() {
// 		this.userId = this.$store.state.userInfo.id;
// 		this._getAddressList();
// 	},
// };
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
	height: 115px;
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
			/*display: none;*/
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
			height: 50px;
			font-size: 18px;
			padding: 10px 20px;
			border: 1px solid #ccc;
			border-radius: 6px;
			box-shadow: 0 3px 5px -4px rgba(0, 0, 0, 0.4) inset,
				-1px 0 3px -2px rgba(0, 0, 0, 0.1) inset;
			line-height: 46px;
		}
	}
}

.btn {
	margin: 0;
	width: 100%;
	height: 50px;
	font-size: 14px;
	line-height: 48px;
}
</style>
