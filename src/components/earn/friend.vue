<template>
	<div class="memberlist">
		<header>
			<img @click="$router.back(-1)" src="../../../static/image/headerback.png" v-music/>
			<p>{{$t('eInvitefriendslist')}}</p>
		</header>
		<div class="top friend">
			<p><span>{{$t('efriends')}} </span><img src="../../../static/image/luckyfarmlogo.png"><br><span>{{$t('eInvitation')}}</span></p>
			<p>{{$t('elist')}}</p>
		</div>
		<div class="list">
			<div class="list-box">
				<div class="list-main">
					<ol>
						<li>
							<p>#</p>
							<p>{{$t('eTime')}}</p>
							<p>{{$t('eAddress')}}</p>
							<p></p>
						</li>
					</ol>
					<ul class="rows" v-infinite-scroll="loadMore" infinite-scroll-disabled="true" infinite-scroll-distance="10">
						<li v-for="(item,index) in list" :key="index">
							<p>{{index+1}}</p>
							<p v-if="item.createTime">{{ formateTime(item.createTime)}}</p>
							<p>{{item.walletAddress.substring(0,5)}}***{{item.walletAddress.substring(((item.walletAddress.length)-4),item.walletAddress.length)}}</p>
							<p><img src="../../../static/image/detailscopy.png" v-clipboard:copy="item.walletAddress" v-clipboard:success="copy" /></p>
						</li>
						<!-- <div class="load" v-if="Number(list.length) > 0 "><mt-spinner type="fading-circle"></mt-spinner></div> -->

						<div class="nolist" v-if="Number(list.length) <= 0 " >{{$t('eNodata')}}</div>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	let _this
	export default {
		data() {
			return {
				list: [],
				total: 1,
				pages: 1,
				nextbool:false,
			}
		},
		mounted() {
			_this = this
		},
		methods: {
			loadMore() {
				if(Number(_this.list.length) >= Number(_this.total)) {
					return false;
				}
				if(_this.nextbool==true){
					return false;
				}
				_this.nextbool=true;
				this.$post(this.$apiUtil.invitationLst, {
					playerId: this.$cookies.get('playerId'),
					pageSize: 10,
					pageNum: this.pages,
					walletAddress:this.$cookies.get('walletAddress')
				}).then((res) => {
					_this.total = res.data.total
					for(let i = 0; i < res.data.lst.length; i++) {
						_this.list.push(res.data.lst[i]);
					}
					_this.pages = _this.pages + 1;
					_this.nextbool=false;
				})
			},
			copy() {
				this.$toast('copied')
			},
			 formateTime(data){
				var time;
				var hours = parseInt((data % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
				var minutes = parseInt((data % (1000 * 60 * 60)) / (1000 * 60));
				var seconds = (data % (1000 * 60)) / 1000;
				time = (
					hours < 10 ? ('0' + hours) : hours) + ':'
					+ (minutes < 10 ? ('0' + minutes) : minutes) + ':'
					+ (seconds < 10 ? ('0' + seconds) : seconds);
				return time.substring(0,8)
		    },
		},
	}
</script>

<style scoped>
	.memberlist {
		width: 100%;
	}

	.memberlist .top {
		width: 3.443rem;
		height: 1.243rem;
		margin: .09rem auto 0;
		box-sizing: border-box;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		border: 1px solid rgba(243, 118, 208, .0);
		background-size: 100% 100%;
		font-family: Magistral-Bold;
	}

	.memberlist .friend {
		padding: 0 .42rem .13rem .42rem;
		background-image: url(../../../static/image/friendtop.png);
	}

	.memberlist .top p:nth-child(1) {
		margin-top: .45rem;
		color: #FFF;
		font-weight: bold;
		font-size: .16rem;
		text-transform: uppercase;
		display: flex;
		align-items: center;
	}

	.memberlist .friend p:nth-child(1) {
		width: 50%;
		margin-top: .35rem;
		flex-wrap: wrap;
	}

	.memberlist .top p:nth-child(1) img {
		width: .1333rem;
		margin-left: .0733rem;
	}

	.memberlist .top p:nth-child(2) {
		color: #FFCB00;
		font-weight: bold;
		font-size: .14rem;
		text-transform: uppercase;
	}

	.memberlist .top p:nth-child(3) {
		float: right;
	}

	.memberlist .top .btn {
		width: 1.49rem;
		height: .3rem;
		line-height: .3rem;
		text-align: center;
		color: #000000;
		font-size: .12rem;
		background: linear-gradient(#FFFC00, #DB7100);
		border-radius: .3rem;
	}

	.memberlist .list {
		width: 3.5rem;
		margin: .09rem auto 1rem;
		padding: 0 .11rem .25rem .11rem;
		box-sizing: border-box;
		background: url(../../../static/image/earnplay2.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		border: 1px solid rgba(243, 118, 208, .0);
		background-size: 100% 100%;
	}

	.list-box .list-title {
		display: flex;
		justify-content: start;
		position: relative;
	}

	.list-title p:nth-child(1) {
		font-size: .17rem;
		font-weight: bold;
		color: #fff;
		align-self: center;
	}

	.list-title .list-title-right {
		border: .01rem solid #35E7FF;
		width: 1.3rem;
		line-height: .3rem;
		position: absolute;
		top: -0.1rem;
		right: 0;
		background: url(../../../static/image/earnplay2.png);
		background-repeat: no-repeat;
		border-radius: .2rem;
		background-size: 100% 100%;
		display: flex;
	}

	.list-title .list-title-right p {
		width: 1.3rem;
		line-height: .3rem;
		font-size: .12rem;
		color: #fff;
		display: flex;
		flex-direction: column;
		text-align: center;
	}

	.list-title .list-title-right p span {
		width: 1.1rem;
	}

	.list-title .list-title-right {
		border: .01rem solid #35E7FF;
	}

	.list-title .list-title-right img {
		width: 0.14rem;
		height: 0.08rem;
		margin-left: .1rem;
		position: absolute;
		top: .1rem;
		right: .15rem;
	}

	.list-main {
		border: .01rem solid #35E7FF;
		margin-top: .18rem;
		border-radius: .2rem;
		font-size: .14rem;
		color: #FFF;
	}

	.list-main>ol {
		border-bottom: .01rem solid #35E7FF;
		font-weight: bold;
		height: 0.46rem;
	}

	.list-main>ol>li {
		color: #FFF;
	}

	.list-main>ol>li>p:nth-child(1) {
		text-align: center;
		margin-left: 0.1rem;
		width: 0.2rem;
	}
	.list-main>ol>li>p:nth-child(2){
		width: 1.3rem;
		text-align: center;
	}
	.list-main>ol>li>p:nth-child(3) {
		width: 1rem;
		text-align: center;
	}

	.list-main>ol>li>p:nth-child(4) {
		width: 0.1867rem;
	}

	.list-main .rows {
		width: 102%;
		border: none;
		height: 48vh;
		padding-right: .1rem;
		box-sizing: border-box;
		overflow: hidden;
		overflow-y: auto;
	}

	.rows::-webkit-scrollbar {
		width: .05rem;
		height: .1rem;
		-webkit-border-radius: .05rem;
		-moz-border-radius: .05rem;
		border-radius: .05rem;
		display: block;
	}

	.rows::-webkit-scrollbar-thumb {
		background-color: #fff;
		background-clip: padding-box;
		-webkit-border-radius: .05rem;
		-moz-border-radius: .05rem;
		border-radius: .05rem;
		min-height: .2rem;
	}

	.rows::-webkit-scrollbar-thumb:hover {
		background-color: #fff;
		-webkit-border-radius: .05rem;
		-moz-border-radius: .05rem;
		border-radius: .05rem;
	}

	.list-main li {
		display: flex;
		text-align: center;
		justify-content: space-between;
		width: 3.14rem;
		height: .46rem;
		align-items: center;
		color: #ffffff;
	}

	.list-main ul li p:nth-child(1) {
		text-align: center;
		margin-left: 0.1rem;
		width: 0.2rem;
		font-size: .14rem;
		color: #fff;
	}

	.list-main ul li p:nth-child(2) {
		font-size: .12rem;
		width: 1.3rem;
		text-align: center;
	}

	.list-main ul li p:nth-child(3) {
		width: 1rem;
		text-align: center;
		color: #FFCB00;
		font-size: .14rem;
	}

	.list-main ul li p img {
		width: 0.1867rem;
	}
</style>
