<template>
	<div class="withdrawal">
		<div class="cashout">
			<h1 v-html="$t('lWITHDRAWTOLOCALWALLET')"></h1>
			<h6>{{$t('lCHOOSEWITHDRAWALTYPE')}}</h6>
			<ul>
				<li>
					<div :class="changeactive=='LMT'?'active frametwo':'frametwo'" @click="change('LMT')" v-music>
						<div><img src="../../../static/image/LMT.png"></div>
					</div>
					<p>{{$t('LMT')}}</p>
				</li>
				<li>
					<div :class="changeactive=='LMG'?'active frametwo':'frametwo'" @click="change('LMG')" v-music>
						<div><img src="../../../static/image/LMG.png"></div>
					</div>
					<p>{{$t('LMG')}}</p>
				</li>
			</ul>
			<input type="text" placeholder="Please enter the withdrawal amount!" v-model="money" @keydown="handleInput" @focus="scoll" @click="scoll" />
			<div class="changeBalance" v-if="changeactive=='LMG'">
				<p>{{$t('lWithdrawallimit')}}: {{LMTWITHDRAW.balance}}</p>
				<p>{{$t('lBalance')}}: {{balancelist[changeactive].quantity}}</p>
				<p>{{$t('ltotalturnover')}}: {{LMTWITHDRAW.flowingWater}}</p>
				<p>{{$t('lLuckyMiningturnover')}}: {{LMTWITHDRAW.freeFlowingWater}}</p>
				<p>{{$t('lLuckyMiningrequirement')}}: {{LMTWITHDRAW.freeFlowingWaterRequirements}}</p>
			</div>
			<div class="changeBalance" v-if="changeactive=='LMT'">
				<p>{{$t('lWithdrawallimit')}}: {{balancelist[changeactive].quantity}}</p>
				<p>{{$t('lBalance')}}: {{balancelist[changeactive].quantity}}</p>
			</div>
			<button type="button" v-if="balancelist[changeactive].withdrawStatus==1" @click.stop="$parent.$refs['pop'].pop=true" v-movedown v-music v-preventReClick>{{$t('lWITHDRAW')}}</button>
			<button type="button" v-else @click="withdraw" :class="balancelist[changeactive].withdrawStatus==1?'preventReClick':''" v-movedown v-music v-preventReClick>{{$t('lWITHDRAW')}}</button>
		</div>
	</div>
</template>

<script>
	import web3tools from '../../web3/web3tools'
	let _this;
	export default {
		data() {
			return {
				changeactive: 'LMT',
				money: '',
				balancelist: {
					LMT: '',
					LMG: ''
				},
				LMTWITHDRAW:'',
			}
		},
		mounted() {
			_this = this;
			this.query()
		},
		methods: {
			scoll(){
				setTimeout(()=>{
	         		$('.withdrawal').scrollTop(10000)
	       		},100)
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
						if(i==(Number(res.data.length)-1)){
							_this.LMTquery()
						}
					}
				})
			},
			LMTquery() {
				console.log(this.balancelist['LMG'].tokenContract)
				this.$post(this.$apiUtil.getValidQuantity, {
					playerId: this.$cookies.get('playerId'),
					tokenContract: this.balancelist['LMG'].tokenContract
				}).then((res) => {
					this.LMTWITHDRAW=res.data
				})
			},
			withdraw() {
				if(Number(this.money) < 1 || this.money == "") {
					this.$toast("Amount is incorrect, at least 1");
					return false;
				}
				if(Number(this.LMTWITHDRAW.balance) < Number(this.money)&&this.changeactive=='LMG') {
					this.$toast("Insufficient limit");
					return false;
				}
				if(Number(this.balancelist[this.changeactive].quantity) < Number(this.money)&&this.changeactive=='LMT') {
					this.$toast("Insufficient balance");
					return false;
				}
				this.$post(this.$apiUtil.withdraw, {
					playerId: this.$cookies.get('playerId'),
					walletAddress: this.$cookies.get('walletAddress'),
					balance: this.money,
					tokenContract: this.balancelist[this.changeactive].tokenContract
				}).then((res) => {
					if(res.code == 200) {
						_this.$toast("Apply successfully, please wait for a moment......");
						_this.$router.back(-1)
					}
				})
			},

		},
	}
</script>

<style scoped>
	.withdrawal {
		width: 100%;
		height: 90vh;
		display: flex;
		align-items: flex-start;
		justify-content: center;
		overflow-y: auto;
		overflow-x:hidden;
	}
	
	.withdrawal .cashout {
		background: url(../../../static/image/BG23.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		width: 94%;
		margin-top: .5rem;
    	margin-bottom: .2rem;
    	padding-bottom: .467rem;
	}
	
	.withdrawal .cashout>h1 {
		text-align: center;
		padding-top: .3133rem;
		color: #ffffff;
		font-size: .2733rem;
		line-height: .24rem;
		font-family: Magistral-Bold;
		font-weight: bold;
	}
	
	.withdrawal .cashout h6 {
		color: #ffffff;
		margin-top: .4967rem;
		text-align: center;
		font-size: .14rem;
		line-height: .1033rem;
		margin-bottom: .2167rem;
		font-family: Magistral-Medium;
	}
	
	.withdrawal .cashout ul {
		display: flex;
		justify-content: space-between;
		width: 50%;
		margin: 0 auto .1867rem;
	}
	
	.withdrawal .cashout ul li .frametwo {
		border: .033rem solid transparent;
		border-radius: 50%;
		margin-bottom: .053rem;
	}
	
	.withdrawal .cashout ul li .active {
		border: .033rem solid rgb(53, 231, 255);
	}
	
	.withdrawal .cashout ul li .active+p {
		color: #79C0FF;
	}
	
	.withdrawal .cashout ul li .frametwo div {
		width: .5233rem;
		height: .5233rem;
		margin: .035rem;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.withdrawal .cashout ul li .frametwo div img {
		width: 100%;
		height: 100%;
	}
	
	.withdrawal .cashout ul li p {
		font-size: .22rem;
		text-align: center;
		color: #ffffff;
		font-family: Magistral-Medium;
		line-height: .18rem;
	}
	
	.withdrawal .cashout .changeBalance p {
		color: #ffffff;
		text-align: center;
		font-size: .14rem;
		margin-bottom: 0.13rem;
		font-family: Magistral-Medium;
	}
	
	.withdrawal .cashout>input {
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
	
	.withdrawal .cashout button {
		margin: 0 auto .21rem;
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