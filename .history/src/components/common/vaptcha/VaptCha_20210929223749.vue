<template>
	<div id="vaptchaContainer" style="width: 100%; height: 36px">
		<!--vaptcha-container是用来引入VAPTCHA的容器，下面代码为预加载动画，仅供参考-->
		<div class="vaptcha-init-main">
			<div class="vaptcha-init-loading">
				<a href="/" target="_blank">
					<img src="https://r.vaptcha.net/public/img/vaptcha-loading.gif" />
				</a>
				<span class="vaptcha-text">VAPTCHA is initializing...</span>
			</div>
		</div>
	</div>
</template>

<script>
let obj = {};
export default {
	name: "Vaptcha",
	data() {
		return {
			vid: "614d59a8f393198d8a5ae6a4", // 填写vaptcha的vid
			server: "",
			token: "",
		};
	},
	methods: {
		getToken() {
			return token;
		},
		load() {
			let _this = this;
			vaptcha({
				vid: _this.vid, // 验证单元id
				type: "click", // 显示类型 点击式
				scene: 0, // 场景值 默认0
				container: "#vaptchaContainer", // 容器，可为Element 或者 selector
				//可选参数
				//lang: 'auto', // 语言 默认auto,可选值auto,zh-CN,en,zh-TW,jp
				//https: true, // 使用https 默认 true
				//style: 'dark' //按钮样式 默认dark，可选值 dark,light
				//color: '#57ABFF' //按钮颜色 默认值#57ABFF
				//area: 'auto' //验证节点区域,默认 cn,可选值 auto,sea,na,cn
			}).then(function (vaptchaObj) {
				obj = vaptchaObj; //将VAPTCHA验证实例保存到局部变量中
				vaptchaObj.render(); // 调用验证实例 vpObj 的 render 方法加载验证按钮
				//获取token的方式一：
				//vaptchaObj.renderTokenInput('.login-form')//以form的方式提交数据时，使用此函数向表单添加server,token值
				//获取token的方式二：
				vaptchaObj.listen("pass", function () {
					let serverToken = vaptchaObj.getServerToken();
					// 验证成功进行后续操作
					let data = {
						server: serverToken.server,
						token: serverToken.token,
					};
					axios
						.post("/login", data)
						.then((res) => {
							if (r.code !== 200) {
								console.log("登录失败");
								vaptchaObj.reset(); //重置 VAPTCHA
							}
						})
						.catch((err) => {
							console.log(err);
						});
				});
				//关闭验证弹窗时触发
				vaptchaObj.listen("close", function () {
					//验证弹窗关闭触发
				});
			});
		},
	},
	mounted() {
		this.load();
	},
};
</script>

<style scoped>
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
.vaptcha-init-loading > a img {
	vertical-align: middle;
}
.vaptcha-init-loading .vaptcha-text {
	font-family: sans-serif;
	font-size: 12px;
	color: #cccccc;
	vertical-align: middle;
}
</style>