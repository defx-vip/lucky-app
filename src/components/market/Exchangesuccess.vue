<template>
	<div class="Exchangesuccess">
		<div>
			<img class="back" @click="$parent.success=false" src="../../../static/image/Esuccessback.png" v-music/>
			<img src="../../../static/image/Esuccessimg.png" />
			<span>{{$t('msuccess')}}！</span>
			<p>{{$t('mExchangeSuccessful')}}</p>
			<button type="button" @click="$parent.success=false" v-movedown v-music>{{$t('mCLOSE')}}</button>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		mounted() {},
		methods: {
		},
	}
</script>

<style scoped>
	.Exchangesuccess {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		background: rgba(0, 0, 0, .6);
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.Exchangesuccess div {
		background: url(../../../static/image/EsuccessBG.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		width: 90%;
		position: relative;
	}
	
	.Exchangesuccess div img {
		width: 1.9rem;
		display: block;
		margin: 0.17rem auto 0;
	}
	
	.Exchangesuccess div .back {
		position: absolute;
		margin: 0;
		width: 0.24rem;
		right: 0.1733rem;
		top: 0.1467rem;
	}
	
	.Exchangesuccess div span {
		color: #ffffff;
		font-family: 'Magistral-Book';
		font-size: .17rem;
		width: 100%;
		display: block;
		text-align: center;
		margin-top: -0.43rem;
		text-transform: uppercase;
	}
	
	.Exchangesuccess div p {
		font-size: .17rem;
		text-align: center;
		margin-top: 0.4rem;
		font-family: 'Magistral-Book';
		color: #ffffff;
		text-transform: uppercase;
	}
	
	.Exchangesuccess div button {
		width: 2rem;
		display: block;
		height: 0.4rem;
		margin: 0.17rem auto 0.42rem;
		border-radius: 0.2rem;
		background: linear-gradient(#FFFC00, #DB7100);
	}
</style>