<template>
	<w-shelf title="账户资料">
		<template #content>
			<div>
				<div :class="{ mask: loading }">
					<div class="avatar-box">
						<div class="img-box"><img :src="userInfo.file" alt="" /></div>
						<div class="r-box">
							<h3>头像</h3>
						</div>
						<el-button
							type="primary"
							@click="showUploadAvatar = true"
							round
							size="mini"
							>上传头像</el-button
						>
					</div>
					<div class="avatar-box">
						<div class="img-box">
							<i
								class="iconfont"
								v-html="userInfo.username ? icon.success : icon.warn"
							></i>
						</div>
						<div class="r-box">
							<h3>账户昵称</h3>
							<p>{{ userInfo.username || "未设置" }}</p>
						</div>
						<el-button type="text" @click="currentClick(0)">修改</el-button>
					</div>
					<div class="avatar-box">
						<div class="img-box">
							<i
								class="iconfont"
								v-html="userInfo.phone ? icon.success : icon.warn"
							></i>
						</div>
						<div class="r-box">
							<h3>手机验证</h3>
							<p>{{ userInfo.phone | hidePhone }}</p>
						</div>
						<el-button type="text" @click="currentClick(1)">修改</el-button>
					</div>
					<div class="avatar-box">
						<div class="img-box">
							<i class="iconfont" v-html="userInfo ? icon.success : icon.warn"
								>&#xe607;</i
							>
						</div>
						<div class="r-box">
							<h3>登录密码</h3>
							<p>互联网账号存在被盗风险，建议您定期更改密码以保护账户安全。</p>
						</div>
						<el-button type="text" @click="currentClick(2)">修改</el-button>
					</div>
					<div class="avatar-box">
						<div class="img-box">
							<i
								class="iconfont"
								v-html="userInfo.email ? icon.success : icon.warn"
								>&#xe607;</i
							>
						</div>
						<div class="r-box">
							<h3>绑定邮箱</h3>
							<p>{{ userInfo.email || "绑定邮箱后，可用邮箱登录。" }}</p>
						</div>
						<el-button
							type="text"
							v-html="userInfo.email ? '修改' : '现在绑定'"
							@click="currentClick(3)"
						></el-button>
					</div>
				</div>
				<div class="upload_avatar update_info" v-show="showUploadAvatar">
					<w-shelf title="上传头像">
						<template #content>
							<el-upload
								action="#"
								list-type="picture-card"
								:auto-upload="false"
								style="margin: 20px 20px 0 20px"
							>
								<i slot="default" class="el-icon-plus"></i>
								<div slot="file" slot-scope="{ file }">
									<img
										class="el-upload-list__item-thumbnail"
										:src="file.url"
										alt=""
									/>
									<span class="el-upload-list__item-actions">
										<span
											class="el-upload-list__item-preview"
											@click="handlePictureCardPreview(file)"
										>
											<i class="el-icon-zoom-in"></i>
										</span>
										<span
											v-if="!disabled"
											class="el-upload-list__item-delete"
											@click="handleDownload(file)"
										>
											<i class="el-icon-download"></i>
										</span>
										<span
											v-if="!disabled"
											class="el-upload-list__item-delete"
											@click="handleRemove(file)"
										>
											<i class="el-icon-delete"></i>
										</span>
									</span>
								</div>
							</el-upload>
							<el-dialog
								:visible.sync="dialogVisible"
								style="width: 200px; height: 200px"
							>
								<img width="100%" :src="dialogImageUrl" alt="" />
							</el-dialog>
							<div class="btn">
								<el-button type="primary" plain>提交</el-button>
								<el-button type="info" plain @click="showUploadAvatar = false"
									>返回</el-button
								>
							</div>
						</template>
					</w-shelf>
				</div>
				<div class="update_info" v-show="showUpdateInfo">
					<w-shelf :title="title">
						<template #content>
							<div class="content">
								<el-form
									:model="ruleForm"
									status-icon
									:rules="rules"
									ref="ruleForm"
									label-width="70px"
								>
									<li v-if="currentIndex === 0">
										<el-form-item label="用户名" prop="userName">
											<el-input
												type="text"
												v-model="ruleForm.userName"
											></el-input>
										</el-form-item>
									</li>
									<li v-if="currentIndex === 1">
										<el-form-item label="手机号" prop="phone">
											<el-input type="text" v-model="ruleForm.phone"></el-input>
										</el-form-item>
									</li>
									<li v-if="currentIndex === 2">
										<el-form-item label="旧密码" prop="oldPass">
											<el-input
												type="password"
												v-model="ruleForm.oldPass"
											></el-input>
										</el-form-item>
									</li>
									<li v-if="currentIndex === 2">
										<el-form-item label="新密码" prop="newPass">
											<el-input
												type="password"
												v-model="ruleForm.newPass"
											></el-input>
										</el-form-item>
									</li>
									<li v-if="currentIndex === 2">
										<el-form-item label="确认密码" prop="checkPass">
											<el-input
												type="password"
												v-model="ruleForm.checkPass"
											></el-input>
										</el-form-item>
									</li>
									<li v-if="currentIndex === 3">
										<el-form-item label="邮箱" prop="email">
											<el-input type="text" v-model="ruleForm.email"></el-input>
										</el-form-item>
									</li>
									<li>
										<el-button
											type="primary"
											plain
											:disabled="!checkForm"
											@click="_updateUserOne"
											>提交</el-button
										>
										<el-button type="info" plain @click="closeInfo"
											>返回</el-button
										>
									</li>
								</el-form>
							</div>
						</template>
					</w-shelf>
				</div>
			</div>
		</template>
	</w-shelf>
</template>

<script>
import WShelf from "components/content/shelf/Shelf.vue";
import { mapState } from "vuex";
import { UPDATE_USERINFO } from "store/mutation-types.js";
import { messageMixin, setPublicKeyMixin } from "common/mixin/mixin.js";
import { checkRegister, updateUserOne, updatePass } from "api/user.js";
import { _encrypt } from "until/jsencrypt.js";

export default {
	data() {
		let checkUserName = (rule, value, callback) => {
			if (!value) {
				this.checkForm = false;
				return callback(new Error("用户名不能为空"));
			} else {
				//发起请求验证用户名是否重复
				checkRegister({ userName: value }).then((res) => {
					if (res.success === false) {
						this.checkForm = false;
						return callback(new Error(res.message));
					} else {
						callback();
						this.checkForm = true;
					}
				});
			}
		};
		let validateOldPass = (rule, value, callback) => {
			if (value === "") {
				this.checkForm = false;
				callback(new Error("请输入密码"));
			}
			callback();
		};
		let validatePass = (rule, value, callback) => {
			if (value === "") {
				this.checkForm = false;
				callback(new Error("请输入密码"));
			} else if (!/^[a-zA-Z]\w{5,9}$/.test(value)) {
				this.checkForm = false;
				callback(new Error("字母开头,6~10位,含字母数字或下划线"));
			} else {
				if (this.ruleForm.checkPass !== "") {
					this.$refs.ruleForm.validateField("checkPass");
				}
				callback();
			}
		};
		let validatePass2 = (rule, value, callback) => {
			if (value === "") {
				callback(new Error("请再次输入密码"));
			} else if (value !== this.ruleForm.newPass) {
				this.checkForm = false;
				callback(new Error("两次输入密码不一致!"));
			} else {
				callback();
				this.checkForm = true;
			}
		};
		let validateTel = (rule, value, callback) => {
			if (value === "") {
				this.checkForm = false;
				callback(new Error("请输入手机号"));
			} else if (!/^[1][3,4,5,7,8,9][0-9]{9}$/.test(value)) {
				callback(new Error("请输入正确的手机号"));
			} else {
				this.checkForm = true;
				callback();
			}
		};
		let validateEmail = (rule, value, callback) => {
			if (value === "") {
				this.checkForm = false;
				callback(new Error("请输入邮箱地址"));
			} else if (
				!/^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/.test(value)
			) {
				callback(new Error("请输入正确的邮箱格式"));
			} else {
				this.checkForm = true;
				callback();
			}
		};
		return {
			loading: false, //蒙版
			title: "",
			ruleForm: {
				// 表单数据
				userName: "",
				oldPass: "",
				newPass: "",
				checkPass: "",
				phone: "",
				email: "",
			},
			rules: {
				// 验证表单字段
				userName: [{ validator: checkUserName, trigger: "change" }],
				oldPass: [{ validator: validateOldPass, trigger: "blur" }],
				newPass: [{ validator: validatePass, trigger: "blur" }],
				checkPass: [{ validator: validatePass2, trigger: "change" }],
				phone: [{ validator: validateTel, trigger: "change" }],
				email: [{ validator: validateEmail, trigger: "change" }],
			},
			checkForm: false, //禁用提交按钮
			showUpdateInfo: false, //显示修改信息
			showUploadAvatar: false, // 显示上传头像
			icon: {
				success: "&#xe8c3;",
				warn: "&#xe607;",
			},
			titles: ["账户昵称", "手机验证", "修改密码", "绑定邮箱"],
			currentIndex: 0,
			dialogImageUrl: "", //上传头像
			dialogVisible: false,
			disabled: false,
		};
	},
	computed: {
		...mapState(["userInfo"]),
	},
	filters: {
		hidePhone(tel) {
			return tel.substr(0, 3) + "****" + tel.substr(7);
		},
	},
	mixins: [messageMixin, setPublicKeyMixin],
	components: {
		WShelf,
	},
	methods: {
		//关闭修改信息框
		closeInfo() {
			this.showUpdateInfo = false;
			this.loading = false;
		},
		// 修改用户信息
		currentClick(num) {
			this.loading = true;
			this.$refs.ruleForm.resetFields();
			this.checkForm = false;
			this.title = this.titles[num];
			this.currentIndex = num;
			this.showUpdateInfo = true;
		},
		_updateUserOne() {
			let params = {};
			switch (this.currentIndex) {
				case 0: {
					params.column = "username";
					params.value = this.ruleForm.userName;
					break;
				}
				case 1: {
					params.column = "phone";
					params.value = this.ruleForm.phone;
					break;
				}
				case 2: {
					params.column = "password";
					let oldPass = _encrypt(this.ruleForm.oldPass);
					let newPass = _encrypt(this.ruleForm.newPass);
					params.value = {
						userName: this.userInfo.username,
						oldPass,
						newPass,
					};
					break;
				}
				case 3: {
					params.column = "email";
					params.value = this.ruleForm.email;
					break;
				}
			}
			params.userId = this.userInfo.id;
			if (this.currentIndex === 2) {
				// 修改密码
				updatePass(params).then((res) => {
					if (res.success === true) {
						this.message(res.message, "success");
					} else {
						this.message(res.message, "error");
					}
				});
			} else {
				// 修改其他信息
				updateUserOne(params).then((res) => {
					if (res.success === true) {
						this.message(res.message, "success");

						this.$store.commit(UPDATE_USERINFO, params);
						//将最新的信息保存在缓存中
						window.localStorage.setItem("user", JSON.stringify(this.userInfo));
					} else {
						this.message(res.message, "error");
					}
				});
			}
			this.closeInfo();
		},
		// 上传头像
		handleRemove(file) {
			console.log(file);
		},
		handlePictureCardPreview(file) {
			this.dialogImageUrl = file.url;
			this.dialogVisible = true;
		},
		handleDownload(file) {
			console.log(file);
		},
	},
};
</script>

<style lang="scss" scoped>
@import "assets/style/mixin.scss";
.mask {
	background-color: rgba($color: #000000, $alpha: 0.8);
	filter: blur(80px);
}
.avatar-box {
	height: 124px;
	display: flex;
	margin: 0 30px;
	padding: 0 10px 0 0;
	border-bottom: #dadada solid 1px;
	align-items: center;
	display: flex;
	.img-box {
		@include wh(80px);
		border-radius: 5px;
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	img {
		display: block;
		@include wh(100%);
	}
	.r-box {
		height: 80px;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		margin: 0 auto 0 20px;
		h3 {
			font-size: 18px;
			font-weight: 400;
			color: #333;
		}
		p {
			font-size: 16px;
			color: #999;
		}
	}
	.iconfont {
		font-size: 25px;
	}
}
.avatar-box:last-child {
	border-bottom: none;
}
.update_info {
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	width: 500px;
	z-index: 999;
	.content {
		width: 100%;
		box-sizing: border-box;
		padding: 20px 0 0 0;
		li {
			height: 60px;
			width: 100%;
			padding: 10px 0;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
}
.upload_avatar {
	width: 350px;
	.btn {
		width: 100%;
		text-align: center;
		margin: 30px 0 10px 0;
	}
}
</style>