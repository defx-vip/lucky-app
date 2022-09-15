<template>
	<div class="caseOpen">
		<div class="banneropen">
			<div class="banner_left">
				<img src="../../../static/image/yellowchest.png" alt="">
			</div>
			<ul class="banner_right">
				<li class="b_r_listo">{{$t('fTIME')}}</li>
				<li class="b_r_listt">{{$t('fTREASURECHEST')}}</li>
				<li class="b_r_lists" v-html="$t('fOPENTREASURECHESTSTOGETTIMEDREWARD')"></li>
			</ul>
		</div>
		<div class="caseopen_footer">
			<div class="cp_f_t">
				<ul class="cp_f_t_list">
					<li class="cp_f_t_list_o">{{$t('eLEVEL')}}</li>
					<li class="cp_f_t_list_t">{{$t('fREWARD')}}</li>
					<li class="cp_f_t_list_s">{{$t('fOPERATION')}}</li>
				</ul>
			</div>
			<div class="cp_f_f">
				<ul class="cp_f_f_list">
					<li v-for="(item, index) in list" :key="item.id">
						<div :class="index==0?'f_list_l':'f_list_lx'">
							<p>
								<img src="../../../static/image/8000.png" />
								<span>{{item.level}}</span>
							</p>
						</div>

						<div :class="index==0?'f_list_c':'f_list_cx'">
							<p>{{$t('fReachLevel')}} {{item.level}}</p>
							<p v-if="$i18n.locale=='en'">Get <span> {{item.integral}} LMG</span> for free every<br> {{item.period}} hours</p>
							<p v-if="$i18n.locale=='zh'">每{{item.period}}小時<br>免費獲得<span> {{item.integral}} LMG</span></p>
							<!-- <p>{{$t('fCountdownin')}} <span v-if="artwork_time!=''">{{artwork_time[index].timeData._H}}:{{artwork_time[index].timeData._M}}:{{artwork_time[index].timeData._S}}</span></p> -->

						   <p v-if=" item.xiaGradeTime &&  item.hour < item.xiaGradeTime">{{$t('fCountdownin')}}
						      <span>

								 {{formateTime( (item.xiaGradeTime - item.hour))}}


						      </span>
						   </p>

						   <!-- <p v-else>{{$t('fCountdownin')}}
						      <span> 00:00:00</span>
						   </p> -->

						</div>


						<!-- <div v-if="artwork_time!=''&&CountdownTiming!=null" :class="artwork_time[index].timeData._D=='00'&&artwork_time[index].timeData._H=='00'&&artwork_time[index].timeData._M=='00'&&artwork_time[index].timeData._S=='00'?'f_list_r':'f_list_rx'" @click="gardeRecord(item.id,index)" v-movedown v-music v-preventReClick>
							<p>{{$t('fRECEIVE')}}</p>
						</div> -->


						<div
						@click="gardeRecord(item.id,index)"
						v-if="  item.xiaGradeTime
						&& item.hour > item.xiaGradeTime"
						:class="item.hour < item.xiaGradeTime?'f_list_rx':' f_list_r'"
						v-movedown v-music v-preventReClick>
							<p>{{$t('fRECEIVE')}} </p>
						</div>

                       <div   v-else
					     class="f_list_rx"
						v-movedown v-music v-preventReClick>
							<p>{{$t('fRECEIVE')}} </p>
						</div>

					</li>

				</ul>
			</div>
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
	export default {
		data() {
			return {
				artwork_time: [],
				Timing: null,
				CountdownTiming: null,
				list: [

				],
				time:'',
				timer:"",
			}
		},
		mounted() {
			 this.queryone()
			this.timer = setInterval(()=>{
                this.queryone()
			},1000)
		},
		methods: {
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

			gardeRecord(id,index) {
				let that=this
				this.$post(this.$apiUtil.gardeRecord, {
					id:id,
					playerId: this.$cookies.get('playerId'),
					walletAddress: this.$cookies.get('walletAddress')
				}).then((res) => {
					this.queryone();
				})
			},
			queryone() {
				this.artwork_time = [];
				this.$post(this.$apiUtil.queryone, {
					playerId: this.$cookies.get('playerId'),
					walletAddress: this.$cookies.get('walletAddress')
				}).then((res) => {
					if(res  && res.data && res.data.lst ){
					  this.time=(res.data.date+"").substring(0, 19);
                      this.list = res.data.lst;
					 if(this.list.length>0){
						this.list.sort(function(a, b) {
						   return a.level - b.level
					    })
                       this.list.map((item,index)=> {
						return  Number(this.list[index].hour = this.time)
					 })
					}else{
                         clearInterval(this.timer)
					  }
					}else{
						clearInterval(this.timer)
					}

				})
			},
		},
		beforeDestroy (){
			 clearInterval(this.timer)
		}
	}
</script>
<style scoped>
	.caseOpen {
		width: 100%;
		float: left;
		margin-bottom: 1.515rem;
	}

	.caseOpen .banneropen {
		width: 92%;
		margin: .36rem auto .49rem;
		height: 1.73rem;
		background: url('../../../static/image/Play-while-earning-BG2.png') no-repeat;
		background-size: 100%;
		display: flex;
		justify-content: space-between;
	}
	.caseOpen .banneropen img {
		display: block;
		width: 1.94rem;
		height: 1.84rem;
	}

	.banbanneropenner .banner_left {
		/* width: 2.264rem; */
		height: 2.04rem;
		/* background: url('') no-repeat 0rem 0.03rem;
		margin-left: -0.08rem; */
	}

	.banner_left img {
		width: 100%;
		height: 100%;
		margin-top: 0.03rem;
		margin-left: -0.08rem;
	}
	.banner_right {
		color: #fff;
		text-align: right;
		position: relative;
		left: -.175rem;
		top: -0.05rem;
		font-family: Magistral-Medium;
	}
	.banner_right .b_r_listo {
		font-family: Magistral-Medium;
		font-size: 0.28rem;
		background-image: -webkit-linear-gradient(#FFC726 30%, #E8641B);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		margin-top: 0.35rem;
		/* background: linear-gradient(180deg, #FFFFFF, #AFAFAF, #FFFFFF);
		-webkit-background-clip: text;
		color: transparent; */
	}

	.banner_right .b_r_listt {
		font-size: 0.16rem;
		background: linear-gradient(bottom, #55D5FF, #01CBFD);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		font-family: Magistral-Medium;
	}

	.banner_right .b_r_lists {
		font-size: 0.12rem;
		margin-top: .24rem;
		width: 120%;
		position: relative;
		left: -20%;
		top: -4%;
		font-family: Magistral-Bold;
	}

	.caseopen_footer {
		width: 3.51rem;
		padding-bottom: 1rem;
		background: url('../../../static/image/timed3BG.png') no-repeat;
		background-size: 100% 100%;
		margin-left: 0.11rem;
		margin-top: -.45rem;
	}

	.caseopen_footer .cp_f_t {
		list-style: none;
	}

	.caseopen_footer .cp_f_t li {
		float: left;
		padding-left: 0.45rem;
		margin-top: .376rem;
		color: #fff;
		font-family: Magistral-Medium;
	}

	.caseopen_footer .cp_f_t_list_o {
		position: relative;
    	left: -0.28rem;
    	width: 0.7rem;
	}

	.caseopen_footer .cp_f_t_list_t {
		position: relative;
    	padding: 0 !important;
    	left: -0.25rem;
    	width: 1.5rem;
    	text-align: center;
	}

	.caseopen_footer .cp_f_t_list_s {
		position: relative;
    	left: -0.3rem;
    	padding: 0 !important;
    	width: 0.8rem;
    	text-align: right;
	}

	.caseopen_footer .cp_f_f_list {
		list-style-type: none;
		position: relative;
		top: 0.63rem;
	}

	.caseopen_footer .cp_f_f_list li {
		width: 3.1rem;
		height: 0.7rem;
		margin-top: 0.033rem;
		border: 1px solid #35E7FF;
		border-radius: 3%;
		margin-left: 0.19rem;
		font-family: Magistral-Medium;
	}

	.caseopen_footer .cp_f_f_list li .f_list_l {
		font-family: Magistral-Medium;
		width: 0.53rem;
		height: 0.22rem;
		background: url('../../../static/image/Rounded-Rectangle-2483.png') no-repeat;
		background-size: 100% 100%;
		position: relative;
		left: .08rem;
		top: .26rem;
	}

	.caseopen_footer .cp_f_f_list li .f_list_l p {
		position: relative;
		top: -245%;
		left: 15%;
		font-family: Magistral-Medium;
	}

	.caseopen_footer .f_list_l p img {
		width: 30%;
		height: 30%;
	}

	.caseopen_footer .cp_f_f_list li .f_list_l p span {
		font-family: Magistral-Medium;
		position: relative;
		top: -0.01rem;
		left: 8%;
	}

	.caseopen_footer .f_list_c {
		width: 60%;
		height: 0.52rem;
		position: relative;
		left: 0.75rem;
		top: -0.08rem;
		color: #fff;
		font-family: Magistral-Medium;
	}

	.caseopen_footer .f_list_c p {
		position: relative;
		top: -0.46rem;
		width: 100%;
		font-size: 0.12rem;
		font-family: Magistral-Medium;
	}

	.caseopen_footer .f_list_c p span {
		color: #FFC726;
		font-weight: bold;
		font-family: Magistral-Medium;
	}

	.caseopen_footer .f_list_r {
		width: 0.73rem;
		height: 0.22rem;
		background: url('../../../static/image/RECHARGE.png') no-repeat;
		background-size: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		left: 74%;
		top: -67%;
		border-radius: 0.11rem;
	}

	.caseopen_footer .f_list_r p {
		font-size: 0.12rem;
		line-height: -30%;
		font-family: Magistral-Medium;
	}

	.caseopen_footer .f_list_lx {
		list-style-type: none;
		position: relative;
		top: 0.63rem;
	}

	.caseopen_footer .f_list_lx li {
		width: 3rem;
		height: 0.7rem;
		margin-top: 0.033rem;
		border: 1px solid #35E7FF;
		border-radius: 3%;
		margin-left: 0.19rem;
		font-family: Magistral-Medium;
	}

	.caseopen_footer .f_list_lx {
		font-family: Magistral-Medium;
		width: 0.53rem;
		height: 0.22rem;
		background: url('../../../static/image/Rounded-Rectangle-2483.png') no-repeat;
		background-size: 100% 100%;
		position: relative;
		left: .08rem;
		top: .26rem;
	}

	.caseopen_footer .f_list_lx p {
		position: relative;
		top: 10%;
		left: 15%;
		font-family: Magistral-Medium;
	}

	.caseopen_footer .f_list_lx p img {
		width: 30%;
		height: 30%;
	}

	.caseopen_footer .f_list_lx p span {
		font-family: Magistral-Medium;
		position: relative;
		top: -0.01rem;
		/*left: 8%;*/
	}

	.caseopen_footer .f_list_cx {
		width: 60%;
		height: 0.52rem;
		position: relative;
		left: 0.75rem;
		top: -0.11rem;
		color: #fff;
		font-family: Magistral-Medium;
	}

	.caseopen_footer .f_list_cx p {
		position: relative;
		width: 100%;
		top: -0.09rem;
		font-size: 0.12rem;
		font-family: Magistral-Medium;
	}

	.caseopen_footer .f_list_cx p span {
		color: #FFC726;
		font-weight: bold;
		font-family: Magistral-Medium;
	}

	.caseopen_footer .f_list_rx {
		width: 0.73rem;
		height: 0.22rem;
		border: 1px solid #35E7FF;
		border-radius: 0.12rem;
		position: relative;
		left: 2.28rem;
		top: -.485rem;
		pointer-events: none;
	}

	.caseopen_footer .f_list_rx p {
		font-size: 0.12rem;
		text-align: center;
		line-height: -30%;
		font-family: Magistral-Medium;
		color: #fff;
		padding-top: 0.03rem;
		pointer-events: none;
	}
</style>
