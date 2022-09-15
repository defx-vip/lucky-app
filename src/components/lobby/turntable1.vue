<template>
	<div class="turntable" @click="$parent.turntablego=false">
		<img style="display: none;width: .4667rem;height: .3933rem;" id="sorry1" src="../../../static/image/805Treasurechest.png" />
		<img style="display: none;" id="sorry2" src="../../../static/image/sdf.png" />
		<img style="display: none;" id="sorry3" src="../../../static/image/BCGzpa.png" />
		<img style="display: none;" id="sorry4" src="../../../static/image/805Treasurechest.png" />
		<img style="display: none;" id="sorry5" src="../../../static/image/sdf.png" />
		<img style="display: none;" id="sorry6" src="../../../static/image/BCGzpa2.png" />
		<img style="display: none;" id="sorry7" src="../../../static/image/805Treasurechest.png" />
		<img style="display: none;" id="sorry8" src="../../../static/image/sdf.png" />
		<div class="center" @click.stop>
			<img class="gobg" src="../../../static/image/turnplate.png" />
			<div class="canvasin">
				<canvas class="item" id="wheelcanvas" width="422px" height="422px"> </canvas>
			</div>
			<img class="goimg pointer" src="../../../static/image/turntablego.png"/>
		</div>
		<button type="button" @click.stop="turntable">GET MY PRIZE</button>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				txt:0,
			}
		},
		mounted() {
			this.canvasgo()
		},
		methods: {
			turntable(){
				if(this.txt==0){
					this.$toast("Please click GO to spin the prize wheel");
					return false;
				}
				this.$post(this.$apiUtil.reward_turntable, {playerId:this.$cookies.get('playerId'),walletAddress:this.$cookies.get('walletAddress'),rewardNumber:this.txt}).then((res) => {
					console.log(res)
					this.$toast("Receive successfully");
					this.$parent.turntablego=false;
					this.$parent.$refs["tops"].query();
				})
			},
			canvasgo() {
				let that=this;
				var turnplate = {
					restaraunts: [], 
					colors: [], 
					data: [],
					outsideRadius: 156, 
					textRadius: 105, 
					insideRadius: 30, 
					startAngle: 0, 

					bRotate: false 
				};

				$(document).ready(function() {
					turnplate.restaraunts = ["40", "80", "140", "40", "80", "140", "40", "80"];
					turnplate.data = ["1", "2", "3", "4", "5", "6", "7", "8"];
					turnplate.colors = ["#efc533", "#cfa30b", "#efc533", "#cfa30b", "#efc533", "#cfa30b", "#efc533", "#cfa30b"];

					var rotateTimeOut = function() {
						$('#wheelcanvas').rotate({
							angle: 0,
							animateTo: 2160,
							duration: 8000,
							callback: function() {
							}
						});
					};

					var rotateFn = function(item, txt, data) {
						var angles = item * (360 / turnplate.restaraunts.length) - (360 / (turnplate.restaraunts.length * 2));
						if(angles < 270) {
							angles = 270 - angles;
						} else {
							angles = 360 - angles + 270;
						}
						//					$('#wheelcanvas').stopRotate();
						$('#wheelcanvas').rotate({
							angle: 0,
							animateTo: angles + 1800,
							duration: 8000,
							callback: function() {
								turnplate.bRotate = !turnplate.bRotate;
								console.log(data);
								console.log(txt)
								that.txt=txt

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
					$('.pointer').unbind().click(function() {
						$(this).parent().find('.canvasin').css({"pointer-events":"none"})
						$(this).css({"pointer-events":"none"})
						if(that.txt==0){
							let numrotate=Math.floor(Math.random() * 8) + 1;
//							console.log(Math.floor(Math.random() * 8) + 1)
							rotateFn(numrotate, turnplate.restaraunts[numrotate - 1], turnplate.data[numrotate - 1]);
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
							var img = document.getElementById("sorry" + (i + 1));
							//						img.onload = function() {
							//							ctx.drawImage(img, -28, -20);
							//						};
							ctx.font = "bold 15px SourceHanSansCN-Bold";
							ctx.textAlign = 'center';
							ctx.fillStyle = '#ffffff';
							if(turnplate.restaraunts[i] == 40) {
								ctx.drawImage(img, -24, -30, 46.67, 39.33);
								ctx.fillText("+"+turnplate.restaraunts[i], 0, 35);
							} else if(turnplate.restaraunts[i] == 140) {
								ctx.drawImage(img, -20, -30, 40.33, 40.33);
								ctx.fillText("+"+turnplate.restaraunts[i], 0, 35);
							} else if(turnplate.restaraunts[i] == 80) {
								ctx.drawImage(img, -24, -30, 52.67, 42.33);
								ctx.fillText("+"+turnplate.restaraunts[i], 0, 35);
							}
							ctx.restore();

							//						var img = document.getElementById("sorry"+(i+1));
							//							img.onload = function() {
							//								ctx.drawImage(img, -28, -20);
							//							};
							//							ctx.drawImage(img, -28, -20);
							//						if(b == 0) {
							//							var img = document.getElementById("sorry1");
							//							img.onload = function() {
							//								ctx.drawImage(img, -28, -20);
							//							};
							//							ctx.drawImage(img, -28, -20);
							//						} else {
							//							var img = document.getElementById("sorry2");
							//							img.onload = function() {
							//								ctx.drawImage(img, -34, -20);
							//							};
							//							ctx.drawImage(img, -34, -20);
							//						}
//							ctx.restore();
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
		background: rgba(0, 0, 0, .5);
		z-index: 3;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-wrap: wrap;
		align-content: center;
	}
	
	.turntable .center {
		width: 2.91rem;
		height: 2.91rem;
		position: relative;
	}
	
	.turntable .center .canvasin {
		transform: scale(1.2, 1.2);
		position: relative;
		z-index: 1;
	}
	
	.turntable .center canvas {
		/*width: 100%;
		height: 100%;*/
		width: 100%;
	}
	
	.turntable .center .goimg {
		position: absolute;
		width: .55rem;
		margin-left: -.275rem;
		left: 50%;
		top: 50%;
		margin-top: -.47rem;
		z-index: 2;
	}
	
	.turntable .center .gobg {
		position: absolute;
		top: 0;
		left: 0;
		transform: rotate(22deg);
		width: 100%;
		height: 100%;
	}
	
	.turntable button {
		height: .41rem;
		border-radius: .205rem;
		font-family: Magistral-Bold;
		font-size: .22rem;
		font-weight: bold;
		background: linear-gradient(#FFFC00, #DB7100);
		padding: 0 .2167rem;
		margin-top: .3067rem;
		position: relative;
    	z-index: 3;
	}
</style>