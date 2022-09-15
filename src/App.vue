<template>
  <div id="app">
    <router-view ref="hometo" v-if="show" />
    <Publicfooter v-if="$route.meta.navShow"></Publicfooter>
    <pop ref="pop"></pop>
    <notActive ref="notActive"></notActive>
  </div>
</template>

<script>
import { ethers } from "ethers";
import Publicfooter from "./components/public/footer";
import pop from "./components/public/pop";
import notActive from "./components/public/notActive.vue";
import web3tools from "./web3/web3tools";
export default {
  name: "App",
  components: {
    Publicfooter,
    pop,
    notActive
  },
  data() {
    return {
      show: false
    };
  },
  mounted() {
    //			if(window.ethereum == undefined) {
    //				this.$messagebox({
    //					title: '',
    //					message: 'Please use wallet browser to open this website',
    //					closeOnClickModal: false,
    //					confirmButtonText: 'YES',
    //					showConfirmButton: true,
    //					cancelButtonText: 'NO',
    //					showCancelButton: true,
    //				}).then(action => {});
    //				this.$router.push('/')
    //			} else {
    window.close = this.close;
    if (localStorage.isnew == undefined || localStorage.isnew == "") {
      localStorage.isnew = 1;
      this.close();
    } else {
      if (
        localStorage.isnewthree == undefined ||
        localStorage.isnewthree == ""
      ) {
        localStorage.isnewthree = 1;
        this.close();
      } else {
        if (
          this.$cookies.get("walletAddress") != "" &&
          this.$cookies.get("walletAddress") != undefined
        ) {
          this.login();
        } else {
          this.close();
          //						if(this.$route.path == "/") {
          //							this.$refs["hometo"].$refs["tops"].Reset()
          //						} else {
          //							this.$router.push('/')
          //						}
        }
      }
    }
    //			}
  },
  methods: {
    close() {
      this.show = true;
      this.empty();
      // this.music();
    },
    empty() {
      let that = this;
      that.$store.state.walletAddress = "";
      that.$cookies.set("walletAddress", "", {
        expires: 0
      });
      that.$store.state.playerId = "";
      that.$cookies.set("playerId", "", {
        expires: 0
      });
      that.$store.state.token = "";
      that.$cookies.set("token", "", {
        expires: 0
      });
      that.$store.state.head = "";
      that.$cookies.set("head", "", {
        expires: 0
      });
      that.$store.state.isNFT = "";
      that.$cookies.set("isNFT", "", {
        expires: 0
      });
      that.$store.state.nickname = "";
      that.$cookies.set("nickname", "", {
        expires: 0
      });
      that.$store.state.playerTockenId = "";
      that.$cookies.set("playerTockenId", "", {
        expires: 0
      });
      that.$store.state.Sound = true;
      that.$cookies.set("Sound", true, {
        expires: 0
      });
      that.$store.state.Music = true;
      that.$cookies.set("Music", true, {
        expires: 0
      });
      if (that.$route.path == "/") {
        that.$nextTick(() => {
          that.$refs["hometo"].$refs["tops"].Reset();
        });
      } else {
        that.$router.push("/");
      }
    },
    music() {
      let that = this;
      if (
        that.$cookies.get("Music") == undefined ||
        that.$cookies.get("Music") == "" ||
        that.$cookies.get("Music") == null ||
        JSON.parse(that.$cookies.get("Music")) != false
      ) {
        document.getElementById("playall").play();
      }
      if (
        that.$cookies.get("Music") == undefined ||
        that.$cookies.get("Music") == "" ||
        that.$cookies.get("Music") == null ||
        JSON.parse(that.$cookies.get("Music")) != false
      ) {
        function audioAutoPlay(id) {
          var audio = document.getElementById(id),
            play = function() {
              audio.play();
              document.removeEventListener("touchstart", play, false);
            };
          audio.play();
          document.addEventListener(
            "WeixinJSBridgeReady",
            function() {
              //微信

              play();
            },
            false
          );
          document.addEventListener("touchstart", play, false);
        }
        audioAutoPlay("playall");
        let hidden, state, visibilityChange;
        if (typeof document.hidden !== "undefined") {
          hidden = "hidden";
          state = "visibilityState";
          visibilityChange = "visibilitychange";
        } else if (typeof document.mozHidden !== "undefined") {
          hidden = "mozHidden";
          state = "mozvisibilityState";
          visibilityChange = "mozvisibilitychange";
        } else if (typeof document.msHidden !== "undefined") {
          hidden = "msHidden";
          state = "msvisibilityState";
          visibilityChange = "msvisibilitychange";
        } else if (typeof document.webkitHidden !== "undefined") {
          hidden = "webkitHidden";
          state = "webkitvisibilityState";
          visibilityChange = "webkitvisibilitychange";
        }
        document.addEventListener(visibilityChange, () => {
          // 页面变为可见时触发
          console.log(that.$cookies.get("Music"));
          if (document[state] == "visible") {
            console.log(that.$cookies.get("Music"));
            if (
              that.$cookies.get("Music") == undefined ||
              that.$cookies.get("Music") == "" ||
              that.$cookies.get("Music") == null ||
              JSON.parse(that.$cookies.get("Music")) != false
            ) {
              document.getElementById("playall").play();
            }
          } else {
            document.getElementById("playall").pause();
          }
        });
      }
    },
    login() {
      let that = this;
      //				this.$store.state.playerId = "";
      //				this.$cookies.set("playerId", "", {
      //					expires: 0
      //				});
      web3tools
        .getEthAddrInfoSingIn()
        .then(res => {
          // console.log(res)
          // console.log(this.$cookies.get('walletAddress'))
          that.show = true;
          if (res != this.$cookies.get("walletAddress")) {
            that.empty();
          } else {
            that.$store.state.walletAddress = res;
            that.$cookies.set("walletAddress", res, {
              expires: 0
            });
            that.$store.state.playerId = that.$cookies.get("playerId");
            that.$store.state.head = that.$cookies.get("head");
            that.$store.state.isNFT = that.$cookies.get("isNFT");
            that.$store.state.nickname = that.$cookies.get("nickname");
            that.$store.state.playerTockenId = that.$cookies.get(
              "playerTockenId"
            );
            if (
              that.$cookies.get("Sound") == undefined ||
              that.$cookies.get("Sound") == "" ||
              that.$cookies.get("Sound") == null
            ) {
              that.$store.state.Sound = true;
              that.$cookies.set("Sound", true, {
                expires: 0
              });
            } else {
              that.$store.state.Sound = that.$cookies.get("Sound");
            }
            console.log(that.$cookies.get("Music"));
            if (
              that.$cookies.get("Music") == undefined ||
              that.$cookies.get("Music") == "" ||
              that.$cookies.get("Music") == null
            ) {
              that.$store.state.Music = true;
              that.$cookies.set("Music", true, {
                expires: 0
              });
            } else {
              that.$store.state.Music = that.$cookies.get("Music");
              // console.log(that.$store.state.Music)
            }
          }
          that.music();
        })
        .catch(res => {
          that.show = true;
          that.empty();
          that.music();
        });
      this.watchaccount();
    },
    watchaccount() {
      let that = this;
      if (window.location.href.indexOf("utm_source=luckyWallet") != -1) {
        return false;
      }
      web3tools.ethereum.on("accountsChanged", function(accounts) {
        that.empty();
        that.music();
        //					let provider = new ethers.providers.Web3Provider(window.ethereum)
        //					let signer = provider.getSigner()
        //					signer.getAddress().then(function(accounts) {
        //						that.$store.state.walletAddress = accounts
        //						that.$cookies.set("walletAddress", accounts, {
        //							expires: 0
        //						});
        //						that.$store.state.playerId = "";
        //						that.$cookies.set("playerId", "", {
        //							expires: 0
        //						});
        //						if(that.$route.path == "/") {
        //							that.$refs["hometo"].login()
        //						} else if(this.$route.path == "/game") {
        //							that.$refs["hometo"].login()
        //						} else {
        //							that.$router.push('/')
        //						}
        //					})
      });
      web3tools.ethereum.on("networkChanged", function(accounts) {
        console.log(accounts);
      });
    }
  }
};
</script>

<style>
body {
  background: url(../static/image/BG.png) !important;
  background-size: 100% 100% !important;
  background-repeat: no-repeat !important;
  /*background-position: center !important;*/
  height: 100vh;
  overflow: hidden;
}

#app {
  height: 100vh;
  overflow: auto;
}

.preventReClick {
  pointer-events: none;
  background: linear-gradient(#ffffff, #999999) !important;
  /*background: #D9D9D9 !important;*/
}

.mint-msgbox {
  background-image: url(../static/image/tisBG.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-color: transparent !important;
  width: 94%;
}

.mint-msgbox-btn {
  background-color: transparent !important;
  width: 1.03rem !important;
  flex: none !important;
  border-radius: 0.18rem !important;
  color: #000000 !important;
  font-size: 0.2rem !important;
  font-family: Magistral-Bold !important;
  background: linear-gradient(#fffc00, #db7100);
  line-height: 0.36rem !important;
  margin-bottom: 0.34rem !important;
}

.mint-msgbox-btn:first-child {
  margin-left: 0.33rem !important;
}

.mint-msgbox-content {
  border-bottom: 0 !important;
  padding: 0.76rem 0.26rem 0.42rem !important;
}

.mint-msgbox-message {
  color: #ffffff !important;
  font-size: 0.1867rem !important;
  line-height: 0.2518rem !important;
  text-transform: uppercase !important;
  font-family: Magistral-Medium !important;
}

.mint-msgbox-btns {
  height: auto !important;
  line-height: normal !important;
  padding-bottom: 0.28rem !important;
  justify-content: center !important;
  flex-flow: row-reverse !important;
}

.mint-toast.is-placebottom,
.mint-toast.is-placemiddle {
  width: max-content !important;
}

.load {
  display: flex;
  justify-content: center;
  margin-top: 0.2rem;
}

.nolist {
  color: #ffffff;
  margin-top: 0.2rem;
  text-align: center;
  font-family: "Magistral-Medium";
}

.slide-verify {
  background: #ffffff;
}

.slide-verify-slider {
  width: auto !important;
}

.movebutton span {
  display: none;
  z-index: -1;
}

.movebutton:active {
  transform: translateX(6px) translateY(6px);
  position: relative;
  overflow: hidden;
  transition-delay: 0.1s;
}

.movebutton:active span {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5) !important;
  z-index: -1;
}
</style>
