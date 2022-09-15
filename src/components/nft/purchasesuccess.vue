<template>
	<div class="purchasesuccess" @click="$parent.success=1">
		<div class="out">
			<div>
				<h1><span>{{$t('bOpenMysteryChest')}}</span></h1>
				<img class="trunk" src="../../../static/image/successxiang.png" />
				<button type="button">{{$t('fCountdownin')}} {{timesuccess}}S</button>
			</div>
		</div>
	</div>
</template>

<script>
	let that
	export default {
		data() {
			return {
				timesuccess: 5,
				timelog: "",
			}
		},
		mounted() {
			that = this
			this.timeout();
		},
		beforeDestroy() {
			clearInterval(this.timelog)
		},
		destroyed() {
			clearInterval(this.timelog)
		},
		methods: {
			timeout() {
				this.timelog = setInterval(function() {
					that.timesuccess--
						if(that.timesuccess == 0) {
							clearInterval(that.timelog)
							that.$parent.success=3;
						}
				}, 1000)
			},
		},
	}
</script>

<style scoped>
	.purchasesuccess {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 95vh;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.purchasesuccess .out {
		background: url(../../../static/image/boxBG.png);
		background-repeat: no-repeat;
		background-position: center;
		width: 94%;
		background-size: 100%;
	}
	
	.purchasesuccess .out div {
		background: url(../../../static/image/successguangtiao.png);
		background-repeat: no-repeat;
		background-position: center center;
		width: 100%;
		background-size: 106%;
	}
	
	.purchasesuccess .out div h1 {
		color: #DFE117;
		text-align: center;
		font-family: 'Magistral-Bold';
		margin-top: 0.35rem;
		margin-bottom: 0.4967rem;
		font-size: .2rem;
		text-transform: uppercase;
	}
	
	.purchasesuccess .out div .trunk {
		margin: 0 auto 0;
		display: block;
		width: 1.54rem
	}
	
	.purchasesuccess .out div button {
		height: 0.3533rem;
		display: block;
		margin: 0.55rem auto 0.48rem;
		background: linear-gradient(#FFFC00, #DB7100);
		border-radius: 0.1767rem;
		font-size: .15rem;
		font-family: 'Magistral-Bold';
		padding: 0 0.2rem;
		text-transform:uppercase;
	}
</style>