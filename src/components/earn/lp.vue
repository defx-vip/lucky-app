<template>
	<div class="lp">
		<header>
			<img @click="$router.back(-1)" src="../../../static/image/headerback.png" v-music/>
			<p>{{$t('eLuckyFarm')}}</p>
		</header>
		<div class="top">
			<div>
				<p>{{$t('eLuckyFarm')}}<img src="../../../static/image/luckyfarmlogo.png"></p>
				<button type="button" @click="$router.push('/lp?unit=LMG')" v-music>{{$t('eMYFARM')}}</button>
				<button type="button" @click="$router.push('/lpall')" v-music>{{$t('eADDLIQUIDITY')}}</button>
			</div>
		</div>
		<div class="nav">
			<p :class="unit=='LMG'?'active':''" @click="changeto('LMG');" v-music>{{$t('eLMGFarm')}}</p>
			<p :class="unit=='LMT'?'active':''" @click="changeto('LMT');" v-music>{{$t('eLMTFarm')}}</p>
			<p :class="unit=='Others'?'active':''" @click="changeto('Others');" v-music>{{$t('eOthers')}}</p>
		</div>
		<div class="markettop">
			<div class="seo">
				<img src="../../../static/image/seonft.png" />
				<input type="text" :placeholder="$t('eSearch')" v-model="seotitle" />
			</div>
			<div class="price">
				<p @click="priceactive==false?priceactive=true:priceactive=false"><span>{{price}}</span><img src="../../../static/image/topprice.png"></p>
				<ol v-if="priceactive">
					<li @click="pricetoggle($event,'Highestyield')">{{$t('mHighestyield')}}</li>
					<li @click="pricetoggle($event,'Lowestyield')">{{$t('mLowestyield')}}</li>
					<li @click="pricetoggle($event,'HighestAPR')">{{$t('eHighestAPR')}}</li>
					<li @click="pricetoggle($event,'LowestAPR')">{{$t('eLowestAPR')}}</li>
				</ol>
			</div>
		</div>
		<ul class="lplist">
			<li v-for="(item, index) in lplist">
				<h1><span>{{item.title}}  LP</span><img :src="item.img"><img :src="item.toimg"></h1>
				<ol>
					<li>
						<span>{{$t('eAPR')}} ({{$t('eMAX')}})</span>
						<p>{{(Number(item.APR)*10)}}%</p>
					</li>
					<li>
						<span>{{$t('eMultiplier')}}</span>
						<p>{{item.weight}}</p>
					</li>
					<li>
						<span>{{$t('eLiquidity')}}</span>
						<p>{{(Number(item.totalAmount)/1000000000000000000).toFixed(2)}}</p>
					</li>
				</ol>
				<div class="lphref">
					<div>
						<p>{{item.unit}} {{$t('eEARNED')}}</p>
						<span>{{String(item.profit).replace(/^(.*\..{6}).*$/,"$1")}}</span>
					</div>
					<button type="button" @click="withdrawReward(index)" v-music v-preventReClick>{{$t('eHarvest')}}</button>
				</div>
				<div class="bottom">
					<div>
						<p>{{$t('eDeposlt')}}</p>
						<span>{{Number(item.Computationalace)}}</span>
					</div>
					<div>
						<p>{{$t('enone')}}</p>
						<!--<span>1 Week</span>-->
					</div>
				</div>
				<div class="button">
					<button type="button" @click="Stake(index)" v-movedown v-music>{{$t('eStake')}}</button>
					<button type="button" class="UnStake" @click="withdraw(index,$event)" v-movedown v-music v-preventReClick>{{$t('eUnStake')}}</button>
				</div>
				<div class="lppop" v-if="item.bool" @click="item.bool=false">
					<div class="frame" @click.stop>
						<p>{{$t('eSTAKE')}} {{item.title}} LP</p>
						<div>
							<input type="text" v-model="item.amount" :placeholder="$t('eInputamount')+' '+item.title+'  LP'" v-on:input="inputFunc(index)" @keydown="handleInput" />
							<span @click="item.amount=parseFloat(Number(item.balance).toFixed(4))" v-music>{{$t('eMAX')}}</span>
						</div>
						<span>{{item.title}}  LP {{$t('ebalance')}}:  {{parseFloat(Number(item.balance).toFixed(4))}}</span>
						<button v-if="item.approvebool==false" type="button" @click="approve(index,$event)" v-movedown v-music v-preventReClick>{{$t('eapprove')}}</button>
						<button v-if="item.approvebool==true" type="button" @click="deposit(index,$event)" v-movedown v-music v-preventReClick>{{$t('eStake')}}</button>
					</div>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	import web3tools from '../../web3/web3tools'
	let _this;
	export default {
		data() {
			return {
				timelog: '',
				lplist: [],
				seolist: [],
				priceactive: false,
				price: this.$t('mPopular'),
				seotitle: '',
				seobool: false,
				unit: this.$route.query.unit,
				unitin: [],
			}
		},
		mounted() {
			_this = this;
			if(this.unit == 'LMG') {
				this.LMGquery('LMG')
			} else if(this.unit == 'LMT') {
				this.LMTquery('LMT')
			} else if(this.unit == 'Others') {
				this.Othersquery('Others')
			}
		},
		beforeDestroy() {
			clearInterval(this.timelog)
		},
		destroyed() {
			clearInterval(this.timelog)
		},
		watch: {
			'seotitle': {
				handler: function() {
					if(this.seobool == true) {
						if(this.seotitle == '') {
							this.lplist = this.seolist;
						} else {
							this.lplist = [];
							for(let i = 0; i < this.seolist.length; i++) {
								let txt = this.seolist[i].title.toString();
								if(txt.indexOf(this.seotitle) != -1) {
									console.log(this.seolist[i])
									this.lplist.push(this.seolist[i])
								}
							}
						}
					}
				}
			}
		},
		methods: {
			changeto(text) {
				console.log(text)
				this.unit = text;
				this.$route.query.unit = text;
				history.replaceState('', '', '/#/lp?unit=' + text)
				if(this.unit == 'LMG') {
					this.LMGquery('LMG')
				} else if(this.unit == 'LMT') {
					this.LMTquery('LMT')
				} else if(this.unit == 'Others') {
					this.Othersquery('Others')
				}
			},
			inputFunc(index) {
				if(Number(this.lplist[index].approve) >= Number(this.lplist[index].amount)) {
					this.lplist[index].approvebool = true
					this.seolist[index].approvebool = true
				} else {
					this.lplist[index].approvebool = false
					this.seolist[index].approvebool = false
				}
			},
			withdraw(index, event) {
				if(this.unitin.includes(this.unit)) {
					this.$toast('Please wait')
					return false;
				}
				web3tools.withdraw(this.lplist[index].pooladdr, this.lplist[index].num, (e) => {
					this.$toast('Please wait')
					$(event.target).addClass('preventReClick')
					this.unitin.push(this.unit)
				}, (e) => {
					if(_this.unitin[0] != _this.unit) {
						_this.unitin.shift()
					} else {
						web3tools.pools(_this.lplist[index].pooladdr, _this.lplist[index].num, (all) => {
							web3tools.getbalance(_this.lplist[index].addr, "LP", (balance) => {
								web3tools.getbalance(_this.lplist[index].pooladdr, "THR", (Computationalace) => {
									web3tools.APR(_this.lplist[index].pooladdr, _this.lplist[index].num, (apr) => {
										_this.lplist[index].Computationalace = Computationalace
										_this.seolist[index].Computationalace = Computationalace
										_this.lplist[index].balance = balance
										_this.seolist[index].balance = balance
										_this.lplist[index].APR = apr.yopt
										_this.seolist[index].APR = apr.yopt
										_this.lplist[index].totalAmount = all.totalAmount
										_this.seolist[index].totalAmount = all.totalAmount
										$(event.target).removeClass('preventReClick')
										_this.unitin.shift()
									})
								})
							})
						})
					}
				});
			},
			withdrawReward(index) {
				if(this.unitin.includes(this.unit)) {
					this.$toast('Please wait')
					return false;
				}
				web3tools.withdrawReward(this.lplist[index].pooladdr, (e) => {
					this.$toast('Please wait')
					this.unitin.push(this.unit)
				}, (e) => {
					if(_this.unitin[0] != _this.unit) {
						_this.unitin.shift()
					} else {
						web3tools.poolEarned(_this.lplist[index].pooladdr, _this.lplist[index].num, (e) => {
							web3tools.getbalance(_this.lplist[index].addr, "LP", (balance) => {
								_this.$toast('Success')
								_this.lplist[index].profit = e
								_this.seolist[index].profit = e
								_this.lplist[index].balance = balance
								_this.seolist[index].balance = balance
								_this.unitin.shift()
							})
						})
					}
				});
			},
			deposit(index, event) {
				if(this.unitin.includes(this.unit)) {
					this.$toast('Please wait')
					return false;
				}
				if(Number(this.lplist[index].amount) <= 0 || this.lplist[index].amount == "") {
					this.$toast("Amount is incorrect");
					return false;
				}
				web3tools.deposit(this.lplist[index].pooladdr, this.lplist[index].amount, this.lplist[index].num, (e) => {
					this.$toast('Please wait')
					$(event.target).addClass('preventReClick')
					this.unitin.push(this.unit)
				}, (e) => {
					if(_this.unitin[0] != _this.unit) {
						_this.unitin.shift()
					} else {
						web3tools.pools(_this.lplist[index].pooladdr, _this.lplist[index].num, (all) => {
							web3tools.getbalance(_this.lplist[index].addr, "LP", (balance) => {
								web3tools.getbalance(_this.lplist[index].pooladdr, "THR", (Computationalace) => {
									web3tools.APR(_this.lplist[index].pooladdr, _this.lplist[index].num, (apr) => {
										_this.lplist[index].Computationalace = Computationalace
										_this.seolist[index].Computationalace = Computationalace
										_this.lplist[index].balance = balance
										_this.seolist[index].balance = balance
										_this.lplist[index].totalAmount = all.totalAmount
										_this.seolist[index].totalAmount = all.totalAmount
										_this.lplist[index].APR = apr.yopt
										_this.seolist[index].APR = apr.yopt
										$(event.target).removeClass('preventReClick')
										_this.lplist[index].bool = false
										_this.seolist[index].bool = false
										_this.unitin.shift()
									})
								})
							})
						})
					}
				});
			},
			approve(index, event) {
				if(this.unitin.includes(this.unit)) {
					this.$toast('Please wait')
					return false;
				}
				if(Number(this.lplist[index].amount) <= 0 || this.lplist[index].amount == "") {
					this.$toast("Amount is incorrect");
					return false;
				}
				web3tools.approve(this.lplist[index].addr, this.lplist[index].pooladdr, (Number(this.lplist[index].amount) * 10), (e) => {
					this.$toast('Please wait')
					$(event.target).addClass('preventReClick')
					this.unitin.push(this.unit)
				}, (e) => {
					if(_this.unitin[0] != _this.unit) {
						_this.unitin.shift()
					} else {
						web3tools.allowance(this.lplist[index].addr, this.$cookies.get('walletAddress'), this.lplist[index].pooladdr, (approve) => {
							_this.lplist[index].approve = approve
							_this.seolist[index].approve = approve
							if(Number(_this.lplist[index].approve) >= Number(_this.lplist[index].amount)) {
								_this.lplist[index].approvebool = true
								_this.seolist[index].approvebool = true
							} else {
								_this.lplist[index].approvebool = false
								_this.seolist[index].approvebool = false
							}
							$(event.target).removeClass('preventReClick')
							_this.$toast('Approve succeeded')
							_this.unitin.shift()
						})
					}
				});
			},
			poolEarned() {
				this.timelog = setInterval(function() {
					for(let n = 0; n < _this.lplist.length; n++) {
						web3tools.poolEarned(_this.lplist[n].pooladdr, _this.lplist[n].num, (e) => {
							_this.lplist[n].profit = e
							_this.seolist[n].profit = e
						})
					}
				}, 10000)
			},
			Stake(index) {
				web3tools.getbalance(this.lplist[index].addr, "LP", (balance) => {
					web3tools.allowance(this.lplist[index].addr, this.$cookies.get('walletAddress'), this.lplist[index].pooladdr, (approve) => {
						_this.lplist[index].balance = balance
						_this.seolist[index].balance = balance
						_this.lplist[index].approve = approve
						_this.seolist[index].approve = approve
						_this.lplist[index].bool = true
						_this.seolist[index].bool = true
					})
				})
			},
			LMGquery(txt) {
				this.price = this.$t('mPopular')
				this.lplist = [];
				let lplist = [{
					unit: 'LMG',
					coin: 'USDT',
					title: 'LMG-USDT',
					img: require('../../../static/image/LMG.png'),
					toimg: require('../../../static/image/Tether-USDT-icon-1.png'),
					addr: this.$store.state.LMGLPaddr,
					pooladdr: this.$store.state.GggPooladdr,
					num: 0,
					amount: '',
					approvebool: false,
					bool: false
				}]
				this.seolist = [];
				this.seobool = false;
				let ool = 0;
				for(let i = 0; i < lplist.length; i++) {
					web3tools.pools(lplist[i].pooladdr, lplist[i].num, (all) => {
						web3tools.getbalance(lplist[i].pooladdr, "THR", (Computationalace) => {
							web3tools.poolEarned(lplist[i].pooladdr, lplist[i].num, (e) => {
								web3tools.APR(lplist[i].pooladdr, lplist[i].num, (apr) => {
									console.log(apr)
									ool++
									let obj = lplist[i]
									obj['weight'] = all.weight;
									obj['totalAmount'] = all.totalAmount;
									obj['Computationalace'] = Computationalace;
									obj['APR'] = apr.yopt;
									obj['profit'] = e;
									obj['balance'] = '';
									obj['approve'] = '';
									if(txt == 'LMG' && this.unit == 'LMG') {
										this.forgo(obj)
									}
									if(lplist.length == ool) {
										this.seobool = true;
										this.poolEarned()
									}
								})
							})
						})
					})
				}
			},
			LMTquery(txt) {
				this.price = this.$t('mPopular')
				this.lplist = [];
				let lplist = [{
					unit: 'LMT',
					coin: 'USDT',
					title: 'LMT-USDT',
					img: require('../../../static/image/LMT.png'),
					toimg: require('../../../static/image/Tether-USDT-icon-1.png'),
					addr: this.$store.state.LMTLPaddr,
					pooladdr: this.$store.state.TttPooladdr,
					num: 0,
					amount: '',
					approvebool: false,
					bool: false
				}]
				this.seolist = [];
				this.seobool = false;
				let ool = 0;
				for(let i = 0; i < lplist.length; i++) {
					web3tools.pools(lplist[i].pooladdr, lplist[i].num, (all) => {
						web3tools.getbalance(lplist[i].pooladdr, "THR", (Computationalace) => {
							web3tools.poolEarned(lplist[i].pooladdr, lplist[i].num, (e) => {
								web3tools.APR(lplist[i].pooladdr, lplist[i].num, (apr) => {
									ool++
									let obj = lplist[i]
									obj['weight'] = all.weight;
									obj['totalAmount'] = all.totalAmount;
									obj['Computationalace'] = Computationalace;
									obj['APR'] = apr.yopt;
									obj['profit'] = e;
									obj['balance'] = '';
									obj['approve'] = '';
									if(txt == 'LMT' && this.unit == 'LMT') {
										this.forgo(obj)
									}
									if(lplist.length == ool) {
										this.seobool = true;
										this.poolEarned()
									}
								})
							})
						})
					})
				}
			},
			Othersquery(txt) {
				this.price = this.$t('mPopular')
				this.lplist = [];
				let lplist = []
				this.seolist = [];
				this.seobool = false;
				let ool = 0;
			},
			forgo(obj) {
				if(_this.seolist.length == 0) {
					_this.lplist.push(obj)
					_this.seolist.push(obj)
					return false
				}
				let bool = false;
				for(let a = 0; a < _this.seolist.length; a++) {
					if(obj.title == _this.seolist[a].title) {
						bool = true;
						break;
					}
					if(bool == false && (_this.seolist.length - 1) == a) {
						_this.lplist.push(obj)
						_this.seolist.push(obj)
					}
				}
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
			pricetoggle(e, text) {
				this.price = e.target.innerText;
				this.priceactive = false;
				if(text == "Highestyield") {
					this.lplist.sort(function(a, b) {
						return b.profit - a.profit
					})
				} else if(text == "Lowestyield") {
					this.lplist.sort(function(a, b) {
						return a.profit - b.profit
					})
				} else if(text == "HighestAPR") {
					this.lplist.sort(function(a, b) {
						return b.APR - a.APR
					})
				} else if(text == "LowestAPR") {
					this.lplist.sort(function(a, b) {
						return a.APR - b.APR
					})
				}
			}
		},
	}
</script>

<style scoped>
	.lp {
		margin-bottom: .93rem;
	}
	
	.lp .top {
		background: url(../../../static/image/luckyfarmtop.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		margin: 0.0633rem 0.1533rem 0;
		height: 1.4933rem;
	}
	
	.lp .top div {
		width: 50%;
		float: right;
		margin-right: 0.2433rem;
	}
	
	.lp .top div p {
		color: #ffffff;
		font-size: .2rem;
		font-family: 'Magistral-Bold';
		text-align: right;
		margin-top: 0.3rem;
		margin-bottom: 0.13rem;
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}
	
	.lp .top div p img {
		width: 0.1333rem;
		margin-left: 0.0367rem;
	}
	
	.lp .top button {
		background: url(../../../static/image/915button.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		width: 1.2667rem;
		display: block;
		height: 0.21rem;
		color: #FFFEFF;
		font-size: .14rem;
		text-transform: uppercase;
		margin-bottom: 0.11rem;
		float: right;
	}
	
	.lp .nav {
		margin: 0.08rem 0.15rem 0.02rem;
		background: #490785;
		border-radius: .06rem;
		border: 1px solid #C18DF4;
		padding: .03rem;
		color: #ffffff;
		display: flex;
		justify-content: space-around;
	}
	
	.lp .nav p {
		flex: 1;
		text-align: center;
		padding: 0.08rem 0;
		border-radius: 0.06rem;
		font-size: .16rem;
	}
	
	.lp .nav .active {
		background: #F2C900;
		color: #000000;
	}
	
	.lp .markettop {
		display: flex;
	}
	
	.lp .seo {
		margin: .06rem .14rem .1rem;
		background: rgba(73, 7, 133, .55);
		border-radius: .18rem;
		border: 1px solid #6A5C9E;
		height: .3rem;
		display: flex;
		align-items: center;
		position: relative;
		width: 51%;
	}
	
	.lp .seo input {
		color: #ffffff;
		width: 70%;
		padding: 0;
		font-size: .16rem;
		font-family: Magistral-Bold;
		font-weight: bold;
	}
	
	.lp .seo img {
		width: .16rem;
		height: .16rem;
		margin-left: .113rem;
		margin-right: .14rem;
	}
	
	.lp .markettop .price {
		margin-right: .15rem;
		margin-top: .06rem;
		border: 1px solid #35E7FF;
		border-radius: .18rem;
		color: #ffffff;
		background: #490785;
		position: absolute;
		right: 0;
		top: 0;
		width: 1.4rem;
		z-index: 1;
	}
	
	.lp .markettop p {
		font-size: .12rem;
		font-family: Magistral-Medium;
		margin-left: .1rem;
		height: .3rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.lp .markettop p span {
		width: 75%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	
	.lp .markettop p img {
		width: .1433rem;
		height: .08rem;
		margin-right: .1rem;
	}
	
	.lp .markettop {
		position: relative;
	}
	
	.lp .markettop ol {
		margin: 0.05rem .1rem 0;
	}
	
	.lp .markettop ol li {
		font-size: .12rem;
		font-family: Magistral-Medium;
		margin-bottom: .13rem;
	}
	
	.lp .lplist>li {
		background: url(../../../static/image/luckyfarmBG.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		margin: 0 0.12rem;
		padding-top: 0.1367rem;
		position: relative;
	}
	
	.lp .lplist>li h1 {
		margin: 0 0.28rem 0;
		color: #ffffff;
		font-family: 'Magistral-Bold';
		font-size: .16rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.lp .lplist>li h1 img {
		width: 0.3rem;
		display: block;
	}
	
	.lp .lplist>li h1 img:nth-child(3) {
		margin-right: .0833rem;
	}
	
	.lp .lplist>li h1 img:nth-child(2) {
		margin-right: .22rem;
	}
	
	.lp .lplist>li h1 span {
		flex: 1;
	}
	
	.lp .lplist>li ol {
		display: flex;
		margin: 0.24rem 0.27rem 0;
		justify-content: space-between;
		border-bottom: 1px solid #32BDE4;
		padding: 0 0.05rem 0.1rem;
	}
	
	.lp .lplist>li ol li {
		text-align: center;
	}
	
	.lp .lplist>li ol li:nth-child(3) {
		text-align: right;
	}
	
	.lp .lplist>li ol li span {
		color: #ffffff;
		font-size: .12rem;
		font-family: 'Magistral-Book';
		margin-bottom: 0.1rem;
		display: block;
	}
	
	.lp .lplist>li ol li p {
		color: #ffffff;
		font-size: .2rem;
	}
	
	.lp .lplist>li .lphref {
		margin: 0.1467rem 0.32rem 0;
		background: #7D3AC1;
		border-radius: 0.0667rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.lp .lplist>li .lphref div {
		margin-left: 0.2rem;
	}
	
	.lp .lplist>li .lphref div p {
		font-family: 'Magistral-Book';
		color: #ffffff;
		font-size: .14rem;
		margin-top: 0.09rem;
	}
	
	.lp .lplist>li .lphref div span {
		font-size: .2rem;
		font-family: 'Magistral-Book';
		color: #ffffff;
		margin-top: 0.12rem;
		display: block;
		margin-bottom: 0.15rem;
	}
	
	.lp .lplist>li .lphref button {
		width: 1rem;
		height: 0.3rem;
		margin-right: 0.08rem;
		background: #57218E;
		border-radius: 0.0667rem;
		color: #ffffff;
		font-size: .16rem;
	}
	
	.lp .lplist>li .bottom {
		margin: 0.25rem 0.32rem 0;
		display: flex;
		justify-content: space-around;
	}
	
	.lp .lplist>li .bottom div {
		color: #ffffff;
		text-align: center;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
	}
	
	.lp .lplist>li .bottom div p {
		font-family: 'Magistral-Bold';
		font-size: .16rem;
		width: 100%;
	}
	
	.lp .lplist>li .bottom div span {
		font-family: 'Magistral-Bold';
		font-size: .16rem;
		margin-top: 0.16rem;
		display: block;
		width: 100%;
	}
	
	.lp .lplist>li .button {
		margin: 0.2rem 0.32rem 0;
		display: flex;
		justify-content: space-between;
	}
	
	.lp .lplist>li .button button {
		margin-bottom: 0.29rem;
		width: 0.98rem;
		height: 0.26rem;
		background: #F2C900;
		border-radius: 0.0667rem;
		font-size: .16rem;
	}
	
	.lp .lplist>li .lppop {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 98%;
		background: rgba(0, 0, 0, .5);
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.lp .lplist>li .lppop .frame {
		width: 2.86rem;
		background: #884AC8;
		border-radius: 0.2rem;
	}
	
	.lp .lplist>li .lppop .frame>p {
		font-size: .16rem;
		color: #ffffff;
		font-family: 'Magistral-Bold';
		margin-left: 0.1067rem;
		margin-top: 0.14rem;
	}
	
	.lp .lplist>li .lppop .frame div {
		background: #62279F;
		margin: 0.4rem 0.1333rem 0;
		height: 0.42rem;
		border-radius: 0.0667rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 0.07rem;
	}
	
	.lp .lplist>li .lppop .frame div input {
		flex: 1;
		font-size: .14rem;
		color: #ffffff;
	}
	
	.lp .lplist>li .lppop .frame div span {
		font-family: 'Magistral-Bold';
		color: #ffffff;
		font-size: .14rem;
		margin-left: 0.07rem;
	}
	
	.lp .lplist>li .lppop .frame>span {
		display: block;
		text-align: right;
		margin-top: 0.08rem;
		margin-right: 0.2rem;
		color: #ffffff;
		font-size: .14rem;
	}
	
	.lp .lplist>li .lppop .frame button {
		display: block;
		background: #F2C900;
		margin: 0.3rem auto 0.2233rem;
		width: 1.07rem;
		height: 0.33rem;
		border-radius: 0.0667rem;
		font-size: .16rem;
	}
</style>