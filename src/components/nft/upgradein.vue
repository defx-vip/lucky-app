<template>
	<div class="marketbuy">
		<header>
			<img @click="$router.back(-1)" src="../../../static/image/headerback.png" v-music/>
			<p>{{$t('bNFTupgrade')}}</p>
		</header>
		<div class="cashout">
			<h1>{{$t('bUPGRADE')}}</h1>
			<div>
				<img v-if="show!=''" :src="show.image" />
			</div>
			<ul>
				<li>
					<span>{{$t('mTokenID')}}:</span>
					<p>{{$route.query.id}}</p>
				</li>
				<li>
					<span>{{$t('mPRICE')}}:</span>
					<p>{{levelprice}} LMT</p>
				</li>
			</ul>
			<button type="button" @click.stop="approve($event)" v-if="approvebool==false" v-movedown v-music v-preventReClick>{{$t('bAuthorize')}}</button>
			<button type="button" @click="level($event)" v-else v-movedown v-music v-preventReClick>{{$t('bUPGRADE')}}</button>
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
				levelprice: 0,
			}
		},
		mounted() {
			this.tokenurl();
			this.roleLevel();
		},
		methods: {
			tokenurl() {
				let that = this;
				web3tools.tokenURI(this.$store.state.NFTaddr, this.$route.query.id, (e) => {
					this.$nftget(e, {}).then((res) => {
						that.show = res
					})
				});
			},
			allowance(){
				web3tools.allowance(this.$store.state.LMTaddr, this.$cookies.get('walletAddress'),this.$store.state.gameaddr, (e) => {
					console.log(e)
					if(Number(e)>Number(this.levelprice)){
						this.approvebool=true;
					}
				});
			},
			roleLevel() {
//				let addr;
//				if(this.$route.query.unit == 'LMT') {
//					addr = this.$store.state.LMTgameaddr;
//				} else if(this.$route.query.unit == 'LMG') {
//					addr = this.$store.state.LMGgameaddr;
//				}
				web3tools.costForLevelup(this.$store.state.gameaddr, this.$route.query.id, (e) => {
					this.levelprice = e;
					this.allowance();
				});
			},
			approve(event) {
				web3tools.approve(this.$store.state.LMTaddr, this.$store.state.gameaddr, (Number(this.levelprice) * 1.1), (e) => {
					this.$toast('Please wait')
					$(event.target).addClass('preventReClick')
				}, (e) => {
					this.$toast('Approve succeeded')
					$(event.target).removeClass('preventReClick')
					this.approvebool = true;
				});
			},
			level(event) {
				//				let addr;
				//				if(this.$route.query.unit == 'LMT') {
				//					addr = this.$store.state.LMTgameaddr;
				//				} else if(this.$route.query.unit == 'LMG') {
				//					addr = this.$store.state.LMGgameaddr;
				//				}
				let that = this;
				web3tools.levelup(this.$store.state.gameaddr, this.$route.query.id, (e) => {
					this.$toast('Please wait')
					$(event.target).addClass('preventReClick')
				}, (e) => {
					web3tools.personLevel(this.$store.state.gameaddr, this.$route.query.id, (e) => {
						that.$post(that.$apiUtil.fileUpdate, {
							key: that.$route.query.id,
							level: e
						}).then((res) => {
							that.$toast('Success')
							$(event.target).removeClass('preventReClick')
							that.approvebool = false;
							that.$router.back(-1)
						})
					});
				});
			},
		},
	}
</script>

<style scoped>
	.marketbuy header {
		position: fixed;
		top: 0;
		width: 100%;
		left: 0;
	}
	
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
	
	.marketbuy .cashout h1 {
		font-family: 'Magistral-Bold';
		margin-top: 0.27rem;
		text-align: center;
		color: #DFE117;
		font-size: .2rem;
		text-transform: uppercase;
	}
	
	.marketbuy .cashout div {
		width: 1.6rem;
		margin: 0.31rem auto 0;
		border-radius: 0.05rem;
		border: 2px solid #35E7FF;
	}
	
	.marketbuy .cashout div img {
		width: 100%;
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