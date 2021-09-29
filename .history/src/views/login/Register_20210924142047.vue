<template>
	<div class="login v2">
		<div class="wrapper">
			<div
				class="dialog dialog-shadow"
				style="display: block; margin-top: -362px"
			>
				<div class="registered">
					<h4>注册 XAMall 账号</h4>
					<div class="content" style="margin-top: 20px">
						<ul class="common-form">
							<li class="username border-1p">
								<div style="margin-top: 40px" class="input">
									<input
										type="text"
										v-model="registered.userName"
										placeholder="账号"
										@keyup="
											registered.userName = registered.userName.replace(
												/[^\w\.\/]/gi,
												''
											)
										"
									/>
								</div>
							</li>
							<li>
								<div class="input">
									<input
										type="password"
										v-model="registered.userPwd"
										placeholder="密码"
									/>
								</div>
							</li>
							<li>
								<div class="input">
									<input
										type="password"
										v-model="registered.userPwd2"
										placeholder="重复密码"
									/>
								</div>
							</li>
							<li>
								<div id="vaptchaContainer" style="width: 100%; height: 40px">
									<!--vaptcha-container是用来引入VAPTCHA的容器，下面代码为预加载动画，仅供参考-->
									<div class="vaptcha-init-main">
										<div class="vaptcha-init-loading">
											<a href="/" target="_blank">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													xmlns:xlink="http://www.w3.org/1999/xlink"
													width="48px"
													height="60px"
													viewBox="0 0 24 30"
													style="
														enable-background: new 0 0 50 50;
														width: 14px;
														height: 14px;
														vertical-align: middle;
													"
													xml:space="preserve"
												>
													<rect
														x="0"
														y="9.22656"
														width="4"
														height="12.5469"
														fill="#CCCCCC"
													>
														<animate
															attributeName="height"
															attributeType="XML"
															values="5;21;5"
															begin="0s"
															dur="0.6s"
															repeatCount="indefinite"
														></animate>
														<animate
															attributeName="y"
															attributeType="XML"
															values="13; 5; 13"
															begin="0s"
															dur="0.6s"
															repeatCount="indefinite"
														></animate>
													</rect>
													<rect
														x="10"
														y="5.22656"
														width="4"
														height="20.5469"
														fill="#CCCCCC"
													>
														<animate
															attributeName="height"
															attributeType="XML"
															values="5;21;5"
															begin="0.15s"
															dur="0.6s"
															repeatCount="indefinite"
														></animate>
														<animate
															attributeName="y"
															attributeType="XML"
															values="13; 5; 13"
															begin="0.15s"
															dur="0.6s"
															repeatCount="indefinite"
														></animate>
													</rect>
													<rect
														x="20"
														y="8.77344"
														width="4"
														height="13.4531"
														fill="#CCCCCC"
													>
														<animate
															attributeName="height"
															attributeType="XML"
															values="5;21;5"
															begin="0.3s"
															dur="0.6s"
															repeatCount="indefinite"
														></animate>
														<animate
															attributeName="y"
															attributeType="XML"
															values="13; 5; 13"
															begin="0.3s"
															dur="0.6s"
															repeatCount="indefinite"
														></animate>
													</rect>
												</svg>
											</a>
											<span class="vaptcha-text">Vaptcha Initializing...</span>
										</div>
									</div>
								</div>
							</li>
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
						<div style="margin-bottom: 30px">
							<w-button
								:classStyle="
									registered.userPwd &&
									registered.userPwd2 &&
									registered.userName &&
									registxt === '注册'
										? 'main-btn'
										: 'disabled-btn'
								"
								:text="registxt"
								style="
									margin: 0;
									width: 100%;
									height: 48px;
									font-size: 18px;
									line-height: 48px;
								"
								@btnClick="regist"
							>
							</w-button>
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
								<span>如果您已拥有 XMall 账号，则可在此</span>
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
<script src="https://v-cn.vaptcha.com/v3.js"></script>
<script>
import WFooter from "common/Footer.vue";
import WButton from "components/content/WButton.vue";
// import { register, geetest } from "/api/index.js";
require("../../until/check.js");
export default {
	data() {
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
			agreement: false,
			registxt: "注册",
			statusKey: "",
		};
	},
	computed: {
		count() {
			return this.$store.state.login;
		},
	},
	methods: {
		open(t, m) {
			this.$notify.info({
				title: t,
				message: m,
			});
		},
		messageSuccess() {
			this.$message({
				message: "恭喜您，注册成功！赶紧登录体验吧",
				type: "success",
			});
		},
		message(m) {
			this.$message.error({
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
			if (userPwd2 !== userPwd) {
				this.message("两次输入的密码不相同!");
				this.registxt = "注册";
				return false;
			}
			if (!this.agreement) {
				this.message("您未勾选同意我们的相关注册协议!");
				this.registxt = "注册";
				return false;
			}
			// var result = captcha.getValidate();
			// if (!result) {
			// 	this.message("请完成验证");
			// 	this.registxt = "注册";
			// 	return false;
			// }
			register({
				userName,
				userPwd,
				challenge: result.geetest_challenge,
				validate: result.geetest_validate,
				seccode: result.geetest_seccode,
				statusKey: this.statusKey,
			}).then((res) => {
				if (res.success === true) {
					this.messageSuccess();
					this.toLogin();
				} else {
					this.message(res.message);
					captcha.reset();
					this.registxt = "注册";
					return false;
				}
			});
		},
		_initVAPTCHA() {
			vaptcha({
				vid: "614d59a8f393198d8a5ae6a4", // 验证单元id
				mode: "click", // 显示类型 点击式
				scene: 0, // 场景值 默认0
				container: "#vaptchaContainer", // 容器，可为Element 或者 selector
				// 可选参数
				// lang: 'auto', // 语言 默认auto,可选值auto,zh-CN,en,zh-TW,jp
				// style: 'dark' //按钮样式 默认dark，可选值 dark,light
				// color: '#57ABFF' //按钮颜色 默认值#57ABFF
				// area: 'auto' //验证节点区域,默认 auto,可选值 auto,sea,na,cn
			}).then(function (vaptchaObj) {
				obj = vaptchaObj; //将VAPTCHA验证实例保存到局部变量中
				vaptchaObj.render(); // 调用验证实例 vpObj 的 render 方法加载验证按钮
				//获取token的方式一：
				//vaptchaObj.renderTokenInput('.login-form')//以form的方式提交数据时，使用此函数向表单添加server,token值
				//获取token的方式二：
				vaptchaObj.listen("pass", function () {
					serverToken = vaptchaObj.getServerToken();

					// 验证成功进行后续操作
					var data = {
						server: serverToken.server,
						token: serverToken.token,
					};
					$.post("login", data, function (r) {
						if (r.code !== 200) {
							console.log("登录失败");
							vaptchaObj.reset(); //重置 VAPTCHA
						}
					});
				});
				//关闭验证弹窗时触发
				vaptchaObj.listen("close", function () {
					//...
				});
			});
		},
	},
	mounted() {
		this._initVAPTCHA();
	},
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
		padding: 0 40px 22px;
		height: auto;
		.common-form {
			li {
				clear: both;
				margin-bottom: 15px;
				position: relative;
			}
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
	.common-form li {
		clear: both;
		margin-bottom: 15px;
		position: relative;
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
.vaptcha-init-main {
	display: table;
	width: 100%;
	height: 100%;
	background-color: #eeeeee;
}
.vaptcha-init-loading {
	display: table-cell;
	vertical-align: middle;
	text-align: center;
}

.vaptcha-init-loading > a {
	display: inline-block;
	width: 18px;
	height: 18px;
	border: none;
}

.vaptcha-init-loading .vaptcha-text {
	font-family: sans-serif;
	font-size: 12px;
	color: #cccccc;
	vertical-align: middle;
}
</style>
