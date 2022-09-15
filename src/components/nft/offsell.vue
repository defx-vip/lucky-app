<template>
	<div class="offsell">
		<div class="cashout">
			<h6>{{$t('bCANCELTHESALE')}}</h6>
			<div>
				<img v-if="$route.query.sort == 'box'" style="object-fit: cover;" src="../../../static/image/1487.png" />
				<img v-else-if="show!=''" :src="show.image" />
			</div>
			<h1>{{$t('bSALEPRICE')}}</h1>
			<p><input type="text" :value="Number($route.query.price)/1000000000000000000" readonly><span>ETH</span></p>
			<button type="button" @click="offsale" v-movedown v-music v-preventReClick>{{$t('bCONFIRMCANCEL')}}</button>
		</div>
	</div>
</template>

<script>
	import web3tools from '../../web3/web3tools'
	export default {
		data() {
			return {
				show: '',
			}
		},
		mounted() {
			if(this.$route.query.sort!='box'){
				this.tokenurl();
			}
		},
		methods: {
			tokenurl() {
				let that=this;
				web3tools.tokenURI(this.$store.state.NFTaddr, this.$route.query.id, (e) => {
					this.$nftget(e, {}).then((res) => {
						that.show=res
					})
				});
			},
			offsale() {
				let addr;
				if(this.$route.query.sort == "box") {
					addr = this.$store.state.BOXmarketaddr
				} else {
					addr = this.$store.state.NFTmarketaddr
				}
				web3tools.cancelOrder(addr,this.$route.query.id, (e) => {
					this.$toast('Please wait')
				}, (e) => {
					this.$router.go(-2);
				});
			},
		},
	}
</script>

<style scoped>
	.offsell {
		width: 100%;
		height: 90vh;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.offsell .cashout {
		background: url(../../../static/image/BG24.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		margin: 0 .11rem;
		width: 100%;
	}
	
	.offsell .cashout h6 {
		text-align: center;
		font-size: .28rem;
		line-height: .2033rem;
		color: #ffffff;
		padding-top: .33rem;
		font-family: Magistral-Bold;
	}
	
	.offsell .cashout>div {
		width: 1.84rem;
		/*height: 1.53rem;*/
		margin: .1633rem auto .3167rem;
		border-radius: .1333rem;
		border: .033rem solid #35E7FF;
		background: #581EA1;
	}
	
	.offsell .cashout>div img {
		display: block;
		border-radius: .1333rem;
		width: 100%;
		height: 100%;
	}
	
	.offsell .cashout h1 {
		text-align: center;
		color: #ffffff;
		font-size: .2167rem;
		line-height: .1533rem;
		margin-bottom: .11rem;
		font-family: Magistral-Medium;
	}
	
	.offsell .cashout>p {
		background: #490785;
		margin: 0 .24rem;
		border-radius: .19rem;
		border: 1px solid #C18DF4;
		position: relative;
	}
	
	.offsell .cashout>p input {
		font-size: .21rem;
		color: #ffffff;
		text-align: center;
		height: .36rem;
		width: 60%;
		font-family: Magistral-Medium;
		padding: 0 20%;
	}
	
	.offsell .cashout>p span {
		position: absolute;
		top: .1333rem;
		right: .1367rem;
		font-size: .16rem;
		line-height: .1133rem;
		color: #ffffff;
		font-family: Magistral-Medium;
	}
	
	.offsell .cashout button {
		margin: .2333rem auto .4667rem;
		width: 1.83rem;
		display: block;
		font-weight: bold;
		font-size: .17rem;
		font-family: Magistral-Bold;
		border-radius: .2rem;
		background: linear-gradient(#FFFC00, #DB7100);
		padding: .09rem 0;
	}
</style>