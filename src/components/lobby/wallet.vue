<template>
	<div class="wallet">
		<div class="walletk">
			<h1>WALLET BALANCE</h1>
			<p><span>NAME</span><span>QUANTITY</span></p>
			<ul>
				<li>
					<img src="../../../static/image/LMT.png" />
					<p>LMT</p>
					<span>{{BCTbalance}}</span>
				</li>
				<li>
					<img src="../../../static/image/LMG.png" />
					<p>LMG</p>
					<span>{{BCGbalance}}</span>
				</li>
			</ul>
		</div>
		<div class="walletk">
			<h1>ACCOUNT BALANCE</h1>
			<p><span>NAME</span><span>QUANTITY</span></p>
			<ul>
				<li v-for="(item, index) in balancelist">
					<img v-if="item.tokenCode=='LMT'" src="../../../static/image/LMT.png" />
					<img v-else-if="item.tokenCode=='LMG'" src="../../../static/image/LMG.png" />
					<p>{{item.tokenCode}}</p>
					<span>{{item.quantity}}</span>
				</li>
				<!--<li>
					<img src="../../../static/image/LMT.png" />
					<p>BCT</p>
					<span>999</span>
				</li>-->
			</ul>
			<div>
				<button type="button">
					<router-link to="/recharge">recharge</router-link>
				</button>
				<button type="button">
					<router-link to="/withdrawal">WITHDRAW</router-link>
				</button>
			</div>
		</div>
	</div>
</template>

<script>
	import web3tools from '../../web3/web3tools'
	export default {
		data() {
			return {
				balancelist: '',
				timelog: "",
				BCTbalance: 0,
				BCGbalance: 0,
			}
		},
		mounted() {
			this.query();
			let that = this
			this.timelog = setInterval(function() {
				that.query();
			}, 10000)
		},
		beforeDestroy() {
			clearInterval(this.timelog)
		},
		methods: {
			query() {
				this.$post(this.$apiUtil.getassets, {
					playerId: this.$cookies.get('playerId'),
					walletAddress: this.$cookies.get('walletAddress')
				}).then((res) => {
					this.balancelist = res.data
					for(let i = 0; i < res.data.length; i++) {
						web3tools.getbalance(res.data[i].tokenContract, res.data[i].tokenCode, (e) => {
							if(res.data[i].tokenCode == 'LMT') {
								this.BCTbalance = parseFloat(Number(e).toFixed(2));
							} else if(res.data[i].tokenCode == 'LMG') {
								this.BCGbalance = parseFloat(Number(e).toFixed(2));
							}
						});
					}
				})
			},
		},
	}
</script>

<style scoped>
	.wallet {
		width: 100%;
		margin-bottom: .93rem;
	}
	
	.walletk:nth-child(1) {
		margin: .59rem auto 0;
		background-image: url(../../../static/image/20BG.png);
		padding-bottom: .18rem;
	}
	
	.walletk:nth-child(2) {
		margin: .01rem auto 0;
		background-image: url(../../../static/image/21BG.png);
	}
	
	.walletk {
		background-repeat: no-repeat;
		background-size: 100% 100%;
		width: 94%;
	}
	
	.walletk>h1 {
		font-family: Magistral-Bold;
		font-weight: bold;
		text-align: center;
		color: #ffffff;
		padding-top: .34rem;
		font-size: .2733rem;
		line-height: .1967rem;
	}
	
	.walletk>p {
		color: #ffffff;
		display: flex;
		justify-content: space-between;
		width: 82%;
		margin: .4rem auto .22rem;
		font-size: .1667rem;
		font-family: Magistral-Medium;
		line-height: .1233rem;
	}
	
	.walletk ul {
		width: 82%;
		margin: 0 auto 0;
	}
	
	.walletk ul li {
		display: flex;
		align-items: center;
		color: #ffffff;
		padding-bottom: .2967rem;
		justify-content: space-between;
	}
	
	.walletk ul li img {
		width: .5233rem;
	}
	
	.walletk ul li p {
		margin-left: .1133rem;
		font-size: .2167rem;
		flex: 1;
		font-family: Magistral-Medium;
	}
	
	.walletk ul li span {
		font-size: .26rem;
		display: block;
		font-family: Magistral-Medium;
		width: 45%;
    	text-align: right;
    	overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	
	.walletk>div {
		width: 82%;
		margin: -.16rem auto 0;
		padding-bottom: .2733rem;
		display: flex;
		justify-content: space-between;
	}
	
	.walletk>div button {
		height: .4rem;
		background: linear-gradient(#FFFC00, #DB7100);
		border-radius: .2rem;
		width: 48%;
		text-transform: uppercase;
	}
	
	.walletk>div button a {
		font-size: .17rem;
		font-family: Magistral-Bold;
		font-weight: bold;
	}
</style>