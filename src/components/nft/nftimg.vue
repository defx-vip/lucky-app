<template>
	<div class="headimg" @click="$parent.nft=false">
		<div class="frame" @click.stop>
			<h1>{{$t('bCHOOSEPROTECTER')}}</h1>
			<p v-if="NFTimg!=''">{{$t('bGuardianNFT')}}</p>
			<div v-if="NFTimg!=''">
				<ul>
					<li class="active1"><img :src="NFTimg.image"></li>
				</ul>
			</div>
			<p v-if="nftrareimg.length!=0">{{$t('bRareNFT')}}</p>
			<div v-if="nftrareimg.length!=0">
				<ul>
					<li v-for="(item, index) in nftrareimg" :class="item.tokenId==$cookies.get('playerTockenId')?'active':''" @click="change($event,item.tokenId,item.image)"><img :src="item.image"></li>
				</ul>
			</div>
			<p v-if="nftordinaryimg.length!=0">{{$t('bOrdinaryNFT')}}</p>
			<div v-if="nftordinaryimg.length!=0">
				<ul>
					<li v-for="(item, index) in nftordinaryimg" :class="item.tokenId==$cookies.get('playerTockenId')?'active':''" @click="change($event,item.tokenId,item.image)"><img :src="item.image"></li>
				</ul>
			</div>
			<button type="button" @click="uplevel" v-movedown v-music v-preventReClick>{{$t('OK')}}</button>
		</div>
	</div>
</template>

<script>
	import web3tools from '../../web3/web3tools'
	let _this;
	export default {
		data() {
			return {
				NFTimg: '',
				head: this.$store.state.playerTockenId,
				nftrareimg: [],
				nftordinaryimg: [],
			}
		},
		mounted() {
			_this = this;
			this.queryNFT()
			if(this.$cookies.get('playerTockenId') != 0 && this.$cookies.get('playerTockenId') != '' && this.$cookies.get('playerTockenId') != undefined) {
				this.tokenurl()
			}
		},
		methods: {
			tokenurl() {
				web3tools.tokenURI(this.$store.state.NFTaddr, this.$cookies.get('playerTockenId'), (e) => {
					this.$nftget(e, {}).then((res) => {
						_this.NFTimg = res
					})
				});
			},
			change(e, index,Image) {
				if(this.NFTimg!=''){
					this.NFTimg.image=Image;
				}else{
					this.NFTimg={image:Image};
				}
				this.head = index;
				$('.headimg .frame ul li').removeClass('active')
				if(e.target.src != undefined) {
					$(e.target).parent().addClass('active').siblings().removeClass('active')
				} else {
					$(e.target).addClass('active').siblings().removeClass('active')
				}
			},
			uplevel() {
				if(this.head == 0||this.head ==''||this.head ==undefined) {
					this.$toast('Please select an NFT')
					return false;
				}
				web3tools.queryIsRare(this.$store.state.NFTaddr, this.head, (sort) => {
					web3tools.personLevel(this.$store.state.gameaddr, this.head, (level) => {
						if(sort == 1){
							this.updateHead(level,1)
						}else{
							this.updateHead(level,2)
						}
					})
				})

			},
			updateHead(level,rare) {
				this.$post(this.$apiUtil.updateNFTLevel, {
					playerId: this.$cookies.get('playerId'),
					walletAddress: this.$cookies.get('walletAddress'),
					playerTockenId: this.head,
					nftLevel: level,
					rare:rare
				}).then((res) => {
					this.$store.state.playerTockenId = this.head;
					this.$cookies.set("playerTockenId", this.head, {
						expires: 0
					});
					this.$toast("Modified successfully");
					this.$parent.tokenurl();
					this.$parent.nft = false;
				})
			},
			queryNFT() {
				web3tools.getbalance(this.$store.state.NFTaddr, "NFT", (num) => {
					for(let i = 0; i < num; i++) {
						web3tools.tokenOfOwnerByIndex(this.$store.state.NFTaddr, i, (tokenId) => {
							web3tools.queryIsRare(this.$store.state.NFTaddr, tokenId, (sort) => {
								web3tools.tokenURI(this.$store.state.NFTaddr, tokenId, (e) => {
									this.$nftget(e, {}).then((res) => {
										let obj = []
										if(res.image != '' && res.image != undefined) {
											obj = res;
										}
										obj['tokenId'] = tokenId;
										if(sort == 1) {
											_this.nftrareimg.push(obj)
										} else {
											_this.nftordinaryimg.push(obj)
										}
									})
								});
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
		z-index: 2;
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
		margin-bottom: 0.1rem;
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
		width: 0.6567rem;
		margin-bottom: 0.2rem;
		height: 0.6567rem;
		background: #AC6CE6;
		border-radius: 0.0667rem;
		border: 2px solid #C18DF4;
		flex: none;
		margin-right: 0.2233rem;
	}
	
	.headimg .frame ul .active,
	.headimg .frame ul .active1 {
		border: 2px solid #ffffff;
	}
	
	.headimg .frame ul li img {
		width: 100%;
		height: 100%;
		border-radius: 0.0667rem;
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