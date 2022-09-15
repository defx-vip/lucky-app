<template>
	<div class="blindbox">
		<header>
			<img @click="$router.back(-1)" src="../../../static/image/headerback.png" v-music/>
			<p>{{$t('mMYSTERY')}}</p>
		</header>
		<ul>
			<li>
				<div>
					<img src="../../../static/image/1487.png" />
				</div>
				<p><span>{{$t('mPRICE')}}:</span><span class="color">{{$route.query.money}} ETH</span></p>
				<p><span style="flex: 1;">{{$t('mQUANTITY')}}</span><img @click="num>1?num--:''" src="../../../static/image/-.png"><span class="color" style="margin: 0 0.16rem;">{{$route.query.num}}</span><img @click="num<10?num++:''" src="../../../static/image/+.png"></p>
				<button type="button" @click="approve($event)" v-if="approvebool==false" v-movedown v-music v-preventReClick>{{$t('mAPPROVE')}}</button>
				<button type="button" @click="buybox($event)" v-else v-movedown v-music v-preventReClick>{{$t('mBUY')}}</button>
			</li>
		</ul>
	</div>
	
</template>
<script>
	import web3tools from '../../web3/web3tools'
	export default {
		components: {
		},
		data() {
			return {
				success: 1,
				approvebool:false,
			}
		},
		mounted() {
			this.allowance();
		},
		methods: {
			allowance(){
				web3tools.allowance(this.$store.state.ETHaddr, this.$cookies.get('walletAddress'),this.$store.state.Blindboxaddr, (e) => {
					console.log(e)
					if(Number(e)>(Number(this.$route.query.money)*Number(this.$route.query.num))){
						this.approvebool=true;
					}
				});
			},
			approve(event) {
				web3tools.approve(this.$store.state.ETHaddr, this.$store.state.Blindboxaddr, (Number(this.$route.query.money) *Number(this.$route.query.num)*10), (e) => {
					this.$toast('Please wait')
					$(event.target).addClass('preventReClick')
				}, (e) => {
					this.$toast('Approve succeeded')
					$(event.target).removeClass('preventReClick')
					this.approvebool = true;
				});
			},
			buybox(event) {
				if(this.$route.query.sort=='plain'){
					web3tools.mintPublic(this.$store.state.Blindboxaddr,this.$route.query.num, (e) => {
						this.$toast('Please wait')
						$(event.target).addClass('preventReClick')
					}, (e) => {
						this.$router.push('/nft?change=box')
					});
				}else{
					web3tools.mintWhitelist(this.$store.state.Blindboxaddr,this.$route.query.num, (e) => {
						this.$toast('Please wait')
						$(event.target).addClass('preventReClick')
					}, (e) => {
						this.$router.push('/nft?change=box')
					});
				}
			},
		},
	}
</script>

<style scoped>
	.blindbox {
		height: 90vh;
		display: flex;
		align-items: center;
	}
	.blindbox header{
		position: fixed;
		width: 100%;
		top: 0;
	}
	.blindbox ul {
		width: 100%;
	}
	
	.blindbox ul li {
		background: url(../../../static/image/chestBG.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		padding-bottom: 0.35rem;
		padding-top: 0.2533rem;
		margin: 0 0.11rem;
	}
	
	.blindbox ul li div {
		width: 50%;
    	margin: 0 auto;
		/*margin: 0 0.2533rem;*/
		border-radius: 0.1067rem;
		border: 2px solid #1FF3FF;
	}
	
	.blindbox ul li div img {
		width: 100%;
		border-radius: 0.1067rem;
		display: block;
	}
	
	.blindbox ul li p {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: .16rem;
		color: #ffffff;
		text-transform: uppercase;
	}
	
	.blindbox ul li p:nth-child(2) {
		margin: 0.2733rem 0.6433rem 0;
	}
	
	.blindbox ul li p:nth-child(3) {
		margin: 0.2rem 0.6433rem 0;
	}
	
	.blindbox ul li p img {
		width: 0.2067rem;
		height: 0;
	}
	
	.blindbox ul li button {
		width: 2.36rem;
		height: 0.38rem;
		margin: 0.1533rem auto 0;
		font-size: .17rem;
		border-radius: 0.19rem;
		display: block;
		background: linear-gradient(#FFFC00, #DB7100);
		font-family: Magistral-Bold;
	}
</style>