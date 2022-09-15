<template>
	<div class="noticedetails">
		<div class="frame">
			<span>{{timeFrom(show.createTime)  }}</span>
			<h1>{{show.tittle}}</h1>
			<div>{{show.content}}</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				show: '',
			}
		},
		mounted() {
			this.query();
		},
		methods: {
			 timeFrom(time) {
				var nowDay = new Date(time);
				//十位需要乘1000，十三位可以直接用
				return `${nowDay.getFullYear()}-${nowDay.getMonth() +
				1}-${nowDay.getDate()}`;
			},
			query() {
				this.$post(this.$apiUtil.getnoticebyid, {
					id: this.$route.query.id,
					playerId:this.$cookies.get('playerId'),
					walletAddress:this.$cookies.get('walletAddress'),
				}).then((res) => {
					this.show = res.data
				})
			},
		},
	}
</script>

<style scoped>
	.noticedetails .frame {
		background-image: url(../../../static/image/23BG.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		margin: .525rem .2rem 0;
	}
	
	.noticedetails .frame>span {
		color: #F5D90E;
		display: block;
		text-align: right;
		margin-right: .2rem;
		padding-top: .22rem;
		font-size: .12rem;
		font-family: Magistral-Book;
	}
	
	.noticedetails .frame>h1 {
		text-align: center;
		color: #ffffff;
		font-weight: bold;
		margin-top: .2rem;
		margin-bottom: .2rem;
		font-size: .16rem;
		font-family: Magistral-Medium;
		text-transform: uppercase;
		margin-left: .33rem;
		margin-right: .33rem;
	}
	
	.noticedetails .frame>div {
		margin: 0 .33rem 0;
		color: #ffffff;
		padding-bottom: .8rem;
		font-size: .1333rem;
		line-height: .24rem;
		font-family: Magistral-Book;
	}
</style>