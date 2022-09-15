<template>
	<div class="upgrade">
		<div class="top">
			<div class="means">
				<div class="left">
					<img v-if="show!=''" :src="show.urlOss" />
				</div>
				<div class="right">
					<p>NFT NO. :<span>{{$route.query.id}}</span></p>
					<p v-if="$route.query.unit=='LMG'">CONTRACT:<span>{{$store.state.LMGNFTaddr.substring(0,5)}}......{{$store.state.LMGNFTaddr.substring(((show.cid.length)-5),$store.state.LMGNFTaddr.length)}}</span></p>
					<p v-if="$route.query.unit=='LMT'">CONTRACT:<span>{{$store.state.LMTNFTaddr.substring(0,5)}}......{{$store.state.LMTNFTaddr.substring((($store.state.LMTNFTaddr.length)-3),$store.state.LMTNFTaddr.length)}}</span></p>
					<!--<p>CID:<span>{{show.cid.substring(0,8)}}......{{show.cid.substring(((show.cid.length)-5),show.cid.length)}}</span></p>-->
					<p>TIME:<span>{{leveltimelist[0].timeData._H}}:{{leveltimelist[0].timeData._M}}:{{leveltimelist[0].timeData._S}}</span></p>
				</div>
			</div>
			<div class="line">
				<ul>
					<li style="left: 10%;">1</li>
					<li style="left: 20%;">2</li>
					<li style="left: 30%;">3</li>
					<li style="left: 40%;">4</li>
					<li style="left: 50%;">5</li>
					<li style="left: 60%;">6</li>
					<li style="left: 70%;">7</li>
					<li style="left: 80%;">8</li>
					<li style="left: 90%;">9</li>
					<li style="left: 100%;">10</li>
				</ul>
				<div :style="{width: (Number(levelnum)*10)+'%'}"></div>
				<ol>
					<li style="left: 10%;" v-if="Number(levelnum)>=1">1</li>
					<li style="left: 20%;" v-if="Number(levelnum)>=2">2</li>
					<li style="left: 30%;" v-if="Number(levelnum)>=3">3</li>
					<li style="left: 40%;" v-if="Number(levelnum)>=4">4</li>
					<li style="left: 50%;" v-if="Number(levelnum)>=5">5</li>
					<li style="left: 60%;" v-if="Number(levelnum)>=6">6</li>
					<li style="left: 70%;" v-if="Number(levelnum)>=7">7</li>
					<li style="left: 80%;" v-if="Number(levelnum)>=8">8</li>
					<li style="left: 90%;" v-if="Number(levelnum)>=9">9</li>
					<li style="left: 100%;" v-if="Number(levelnum)>=10">10</li>
				</ol>

			</div>
			<h1>NTF GRADE</h1>
		</div>
		<div class="bottom">
			<img class="left" src="../../../static/image/hotelyetiway-card_full.png" />
			<div class="right">
				<div class="intop">
					<h1>CURRENT INCOME</h1>
					<div><img src="../../../static/image/LMT.png"><span></span>
						<p>{{levelprice}}</p>
					</div>
				</div>
				<div class="inbottom">
					<h1>LEVELIND UP NEEDS</h1>
					<span>You can receive income for every 24 hours</span>
					<p>+{{levelpricegive}}</p>
				</div>
			</div>

		</div>
		<div class="button">
			<button type="button" :class="Number(levelnum)==10?'preventReClick':''" @click="approve($event)" v-if="approvebool==false" v-preventReClick>APPROVE</button>
			<button type="button" :class="Number(levelnum)==10?'preventReClick':''" @click="level" v-if="approvebool==true">UPGRADE</button>
			<!--<button type="button" :class="Number(levelnum)==10?'preventReClick':''" @click="$router.push('/upgradein?id='+$route.query.id+'&unit='+$route.query.unit)">UPGRADE</button>-->
			<button type="button" @click="bonusForId" :class="leveltime==false?'preventReClick':''">RECEIVE</button>
		</div>
	</div>
</template>

<script>
	Date.prototype.Format = function(fmt) {
		var o = {
			"M+": this.getMonth() + 1, 
			"d+": this.getDate(),
			"H+": this.getHours(),
			"m+": this.getMinutes(),
			"s+": this.getSeconds(),
			"q+": Math.floor((this.getMonth() + 3) / 3),
			"S": this.getMilliseconds() 
		};
		if(/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		for(var k in o)
			if(new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		return fmt;
	}
	const funcProcessingTime = _str => _str.toString().length >= 2 ? _str : '0' + _str
	import web3tools from '../../web3/web3tools'
	export default {
		data() {
			return {
				show: '',
				approvebool: false,
				levelnum: 0,
				leveltime: false,
				leveltimelist: [],
				levelprice:0,
				levelpricegive:0,
			}
		},
		mounted() {
			this.roleLevel()
			this.tokenOf();
			this.BonusTimeLeft()
		},
		methods: {
			tokenOf() {
				this.$post(this.$apiUtil.getTokenBytokenId, {
					tokenId: this.$route.query.id,
					tokenType: this.$route.query.unit,
				}).then((res) => {
					this.show = res.data
				})
			},
			BonusTimeLeft() {
				let that = this
				let addr;
				if(this.$route.query.unit == 'LMT') {
					addr = this.$store.state.LMTgameaddr;
				} else if(this.$route.query.unit == 'LMG') {
					addr = this.$store.state.LMGgameaddr;
				}
				web3tools.BonusTimeLeft(addr, this.$route.query.id, (e) => {
					let time = (Date.parse(new Date()) / 1000) + Number(e._time)
					that.leveltimelist = [{
						endtime: new Date(Number(time)*1000).Format("yyyy-MM-dd HH:mm:ss"),
						timeData: {
							_D: '00',
							_H: '00',
							_M: '00',
							_S: '00'
						}
					}]
					that.funcCountdownDiff(that.leveltimelist)

				});
			},
			bonusForId(){
				let addr;
				if(this.$route.query.unit == 'LMT') {
					addr = this.$store.state.LMTgameaddr;
				} else if(this.$route.query.unit == 'LMG') {
					addr = this.$store.state.LMGgameaddr;
				}
				console.log(addr)
				console.log(this.$route.query.id)
				web3tools.bonusForId(addr, this.$route.query.id, (e) => {
					this.$toast('Please wait')
				}, (e) => {
					this.$toast('Success')
					this.BonusTimeLeft()
					this.roleLevel()
					this.leveltime=false;
				});
			},
			roleLevel() {
				let addr;
				if(this.$route.query.unit == 'LMT') {
					addr = this.$store.state.LMTgameaddr;
				} else if(this.$route.query.unit == 'LMG') {
					addr = this.$store.state.LMGgameaddr;
				}
				web3tools.roleLevel(addr, this.$route.query.id, (e) => {
					this.levelnum = e;
				});
				web3tools.costForLevelup(addr, this.$route.query.id, (e) => {
					this.levelprice = e;
				});
				web3tools.bonusForLogin(addr, this.$route.query.id, (e) => {
					this.levelpricegive = e;
				});
			},
			approve(event) {
				let addr,toaddr;
				if(this.$route.query.unit == 'LMT') {
					addr = this.$store.state.LMTaddr;
					toaddr = this.$store.state.LMTgameaddr;
				} else if(this.$route.query.unit == 'LMG') {
					addr = this.$store.state.LMGaddr;
					toaddr = this.$store.state.LMGgameaddr;
				}
				web3tools.approve(addr,toaddr, (Number(this.levelprice) * 1.1), (e) => {
					this.$toast('Please wait')
					$(event.target).addClass('preventReClick')
				}, (e) => {
					this.$toast('Approve succeeded')
					$(event.target).removeClass('preventReClick')
					this.approvebool = true;
				});
			},
			level() {
				let addr;
				if(this.$route.query.unit == 'LMT') {
					addr = this.$store.state.LMTgameaddr;
				} else if(this.$route.query.unit == 'LMG') {
					addr = this.$store.state.LMGgameaddr;
				}
				web3tools.levelup(addr, this.$route.query.id, (e) => {
					this.$toast('Please wait')
				}, (e) => {
					this.$toast('Success')
					this.roleLevel()
					this.approvebool = false;
				});
			},
			funcCountdownDiff(time, _call) {
				clearInterval(this.CountdownTiming)
				this.CountdownTiming = setInterval(() => {
					for(let i = 0; i < time.length; i++) {
						if(time[i].endtime != '') {
							let d = moment.duration(moment(time[i].endtime).diff(moment())).days(),
								h = moment.duration(moment(time[i].endtime).diff(moment())).hours(),
								m = moment.duration(moment(time[i].endtime).diff(moment())).minutes(),
								s = moment.duration(moment(time[i].endtime).diff(moment())).seconds()
							if(d < 0 || h < 0 || m < 0 || s < 0) {
								time[i].timeData = {
									_D: '00',
									_H: '00',
									_M: '00',
									_S: '00'
								}
								clearInterval(this.Timing)
								this.Timing = setTimeout(() => {
									this.leveltime = true;
								}, 1e3)
								clearInterval(this.CountdownTiming)
								this.CountdownTiming = null
							} else {
								time[i].timeData = {
									_D: funcProcessingTime(d),
									_H: funcProcessingTime(h),
									_M: funcProcessingTime(m),
									_S: funcProcessingTime(s)
								}
							}
						}
					}
				}, 1e3)
			},
		},
	}
</script>

<style scoped>
	.upgrade {
		width: 100%;
		margin-bottom: .93rem;
	}
	
	.upgrade .top {
		background-image: url(../../../static/image/1BG.png);
		background-repeat: no-repeat;
		background-size: 100%;
		margin: .18rem .11rem 0;
	}
	
	.upgrade .top .means {
		display: flex;
	}
	
	.upgrade .top .left {
		margin-top: .1833rem;
		margin-left: .1733rem;
		width: 1.04rem;
		height: .86rem;
		margin-right: .17rem;
		background: #3E365D;
		border-radius: .1rem;
		border: .02rem solid #35E7FF;
	}
	
	.upgrade .top .left img {
		width: 100%;
		height: 100%;
		border-radius: .1rem;
	}
	
	.upgrade .top .right {
		padding-top: .28rem;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		flex: 1;
		padding-bottom: .1rem;
	}
	
	.upgrade .top .right p {
		color: #ffffff;
		font-size: .14rem;
		display: flex;
		align-items: center;
		font-family: Magistral-Medium;
	}
	
	.upgrade .top .right p span {
		margin-left: .06rem;
		font-size: .15rem;
	}
	
	.upgrade .top>h1 {
		text-align: center;
		color: #ffffff;
		font-size: .17rem;
		font-family: Magistral-Bold;
		font-weight: bold;
		padding-bottom: .2367rem;
		margin-top: .1333rem;
	}
	
	.upgrade .top .line {
		margin-top: .28rem;
		margin-left: .27rem;
		margin-right: .37rem;
		position: relative;
	}
	
	.upgrade .top .line ul {
		display: flex;
		position: relative;
		height: .1rem;
		border: 1px solid #35E7FF;
		border-radius: .05rem;
	}
	
	.upgrade .top .line ul li {
		background-image: url(../../../static/image/stardown.png);
		background-size: 100%;
		background-repeat: no-repeat;
		width: .26rem;
		height: .26rem;
		position: absolute;
		top: -.09rem;
		margin-left: -.13rem;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #FFFFFF;
		font-weight: bold;
		font-size: .12rem;
		font-family: Magistral-Bold;
	}
	
	.upgrade .top .line ol {
		display: flex;
		height: .1rem;
		border-radius: .05rem;
		position: absolute;
		width: 100%;
		top: 0.01rem;
	}
	
	.upgrade .top .line ol li {
		background-image: url(../../../static/image/staryes.png);
		background-size: 100%;
		background-repeat: no-repeat;
		width: .26rem;
		height: .26rem;
		position: absolute;
		top: -.09rem;
		margin-left: -.13rem;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: bold;
		font-size: .12rem;
		font-family: Magistral-Bold;
	}
	
	.upgrade .top .line div {
		height: .099rem;
		border-radius: .05rem;
		position: absolute;
		width: 20%;
		top: 0.01rem;
		background: linear-gradient(#F2F047, #1ED94F);
	}
	
	.upgrade .top>img {
		margin: .19rem auto 0;
		display: block;
		padding-bottom: .17rem;
	}
	
	.upgrade .bottom {
		background-image: url(../../../static/image/2BG.png);
		background-repeat: no-repeat;
		background-size: 100%;
		margin: .07rem .11rem 0;
		display: flex;
		align-items: center;
		height: 3.28rem;
		justify-content: space-between;
		padding: 0 .17rem;
	}
	
	.upgrade .bottom .left {
		height: 2.2467rem;
		/*margin-left: .145rem;
		margin-top: .195rem;
		border: 1px solid #CEABF7;
		border-radius: .2rem;
		margin-bottom: .265rem;
		float: left;*/
	}
	
	.upgrade .bottom .intop {
		background-image: url(../../../static/image/Gold-coins-BG.png);
		background-repeat: no-repeat;
		background-size: 100%;
		height: 1.04rem;
		float: right;
		width: 1.83rem;
	}
	/*.upgrade .bottom .intop>img {
		float: right;
		margin-top: .29rem;
		margin-right: .12rem;
		display: block;
		padding-left: 30%;
	}*/
	
	.upgrade .bottom .intop div {
		float: right;
		background: rgba(126, 120, 24, .77);
		border-radius: .05rem;
		display: flex;
		margin-right: .13rem;
		margin-top: .2rem;
		align-items: center;
	}
	
	.upgrade .bottom .intop div img {
		width: .12rem;
		height: .12rem;
		margin: .04rem .055rem;
		display: block;
	}
	
	.upgrade .bottom .intop div span {
		width: 1px;
		height: .13rem;
		background: #EFE87E;
	}
	
	.upgrade .bottom .intop div p {
		color: #ffffff;
		margin: 0 .11rem;
		line-height: .14rem;
		padding: .04rem 0;
		font-weight: bold;
		font-size: .13rem;
		font-family: Magistral-Bold;
	}
	
	.upgrade .bottom .intop h1 {
		text-align: right;
		margin-top: .18rem;
		margin-right: .12rem;
		font-size: .14rem;
		font-family: Magistral-Bold;
		font-weight: bold;
	}
	
	.upgrade .bottom .inbottom {
		background-image: url(../../../static/image/Computing-Power-BG.png);
		background-repeat: no-repeat;
		background-size: 100%;
		float: right;
		width: 1.83rem;
		margin-top: .15rem;
		height: 1.05rem;
	}
	/*.upgrade .bottom .inbottom img {
		float: right;
		margin-top: .1rem;
		margin-right: .035rem;
		display: block;
		padding-left: 30%;
	}*/
	
	.upgrade .bottom .inbottom h1 {
		margin-top: .1rem;
		font-family: Magistral-Bold;
		text-align: right;
		margin-right: .12rem;
		font-size: .14rem;
		font-weight: bold;
	}
	
	.upgrade .bottom .inbottom span {
		float: right;
		font-size: .12rem;
		margin-right: .1rem;
		color: #ffffff;
		text-align: right;
		padding-left: 20%;
		font-family: Magistral-Medium;
		margin-top: .05rem;
	}
	
	.upgrade .bottom .inbottom p {
		float: right;
		background: #7E7818;
		border-radius: .05rem;
		width: .67rem;
		text-align: center;
		margin-top: .11rem;
		margin-right: .12rem;
		color: #ffffff;
		font-weight: bold;
		font-size: .13rem;
		font-family: Magistral-Bold;
		padding: .02rem 0;
	}
	
	.upgrade .button {
		display: flex;
	}
	
	.upgrade .button button {
		height: .44rem;
		font-weight: bold;
		/*width: 1.83rem;*/
		width: 1.4rem;
		margin: .1rem auto 0;
		display: block;
		border-radius: .22rem;
		background: linear-gradient(#FFFC00, #DB7100);
	}
</style>