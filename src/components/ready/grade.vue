<template>
	<div class="grade">
		<div class="trophytop">
			<div class="trophytop_left">
				<p><img src="../../../static/image/level.png" alt=""></p>
			</div>
			<div class="trophytop_right">
				<h1>{{$t('eLEVEL')}}</h1>
				<h6 v-html="$t('fVIEWYOURLEVELINFORMATION')"></h6>
			</div>
		</div>
		<div class="caseopen_footer">
			<div class="cp_f_t">
				<ul class="cp_f_t_list">
					<li class="cp_f_t_list_o">{{$t('eLEVEL')}}</li>
					<li class="cp_f_t_list_t">{{$t('fREWARD')}}</li>
					<li class="cp_f_t_list_s">{{$t('fOPERATE')}}</li>
				</ul>
			</div>
			<div class="cp_f_f">
				<ul class="cp_f_f_list">
					<li v-for="(item, index) in grade" :key="index">
						<div :class="index==0?'f_list_l':'f_list_lx'">
							<p>
								<img src="../../../static/image/8000.png" />
								<span>{{item.level}}</span>
							</p>
						</div>
						<div :class="index==0?'f_list_c':'f_list_cx'">
							<p> <img src="../../../static/image/Golden_Map.png" alt="">&nbsp;&nbsp; 10 &nbsp;{{$t('LMG')}}</p>
						</div>
						<div :class="item.awardState!=1?'f_list_r':'f_list_rx'" @click.stop="receive(item.id)" v-movedown v-music>
							<p>{{$t('fRECEIVE')}}</p>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				grade: [],
			}
		},
		mounted() {
			this.gardeto()
		},
		methods: {
			gardeto() {
				this.$post(this.$apiUtil.levels, {
					playerId: this.$cookies.get('playerId'),
					walletAddress: this.$cookies.get('walletAddress')
				}).then((res) => {
					this.grade = res.data
				})
			},
			receive(id) {
				console.log(111111111)
				this.$post(this.$apiUtil.levelLogReward, {
					logId: id,
					playerId: this.$cookies.get('playerId'),
					walletAddress: this.$cookies.get('walletAddress')
				}).then((res) => {
					this.gardeto();
					this.$toast("Receive successfully");
				})
			},
		},
	}
</script>
<style scoped>
	.grade {
		width: 92%;
		margin-left: 0.11rem;
		margin-top: 0.22rem;
		margin-bottom: 1rem;
	}

	.trophytop {
		background: url("../../../static/image/LEADERBOOARD_BG.png") no-repeat;
		background-size: 100%;
		width: 100%;
	}

	.trophytop_left {
		position: relative;
		top: 0.31rem;
		left: 0.35rem;
		width: 30%;
	}

	.trophytop_left p img {
		width: 100%;
		height: 100%;
	}

	.trophytop_right {
		position: relative;
		top: -1.0rem;
		left: -12%;
		text-align: right;
	}

	.trophytop_right h1 {
		font-size: 0.28rem;
		background-image: -webkit-linear-gradient(#FFC726 30%, #E8641B);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		position: relative;
		left: -0.08rem;
		font-family: Magistral-Medium;
	}

	.trophytop_right h6 {
		color: #fff;
		/* margin-top: 0.11rem; */
		position: relative;
		left: -0.08rem;
		top: 0.15rem;
		font-family: Magistral-Medium;
		font-size: 0.14rem;
	}

	.caseopen_footer {
		width: 3.51rem;
		/*height: 5.52rem;*/
		background: url('../../../static/image/timed3BG.png') no-repeat;
		background-size: 100%;
		margin-top: -.25rem;

	}

	.grade .cp_f_t {
		list-style: none;
		height: .6rem;
	}

	.caseopen_footer .cp_f_t li {
		float: left;
		padding-left: 0.45rem;
		margin-top: .376rem;
		color: #fff;
		font-family: Magistral-Medium;
		text-transform:uppercase;
	}

	.caseopen_footer .cp_f_t_list_o {
		position: relative;
    	left: -0.23rem;
    	width: 0.7rem;
	}

	.caseopen_footer .cp_f_t_list_t {
		position: relative;
    	left: -0.1rem;
    	padding: 0 !important;
    	width: 1.3rem;
    	text-align: center;
	}

	.caseopen_footer .cp_f_t_list_s {
		position: relative;
		/* left: -.2rem; */
		padding: 0 !important;
    	width: 0.7rem;
    	text-align: right;
	}

	.cp_f_f_list {
		list-style-type: none;
		position: relative;
		top: 0;
		padding-bottom: .46rem;
	}

	.cp_f_f_list li {
		width: 3.1rem;
		height: 0.47rem;
		margin-top: 0.033rem;
		border: 1px solid #35E7FF;
		border-radius: 3%;
		margin-left: 0.19rem;
		font-family: Magistral-Medium;
	}

	.cp_f_f_list li .f_list_l {
		width: 0.53rem;
		height: 0.22rem;
		background: url('../../../static/image/Rounded-Rectangle-2483.png') no-repeat;
		background-size: 100% 100%;
		position: relative;
		left: .17rem;
		top: .13rem;
	}

	.cp_f_f_list li .f_list_l p {
		position: relative;
		top: 0.02rem;
		left: 0.05rem;
		font-family: Magistral-Medium;
	}

	.cp_f_f_list li .f_list_l p img {
		width: 30%;
		height: 30%;
		position: relative;
		top: 0.01rem;
		left: 0.02rem;
	}

	.cp_f_f_list li .f_list_l p span {
		position: relative;
		top: -.01rem;
		left: 0.10rem;
		font-weight: bold;
	}

	.cp_f_f_list li .f_list_c {
		width: 1.3rem;
		height: 0.52rem;
		position: relative;
		left: 0.93rem;
		top: -0.15rem;
		color: #fff;
	}

	.cp_f_f_list li .f_list_c p {
		position: relative;
		padding-left: 0.16rem;
		font-size: 0.12rem;
		font-family: Magistral-Medium;
	}

	.cp_f_f_list li .f_list_c p img {
		position: relative;
		top: 0.05rem;
		width: 16%;
		height: 16%;
	}

	.cp_f_f_list li .f_list_r {
		width: 0.73rem;
		height: 0.22rem;
		background: url('../../../static/image/RECHARGE.png') no-repeat;
		background-size: 100%;
		position: relative;
		left: 2.25rem;
		top: -.60rem;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: .11rem;
	}

	.cp_f_f_list li .f_list_r p {
		font-size: 0.12rem;
		font-family: Magistral-Medium;
	}

	.cp_f_f_list li .f_list_lx {
		width: 0.53rem;
		height: 0.22rem;
		background: url('../../../static/image/Rounded-Rectangle-2483.png') no-repeat;
		background-size: 100% 100%;
		position: relative;
		left: .17rem;
		top: .13rem;
	}

	.cp_f_f_list li .f_list_lx p {
		padding-left: 0.05rem;
		padding-top: 0.01rem;
		font-family: Magistral-Medium;
	}

	.cp_f_f_list li .f_list_lx p img {
		width: 30%;
		height: 30%;
		position: relative;
		top: 0.02rem;
		left: 0.02rem;
	}

	.cp_f_f_list li .f_list_lx p span {
		position: relative;
		top: .01rem;
		left: 0.10rem;
		font-weight: bold;
	}

	.cp_f_f_list li .f_list_cx {
		width: 1.3rem;
		height: 0.52rem;
		position: relative;
		left: 0.99rem;
		top: -0.19rem;
		color: #fff;
	}

	.cp_f_f_list li .f_list_cx p {
		font-size: 0.12rem;
		position: relative;
		top: .04rem;
		left: 0.095rem;
		font-family: Magistral-Medium;
	}

	.cp_f_f_list li .f_list_cx p img {
		position: relative;
		top: 0.05rem;
		width: 16%;
		height: 16%;
	}

	.cp_f_f_list li .f_list_rx {
		width: 0.73rem;
		height: 0.22rem;
		position: relative;
		left: 2.25rem;
		top: -.64rem;
		border: 1px solid #35E7FF;
		border-radius: 0.12rem;
		display: flex;
		justify-content: center;
		align-items: center;
		pointer-events: none;
	}

	.cp_f_f_list li .f_list_rx p {
		font-size: 0.12rem;
		font-family: Magistral-Medium;
		color: #fff;
		pointer-events: none;
	}
</style>
