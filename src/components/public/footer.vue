<template>
	<div class="footer">
		<ul>
			<li :class="$route.path=='/earn'?'active':''">
				<router-link to="/earn" v-music>
					<img v-if="$route.path=='/earn'" src="../../../static/image/earniconyes.png" />
					<img v-else src="../../../static/image/earnicon.png" />
					<p style="margin-top: 0.075rem;">{{$t('fEARN')}}</p>
				</router-link>
			</li>
			<li :class="$route.path=='/nft'?'active':''">
				<router-link :to="{path:'/nft',query:{change:'box'}}" v-music>
					<img v-if="$route.path=='/nft'" src="../../../static/image/NFTiconyes.png" />
					<img v-else src="../../../static/image/NFTicon.png" />
					<p>{{$t('fBAG')}}</p>
				</router-link>
			</li>
			<li :class="$route.path=='/'?'active':''">
				<router-link to="/" v-music>
					<img v-if="$route.path=='/'" src="../../../static/image/lobbyiconyes.png" />
					<img v-else src="../../../static/image/lobbyicon.png" />
					<p>{{$t('fLOBBY')}}</p>
				</router-link>
			</li>
			<li :class="$route.matched[0].name=='market'?'active':''">
				<router-link to="/market/NFTMarket?change=box" v-music>
					<img v-if="$route.matched[0].name=='market'" src="../../../static/image/Marketiconyes.png" />
					<img v-else src="../../../static/image/Marketicon.png" />
					<p>{{$t('fMARKET')}}</p>
				</router-link>
			</li>
			<li :class="$route.path=='/ready'?'active':''">
				<router-link to="/ready" v-music>
					<img v-if="$route.path=='/ready'" src="../../../static/image/readyiconyes.png" />
					<img v-else src="../../../static/image/readyicon.png" />
					<p>{{$t('fFREE')}}</p>
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
</script>

<style scoped>
	.footer {
		position: fixed;
		bottom: 0;
		background: url(../../../static/image/MenuBG.png);
		background-repeat: no-repeat;
		background-size: 100%;
		width: 100%;
		height: .8rem;
		z-index: 1;
	}
	
	.footer ul {
		width: 100%;
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
	}
	
	.footer ul li:nth-child(3) {
		width: 24%;
	}
	
	.footer ul li:nth-child(3) img {
		/*width: .54rem;
		height: .6rem;*/
		display: block;
		margin-top: .11rem;
	}
	
	.footer ul li {
		width: 19%;
	}
	
	.footer ul li img {
		margin: .25rem auto 0;
		/*width: .34rem;
		height: .34rem;*/
		width: auto;
		height: auto;
		display: block;
	}
	.footer ul li:nth-child(1) img{
		width: .2333rem;
		height: .2833rem;
	}
	.footer ul li:nth-child(2) img{
		width: .25rem;
		height: .2867rem;
	}
	.footer ul li:nth-child(3) img{
		width: .42rem;
		height: .43rem;
	}
	.footer ul li:nth-child(4) img{
		width: .3267rem;
		height: .2833rem;
	}
	.footer ul li:nth-child(5) img{
		width: .2267rem;
		height: .2867rem;
	}
	.footer ul li p {
		text-align: center;
		font-size: .12rem;
		line-height: .12rem;
		margin-top: .065rem;
		color: #D69FFF;
		font-family: "Magistral-Medium";
	}
	.footer ul .active p{
		color: #ffffff;
		font-weight: bold;
		font-family: "Magistral-Bold";
	}
</style>