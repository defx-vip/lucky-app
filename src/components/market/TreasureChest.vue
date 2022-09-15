<template>
	<div class="TreasureChest">
		<ul>
			<li>
				<div>
					<img src="../../../static/image/1487.png" />
				</div>
				<p><span>{{$t('mPRICE')}}:</span><span class="color">{{money[0]}} ETH</span></p>
				<p><span style="flex: 1;">{{$t('mQUANTITY')}}:</span><img @click="num>1?num--:''" src="../../../static/image/-.png"><span class="color" style="margin: 0 0.16rem;">{{num}}</span><img @click="num<10?num++:''" src="../../../static/image/+.png"></p>
				<button type="button" @click="$router.push('/blindbox?num='+num+'&money='+money[0]+'&sort=plain')" v-movedown v-music>{{$t('mBUY')}}</button>
				<!--<button type="button" :class="approvebool2=='LMT'?'preventReClick':''" @click="approve('LMT')" v-if="approvebool!='LMT'" v-preventReClick>APPROVE</button>
					<button type="button" @click="buybox('LMT')" v-else-if="approvebool=='LMT'" v-preventReClick>BUY</button>-->
			</li>
			<!--<li>
				<div>
					<img src="../../../static/image/1487.png" />
				</div>
				<p><span>Price:</span><span class="color">{{money[1]}} ETH</span></p>
				<p><span style="flex: 1;">QUANTITY:</span><img @click="twonum>1?twonum--:''" src="../../../static/image/-.png"><span class="color" style="margin: 0 0.16rem;">{{twonum}}</span><img @click="twonum<10?twonum++:''" src="../../../static/image/+.png"></p>
				<button type="button" @click="$router.push('/blindbox?num='+twonum+'&money='+money[1]+'&sort=white')" v-movedown v-music>BUY</button>
				<!--<button type="button" :class="approvebool2=='LMT'?'preventReClick':''" @click="approve('LMT')" v-if="approvebool!='LMT'" v-preventReClick>APPROVE</button>
					<button type="button" @click="buybox('LMT')" v-else-if="approvebool=='LMT'" v-preventReClick>BUY</button>-->
			</li>-->
			<!--<li>
				<div class="left">
					<img src="../../../static/image/592.png" />
				</div>
				<div class="right">
					<p><span>Price:</span><span class="color">{{money}}LMG</span></p>
					<p><span style="width: 46%;">Quantity</span><span class="color">1</span></p>
					<button type="button" :class="approvebool2=='LMG'?'preventReClick':''" @click="approve('LMG')" v-if="approvebool!='LMG'" v-preventReClick>APPROVE</button>
					<button type="button" @click="buybox('LMG')" v-else-if="approvebool=='LMG'" v-preventReClick>BUY</button>
				</div>
			</li>-->
		</ul>
	</div>
</template>

<script>
	import web3tools from '../../web3/web3tools'
	export default {
		data() {
			return {
				num: 1,
				twonum:1,
				money: [0.095,0.01],
			}
		},
		mounted() {

		},
		methods: {
		},
	}
</script>

<style scoped>
	.TreasureChest ul {
		margin: .12rem .11rem 0;
	}
	
	.TreasureChest ul li {
		background: url(../../../static/image/chestBG.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		padding-bottom: 0.35rem;
		padding-top: 0.2533rem;
	}
	
	.TreasureChest ul li div {
		width: 50%;
    	margin: 0 auto;
		/*margin: 0 0.2533rem;*/
		border-radius: 0.1067rem;
		border: 2px solid #1FF3FF;
	}
	
	.TreasureChest ul li div img {
		width: 100%;
		border-radius: 0.1067rem;
		display: block;
	}
	
	.TreasureChest ul li p {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: .16rem;
		color: #ffffff;
		text-transform: uppercase;
	}
	
	.TreasureChest ul li p:nth-child(2) {
		margin: 0.2733rem 0.6433rem 0;
	}
	
	.TreasureChest ul li p:nth-child(3) {
		margin: 0.2rem 0.6433rem 0;
	}
	
	.TreasureChest ul li p img {
		width: 0.2067rem;
		height: 0.2067rem;
	}
	
	.TreasureChest ul li button {
		width: 2.36rem;
		height: 0.38rem;
		margin: 0.1533rem auto 0;
		font-size: .17rem;
		border-radius: 0.19rem;
		display: block;
		background: linear-gradient(#FFFC00, #DB7100);
		font-family: Magistral-Bold;
	}
	/*.TreasureChest ul li .left {
		border: .025rem solid #1FF3FF;
		border-radius: .1rem;
		margin: .1367rem .1367rem .2433rem .1633rem;
		width: 1.11rem;
		height: 1.08rem;
		background: #6D26B2;
	}
	
	.TreasureChest ul li .left img {
		width: 100%;
		height: 100%;
		display: block;
		border-radius: .1rem;
	}
	
	.TreasureChest ul li .right {
		width: 100%;
		flex: 1;
		margin-right: .19rem;
	}
	
	.TreasureChest ul li .right p {
		margin-top: .2367rem;
		display: flex;
		justify-content: space-between;
		font-size: .16rem;
		font-family: Magistral-Medium;
		color: #ffffff;
	}
	
	.TreasureChest ul li .right p:nth-child(2) {
		margin-top: .2rem;
	}
	
	.TreasureChest ul li .right p img {
		width: .2067rem;
		height: .2067rem;
	}
	
	.TreasureChest ul li .right button {
		margin-top: .1rem;
		height: .3rem;
		width: 100%;
		display: block;
		font-weight: bold;
		font-family: Magistral-Bold;
		border-radius: .15rem;
		background: linear-gradient(#FFFC00, #DB7100);
		font-size: .17rem;
	}*/
</style>