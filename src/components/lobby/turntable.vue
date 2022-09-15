<template>

	<div class="turntable">
		<img style="display: none;" id="sorry" src="../../../static/image/turntablein.png" />
		<audio id="turntableaudio" style="display: none;">
			<source src="../../../static/image/turntable.mp3">
		</audio>
		<div class="frame">
			<div class="top">
				<img v-if="$i18n.locale=='en'" src="../../../static/image/forward.png" />
				<img v-if="$i18n.locale=='zh'" src="../../../static/image/forwardzh.png" />
			</div>
			<div class="price">
				<p>{{txt}}</p>
			</div>
			<div class="center">
				<img src="../../../static/image/turntablebg.png" />
				<img v-if="listimg==1" style="bottom: .09rem;" class="lamp" src="../../../static/image/lamp2.png" />
				<img v-if="listimg==2" class="lamp" src="../../../static/image/lamp1.png" />
				<div class="canvasin">
					<canvas class="item" id="wheelcanvas" width="422px" height="422px"> </canvas>
				</div>
				<img v-if="$i18n.locale=='en'" class="pointer" src="../../../static/image/turntablecenter.png" />
				<img v-if="$i18n.locale=='zh'" class="pointer" src="../../../static/image/turntablecenterzh.png" />
			</div>
			<button type="button" @click="turntable" v-movedown v-music>{{$t('lLobby')}}</button>
		</div>
	</div>
</template>

<script>
	import imgbg from '../../../static/image/turntablein.png'
	export default {
		data() {
			return {
				txt: 0,
				txtfirst:0,
				listimg: 1,
				time: '',
				clickbool: false,
				timein: '',
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.canvasgo()
				let that = this
				this.time = setInterval(function() {
					if(that.listimg == 2) {
						that.listimg = 1;
					} else {
						that.listimg = 2;
					}
				}, 1000)
			})
		},
		beforeDestroy() {
			clearInterval(this.time)
			clearInterval(this.timein)
			document.getElementById('turntableaudio').pause()
			if(JSON.parse(this.$store.state.Music) != false && JSON.parse(this.$cookies.get('Music')) != false) {
				document.getElementById('playall').play()
			}
		},
		destroyed() {
			clearInterval(this.time)
			clearInterval(this.timein)
			document.getElementById('turntableaudio').pause()
			if(JSON.parse(this.$store.state.Music) != false && JSON.parse(this.$cookies.get('Music')) != false) {
				document.getElementById('playall').play()
			}
		},
		methods: {
			turntable() {
				if(this.txtfirst == 0) {
					this.$toast("Please click TIRE1 to spin the prize wheel");
					return false;
				}
				if(JSON.parse(this.$store.state.Music) != false && JSON.parse(this.$cookies.get('Music')) != false) {
					document.getElementById('playall').play()
				}
				this.$router.push('/')
			},
			canvasgo() {
				let that = this
				var turnplate = {
					restaraunts: [],
					colors: [],
					data: [],
					outsideRadius: 150,
					textRadius: 105,
					insideRadius: 30,
					startAngle: 60.0,

					bRotate: false
				};

				$(document).ready(function() {
					turnplate.restaraunts = ["80", "140", "140", "40", "80", "40", "140", "140", "80", "40"];
					turnplate.data = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
					turnplate.colors = ["transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent"];
					//					turnplate.colors = ["#efc533", "#cfa30b", "#efc533", "#cfa30b", "#efc533", "#cfa30b", "#efc533", "#cfa30b", "#efc533", "#cfa30b"];
					var rotateTimeOut = function() {
						$('#wheelcanvas').rotate({
							angle: 0,
							animateTo: 2160,
							duration: 8000,
							callback: function() {}
						});
					};

					var rotateFn = function(item, txt, data) {
						var angles = item * (360 / turnplate.restaraunts.length) - (360 / (turnplate.restaraunts.length * 2));
						if(angles < 270) {
							angles = 270 - angles;
						} else {
							angles = 360 - angles + 270;
						}
						if(item == 3 || item == 8) {
							angles = angles + 19
						}
						if(item == 2 || item == 7) {
							angles = angles - 17
						}
						//					$('#wheelcanvas').stopRotate();
						$('#wheelcanvas').rotate({
							angle: 0,
							animateTo: angles + 1800 + 162,
							duration: 8000,
							callback: function() {
								turnplate.bRotate = !turnplate.bRotate;
								//								console.log(data);
								//								console.log(txt)
								that.txt = that.txtfirst
								that.$toast("Receive successfully");
								document.getElementById('turntableaudio').pause()
								if(JSON.parse(that.$store.state.Music) != false && JSON.parse(that.$cookies.get('Music')) != false) {
									document.getElementById('playall').play()
								}
							}
						});
					};
					//					var rotateFn = function(item, txt, data) {
					//						let numrotate=Math.floor(Math.random() * 16) + 1;
					//						var angles = item * (360 / turnplate.restaraunts.length) - (360 / (turnplate.restaraunts.length * 2));
					//						if(angles < 270) {
					//							angles = 270 - angles+Number(numrotate);
					//						} else {
					//							angles = 360 - angles + 270-Number(numrotate);
					//						}
					//						//					$('#wheelcanvas').stopRotate();
					//						$('#wheelcanvas').rotate({
					//							angle: 0,
					//							animateTo: angles + 1800,
					//							duration: 15000,
					//							callback: function() {
					//								turnplate.bRotate = !turnplate.bRotate;
					//								console.log(data);
					//								console.log(txt)
					//								that.txt=txt
					//
					//							}
					//						});
					//					};
//					that.timein = setTimeout(function() {
//						if(that.clickbool == false) {
//							that.clickbool = true;
//							$('.pointer').parent().find('.canvasin').css({
//								"pointer-events": "none"
//							})
//							$('.pointer').css({
//								"pointer-events": "none"
//							})
//							if(that.txt == 0) {
//								that.$post(that.$apiUtil.reward_turntable, {
//									playerId: that.$cookies.get('playerId'),
//									walletAddress: that.$cookies.get('walletAddress'),
//								}).then((res) => {
//									if(JSON.parse(that.$store.state.Sound) != false && JSON.parse(that.$cookies.get('Sound')) != false) {
//										document.getElementById('playall').pause()
//										document.getElementById('turntableaudio').play()
//									}
//									that.txtfirst = res.data.rewardNumber;
//									rotateFn(Number(res.data.key), turnplate.restaraunts[Number(res.data.key) - 1], turnplate.data[Number(res.data.key) - 1]);
//								})
//							}
//						}
//					}, 3000)
					$('.pointer').unbind().click(function() {
						$(this).parent().find('.canvasin').css({
							"pointer-events": "none"
						})
						$(this).css({
							"pointer-events": "none"
						})
						if(that.txt == 0&&that.clickbool==false) {
							that.clickbool = true;
							that.$post(that.$apiUtil.reward_turntable, {
								playerId: that.$cookies.get('playerId'),
								walletAddress: that.$cookies.get('walletAddress'),
							}).then((res) => {
								if(JSON.parse(that.$store.state.Sound) != false && JSON.parse(that.$cookies.get('Sound')) != false) {
									document.getElementById('playall').pause()
									document.getElementById('turntableaudio').play()
								}
								that.txtfirst = res.data.rewardNumber;
								rotateFn(Number(res.data.key), turnplate.restaraunts[Number(res.data.key) - 1], turnplate.data[Number(res.data.key) - 1]);
							})
						}
					});
					drawRouletteWheel();
					//					setTimeout(function(){
					//						drawRouletteWheel();
					//					},100)
				});

				function rnd(n) {
					//				var random = Math.floor(Math.random() * (m - n + 1) + n);
					return n;

				}

				//				window.onload = function() {
				//					drawRouletteWheel();
				//				};

				function drawRouletteWheel() {
					var canvas = document.getElementById("wheelcanvas");
					if(canvas.getContext) {
						var arc = Math.PI / (turnplate.restaraunts.length / 2);
						var ctx = canvas.getContext("2d");
						ctx.clearRect(0, 0, 422, 422);
						ctx.strokeStyle = "transparent";
						ctx.font = '16px Microsoft YaHei';
						let img = new Image()
						img.src = imgbg;
						img.onload = function() {
							ctx.drawImage(img, 0, 0, 422, 422);
						}
						//						var img = document.getElementById("sorry");
						//						ctx.drawImage(img, 0, 0, 422, 422);
						ctx.restore();
						for(var i = 0; i < turnplate.restaraunts.length; i++) {
							var angle = turnplate.startAngle + i * arc;
							ctx.fillStyle = turnplate.colors[i];
							ctx.beginPath();
							ctx.arc(211, 211, turnplate.outsideRadius, angle, angle + arc, false);
							ctx.arc(211, 211, turnplate.insideRadius, angle + arc, angle, true);
							ctx.stroke();
							ctx.fill();
							ctx.save();

							ctx.fillStyle = "transparent";
							var text = turnplate.restaraunts[i];
							var line_height = 17;
							ctx.translate(211 + Math.cos(angle + arc / 2) * turnplate.textRadius, 211 + Math.sin(angle + arc / 2) * turnplate.textRadius);

							ctx.rotate(angle + arc / 2 + Math.PI / 2);

							//												console.log(turnplate)

							if(text.indexOf("M") > 0) {
								var texts = text.split("M");
								for(var j = 0; j < texts.length; j++) {
									ctx.font = j == 0 ? 'bold 20px Microsoft YaHei' : '16px Microsoft YaHei';
									if(j == 0) {
										ctx.fillText(texts[j] + "M", -ctx.measureText(texts[j] + "M").width / 2, j * line_height);
									} else {
										ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * line_height);
									}
								}
							} else if(text.indexOf("M") == -1 && text.length > 6) {
								text = text.substring(0, 6) + "||" + text.substring(6);
								var texts = text.split("||");
								for(var j = 0; j < texts.length; j++) {
									ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * line_height);
								}
							} else {
								ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
							}
							var b = i % 2
							ctx.font = "bold 15px SourceHanSansCN-Bold";
							ctx.textAlign = 'center';
							ctx.fillStyle = '#ffffff';
							//							ctx.fillText("+"+turnplate.data[i], 0, 0);
							ctx.restore();
						}
					}
				}
			},
		},
	}
</script>

<style scoped>
	.turntable {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, .64);
		z-index: 3;
		/*display: flex;
		align-items: center;
		justify-content: center;*/
		background: url(../../../static/image/signBG.png);
		background-repeat: no-repeat;
		background-size: 100%;
		overflow-y: auto;
		overflow-x:hidden;
	}

	.turntable .frame {
		background: url(../../../static/image/signinBG.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		width: 100%;
		margin-top: 0.9333rem;
		margin-bottom: 1.22rem;
		padding-bottom: .12rem;
		position: relative;
		z-index: -1;
	}

	.turntable .frame .top {
		margin-top: -0.25rem;
		display: inline-block;
		width: 100%;
	}

	.turntable .frame .top img:nth-child(1) {
		height: 0.4567rem;
		display: block;
		margin: 0 auto;
	}

	.turntable .frame .price {
		background: url(../../../static/image/forwardpop.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		width: 2.18rem;
		height: .77rem;
		margin: 0.2167rem auto 0;
	}

	.turntable .frame .price p {
		font-size: .4rem;
		text-align: center;
		color: #ffffff;
		font-family: 'Magistral-Book';
		letter-spacing: .05rem;
		padding-top: 0.05rem;
		display: block;
		text-indent: 0.05rem;
	}

	.turntable .frame .center {
		margin: 0.04rem 0.1rem 0;
		position: relative;
	}

	.turntable .frame .center>img:nth-child(1) {
		width: 100%;
		position: relative;
		z-index: 1;
	}

	.turntable .frame .center .lamp {
		position: absolute;
		z-index: 1;
		left: 0;
		width: 100%;
		bottom: 0.05rem;
	}

	.turntable .frame .center>img:nth-child(4) {
		position: absolute;
		left: 50%;
		width: 1.5233rem;
		top: 50%;
		margin-left: -0.76165rem;
		margin-top: -0.76165rem;
		z-index: 2;
	}

	.turntable .frame .center .canvasin {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		/*z-index: 0;*/
		/*margin-top: -100%;*/
	}

	.turntable .frame .center .canvasin canvas {
		width: 90%;
		height: 90%;
		position: relative;
		z-index: -1;
	}

	.turntable .frame>button {
		margin: 0.4733rem auto 0;
		display: block;
		width: 1.8rem;
		height: 0.5rem;
		border-radius: 0.25rem;
		background: linear-gradient(#FFFC00, #DB7100);
		font-size:.2rem;
	}

	.turntable .frame>button img {
		width: .3533rem;
		display: block;
		margin: 0 auto;
	}
</style>
