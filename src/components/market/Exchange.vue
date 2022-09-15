<template>
	<div class="Exchange">
		<div class="nav">
			<p :class="change=='LMT'?'active':''" @click="change='LMT';approvebool=false;query();input1='';input2='';allowance()" v-music>{{$t('LMT')}}</p>
			<p :class="change=='LMG'?'active':''" @click="change='LMG';approvebool=false;query();input1='';input2='';allowance()" v-music>{{$t('LMG')}}</p>
		</div>
		<div class="frame">
			<p>{{$t('mPAYMENTAMOUNT')}}</p>
			<div v-if="transformation==0">
				<img v-if="change=='LMT'" src="../../../static/image/LMT.png" />
				<img v-if="change=='LMG'" src="../../../static/image/LMG.png" />
				<span>{{change}}</span>
				<!--<span>USDT<i></i><ul><li><span>USDT</span></li><li><span>USDT</span></li><li><span>USDT</span></li></ul></span>-->
				<input type="number" v-model="input1" :placeholder="$t('mENTERTHEAMOUNT')" v-on:input="inputFunc" />
				<!--<p>888.00</p>-->
			</div>
			<div v-if="transformation==1">
				<img src="../../../static/image/Tether-USDT-icon-1.png" />
				<span>USDT</span>
				<input type="number" v-model="input2" :placeholder="$t('mENTERTHEAMOUNT')" v-on:input="inputFunc2" />
			</div>
			<img class="down" @click="transformation==0?transformation=1:transformation=0;approvebool=false;allowance()" src="../../../static/image/down5.png" />
			<p>{{$t('mEXCHANGEAMOUNT')}}</p>
			<div v-if="transformation==0">
				<img src="../../../static/image/Tether-USDT-icon-1.png" />
				<span>USDT</span>
				<input type="number" v-model="input2" :placeholder="$t('mENTERTHEAMOUNT')" v-on:input="inputFunc2" />
			</div>
			<div v-if="transformation==1">
				<img v-if="change=='LMT'" src="../../../static/image/LMT.png" />
				<img v-if="change=='LMG'" src="../../../static/image/LMG.png" />
				<span>{{change}}</span>
				<!--<span>USDT<i></i><ul><li><span>USDT</span></li><li><span>USDT</span></li><li><span>USDT</span></li></ul></span>-->
				<input type="number" v-model="input1" :placeholder="$t('mENTERTHEAMOUNT')" v-on:input="inputFunc" />
				<!--<p>888.00</p>-->
			</div>
			<p style="margin-top: 0.2rem;"><span v-if="Magnification!=0">1 {{change}} = {{Number(String(Magnification).replace(/^(.*\..{4}).*$/,"$1"))}} USDT</span></p>
			<!--<button type="button" @click="$parent.$parent.$refs['pop'].pop=true">EXCHANGE</button>-->
			<button type="button" :class="$store.state.environment=='production'?'preventReClick':''" @click="approve($event)" v-if="approvebool==false" v-movedown v-music v-preventReClick>{{$t('mAPPROVE')}}</button>
			<button type="button" :class="$store.state.environment=='production'?'preventReClick':''" @click="exchange" v-if="approvebool==true" v-movedown v-music>{{$t('mEXCHANGE')}}</button>
		</div>
		<Exchangesuccess v-if="success"></Exchangesuccess>
	</div>
</template>

<script>
	import web3tools from '../../web3/web3tools'
	import Exchangesuccess from './Exchangesuccess'
	export default {
		components: {
			Exchangesuccess,
		},
		data() {
			return {
				success: false,
				transformation: 0,
				Magnification: 0,
				change: 'LMT',
				input1: '',
				input2: '',
				//				input2: 0.000001,
				approvebool: false,
				_reserve0: '',
				_reserve1: '',
				approvebalance: 0,
			}
		},
		mounted() {
			this.query()
			this.allowance()
		},
		methods: {
			allowance() {
				let addr;
				if(this.transformation == 0) {
					if(this.change == 'LMT') {
						addr = this.$store.state.LMTaddr;
					} else if(this.change == 'LMG') {
						addr = this.$store.state.LMGaddr;
					}
				} else {
					addr = this.$store.state.USDTaddr;
				}
				web3tools.allowance(addr, this.$cookies.get('walletAddress'), this.$store.state.Exchangeaddr, (e) => {
					console.log(e)
					this.approvebalance = e
					if(this.transformation == 0) {
						if(Number(e) > Number(this.input1)) {
							this.approvebool = true;
						}else{
							this.approvebool = false;
						}
					} else {
						if(Number(e) > Number(this.input2)) {
							this.approvebool = true;
						}else{
							this.approvebool = false;
						}
					}
				});
			},
			query() {
				this.Magnification = 0;
				let addr;
				if(this.change == 'LMT') {
					addr = this.$store.state.LMTExchangeNUMaddr;
				} else if(this.change == 'LMG') {
					addr = this.$store.state.LMGExchangeNUMaddr;
				}
				web3tools.getReserves(addr, (e) => {
					this._reserve0 = Number(e._reserve0) / 1000000000000000000
					this._reserve1 = Number(e._reserve1) / 1000000000000000000
					this.Magnification = (Number(e._reserve0) / 1000000000000000000) / (Number(e._reserve1) / 1000000000000000000)
				});
			},
			inputFunc() {
				this.input2 = Number(String(Number(this.input1) * Number(this.Magnification)).replace(/^(.*\..{4}).*$/, "$1"));
				if(this.transformation == 0) {
					if(Number(this.approvebalance) >= Number(this.input1)) {
						this.approvebool = true
					} else {
						this.approvebool = false
					}
				}else{
					if(Number(this.approvebalance) >= Number(this.input2)) {
						this.approvebool = true
					} else {
						this.approvebool = false
					}
				}
			},
			inputFunc2() {
				this.input1 = Number(String(Number(this.input2) / Number(this.Magnification)).replace(/^(.*\..{4}).*$/, "$1"));
				if(this.transformation == 0) {
					if(Number(this.approvebalance) >= Number(this.input1)) {
						this.approvebool = true
					} else {
						this.approvebool = false
					}
				}else{
					if(Number(this.approvebalance) >= Number(this.input2)) {
						this.approvebool = true
					} else {
						this.approvebool = false
					}
				}
			},
			approve(event) {
				if(Number(this.input1) <= 0 || Number(this.input2) <= 0) {
					this.$toast("Please enter correct number");
					return false;
				}
				let addr, amount;
				if(this.transformation == 0) {
					if(this.change == 'LMT') {
						addr = this.$store.state.LMTaddr;
					} else if(this.change == 'LMG') {
						addr = this.$store.state.LMGaddr;
					}
					amount = (Number(this.input1) * 10)
				} else {
					addr = this.$store.state.USDTaddr;
					amount = (Number(this.input2) * 10)
				}
				web3tools.approve(addr, this.$store.state.Exchangeaddr, amount, (e) => {
					this.$toast('Please wait')
					$(event.target).addClass('preventReClick')
					//					instance=this.$toast({
					//						message: 'Please wait',
					//						duration: -1
					//					});
					//					this.approvebool2 = true;
				}, (e) => {
					//					instance.close();
					this.$toast('Approve succeeded')
					$(event.target).removeClass('preventReClick')
					this.approvebool = true;
					this.allowance()
					//					this.approvebool2 = false;
				});
			},
			exchange() {
				if(Number(this.input1) <= 0 || Number(this.input2) <= 0) {
					this.$toast("Please enter correct number");
					return false;
				}
				let addr;
				if(this.change == 'LMT') {
					addr = this.$store.state.LMTaddr;
				} else if(this.change == 'LMG') {
					addr = this.$store.state.LMGaddr;
				}
				if(this.transformation == 0) {
					web3tools.swapExactTokensForTokens(this.$store.state.Exchangeaddr, addr, this.$store.state.USDTaddr, this.$cookies.get('walletAddress'), this.input1, (Number(this.input2) * 0.5), ((Date.parse(new Date()) / 1000) + 1200), (e) => {
						this.$toast('Please wait')
					}, (e) => {
						this.success = true;
						this.approvebool = false;
						this.allowance();
					});
				} else {
					web3tools.swapExactTokensForTokens(this.$store.state.Exchangeaddr, this.$store.state.USDTaddr, addr, this.$cookies.get('walletAddress'), this.input2, (Number(this.input1) * 0.5), ((Date.parse(new Date()) / 1000) + 1200), (e) => {
						this.$toast('Please wait')
					}, (e) => {
						this.success = true;
						this.approvebool = false;
						this.allowance();
					});
				}
			},
		},
	}
</script>

<style scoped>
	.Exchange {
		width: 100%;
		height: 75vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding-top: .8667rem;
	}
	
	.Exchange .down {
		width: 0.25rem;
    	margin: 0.1rem auto -0.25rem;
    	display: block;
    	padding: .06rem;
    	/* border: 2px solid #ffffff; */
    	border-radius: 50%;
	}
	
	.Exchange .nav {
		position: absolute;
		top: .8667rem;
		width: 100%;
		background: #372A6D;
		border-bottom: 1px solid #9485D5;
		border-top: 1px solid #9485D5;
		color: #ffffff;
		display: flex;
		justify-content: space-around;
		padding: .1rem 0;
	}
	
	.Exchange .nav .active {
		color: #35E7FF;
	}
	
	.Exchange .frame {
		background: url(../../../static/image/BG36.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		width: 100%;
		margin: 0 .11rem;
		margin-top: 0.2rem;
	}
	
	.Exchange .frame .title {
		padding-top: .29rem;
		display: block;
		margin: 0 auto;
	}
	
	.Exchange .frame div {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 0 .25rem;
		border: 1px solid rgb(53, 231, 255);
		border-radius: .36rem;
	}
	
	.Exchange .frame div img {
		width: .5267rem;
		height: .5267rem;
		margin-right: .1067rem;
		margin-top: .0967rem;
		margin-bottom: .0967rem;
		margin-left: .06rem;
	}
	
	.Exchange .frame div span {
		flex: 1;
		color: #ffffff;
		display: flex;
		align-items: center;
		font-size: .16rem;
		font-family: Magistral-Medium;
		position: relative;
	}
	
	.Exchange .frame div span ul {
		position: absolute;
		top: .2rem;
		background: #372A6D;
		padding-left: .1rem;
		left: -.1rem;
		width: .6rem;
	}
	
	.Exchange .frame div span ul li {
		margin: .05rem 0;
	}
	/*.Exchange .frame div span ul li span{
		justify-content: center;
	}  */
	
	.Exchange .frame div span i {
		width: 0;
		height: 0;
		border-left: .06rem solid transparent;
		border-right: .06rem solid transparent;
		border-top: .07rem solid #ffffff;
		display: inline-block;
		margin-left: .075rem;
	}
	
	.Exchange .frame div p {
		font-size: .23rem;
		color: #ffffff;
		line-height: .24rem;
		margin-right: .2367rem;
		font-family: Magistral-Medium;
	}
	
	.Exchange .frame div input {
		font-size: .13rem;
		color: #ffffff;
		text-align: right;
		margin-right: .1867rem;
		width: 48%;
	}
	
	.Exchange .frame>p {
		line-height: .16rem;
		color: #ffffff;
		text-align: center;
		margin-top: .38rem;
		padding-bottom: .1rem;
		font-size: .16rem;
		font-family: Magistral-Medium;
	}
	
	.Exchange .frame button {
		margin: .067rem auto .4267rem;
		width: 50%;
		display: block;
		height: .44rem;
		font-size: .17rem;
		font-weight: bold;
		background: linear-gradient(#FFFC00, #DB7100);
		border-radius: .22rem;
		font-family: Magistral-Bold;
	}
</style>