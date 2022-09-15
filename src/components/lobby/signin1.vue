<template>
<!-- @click="$parent.sign=false" -->
	<div class="signin">
		<div class="frame" @click.stop>
			<h1>DAILY CEHCK-IN</h1>
			<div>
				<p>DAY {{num}}</p>
			</div>
			<p>YOU HAVE CHECKED-IN CONSECUTIVELY</p>
			<ul>
				<li v-for="(item, index) in 5">
					<div class="sign" v-if="(nonum+index)<=num"><img src="../../../static/image/signsuccessicon.png"></div>
					<div class="nosign" v-else></div>
					<p>DAY {{nonum+index}}</p>
				</li>
			</ul>
			<button type="button" v-show="sign==1" @click.stop="signin" v-preventReClick>SIGN IN NOW</button>
			<button type="button" v-show="sign!=1" @click.stop="$parent.sign=false,$parent.turntablego=true">Spin the prize wheel</button>
			<span @click="$router.push('/calendar')">VIEW CHECK-IN RULES</span>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				sign: 1,
				num:0,
				nonum:1,
			}
		},
		mounted() {
			this.continuity();
		},
		methods: {
			continuity(){
				this.$post(this.$apiUtil.reward_continuity, {playerId:this.$cookies.get('playerId')}).then((res) => {
					if(res.data==0){
						this.num=Number(res.data);
					}else{
						this.num=Number(res.data);
					}
					this.calculation();
				})
			},
			calculation(){
				if(((this.num-(this.num%5))+1)>this.num){
					this.nonum=((this.num-1)-((this.num-1)%5))+1
				}else{
					this.nonum=(this.num-(this.num%5))+1
				}
			},
			signin(){
				this.$post(this.$apiUtil.reward_sign, {playerId:this.$cookies.get('playerId'),walletAddress:this.$cookies.get('walletAddress')}).then((res) => {
					console.log(res)
					this.num++
					this.calculation()
					this.sign=2;
				})
			},
		},
	}
</script>

<style scoped>
	.signin {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, .64);
		z-index: 3;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.signin .frame {
		background: url(../../../static/image/Layer2.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		margin: 0 3% 0;
		width: 94%;
	}

	.signin .frame>h1 {
		color: #ffffff;
		font-size: .24rem;
		text-align: center;
		margin-top: .4rem;
		font-family: Magistral-Bold;
		font-weight: bold;
		letter-spacing: .008rem;
		line-height: .24rem;
	}

	.signin .frame>div {
		margin-top: .3rem;
		display: flex;
	}

	.signin .frame>div p {
		margin: 0 auto;
		border: 1px solid #35E7FF;
		border-radius: .1rem;
		font-size: .28rem;
		color: #FFFFFF;
		padding: .16rem .27rem;
		text-transform: uppercase;
		background: #4B0082;
		margin-bottom: .36rem;
		font-family: Magistral-Bold;
		line-height: .21rem;
		font-weight: bold;
	}

	.signin .frame>p {
		color: #ffffff;
		text-align: center;
		font-family: Magistral-Medium;
		font-size: .1333rem;
		line-height: .1rem;
		letter-spacing: .006rem;
	}

	.signin .frame ul {
		width: 85%;
		margin: .24rem auto .3rem;
		display: flex;
		justify-content: space-between;
	}

	.signin .frame ul li .sign {
		background: #CFA30B;
		width: .34rem;
		height: .34rem;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0 auto;
	}
	.signin .frame ul li .sign img{
		width: 100%;
    	height: 100%;
    	display: block;
	}
	.signin .frame ul li div.nosign {
		width: .28rem;
		height: .28rem;
		border-radius: 50%;
		border: .03rem solid rgba(255, 255, 255, .42);
		margin: 0 auto;
	}

	.signin .frame ul li p {
		color: #ffffff;
		margin-top: .1rem;
		line-height: .15rem;
		font-weight: bold;
		font-family: Magistral-Bold;
		font-size: .1267rem;
	}

	.signin .frame ul li p.nosign {
		color: rgba(255, 255, 255, .42);
	}

	.signin .frame button {
		display: block;
		margin: 0 auto .32rem;
		font-weight: bold;
		height: .4rem;
		padding: 0 .21rem;
		padding-top: .02rem;
		border-radius: .2rem;
		font-size: .2rem;
		font-family: Magistral-Bold;
		font-weight: bold;
		background: linear-gradient(#FFFC00, #DB7100);
		line-height: .2rem;
		text-transform: uppercase;
	}

	.signin .frame>span {
		text-align: right;
		display: block;
		color: #ffffff;
		margin-right: .29rem;
		padding-bottom: .27rem;
		font-size: .12rem;
		font-family: Magistral-Medium;
		letter-spacing: .006rem;
		text-decoration: underline;
	}
</style>
