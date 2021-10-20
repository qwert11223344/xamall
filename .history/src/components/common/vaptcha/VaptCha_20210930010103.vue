<template>
	<div id="vaptchaContainer" style="width: 100%; height: 40px" ref="vaptcha">
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
						<rect x="0" y="9.22656" width="4" height="12.5469" fill="#CCCCCC">
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
						<rect x="10" y="5.22656" width="4" height="20.5469" fill="#CCCCCC">
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
						<rect x="20" y="8.77344" width="4" height="13.4531" fill="#CCCCCC">
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
</template>



<script>
export default {
	data() {
		return {
			serverToken: "",
			script: null,
			vaptchaObj: null,
		};
	},
	mounted() {
		var config = {
			vid: "6000eb38551c0d24017b5525",
			mode: "click",
			scene: 0,
			container: this.$refs.vaptcha,
			style: "light",
			color: "#00BFFF",
			lang: "auto",
			area: "auto",
		};
		this.loadV2Script().then(() => {
			window.vaptcha(config).then((obj) => {
				this.vaptchaObj = obj;

				obj.listen("pass", () => {
					serverToken = obj.getServerToken();
					// console.log(this.token);
					this.$emit("sendToken", this.token);
				});
				obj.listen("close", () => {
					obj.reset();
				});

				obj.render();
			});
		});
	},
	methods: {
		loadV2Script() {
			if (typeof window.vaptcha === "function") {
				//如果已经加载就直接放回
				return Promise.resolve();
			} else {
				return new Promise((resolve) => {
					var script = document.createElement("script");
					script.src = "https://v.vaptcha.com/v3.js";
					script.async = true;
					script.onload = script.onreadystatechange = function () {
						if (
							!this.readyState ||
							this.readyState == "loaded" ||
							this.readyState == "complete"
						) {
							resolve();
							script.onload = script.onreadystatechange = null;
						}
					};
					document.getElementsByTagName("head")[0].appendChild(script);
				});
			}
		},
		getToken() {
			return this.vaptchaObj.getToken();
		},
		reset() {
			this.vaptchaObj.reset();
		},
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

.vaptcha-init-loading .vaptcha-text {
	font-family: sans-serif;
	font-size: 12px;
	color: #cccccc;
	vertical-align: middle;
}
</style>