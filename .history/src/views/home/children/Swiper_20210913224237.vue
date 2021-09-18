<template>
	<div class="banner">
		<div
			class="bg"
			ref="bg"
			@mouseover="bgOver($refs.bg)"
			@mousemove="bgMove($refs.bg, $event)"
			@mouseout="bgOut($refs.bg)"
		>
			<transition name="fade">
				<div
					v-for="(item, i) in banner"
					v-if="i === mark"
					:key="i"
					style="position: absolute"
					@click="linkTo(item)"
					@mouseover="stopTimer"
					@mouseout="startTimer"
				>
					<img v-if="item.pic_url" class="img1" :src="item.pic_url" />
					<img v-if="item.pic_url2" class="img2 a" :src="item.pic_url2" />
					<img v-if="item.pic_url3" class="img3 b" :src="item.pic_url3" />
				</div>
			</transition>
		</div>
		<div class="page">
			<ul class="dots">
				<li
					class="dot-active"
					v-for="(item, i) in banner"
					:class="{ dot: i != mark }"
					:key="i"
					@click="change(i)"
				></li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			error: false,
			mark: 0,
			bgOpt: {
				px: 0,
				py: 0,
				w: 0,
				h: 0,
			},
			notify: "1",
			dialogVisible: false,
			timer: "",
		};
	},
	props: {
		banner: {
			type: Array,
			default() {
				return [];
			},
		},
	},
	methods: {
		autoPlay() {
			this.mark++;
			if (this.mark > this.banner.length - 1) {
				// 当遍历到最后一张图片置零
				this.mark = 0;
			}
		},
		play() {
			// 每2.5s自动切换
			this.timer = setInterval(this.autoPlay, 2500);
		},
		change(i) {
			this.mark = i;
		},
		startTimer() {
			this.timer = setInterval(this.autoPlay, 2500);
		},
		stopTimer() {
			clearInterval(this.timer);
		},
		linkTo(item) {
			if (item.type === 0 || item.type === 2) {
				// 关联商品
				this.$router.push({
					path: "/goodsDetails",
					query: {
						productId: item.product_id,
					},
				});
			} else {
				// 完整链接
				window.location.href = item.fullUrl;
			}
		},
		bgOver(e) {
			this.bgOpt.px = e.offsetLeft;
			this.bgOpt.py = e.offsetTop;
			this.bgOpt.w = e.offsetWidth;
			this.bgOpt.h = e.offsetHeight;
		},
		bgMove(dom, eve) {
			let bgOpt = this.bgOpt;
			let X, Y;
			let mouseX = eve.pageX - bgOpt.px;
			let mouseY = eve.pageY - bgOpt.py;
			if (mouseX > bgOpt.w / 2) {
				X = mouseX - bgOpt.w / 2;
			} else {
				X = mouseX - bgOpt.w / 2;
			}
			if (mouseY > bgOpt.h / 2) {
				Y = bgOpt.h / 2 - mouseY;
			} else {
				Y = bgOpt.h / 2 - mouseY;
			}
			dom.style["transform"] = `rotateY(${X / 50}deg) rotateX(${Y / 50}deg)`;
			dom.style.transform = `rotateY(${X / 50}deg) rotateX(${Y / 50}deg)`;
		},
		bgOut(dom) {
			dom.style["transform"] = "rotateY(0deg) rotateX(0deg)";
			dom.style.transform = "rotateY(0deg) rotateX(0deg)";
		},
		showNotify() {
			var value = getStore("notify");
			if (this.notify !== value) {
				this.dialogVisible = true;
				setStore("notify", this.notify);
			}
		},
	},
};
</script>

<style scoped>
.banner,
.banner span,
.banner div {
	font-family: "Microsoft YaHei";
	transition: all 0.3s;
	transition-timing-function: linear;
}

.banner {
	cursor: pointer;
	perspective: 3000px;
	position: relative;
	z-index: 19;
	margin: 0 auto;
	width: 1220px;
}

.bg {
	position: relative;
	width: 1220px;
	height: 500px;
	margin: 20px auto;
	background-size: 100% 100%;
	border-radius: 10px;
	transform-style: preserve-3d;
	transform-origin: 50% 50%;
	transform: rotateY(0deg) rotateX(0deg);
}
.bg div {
	position: relative;
	height: 100%;
	width: 100%;
}
.img1 {
	display: block;
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	border-radius: 10px;
}

.img2 {
	display: block;
	position: absolute;
	width: 100%;
	height: 100%;
	bottom: 5px;
	left: 0;
	background-size: 95% 100%;
	border-radius: 10px;
}

.img3 {
	display: block;
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	border-radius: 10px;
}
.page {
	position: absolute;
	width: 100%;
	top: 470px;
	z-index: 30;
}
.page .dots {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
}
.dot-active {
	display: inline-block;
	width: 15px;
	height: 15px;
	background-color: whitesmoke;
	border-radius: 8px;
	margin-right: 10px;
	cursor: pointer;
}
.dot {
	opacity: 0.2;
}
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
	opacity: 0;
}
</style>