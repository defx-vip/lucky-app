<template>
  <div class="indextop">
    <div class="top">
      <div class="head">
        <img class="ancrown" src="../../../static/image/ancrown.png" />
        <center>
          <img
            class="headtopimg"
            v-if="
              $store.state.walletAddress == '' ||
                $store.state.walletAddress == undefined
            "
          />
          <img
            v-else-if="$cookies.get('isNFT') == 0"
            class="headtopimg"
            :src="headimg[$cookies.get('head')]"
            @click="head = true"
          />
          <img
            v-else
            class="headtopimg"
            :src="NFTimg.image"
            @click="head = true"
          />
        </center>

        <div @click="show">
          <span>{{ level }}</span>
          <p>{{ nicknameUser ? nicknameUser : nickname }}</p>
        </div>
      </div>
      <div class="topaddr">
        <div
          class="addr"
          v-if="
            $store.state.walletAddress != '' &&
              $store.state.walletAddress != undefined
          "
        >
          <img src="../../../static/image/addr.png" />
          <p>
            {{ $store.state.walletAddress.substring(0, 7) }}***{{
              $store.state.walletAddress.substring(
                $store.state.walletAddress.length - 6,
                $store.state.walletAddress.length
              )
            }}
          </p>
        </div>
        <div class="addr" v-else @click="Connect">
          <img src="../../../static/image/addr.png" />
          <p v-music>{{ $t("lConnectWallet") }}</p>
        </div>
        <router-link to="/assetdetails" v-music>
          <div class="addrimg">
            <img src="../../../static/image/Walletbutton.png" />
          </div>
        </router-link>
        <router-link to="/notice" v-music>
          <div class="addrimg">
            <img src="../../../static/image/Noticehome.png" />
          </div>
        </router-link>
        <a @click="setup = true" v-music>
          <div class="addrimg">
            <img src="../../../static/image/setup.png" />
          </div>
        </a>
      </div>
      <div class="topbalance">
        <div class="balance">
          <button
            type="button"
            @click="$router.push('/recharge')"
            v-movedown
            v-music
          >
            {{ $t("lTRANSFER") }}
          </button>
          <div>
            <p style="text-align: center;flex-wrap: nowrap;">
              {{ $t("lLocalWallet") }}
            </p>
            <p>
              <img src="../../../static/image/LMT.png" /><span>{{
                BCTbalance
              }}</span>
            </p>
            <p>
              <img src="../../../static/image/LMG.png" /><span>{{
                BCGbalance
              }}</span>
            </p>
          </div>
        </div>
      </div>
      <div class="topbalance">
        <div class="balance">
          <button
            type="button"
            v-movedown
            @click="$router.push('/withdrawal')"
            v-music
          >
            {{ $t("lWD") }}
          </button>
          <div>
            <p style="text-align: center;flex-wrap: nowrap;">
              {{ $t("lServerAccount") }}
            </p>
            <p>
              <img src="../../../static/image/LMT.png" /><span>{{
                LMTbalance
              }}</span>
            </p>
            <p>
              <img src="../../../static/image/LMG.png" /><span>{{
                LMGbalance
              }}</span>
            </p>
          </div>
        </div>
      </div>
      <!--<ul class="balance">
				<li>
					<router-link to="/wallet">
						<img src="../../../static/image/LMT.png" />
						<p>{{LMTbalance}}</p>
					</router-link>
				</li>
				<li>
					<router-link to="/wallet">
						<img src="../../../static/image/LMG.png" />
						<p>{{LMGbalance}}</p>
					</router-link>
				</li>
			</ul>
			<div class="topbutton">
				<button type="button" @click="$router.push('/recharge')">RECHG</button>
				<button type="button" @click="$router.push('/withdrawal')">W/D</button>
				
			</div>-->
    </div>
    <headimg v-if="head"></headimg>
    <give ref="give" @userInfoName="userInfoName"></give>
    <verify v-if="verify"></verify>
    <setup v-if="setup"></setup>
  </div>
</template>

<script>
import web3tools from "../../web3/web3tools";
import headimg from "./headimg";
import give from "../nft/give";
import verify from "./verify";
import setup from "./setup";
let _this;
export default {
  components: {
    headimg,
    give,
    verify,
    setup
  },
  computed: {
    nickname() {
      return this.$store.state.nickname;
    }
  },

  data() {
    return {
      verify:
        this.$store.state.walletAddress == "" ||
        this.$store.state.walletAddress == undefined
          ? true
          : false,
      head: false,
      setup: false,
      timelog: "",
      LMTbalance: 0,
      LMGbalance: 0,
      BCTbalance: 0,
      BCGbalance: 0,
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
      NFTimg: "",
      level: "",
      nicknameUser: ""
    };
  },
  mounted() {
    _this = this;
    if (
      this.$cookies.get("playerId") != "" &&
      this.$cookies.get("playerId") != undefined &&
      this.$cookies.get("playerId") != null
    ) {
      this.query();
      this.getlevel1();
      if (this.$cookies.get("isNFT") == 1) {
        this.tokenurl();
      }
      let that = this;
      this.timelog = setInterval(function() {
        if (
          that.$cookies.get("playerId") != "" &&
          that.$cookies.get("playerId") != undefined &&
          that.$cookies.get("playerId") != null
        ) {
          that.query();
        }
      }, 10000);
    }
  },
  beforeDestroy() {
    clearInterval(this.timelog);
  },
  destroyed() {
    clearInterval(this.timelog);
  },
  methods: {
    userInfoName(val) {
      this.$store.state.nickname = val;
      this.nicknameUser = val;
    },
    Reset() {
      this.verify =
        this.$store.state.walletAddress == "" ||
        this.$store.state.walletAddress == undefined
          ? true
          : false;
      this.head = false;
      this.setup = false;
      this.timelog = "";
      this.LMTbalance = 0;
      this.LMGbalance = 0;
      this.BCTbalance = 0;
      this.BCGbalance = 0;
      this.NFTimg = "";
      this.level = "";
      this.$parent.sign = false;
      this.$parent.turntablego = false;
    },
    Connect() {
      web3tools.getEthAddrInfoSingIn().then(res => {
        this.$post(this.$apiUtil.auth, {}).then(data => {
          let random = data.data.auth + _this.randomString(4);
          web3tools.sign_web(random, e => {
            _this.$store.state.walletAddress = "";
            _this.$cookies.set("walletAddress", "", {
              expires: 0
            });
            _this.$store.state.playerId = "";
            _this.$cookies.set("playerId", "", {
              expires: 0
            });
            _this.$store.state.token = "";
            _this.$cookies.set("token", "", {
              expires: 0
            });
            _this.$parent.login(e, random, res);
            _this.$parent.$parent.watchaccount();
          });
        });
      });
    },
    randomString(e) {
      e = e || 32;
      var t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
        a = t.length,
        n = "";
      for (let i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
      return n;
    },
    show() {
      this.$refs.give.blindbox = 6;
      this.$refs.give.give = true;
    },
    getlevel1() {
      this.$post(this.$apiUtil.getLevel, {
        playerId: this.$cookies.get("playerId"),
        walletAddress: this.$cookies.get("walletAddress")
      }).then(res => {
        this.level = res.data.level;
      });
    },
    query() {
      this.$post(this.$apiUtil.getassets, {
        playerId: this.$cookies.get("playerId"),
        walletAddress: this.$cookies.get("walletAddress")
      }).then(res => {
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].tokenCode == "LMT") {
            if (
              res.data[i].quantity != null &&
              res.data[i].quantity != undefined &&
              res.data[i].quantity != ""
            ) {
              this.LMTbalance = res.data[i].quantity;
            } else {
              this.LMTbalance = 0;
            }
             this.$emit("queryLMT",this.LMTbalance)
          } else if (res.data[i].tokenCode == "LMG") {
            if (
              res.data[i].quantity != null &&
              res.data[i].quantity != undefined &&
              res.data[i].quantity != ""
            ) {
              this.LMGbalance = res.data[i].quantity;
            } else {
              this.LMGbalance = 0;
            }
             this.$emit("queryLMG",this.LMGbalance)
          }
          web3tools.getbalance(
            res.data[i].tokenContract,
            res.data[i].tokenCode,
            e => {
              if (res.data[i].tokenCode == "LMT") {
                this.BCTbalance = parseFloat(Number(e).toFixed(2));
              } else if (res.data[i].tokenCode == "LMG") {
                this.BCGbalance = parseFloat(Number(e).toFixed(2));
              }
            }
          );
        }
      });

    },
    tokenurl() {
      let that = this;
      web3tools.tokenURI(
        this.$store.state.NFTaddr,
        this.$cookies.get("head"),
        e => {
          this.$nftget(e, {}).then(res => {
            that.NFTimg = res;
          });
        }
      );
    }
  }
};
</script>

<style scoped>
.indextop .top {
  background: url(../../../static/image/hometop.png);
  width: 100%;
  height: 1.43rem;
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
}

.indextop .top .head {
  width: 0.5867rem;
  height: 0.5867rem;
  margin-left: 0.2533rem;
  margin-top: 0.2067rem;
  float: left;
  position: relative;
}

.indextop .top .head .ancrown {
  position: absolute;
  width: 0.4167rem;
  top: -0.2033rem;
  left: -0.0933rem;
}

.indextop .top .head .headtopimg {
  width: 0.5467rem;
  height: 0.5467rem;
  border-radius: 50%;
  border: 2px solid #c18df4;
}

.indextop .top .head div {
  position: absolute;
  bottom: -0.0533rem;
  left: -0.08rem;
  width: 0.7133rem;
  display: flex;
  height: 0.2333rem;
  background-image: url(../../../static/image/hometopname.png);
  background-repeat: no-repeat;
  background-size: 100%;
  color: #ffffff;
  align-items: center;
  z-index: 1;
}

.indextop .top .head div span {
  font-size: 0.12rem;
  width: 0.27rem;
  text-align: center;
  flex: none;
  margin-top: -0.02rem;
}

.indextop .top .head div p {
  font-size: 0.12rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.indextop .top .topaddr {
  float: right;
  margin-top: 0.38rem;
  display: flex;
}

.indextop .top .topaddr .addr {
  width: 1.6933rem;
  height: 0.2333rem;
  display: flex;
  align-items: center;
  background: #110020;
  border-radius: 0.1167rem;
  border: 1px solid #35e7ff;
  margin-right: 0.1rem;
  position: relative;
  z-index: 3;
}

.indextop .top .topaddr .addr img {
  width: 0.1733rem;
  margin-left: 0.0433rem;
}

.indextop .top .topaddr .addr p {
  font-family: "Magistral-Book";
  color: #ffffff;
  font-size: 0.12rem;
  flex: 1;
  text-align: center;
}

.indextop .top .topaddr a {
  margin-right: 0.1rem;
}

.indextop .top .topaddr a img {
  width: 0.2333rem;
}

.indextop .top .balance {
  background-image: url(../../../static/image/topWallet.png);
  background-repeat: no-repeat;
  background-size: 100%;
  margin-left: 0.1133rem;
  margin-right: 0.028rem;
}

.indextop .top .topbalance {
  width: 50%;
  margin-top: 0.11rem;
  position: absolute;
  bottom: 0.0867rem;
  left: 0;
}

.indextop .top .topbalance:last-child {
  right: 0;
  left: auto;
}

.indextop .top .topbalance:last-child .balance {
  margin-left: 0.028rem;
  margin-right: 0.1133rem;
}

.indextop .top .topbalance .balance button {
  background: linear-gradient(#fffc00, #db7100);
  float: right;
  width: 0.7667rem;
  height: 0.18rem;
  border-radius: 0.04rem;
  font-size: 0.12rem;
  margin-top: 0.0333rem;
  margin-right: 0.0667rem;
}

.indextop .top .topbalance:last-child .balance button {
  background: linear-gradient(#ffffff, #01d5d2);
}

.indextop .top .topbalance .balance div {
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 0.1rem 0;
}

.indextop .top .topbalance .balance div p {
  height: 0.2167rem;
  color: #ffffff;
  font-family: "Magistral-Book";
  font-size: 0.12rem;
  display: flex;
  align-items: center;
  border-right: 1px solid #268ca7;
  width: 30%;
  justify-content: center;
  flex-wrap: wrap;
  padding: 0 1.5%;
}

.indextop .top .topbalance .balance div p:nth-child(3) {
  border: 0;
}

.indextop .top .topbalance .balance div p img {
  width: 0.16rem;
  margin-bottom: 0.0167rem;
  margin-top: -0.0333rem;
}

.indextop .top .topbalance .balance div p span {
  display: block;
  width: 100%;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
/*.indextop .top .head {
		width: .55rem;
		height: .55rem;
		margin-left: .11rem;
		margin-top: .2467rem;
		display: inline-block;
		position: relative;
		float: left;
		border-radius: 50%;
		border: .02rem solid #C18DF4;
		background: #4B0082;
	}
	
	.indextop .top .head .ancrown {
		width: .41rem;
		height: .35rem;
		display: block;
		position: absolute;
		top: -.23rem;
		left: -.12rem;
	}
	
	.indextop .top .head .headtopimg {
		width: .55rem;
		height: .55rem;
		border-radius: 50%;
		display: block;
	}
	
	.indextop .top .head .ranking {
		background-position: center;
		width: .275rem;
		height: .275rem;
		position: absolute;
		top: -.06rem;
		left: -.03rem;
		font-size: .13rem;
		color: #000000;
		text-align: center;
		line-height: .32rem;
		text-indent: .05rem;
		font-weight: 600;
	}
	
	.indextop .top .balance {
		float: right;
		margin-top: .2rem;
	}
	
	.indextop .top .balance li {
		float: left;
		margin-right: .093rem;
		border: 1px solid #35E7FF;
		height: .247rem;
		border-radius: .1333rem;
		width: 34vw;
	}
	
	.indextop .top .balance li:first-child {
		margin-right: .23rem;
	}
	
	.indextop .top .balance li a {
		float: left;
		height: 100%;
		width: 100%;
	}
	
	.indextop .top .balance li img {
		width: .21rem;
		height: .21rem;
		float: left;
		margin-right: .12rem;
		margin-top: .018rem;
		margin-left: .022rem;
	}
	
	.indextop .top .balance li p {
		float: left;
		color: #ffffff;
		font-size: .14rem;
		font-family: Magistral-Book;
		padding: .04rem 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		width: 55%;
	}
	
	.indextop .top .topbutton {
		float: right;
		margin-top: .11rem;
	}
	
	.indextop .top .topbutton button {
		padding: 0.02rem .1033rem;
		font-size: .1333rem;
		border-radius: .1rem;
		float: left;
		height: .2rem;
		font-family: Magistral-Medium;
		margin-right: .0933rem;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background: linear-gradient(#FFFC00, #DB7100);
	}
	
	.indextop .top .topbutton button:last-child {
		background: linear-gradient(#ffffff, #01D5D2);
	}
	
	.indextop .top .topbutton a {
		float: left;
	}
	
	.indextop .top .topbutton a img {
		width: .2333rem;
		height: .2333rem;
		margin-right: .06rem;
		margin-top: -.0167rem;
	}
	
	.indextop .top .topaddr {
		float: left;
		margin-top: .1533rem;
		display: flex;
	}
	
	.indextop .top .topaddr .addr {
		background: #110020;
		border: 1px solid #35E7FF;
		border-radius: .1rem;
		display: flex;
		height: .18rem;
	}
	
	.indextop .top .topaddr .addr img {
		width: .14rem;
		height: .14rem;
		margin-left: .03rem;
		padding: .02rem 0;
		margin-right: .0467rem;
	}
	
	.indextop .top .topaddr .addr p {
		padding: .02rem 0;
		font-size: .12rem;
		color: #ffffff;
		padding-right: .0833rem;
		font-family: Magistral-Book;
		/*display: flex;
		align-items: center;*/
</style>
