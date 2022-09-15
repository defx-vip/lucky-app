<template>
	<div class="successafter" @click="$parent.success=1">
		<div class="frame">
			<div>
				<h1><span>{{$t('bOpentreasurechest')}}</span></h1>
				<img class="trunk" src="../../../static/image/successxiangopen.png" />
				<ul @click.stop v-for="(item, index) in $parent.list">
					<li>
						<p>{{$t('mTokenID')}}:<span>{{item.tokenId}}</span></p>
					</li>
					<li>
						<p>{{$t('bType')}}:<span>{{item.sort}}</span></p>
					</li>
				</ul>
				<button type="button" @click.stop="goto" v-movedown v-music>{{$t('bVIEWNFT')}}</button>
			</div>
		</div>
	</div>
</template>

<script>
	import web3tools from '../../web3/web3tools'
	export default {
		data() {
			return {
			}
		},
		mounted() {
		},
		methods: {
			goto() {
				this.$parent.change = 'rare';
				this.$parent.$route.query.change = 'rare';
				history.replaceState('', '', '/#/nft?change=rare')
				this.$parent.success=1
				this.$parent.NFTquery('rare');
			},
			
		},
	}
</script>

<style scoped>
	.successafter {
		width: 100%;
		min-height: 90vh;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.successafter .frame {
		background: url(../../../static/image/boxBG.png);
		background-repeat: no-repeat;
		background-position: center 0.1rem;
		width: 92%;
		background-size: 100% 100%;
	}
	
	.successafter .frame div {
		background: url(../../../static/image/successguangtiao.png);
		background-repeat: no-repeat;
		background-position: center -0.3rem;
		width: 100%;
		background-size: 100%;
	}
	
	.successafter .frame h1 {
		color: #DFE117;
		text-align: center;
		font-family: 'Magistral-Bold';
		margin-top: 0.41rem;
		margin-bottom: 0.3933rem;
		font-size: .2rem;
		text-transform: uppercase;
	}
	
	.successafter .frame .trunk {
		margin: 0 auto 0;
		display: block;
		width: 1.5467rem;
	}
	
	.successafter .frame div ul {
		margin: 0.24rem 0.25rem 0.2533rem;
		background: #4B0082;
		border-radius: 0.05rem;
		border: 1px solid #35E7FF;
		padding: 0.2rem 0.2rem;
	}
	
	.successafter .frame div p {
		color: #ffffff;
		display: flex;
		justify-content: space-between;
		font-size: .2rem;
		align-items: center;
		margin-bottom: 0.1733rem;
		font-family: Magistral-Medium;
	}
	
	.successafter .frame div ul li:nth-child(2) p {
		margin-bottom: 0;
	}
	
	.successafter .frame div p span {
		color: #DFE117;
	}
	
	.successafter .frame div button {
		margin: 0 auto 0.57rem;
		width: 1.73rem;
		display: block;
		height: 0.3533rem;
		font-size: .15rem;
		border-radius: 0.1767rem;
		font-family: 'Magistral-Bold';
		background: linear-gradient(#FFFC00, #DB7100);
	}
</style>