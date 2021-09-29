<template>
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
export default {};
</script>

<style>
</style>