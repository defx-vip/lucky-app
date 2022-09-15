<template>
	<div class="nftdetails">
		<header>
			<img @click="$router.back(-1)" src="../../../static/image/headerback.png" v-music/>
			<p>NFT {{$t('bDetails')}}</p>
		</header>
		<div class="top">
			<div class="img">
				<div>
					<img v-if="$route.query.sort == 'box'" src="../../../static/image/1487.png" />
					<img v-else-if="properties!=''" :src="properties.image" />
				</div>
			</div>
			<div class="details">
				<ul>
					<li v-if="$route.query.sort!='box'">
						<p>{{$t('bLevel')}}:</p>
						<span>{{levelnum}}</span>
					</li>
					<li v-if="$route.query.sort!='box'">
						<p>{{$t('bRarity')}}:</p>
						<span>{{$route.query.sort=='ordinary'?$t('mOrdinary'):$t('mRare')}}</span>
					</li>
					<li>
						<p>{{$t('bPrice')}}:</p>
						<span>{{Number($route.query.price)/1000000000000000000}} ETH</span>
					</li>
					<li>
						<p>{{$t('mTokenID')}}:</p>
						<span>{{$route.query.id}}</span>
					</li>
					<li>
						<p>{{$t('bSeller')}}:</p>
						<span>{{$route.query.seller.substring(0,6)}}***{{$route.query.seller.substring((($route.query.seller.length)-4),$route.query.seller.length)}}</span>
					</li>
				</ul>
				<!--<img v-if="$route.query.sort!='box'" src="../../../static/image/mark.png" @click="$router.push('/rule?sort='+$route.query.sort)" />-->
			</div>
		</div>
		<div class="bottom" v-if="$route.query.sort!='box'">
			<h1>{{$t('bProperties')}}</h1>
			<div class="nftdetailslist">
				<div class="detailsin">
					<div class="title" @click="change==1?change=0:change=1">
						<p><img src="../../../static/image/detailsin.png">{{$t('bDetails')}}</p>
						<img :class="change==1?'down':''" src="../../../static/image/detailsdown.png" />
					</div>
					<ul v-show="change==1">
						<li>
							<p>{{$t('bContractAddress')}}:<span>{{$store.state.NFTaddr.substring(0,6)}}****{{$store.state.NFTaddr.substring((($store.state.NFTaddr.length)-3),$store.state.NFTaddr.length)}}</span></p><img src="../../../static/image/detailscopy.png" v-clipboard:copy="$store.state.NFTaddr" v-clipboard:success="copy" /></li>
						<li>
							<p>{{$t('bTokenStandard')}}:<span>ERC-721</span></p>
						</li>
						<li>
							<p>{{$t('bBlockchain')}}:<span>{{networkunit}}</span></p>
						</li>
					</ul>
				</div>
				<div class="about">
					<div class="title" @click="change==2?change=0:change=2">
						<p><img src="../../../static/image/detailsabout.png">{{$t('bAboutLuckyMeta')}}</p>
						<img :class="change==2?'down':''" src="../../../static/image/detailsdown.png" />
					</div>
					<div class="aboutin" v-show="change==2">
						<p>{{properties.description}}</p>
					</div>
				</div>
				<div class="properties">
					<div class="title" @click="change==3?change=0:change=3">
						<p><img src="../../../static/image/detailsProperties.png">{{$t('bProperties')}}</p>
						<img :class="change==3?'down':''" src="../../../static/image/detailsdown.png" />
					</div>
					<ul v-show="change==3">
						<li v-for="(item, index) in properties.attributes">
							<h1>{{item.trait_type}}</h1>
							<p>{{item.value}}</p>
							<!--<span>100% have this trait</span>-->
						</li>
					</ul>
				</div>
				<div class="skill" v-if="$store.state.environment!='production'">
					<div class="title" @click="change==4?change=0:change=4">
						<p><img src="../../../static/image/skill.png">{{$t('bSkill')}}</p>
						<img :class="change==4?'down':''" src="../../../static/image/detailsdown.png" />
					</div>
					<ul v-show="change==4">
						<li>{{$t('bLuckyvalue')}}</li>
						<li>{{$t('bLastingvalue')}}</li>
						<li>{{$t('bAttackpower')}}</li>
						<li>{{$t('bPotentialpoint')}}</li>
					</ul>
				</div>
			</div>
		</div>
		<button type="button" :class="$route.query.seller.toLowerCase()==$cookies.get('walletAddress').toLowerCase()?'preventReClick':''" @click.stop="$router.push('/marketbuy?id='+$route.query.id+'&price='+$route.query.price+'&sort='+$route.query.sort)" v-movedown v-music>{{$t('mBUY')}}</button>
	</div>
</template>

<script>
	import web3tools from '../../web3/web3tools'
	let that
	export default {
		data() {
			return {
				//				upgrade: 0,
				change: 0,
				//				approvebool: false,
				levelnum: 0,
				//				leveltime: false,
				//				leveltimelist: [],
				//				levelprice: 0,
				//				levelpricegive: 0,
				//				nextlevelpricegive: 0,
				properties: '',
				networkunit:process.env.networkunit,
			}
		},
		mounted() {
			that = this
			if(this.$route.query.sort != 'box') {
				this.roleLevel()
				this.tokenurl()
			}
		},
		methods: {
			tokenurl() {
				web3tools.tokenURI(this.$store.state.NFTaddr, this.$route.query.id, (e) => {
					this.$nftget(e, {}).then((res) => {
						that.properties = res
					})
				});
			},
			roleLevel() {
				web3tools.personLevel(this.$store.state.gameaddr, this.$route.query.id, (e) => {
					this.levelnum = e;
					that.$post(that.$apiUtil.fileUpdate, {
						key: that.$route.query.id,
						level: e
					}).then((res) => {

					})
				});
				//				web3tools.costForLevelup(this.$store.state.gameaddr, this.$route.query.id, (e) => {
				//					this.levelprice = e;
				//				});
				//				web3tools.bonusForLogin(this.$store.state.gameaddr, this.$route.query.id, (e) => {
				//					this.levelpricegive = e;
				//				});
				//				web3tools.bonusForLoginNext(this.$store.state.gameaddr, this.$route.query.id, (e) => {
				//					this.nextlevelpricegive = e;
				//				});
			},
			copy() {
				this.$toast('copied')
			},
		},
	}
</script>

<style scoped>
	.nftdetails {
		width: 100%;
		margin-bottom: .93rem;
	}
	
	.nftdetails>button {
		width: 2.32rem;
		height: 0.34rem;
		display: block;
		margin: 0.0967rem auto 0;
		border-radius: 0.17rem;
		font-size: .17rem;
		font-family: 'Magistral-Bold';
		background: linear-gradient(#FFFC00, #DB7100);
	}
	
	.nftdetails .top {
		background: url(../../../static/image/detailsbottom.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		margin: 0.2633rem 0.11rem 0.08rem;
		padding-bottom: .2833rem;
	}
	
	.nftdetails .top .img {
		display: flex;
		justify-content: center;
		margin: 0 0.2rem;
		position: relative;
	}
	
	.nftdetails .top .img div {
		height: 1.44rem;
		margin-top: 0.1733rem;
		border: 2px solid #35E7FF;
		border-radius: 0.1rem;
	}
	
	.nftdetails .top .img div img:nth-child(1) {
		height: 100%;
		display: block;
		border-radius: 0.1rem;
	}
	
	.nftdetails .top .img>img {
		position: absolute;
		width: 0.56rem;
		top: -0.15rem;
		right: -0.23rem;
	}
	
	.nftdetails .top .details {
		margin: 0.1033rem 0.33rem 0;
		border: 1px dashed #ffffff;
		border-radius: 0.0667rem;
		padding: 0.14rem 0.15rem 0.18rem;
		position: relative;
	}
	.nftdetails .top .details>img{
		position: absolute;
    	width: 0.2rem;
    	top: 0.0667rem;
    	right: 0.0733rem;
	}
	.nftdetails .top .details ul li {
		display: flex;
		margin-bottom: 0.06rem;
		align-items: center;
	}
	
	.nftdetails .top .details ul li p {
		color: #ffffff;
		font-size: .16rem;
		font-family: 'Magistral-Bold';
	}
	
	.nftdetails .top .details ul li span {
		color: #F5D600;
		margin-left: 0.2rem;
		font-size: .16rem;
		font-family: 'Magistral-Bold';
	}
	
	.nftdetails .top .details ul li:nth-child(4) p,
	.nftdetails .top .details ul li:nth-child(4) span,
	.nftdetails .top .details ul li:nth-child(5) p,
	.nftdetails .top .details ul li:nth-child(5) span {
		font-family: 'Magistral-Book';
		font-size: .14rem;
		color: #ffffff;
	}
	
	.nftdetails .top .details ul li:last-child {
		margin: 0;
	}
	
	.nftdetails .bottom {
		background: url(../../../static/image/detailsbottom.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		margin: 0 0.11rem;
		padding-bottom: 0.5833rem;
	}
	
	.nftdetails .bottom>h1 {
		padding-top: 0.25rem;
		text-align: center;
		font-size: .2rem;
		color: #DFE117;
		text-transform: uppercase;
		margin-bottom: 0.1767rem;
	}
	
	.nftdetails .bottom .nftdetailslist {
		margin: 0 0.22rem;
		border: 1px solid #35E7FF;
		border-radius: 0.1333rem;
	}
	
	.nftdetails .bottom .nftdetailslist .title {
		height: 0.63rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-top: 1px solid #35E7FF;
	}
	
	.nftdetails .bottom .nftdetailslist>div:first-child .title {
		border: 0
	}
	
	.nftdetails .bottom .nftdetailslist .title p {
		color: #ffffff;
		font-family: 'Magistral-Bold';
		display: flex;
		align-items: center;
		font-size: .16rem;
	}
	
	.nftdetails .bottom .nftdetailslist .title p img {
		height: 0.16rem;
		margin-right: 0.1733rem;
		margin-left: 0.1867rem;
	}
	
	.nftdetails .bottom .nftdetailslist .title>img {
		width: 0.16rem;
		margin-right: 0.23rem;
	}
	
	.nftdetails .bottom .nftdetailslist .title>.down {
		transform: rotate(180deg);
	}
	
	.nftdetails .bottom .nftdetailslist .detailsin ul {
		padding: 0.2333rem 0.18rem 0.3333rem;
		border-top: 1px solid #35E7FF;
	}
	
	.nftdetails .bottom .nftdetailslist .detailsin ul li {
		display: flex;
		align-items: center;
		margin-bottom: 0.16rem;
	}
	
	.nftdetails .bottom .nftdetailslist .detailsin ul li:nth-child(4) {
		margin-bottom: 0;
	}
	
	.nftdetails .bottom .nftdetailslist .detailsin ul li p {
		font-size: .14rem;
		color: #ffffff;
	}
	
	.nftdetails .bottom .nftdetailslist .detailsin ul li p span {
		font-family: 'Magistral-Book';
		margin-left: 0.1rem;
	}
	
	.nftdetails .bottom .nftdetailslist .detailsin ul li img {
		width: 0.1867rem;
		margin-left: 0.23rem;
	}
	
	.nftdetails .bottom .nftdetailslist .aboutin {
		padding: 0.17rem 0.155rem;
		border-top: 1px solid #35E7FF;
		min-height: 1.3rem;
	}
	
	.nftdetails .bottom .nftdetailslist .aboutin p {
		font-size: .14rem;
		color: #ffffff;
	}
	
	.nftdetails .bottom .nftdetailslist .aboutin p span {
		font-family: 'Magistral-Book';
		margin-left: 0.1rem;
	}
	
	.nftdetails .bottom .nftdetailslist .properties ul {
		padding: 0.11rem 0.09rem 0.02rem;
		border-top: 1px solid #35E7FF;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	
	.nftdetails .bottom .nftdetailslist .properties ul li {
		width: 1.38rem;
		/*height: 0.78rem;*/
		background: #581EA1;
		border-radius: 0.0667rem;
		border: 1px solid #35E7FF;
		margin-bottom: 0.0967rem;
		padding-bottom: .12rem;
	}
	
	.nftdetails .bottom .nftdetailslist .properties ul li h1 {
		font-size: .12rem;
		text-align: center;
		color: #F2C900;
		margin-bottom: 0.03rem;
		margin-top: 0.15rem;
		text-transform: uppercase;
	}
	
	.nftdetails .bottom .nftdetailslist .properties ul li p {
		margin: 0 0.18rem;
		font-size: .14rem;
		color: #ffffff;
		font-family: 'Magistral-Bold';
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		text-align: center;
	}
	
	.nftdetails .bottom .nftdetailslist .properties ul li span {
		margin-top: 0.03rem;
		color: #35E7FF;
		font-size: .12rem;
		text-align: center;
		display: block;
	}
	.nftdetails .bottom .nftdetailslist .skill ul{
		border-top: 1px solid #35E7FF;
    	padding-left: 0.18rem;
    	padding-bottom: 0.25rem;
	}
	.nftdetails .bottom .nftdetailslist .skill ul li{
		margin-top: 0.135rem;
    	color: #ffffff;
    	font-size: .14rem;
	}
</style>