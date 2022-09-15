<template>
	<div class="NFTMarket">
		<div class="nav">
			<p :class="change=='box'?'active':''" @click="changeto('box');" v-music>{{$t('mMystery')}}</p>
			<p :class="change=='rare'?'active':''" @click="changeto('rare');" v-music>{{$t('mRare')}}</p>
			<p :class="change=='ordinary'?'active':''" @click="changeto('ordinary');" v-music>{{$t('mOrdinary')}}</p>
		</div>
		<div class="markettop">
			<div class="seo">
				<img src="../../../static/image/seonft.png" />
				<input type="text" :placeholder="$t('eSearch')" v-model="seotitle" />
			</div>
			<div class="price">
				<p @click="priceactive==false?priceactive=true:priceactive=false"><span>{{price}}</span><img src="../../../static/image/topprice.png"></p>
				<ol v-if="priceactive">
					<li @click="pricetoggle($event,'Highestprice')">{{$t('mHighestprice')}}</li>
					<li @click="pricetoggle($event,'Lowestprice')">{{$t('mLowestprice')}}</li>
					<li v-if="change!='box'" @click="pricetoggle($event,'Highestlevel')">{{$t('mHighestlevel')}}</li>
					<li v-if="change!='box'" @click="pricetoggle($event,'Lowestlevel')">{{$t('mLowestlevel')}}</li>
				</ol>
			</div>
		</div>
		<ul>
			<li v-for="(item, index) in list" @click="$router.push('/marketdetails?id='+item.tokenId+'&seller='+item.seller+'&sort='+item.sort+'&price='+item.price)" v-music>
				<div class="left">
					<img v-if="change=='box'" style="object-fit: cover;" src="../../../static/image/1487.png" />
					<img v-else :src="item.image" />
				</div>
				<div class="right">
					<div :style="{marginBottom: (change=='box'?'.15rem':'')}">
						<p>{{$t('mTokenID')}}:<span>{{item.tokenId}}</span></p>
						<p v-if="change!='box'">{{$t('eLEVEL')}} {{item.level}}</p>
					</div>
					<div>
						<p>{{$t('mPRICE')}}:<span>{{Number(item.price)/1000000000000000000}} ETH</span></p>
						<button :style="{marginTop: (change=='box'?'-.36rem':'')}" type="button" :class="item.seller.toLowerCase()==$cookies.get('walletAddress').toLowerCase()?'preventReClick':''" @click.stop="$router.push('/marketbuy?id='+item.tokenId+'&price='+item.price+'&sort='+item.sort)" v-movedown v-music>{{$t('mBUY')}}</button>
					</div>
					<!--<button :class="item.seller.toLowerCase()==$cookies.get('walletAddress').toLowerCase()?'preventReClick':''" type="button" v-if="item.approvebool==1" @click.stop="approve(item.unit,(Number(item.price)/1000000000000000000),index)">APPROVE</button>
					<button type="button" v-if="item.approvebool==2" @click.stop="buy(item.unit,item.tokenId)">BUY</button>-->

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
				list: [],
				seolist: [],
				priceactive: false,
				price: this.$t('mPopular'),
				seotitle: '',
				seobool: false,
				change: this.$route.query.change,
			}
		},
		mounted() {
			_this = this;
			if(this.change == 'box') {
				this.boxquery('box')
			} else if(this.change == 'rare') {
				this.NFTquery('rare')
			} else if(this.change == 'ordinary') {
				this.NFTquery('ordinary')
			}
		},
		watch: {
			'seotitle': {
				handler: function() {
					if(this.seobool == true) {
						if(this.seotitle == '') {
							this.list = this.seolist;
						} else {
							this.list = [];
							for(let i = 0; i < this.seolist.length; i++) {
								let txt = this.seolist[i].tokenId.toString();
								if(txt.indexOf(this.seotitle) != -1) {
									console.log(this.seolist[i])
									this.list.push(this.seolist[i])
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
				this.change = text;
				this.$route.query.change = text;
				history.replaceState('', '', '/#/market/NFTMarket?change=' + text)
				if(this.change == 'box') {
					this.boxquery('box')
				} else if(this.change == 'rare') {
					this.NFTquery('rare')
				} else if(this.change == 'ordinary') {
					this.NFTquery('ordinary')
				}
			},
			boxquery(txt) {
				this.price = this.$t('mPopular')
				this.list = []
				this.seolist = []
				this.seobool = false;
				let ool = 0;
				web3tools.getOrders(this.$store.state.BOXmarketaddr, '', (e) => {
					if(e == '' || e == 0) {
						this.seobool = true;
					}
					for(let i = 0; i < e.length; i++) {
						ool++
						let obj = [];
						obj['tokenId'] = e[i].tokenId;
						obj['price'] = e[i].amount;
						obj['seller'] = e[i].seller;
						obj['sort'] = 'box';
						if(txt == 'box'&&this.change == 'box') {
							_this.forgo(obj)
						}else{
							return false
						}
						if(e.length == ool) {
							this.seobool = true;
						}
					}
				});
			},
			NFTquery(txt) {
				this.price = this.$t('mPopular')
				this.list = []
				this.seolist = []
				this.seobool = false;
				let ool = 0;
				web3tools.getOrders(this.$store.state.NFTmarketaddr, '', (e) => {
					if(e == '' || e == 0) {
						this.seobool = true;
					}
					for(let i = 0; i < e.length; i++) {
						web3tools.queryIsRare(this.$store.state.NFTaddr, e[i].tokenId, (sort) => {
							web3tools.personLevel(this.$store.state.gameaddr, e[i].tokenId, (level) => {
								web3tools.tokenURI(this.$store.state.NFTaddr, e[i].tokenId, (url) => {
									this.$nftget(url, {}).then((res) => {
										ool++
										let obj = []
										if(res.image != '' && res.image != undefined) {
											obj = res;
										}
										obj['tokenId'] = e[i].tokenId;
										obj['price'] = e[i].amount;
										obj['seller'] = e[i].seller;
										obj['level'] = level;
										if(_this.change == 'rare' && sort == 1) {
											obj['sort'] = 'rare';
											if(txt == 'rare') {
												_this.forgo(obj)
											}else{
												return false
											}
										} else if(_this.change == 'ordinary' && sort != 1) {
											obj['sort'] = 'ordinary';
											if(txt == 'ordinary') {
												_this.forgo(obj)
											}else{
												return false
											}
										}
										if(e.length == ool) {
											_this.seobool = true;
										}
									})
								})
							})
						})
					}
				});
			},
			forgo(obj) {
				if(_this.seolist.length==0){
					_this.list.push(obj)
					_this.seolist.push(obj)
					return false
				}
				let bool = false;
				for(let a = 0; a < _this.seolist.length; a++) {
					if(obj.tokenId == _this.seolist[a].tokenId) {
						bool = true;
						break;
					}
					if(bool == false && (_this.seolist.length-1) == a) {
						_this.list.push(obj)
						_this.seolist.push(obj)
					}
				}
			},
			//			query() {
			//				let ool = 0;
			//				web3tools.getOrders(this.$store.state.LMGmarketaddr, '', (e) => {
			//					if(e == '' || e == 0) {
			//						this.LMTquery();
			//					}
			//					for(let i = 0; i < e.length; i++) {
			//						this.$post(this.$apiUtil.getTokenBytokenId, {
			//							tokenId: e[i].tokenId,
			//							tokenType: 'LMG',
			//						}).then((res) => {
			//							ool++
			//							let obj = res.data;
			//							obj['price'] = e[i].amount;
			//							obj['seller'] = e[i].seller;
			//							obj['unit'] = 'LMG';
			//							obj['approvebool'] = 1;
			//							this.list.push(obj)
			//							this.seolist.push(obj)
			//							if(e.length == ool) {
			//								this.LMTquery();
			//							}
			//						})
			//					}
			//				});
			//			},
			//			LMTquery() {
			//				let ooll = 0;
			//				web3tools.getOrders(this.$store.state.LMTmarketaddr, '', (e) => {
			//					for(let i = 0; i < e.length; i++) {
			//						this.$post(this.$apiUtil.getTokenBytokenId, {
			//							tokenId: e[i].tokenId,
			//							tokenType: 'LMT',
			//						}).then((res) => {
			//							ooll++
			//							let obj = res.data;
			//							obj['price'] = e[i].amount;
			//							obj['seller'] = e[i].seller;
			//							obj['unit'] = 'LMT';
			//							obj['approvebool'] = 1;
			//							this.list.push(obj)
			//							this.seolist.push(obj)
			//							if(e.length == ooll) {
			//								this.seobool = true;
			//							}
			//						})
			//					}
			//				});
			//			},
			pricetoggle(e, text) {
				this.price = e.target.innerText;
				this.priceactive = false;
				if(text == "Highestprice") {
					this.nftlist.sort(function(a, b) {
						return b.price - a.price
					})
				} else if(text == "Lowestprice") {
					this.nftlist.sort(function(a, b) {
						return a.price - b.price
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
			}
		},
	}
</script>

<style scoped>
	.NFTMarket {
		padding-top: .8667rem;
	}
	
	.NFTMarket .nav {
		margin: 0.08rem 0.15rem 0.02rem;
		background: #490785;
		border-radius: .06rem;
		border: 1px solid #C18DF4;
		padding: .03rem;
		color: #ffffff;
		display: flex;
		justify-content: space-around;
	}
	
	.NFTMarket .nav p {
		flex: 1;
		text-align: center;
		padding: 0.08rem 0;
		border-radius: 0.06rem;
		font-size: .16rem;
	}
	
	.NFTMarket .nav .active {
		background: #F2C900;
		color: #000000;
	}
	
	.NFTMarket .markettop {
		display: flex;
	}
	
	.NFTMarket .seo {
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
	
	.NFTMarket .seo input {
		color: #ffffff;
		width: 70%;
		padding: 0;
		font-size: .16rem;
		font-family: Magistral-Bold;
		font-weight: bold;
	}
	
	.NFTMarket .seo img {
		width: .16rem;
		height: .16rem;
		margin-left: .113rem;
		margin-right: .14rem;
	}
	
	.NFTMarket .markettop .price {
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
	
	.NFTMarket .markettop p {
		font-size: .12rem;
		font-family: Magistral-Medium;
		margin-left: .1rem;
		height: .3rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.NFTMarket .markettop p span {
		width: 75%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	
	.NFTMarket .markettop p img {
		width: .1433rem;
		height: .08rem;
		margin-right: .1rem;
	}
	
	.NFTMarket .markettop {
		position: relative;
	}
	
	.NFTMarket .markettop ol {
		margin: 0.05rem .1rem 0;
	}
	
	.NFTMarket .markettop ol li {
		font-size: .12rem;
		font-family: Magistral-Medium;
		margin-bottom: .13rem;
	}
	
	.NFTMarket ul {
		margin: 0 .11rem;
	}
	
	.NFTMarket ul li {
		background: url(../../../static/image/Cardbackground.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		padding: 0 0.2433rem 0.2133rem 0.1767rem;
		display: flex;
		justify-content: space-between;
	}
	
	.NFTMarket ul li .left {
		width: 0.76rem;
		height: 0.76rem;
		margin-top: 0.11rem;
		border: 2px solid #35E7FF;
		border-radius: 0.1rem;
		background: #3E365D;
		margin-right: 0.0933rem;
		flex: none;
	}
	
	.NFTMarket ul li .left img {
		width: 100%;
		height: 100%;
		border-radius: 0.1rem;
	}
	
	.NFTMarket ul li .right {
		flex: 1;
		margin-top: 0.27rem;
	}
	
	.NFTMarket ul li .right div {
		display: flex;
		justify-content: space-between;
		margin-bottom: 0.08rem;
		align-items: center;
	}
	
	.NFTMarket ul li .right div p {
		color: #ffffff;
		font-size: .14rem;
		text-transform: uppercase;
	}
	.NFTMarket ul li .right div:nth-child(2) p{
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		width: 1.4rem;
	}
	.NFTMarket ul li .right div p:nth-child(2) {
		min-width: 0.8rem;
		text-align: center;
	}
	
	.NFTMarket ul li .right div span {
		margin-left: .16rem;
		font-size: .14rem;
		text-transform: uppercase;
	}
	
	.NFTMarket ul li .right div button {
		text-transform: uppercase;
		width: 0.8rem;
		height: 0.28rem;
		font-size: .15rem;
		font-family: 'Magistral-Bold';
		border-radius: .15rem;
		background: linear-gradient(#FFFC00, #DB7100);
	}
</style>