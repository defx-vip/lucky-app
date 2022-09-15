<template>
  <div class="openranking">
    <div class="ork_top">
      <div class="ork_top_left">
        <p><img src="../../../static/image/Ranking.png" alt="" /></p>
      </div>
      <div class="ork_top_right">
        <h1>{{ $t("fLeaderboard") }}</h1>
        <h6 v-html="$t('fTOP10RANKING')"></h6>
      </div>
    </div>

    <div class="rk_Cnr">
      <div class="rankTitle">
        <div :class="statusRank == 1 ? 'rankChang' : ''" @click="rankFn(1)">
         {{  $t("TodayRanking") }}
        </div>
        <div :class="statusRank == 7 ? 'rankChang' : ''" @click="rankFn(7)">
             {{  $t("dayRanking") }}
        </div>
        <div :class="statusRank == 30 ? 'rankChang' : ''" @click="rankFn(30)">
           {{  $t("thirtyDayRanking") }}
        </div>
      </div>

      <div class="rk_Cnr_t">
        <ul class="rk_Cnr_list">
          <li class="rk_Cnr_list_o">{{ $t("fRANKING") }}</li>
          <li class="rk_Cnr_list_t">{{ $t("fWALLETADDRESS") }}</li>
          <li class="rk_Cnr_list_s">{{ $t("mQUANTITY") }}</li>
        </ul>
      </div>
      <div class="rk_Cnr_b" 
	      v-infinite-scroll="query"
          infinite-scroll-disabled="true"
          infinite-scroll-distance="10">
        <ul class="rk_Cnr_b_list">
          <li v-for="(item, index) in list" :key="index">
            <div :class="index == 0 ? 'rk_Cnr_b_list_l' : 'rk_Cnr_b_list_lx'">
              <p>
                <img src="../../../static/image/8000.png" />
                <span>{{ index + 1 }}</span>
              </p>
            </div>
            <div class="rk_Cnr_b_list_c">
              <p>{{interceptFn(item.wallet_address)  }}</p>
              <!-- <p>{{item.walletAddress.substring(0,12)}}......{{item.walletAddress.substring(((item.walletAddress.length)-5),item.walletAddress.length)}}</p> -->
            </div>
            <div class="rk_Cnr_b_list_r">
              <!-- <p>{{item.reward}} {{$t('LMG')}}</p> -->
              <p>{{ item.payType }} {{ $t("LMG") }}</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="rk_Cnr_bom">
        <!--<p class="rk_Cnr_bom_t"><span>RECEIVE REWARDS</span></p>-->
        <p class="rk_Cnr_bom_c">{{ $t("fLeaderboardDescription") }}</p>
        <p class="rk_Cnr_bom_b">
          {{ $t("fOnlyTop10playerslistedonLeaderboardareeligbleforreward") }}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [],
      statusRank: 1,
      parms: {
        pageNum: 1,
        pageSize: 10,
        payType: "lmt", // 类型
        range: 1, //  1 7 30
		nextboolStatus:false,
      },
    };
  },
  mounted() {
  },
  methods: {
	 interceptFn(str) {
      if (!str) {
        return "";
      }
      var fisrt = str.substring(0, 5);
      var last = str.substring(str.length - 5, str.length);
      return fisrt + "......." + last;
    },
    rankFn(type) {
      this.statusRank = type;
      this.parms.range = type;
      this.query();
    },
    query() {
		this.list = []
      if (this.nextboolStatus == true) {
        return false;
      }
      this.nextboolStatus = true;
      this.$post(this.$apiUtil.getrankinglist, this.parms).then((res) => {
        if (res) {
          for (let i = 0; i < res.data.length; i++) {
            this.list.push(res.data[i]);
          }
          this.parms.pageNum = this.parms.pageNum + 1;
          this.nextboolStatus = false;
        }
      });
    },
  },
};
</script>
<style scoped>
.rankTitle {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
  color: #ffffff;
}
.rankTitle div {
  text-align: center;
  width: 90px;
  padding: 5px 5px !important;
   font-size: 14px;
   border: 1px solid #FFFFFF ;
   border-radius: 30px;
   margin: 0 7px;
}
.rankChang {
	margin: 0 7px;
	width: 90px;
	padding: 5px 5px !important;
  /* width: 80px; */
  /* height: 30px; */
  /* line-height: 30px; */
  background: #f2c900;
  border: 1px solid #ffffff;
  border-radius:30px;
  color: black;
  font-size: 14px;
}
.openranking {
  margin-bottom: 1rem;
}

.openranking .ork_top {
  background: url("../../../static/image/LEADERBOOARD_BG.png") no-repeat;
  background-size: 100%;
  width: 92%;
  margin-left: 0.11rem;
  margin-top: 0.22rem;
  height: 1.7rem;
}
.ork_top .ork_top_left {
  position: relative;
  top: 0.61rem;
  left: 0.35rem;
  width: 30%;
}

.ork_top .ork_top_left p img {
  width: 100%;
  height: 100%;
}

.ork_top .ork_top_right {
  position: relative;
  top: -1rem;
  left: -12%;
  text-align: right;
}

.ork_top .ork_top_right h1 {
  font-size: 0.28rem;
  background-image: -webkit-linear-gradient(#ffc726 30%, #e8641b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  left: 0.12rem;
  top: 0.26rem;
  font-family: Magistral-Medium;
  text-transform: uppercase;
}

.ork_top .ork_top_right h6 {
  color: #fff;
  /* margin-top: 0.11rem; */
  position: relative;
  left: 0.15rem;
  top: 0.3rem;
  font-family: Magistral-Medium;
  font-size: 0.14rem;
}

.openranking .rk_Cnr {
  background: url("../../../static/image/rankingcenter.png") no-repeat;
  background-size: 100% 100%;
  width: 92%;
  height: 100%;
  margin-left: 0.11rem;
  padding-bottom: 1.5rem;
}

.openranking rk_Cnr_t {
  /* display: flex;
       justify-content: space-between;
       align-items: center; */
}

.rk_Cnr_t .rk_Cnr_list li {
  float: left;
  font-family: Magistral-Medium;
  color: #fff;
}

.rk_Cnr_t .rk_Cnr_list_o {
  position: relative;
  top: 0.37rem;
  left: 0.2rem;
  width: 0.65rem;
}

.rk_Cnr_t .rk_Cnr_list_t {
  position: relative;
  top: 0.37rem;
  left: 0.35rem;
  width: 1.45rem;
  text-align: center;
}

.rk_Cnr_t .rk_Cnr_list_s {
  position: relative;
  top: 0.37rem;
  left: 0.42rem;
  width: 0.75rem;
  text-align: right;
}

.rk_Cnr_b .rk_Cnr_b_list {
  list-style-type: none;
  position: relative;
  top: 0.63rem;
}

.rk_Cnr_b .rk_Cnr_b_list li {
  width: 3.1rem;
  height: 0.38rem;
  margin-top: 0.033rem;
  border: 1px solid #35e7ff;
  border-radius: 0.05rem;
  margin-left: 0.19rem;
  font-family: Magistral-Medium;
  font-size: 0.14rem;
}

.rk_Cnr_b .rk_Cnr_b_list li .rk_Cnr_b_list_l {
  width: 0.53rem;
  height: 0.22rem;
  background: url("../../../static/image/Rounded-Rectangle-2483.png") no-repeat;
  background-size: 100% 100%;
  position: relative;
  left: 0.15rem;
  top: 0.08rem;
}

.rk_Cnr_b .rk_Cnr_b_list li .rk_Cnr_b_list_l p {
  position: relative;
  top: -0.15rem;
  left: 0.05rem;
  font-family: Magistral-Medium;
}

.rk_Cnr_b .rk_Cnr_b_list_l p img {
  width: 30%;
  height: 30%;
  position: relative;
  top: 0.01rem;
  left: 0.02rem;
}

.rk_Cnr_b .rk_Cnr_b_list li .rk_Cnr_b_list_l p span {
  position: relative;
  top: -0.01rem;
  left: 0.08rem;
  font-weight: bold;
}

.rk_Cnr_b .rk_Cnr_b_list li .rk_Cnr_b_list_c {
  width: 1.3rem;
  height: 0.52rem;
  position: relative;
  left: 0.85rem;
  top: -0.1rem;
  color: #fff;
  text-align: center;
}

.rk_Cnr_b .rk_Cnr_b_list li .rk_Cnr_b_list_c p {
  font-size: 0.12rem;
  font-family: Magistral-Medium;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
/* a */

.rk_Cnr_b .rk_Cnr_b_list li .rk_Cnr_b_list_r {
  width: 0.73rem;
  height: 0.22rem;
  position: relative;
  left: 2.27rem;
  top: -0.65rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.16rem;
}

.rk_Cnr_b .rk_Cnr_b_list_r p {
  font-size: 0.16rem;
  color: #fff;
  font-family: Magistral-Medium;
  width: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: center;
}

.rk_Cnr_b .rk_Cnr_b_list li .rk_Cnr_b_list_lx {
  width: 0.53rem;
  height: 0.22rem;
  background: url("../../../static/image/Rounded-Rectangle-2483.png") no-repeat;
  background-size: 100% 100%;
  position: relative;
  left: 0.17rem;
  top: 0.08rem;
}

.rk_Cnr_b .rk_Cnr_b_list li .rk_Cnr_b_list_lx p {
  position: relative;
  top: 0.03rem;
  left: 0.05rem;
  font-family: Magistral-Medium;
}

.rk_Cnr_b .rk_Cnr_b_list_lx p img {
  width: 30%;
  height: 30%;
  position: relative;
  top: 0.01rem;
  left: 0.02rem;
}

.rk_Cnr_b .rk_Cnr_b_list li .rk_Cnr_b_list_lx p span {
  position: relative;
  top: -0.01rem;
  left: 0.05rem;
  font-weight: bold;
}

.rk_Cnr_bom {
  width: 92%;
  position: relative;
  top: 1rem;
  left: 0.11rem;
  /* display: flex; */
}

.rk_Cnr_bom .rk_Cnr_bom_t {
  width: 2.24rem;
  height: 0.34rem;
  display: inline-block;
  display: flex;
  align-items: center;
  padding-left: 0.28rem;
  position: relative;
  left: 12%;
  background: url("../../../static/image/RECEIVEAWARD.png") no-repeat;
  background-size: 100% 100%;
  font-family: Magistral-Bold;
  font-size: 0.17rem;
}

.rk_Cnr_bom .rk_Cnr_bom_t span {
  padding-left: 0.12rem;
}

.rk_Cnr_bom .rk_Cnr_bom_c {
  width: 2.24rem;
  height: 0.34rem;
  display: inline-block;
  display: flex;
  align-items: center;
  padding-left: 0.28rem;
  position: relative;
  left: 5%;
  top: 0.1rem;
  color: #fff;
  font-family: Magistral-Bold;
  font-size: 0.14rem;
}

.rk_Cnr_bom .rk_Cnr_bom_b {
  width: 82%;
  height: 0.34rem;
  top: 0.12rem;
  display: inline-block;
  display: flex;
  align-items: center;
  padding-left: 0.28rem;
  position: relative;
  left: 5%;
  color: #fff;
  font-family: Magistral-Medium;
  font-size: 0.12rem;
}
</style>