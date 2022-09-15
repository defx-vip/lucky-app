<template>
	<div class="invitation">
		<div class="invitationin">
			<img src="../../../static/image/memberback.png" @click="$parent.invitation=false" />
			<h1>{{$t('eInvitedfriends')}}</h1>
			<div class="img">
				<img src="../../../static/image/invitation.png" />
				<div class="center">
					<h1>{{$t('epledge')}}</h1>
					<p>{{$t('egetrichwithtime')}}</p>
					<!--<span>{{$t('eAnnualizedrateofreturn')}}</span>-->
					<!--<h6>89.90%</h6>-->
					<button type="button" v-clipboard:copy="href" v-clipboard:success="copy">{{$t('ecopyLink')}}</button>
				</div>
				
				<!--<div class="bottom">
					<p>LMT</p>
					<div id="qrcode"></div>
				</div>-->
			</div>
			<p>{{show}}</p>
			
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				href:window.location.protocol +'//'+ window.location.host+'/#/?code='+this.$store.state.walletAddress,
				show:window.location.protocol +'//'+ window.location.host+'/#/?code='+this.$store.state.walletAddress.substring(0,5)+'***'+this.$store.state.walletAddress.substring(((this.$store.state.walletAddress.length)-4),this.$store.state.walletAddress.length)
			}
		},
		mounted() {
//			$("#qrcode").qrcode({
//				render: "canvas",
//				width: 65,
//				height: 65,
//				text: ""
//			});　　
			console.log(window.location.protocol +'//'+ window.location.host+'/#/?code='+this.$store.state.walletAddress)
		},
		methods: {
			copy() {
				this.$toast('copied')
			},
		},
	}
</script>

<style scoped>
	.invitation {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		background: rgba(5, 0, 9, .5);
		display: flex;
		align-items: start;
		justify-content: center;
		z-index: 2;
		overflow-y: auto;
		overflow-x: hidden;
	}
	
	.invitation .invitationin {
		background: url(../../../static/image/invitationbackground.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		flex: 1;
		margin: 0 0.12rem;
		position: relative;
		padding-bottom: 0.34rem;
		margin-top: 0.2rem;
	}
	
	.invitation .invitationin>img {
		position: absolute;
		right: 0.25rem;
		top: 0.14rem;
		width: 0.2rem;
	}
	
	.invitation .invitationin>h1 {
		margin-top: 0.28rem;
		color: #ffffff;
		font-size: .2rem;
		margin-left: 0.2133rem;
		text-transform: uppercase;
		font-family: 'Magistral-Bold';
	}
	
	.invitation .invitationin .img {
		background: #4F098C;
		margin: 0.48rem 0.4rem 0;
		border-radius: 0.2rem;
		text-align: center;
		padding-bottom: 0.2rem;
	}
	
	.invitation .invitationin .img>img {
		width: 1.7rem;
    	display: inline-block;
    	margin: -0.26rem auto 0;
	}
	
	.invitation .invitationin .img .center {
		background: #A774DA;
		margin: -0.22rem 0.2633rem 0;
		border-radius: 0.0667rem;
		position: relative;
		padding-bottom: .2rem;
	}
	
	.invitation .invitationin .img .center h1 {
		text-align: left;
		padding-top: 0.15rem;
		margin-left: 0.1233rem;
		color: #F2C900;
		font-size: .24rem;
		font-family: 'Magistral-Bold';
		text-transform: uppercase;
	}
	
	.invitation .invitationin .img .center p {
		text-align: left;
		color: #F2C900;
		font-family: 'Magistral-Bold';
		font-size: .16rem;
		margin-left: 0.1233rem;
		text-transform: uppercase;
		margin-top: 0.08rem;
	}
	
	.invitation .invitationin .img .center span {
		font-size: .14rem;
		color: #ffffff;
		margin-top: 0.3rem;
		display: block;
	}
	
	.invitation .invitationin .img .center h6 {
		font-size: .5rem;
		color: #F2C900;
		font-family: 'Magistral-Bold';
		padding-bottom: 0.1rem;
	}
	
	.invitation .invitationin .img .bottom {
		display: flex;
		justify-content: space-between;
		margin: 0 0.2633rem;
		align-items: flex-end;
		padding: 0.14rem 0;
	}
	
	.invitation .invitationin .img .bottom p {
		font-size: .2rem;
		font-family: 'Magistral-Bold';
		color: #ffffff;
	}
	
	.invitation .invitationin .img .bottom div {
		width: 0.8rem;
		background: #ffffff;
		height: 0.8rem;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 0.0667rem;
	}
	
	.invitation .invitationin>p {
		margin-top: 0.1667rem;
		text-align: center;
		color: #ffffff;
		font-size: .12rem;
		margin-bottom: 0.17rem;
	}
	
	.invitation .invitationin button {
		display: block;
		width: 1.4rem;
		height: 0.3rem;
		border-radius: 0.15rem;
		margin: .2rem auto 0;
		font-size: .14rem;
		text-transform: uppercase;
		background: linear-gradient(#ffffff, #01D5D2);
	}
</style>