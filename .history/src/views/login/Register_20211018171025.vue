<template>
	<div class="login v2">
		<div class="wrapper">
			<div
				class="dialog dialog-shadow"
				style="display: block; margin-top: -362px"
			>
				<div class="registered">
					<h4>注册 小爱商城 账号</h4>
					<div class="content" style="margin-top: 20px">
						<ul class="common-form">
							<el-form
								:model="ruleForm"
								status-icon
								:rules="rules"
								ref="ruleForm"
								label-width="100px"
								class="demo-ruleForm"
							>
								<li>
									<el-form-item label="用户名" prop="userName">
										<el-input
											type="text"
											v-model="ruleForm.userName"
											autocomplete="off"
										></el-input>
									</el-form-item>
								</li>
								<li>
									<el-form-item label="密码" prop="pass">
										<el-input
											type="password"
											v-model="ruleForm.pass"
											autocomplete="off"
										></el-input>
									</el-form-item>
								</li>
								<li>
									<el-form-item label="确认密码" prop="checkPass">
										<el-input v-model="ruleForm.checkPass"></el-input>
									</el-form-item>
								</li>
								<li>
									<el-form-item label="手机号" prop="phone">
										<el-input type="text" v-model="ruleForm.phone"></el-input>
									</el-form-item>
								</li>
							</el-form>

							<li></li>
						</ul>
						<el-checkbox class="agree" v-model="agreement">
							我已阅读并同意遵守
							<a
								@click="
									open(
										'法律声明',
										'此仅为个人练习开源模仿项目，仅供学习参考，承担不起任何法律问题'
									)
								"
								>法律声明</a
							>
							和
							<a
								@click="
									open(
										'隐私条款',
										'本网站将不会严格遵守有关法律法规和本隐私政策所载明的内容收集、使用您的信息'
									)
								"
								>隐私条款</a
							>
						</el-checkbox>
						<div class="btn">
							<el-button type="primary" style="width: 250px; height: 30px">
								注册</el-button
							>
						</div>
						<div class="border" style="margin-bottom: 10px"></div>
						<ul class="common-form pr">
							<!-- <li class="pa" style="left: 0;top: 0;margin: 0;color: #d44d44">{{registered.errMsg}}</li> -->
							<li
								style="
									text-align: center;
									line-height: 48px;
									margin-bottom: 0;
									font-size: 12px;
									color: #999;
								"
							>
								<span>如果您已拥有 小爱 账号，则可在此</span>
								<a href="javascript:;" style="margin: 0 5px" @click="toLogin"
									>登陆</a
								>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import WFooter from "common/Footer.vue";
import WButton from "components/content/WButton.vue";

import { messageMixin } from "common/mixin/mixin.js";
// import VaptCha from "components/common/vaptcha/Vaptcha.vue";
// import { register, geetest } from "/api/index.js";
let obj = {};
export default {
	data() {
		let checkUserName = (rule, value, callback) => {
			if (!value) {
				return callback(new Error("用户名不能为空"));
			} else {
				callback();
				this.check.userName = true;
			}
		};
		let validatePass = (rule, value, callback) => {
			if (value === "") {
				callback(new Error("请输入密码"));
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
			} else if (value !== this.ruleForm.pass) {
				callback(new Error("两次输入密码不一致!"));
			} else {
				callback();
				this.check.pass = true;
			}
		};
		let validateTel = (rule, value, callback) => {
			if (value === "") {
				callback(new Error("请输入手机号"));
			} else if (!/^[1][3,4,5,7,8,9][0-9]{9}$/.test(value)) {
				callback(new Error("请输入正确的手机号"));
			} else {
				this.check.phone = true;
				callback();
			}
		};
		return {
			cart: [],
			ruleForm: {
				userName: "",
				pass: "",
				checkPass: "",
				phone: "",
			},
			check: {
				userName: false,
				pass: false,
				phone: false,
			},
			rules: {
				userName: [{ validator: checkUserName, trigger: "blur" }],
				pass: [{ validator: validatePass, trigger: "blur" }],
				checkPass: [{ validator: validatePass2, trigger: "blur" }],
				phone: [{ validator: validateTel, trigger: "blur" }],
			},
			agreement: false,
			registxt: "注册",
			statusKey: "",
		};
	},
	mixins: [messageMixin],
	computed: {
		count() {
			return this.$store.state.login;
		},
		isdisabled() {
			if (
				this.check.userName &&
				this.check.pass &&
				this.check.phone &&
				agreement
			) {
				return true;
			} else {
				return false;
			}
		},
	},
	methods: {
		open(t, m) {
			this.$notify.info({
				title: t,
				message: m,
			});
		},
		toLogin() {
			this.$router.push({
				path: "/login",
			});
		},
		regist() {
			this.registxt = "注册中...";
			let userName = this.registered.userName;
			let userPwd = this.registered.userPwd;
			let userPwd2 = this.registered.userPwd2;
			// if (!this.agreement) {
			// 	this.message("您未勾选同意我们的相关注册协议!", "error");
			// 	this.registxt = "注册";
			// 	return false;
			// }
			// var result = captcha.getValidate();
			// if (!result) {
			// 	this.message("请完成验证");
			// 	this.registxt = "注册";
			// 	return false;
			// }
			register({
				userName,
				userPwd,
				statusKey: this.statusKey,
			}).then((res) => {
				if (res.success === true) {
					this.message(res.message, "success");
					this.toLogin();
				} else {
					this.message(res.message, "error");
					captcha.reset();
					this.registxt = "注册";
					return false;
				}
			});
		},
	},
	mounted() {},
	components: {
		WFooter,
		WButton,
	},
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
* {
	box-sizing: content-box;
}

.login {
	overflow-x: hidden;
	overflow-y: hidden;
	.input {
		height: 50px;
		display: flex;
		align-items: center;
		input {
			font-size: 16px;
			width: 100%;
			height: 100%;
			padding: 10px 15px;
			box-sizing: border-box;
			border: 1px solid #ccc;
			border-radius: 6px;
		}
	}
	.wrapper {
		background: url(/static/images/bg_9b9dcb65ff.png) repeat;
		background-size: 100px;
		min-height: 800px;
		min-width: 630px;
	}
}

.v2 .dialog {
	width: 450px;
	border: 1px solid #dadada;
	border-radius: 10px;
	top: 50%;
	left: 50%;
	margin-left: -225px;
	position: absolute;
	.title {
		background: linear-gradient(#fff, #f5f5f5);
		height: auto;
		overflow: visible;
		box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
		position: relative;
		background-image: url(/static/images/smartisan_4ada7fecea.png);
		background-size: 140px;
		background-position: top center;
		background-repeat: no-repeat;
		height: 92px;
		margin: 23px 0 50px;
		padding: 75px 0 0;
		box-shadow: none;
		h4 {
			padding: 0;
			text-align: center;
			color: #666;
			border-bottom: 1px solid #dcdcdc;
			-webkit-box-shadow: none;
			-moz-box-shadow: none;
			box-shadow: none;
			font-weight: 700;
			position: absolute;
			bottom: 0;
			width: 100%;
			text-align: center;
			margin: 0;
			padding: 0;
			border-bottom: 0;
			-webkit-box-shadow: none;
			-moz-box-shadow: none;
			box-shadow: none;
			line-height: 1em;
			height: auto;
			color: #333;
			font-weight: 400;
		}
	}
	.content {
		height: auto;
		display: flex;
		flex-direction: column;
		justify-content: center;
		.common-form {
			li {
			}
		}
		.btn {
			margin-bottom: 30px;
			display: flex;
			justify-content: center;
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

@media screen and (min-width: 737px),
	screen and (-webkit-max-device-pixel-ratio: 1.9) and (max-width: 736px) and (min-device-width: 737px) {
	.wrapper {
		background: url(/static/images/con-bg_04f25dbf8e.jpg) repeat-x;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}
	.dialog {
		background: url(/static/images/dialog-gray-bg.png) #fff bottom repeat-x;
		border-radius: 12px;
		display: none;
		margin: -163px 0 0 -218px;
		width: 436px;
		position: fixed;
		left: 50%;
		top: 50%;
	}
	.dialog .title h4 {
		border-bottom: #d1d1d1 solid 1px;
		box-shadow: 0 2px 6px #d1d1d1;
		color: #666;
		font-size: 20px;
		height: 61px;
		line-height: 61px;
		padding: 0 0 0 35px;
	}

	.auto-login {
		position: absolute;
		top: 0px;
		left: 2px;
		color: #999;
	}
	.register {
		padding: 1px 10px 0;
		border-right: 1px solid #ccc;
	}
	.border {
		margin-top: 10px;
		border-bottom: 1px solid #ccc;
	}
	.other {
		margin: 20px 5px 0 0;
		width: auto;
		color: #bbb;
		font-size: 12px;
		cursor: default;
		color: #999;
	}
	.footer {
		display: flex;
		flex-direction: row;
	}
	.agree {
		margin-bottom: 30px;
		color: #999;
	}
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

#wait {
	text-align: left;
	color: #999;
	margin: 0;
}
</style>
