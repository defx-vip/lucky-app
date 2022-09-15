<template>
	<div class="pop" v-if="pop" @click="pop=false">
		<div class="frame" @click.stop>
			<img src="../../../static/image/nosee.png" />
			<p>{{$t('UnderConstruction')}}</p>
		</div>
		<button type="button" @click.stop="pop=false" v-movedown v-music>{{$t('OK')}}</button>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				pop:false,
			}
		},
		mounted() {
		},
		methods: {
		},
	}
</script>

<style scoped>
	.pop {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		background: rgba(0, 0, 0, .64);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 2;
		flex-wrap: wrap;
		align-content: center;
	}
	
	.pop .frame {
		background: url(../../../static/image/Layer2see.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		margin: 0 .2033rem 0 .3033rem;
		width: 100%;
		display: flex;
		height: 1.4833rem;
	}
	
	.pop .frame img {
		width: 1.2033rem;
		height: 1.46rem;
		margin-left: -.1567rem;
		margin-top: -.1333rem;
	}
	
	.pop .frame p {
		color: #ffffff;
		font-size: .2rem;
		font-family: Magistral-ExtraBoldItalic;
		margin-right: .4367rem;
		margin-left: .0733rem;
		text-align: center;
		display: flex;
		align-items: center;
	}
	
	.pop button {
		display: block;
		margin: 0 auto 0;
		font-weight: bold;
		font-size: .2067rem;
		font-family: Magistral-Bold;
		margin-top: .2633rem;
		width: 1.26rem;
		padding: .015rem 0;
		border-radius: .1567rem;
		background: linear-gradient(#FFFC00, #DB7100);
	}
</style>