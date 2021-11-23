<template>
	<div class="bg">
		<!-- <video muted autoplay loop src="~assets/img/1704-1080.mp4"></video> -->
		<div class="login v2">
			<div class="wrapper">
				<div
					class="dialog dialog-shadow"
					style="display: block; margin-top: -362px"
				>
					<div class="title">
						<h2>使用 小爱商城 账号 登录官网</h2>
					</div>
					<div v-if="loginPage" class="content">
						<ul class="common-form">
							<li class="username border-1p">
								<div class="input">
									<input
										type="text"
										v-model="ruleForm.userName"
										placeholder="账号"
									/>
								</div>
							</li>
							<li>
								<div class="input">
									<input
										type="password"
										v-model="ruleForm.userPwd"
										@keyup.enter="login"
										placeholder="密码"
									/>
								</div>
							</li>
							<li><vapt-cha @sendToken="sendToken" /></li>
							<li style="text-align: right" class="pr">
								<el-checkbox class="auto-login" v-model="autoLogin"
									>记住密码</el-checkbox
								>
								<!-- <span class="pa" style="top: 0;left: 0;color: #d44d44">{{ruleForm.errMsg}}</span> -->
								<a href="javascript:;" class="register" @click="toRegister"
									>注册账号</a
								>
								<a style="padding: 1px 0 0 10px" @click="showFindPass = true"
									>忘记密码</a
								>
							</li>
						</ul>

						<!--登陆-->
						<div style="margin-top: 25px">
							<w-button
								:text="logintxt"
								:classStyle="
									ruleForm.userPwd && ruleForm.userName && logintxt === '登录'
										? 'main-btn'
										: 'disabled-btn'
								"
								@btnClick="login"
								style="
									margin: 0;
									width: 100%;
									height: 48px;
									font-size: 18px;
									line-height: 48px;
								"
							></w-button>
						</div>
						<!--返回-->
						<div>
							<w-button
								text="返回"
								@btnClick="login_back"
								style="
									margin-top: 10px;
									margin-bottom: 15px;
									width: 100%;
									height: 48px;
									font-size: 18px;
									line-height: 48px;
								"
							>
							</w-button>
						</div>
						<div class="border"></div>
						<div class="footer">
							<div class="other">其它账号登录：</div>
							<a
								><img
									@click="open('待开发', '此功能开发中...')"
									style="height: 15px; margin-top: 22px"
									src="~assets/img/other-login.png"
							/></a>
						</div>
					</div>
				</div>
			</div>
		</div>
		<el-dialog title="忘记密码" :visible.sync="showFindPass" width="20%">
			<el-form :model="findForm" status-icon :rules="rules" ref="findForm">
				<el-form-item prop="uname">
					<el-input
						type="text"
						v-model="findForm.uname"
						placeholder="请输入用户名"
					></el-input>
				</el-form-item>
				<el-form-item prop="findemail">
					<el-input
						type="text"
						v-model="findForm.findemail"
						placeholder="请输入邮箱地址"
					></el-input>
				</el-form-item>
				<li class="verification">
					<el-input
						type="text"
						v-model="verCode"
						placeholder="验证码"
						style="width: 150px"
					/>
					<el-button @click="_findPass" :disabled="!checkForm">{{
						findPassText
					}}</el-button>
				</li>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="closeFindPass">取 消</el-button>
				<el-button type="primary" @click="_checkVerCode">确 定</el-button>
			</span>
		</el-dialog>

		<el-dialog
			title="修改密码"
			:visible.sync="showUpdatePass"
			width="20%"
			:before-close="handleClose"
		>
			<el-form
				:model="updateForm"
				status-icon
				:rules="updateRules"
				ref="updateForm"
			>
				<el-form-item prop="pass">
					<el-input
						type="password"
						v-model="updateForm.pass"
						placeholder="请输入密码"
						:show-password="true"
					></el-input>
				</el-form-item>
				<el-form-item prop="checkPass">
					<el-input
						type="password"
						v-model="updateForm.checkPass"
						placeholder="请确认密码"
						:show-password="true"
					></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="showUpdatePass = false">取 消</el-button>
				<el-button type="primary" @click="_updatePass">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import { userLogin, findPass, checkVerCode, editPass } from "api/user.js";

import WButton from "components/content/WButton.vue";
import VaptCha from "components/common/vaptcha/VaptCha.vue";

import { RECORD_USERINFO } from "store/mutation-types.js";
import { _encrypt } from "until/jsencrypt.js";
import { messageMixin, setPublicKeyMixin } from "common/mixin/mixin.js";
export default {
	data() {
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
		let validatePass = (rule, value, callback) => {
			if (value === "") {
				callback(new Error("请输入密码"));
			} else if (!/^[a-zA-Z]\w{5,9}$/.test(value)) {
				callback(new Error("字母开头,6~10位,含字母数字或下划线"));
			} else {
				if (this.updateForm.checkPass !== "") {
					this.$refs.updateForm.validateField("checkPass");
				}
				callback();
			}
		};
		let validatePass2 = (rule, value, callback) => {
			if (value === "") {
				callback(new Error("请再次输入密码"));
			} else if (value !== this.updateForm.pass) {
				callback(new Error("两次输入密码不一致!"));
			} else {
				callback();
			}
		};
		return {
			cart: [],
			loginPage: true,
			ruleForm: {
				userName: "",
				userPwd: "",
				errMsg: "",
			},
			registered: {
				userName: "",
				userPwd: "",
				userPwd2: "",
				errMsg: "",
			},
			verCode: "",
			findForm: {
				uname: "",
				findemail: "",
			},
			rules: {
				findemail: [{ validator: validateEmail, trigger: "change" }],
			},
			checkForm: false,
			autoLogin: false,
			logintxt: "登录",
			findPassText: "获取验证码",
			serverToken: null,
			showFindPass: false,
			showUpdatePass: false,
			updateForm: {
				user_name: "",
				pass: "",
				checkPass: "",
			},
			updateRules: {
				pass: [{ validator: validatePass, trigger: "blur" }],
				checkPass: [{ validator: validatePass2, trigger: "change" }],
			},
		};
	},
	mixins: [messageMixin, setPublicKeyMixin],
	components: {
		WButton,
		VaptCha,
	},
	computed: {
		encryptPwd() {
			return _encrypt(this.ruleForm.userPwd);
		},
	},
	methods: {
		open(t, m) {
			this.$notify.info({
				title: t,
				message: m,
			});
		},
		handleClose(done) {
			this.$confirm("确认关闭？")
				.then((_) => {
					done();
				})
				.catch((_) => {});
		},
		getRemembered() {
			var judge = window.localStorage.getItem("remember");
			if (judge === "true") {
				this.autoLogin = true;
				this.ruleForm.userName = window.localStorage.getItem("rusername");
				this.ruleForm.userPwd = window.localStorage.getItem("rpassword");
			}
		},
		rememberPass() {
			if (this.autoLogin === true) {
				window.localStorage.setItem("remember", "true");
				window.localStorage.setItem("rusername", this.ruleForm.userName);
				window.localStorage.setItem("rpassword", this.ruleForm.userPwd);
			} else {
				window.localStorage.setItem("remember", "false");
				window.localStorage.removeItem("rusername");
				window.localStorage.removeItem("rpassword");
			}
		},
		//找回密码
		async _findPass() {
			// this.showFindPass = false;
			this.checkForm = false;
			let num = 60;
			let timer = setInterval(() => {
				this.findPassText = `${num}秒后重试`;
				num--;
				if (num === 0) {
					clearInterval(timer);
					this.checkForm = true;
					this.findPassText = "获取验证码";
				}
			}, 1000);
			let res = await findPass(this.findForm);
			if (res.success === true) {
				this.message(res.message, "success");
			} else {
				this.message(res.message, "error");
			}
		},
		// 关闭忘记密码框
		closeFindPass() {
			this.showFindPass = false;
			this.$refs.findForm.resetFields();
			(this.verCode = ""),
				Object.keys(this.findForm).forEach((v) => (this.findForm[v] = ""));
		},
		// 验证验证码
		async _checkVerCode() {
			let params = {
				verificationCode: this.verCode,
				user_name: this.findForm.uname,
			};
			let res = await checkVerCode(params);
			if (res.success === true) {
				this.message(res.message, "success");
				this.closeFindPass();
				this.showUpdatePass = true;
			} else {
				this.message(res.message, "error");
			}
		},
		//修改密码
		_updatePass() {},
		toRegister() {
			this.$router.push({
				path: "/register",
			});
		},
		// 登录返回按钮
		login_back() {
			this.$router.go(-1);
		},
		//获取Token
		sendToken(Token) {
			this.serverToken = Token;
		},
		login() {
			this.logintxt = "登录中...";
			this.rememberPass();
			if (!this.ruleForm.userName || !this.ruleForm.userPwd) {
				this.message("账号或者密码不能为空!", "error");
				return false;
			}
			if (!this.serverToken) {
				this.message("请完成验证", "info");
				this.logintxt = "登录";
				return false;
			}

			let params = {
				userName: this.ruleForm.userName,
				userPwd: this.encryptPwd,
				// server: this.serverToken.server,
				// token: this.serverToken.token,
				// vid: this.serverToken.vid,
				// secretkey: this.serverToken.secretkey,
				// scene: this.serverToken.scene,
			};
			userLogin(params).then((res) => {
				if (res.data !== null) {
					let user = res.data[0];
					this.$store.commit(RECORD_USERINFO, user);
					localStorage.setItem("user", JSON.stringify(user));
					localStorage.setItem("token", user.token);
					this.message("登录成功", "success");
					setTimeout(() => {
						this.$router.push({
							path: this.$route.query.redirect || "/",
						});
					}, 500);
				} else {
					this.logintxt = "登录";
					this.message("用户名或密码错误", "error");
				}
			});
		},
	},
	mounted() {
		this.getRemembered();
	},
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
// @import url("https://fonts.googleapis.com/css?family=Lato:200");
* {
	box-sizing: content-box;
}
video {
	width: 100vw;
	position: absolute;
}
.verification {
	display: flex;
	justify-content: space-between;
}
.bg {
	background: url(~assets/img/background2.png);
	background-size: cover;
	overflow: hidden;
	width: 100vw;
	height: 100vh;
}
.login {
	backdrop-filter: blur(20px);
	.input {
		height: 50px;
		display: flex;
		align-items: center;
		input {
			font-size: 16px;
			width: 100%;
			height: 100%;
			padding: 10px 15px;
			background: none;
			box-sizing: border-box;
			border: 1px solid #ccc;
			border-radius: 6px;
		}
	}
	.wrapper {
		// background: #000;
		background-size: 100px;
		min-height: 800px;
		min-width: 630px;
		position: relative;
	}
}

.v2 .dialog {
	box-shadow: 0 0.3px 0.7px rgba(0, 0, 0, 0.126),
		0 0.9px 1.7px rgba(0, 0, 0, 0.179), 0 1.8px 3.5px rgba(0, 0, 0, 0.224),
		0 3.7px 7.3px rgba(0, 0, 0, 0.277), 0 10px 20px rgba(0, 0, 0, 0.4);
	transition: 0.5s ease;
	&:hover {
		box-shadow: 0 0.7px 1px rgba(0, 0, 0, 0.157),
			0 1.7px 2.6px rgba(0, 0, 0, 0.224), 0 3.5px 5.3px rgba(0, 0, 0, 0.28),
			0 7.3px 11px rgba(0, 0, 0, 0.346), 0 20px 30px rgba(0, 0, 0, 0.5);
	}
	width: 450px;
	border: 1px solid #dadada;
	position: absolute;
	// background: url(~assets/img/dialog-gray-bg.png) #fff bottom repeat-x;
	border-radius: 12px;
	margin: -163px 0 0 -218px;
	width: 436px;
	left: 50%;
	top: 50%;
	.title {
		overflow: visible;
		box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
		// background: url("~assets/img/home/logo.jpg") no-repeat;
		background-size: 140px;
		background-position: top center;
		height: 92px;
		// margin: 23px 0 50px;
		// padding: 75px 0 0;
		box-shadow: none;
		h2 {
			text-align: center;
			color: #fff;
			font-weight: 550;
			font-size: 18px;
			margin-top: 90px;
		}
	}
	.content {
		padding: 0 40px 22px;
		height: auto;
		.common-form {
			li {
				clear: both;
				margin-bottom: 15px;
				position: relative;
			}
			.auto-login {
				position: absolute;
				top: 0px;
				left: 2px;
				color: #f3f3f3;
			}
			.register {
				padding: 1px 10px 0;
				border-right: 1px solid #ccc;
			}
		}
		.border {
			margin-top: 10px;
			border-bottom: 1px solid #ccc;
		}
		.footer {
			display: flex;
			.other {
				margin: 20px 5px 0 0;
				font-size: 10px;
				cursor: default;
			}
		}
		.agree {
			margin-bottom: 30px;
			color: #999;
		}
	}
}
.dialog-shadow,
.v2 .bbs .dialog-shadow,
.v2 .dialog-shadow {
	box-shadow: 0 9px 30px -6px rgba(0, 0, 0, 0.2),
		0 18px 20px -10px rgba(0, 0, 0, 0.04), 0 18px 20px -10px rgba(0, 0, 0, 0.04),
		0 10px 20px -10px rgba(0, 0, 0, 0.04);
}
.registered {
	h4 {
		padding: 0;
		text-align: center;
		color: #666;
		border-bottom: 1px solid #dcdcdc;
		-webkit-box-shadow: none;
		-moz-box-shadow: none;
		box-shadow: none;
		font-weight: 700;
		font-size: 20px;
		height: 60px;
		line-height: 60px;
	}
}
</style>
