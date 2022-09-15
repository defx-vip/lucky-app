<template>
	<div class="marketbuy">
		<div class="cashout">
			<div>
				<img v-if="$route.query.sort == 'box'" style="object-fit: cover;" src="../../../static/image/1487.png" />
				<img v-else-if="show!=''" :src="show.image" />
			</div>
			<ul>
				<li>
					<span>{{$t('mTokenID')}}:</span>
					<p>{{$route.query.id}}</p>
				</li>
				<li>
					<span>{{$t('bPrice')}}:</span>
					<p>{{Number($route.query.price)/1000000000000000000}} ETH</p>
				</li>
			</ul>
			<button type="button" @click.stop="approve($event,(Number($route.query.price)/1000000000000000000))" v-if="approvebool==false" v-movedown v-music v-preventReClick>{{$t('bAuthorize')}}</button>
			<button type="button" @click="buy($event,$route.query.id)" v-else v-movedown v-music v-preventReClick>{{$t('mBUY')}}</button>
		</div>
	</div>
</template>

<script>
	import web3tools from '../../web3/web3tools'
	export default {
		data() {
			return {
				approvebool: false,
				show: '',
			}
		},
		mounted() {
			this.allowance();
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
			allowance(){
				let toaddr;
				if(this.$route.query.sort == "box") {
					toaddr = this.$store.state.BOXmarketaddr
				} else {
					toaddr = this.$store.state.NFTmarketaddr
				}
				web3tools.allowance(this.$store.state.ETHaddr, this.$cookies.get('walletAddress'),toaddr, (e) => {
					if(Number(e)>(Number(this.$route.query.price)/1000000000000000000)){
						this.approvebool=true;
					}
				});
			},
			approve(event,money) {
				let toaddr;
				if(this.$route.query.sort == "box") {
					toaddr = this.$store.state.BOXmarketaddr
				} else {
					toaddr = this.$store.state.NFTmarketaddr
				}
				web3tools.approve(this.$store.state.ETHaddr, toaddr, (Number(money) *10), (e) => {
					this.$toast('Please wait')
					$(event.target).addClass('preventReClick')
				}, (e) => {
					this.$toast('Approve succeeded')
					$(event.target).removeClass('preventReClick')
					this.approvebool = true;
				});
			},
			buy(event,tokenId) {
				let addr;
				if(this.$route.query.sort == "box") {
					addr = this.$store.state.BOXmarketaddr
				} else {
					addr = this.$store.state.NFTmarketaddr
				}
				web3tools.bidOrder(addr, tokenId.toString(), (e) => {
					this.$toast('Please wait')
					$(event.target).addClass('preventReClick')
				}, (e) => {
					this.$toast('Success')
					this.$router.push('/nft?change='+this.$route.query.sort)
					$(event.target).removeClass('preventReClick')
				});
			},
		},
	}
</script>

<style scoped>
	.marketbuy {
		width: 100%;
		height: 95vh;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.marketbuy .cashout {
		background: url(../../../static/image/marketbuy.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		width: 100%;
		margin: 0 .11rem;
	}
	
	.marketbuy .cashout div {
		width: 1.6rem;
		height: 1.6rem;
		margin: 0.3467rem auto 0;
		border-radius: 0.05rem;
		border: 2px solid #35E7FF;
	}
	
	.marketbuy .cashout div img {
		width: 100%;
		height: 100%;
		border-radius: 0.05rem;
		display: block;
	}
	
	.marketbuy .cashout ul {
		width: 2.6rem;
		margin: 0.3733rem auto 0;
		background: #4B0082;
		border-radius: 0.05rem;
		border: 1px solid #35E7FF;
		padding: 0.16rem 0;
	}
	
	.marketbuy .cashout ul li {
		display: flex;
		justify-content: space-between;
		margin: 0 0.19rem 0.1rem;
		align-items: center;
	}
	
	.marketbuy .cashout ul li:last-child {
		margin: 0 0.19rem 0;
	}
	
	.marketbuy .cashout ul li span {
		color: #ffffff;
		font-size: .16rem;
		text-transform: uppercase;
	}
	
	.marketbuy .cashout ul li p {
		color: #DFE117;
		font-size: .2rem;
	}
	
	.marketbuy .cashout button {
		margin: 0.3133rem auto 0.46rem;
		display: block;
		background: linear-gradient(#FFFC00, #DB7100);
		width: 1.77rem;
		height: 0.39rem;
		border-radius: 0.18rem;
		font-size: .2rem;
		font-family: Magistral-Bold;
		text-transform: uppercase;
	}
</style>