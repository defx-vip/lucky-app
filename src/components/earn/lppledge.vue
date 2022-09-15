<template>
	<div class="lppledge">
		<div class="frame">
			<div class="top">
				<div class="left">
					<h1>{{$route.query.unit}}-USDT</h1>
					<p><span>1x</span></p>
					<p><span>APY</span><span>0%</span></p>
				</div>
				<span></span>
				<div class="right">
					<p><span>REWARD</span><span>{{LMTbalance}}  {{$route.query.unit}}</span></p>
					<p><span>PLEDGE</span><span>{{Computationalace}}   LP</span></p>
				</div>
			</div>
			<div class="center">
				<h1>FIRST STEP: OBTAIN LP</h1>
				<p>GO TO PANCAKESWAP TO ADD LIQUIDITY, <br>YOU WILL GET THE LP CERTIFICATE, PLEGE <br>AT THIS PAGE AGAIN TO MINE.</p>
				<button type="button" @click="goherf">ADD LIQUIDITY</button>
			</div>
			<p>Available:<span>{{balance}}		LP</span></p>
			<div class="button">
				<button type="button" @click="change('Casting')" :class="changeactive=='Casting'?'active':''">Pledge</button>
				<button type="button" @click="change('Redemption')" :class="changeactive=='Redemption'?'active':''">Redemption</button>
			</div>
			<div class="input">
				<div v-show="changeactive=='Casting'">
					<input type="text" placeholder="INPUT AMOUNT LP:" v-model="amount" @keydown="handleInput"/>
					<span @click="amount=balance">MAX</span>
				</div>
				<div v-show="changeactive=='Redemption'">
					<input type="text" value="ALREADY PLEDGED:" readonly="readonly"/>
					<span class="long">LP {{Computationalace}}</span>
				</div>
				<button type="button" :class="approvebool2==true?'preventReClick':''" v-show="changeactive=='Casting'" @click="approve" v-preventReClick>APPROVE</button>
				<button type="button" v-show="changeactive=='Casting'" :class="approvebool==false?'preventReClick':''" @click="deposit" v-preventReClick>pledge</button>
				<button type="button" v-show="changeactive=='Redemption'" @click="withdraw" v-preventReClick>REDEEM</button>
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
				timelog:'',
				changeactive: 'Casting',
				balance: 0,
				amount: '',
				approvebool: false,
				approveamount: 0,
				LMTbalance:0,
				Computationalace:0,
				approvebool2:false,
			}
		},
		mounted() {
			this.querybalance()
			this.poolEarned()
			this.Computational()
			that = this
			this.timelog = setInterval(function() {
				that.poolEarned();
			}, 10000)
		},
		beforeDestroy() {
			clearInterval(this.timelog)
		},
		destroyed() {
			clearInterval(this.timelog)
		},
		watch: {
			'amount': {
				handler: function() {
					console.log(this.amount)
					console.log(this.approveamount)
					if(this.approveamount==0||Number(this.approveamount)<Number(this.amount)||this.amount==""||isNaN( this.amount )){
						this.approvebool=false;
					}else{
						this.approvebool=true;
					}
//					if((this.approveamount!=0&&this.approveamount>=this.amount)||this.amount==""||isNaN( this.amount )){
//						this.approvebool2 = true;
//					}else{
//						this.approvebool2 = false;
//					}
				}
			}
		},
		methods: {
			Computational() {
				let addr
				if(this.$route.query.unit == "LMG") {
					addr = this.$store.state.GggPooladdr
				} else if(this.$route.query.unit == "LMT") {
					addr = this.$store.state.TttPooladdr
				}
				web3tools.getbalance(addr, "THR", (e) => {
					this.Computationalace = e;
				});
			},
			withdraw(){
//				if(this.Computationalace==0){
//					return false;
//				}
				let addr
				if(this.$route.query.unit == "LMG") {
					addr = this.$store.state.GggPooladdr
				} else if(this.$route.query.unit == "LMT") {
					addr = this.$store.state.TttPooladdr
				}
				web3tools.withdraw(addr,0, (e) => {
					this.approveamount = 0;
					this.approvebool = false;
					this.approvebool2 = false;
				}, (e) => {
					this.querybalance();
					this.Computational();
				});
			},
			deposit() {
				let addr
				if(this.$route.query.unit == "LMG") {
					addr = this.$store.state.GggPooladdr
				} else if(this.$route.query.unit == "LMT") {
					addr = this.$store.state.TttPooladdr
				}
				web3tools.deposit(addr, this.amount,0, (e) => {
					this.approveamount = 0;
					this.approvebool = false;
					this.approvebool2 = false;
				}, (e) => {
					this.querybalance();
					this.Computational();
				});
			},
			approve() {
				let addr, toaddr;
				if(this.$route.query.unit == "LMG") {
					addr = this.$store.state.LMGLPaddr
					toaddr = this.$store.state.GggPooladdr
				} else if(this.$route.query.unit == "LMT") {
					addr = this.$store.state.LMTLPaddr
					toaddr = this.$store.state.TttPooladdr
				}
				if(Number(this.amount)<=0||this.amount==""){
					this.$toast("Amount is incorrect");
					return false;
				}
				let amou=this.amount
				web3tools.approve(addr,toaddr, (Number(this.amount)*1.1), (e) => {
					this.approvebool2 = true;
					this.$toast('Please wait')
				}, (e) => {
					this.approveamount = amou;
					this.approvebool = true;
//					this.approvebool2 = false;
					this.$toast('Approve succeeded')
				});
			},
			poolEarned(){
				let addr
				if(this.$route.query.unit == "LMG") {
					addr = this.$store.state.GggPooladdr
				} else if(this.$route.query.unit == "LMT") {
					addr = this.$store.state.TttPooladdr
				}
				web3tools.poolEarned(addr, (e) => {
					console.log(e)
					this.LMTbalance=e
				});
			},
			querybalance() {
				let addr
				if(this.$route.query.unit == "LMG") {
					addr = this.$store.state.LMGLPaddr
				} else if(this.$route.query.unit == "LMT") {
					addr = this.$store.state.LMTLPaddr
				}
				web3tools.getbalance(addr, "LP", (e) => {
					this.balance = e;
				});
			},
			handleInput(e) {
				if(e.target.value != "" && e.key == '.' && -1 == e.target.value.indexOf('.')) {
					return
				}
				if(e.target.value.toString() !== (e.target.value.match(/^\d*(\.?\d{0,1})/g)[0])) {
					e.target.value = (e.target.value.match(/^\d*(\.?\d{0,1})/g)[0]) || null
				}
				//			e.target.value = e.target.value.match(/^\d*(\.?\d{0,2})/g)[0] || null;
			},
			goherf() {
				if(this.$route.query.unit == "LMG") {
					window.location.href = "https://pancake.kiemtienonline360.com/?locale=zh-CN&utm_source=imtoken#/add/0x1c1D49E778ae464aDC60A2aEFE3C3a0a7B9170d7/0x419bC0E73Ead2569d7c4E9b8C5792FF3a80b82Fd"
				} else if(this.$route.query.unit == "LMT") {
					window.location.href = "https://pancake.kiemtienonline360.com/?locale=zh-CN&utm_source=imtoken#/add/0x1c1D49E778ae464aDC60A2aEFE3C3a0a7B9170d7/0x7262505acaA9c20fab89C9B5941676Cfd5Ab7f16"
				}
			 	
			},
			change(e) {
				this.changeactive = e;
			},
		},
	}
</script>

<style scoped>
	.lppledge {
		margin-bottom: .93rem;
	}
	
	.lppledge .frame {
		background: url(../../../static/image/LP-LPBG.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		margin: .31rem .11rem;
	}
	
	.lppledge .frame .top {
		display: flex;
		justify-content: space-between;
	}
	
	.lppledge .frame .top .left {
		width: 38%;
	}
	
	.lppledge .frame .top .left h1 {
		margin-top: .3rem;
		color: #ffffff;
		font-weight: bold;
		font-size: .16rem;
		margin-left: .3067rem;
		font-family: Magistral-Bold;
	}
	
	.lppledge .frame .top .left p {
		margin-left: .2967rem;
		margin-right: .3967rem;
		color: #ffffff;
		font-size: .12rem;
		margin-top: .15rem;
		font-family: Magistral-Medium;
		display: flex;
		justify-content: space-between;
	}
	
	.lppledge .frame .top>span {
		width: .02rem;
		height: .5rem;
		background: #9701D5;
		margin-top: .6rem;
	}
	
	.lppledge .frame .top .right {
		flex: 1;
		color: #ffffff;
		margin-top: .6rem;
	}
	
	.lppledge .frame .top .right p {
		width: 70%;
		float: right;
		margin-right: .3rem;
		display: flex;
		justify-content: space-between;
		font-size: .12rem;
		font-family: Magistral-Medium;
		align-items: center;
	}
	
	.lppledge .frame .top .right p span:nth-child(2) {
		font-size: .17rem;
		margin-left: .1rem;
		width: .85rem;
    	overflow: hidden;
    	white-space: nowrap;
    	text-overflow: ellipsis;
    	text-align: right;
	}
	
	.lppledge .frame .top .right p:nth-child(2) {
		margin-top: .13rem;
	}
	
	.lppledge .frame .center {
		margin: .15rem .28rem 0;
		border: 1px solid rgb(53, 231, 255);
		background: #4B0082;
		border-radius: .05rem;
	}
	
	.lppledge .frame .center h1 {
		margin-top: .3rem;
		color: #ffffff;
		margin-left: .19rem;
		font-weight: bold;
		font-size: .14rem;
		font-family: Magistral-Bold;
	}
	
	.lppledge .frame .center p {
		font-size: .12rem;
		color: #ffffff;
		margin-top: .16rem;
		margin-left: .19rem;
		font-family: Magistral-Book;
		text-transform: uppercase;
	}
	
	.lppledge .frame .center button {
		background: url(../../../static/image/ADDLIQUIDITY.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		margin-left: .2rem;
		margin-bottom: .18rem;
		border-radius: .15rem;
		margin-top: .35rem;
		font-family: Magistral-Medium;
		width: 1.5rem;
		height: .3rem;
		padding-bottom: .02rem;
	}
	
	.lppledge .frame>p {
		margin: .29rem .28rem 0;
		color: #ffffff;
		font-size: .14rem;
		font-family: Magistral-Medium;
		text-transform: uppercase;
	}
	
	.lppledge .frame>p span {
		font-size: .18rem;
		margin-left: .33rem;
	}
	
	.lppledge .frame .button {
		margin: .13rem .25rem 0;
	}
	
	.lppledge .frame .button button {
		width: 1.07rem;
		height: .3rem;
		font-size: .14rem;
		margin-right: .15rem;
		border-radius: .15rem;
		font-family: Magistral-Medium;
		background: linear-gradient(#ffffff, #999999);
		text-transform: uppercase;
	}
	
	.lppledge .frame .button button:nth-child(2) {
		width: 1.25rem;
	}
	
	.lppledge .frame .button .active {
		background: linear-gradient(#FFFC00, #DB7100);
	}
	
	.lppledge .frame .input {
		text-align: center;
		margin: 0 .3rem;
	}
	
	.lppledge .frame .input div {
		margin: .26rem 0 0;
		background: #4B0082;
		border-radius: .1833rem;
		height: .3667rem;
		display: flex;
		align-items: center;
		padding: 0 .16rem;
		justify-content: space-between;
		border: 1px solid rgb(53, 231, 255);
	}
	
	.lppledge .frame .input div input {
		font-size: .14rem;
		color: #ffffff;
		width: 70%;
		font-family: Magistral-Medium;
	}
	
	.lppledge .frame .input div span {
		color: #ffffff;
		font-family: Magistral-Medium;
	}
	.lppledge .frame .input div .long{
		overflow: hidden;
    	white-space: nowrap;
    	text-overflow: ellipsis;
    	width: 30%;
    	text-align: right;
	}
	.lppledge .frame .input button {
		width: 1.2rem;
		height: .3rem;
		background: linear-gradient(#FFFC00, #DB7100);
		border-radius: .15rem;
		font-size: .14rem;
		margin: .17rem 0.05rem .6rem;
		font-family: Magistral-Medium;
		text-transform: uppercase;
	}
</style>