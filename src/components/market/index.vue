<template>
	<div class="market">
		<ul>
			<!--<li :class="$route.meta.parent=='/market/Treasure'?'active':''" v-if="$store.state.environment=='production'" @click.stop="$parent.$refs['pop'].pop=true" v-music>
				<img v-if="$route.meta.parent=='/market/Treasure'" src="../../../static/image/TREASURE-CHEST.png" />
				<img v-else src="../../../static/image/TREASURECHEST.png" />
				<p>VAULT SHOP</p>
			</li>-->
			<li :class="$route.meta.parent=='/market/Treasure'?'active':''" @click="$router.push('/market/TreasureChest')" v-music>
				<img v-if="$route.meta.parent=='/market/Treasure'" src="../../../static/image/TREASURE-CHEST.png" />
				<img v-else src="../../../static/image/TREASURECHEST.png" />
				<p>{{$t('mVAULTSHOP')}}</p>
			</li>
			<span></span>
			<li :class="$route.meta.parentname=='/market/NFTMarket'?'active':''" @click="$router.push('/market/NFTMarket?change=box')" v-music>
				<img v-if="$route.meta.parentname=='/market/NFTMarket'" src="../../../static/image/NFT-MARKET.png" />
				<img v-else src="../../../static/image/NFTMARKET.png" />
				<p>{{$t('mNFTMARKET')}}</p>
			</li>
			<span></span>
			<!--<li :class="$route.meta.parentname=='/market/Exchange'?'active':''"  v-if="$store.state.environment=='production'" @click.stop="$parent.$refs['pop'].pop=true" v-music>
				<img v-if="$route.meta.parentname=='/market/Exchange'" src="../../../static/image/EXCHANGE-.png" />
				<img v-else src="../../../static/image/EXCHANGE.png" />
				<p>EXCHANGE</p>
			</li>-->
			<li :class="$route.meta.parentname=='/market/Exchange'?'active':''"  @click="$router.push('/market/Exchange')" v-music>
				<img v-if="$route.meta.parentname=='/market/Exchange'" src="../../../static/image/EXCHANGE-.png" />
				<img v-else src="../../../static/image/EXCHANGE.png" />
				<p>{{$t('mEXCHANGE')}}</p>
			</li>
		</ul>
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		components: {},
		data() {
			return {}
		},
		mounted() {
		},
		methods: {},
	}
</script>

<style scoped>
	.market {
		width: 100%;
		margin-bottom: .93rem;
	}
	
	.market ul {
		background: #372A6D;
		border-bottom: 1px solid #9485D5;
		display: flex;
		position: absolute;
		z-index: 1;
		top: 0;
		    width: 100%;
	}
	
	.market ul li {
		width: 33.3%;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		justify-content: center;
		height: .8667rem;
		align-content: center;
	}
	
	.market ul li img {
		display: block;
		margin: 0 auto;
	}
	.market ul span{
		width: .0267rem;
    	height: .63rem;
    	background: #9701D5;
    	margin-top: .1233rem;
	}
	.market ul li:nth-child(1) img{
		width: .5167rem;
		height: .3633rem;
		margin-top: .1133rem;
	}
	.market ul li:nth-child(3) img{
		width: .37rem;
		height: .4733rem;
	}
	.market ul li:nth-child(5) img{
		width: .3367rem;
		height: .3567rem;
		margin-top: .12rem;
	}
	.market ul li p {
		font-size: .12rem;
		color: #D69FFF;
		text-align: center;
		margin-top: .09rem;
		font-weight: bold;
		font-family: Magistral-Bold;
		width: 100%;
	}
	
	.market ul .active p {
		color: #ffffff;
	}
</style>