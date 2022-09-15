<template>
	<div class="headimg" @click="$parent.head=false">
		<div class="frame" @click.stop>
			<h1>{{$t('lChangeAvatar')}}</h1>
			<p>{{$t('lStandardAvatar')}}</p>
			<div>
				<ul>
					<li v-for="(item, index) in headimg" :class="$cookies.get('isNFT')==0&&index==$cookies.get('head')?'active':''" @click="change($event,index);isNFT=0"><img :src="item"></li>
				</ul>
				<ul>
					<li v-for="(item, index) in headimg1" :class="$cookies.get('isNFT')==0&&index==$cookies.get('head')?'active':''" @click="change($event,index);isNFT=0"><img :src="item"></li>
				</ul>
			</div>
			<p v-if="nftimg.length!=0" style="margin-top: 0.3rem;">{{$t('lNFTAvatar')}}</p>
			<div v-if="nftimg.length!=0">
				<ul>
					<li v-for="(item, index) in nftimg" :class="$cookies.get('isNFT')==1&&item.tokenId==$cookies.get('head')?'active':''" @click="change($event,item.tokenId);isNFT=1"><img :src="item.image"></li>
				</ul>
			</div>
			<button type="button" @click="updateHead" v-movedown v-music v-preventReClick>{{$t('OK')}}</button>
		</div>
	</div>
</template>

<script>
	import web3tools from '../../web3/web3tools'
	let _this;
	export default {
		data() {
			return {
				head: this.$store.state.head,
				headimg: {
					1: require('../../../static/image/01.png'),
					3: require('../../../static/image/03.png'),
					5: require('../../../static/image/05.png'),
					7: require('../../../static/image/07.png'),
					9: require('../../../static/image/09.png'),
					11: require('../../../static/image/11.png'),
				},
				headimg1: {
					2: require('../../../static/image/02.png'),
					4: require('../../../static/image/04.png'),
					6: require('../../../static/image/06.png'),
					8: require('../../../static/image/08.png'),
					10: require('../../../static/image/10.png'),
					12: require('../../../static/image/12.png')
				},
				nftimg: [],
				isNFT: this.$cookies.get('isNFT'),
			}
		},
		mounted() {
			_this = this;
			this.queryNFT()
		},
		methods: {
			change(e, index) {
				this.head = index;
				$('.headimg .frame ul li').removeClass('active')
				if(e.target.src != undefined) {
					$(e.target).parent().addClass('active').siblings().removeClass('active')
				} else {
					$(e.target).addClass('active').siblings().removeClass('active')
				}
			},
			updateHead() {
				this.$post(this.$apiUtil.updateHead, {
					playerId: this.$cookies.get('playerId'),
					walletAddress: this.$cookies.get('walletAddress'),
					head: this.head,
					isNFT: this.isNFT,
				}).then((res) => {
					this.$store.state.head = this.head;
					this.$cookies.set("head", this.head, {
						expires: 0
					});
					this.$store.state.isNFT = this.isNFT;
					this.$cookies.set("isNFT", this.isNFT, {
						expires: 0
					});
					this.$toast("Modified successfully");
					if(this.isNFT == 1) {
						this.$parent.tokenurl();
					}
					this.$parent.head = false;
				})
			},
			queryNFT() {
				web3tools.getbalance(this.$store.state.NFTaddr, "NFT", (num) => {
					for(let i = 0; i < num; i++) {
						web3tools.tokenOfOwnerByIndex(this.$store.state.NFTaddr, i, (tokenId) => {
							web3tools.tokenURI(this.$store.state.NFTaddr, tokenId, (e) => {
								this.$nftget(e, {}).then((res) => {
									let obj = []
									if(res.image != '' && res.image != undefined) {
										obj = res;
									}
									obj['tokenId'] = tokenId;
									_this.nftimg.push(obj)
								})
							});
						});
					}
				});
			},
		},
	}
</script>

<style scoped>
	.headimg {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		background: rgba(0, 0, 0, .5);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 3;
	}
	
	.headimg .frame {
		background: url(../../../static/image/BG20.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		margin: 0 5%;
		width: 90%;
		padding-bottom: .3067rem;
	}
	
	.headimg .frame>h1 {
		text-align: center;
		color: #DFE117;
		font-size: .2rem;
		margin-top: .3033rem;
		margin-bottom: .3133rem;
		line-height: .1467rem;
		font-family: Magistral-Bold;
		font-weight: bold;
		text-transform: uppercase;
	}
	
	.headimg .frame>p {
		color: #ffffff;
		font-size: .14rem;
		margin-left: 0.2033rem;
		margin-bottom: 0.2333rem;
	}
	
	.headimg .frame>div {
		width: 96%;
		overflow-x: auto;
		margin-left: 2%;
	}
	
	.headimg .frame ul {
		margin: 0 .15rem;
		display: flex;
		white-space: nowrap;
	}
	
	.headimg .frame ul li {
		width: .6567rem;
		margin-bottom: .11rem;
		height: .6567rem;
		background: #AC6CE6;
		border-radius: 50%;
		border: 2px solid #C18DF4;
		flex: none;
		margin-right: 0.2233rem;
	}
	
	.headimg .frame ul .active {
		border: 2px solid #ffffff;
	}
	
	.headimg .frame ul li img {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		display: block;
	}
	
	.headimg .frame button {
		display: block;
		margin: 0 auto 0;
		font-weight: bold;
		font-size: .2067rem;
		font-family: Magistral-Bold;
		margin-top: .2633rem;
		width: 1.26rem;
		padding: .015rem 0;
		border-radius: .1567rem;
		background: linear-gradient(#FFFC00, #DB7100);
	}
</style>