<template>
	<div class="recharge">
		<div class="back" @click="goherf"><img src="../../../static/image/back.png"></div>
		<div class="cashout">
			<h1 v-html="$t('lTRANSFERTOSERVERACCOUNT')"></h1>
			<h6>{{$t('lSELECTATOKEN')}}</h6>
			<ul>
				<li>
					<div :class="changeactive=='LMG'?'active frametwo':'frametwo'" @click="change('LMG')" v-music>
						<div><img src="../../../static/image/LMG.png"></div>
					</div>
					<p>{{$t('LMG')}}</p>
				</li>
				<li>
					<div :class="changeactive=='LMT'?'active frametwo':'frametwo'" @click="change('LMT')" v-music>
						<div><img src="../../../static/image/LMT.png"></div>
					</div>
					<p>{{$t('LMT')}}</p>
				</li>
			</ul>
			<input type="text" placeholder="Please enter the recharge amount!" v-model="money" @keydown="handleInput" @focus="scoll" @click="scoll" />
			<button type="button" @click="recharge" :class="balancelist[changeactive].rechargeStatus==1?'preventReClick':''" v-movedown v-music v-preventReClick>{{$t('lTRANSFER')}}</button>
		</div>
	</div>
</template>

<script>
	import web3tools from '../../web3/web3tools'
	let _this;
	export default {
		data() {
			return {
				changeactive: 'LMG',
				money: '',
				balancelist: {LMT:'',LMG:''},
			}
		},
		mounted() {
			_this=this;
			this.query()
		},
		methods: {
			scoll(){
				setTimeout(()=>{
	         		$('.recharge').scrollTop(10000)
	       		},100)
			},
			goherf() {
//				this.$router.back(-1)
				window.location.href = process.env.hrefall
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
			query() {
				this.$post(this.$apiUtil.getassets, {
					playerId: this.$cookies.get('playerId'),
					walletAddress: this.$cookies.get('walletAddress')
				}).then((res) => {
					for(let i = 0; i < res.data.length; i++) {
						this.balancelist[res.data[i].tokenCode] = res.data[i];
					}
				})
			},
			recharge() {
				if(Number(this.money)<0||this.money==""){
					this.$toast("Amount is incorrect");
					return false;
				}
				this.$post(this.$apiUtil.getRechargeAddress, {
					playerId: this.$cookies.get('playerId'),
					walletAddress: this.$cookies.get('walletAddress'),
					tokenContract:this.balancelist[this.changeactive].tokenContract,
				}).then((res) => {
					web3tools.transfer(res.data.tokenContract,res.data.tokenCode,_this.money,res.data.tokenAddress,(e) => {
						_this.$toast('Please wait')
					},(e) => {
						_this.$toast('Success')
					});
				})
			},
		},
	}
</script>

<style scoped>
	.recharge {
		width: 100%;
		height: 90vh;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
    	height: 100vh;
    	z-index: 100;
    	background: url(../../../static/image/BG.png) !important;
		background-size: 100% 100% !important;
		background-repeat: no-repeat !important;
	}
	.recharge .back{
		position: absolute;
    	top: .2rem;
    	left: .2rem;
    	color: #ffffff;
	}
	.recharge .back img{
		width: .4rem;
	}
	.recharge .cashout {
		background: url(../../../static/image/BG23.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		width: 94%;
	}
	
	.recharge .cashout>h1 {
		text-align: center;
		padding-top: .3133rem;
		color: #ffffff;
		font-size: .2733rem;
		line-height: .24rem;
		font-family: Magistral-Bold;
		font-weight: bold;
	}
	
	.recharge .cashout h6 {
		color: #ffffff;
		margin-top: .4967rem;
		text-align: center;
		font-size: .14rem;
		line-height: .1033rem;
		margin-bottom: .2167rem;
		font-family: Magistral-Medium;
	}
	
	.recharge .cashout ul {
		display: flex;
		justify-content: space-between;
		width: 50%;
		margin: 0 auto .1867rem;
	}
	
	.recharge .cashout ul li .frametwo {
		border: .033rem solid transparent;
		border-radius: 50%;
		margin-bottom: .053rem;
	}
	
	.recharge .cashout ul li .active {
		border: .033rem solid rgb(53, 231, 255);
	}
	
	.recharge .cashout ul li .active+p {
		color: #79C0FF;
	}
	
	.recharge .cashout ul li .frametwo div {
		width: .5233rem;
		height: .5233rem;
		margin: .035rem;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.recharge .cashout ul li .frametwo div img {
		width: 100%;
		height: 100%;
	}
	
	.recharge .cashout ul li p {
		font-size: .22rem;
		text-align: center;
		color: #ffffff;
		font-family: Magistral-Medium;
		line-height: .18rem;
	}
	
	.recharge .cashout>p {
		text-align: center;
		color: #ffffff;
		font-size: .24rem;
		margin: .12rem 0;
		font-weight: bold;
	}
	
	.recharge .cashout>input {
		display: block;
		color: #ffffff;
		text-align: center;
		margin: 0 auto .2333rem;
		font-size: .13rem;
		width: 86%;
		height: .36rem;
		font-family: Magistral-Medium;
		border-radius: .18rem;
		border: 1px solid rgb(53, 231, 255);
	}
	
	.recharge .cashout button {
		margin: 0 auto .467rem;
		width: 53%;
		display: block;
		height: .44rem;
		font-size: .17rem;
		font-weight: bold;
		font-family: Magistral-Bold;
		border-radius: .22rem;
		background: linear-gradient(#FFFC00, #DB7100);
	}
</style>