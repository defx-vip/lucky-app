<template>
	<div class="playlist">
		<header>
			<img @click="$router.back(-1)" src="../../../static/image/headerback.png" v-music/>
			<p>{{$t('eLuckyFarm')}}</p>
		</header>
		<div class="top">
			<p><span>{{$t('ePLAYTOEARN')}} </span><img src="../../../static/image/why.png" alt=""></p>
			<p>{{$t('eDETAILS')}}</p>
			<p class="btn" @click="goherf" v-movedown v-music>{{$t('eGOTOTHELOBBY')}}</p>
		</div>
		<div class="list">
			<div class="list-box">
				<div class="list-title">
					<p>{{$t('ePLAYTOEARN')}}</p>
					<div class="list-title-right">
						<p>
							<span @click="show=true">{{price}}</span>
							<span @click="show=false;price='Unharvested';screen(0)" v-show="show">{{$t('eUnharvested')}}</span>
							<span @click="show=false;price='Harvested';screen(1)" v-show="show">{{$t('eHarvested')}}</span>
							<span @click="show=false;price='Most';screen(3)" v-show="show">{{$t('eMost')}}</span>
							<span @click="show=false;price='Least';screen(2)" v-show="show">{{$t('eLeast')}}</span>
						</p>
						<img v-show="show==false" @click="show=!show" src="../../../static/image/bot.png" alt="">
						<img v-show="show==true" @click="show=!show" src="../../../static/image/botprice.png" alt="">
					</div>
				</div>
				<div class="list-main">
					<ol>
						<li>
							<p>{{$t('eTime')}}</p>
							<p>{{$t('eBet')}}</p>
							<p>{{$t('eReward')}}</p>
							<p>{{$t('eOperate')}}</p>
						</li>
					</ol>
					<ul class="rows" v-infinite-scroll="loadMore" infinite-scroll-disabled="true" infinite-scroll-distance="10">
						<li v-for="(item,index) in list" :key="index">
							<p><span>{{item.rewardDate.substring(0,10)}}</span><span>{{item.rewardDate.substring(11,16)}}</span></p>
							<p>{{item.scoreplus}}LMT</p>
							<p>{{item.rewardNumber}}LMT</p>
							<p ref='btn' :class="item.isReceive==0?'active':''" @click="item.isReceive==0?activeFn($event,item.id):''" v-movedown v-music v-preventReClick>{{$t('eHarvest')}}</p>
						</li>
						<div class="load" v-if="Number(list.length)<Number(total)"><mt-spinner type="fading-circle"></mt-spinner></div>
						<div class="nolist" v-if="total==0">{{$t('eNodata')}}</div>
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
				show: false,
				price: this.$t('eUnharvested'),
				isReceive:0,
				list: [],
				total: 1,
				pages: 1,
				nextbool:false,
			}
		},
		mounted() {

			//            this.$refs.btn[0].setAttribute('class','active')
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
				this.$post(this.$apiUtil.getPrizeLst, {
					playerId: this.$cookies.get('playerId'),
					pageSize: 10,
					pageNum: this.pages,
					isReceive:this.isReceive,
				}).then((res) => {
					_this.total = res.data.total
					for(let i = 0; i < res.data.lst.length; i++) {
						_this.list.push(res.data.lst[i]);
					}
					_this.pages = _this.pages + 1;
					_this.nextbool=false;
				})
			},
			screen(id){
				this.isReceive=id;
				this.list=[];
				this.total=1;
				this.pages=1;
				this.loadMore()
			},
			activeFn(el,id) {
				this.$post(this.$apiUtil.getPrize, {
					prizeId:id,
					playerId: this.$cookies.get('playerId'),
				}).then((res) => {
					this.$toast("Receive successfully");
					$(el.target).removeClass('active')
				})
			},
			goherf() {
				window.location.href = process.env.hrefall
			},
		},
	}
</script>

<style scoped>
	.playlist {
		width: 100%;
	}

	.playlist .top {
		width: 3.443rem;
		height: 1.243rem;
		margin: .09rem auto 0;
		padding: 0 .11rem .13rem .11rem;
		box-sizing: border-box;
		background: url(../../../static/image/playlistbanner.png);
		background-repeat: no-repeat;
		border: 1px solid rgba(243, 118, 208, .0);
		background-size: 100% 100%;
		font-family: Magistral-Bold;
	}

	.playlist .top p:nth-child(1) {
		margin-top: .3rem;
		color: #FFF;
		font-weight: bold;
		font-size: .2rem;
	}

	.playlist .top p:nth-child(1) img {
		width: .21rem;
		margin-left: .05rem;
	}

	.playlist .top p:nth-child(2) {
		color: #FFCB00;
		font-weight: bold;
		font-size: .14rem;
	}

	.playlist .top p:nth-child(3) {
		float: right;
	}

	.playlist .top .btn {
		width: 1.49rem;
		height: .3rem;
		line-height: .3rem;
		text-align: center;
		color: #000000;
		font-size: .12rem;
		background: linear-gradient(#FFFC00, #DB7100);
		border-radius: .3rem;
	}

	.playlist .list {
		width: 3.5rem;
		margin: .09rem auto 1rem;
		padding: .25rem .11rem .25rem .11rem;
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
		text-align: left;
		margin-left: .1rem;
	}

	.list-main .rows {
		width: 100%;
		border: none;
		height: 2.2rem;
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
		color: #FFCB00;
	}

	.list-main li p {
		width: 25%;
	}

	.list-main ul li p:nth-child(1) {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: .12rem;
		color: #fff;
	}

	.list-main ul li p:nth-child(4) {
		width: .68rem;
		height: .2rem;
		font-size: .12rem;
		line-height: .2rem;
		color: #fff;
		border: .01rem solid #35E7FF;
		border-radius: .2rem;
	}

	.list-main ul li p:nth-child(4).active {
		color: #000000;
		border: none;
		background: linear-gradient(#FFFC00, #DB7100);
	}
</style>
