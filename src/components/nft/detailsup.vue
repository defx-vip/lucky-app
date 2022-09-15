<template>
	<div class="nftdetails">
		<header>
			<img @click="$router.back(-1)" src="../../../static/image/headerback.png" v-music/>
			<p>{{$t('bNFTupgrade')}}</p>
		</header>
		<div class="top">
			<div class="img">
				<img v-if="$route.query.sort == 'box'" src="../../../static/image/1487.png" />
				<img v-else-if="properties!=''" :src="properties.image" />
			</div>
			<div class="detailstwo">
				<div>
					<p>{{$t('mTokenID')}}:<span>{{$route.query.id}}</span></p>
					<p>{{$t('bLevel')}}:<span>{{levelnum}}</span></p>
					<img src="../../../static/image/mark.png" @click="$router.push('/rule?sort='+$route.query.sort)" v-music/>
				</div>
				<ul>
					<li>
						<p>{{$t('bCurrentRewards')}}:</p>
						<span>{{levelpricegive}} {{$route.query.sort=="rare"?'LMT':'LMG'}}</span>
					</li>
					<li>
						<p>{{$t('bRequiredforupgrade')}}:</p>
						<span>{{levelprice}} {{$route.query.sort=="rare"?'LMT':'LMG'}}</span>
					</li>
					<li>
						<p>{{$t('bRewardsafterupgrade')}}:</p>
						<span>{{nextlevelpricegive}} {{$route.query.sort=="rare"?'LMT':'LMG'}}</span>
					</li>
				</ul>
				<button type="button" :class="Number(levelnum)==10?'preventReClick':''" @click="$router.push('/upgradein?id='+$route.query.id+'&sort='+$route.query.sort)" v-movedown v-music>{{$t('bCONFIRM')}}</button>
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
				properties: '',
				levelnum: 0,
				levelprice: 0,
				levelpricegive: 0,
				nextlevelpricegive: 0,
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
				web3tools.costForLevelup(this.$store.state.gameaddr, this.$route.query.id, (e) => {
					this.levelprice = e;
				});
				web3tools.bonusForLogin(this.$store.state.gameaddr, this.$route.query.id, (e) => {
					this.levelpricegive = e;
				});
				web3tools.bonusForLoginNext(this.$store.state.gameaddr, this.$route.query.id, (e) => {
					this.nextlevelpricegive = e;
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
	
	.nftdetails .top .details ul li:nth-child(3) {
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
</style>