<template>
	<div class="receive">
		<div class="top">
			<h1>{{$t('bNFTSALARY')}}</h1>
			<p @click="$router.push('/nft?change=rare')" v-music>{{$t('bOPENBAG')}}<img src="../../../static/image/NFTtopblack.png"></p>
			<button type="button" @click="$router.push('/market/NFTMarket?change=box')" v-music>{{$t('fMARKET')}}<img src="../../../static/image/arrowcopy.png"></button>
		</div>
		<div class="nav">
			<p :class="change=='rare'?'active':''" @click="changeto('rare');" v-music>{{$t('bRareNFT')}}</p>
			<p :class="change=='ordinary'?'active':''" @click="changeto('ordinary');" v-music>{{$t('bOrdinaryNFT')}}</p>
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
					<li @click="pricetoggle($event,'Highestlevel')">{{$t('mHighestlevel')}}</li>
					<li @click="pricetoggle($event,'Lowestlevel')">{{$t('mLowestlevel')}}</li>
				</ol>
			</div>
		</div>
		<ul>
			<li v-for="(item, index) in nftlist" :key="item.id">
				<div class="left">
					<img :src="item.image" />
				</div>
				<div class="right">
					<div>
						<p>{{$t('eLEVEL')}} {{item.level}}</p>
						<p>{{timelist[index].timeData._H}}:{{timelist[index].timeData._M}}:{{timelist[index].timeData._S}}</p>
					</div>
					<div>
						<span>{{$t('breceive')}} {{item.give}} {{item.sort=='rare'?$t('LMT'):$t('LMG')}}</span>
						<button type="button" :class="timelist[index].timeData._D!='00'||timelist[index].timeData._H!='00'||timelist[index].timeData._M!='00'||timelist[index].timeData._S!='00'?'preventReClick':''" @click="bonusForIds(item.tokenId)" v-music>{{$t('breceive')}}</button>
					</div>
				</div>
			</li>
		</ul>
		<div class="nodata" v-if="(seobool[0]==true&&nftlist.length==0&&change=='rare')||(seobool[1]==true&&nftlist.length==0&&change=='ordinary')">
			<img src="../../../static/image/sigh.png" />
			<p>{{$t('mTherearecurrebtlynorewards')}}</p>
		</div>
	</div>
</template>

<script>
	Date.prototype.Format = function(fmt) {
		var o = {
			"M+": this.getMonth() + 1,
			"d+": this.getDate(),
			"H+": this.getHours(),
			"m+": this.getMinutes(),
			"s+": this.getSeconds(),
			"q+": Math.floor((this.getMonth() + 3) / 3),
			"S": this.getMilliseconds()
		};
		if(/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		for(var k in o)
			if(new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		return fmt;
	}
	const funcProcessingTime = _str => _str.toString().length >= 2 ? _str : '0' + _str
	import web3tools from '../../web3/web3tools'
	let _this;
	export default {
		data() {
			return {
				Timing: null,
				CountdownTiming: null,
				nftlist: [],
				seolist: [],
				seobool: [false, false],
				change: this.$route.query.change,
				priceactive: false,
				price: this.$t('mPopular'),
				seotitle: '',
				timelist: [],
			}
		},
		watch: {
			'seotitle': {
				handler: function() {
					if((this.seobool[0] == true && this.change == 'rare') || (this.seobool[1] == true && this.change == 'ordinary')) {
						if(this.seotitle == '') {
							this.nftlist = this.seolist;
						} else {
							this.nftlist = [];
							for(let i = 0; i < this.seolist.length; i++) {
								let txt = this.seolist[i].level.toString();
								if(txt.indexOf(this.seotitle) != -1) {
									console.log(this.seolist[i])
									this.nftlist.push(this.seolist[i])
								}
							}
						}
					}

				}
			}
		},
		mounted() {
			_this = this;
			if(this.change == 'rare') {
				this.queryNFT('rare')
			} else if(this.change == 'ordinary') {
				this.queryNFT('ordinary')
			}
		},
		methods: {
			changeto(text) {
				this.change = text;
				this.$route.query.change = text;
				history.replaceState('', '', '/#/receive?change=' + text)
				if(this.change == 'rare') {
					this.queryNFT('rare')
				} else if(this.change == 'ordinary') {
					this.queryNFT('ordinary')
				}
			},
			bonusForIds(tokenId) {
				let arr = [];
				arr.push(tokenId)
				web3tools.bonusForIds(this.$store.state.gameaddr, arr, (e) => {
					this.$toast('Please wait')
				}, (e) => {
					this.$toast('Success')
					if(this.change == 'rare') {
						this.queryNFT('rare')
					} else if(this.change == 'ordinary') {
						this.queryNFT('ordinary')
					}
				});
			},
			queryNFT(txt) {
				this.price = this.$t('mPopular')
				this.seobool = [false, false];
				this.nftlist = [];
				this.seolist = [];
				this.timelist = [];
				let ool = 0;
				web3tools.getbalance(this.$store.state.NFTaddr, "NFT", (num) => {
					if(num == "" || num == 0) {
						this.seobool = [true, true];
					}
					for(let i = 0; i < num; i++) {
						web3tools.tokenOfOwnerByIndex(this.$store.state.NFTaddr, i, (tokenId) => {
							web3tools.queryIsRare(this.$store.state.gameaddr, tokenId, (sort) => {
								web3tools.personLevel(this.$store.state.gameaddr, tokenId, (level) => {
									web3tools.bonusForLogin(this.$store.state.gameaddr, tokenId, (give) => {
										web3tools.BonusTimeLeft(this.$store.state.gameaddr, tokenId, (time) => {
											web3tools.tokenURI(this.$store.state.NFTaddr, tokenId, (e) => {
												this.$nftget(e, {}).then((res) => {
													ool++
													let obj = []
													if(res.image != '' && res.image != undefined) {
														obj = res;
													}
													obj['tokenId'] = tokenId;
													obj['give'] = give;
													obj['level'] = level;
													obj['price'] = '';
													console.log(time._time)
													let timein = (Date.parse(new Date()) / 1000) + Number(time._time)
													obj['endtime'] = new Date(Number(timein) * 1000).Format("yyyy-MM-dd HH:mm:ss");
													obj['timeData'] = {
														_D: '01',
														_H: '00',
														_M: '00',
														_S: '00'
													}
													if(_this.change == 'rare' && sort == 1) {
														obj['sort'] = 'rare';
														if(txt == 'rare') {
															_this.forgo(obj)
														}
													} else if(_this.change == 'ordinary' && sort != 1) {
														obj['sort'] = 'ordinary';
														if(txt == 'ordinary') {
															_this.forgo(obj)
														}
													}
													if(num == ool) {
														if(txt == 'ordinary' && _this.change == 'ordinary') {
															_this.seobool = [false, true];
														} else if(txt == 'rare' && _this.change == 'rare') {
															_this.seobool = [true, false];
														}
														console.log(_this.seobool)
														_this.funcCountdownDiff(_this.timelist)
													}
												})
											});
										});
									});
								});
							})
						});
					}
				});
			},
			forgo(obj) {
				if(_this.seolist.length == 0) {
					_this.nftlist.push(obj)
					_this.seolist.push(obj)
					_this.timelist.push({
						endtime: obj.endtime,
						timeData: {
							_D: '01',
							_H: '00',
							_M: '00',
							_S: '00'
						}
					})
					return false
				}
				let bool = false;
				for(let a = 0; a < _this.seolist.length; a++) {
					if(obj.tokenId == _this.seolist[a].tokenId) {
						bool = true;
						break;
					}
					if(bool == false && (_this.seolist.length - 1) == a) {
						_this.nftlist.push(obj)
						_this.seolist.push(obj)
						_this.timelist.push({
							endtime: obj.endtime,
							timeData: {
								_D: '01',
								_H: '00',
								_M: '00',
								_S: '00'
							}
						})
					}
				}
			},
			pricetoggle(e, text) {
				this.price = e.target.innerText;
				this.priceactive = false;
				if(text == "Highestyield") {
					this.nftlist.sort(function(a, b) {
						return b.give - a.give
					})
				} else if(text == "Lowestyield") {
					this.nftlist.sort(function(a, b) {
						return a.give - b.give
					})
				} else if(text == "Highestlevel") {
					this.nftlist.sort(function(a, b) {
						return b.level - a.level
					})
				} else if(text == "Lowestlevel") {
					this.nftlist.sort(function(a, b) {
						return a.level - b.level
					})
				}
			},
			funcCountdownDiff(time, _call) {
				clearInterval(this.CountdownTiming)
				this.CountdownTiming = setInterval(() => {
					for(let i = 0; i < time.length; i++) {
						if(time[i].endtime != '') {
							let d = moment.duration(moment(time[i].endtime).diff(moment())).days(),
								h = moment.duration(moment(time[i].endtime).diff(moment())).hours(),
								m = moment.duration(moment(time[i].endtime).diff(moment())).minutes(),
								s = moment.duration(moment(time[i].endtime).diff(moment())).seconds()
							if(d < 0 || h < 0 || m < 0 || s < 0) {
								time[i].timeData = {
									_D: '00',
									_H: '00',
									_M: '00',
									_S: '00'
								}
								clearInterval(this.Timing)
								this.Timing = setTimeout(() => {
									//									this.leveltime = true;
								}, 1e3)
								//								clearInterval(this.CountdownTiming)
								//								this.CountdownTiming = null
							} else {
								time[i].timeData = {
									_D: funcProcessingTime(d),
									_H: funcProcessingTime(h),
									_M: funcProcessingTime(m),
									_S: funcProcessingTime(s)
								}
							}
						}
					}
				}, 1e3)
			},
		},
	}
</script>

<style scoped>
	.receive {
		width: 100%;
		margin-bottom: .93rem;
	}

	.receive .nodata {
		margin-top: 0.8rem;
	}

	.receive .nodata img {
		width: 0.8rem;
		display: block;
		margin: 0 auto;
	}

	.receive .nodata p {
		text-align: center;
		margin-top: 0.19rem;
		color: #ffffff;
		font-size: .14rem;
	}

	.receive .nav {
		margin: 0 .15rem .08rem;
		background: #490785;
		border-radius: .06rem;
		border: 1px solid #C18DF4;
		padding: .03rem;
		color: #ffffff;
		display: flex;
		justify-content: space-around;
	}

	.receive .nav p {
		flex: 1;
		text-align: center;
		padding: .1rem 0;
		border-radius: .06rem;
		font-size: .14rem;
	}

	.receive .nav .active {
		background: #F2C900;
		color: #000000;
	}

	.receive .top {
		background: url(../../../static/image/receiveBG.png);
		margin: .17rem .11rem 0;
		background-size: 100% 100%;
		background-repeat: no-repeat;
		height: 1.9rem;
		position: relative;
	}

	.receive .top>h1 {
		font-size: .24rem;
		text-align: right;
		color: #ffffff;
		font-family: Magistral-Bold;
		padding-top: .34rem;
		margin-right: 0.1667rem;
		font-weight: bold;
		line-height: .2033rem;
	}

	.receive .top>h1 span {
		font-size: .19rem;
	}

	.receive .top>p {
		float: right;
		border-radius: 0.15rem;
		background: linear-gradient(#ffffff, #01D5D2);
		padding-left: 0.17rem;
		padding-right: 0.11rem;
		font-size: .16rem;
		display: flex;
		align-items: center;
		justify-content: right;
		margin-top: 0.31rem;
		margin-right: 0.1733rem;
		text-transform: uppercase;
		padding-top: 0.05rem;
		padding-bottom: 0.04rem;
	}

	.receive .top>p img {
		width: 0.1267rem;
		margin-left: 0.0467rem;
		margin-top: -0.03rem;
	}

	.receive .top div {
		position: absolute;
		top: 0.2533rem;
		left: 0.2533rem;
		width: 1.2rem;
		height: 1.2rem;
		border: 2px solid #35E7FF;
		background: #3E365D;
		border-radius: 0.1rem;
	}

	.receive .top div img {
		width: 100%;
		height: 100%;
		border-radius: 0.1rem;
	}

	.receive .top button {
		float: right;
		margin-top: .1rem;
		margin-right: .1667rem;
		border-radius: .15rem;
		font-size: .14rem;
		font-family: Magistral-Bold;
		font-weight: bold;
		background: linear-gradient(#FFFC00, #DB7100);
		padding: .05rem .12rem;
		margin-left: 30%;
		min-width: 1.29rem;
	}

	.receive .top button img {
		margin-left: .06rem;
		width: .12rem;
		height: .12rem;
		vertical-align: middle;
		margin-top: -.03rem;
	}

	.receive .markettop {
		display: flex;
	}

	.receive .seo {
		margin: 0 .14rem;
		background: rgba(73, 7, 133, .55);
		border-radius: .18rem;
		border: 1px solid #6A5C9E;
		height: .3rem;
		display: flex;
		align-items: center;
		position: relative;
		width: 51%;
	}

	.receive .seo input {
		color: #ffffff;
		width: 70%;
		padding: 0;
		font-size: .16rem;
		font-family: Magistral-Bold;
		font-weight: bold;
	}

	.receive .seo img {
		width: .16rem;
		height: .16rem;
		margin-left: .113rem;
		margin-right: .14rem;
	}

	.receive .markettop .price {
		margin-right: .15rem;
		border: 1px solid #35E7FF;
		border-radius: .18rem;
		color: #ffffff;
		background: #490785;
		position: absolute;
		right: 0;
		top: 0;
		width: 1.4rem;
	}

	.receive .markettop p {
		font-size: .12rem;
		font-family: Magistral-Medium;
		margin-left: .1rem;
		height: .3rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.receive .markettop p span {
		width: 75%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.receive .markettop p img {
		width: .1433rem;
		height: .08rem;
		margin-right: .1rem;
	}

	.receive .markettop {
		position: relative;
		margin-bottom: .09rem;
	}

	.receive .markettop ol {
		margin: 0.05rem .1rem 0;
	}

	.receive .markettop ol li {
		font-size: .12rem;
		font-family: Magistral-Medium;
		margin-bottom: .13rem;
	}

	.receive ul {
		margin: 0 0.12rem;
	}

	.receive ul li {
		background: url(../../../static/image/receivelist.png);
		background-repeat: no-repeat;
		background-size: 100%;
		padding: 0 0.1767rem 0.2133rem;
		display: flex;
		justify-content: space-between;
	}

	.receive ul li .left {
		width: 0.76rem;
		height: 0.76rem;
		margin-top: 0.11rem;
		border: 2px solid #35E7FF;
		border-radius: 0.1rem;
		background: #3E365D;
		margin-right: 0.0933rem;
		flex: none;
	}

	.receive ul li .left img {
		width: 100%;
		height: 100%;
		border-radius: 0.1rem;
	}

	.receive ul li .right {
		flex: 1;
		margin-top: 0.27rem;
	}

	.receive ul li .right div {
		display: flex;
		justify-content: space-between;
		margin-bottom: 0.08rem;
		align-items: center;
	}

	.receive ul li .right div p {
		color: #ffffff;
		font-size: .14rem;
		text-transform: uppercase;
	}

	.receive ul li .right div span {
		color: #F2C900;
		font-size: .14rem;
		text-transform: uppercase;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		width: 1.4rem;
	}

	.receive ul li .right div button {
		text-transform: uppercase;
		width: 0.86rem;
		height: 0.28rem;
		font-size: .15rem;
		font-family: 'Magistral-Bold';
		border-radius: .15rem;
		background: linear-gradient(#FFFC00, #DB7100);
	}
</style>
