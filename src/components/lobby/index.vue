<template>
  <div class="lobby">
    <top ref="tops" @queryLMT="queryLMT"  @queryLMG="queryLMG"></top>
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <img 
            @click="goherf1"
            v-music
            src="../../../static/image/slots1.png"
          />
        </div>
        <div class="swiper-slide">
          <img
            @click="goherf1"
            v-music
            src="../../../static/image/slots2.png"
          />
        </div>
        <div class="swiper-slide">
          <img
            @click="goherf1"
            v-music
            src="../../../static/image/slots3.png"
          />
        </div>
        <div class="swiper-slide">
          <img
            @click="goherf1"
            v-music
            src="../../../static/image/slots4.png"
          />
        </div>
        <div class="swiper-slide">
          <img
            @click="goherf1"
            v-music
            src="../../../static/image/slots5.png"
          />
        </div>
        <div class="swiper-slide">
          <img
            @click="goherf2"
            v-music
            src="../../../static/image/slots6.png"
          />
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
    <div class="lobbyimgto">
      <div class="goimgin">
        <div class="imgin">
          <div @click="goherf1" v-music>
            <center></center>
            <img src="../../../static/image/bigfrtune.png" />
          </div>
          <div @click="goherf2" v-music>
            <center></center>
            <img src="../../../static/image/blackjack2right.png" />
          </div>
          <div @click="goherFn" v-music>
            <center></center>
            <img src="../../assets/nftClub/slots.png" />
          </div>
          <div @click="goherf3" v-music>
            <center></center>
            <img src="../../assets/nftClub/bai.png" />
          </div>
          <div @click="goherf4" v-music>
            <center></center>
            <img src="../../../static/image/Roulette.png" />
          </div>
        </div>
        <div class="imgin imgin2">
          <div @click="goherf2" v-music>
            <center></center>
            <img src="../../../static/image/livev.png" />
          </div>
          <div @click="goherListFn" v-music>
            <center></center>
            <img src="../../../static/image/hash.png" />
          </div>
          <div @click="goherf5" v-music>
            <center></center>
            <img src="../../../static/image/tehax.png" />
          </div>
          <div @click="goherf2" v-music>
            <center></center>
            <img src="../../../static/image/blackjack2.png" />
          </div>
        </div>
      </div>
    </div>
    <!--<signin v-if="sign"></signin>-->
    <!--<turntable v-if="turntablego"></turntable>-->
    <div
      class="mask"
      v-if="
        $store.state.walletAddress == '' ||
          $store.state.walletAddress == undefined
      "
    ></div>
  </div>
</template>

<script>
import web3tools from "../../web3/web3tools";
import Swiper from "swiper";
import "swiper/css/swiper.min.css";
//	import signin from './signin'
//	import turntable from './turntable'
import top from "../public/top";
//	import pop from '../public/pop'
export default {
  name: "lobby",
  components: {
    //			signin,
    //			turntable,
    top
    //			pop
  },
  data() {
    return {
      //				sign: false,
      //				turntablego:true,
      headimg: {
        1: require("../../../static/image/01.png"),
        2: require("../../../static/image/02.png"),
        3: require("../../../static/image/03.png"),
        4: require("../../../static/image/04.png"),
        5: require("../../../static/image/05.png"),
        6: require("../../../static/image/06.png"),
        7: require("../../../static/image/07.png"),
        8: require("../../../static/image/08.png"),
        9: require("../../../static/image/09.png"),
        10: require("../../../static/image/10.png"),
        11: require("../../../static/image/11.png"),
        12: require("../../../static/image/12.png")
      },
      levelStatus:"",
    };
  },
  mounted() {
    this.getlevel1()
    if (
      this.$cookies.get("walletAddress") != "" &&
      this.$cookies.get("walletAddress") != undefined
    ) {
      this.login();
    }
    new Swiper(".swiper-container", {
      autoplay: true,
      loop: true,
      initialSlide: -1,
      pagination: {
        el: ".swiper-pagination"
      },
      listLMG:"",
      listLMT:"",
    });
  },
  methods: {
    queryLMG(data){
          this.listLMG = data
    },
     queryLMT(data){
       this.listLMT = data
     },
    login(sign1, random1, addr) {
      console.log(sign1, random1);
      let that = this;
      if (
        this.$cookies.get("playerId") == "" ||
        this.$cookies.get("playerId") == undefined ||
        this.$cookies.get("playerId") == null
      ) {
        this.$post(this.$apiUtil.login, {
          walletAddress: addr,
          invitationAddress: this.$route.query.code
            ? this.$route.query.code
            : "",
          random: random1,
          sign: sign1
        }).then(res => {
          if (res == undefined) {
            return false;
          }
          that.$store.state.walletAddress = addr;
          that.$cookies.set("walletAddress", addr, {
            expires: 0
          });
          that.$store.state.playerId = res.data.id;
          that.$cookies.set("playerId", res.data.id, {
            expires: 0
          });
          if (res.data.head == 0) {
            res.data.head = 1;
          }
          that.$store.state.head = res.data.head;
          that.$cookies.set("head", res.data.head, {
            expires: 0
          });
          that.$store.state.isNFT = res.data.isNFT;
          that.$cookies.set("isNFT", res.data.isNFT, {
            expires: 0
          });
          that.$store.state.nickname = res.data.nickname;
          that.$cookies.set("nickname", res.data.nickname, {
            expires: 0
          });
          that.$store.state.playerTockenId = res.data.playerTockenId;
          that.$cookies.set("playerTockenId", res.data.playerTockenId, {
            expires: 0
          });
          that.$store.state.token = res.data.token;
          that.$cookies.set("token", res.data.token, {
            expires: 0
          });
          if (res.data.isNFT == 1) {
            that.$refs["tops"].tokenurl();
          }
          that.signinto();
          that.$refs["tops"].getlevel1();
          that.$refs["tops"].query();
        });
      } else {
        this.signinto();
      }
    },
    signinto() {
      this.$post(this.$apiUtil.reward_getOne, {
        playerId: this.$cookies.get("playerId"),
        walletAddress: this.$cookies.get("walletAddress")
      }).then(res => {
        if (res.data == false) {
          this.$router.push("/sign");
          //						this.sign=true
        }
      });
    },
    goherf1() {
      window.location.href = process.env.hrefall;
    },
      getlevel1() {
      this.$post(this.$apiUtil.getLevel, {
        playerId: this.$cookies.get("playerId"),
        walletAddress: this.$cookies.get("walletAddress")
      }).then(res => {
        this.levelStatus = res.data.level;
      });
    },
    goherListFn(){
        console.log( this.headimg[this.$cookies.get('head')])
       var ic
        for (var key in this.headimg) {
           if(key == this.$cookies.get('head')){
                  ic = key
           }
        }
        const name =  this.$cookies.get("nickname") +""
        const level = this.levelStatus
        const icon =  ic >= 10 ? ic : "0"+ic 
        const lmt = this.listLMT
        const lmg =this.listLMG
        const lan = localStorage.getItem('locale')
        let href =  `http://hashgame.luckymeta.io/?name=${name}&icon=${icon}&level=${level}&lmt=${lmt}&lmg=${lmg}&lan=${lan}`
        window.location.href = href
      },
    goherf2() {
      this.$parent.$refs["pop"].pop = true;
    },
    goherFn() {
      window.open(process.env.hrefAdmin);

      // window.location.href = process.env.hrefAdmin;
    },
    goherf3() {
      window.location.href = process.env.href2;
    },
    goherf4() {
      window.location.href = process.env.href1;
    },
    goherf5() {
      if (process.env.href3 == "") {
        this.$parent.$refs["pop"].pop = true;
      } else {
        window.location.href = process.env.href3;
      }
    }
    //			goherf5() {
    //				this.$parent.$refs['pop'].pop=true;
    //			},
  }
};
</script>

<style>
.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 2;
}

.lobby {
  width: 100%;
  float: left;
  margin-bottom: 1rem;
}
/*.lobby .top .topaddr .addrimg {
		height: .21rem;
		width: .21rem;
		border-radius: 50%;
		border: 1px solid #AAA0D6;
		display: flex;
		align-items: center;
		background: #372A6D;
		margin-left: .05rem;
	}
	
	.lobby .top .topaddr .addrimg img {
		width: .11rem;
		height: .11rem;
		display: block;
		margin: 0 auto;
	}*/

.lobby .swiper-container {
  width: 100%;
  height: 1.75rem;
  margin-top: 0.2rem;
  overflow: hidden;
}

.lobby .swiper-pagination-bullet {
  width: 0.2rem;
  height: 0.06rem;
  opacity: 1;
  margin: 0 0.03rem !important;
  border-radius: 0.04rem;
  background: #8a8a8a;
  border: 1px solid #d69fff;
}

.lobby .swiper-pagination-bullet-active {
  background: #ffffff;
}

.lobby .swiper-slide img {
  width: 100%;
}

.lobby .lobbyimgto {
  float: left;
  width: 100%;
  overflow-x: auto;
}

.lobby .lobbyimgto .goimgin {
  width: 8.3rem;
}

.lobby .lobbyimgto .imgin {
  float: left;
  width: 4.6rem;
  margin: 0 0.12rem;
}

.lobby .lobbyimgto .imgin2 {
  margin: 0;
  width: 3.4rem;
}

.lobby .lobbyimgto .imgin div:nth-child(1) {
  float: left;
  width: 3.29rem;
  height: 1.48rem;
}

.lobby .lobbyimgto .imgin div:nth-child(2) {
  float: right;
  width: 1.2rem;
  height: 2.935rem;
  /*margin-right: .125rem;*/
  margin-top: 0.345rem;
}

.lobby .lobbyimgto .imgin div:nth-child(3) {
  float: left;
  width: 1.205rem;
  height: 1.71rem;
  margin-top: 0.09rem;
  margin-right: 0.1rem;
}

.lobby .lobbyimgto .imgin div:nth-child(4) {
  float: left;
  width: 1.98rem;
  height: 0.83rem;
  margin-top: 0.09rem;
}

.lobby .lobbyimgto .imgin div:nth-child(5) {
  float: left;
  width: 1.98rem;
  height: 0.83rem;
  margin-top: 0.065rem;
}

.lobby .lobbyimgto .imgin2 div:nth-child(1) {
  width: 1.4rem;
  height: 2.95rem;
  margin-top: 0.345rem;
  margin-right: 0.12rem;
}

.lobby .lobbyimgto .imgin2 div:nth-child(2) {
  width: 1.8rem;
  height: 0.9rem;
  float: left;
  margin-top: 0.4rem;
}

.lobby .lobbyimgto .imgin2 div:nth-child(3),
.lobby .lobbyimgto .imgin2 div:nth-child(4) {
  width: 1.8rem;
  height: 0.9rem;
  margin-right: 0;
}

.lobby .lobbyimgto .imgin div {
  position: relative;
  overflow: hidden;
}

.lobby .lobbyimgto .imgin div:active {
  transition-delay: 0.1s;
  transform: translateX(-8px) translateY(8px);
}

.lobby .lobbyimgto .imgin div center {
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 0.2rem;
  display: none;
  z-index: -1;
}

.lobby .lobbyimgto .imgin div img {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: -2;
}

.lobby .lobbyimgto .imgin div:active center {
  display: block;
  z-index: -1;
}
</style>
