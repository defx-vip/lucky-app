<template>
	<div class="sell">
		<div class="cashout">
			<h6>NFT {{$t('bSELL')}}</h6>
			<div>
				<img v-if="$route.query.sort == 'box'" style="object-fit: cover;" src="../../../static/image/1487.png" />
				<img v-else-if="show!=''" :src="show.image" />
			</div>
			<h1>{{$t('bSALEPRICE')}}</h1>
			<p><input type="text" v-model="price" :placeholder="$t('bPleaseentersaleprice')" @keydown="handleInput"><span>ETH</span></p>
			<!--<button type="button" @click="approve($event)" v-if="approvebool==false" v-preventReClick>AUTH</button>-->
			<button type="button" @click="sale($event)" v-movedown v-music v-preventReClick>{{$t('bSELL')}}</button>
		</div>
	</div>
</template>

<script>
	import web3tools from '../../web3/web3tools'
	let that
	export default {
		data() {
			return {
				price: '',
				//				approvebool: false,
				//				approvebool2: false,
				show: '',
			}
		},
		//		watch: {
		//			'amount': {
		//				handler: function() {
		//					if(this.approvebool == true) {
		//						this.approvebool = false;
		//					}
		//				}
		//			}
		//		},
		mounted() {
			that = this;
			if(this.$route.query.sort != 'box') {
				this.tokenurl();
			}
		},
		methods: {
			tokenurl() {
				web3tools.tokenURI(this.$store.state.NFTaddr, this.$route.query.id, (e) => {
					this.$nftget(e, {}).then((res) => {
						that.show = res
					})
				});
			},
			sale(event) {
				if(Number(this.price) <= 0 || this.price == "") {
					this.$toast("Amount is incorrect");
					return false;
				}
				let addr, toaddr;
				if(this.$route.query.sort == "box") {
					addr = this.$store.state.Blindboxaddr
					toaddr = this.$store.state.BOXmarketaddr
				} else {
					addr = this.$store.state.NFTaddr
					toaddr = this.$store.state.NFTmarketaddr
				}
				web3tools.safeTransferFrom(addr, this.$cookies.get('walletAddress'), toaddr, this.$route.query.id, this.price, (e) => {
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
					this.$toast('Please wait')
					$(event.target).addClass('preventReClick')
				}, (e) => {
					this.$router.push('/market/NFTMarket?change=' + this.$route.query.sort)
					$(event.target).removeClass('preventReClick')
				});
			},
			handleInput(e) {
				if(e.target.value != "" && e.key == '.' && -1 == e.target.value.indexOf('.')) {
					return
				}
				if(e.target.value.toString() !== (e.target.value.match(/^\d*(\.?\d{0,3})/g)[0])) {
					e.target.value = (e.target.value.match(/^\d*(\.?\d{0,3})/g)[0]) || null
				}
				//			e.target.value = e.target.value.match(/^\d*(\.?\d{0,2})/g)[0] || null;
			},
		},
	}
</script>

<style scoped>
	.sell {
		width: 100%;
		height: 90vh;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.sell .cashout {
		background: url(../../../static/image/BG24.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		margin: 0 .11rem;
		width: 100%;
	}
	
	.sell .cashout h6 {
		text-align: center;
		font-size: .28rem;
		line-height: .2033rem;
		color: #ffffff;
		padding-top: .33rem;
		font-family: Magistral-Bold;
	}
	
	.sell .cashout>div {
		width: 1.84rem;
		/*height: 1.53rem;*/
		margin: .1633rem auto .3167rem;
		border-radius: .1333rem;
		border: .033rem solid #35E7FF;
		background: #581EA1;
	}
	
	.sell .cashout>div img {
		display: block;
		border-radius: .1333rem;
		width: 100%;
		height: 100%;
	}
	
	.sell .cashout h1 {
		text-align: center;
		color: #ffffff;
		font-size: .2167rem;
		line-height: .1533rem;
		margin-bottom: .11rem;
		font-family: Magistral-Medium;
	}
	
	.sell .cashout>p {
		background: #490785;
		margin: 0 .24rem;
		border-radius: .19rem;
		border: 1px solid #C18DF4;
		position: relative;
	}
	
	.sell .cashout>p input {
		font-size: .12rem;
		color: #ffffff;
		text-align: center;
		height: .36rem;
		width: 60%;
		font-family: Magistral-Medium;
		padding: 0 20%;
	}
	
	.sell .cashout>p span {
		position: absolute;
		top: .1333rem;
		right: .1367rem;
		font-size: .16rem;
		line-height: .1133rem;
		color: #ffffff;
		font-family: Magistral-Medium;
	}
	
	.sell .cashout button {
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