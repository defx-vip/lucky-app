<template>
  <div class="earn">
    <ul>
      <li>
        <div class="left">
          <div class="img-box" ></div>
          <img src="../../assets/nftClub/jing.png" />
        </div>
        <div class="right">
          <h1>{{ $t("MyTeam") }}</h1>
          <router-link :to="{ path: '/myTeam' }" v-music>{{
            $t("eDETAILS")
          }}</router-link>
        </div>
      </li>

      <li>
        <div class="left">
          <div class="img-box"></div>
          <img src="../../../static/image/Play-while-earning-BG1.png" />
        </div>
        <div class="right">
          <h1>{{ $t("eNFTCLUB") }}</h1>
          <!-- <a @click.stop="$parent.$refs['pop'].pop = true" v-music>DETAILS</a> -->
          <!-- <router-link :to="{path:'/receive',query:{change:'rare'}}" v-music>{{$t('eDETAILS')}}</router-link> -->
          <router-link
            :to="{ path: '/myPledge', query: { change: 'rare' } }"
            v-music
            >{{ $t("eDETAILS") }}</router-link
          >
        </div>
      </li>

      <li>
        <div class="left">
          <div class="img-box"></div>
          <img src="../../../static/image/Member-Dividend-BG2.png" />
        </div>
        <div class="right">
          <h1 style="margin-left: -0.15rem">{{ $t("eLUCKYMENBER") }}</h1>
          <!--<a v-if="$store.state.environment=='production'" @click.stop="$parent.$refs['pop'].pop=true" v-music>DETAILS</a>-->
          <router-link to="/member">{{ $t("eDETAILS") }}</router-link>
        </div>
      </li>
      <li>
        <div class="left">
          <div class="img-box"></div>
          <img src="../../../static/image/Member-Dividend-BG1.png" />
        </div>
        <div class="right">
          <h1>{{ $t("eLuckyFarm") }}</h1>
          <!--<a v-if="$store.state.environment=='production'" @click.stop="$parent.$refs['pop'].pop=true" v-music>DETAILS</a>-->
          <router-link :to="{ path: '/lp', query: { unit: 'LMG' } }" v-music>{{
            $t("eDETAILS")
          }}</router-link>
        </div>
      </li>
      <li>
        <div class="left">
          <div class="img-box"></div>
          <img src="../../../static/image/LP-pledge-mining-BG1.png" />
        </div>
        <div class="right">
          <h1>{{ $t("ePLAYTOEARN") }}</h1>
          <a @click.stop="$parent.$refs['pop'].pop = true" v-music>{{
            $t("eDETAILS")
          }}</a>
          <!--<router-link to="/earnplay" v-else>{{$t('eDETAILS')}}</router-link>-->
          <!--<a @click.stop="$parent.$refs['pop'].pop=true" v-music>DETAILS</a>-->
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import web3tools from "../../web3/web3tools";
let that;
export default {
  data() {
    return {
      Earntime: "",
      Earnimg: require("../../../static/image/Earn/1_00000.png"),
      Earnimglist: [
        // {
        //   src: require("../../../static/image/Earn/1_00000.png")
        // },
        // {
        //   src: require("../../../static/image/Earn/1_00001.png")
        // },
        // {
        //   src: require("../../../static/image/Earn/1_00002.png")
        // },
        // {
        //   src: require("../../../static/image/Earn/1_00003.png")
        // },
        // {
        //   src: require("../../../static/image/Earn/1_00004.png")
        // },
        {
          src: require("../../../static/image/Earn/1_00005.png"),
        },
        {
          src: require("../../../static/image/Earn/1_00006.png"),
        },
        {
          src: require("../../../static/image/Earn/1_00007.png"),
        },
        {
          src: require("../../../static/image/Earn/1_00008.png"),
        },
        {
          src: require("../../../static/image/Earn/1_00009.png"),
        },
        {
          src: require("../../../static/image/Earn/1_00010.png"),
        },
        {
          src: require("../../../static/image/Earn/1_00011.png"),
        },
        {
          src: require("../../../static/image/Earn/1_00012.png"),
        },
        {
          src: require("../../../static/image/Earn/1_00013.png"),
        },
        {
          src: require("../../../static/image/Earn/1_00014.png"),
        },
        {
          src: require("../../../static/image/Earn/1_00015.png"),
        },
        {
          src: require("../../../static/image/Earn/1_00016.png"),
        },
        {
          src: require("../../../static/image/Earn/1_00017.png"),
        },
        {
          src: require("../../../static/image/Earn/1_00018.png"),
        },
        {
          src: require("../../../static/image/Earn/1_00019.png"),
        },
        {
          src: require("../../../static/image/Earn/1_00020.png"),
        },
        {
          src: require("../../../static/image/Earn/1_00021.png"),
        },
        {
          src: require("../../../static/image/Earn/1_00022.png"),
        },
        {
          src: require("../../../static/image/Earn/1_00023.png"),
        },
        {
          src: require("../../../static/image/Earn/1_00024.png"),
        },
        {
          src: require("../../../static/image/Earn/1_00025.png"),
        },
      ],
    };
  },
  mounted() {
    console.log(process.env.NODE_ENV);
    this.Earntran();
  },
  beforeDestroy() {
    // clearInterval(this.Earntime);
  },
  destroyed() {
    // clearInterval(this.Earntime);
  },
  methods: {
    Earntran() {
      // let that = this;
      // let i = 0;
      // this.Earntime = setInterval(function() {
      //   i++;
      //   that.Earnimg = that.Earnimglist[i].src;
      //   if (i >= that.Earnimglist.length - 1) {
      //     i = 0;
      //   }
      // },50);
    },
  },
};
</script>

<style scoped>

@keyframes gif {
  0% {
    background-image: url("../../../static/image/Earn/1_00000.png");
  }
  5% {
    background-image: url("../../../static/image/Earn/1_00001.png");
  }
  10% {
    background-image: url("../../../static/image/Earn/1_00002.png");
  }
  15% {
    background-image: url("../../../static/image/Earn/1_00003.png");
  }
  20% {
    background-image: url("../../../static/image/Earn/1_00004.png");
  }
  25% {
    background-image: url("../../../static/image/Earn/1_00005.png");
  }
  30% {
    background-image: url("../../../static/image/Earn/1_00006.png");
  }
  35% {
    background-image: url("../../../static/image/Earn/1_00007.png");
  }
  40% {
    background-image: url("../../../static/image/Earn/1_00008.png");
  }
  45% {
    background-image: url("../../../static/image/Earn/1_00009.png");
  }
  50% {
    background-image: url("../../../static/image/Earn/1_00010.png");
  }
  55% {
    background-image: url("../../../static/image/Earn/1_00011.png");
  }
  58% {
    background-image: url("../../../static/image/Earn/1_00012.png");
  }
  61% {
    background-image: url("../../../static/image/Earn/1_00013.png");
  }
  65% {
    background-image: url("../../../static/image/Earn/1_00014.png");
  }

  68% {
    background-image: url("../../../static/image/Earn/1_00015.png");
  }
  71% {
    background-image: url("../../../static/image/Earn/1_00016.png");
  }
  75% {
    background-image: url("../../../static/image/Earn/1_00017.png");
  }
  78% {
    background-image: url("../../../static/image/Earn/1_00018.png");
  }
  81% {
    background-image: url("../../../static/image/Earn/1_00019.png");
  }
  84% {
    background-image: url("../../../static/image/Earn/1_00020.png");
  }
  87% {
    background-image: url("../../../static/image/Earn/1_00021.png");
  }
  90% {
    background-image: url("../../../static/image/Earn/1_00022.png");
  }
  93% {
    background-image: url("../../../static/image/Earn/1_00023.png");
  }
  96% {
    background-image: url("../../../static/image/Earn/1_00024.png");
  }
  100% {
    background-image: url("../../../static/image/Earn/1_00025.png");
  }
}
.img-box {
  height: 160px;
   /* background: url("../../../static/image/Earn/1_00000.png"); */
  background-repeat: no-repeat;
  background-size: 100% 100%;
  /* -webkit-animation: gif 1s infinite;
  -moz-animation: gif 1s infinite;
  -o-animation: gif 1s infinite;
  -ms-animation: gif 1s infinite;
  animation: gif 1s infinite; */
  position: absolute;
  top: -0.21rem;
  /* -webkit-transform: scale(2.5);
  -moz-transform: scale(2.5);
  -o-transform: scale(2.5);
  -ms-transform: scale(2.5);
  transform: scale(2.5); */
  left: 0.11rem;
  width: 100%;
 transform: scale(2.5);
}

.earn {
  width: 100%;
  margin-bottom: 0.93rem;
  float: left;
}

.earn ul {
  margin: 0 0.145rem 0 0.19rem;
}

.earn ul > li {
  background-image: url(../../../static/image/Play-while-earning-BG2.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  display: flex;
  margin-top: 0.3033rem;
  width: 100%;
  height: 1.73rem;
  justify-content: space-between;
}

.earn ul > li .left {
  position: relative;
  width: 1.46rem;
  height: 1.92rem;
  margin-top: -0.1033rem;
  margin-left: 0.0433rem;
  flex-shrink: 0;
}

.earn ul > li .left img:nth-child(2) {
  width: 100%;
  position: absolute;
  bottom: 0;
}

.earn ul > li .left img:nth-child(1) {
  position: absolute;
  top: -0.21rem;
  transform: scale(2.5);
  left: 0.11rem;
  width: 100%;
}
/*.earn ul>li .noload {
		float: right;
		margin-top: .8rem;
		margin-right: .7rem;
	}

	.earn ul>li .title {
		margin: .16rem 0 .12rem .26rem;
		height: .135rem;
	}

	.earn ul>li .fenge {
		display: block;
		margin: 0 auto;
	}*/

.earn ul > li .right {
  margin-left: -0.1rem;
}

.earn ul > li .right h1 {
  margin-top: 0.52rem;
  font-size: 0.2rem;
  color: #ffffff;
  font-family: Magistral-Medium;
  text-align: right;
  margin-right: 0.22rem;
  white-space: nowrap;
  position: relative;
  text-transform: uppercase;
}

.earn ul > li .right a {
  background-image: url(../../../static/image/DetailsButton.png);
  background-repeat: no-repeat;
  background-size: 100% 110%;
  background-position: top;
  width: 1.29rem;
  height: 0.28rem;
  font-size: 0.12rem;
  font-family: Magistral-Medium;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.19rem;
  float: right;
  margin-top: 0.14rem;
  position: relative;
  z-index: 1;
}
/*.earn ul>li .right .Detail {
		width: 1.2rem;
		margin-top: .195rem;
		margin-right: .125rem;
		display: block;
		float: right;
	}*/

/*.earn ul>li .right p {
		font-size: .12rem;
		margin-top: .18rem;
		text-align: right;
		color: #ffffff;
		margin-right: .15rem;
		float: right;
		width: 100%;
		font-family: Magistral-Medium;
	}

	.earn ul>li .right div {
		margin-top: .05rem;
		margin-bottom: .12rem;
		border-radius: .0467rem;
		border: 1px solid #35E7FF;
		margin-right: .15rem;
		float: right;
		display: flex;
		align-items: center;
		height: .2067rem;
	}

	.earn ul>li .right div img {
		width: .2933rem;
		height: .2933rem;
		display: block;
		margin-left: -.12rem;
	}

	.earn ul>li .right div span {
		color: #ffffff;
		margin-right: .06rem;
		font-size: .12rem;
		margin-left: .0533rem;
		max-width: .8rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-family: Magistral-Medium;
	}

	.earn ul>li .right div button {
		font-size: .12rem;
		font-weight: bold;
		font-family: Magistral-Bold;
		width: .64rem;
		height: .2067rem;
		background: linear-gradient(#FFFC00, #DB7100);
		border-radius: .0467rem;
	}

	.earn ul>li .right h6 {
		float: right;
		color: #01DFDD;
		font-size: .12rem;
		margin-right: .14rem;
		font-family: Magistral-Medium;
		margin-top: .1rem;
		margin-bottom: .02rem;
	}

	.earn ul>li .right h6 span {
		color: #FFFFFF;
	}

	.earn ul>li .right ol {
		float: right;
		height: .0933rem;
		border-radius: .045rem;
		border: 1px solid #35E7FF;
		width: 89%;
		margin-right: .1267rem;
	}

	.earn ul>li .right ol li {
		height: .0933rem;
		border-radius: .045rem;
		background: linear-gradient(#F2F047, #1ED94F);
		width: 20%;
	}

	.earn ul>li:nth-child(3) .right h1 {
		margin-top: .26rem;
	}

	.earn ul>li:nth-child(3) .right p {
		margin-top: .1rem;
	}*/
/*.earn ul>.loadin a {
		float: right;
	}

	.earn ul>.loadin a>.Detail {
		float: right;
		margin-top: .13rem;
		margin-right: .13rem;
		width: 1.2rem;
	}

	.earn ul>.loadin .right h1 {
		text-align: right;
		color: #ffffff;
		font-size: .12rem;
		font-weight: bold;
		margin-top: .135rem;
		margin-right: .15rem;
	}

	.earn ul>.loadin .right ol {
		float: right;
		width: 45%;
		margin-right: .16rem;
		height: .06rem;
		background: #490D71;
		border-radius: .05rem;
		margin-top: .045rem;
		padding: .02rem .03rem;
	}

	.earn ul>.loadin .right ol li {
		width: 90%;
		height: 100%;
		background: #CFA30B;
		border-radius: .03rem;
	}*/
</style>
