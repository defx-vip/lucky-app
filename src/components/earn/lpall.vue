<template>
	<div class="lpall">
		<header>
			<img @click="$router.back(-1)" src="../../../static/image/headerback.png" v-music/>
			<p>{{$t('eLuckyFarm')}}</p>
		</header>
		<div class="top">
			<div>
				<p>{{$t('eLuckyFarm')}}<img src="../../../static/image/luckyfarmlogo.png"></p>
				<button type="button" @click="$router.push('/lp?unit=LMG')" v-movedown v-music>{{$t('eMYFARM')}}</button>
				<button type="button" @click="$router.push('/lpall')" v-movedown v-music>{{$t('eADDLIQUIDITY')}}</button>
			</div>
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
				<p>{{item.title}} LP</p>
				<div>
					<span>{{$t('eEarned')}}</span>
					<span>{{Number(item.profit).toFixed(2)}}</span>
				</div>
				<div>
					<span>{{$t('eAPR')}}</span>
					<span>{{Number(item.APR)*10}}%</span>
				</div>
				<button type="button" @click="goherf(item.href)" v-movedown v-music>{{$t('eGO')}}</button>
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
			}
		},
		mounted() {
			_this = this;
			this.query()
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
			goherf(url) {
				window.location.href = url
			},
			poolEarned() {
				let addr;
				this.timelog = setInterval(function() {
					for(let n = 0; n < _this.lplist.length; n++) {
						if(_this.lplist[n].unit == 'LMG') {
							addr = _this.$store.state.GggPooladdr
						} else if(_this.lplist[n].unit == 'LMT') {
							addr = _this.$store.state.TttPooladdr
						}
						web3tools.poolEarned(addr, _this.lplist[n].num, (e) => {
							_this.lplist[n].profit = e
						})
					}
				}, 10000)
			},
			query(txt) {
				this.price = this.$t('mPopular')
				this.lplist = [];
				let lplist = [{
					unit: 'LMG',
					coin: 'USDT',
					title: 'LMG-USDT',
//					href: "https://pancake.kiemtienonline360.com/?locale=zh-CN&utm_source=imtoken#/add/0x1c1D49E778ae464aDC60A2aEFE3C3a0a7B9170d7/0x419bC0E73Ead2569d7c4E9b8C5792FF3a80b82Fd",
					href:"https://pancakeswap.finance/add/0xe8D9cCeffB69cF333f38f1EA94A440E73F6B2055/0xC9790430CDB18177089e6327F730bFa6cC67711d",
					num: 0,
				}, {
					unit: 'LMT',
					coin: 'USDT',
					title: 'LMT-USDT',
//					href: "https://pancake.kiemtienonline360.com/?locale=zh-CN&utm_source=imtoken#/add/0x1c1D49E778ae464aDC60A2aEFE3C3a0a7B9170d7/0x7262505acaA9c20fab89C9B5941676Cfd5Ab7f16",
					href: "https://pancakeswap.finance/add/0xbd28C0A23Bd116CB5413F7acb3C332D8836e0b1D/0xC9790430CDB18177089e6327F730bFa6cC67711d",
					num: 0,
				}]
				this.seolist = [];
				this.seobool = false;
				let ool = 0;
				for(let i = 0; i < lplist.length; i++) {
					let addr;
					if(lplist[i].unit == 'LMG') {
						addr = this.$store.state.GggPooladdr
					} else if(lplist[i].unit == 'LMT') {
						addr = this.$store.state.TttPooladdr
					}
					web3tools.poolEarned(addr, lplist[i].num, (e) => {
						web3tools.APR(addr, lplist[i].num, (apr) => {
							ool++
							let obj = lplist[i]
							obj['profit'] = e;
							obj['APR'] = apr.yopt;
							this.lplist.push(obj)
							this.seolist.push(obj)
							if(lplist.length == ool) {
								this.seobool = true;
								this.poolEarned()
							}
						})
					})
				}
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
	.lpall {
		margin-bottom: .93rem;
	}
	
	.lpall .top {
		background: url(../../../static/image/luckyfarmtop.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		margin: 0.0633rem 0.1533rem 0;
		height: 1.4933rem;
	}
	
	.lpall .top div {
		width: 50%;
		float: right;
		margin-right: 0.2433rem;
	}
	
	.lpall .top div p {
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
	
	.lpall .top div p img {
		width: 0.1333rem;
		margin-left: 0.0367rem;
	}
	
	.lpall .top button {
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
	
	.lpall .markettop {
		display: flex;
	}
	
	.lpall .seo {
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
	
	.lpall .seo input {
		color: #ffffff;
		width: 70%;
		padding: 0;
		font-size: .16rem;
		font-family: Magistral-Bold;
		font-weight: bold;
	}
	
	.lpall .seo img {
		width: .16rem;
		height: .16rem;
		margin-left: .113rem;
		margin-right: .14rem;
	}
	
	.lpall .markettop .price {
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
	}
	
	.lpall .markettop p {
		font-size: .12rem;
		font-family: Magistral-Medium;
		margin-left: .1rem;
		height: .3rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.lpall .markettop p span {
		width: 75%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	
	.lpall .markettop p img {
		width: .1433rem;
		height: .08rem;
		margin-right: .1rem;
	}
	
	.lpall .markettop {
		position: relative;
	}
	
	.lpall .markettop ol {
		margin: 0.05rem .1rem 0;
	}
	
	.lpall .markettop ol li {
		font-size: .12rem;
		font-family: Magistral-Medium;
		margin-bottom: .13rem;
	}
	
	.lpall .lplist {
		margin: 0 0.15rem;
	}
	
	.lpall .lplist li {
		background: #490785;
		margin-bottom: 0.07rem;
		border-radius: 0.067rem;
		border: 1px solid #C18DF4;
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 0.5rem;
	}
	
	.lpall .lplist li p {
		color: #ffffff;
		margin-left: 0.07rem;
		font-size: .14rem;
	}
	
	.lpall .lplist li div span:first-child {
		margin-bottom: 0.08rem;
	}
	
	.lpall .lplist li div span {
		display: block;
		text-align: center;
		color: #ffffff;
		font-size: .12rem;
		font-family: 'Magistral-Book';
	}
	
	.lpall .lplist li button {
		width: 0.7rem;
		height: 0.3rem;
		background: #F2C900;
		margin-right: 0.14rem;
		border-radius: 0.0533rem;
		font-size: .16rem;
		font-family: 'Magistral-Bold';
	}
</style>