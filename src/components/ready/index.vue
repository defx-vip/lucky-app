<template>
	<div class="ready">
		<top></top>
		<div class="banner">
			<router-link to="./caseopen" v-music>
				<div class="banner_left">
					<img :src="chestimg" alt="">
				</div>
				<ul class="banner_right">
					<li class="b_r_listo">{{$t('fTIME')}}</li>
					<li class="b_r_listt">{{$t('fTREASURECHEST')}}</li>
					<li class="b_r_lists" v-html="$t('fOPENTREASURECHESTSTOGETTIMEDREWARD')"></li>
				</ul>
			</router-link>
		</div>
		<div class="imgto">
			<div class="imgto_left">
				<ul class="img_l_list">
					<li class="img_lit_li">{{$t('eLEVEL')}}</li>
					<li class="img_lit_liw" v-html="$t('fVIEWYOURLEVELINFORMATION')"></li>
					<li class="img_lit_liq"><img :src="levelimg" alt=""></li>
					<li class="img_lit_lie" @click="$router.push('/grade')" v-movedown v-music>{{$t('fCLICKHERE')}}</li>
				</ul>
			</div>
			<div class="imgto_right">
				<div class="im_r_t">
					<p class="im_r_t_o">{{$t('fSIGNIN')}}</p>
					<p class="im_r_t_t" v-html="$t('fSIGNINTOGETGIFTS')"></p>
					<p class="im_r_t_s" @click="$router.push('/calendar')" v-movedown v-music>{{$t('fCLICKHERE')}}</p>
					<p><img :src="signimg" alt=""></p>
				</div>
				<div class="im_r_b">
					<p class="im_r_b_o">{{$t('fLEADERBOARD')}}</p>
					<p class="im_r_b_t" @click="$router.push('/ranking')" v-movedown v-music>{{$t('fCLICKHERE')}}</p>
					<!--<p class="im_r_b_t" @click="$parent.$refs['pop'].pop=true">CLICK HERE</p>-->
					<img :src="rankingimg" alt="">
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import top from '../public/top'
	export default {
		name: 'ready',
		components: {
			top
		},
		data() {
			return {
				signtime:'',
				signimg:require('../../../static/image/Readysign/3_00000.png'),
				signimglist: [{
						src: require('../../../static/image/Readysign/3_00000.png')
					},
					{
						src: require('../../../static/image/Readysign/3_00001.png')
					},
					{
						src: require('../../../static/image/Readysign/3_00002.png')
					},
					{
						src: require('../../../static/image/Readysign/3_00003.png')
					},
					{
						src: require('../../../static/image/Readysign/3_00004.png')
					},
					{
						src: require('../../../static/image/Readysign/3_00005.png')
					},
					{
						src: require('../../../static/image/Readysign/3_00006.png')
					},
					{
						src: require('../../../static/image/Readysign/3_00007.png')
					},
					{
						src: require('../../../static/image/Readysign/3_00008.png')
					},
					{
						src: require('../../../static/image/Readysign/3_00009.png')
					},
					{
						src: require('../../../static/image/Readysign/3_00010.png')
					},
					{
						src: require('../../../static/image/Readysign/3_00011.png')
					},
					{
						src: require('../../../static/image/Readysign/3_00012.png')
					},
					{
						src: require('../../../static/image/Readysign/3_00013.png')
					},
					{
						src: require('../../../static/image/Readysign/3_00014.png')
					},
					{
						src: require('../../../static/image/Readysign/3_00015.png')
					},
					{
						src: require('../../../static/image/Readysign/3_00016.png')
					},
					{
						src: require('../../../static/image/Readysign/3_00017.png')
					},
					{
						src: require('../../../static/image/Readysign/3_00018.png')
					},
					{
						src: require('../../../static/image/Readysign/3_00019.png')
					},
					{
						src: require('../../../static/image/Readysign/3_00020.png')
					},
					{
						src: require('../../../static/image/Readysign/3_00021.png')
					},
					{
						src: require('../../../static/image/Readysign/3_00022.png')
					},
					{
						src: require('../../../static/image/Readysign/3_00023.png')
					},
					{
						src: require('../../../static/image/Readysign/3_00024.png')
					}
				],
				rankingtime:'',
				rankingimg:require('../../../static/image/Readyranking/4_00000.png'),
				rankingimglist: [{
						src: require('../../../static/image/Readyranking/4_00000.png')
					},
					{
						src: require('../../../static/image/Readyranking/4_00001.png')
					},
					{
						src: require('../../../static/image/Readyranking/4_00002.png')
					},
					{
						src: require('../../../static/image/Readyranking/4_00003.png')
					},
					{
						src: require('../../../static/image/Readyranking/4_00004.png')
					},
					{
						src: require('../../../static/image/Readyranking/4_00005.png')
					},
					{
						src: require('../../../static/image/Readyranking/4_00006.png')
					},
					{
						src: require('../../../static/image/Readyranking/4_00007.png')
					},
					{
						src: require('../../../static/image/Readyranking/4_00008.png')
					},
					{
						src: require('../../../static/image/Readyranking/4_00009.png')
					},
					{
						src: require('../../../static/image/Readyranking/4_00010.png')
					},
					{
						src: require('../../../static/image/Readyranking/4_00011.png')
					},
					{
						src: require('../../../static/image/Readyranking/4_00012.png')
					},
					{
						src: require('../../../static/image/Readyranking/4_00013.png')
					},
					{
						src: require('../../../static/image/Readyranking/4_00014.png')
					},
					{
						src: require('../../../static/image/Readyranking/4_00015.png')
					},
					{
						src: require('../../../static/image/Readyranking/4_00016.png')
					},
					{
						src: require('../../../static/image/Readyranking/4_00017.png')
					},
					{
						src: require('../../../static/image/Readyranking/4_00018.png')
					},
					{
						src: require('../../../static/image/Readyranking/4_00019.png')
					},
					{
						src: require('../../../static/image/Readyranking/4_00020.png')
					},
					{
						src: require('../../../static/image/Readyranking/4_00021.png')
					},
					{
						src: require('../../../static/image/Readyranking/4_00022.png')
					},
					{
						src: require('../../../static/image/Readyranking/4_00023.png')
					},
					{
						src: require('../../../static/image/Readyranking/4_00024.png')
					}
				],
				leveltime:'',
				levelimg:require('../../../static/image/Readylevel/2_00000.png'),
				levelimglist: [{
						src: require('../../../static/image/Readylevel/2_00000.png')
					},
					{
						src: require('../../../static/image/Readylevel/2_00001.png')
					},
					{
						src: require('../../../static/image/Readylevel/2_00002.png')
					},
					{
						src: require('../../../static/image/Readylevel/2_00003.png')
					},
					{
						src: require('../../../static/image/Readylevel/2_00004.png')
					},
					{
						src: require('../../../static/image/Readylevel/2_00005.png')
					},
					{
						src: require('../../../static/image/Readylevel/2_00006.png')
					},
					{
						src: require('../../../static/image/Readylevel/2_00007.png')
					},
					{
						src: require('../../../static/image/Readylevel/2_00008.png')
					},
					{
						src: require('../../../static/image/Readylevel/2_00009.png')
					},
					{
						src: require('../../../static/image/Readylevel/2_00010.png')
					},
					{
						src: require('../../../static/image/Readylevel/2_00011.png')
					},
					{
						src: require('../../../static/image/Readylevel/2_00012.png')
					},
					{
						src: require('../../../static/image/Readylevel/2_00013.png')
					},
					{
						src: require('../../../static/image/Readylevel/2_00014.png')
					},
					{
						src: require('../../../static/image/Readylevel/2_00015.png')
					},
					{
						src: require('../../../static/image/Readylevel/2_00016.png')
					},
					{
						src: require('../../../static/image/Readylevel/2_00017.png')
					},
					{
						src: require('../../../static/image/Readylevel/2_00018.png')
					},
					{
						src: require('../../../static/image/Readylevel/2_00019.png')
					},
					{
						src: require('../../../static/image/Readylevel/2_00020.png')
					},
					{
						src: require('../../../static/image/Readylevel/2_00021.png')
					},
					{
						src: require('../../../static/image/Readylevel/2_00022.png')
					},
					{
						src: require('../../../static/image/Readylevel/2_00023.png')
					},
					{
						src: require('../../../static/image/Readylevel/2_00024.png')
					}
				],
				chesttime:'',
				chestimg:require('../../../static/image/Readychest/1_00000.png'),
				chestimglist: [{
						src: require('../../../static/image/Readychest/1_00000.png')
					},
					{
						src: require('../../../static/image/Readychest/1_00001.png')
					},
					{
						src: require('../../../static/image/Readychest/1_00002.png')
					},
					{
						src: require('../../../static/image/Readychest/1_00003.png')
					},
					{
						src: require('../../../static/image/Readychest/1_00004.png')
					},
					{
						src: require('../../../static/image/Readychest/1_00005.png')
					},
					{
						src: require('../../../static/image/Readychest/1_00006.png')
					},
					{
						src: require('../../../static/image/Readychest/1_00007.png')
					},
					{
						src: require('../../../static/image/Readychest/1_00008.png')
					},
					{
						src: require('../../../static/image/Readychest/1_00009.png')
					},
					{
						src: require('../../../static/image/Readychest/1_00010.png')
					},
					{
						src: require('../../../static/image/Readychest/1_00011.png')
					},
					{
						src: require('../../../static/image/Readychest/1_00012.png')
					},
					{
						src: require('../../../static/image/Readychest/1_00013.png')
					},
					{
						src: require('../../../static/image/Readychest/1_00014.png')
					},
					{
						src: require('../../../static/image/Readychest/1_00015.png')
					},
					{
						src: require('../../../static/image/Readychest/1_00016.png')
					},
					{
						src: require('../../../static/image/Readychest/1_00017.png')
					},
					{
						src: require('../../../static/image/Readychest/1_00018.png')
					},
					{
						src: require('../../../static/image/Readychest/1_00019.png')
					},
					{
						src: require('../../../static/image/Readychest/1_00020.png')
					},
					{
						src: require('../../../static/image/Readychest/1_00021.png')
					},
					{
						src: require('../../../static/image/Readychest/1_00022.png')
					},
					{
						src: require('../../../static/image/Readychest/1_00023.png')
					},
					{
						src: require('../../../static/image/Readychest/1_00024.png')
					}
				],
			}
		},
		mounted() {
			this.signtran();
//			this.rankingtran();
//			this.leveltran();
//			this.chesttran();
		},
		beforeDestroy() {
			clearInterval(this.signtime)
//			clearInterval(this.rankingtime)
//			clearInterval(this.leveltime)
//			clearInterval(this.chesttime)
		},
		destroyed() {
			clearInterval(this.signtime)
		},
		methods: {
			signtran(){
				let that=this
				let i=0;
				this.signtime=setInterval(function(){
					i++
					that.signimg=that.signimglist[i].src
					that.rankingimg=that.rankingimglist[i].src
					that.levelimg=that.levelimglist[i].src
					that.chestimg=that.chestimglist[i].src
					if(i>=(that.signimglist.length-1)){
						i=0
					}
				},40)
			},
			rankingtran(){
				let that=this
				let i=0;
				this.rankingtime=setInterval(function(){
					i++
					that.rankingimg=that.rankingimglist[i].src
					if(i>=(that.rankingimglist.length-1)){
						i=0
					}
				},40)
			},
			leveltran(){
				let that=this
				let i=0;
				this.leveltime=setInterval(function(){
					i++
					that.levelimg=that.levelimglist[i].src
					if(i>=(that.levelimglist.length-1)){
						i=0
					}
				},40)
			},
			chesttran(){
				let that=this
				let i=0;
				this.chesttime=setInterval(function(){
					i++
					that.chestimg=that.chestimglist[i].src
					if(i>=(that.chestimglist.length-1)){
						i=0
					}
				},40)
			},
			// Ograde:function(){
			// 	// this.$router.replace('/grade')
			// },
			// Oranking:function(){
			// 	this.$router.replace('/ranking')
			// },
			// Osignin:function(){
			// 	this.$router.replace('/calendar')
			// }
		},
	}
</script>

<style>
	.ready {
		width: 100%;
		float: left;
		margin-bottom: 1.815rem;
	}
	
	.ready .banner {
		width: 92%;
		margin: .36rem auto .49rem;
		height: 1.73rem;
		background: url('../../../static/image/Play-while-earning-BG2.png') no-repeat;
		background-size: 100%;
		display: flex;
		height: 1.73rem;
		justify-content: space-between;
		overflow: hidden;
	}
	
	.ready .banner img {
		display: block;
		width: 1.94rem;
		height: 1.84rem;
		transform: scale(1.7);
	}
	
	.banner .banner_left {
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
		left: 1.45rem;
		top: -1.8rem;
	}
	
	.banner_right .b_r_listo {
		font-size: 0.28rem;
		font-family: Magistral-Medium;
		background-image: -webkit-linear-gradient(#FFC726 30%, #E8641B);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		margin-top: 0.30rem;
		/* background: linear-gradient(180deg, #FFFFFF, #AFAFAF, #FFFFFF);
		-webkit-background-clip: text;
		color: transparent; */
	}
	
	.banner_right .b_r_listt {
		font-size: 0.16rem;
		font-family: Magistral-Medium;
		background: linear-gradient(#55D5FF 30%, #01CBFD);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		margin-top: -0.05rem;
	}
	
	.banner_right .b_r_lists {
		font-size: 0.12rem;
		font-family: Magistral-Book;
		margin-top: .2rem;
		width: 100%;
	}
	
	.ready .imgto {
		float: left;
		width: 100%;
		height: 1.36rem;
	}
	
	.imgto_left {
		font-family: Magistral-Medium;
		height: 2.46rem;
		position: relative;
		position: relative;
		top: -0.35rem;
	}
	
	.imgto .img_l_list {
		width: 38%;
		margin-left: 0.12rem;
		background: url('../../../static/image/level_BG.png') no-repeat;
		background-size: 100% 100%;
		text-align: center;
		height: 100%;
		overflow: hidden;
	}
	
	.imgto .img_lit_li {
		font-size: 0.28rem;
		padding-top: 0.12rem;
		font-family: Magistral-Medium;
		background-image: -webkit-linear-gradient(#FFC726 30%, #E8641B);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.imgto .img_lit_liq {
		display: inline-block;
		margin-top: -0.05rem;
	}
	
	.imgto .img_lit_liq img {
		/*width: 1.08rem;*/
		height: 1.26rem;
		transform: scale(2.8);
	}
	
	.imgto .img_lit_liw {
		color: #fff;
		font-size: 0.12rem;
		font-family: Magistral-Medium;
	}
	
	.imgto .img_lit_lie {
		background: url('../../../static/image/CLICK_HERe.png') no-repeat;
		background-size: 100% 100%;
		width: 60%;
		margin-top: 0.11rem;
		font-size: 0.12rem;
		margin-left: 0.3rem;
		padding-top: 0.03rem;
		font-family: Magistral-Medium;
		position: relative;
		z-index: 1;
	}
	
	.imgto .ready .imgto div {
		width: 92%;
		margin: 0 auto;
	}
	
	.imgto .imgto_right {
		position: relative;
		top: -2.8rem;
		left: 45%;
		width: 50%;
	}
	
	.imgto .imgto_right .im_r_t {
		background: url('../../../static/image/Sign_in_bg.png') no-repeat;
		background-size: 100%;
		width: 100%;
		overflow: hidden;
	}
	
	.imgto .im_r_t_o {
		font-size: 0.28rem;
		padding-top: 0.10rem;
		font-family: Magistral-Medium;
		background-image: -webkit-linear-gradient(#FFC726 30%, #E8641B);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		margin-left: 0.1rem;
	}
	
	.imgto .imgto_right .im_r_t_t {
		font-family: Magistral-Medium;
		color: #fff;
		font-size: 0.12rem;
		text-align: center;
		position: relative;
		left: -0.32rem;
	}
	
	.imgto .imgto_right .im_r_t_s {
		background: url('../../../static/image/CLICK_HERe.png') no-repeat;
		background-size: 100% 100%;
		width: 50%;
		text-align: center;
		margin-top: 0.05rem;
		font-size: 0.12rem;
		margin-left: 0.15rem;
		height: 0.2rem;
		margin-top: 0.02rem;
		font-family: Magistral-Medium;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		z-index: 1;
	}
	
	.imgto .imgto_right p img {
		width: 35%;
		height: 35%;
		position: relative;
		left: 60%;
		top: -0.7rem;
		transform: scale(4);
	}
	
	.imgto .imgto_right .im_r_b {
		background: url('../../../static/image/Ranking_BG.png') no-repeat;
		background-size: 100%;
		width: 100%;
		margin-top: -0.25rem;
		overflow: hidden;
	}
	
	.imgto_right .im_r_b .im_r_b_o {
		font-size: 0.20rem;
		padding-top: 0.05rem;
		font-family: Magistral-Medium;
		background-image: -webkit-linear-gradient(#FFC726 30%, #E8641B);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		text-align: center;
	}
	
	.imgto_right .im_r_b .im_r_b_t {
		background: url('../../../static/image/CLICK_HERe.png') no-repeat;
		background-size: 100% 100%;
		width: 50%;
		text-align: center;
		margin-top: 0.05rem;
		font-size: 0.12rem;
		margin-left: 0.15rem;
		height: 0.2rem;
		margin-top: 0.42rem;
		margin-left: 45%;
		font-family: Magistral-Medium;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		z-index: 1;
	}
	
	.imgto_right .im_r_b img {
		width: 0.81rem;
		height: 0.72rem;
		position: relative;
		top: -0.7rem;
		left: 0.05rem;
		transform: scale(4);
	}
	/* .ready .imgto img:nth-child(1) {
		float: left;
	}
	
	.ready .imgto img:nth-child(2) {
		float: right;
	}
	
	.ready .imgto img:nth-child(3) {
		float: right;
		margin-top: .12rem;
	} */
</style>