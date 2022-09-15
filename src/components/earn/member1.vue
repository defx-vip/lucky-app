<template>
	<div class="member">
		<div class="top">
			<div class="frame">
				<div class="left">
					<div></div>
					<p>LMV</p>
				</div>
				<span></span>
				<div class="right">
					<p><span>MINT</span><span>{{Computationalace}}  LMV</span></p>
					<p><span>DIVIDEND</span><span>0   LMT</span></p>
				</div>
				<p class="goto" @click="goherf">Go to the game lobby>></p>
			</div>
			<p>AVAILABLE BALANCE:<span>{{balance}} LMT</span></p>
			<div class="button">
				<button type="button" @click="change('Casting')" :class="changeactive=='Casting'?'active':''">Pledge</button>
				<button type="button" @click="change('Redemption')" :class="changeactive=='Redemption'?'active':''">Redemption</button>
			</div>
			<div class="input" v-if="changeactive=='Casting'">
				<div>
					<input type="text" placeholder="INPUT QUANTITY LMT:" v-model="amount" @keydown="handleInput"/>
					<span @click="amount=balance">MAX</span>
				</div>
				<p>
					<button type="button" v-show="changeactive=='Casting'" @click="approve" v-preventReClick>APPROVE</button>
					<button type="button" :class="approvebool==false?'preventReClick':''" @click="deposit" v-preventReClick>PLEDGE</button>
				</p>
			</div>
			<div class="input" v-else-if="changeactive=='Redemption'">
				<!--<div>-->
					<!--<span style="margin-left: .12rem;">MINT CONSUMPTION:</span>-->
					<!--<input type="text" value="MINT CONSUMPTION:" readonly="readonly" />-->
					<!--<span class="long">LMT: {{Number(Computationalace)*100}}</span>-->
				<!--</div>-->
				<p>
					<button type="button" @click="withdraw" v-preventReClick>REDEEM</button>
				</p>
			</div>
		</div>
		<div class="bottom">
			<div>
				<h1>Rule</h1>
				<p>Users can pledge LMT to mint LMV. LMV is the VIP certificate and the value carrier of the LM. Users who hold LMV can get a variety of VIP benefits, such as dividends, NFT airdrops, invitation commissions and so on.</p>
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
//			this.poolEarned()
			this.Computational()
			that = this
//			this.timelog = setInterval(function() {
//				that.poolEarned();
//			}, 10000)
		},
//		beforeDestroy() {
//			clearInterval(this.timelog)
//		},
		watch: {
			'amount': {
				handler: function() {
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
				web3tools.getbalance(this.$store.state.TttPooladdr, "THR", (e) => {
					this.Computationalace = e;
				});
			},
			withdraw(){
//				if(this.Computationalace==0){
//					return false;
//				}
				web3tools.withdraw(this.$store.state.TttPooladdr,0, (e) => {
					this.approveamount = 0;
					this.approvebool = false;
					this.approvebool2 = false;
				}, (e) => {
					this.querybalance();
					this.Computational();
				});
			},
			deposit() {
				web3tools.deposit(this.$store.state.TttPooladdr, this.amount,0, (e) => {
					this.approveamount = 0;
					this.approvebool = false;
					this.approvebool2 = false;
				}, (e) => {
					this.querybalance();
					this.Computational();
				});
			},
			approve() {
				if(Number(this.amount)<=0||this.amount==""){
					this.$toast("Amount is incorrect");
					return false;
				}
				let amou=this.amount
				web3tools.approve(this.$store.state.LMTaddr,this.$store.state.TttPooladdr, (Number(this.amount)*1.1), (e) => {
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
//				web3tools.poolEarned(this.$store.state.TttPooladdr, (e) => {
//					console.log(e)
//					this.LMTbalance=e
//				});
			},
			querybalance() {
				web3tools.getbalance(this.$store.state.LMTaddr, "LMT", (e) => {
					this.balance = Number(e).toFixed(2);
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
			change(e) {
				this.changeactive = e;
			},
			goherf() {
				window.location.href = process.env.hrefall
			},
		},
	}
</script>

<style scoped>
	.member {
		margin-bottom: .93rem;
	}
	
	.member .top {
		background: url(../../../static/image/30BG.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		margin: .31rem .11rem .12rem;
	}
	
	.member .top .frame {
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: relative;
	}
	.member .top .frame .goto{
		position: absolute;
    	color: #EAAA00;
    	font-size: .12rem;
    	right: 0.3467rem;
    	bottom: 0.1rem;
    	text-decoration: underline;
	}
	
	.member .top .left {
		width: 38%;
	}
	
	.member .top .left div {
		background: url(../../../static/image/LMV.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		width: .4267rem;
		height: .4267rem;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: .3rem auto .05rem;
		font-size: .12rem;
    	color: #ffffff;
    	font-family: Magistral-Bold;
	}
	
	.member .top .left p {
		color: #ffffff;
		text-align: center;
		font-size: .16rem;
		font-weight: bold;
		font-family: Magistral-Bold;
		margin-bottom: .25rem;
	}
	
	.member .top .frame>span {
		width: .02rem;
		height: .5rem;
		background: #9701D5;
	}
	
	.member .top .right {
		flex: 1;
		color: #ffffff;
		padding: .12rem 0;
	}
	
	.member .top .right p {
		width: 65%;
		float: right;
		margin-right: .35rem;
		display: flex;
		justify-content: space-between;
		font-size: .12rem;
		font-family: Magistral-Medium;
		align-items: center;
	}
	
	.member .top .right p span:nth-child(2) {
		font-size: .17rem;
		margin-left: .1rem;
		overflow: hidden;
    	white-space: nowrap;
    	text-overflow: ellipsis;
    	width: .85rem;
    	text-align: right;
	}
	
	.member .top .right p:nth-child(2) {
		margin-top: .2rem;
	}
	
	.member .top>p {
		margin: .05rem .3267rem 0;
		color: #ffffff;
		font-size: .14rem;
		font-family: Magistral-Medium;
	}
	
	.member .top>p span {
		font-size: .1677rem;
		margin-left: .07rem;
	}
	
	.member .top .button {
		margin: .2rem .2967rem 0;
	}
	
	.member .top .button button {
		width: 1.07rem;
		height: .3rem;
		font-size: .14rem;
		margin-right: .15rem;
		border-radius: .15rem;
		font-family: Magistral-Medium;
		background: linear-gradient(#ffffff, #999999);
		text-transform: uppercase;
	}
	
	.member .top .button button:nth-child(2) {
		width: 1.25rem;
	}
	.member .top .button .active{
		background: linear-gradient(#FFFC00, #DB7100);
	}
	.member .top .input {
		margin: .18rem .3rem 0;
		padding-bottom: .3rem;
	}
	
	.member .top .input div {
		width: 100%;
		background: #4B0082;
		border: 1px solid #35E7FF;
		border-radius: .1833rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: .3667rem;
	}
	.member .top .input p{
		display: flex;
    	justify-items: center;
	}
	.member .top .input div b {
		font-size: .12rem;
		color: #ffffff;
	}
	
	.member .top .input div input {
		font-size: .14rem;
		color: #ffffff;
		font-family: Magistral-Medium;
		margin-left: .12rem;
		width: 57%;
	}
	
	.member .top .input div span {
		color: #ffffff;
		font-size: .14rem;
		font-family: Magistral-Medium;
		margin-right: .14rem;
	}
	.member .top .input div .long{
		overflow: hidden;
    	white-space: nowrap;
    	text-overflow: ellipsis;
    	width: 30%;
    	text-align: right;
	}
	
	.member .top .input button {
		font-size: .14rem;
		display: block;
		margin: .18rem auto 0;
		padding: 0 .18rem;
		height: .3033rem;
		border-radius: .15rem;
		font-family: Magistral-Medium;
		background: linear-gradient(#FFFC00, #DB7100);
	}
	
	.member .bottom {
		background: url(../../../static/image/31BG.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		margin: 0 .11rem;
		padding: .14rem .16rem .22rem;
	}
	
	.member .bottom div {
		border: 1px solid #35E7FF;
		padding: 0 .23rem .32rem;
		border-radius: .05rem;
	}
	
	.member .bottom div h1 {
		text-align: center;
		margin: .15rem 0 .1rem;
		color: #ffffff;
		font-family: Magistral-Medium;
		font-size: .17rem;
	}
	
	.member .bottom div p {
		font-size: .13rem;
		color: #ffffff;
		line-height: .24rem;
		font-family: Magistral-Medium;
	}
</style>