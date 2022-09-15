<template>
	<div class="calendar_top">
		<div>
			<div class="calendar_top_left">
				<p><img src="../../../static/image/sign_in.png" alt=""></p>
			</div>
			<div class="calendar_top_right">
				<h1>{{$t('fSIGNIN')}}</h1>
				<h6 v-html="$t('fSignintoreceivereward')"></h6>
			</div>

		</div>

		<div class="calendar_footer">
			<p class="c_f_o">{{$t('fSIGNINDATE')}}</p>

			<!-- <p > -->
			<!-- <span class="inspan"><img src="../../../static/image/Layer1042.png" alt=""></span> -->
			<!-- <input type="text" placeholder="Seach"></p> -->
			<div class="calendar_center">
				<div id='schedule-box'></div>
				<!--<p class="schedule_p"></p>-->
			</div>

			<p class="c_f_t">{{$t('fsigninfor')}} <span>{{day}}</span> {{$t('fdays')}}</p>
			<p class="c_f_b" @click="showto" :class="sign==true?'preventReClick':''" v-music><span>{{$t('fRECEIVEREWARD')}}</span></p>
			<p class="c_f_sing">{{$t('fSigninRules')}}</p>
			<ul class="c_f_list">
				<li>{{$t('frules1')}}</li>
				<li>{{$t('frules2')}}</li>
				<li>{{$t('frules3')}}</li>
				<!-- <li>4.  Sign in for 100 day, Get rewards 1000LMG;</li>
                    <li>5.  Sign in for 200 day, Get rewards 3000LMG;</li>
                    <li>6.  Sign in for 500 day, Get rewards 10000LMG;</li> -->
			</ul>
		</div>
		<div class="calender_axs" v-if="show" @click="show=false">
			<div class="calender_too" @click.stop>
				<p class="cal_too_top">{{$t('fRECEIVEREWARD')}}</p>
				<p class="cal_too_ctn">You have checked in for {{day}} consecutive days. You are eligible to receive rewards {{toreward}}LMG</p>
				<p class="cal_too_bom" @click="signin()" v-movedown v-music v-preventReClick>{{$t('eReceive')}}</p>
			</div>
		</div>
	</div>

</template>
<style>
	#nextYear,
	#prevYear {
		display: none;
	}
	
	.calendar_top {
		background: url("../../../static/image/LEADERBOOARD_BG.png") no-repeat;
		background-size: 100%;
		width: 92%;
		margin-left: 0.11rem;
		margin-top: 0.22rem;
		overflow: hidden;
		height: 8.5rem;
	}
	.calendar_top .calendar_top_left {
		position: relative;
		top: 0.31rem;
		left: 0.35rem;
		width: 30%;
	}
	.calendar_top .calendar_top_left p img {
		width: 100%;
		height: 100%;
	}
	.calendar_top .calendar_top_right {
		position: relative;
		top: -.8rem;
		left: -20%;
		text-align: right;
	}
	.calendar_top .calendar_top_right h1 {
		font-size: 0.28rem;
		background-image: -webkit-linear-gradient(#FFC726 30%, #E8641B);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		position: relative;
		left: 0.12rem;
		top: 0.26rem;
		font-family: Magistral-Medium;
	}
	.calendar_top .calendar_top_right h6 {
		color: #fff;
		/* margin-top: 0.11rem; */
		position: relative;
		left: .15rem;
		top: 0.30rem;
		font-family: Magistral-Medium;
		font-size: 0.14rem;
		text-transform:uppercase;
	}
	.calendar_footer {
		width: 100%;
		height: 5.87rem;
		background: url("../../../static/image/checlk_in_BG.png");
		background-size: 100% 100%;
		margin-bottom: 0.8rem;
	}
	
	.calendar_footer .c_f_o {
		text-align: center;
		font-size: 0.18rem;
		font-family: Magistral-Bold;
		color: #fff;
		padding-top: 0.2rem;
	}
	.calendar_footer input {
		width: 2.42rem;
		height: 0.3rem;
		border: 1px solid #35E7FF;
		border-radius: 0.15rem;
		position: relative;
		left: 0.40rem;
		top: 0.05rem;
		font-family: Magistral-Bold;
		font-size: 0.11rem;
		color: #fff;
		text-indent: 0.4rem;
	}
	
	.calendar_footer input::-webkit-input-placeholder {
		position: relative;
		left: 0.01rem;
	}
	
	.inspan {
		position: relative;
		left: 0.68rem;
		top: 0.07rem;
		width: 0.11rem;
		height: 0.11rem;
		display: inline-block;
	}
	
	.inspan img {
		width: 100%;
		height: 100%;
	}
	.c_f_t {
		font-family: Magistral-Medium;
		font-size: 0.16rem;
		color: #fff;
		position: relative;
		top: 0.2rem;
		text-align: center;
	}
	
	.c_f_t span {
		font-size: 0.17rem;
	}
	.c_f_b {
		font-family: Magistral-Medium;
		background: url("../../../static/image/RECEIVEAWARD.png");
		background-size: 100% 100%;
		/* background: linear-gradient(#ffffff, #999999);
        pointer-events:none; */
		font-size: 0.16rem;
		width: 2.24rem;
		height: 0.34rem;
		position: relative;
		top: 0.3rem;
		left: 0.7rem;
		text-align: center;
		border-radius: .18rem;
	}
	
	.c_f_b span {
		position: relative;
		top: 0.07rem;
		text-transform:uppercase;
	}
	
	.c_f_sing {
		font-family: Magistral-Medium;
		font-size: 0.14rem;
		color: #fff;
		position: relative;
		top: 0.4rem;
		left: 0.7rem;
	}
	.c_f_list {
		list-style: none;
		color: #F5D90E;
		font-family: Magistral-Medium;
		position: relative;
		width: 92%;
		top: 0.45rem;
		left: 0.7rem;
	}
	
	.c_f_list li {
		font-size: 0.12rem;
		font-family: Magistral-Medium;
	}
	/*  */
	/*  */
	.calendar_center {
		width: 2.39rem;
		border: 1px solid #35E7FF;
		border-radius: 0.04rem;
		position: relative;
		left: 0.57rem;
		top: 0.12rem;
	}
	
	.calendar_center div {}
	#schedule-box {
		width: 100%;
		margin: 0 auto;
		font-size: 13px;
		padding-left: .1rem;
		/* box-shadow: 2px 2px 15px 2px #e3e3e3; */
		padding-bottom: .08rem;
	}
	/* 1111111111111 */
	
	.schedule-hd {
		display: flex;
		justify-content: space-between;
		padding: .2rem;
	}
	
	.today {
		flex: 1;
		text-align: center;
	}
	
	.ul-box {
		overflow: hidden;
	}
	/* .ul-box>li {
	float: left;
	text-align: center;
	padding: 5px 0;
    background: #8D4AD4;
    border-radius: 0.33rem;
    width: 0.29rem;
    height: 0.29rem;
} */
	
	.other-month {
		color: #B880F4;
		background: #7B36C5;
		font-family: SourceHanSansCN-Bold;
		font-size: 0.12rem;
	}
	
	.other-month span {
		position: relative;
		width: 100%;
		height: 100%;
	}
	
	.current-month {
		color: #fff;
		font-size: 0.12rem;
		background: #8D4AD4;
		font-family: SourceHanSansCN-Bold;
	}
	
	.current-month span {
		display: block;
		width: auto;
    	height: 100%;
    	padding-left: .035rem;
	}
	
	.current-month li span:nth-child(17) {
		background: url("../../../static/image/yesto.png") no-repeat;
		background-position-x: 70%;
		background-position-y: 80%;
	}
	/* .today-style {
	border-radius: 50%;
	background: #58d321;
} */
	
	.arrow {
		cursor: pointer;
	}
	.dayStyle {
		display: inline-block;
		width: 0.35rem;
		height: 0.35rem;
		border-radius: 50%;
		position: relative;
		cursor: pointer;
	}
	.schedule_r_c {
		font-family: Magistral-Bold;
		color: #fff;
		font-size: 0.13rem;
	}
	
	.schedule-hd div {
		position: relative;
		color: #fff;
		height: 0.09rem;
		display: inline;
	}
	
	.schedule-hd span {
		width: 100%;
		height: 100%;
	}
	
	.schedule-hd div:first-child {
		width: 0.08rem;
		height: 0.14rem;
		transform: rotate(90deg);
		position: relative;
		left: 80%;
		top: -0.065rem;
	}
	
	.schedule-hd .today {
		position: relative;
		left: -0.65rem;
		margin-top: -.05rem;
		font-size: .13rem;
		font-family: Magistral-Bold;
	}
	
	.schedule-hd div:last-child {
		width: 0.08rem;
		height: 0.14rem;
		transform: rotate(90deg);
		    top: -0.06rem;
    left: -0.06rem;
	}
	.today-flag {
		/* background: #00C2B1;
	color: #fff; */
	}
	
	.week-ul {
		width: 92%;
		position: relative;
		top: -0.08rem;
	}
	
	.week-ul li {
		color: #fff;
		font-size: 0.12rem;
		font-family: Magistral-Book;
		float: left;
		text-align: center;
		text-align: center;
		width: 14%;
		height: 0.12rem;
		/* background: #8D4AD4; */
		/* border-radius: 0.33rem;
    width: 0.29rem;
    height: 0.29rem; */
	}
	
	.schedule-bd {
		width: 92%;
		position: relative;
		top: -0.03rem;
		left: 0.01rem;
	}
	
	.schedule-bd li {
		border-radius: 0.03rem;
		float: left;
		width: 0.29rem;
		height: 0.29rem;
		margin-top: 0.02rem;
		margin-left: 0.02rem;
	}
	/* .schedule-bd .selected-style{
    background: url("../../../static/image/yesto.png");
}
.currentDate {} */
	/* 22222 */
	/*  */
	
	.schedule-bd li {
		width: 0.29rem;
		height: 0.29rem;
	}
	/*  */
	.selected-style {
		/* background: #00BDFF;
	color: #ffffff; */
	}
	
	@font-face {
		font-family: "iconfont";
		src: url('//at.alicdn.com/t/font_234130_nem7eskcrkpdgqfr.eot?t=1505291076294');
		/* IE9*/
		src: url('//at.alicdn.com/t/font_234130_nem7eskcrkpdgqfr.eot?t=1505291076294#iefix') format('embedded-opentype'), /* IE6-IE8 */
		url("data:application/x-font-woff;charset=utf-8;base64,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") format('woff'), url("//at.alicdn.com/t/font_234130_nem7eskcrkpdgqfr.ttf?t=1505291076294") format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
		url("//at.alicdn.com/t/font_234130_nem7eskcrkpdgqfr.svg?t=1505291076294#iconfont") format('svg');
		/* iOS 4.1- */
	}
	
	.iconfont {
		font-family: "iconfont" !important;
		font-size: 16px;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
	
	.icon-115rightarrowheads:before {
		content: "\e79b";
	}
	
	.icon-111arrowheadright:before {
		content: "\e6db";
		width: 0.08rem;
		height: 0.14rem;
		font-size: 0.15rem;
		display: block;
	}
	
	.icon-116leftarrowheads:before {
		content: "\e807";
	}
	
	.icon-112leftarrowhead:before {
		content: "\e6f6";
		width: 0.08rem;
		height: 0.14rem;
		font-size: 0.15rem;
		display: block;
	}
	/* 111111111111 */
	
	.calender_axs {
		width: 100%;
		height: 100%;
		background-color: rgba(14, 13, 13, 0.5);
		position: relative;
		top: -8.4rem;
	}
	
	.calender_too {
		width: 99%;
		height: 3.11rem;
		background: url("../../../static/image/RECEIV_awa.png") no-repeat;
		background-size: 100% 100%;
		position: relative;
		top: 1.7rem;
		left: 0.03rem;
		display: inline-block;
	}
	
	.cal_too_top {
		width: 2.73rem;
		height: 0.23rem;
		color: #fff;
		font-size: 0.28rem;
		font-family: Magistral-Bold;
		font-weight: bold;
		text-align: center;
		position: relative;
		left: 0.4rem;
		top: 0.39rem;
		text-transform:uppercase;
	}
	
	.cal_too_ctn {
		width: 2.73rem;
		height: 0.62rem;
		font-size: 0.2rem;
		font-family: Magistral-Medium;
		color: #fff;
		text-align: center;
		position: relative;
		left: 0.4rem;
		top: .7rem;
	}
	
	.cal_too_bom {
		background: url("../../../static/image/RoundeRectangle3x.png") no-repeat;
		background-size: 100%;
		width: 2.24rem;
		height: 0.54rem;
		font-size: 0.25rem;
		font-family: Magistral-Bold;
		text-align: center;
		position: relative;
		left: 0.64rem;
		top: 1.28rem;
		padding-top: 0.09rem;
		text-transform: uppercase;
	}
	
	.c_f_bsx {
		font-family: Magistral-Medium;
		background: rgba(14, 13, 13, 0.5);
		background-size: 100% 100%;
		font-size: 0.16rem;
		width: 2.24rem;
		height: 0.34rem;
		position: relative;
		top: 0.3rem;
		left: 0.7rem;
		text-align: center;
	}
	
	.schedule_p {
		width: 0.29rem;
		height: 0.29rem;
		background: #000;
		background: url("../../../static/image/yesto.png") no-repeat;
		background-position-x: 70%;
		background-position-y: 80%;
		position: relative;
		top: -1.12rem;
		left: 0.75rem;
	}
	
	.current-active {
		background-image: url("../../../static/image/yesto.png");
		background-position-x: 70%;
		background-position-y: 80%;
		background-repeat: no-repeat;
		background-size: .19rem;
	}
</style>

<script>
	export default {
		data() {
			return {
				num: 1,
				show: false,
				day: 0,
				sign:true,
				toreward:0,
			}
		},
		methods: {
			getdata() {
				$(function() {
					var mySchedule = new Schedule({
						ela: '#schedule-box',
						clickCb: function(y, m, d) {

						},
						nextMonthCb: function(y, m, d) {
						},
						nextYeayCb: function(y, m, d) {

						},
						prevMonthCb: function(y, m, d) {

						},
						prevYearCb: function(y, m, d) {

						}
					});
				})

			},
			showto(){
				if(this.day==10){
					this.toreward=500;
					this.show=true;
				}else if(this.day==30){
					this.toreward=2000;
					this.show=true;
				}else if(this.day==50){
					this.toreward=5000;
					this.show=true;
				}else if(this.day==100){
					this.toreward=10000;
					this.show=true;
				}else if(this.day==200){
					this.toreward=20000;
					this.show=true;
				}else{
					this.signin()
				}
			},
			showCont() {
				this.$post(this.$apiUtil.reward_continuity, {
					playerId: this.$cookies.get('playerId'),
					walletAddress: this.$cookies.get('walletAddress')
				}).then((res) => {
					this.day = res.data;

				})
			},
			signin() {
				this.$post(this.$apiUtil.reward_sign, {
					playerId: this.$cookies.get('playerId'),
					walletAddress: this.$cookies.get('walletAddress')
				}).then((res) => {
					this.getdata();
					this.showCont();
					this.sign=true;
					this.show = false;
				})
			},
			signinto() {
				this.$post(this.$apiUtil.reward_getOne, {playerId:this.$cookies.get('playerId'),walletAddress:this.$cookies.get('walletAddress')}).then((res) => {
					if(res.data==false){
						this.sign=false;
					}
				})
			},
		},
		mounted() {
			this.getdata();
			this.showCont();
			this.signinto();
		},

	}
</script>