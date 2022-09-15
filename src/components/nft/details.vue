<template>
	<div class="nftdetails">
		<header>
			<img @click="$router.back(-1)" src="../../../static/image/headerback.png" />
			<p>{{$t('bNFTDETAIL')}}</p>
		</header>
		<div class="top">
			<div class="img">
				<img v-if="$route.query.sort == 'box'" src="../../../static/image/1487.png" />
				<img v-else-if="properties!=''" :src="properties.image" />
			</div>
			<div class="details">

				 <!-- 激活 -->
				<button type="button" v-if="($route.query.price==''||$route.query.price==undefined)&&$route.query.sort!='box'&&pledge._isLink==false" @click="linkNft($event)"><img src="../../../static/image/activation.png">{{$t('bactivation')}}</button>
				
				<!-- 確定质押 -->
				<button type="button" v-else-if="($route.query.price==''||$route.query.price==undefined)&&$route.query.sort!='box'&&pledge._isLink==true&&pledge._isDepos==false&&approvebool==false" @click="approve($event)"><img src="../../../static/image/pledge.png">{{$t('bapprove')}}</button>
				
				<!-- 质押 -->
				<button type="button" v-else-if="($route.query.price==''||$route.query.price==undefined)&&$route.query.sort!='box'&&pledge._isLink==true&&pledge._isDepos==false&&approvebool==true" @click="depositeNft($event)"><img src="../../../static/image/pledge.png">{{$t('epledge')}}</button>
				

				 <!-- 确定赎回 -->
				<button type="button" v-else-if="($route.query.price==''||$route.query.price==undefined)&&$route.query.sort!='box'&&pledge._isLink==true&&pledge._isDepos==true" @click="withdrawNft($event)"><img src="../../../static/image/redemption.png">{{$t('eredemption')}}</button>
				
				
				<ul>
					<li>
						<p>{{$t('mTokenID')}}:</p>
						<span>{{$route.query.id}}</span>
					</li>
					<li v-if="$route.query.sort!='box'">
						<p>{{$t('bLevel')}}:</p>
						<span>{{levelnum}}
							<!--<img src="../../../static/image/mark.png" @click="$router.push('/rule?sort='+$route.query.sort)" v-music/>-->
						</span>
					</li>
					<li v-if="$route.query.sort!='box'">
						<p>{{$t('bRarity')}}:</p>
						<span>{{$route.query.sort=='ordinary'?$t('mOrdinary'):$t('mRare')}}</span>
					</li>
					<li>
						<p>{{$t('bOwner')}}:</p>
						<span>{{$store.state.walletAddress.substring(0,6)}}***{{$store.state.walletAddress.substring((($store.state.walletAddress.length)-4),$store.state.walletAddress.length)}}</span>
					</li>
				</ul>
				<div :style="{justifyContent: ($route.query.sort=='box'?'center':'')}">
					<button type="button" v-if="$route.query.sort!='box'" :class="($route.query.price!=''&&$route.query.price!=undefined)||pledge==''||pledge._isLink==false||pledge._isDepos==true?'preventReClick':''" @click="$router.push('/upgradein?id='+$route.query.id+'&sort='+$route.query.sort)" v-movedown v-music>{{$t('bUPGRADE')}}</button>
					<button type="button" :class="(pledge!=''&&pledge._isDepos!=true)||$route.query.sort=='box'?'':'preventReClick'" v-if="$route.query.price==''||$route.query.price==undefined" @click="$router.push('/sell?id='+$route.query.id+'&sort='+$route.query.sort)" v-movedown v-music>{{$t('bSELL')}}</button>
					<button type="button" :class="(pledge!=''&&pledge._isDepos!=true)||$route.query.sort=='box'?'':'preventReClick'" v-else @click="$router.push('/offsell?id='+$route.query.id+'&price='+$route.query.price+'&sort='+$route.query.sort)" v-movedown v-music>{{$t('boffsell')}}</button>
				</div>
			</div>
		</div>
		<!--<div class="top">
			<div class="img">
				<div>
					<img v-if="$route.query.sort == 'box'" src="../../../static/image/1487.png" />
					<img v-else-if="properties!=''" :src="properties.image" />
					
				</div>
				<img v-if="$route.query.price==''||$route.query.price==undefined" @click="$router.push('/sell?id='+$route.query.id+'&sort='+$route.query.sort)" src="../../../static/image/detailssale.png" />
				<img v-else @click="$router.push('/offsell?id='+$route.query.id+'&price='+$route.query.price+'&sort='+$route.query.sort)" src="../../../static/image/detailsoffsale.png" />
			</div>
			<div class="details">
				<ul>
					<li>
						<p>ID:</p>
						<span>{{$route.query.id}}</span>
					</li>
					<li v-if="$route.query.sort!='box'">
						<p>Levels:</p>
						<span>{{levelnum}}</span>
					</li>
					<li v-if="$route.query.sort!='box'">
						<p>power:</p>
						<span>{{levelpricegive}}{{$route.query.unit}}</span>
					</li>
					<li>
						<p>Holder:</p>
						<span>{{$store.state.walletAddress.substring(0,6)}}***{{$store.state.walletAddress.substring((($store.state.walletAddress.length)-4),$store.state.walletAddress.length)}}</span>
					</li>
				</ul>
				<p>NFT upgrade rules</p>
				<!--<p @click="$router.push('/rule')">NFT upgrade rules</p>
			</div>
			<div class="button" v-if="$route.query.sort!='box'">
				<div>
					<button type="button" :class="Number(levelnum)==10?'preventReClick':''" @click="$router.push('/upgradein?id='+$route.query.id+'&sort='+$route.query.sort)">upgrade</button>
					<p>Upgrade Need：{{levelprice}}{{$route.query.unit}}</p>
				</div>
				<div v-if="$route.query.price==''||$route.query.price==undefined">
					<button type="button" @click="bonusForIds" :class="leveltime==false?'preventReClick':''">receive</button>
					<p>Countdown：<span>{{leveltimelist[0].timeData._H}}:{{leveltimelist[0].timeData._M}}:{{leveltimelist[0].timeData._S}}</span></p>
				</div>
			</div>
		</div>-->
		<div class="bottom" v-if="$route.query.sort!='box'">
			<h1>{{$t('bDESCRIPTION')}}</h1>
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
	</div>
</template>

<script>
	import web3tools from '../../web3/web3tools'
	let that
	export default {
		data() {
			return {
				change: 0,
				approvebool: false,
				levelnum: 0,
				levelprice: 0,
				levelpricegive: 0,
				properties: '',
				networkunit:process.env.networkunit,
				pledge:'',
				approvebool:false,
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
				//				let addr;
				//				if(this.$route.query.unit == 'LMT') {
				//					addr = this.$store.state.LMTgameaddr;
				//				} else if(this.$route.query.unit == 'LMG') {
				//					addr = this.$store.state.LMGgameaddr;
				//				}
				web3tools.personLevel(this.$store.state.gameaddr, this.$route.query.id, (e) => {
					console.log(e)
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
				web3tools.nftInfo(this.$store.state.gameaddr, this.$route.query.id, (e) => {
					console.log(this.$store.state.gameaddr)
					console.log(this.$route.query.id)
					console.log(e)
					this.pledge=e;
				});
				web3tools.isApprovedForAll(this.$store.state.NFTaddr,this.$cookies.get('walletAddress'), this.$store.state.gameaddr, (e) => {
					console.log(e)
					this.approvebool=e;
				});
			},
			linkNft(event) {
				web3tools.linkNft(this.$store.state.gameaddr, this.$route.query.id, (e) => {
					this.$toast('Please wait')
					$(event.target).addClass('preventReClick')
				}, (e) => {
					that.roleLevel()
					setTimeout(function() {
						that.roleLevel()
					}, 500)
					this.$toast('Success')
					$(event.target).removeClass('preventReClick')
				});
			},
			approve(event){
				web3tools.approveto(this.$store.state.NFTaddr, this.$store.state.gameaddr, (e) => {
					this.$toast('Please wait')
					$(event.target).addClass('preventReClick')
				}, (e) => {
					this.$toast('Approve succeeded')
					$(event.target).removeClass('preventReClick')
					this.approvebool = true;
				});
			},
			depositeNft(event) {
				web3tools.depositeNft(this.$store.state.gameaddr, this.$route.query.id, (e) => {
					this.$toast('Please wait')
					$(event.target).addClass('preventReClick')
					if(this.$cookies.get('isNFT') == 1 && this.$cookies.get('head') == this.$route.query.id&&this.$route.query.sort!='box') {
						that.$post(that.$apiUtil.updateHead, {
							playerId: that.$cookies.get('playerId'),
							walletAddress: that.$cookies.get('walletAddress'),
							head: 0,
							isNFT: 0,
						}).then((res) => {
							that.$store.state.head = 1;
							that.$cookies.set("head", 1, {
								expires: 0
							});
							that.$store.state.isNFT = 0;
							that.$cookies.set("isNFT", 0, {
								expires: 0
							});
						})
					}
					if(this.$cookies.get('playerTockenId') == this.$route.query.id&&this.$route.query.sort!='box') {
						that.$post(that.$apiUtil.updateNFTLevel, {
							playerId: that.$cookies.get('playerId'),
							walletAddress: that.$cookies.get('walletAddress'),
							playerTockenId: 0,
							nftLevel: 1,
							rare:2
						}).then((res) => {
							this.$store.state.playerTockenId = 0;
							this.$cookies.set("playerTockenId", 0, {
								expires: 0
							});
						})
					}
				}, (e) => {
					that.roleLevel()
					setTimeout(function() {
						that.roleLevel()
					}, 500)
					this.$toast('Success')
					$(event.target).removeClass('preventReClick')
				});
			},
			withdrawNft(event) {
				web3tools.withdrawNft(this.$store.state.gameaddr, this.$route.query.id, (e) => {
					this.$toast('Please wait')
					$(event.target).addClass('preventReClick')
				}, (e) => {
					that.roleLevel()
					setTimeout(function() {
						that.roleLevel()
					}, 500)
					this.$toast('Success')
					$(event.target).removeClass('preventReClick')
				});
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
	
	.nftdetails .top .img {
		margin: 0.14rem 0.16rem 0.1rem;
		border: 2px solid #35E7FF;
		border-radius: 0.2rem;
		background: #3F6DB8;
	}
	
	.nftdetails .top .img img {
		width: 100%;
		display: block;
		border-radius: 0.2rem;
	}
	
	.nftdetails .top .details,
	.nftdetails .top .detailstwo {
		background: url(../../../static/image/detailstop.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		margin: 0 0.12rem;
		position: relative;
	}
	.nftdetails .top .details>button{
		position: absolute;
    	top: 0.12rem;
    	right: 0.14rem;
    	width: 1.3rem;
    	height: 0.25rem;
   		display: flex;
    	align-items: center;
    	justify-content: center;
    	font-size: .14rem;
    	font-family: 'Magistral-Bold';
    	text-transform: uppercase;
        background: linear-gradient(#FFFC00, #DB7100);
    	border-radius: 0.05rem;
	}
	.nftdetails .top .details>button img{
		width: 0.16rem;
    	margin-right: 0.05rem;
	}
	.nftdetails .top .details ul {
		padding: 0.2433rem 0.2367rem 0;
	}
	
	.nftdetails .top .details ul li {
		display: flex;
		margin-bottom: 0.05rem;
	}
	
	.nftdetails .top .details ul li p {
		font-size: .16rem;
		color: #ffffff;
		margin-right: 0.18rem;
	}
	
	.nftdetails .top .details ul li span {
		font-family: 'Magistral-Book';
		font-size: .16rem;
		color: #F5D600;
	}
	
	.nftdetails .top .details ul li span img {
		width: 0.1333rem;
		margin-left: 0.11rem;
		vertical-align: middle;
		margin-top: -3px;
	}
	
	.nftdetails .top .details ul li:nth-child(4) {
		margin: 0;
	}
	
	.nftdetails .top .details div {
		padding: 0.26rem 0.28rem 0.4rem;
		display: flex;
		justify-content: space-between;
	}
	
	.nftdetails .top .details div button {
		width: 1.2rem;
		height: 0.4rem;
		border-radius: 0.0667rem;
		font-family: 'Magistral-Bold';
		font-size: .16rem;
		text-transform: uppercase;
		background: linear-gradient(#FFFC00, #DB7100);
	}
	.nftdetails .top .detailstwo{
		padding-bottom: .2833rem;
	}
	
	.nftdetails .top .detailstwo>div {
		padding: 0.1933rem 0.35rem 0;
		position: relative;
	}
	
	.nftdetails .top .detailstwo>div p {
		color: #ffffff;
		font-size: .16rem;
		margin-bottom: 0.05rem;
	}
	
	.nftdetails .top .detailstwo>div p span {
		color: #F5D600;
		margin-left: 0.16rem;
		font-family: 'Magistral-Book';
	}
	
	.nftdetails .top .detailstwo>div img {
		position: absolute;
		top: 0.1933rem;
		right: 0.4rem;
	}
	
	.nftdetails .top .detailstwo>div p:nth-child(2) {
		margin: 0;
	}
	
	.nftdetails .top .detailstwo ul {
		margin: 0.05rem 0.21rem 0;
		padding: 0.13rem 0.125rem;
		border-radius: 0.0667rem;
		border: 1px dashed #ffffff;
	}
	
	.nftdetails .top .detailstwo ul li {
		display: flex;
		justify-content: space-between;
		margin-bottom: 0.06rem;
	}
	
	.nftdetails .top .detailstwo ul li p {
		color: #ffffff;
		font-size: .14rem;
	}
	
	.nftdetails .top .detailstwo ul li span {
		font-size: .16rem;
		color: #F5D600;
		font-family: 'Magistral-Book';
	}
	
	.nftdetails .top .detailstwo ul li:nth-child(3) {
		margin: 0;
	}
	.nftdetails .top .detailstwo button{
		width: 1.2rem;
		height: 0.4rem;
		border-radius: 0.0667rem;
		font-family: 'Magistral-Bold';
		font-size: .16rem;
		text-transform: uppercase;
		background: linear-gradient(#FFFC00, #DB7100);
		margin: .1667rem auto 0;
		display: block;
	}
	/*.nftdetails .top {
		background: url(../../../static/image/detailstop.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		margin: 0.2633rem 0.11rem 0.08rem;
		padding-bottom: .3133rem;
	}
	
	.nftdetails .top .img {
		display: flex;
		justify-content: center;
		margin: 0 0.2rem;
		position: relative;
	}
	
	.nftdetails .top .img div {
		height: 1.12rem;
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
		margin-left: 0.2267rem;
		position: relative;
	}
	
	.nftdetails .top .details ul li {
		display: flex;
		margin-top: 0.1167rem;
		align-items: center;
	}
	
	.nftdetails .top .details ul li p {
		font-size: .14rem;
		color: #ffffff;
		min-width: 0.61rem;
	}
	
	.nftdetails .top .details ul li span {
		font-size: .15rem;
		color: #F5D600;
		margin-left: .16rem;
		font-family: Magistral-Book;
	}
	
	.nftdetails .top .details>p {
		position: absolute;
		top: -0.0433rem;
		right: 0.2rem;
		height: 0.26rem;
		border: 1px solid #FFFFFF;
		border-radius: 0.0667rem;
		padding: 0 0.06rem;
		color: #ffffff;
		text-transform: uppercase;
		font-size: .12rem;
		display: flex;
		align-items: center;
		font-family: 'Magistral-Book';
	}
	
	.nftdetails .top .button {
		margin-top: 0.09rem;
		margin-left: 0.2rem;
	}
	
	.nftdetails .top .button div {
		display: flex;
		align-items: center;
	}
	
	.nftdetails .top .button div:nth-child(1) {
		margin-bottom: .053rem;
	}
	
	.nftdetails .top .button div button {
		height: 0.28rem;
		width: 1.04rem;
		border-radius: 0.14rem;
		text-transform: uppercase;
		font-size: .14rem;
		margin-right: 0.1667rem;
		background: linear-gradient(#FFFC00, #DB7100);
	}
	
	.nftdetails .top .button div p {
		color: #ffffff;
		font-size: .14rem;
	}
	
	.nftdetails .top .button div p span {
		color: #FFCB00;
		margin-left: 0.1rem;
	}*/
	
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
	
	.nftdetails .bottom .nftdetailslist .detailsin ul li:nth-child(3) {
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