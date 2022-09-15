<template>
  <div class="nft">
    <div v-if="success == 1">
      <div class="top">
        <div class="left">
          <div class="img">
            <img
              v-if="
                $cookies.get('playerTockenId') == 0 ||
                  $cookies.get('playerTockenId') == '' ||
                  $cookies.get('playerTockenId') == undefined
              "
              src="../../../static/image/1487.png"
            />
            <img v-else-if="NFTimg != ''" :src="NFTimg.image" />
          </div>
          <button
            type="button"
            v-if="$store.state.environment == 'production'"
            @click.stop="$parent.$refs['pop'].pop = true"
            v-music
          >
            {{ $t("bChangeProtector") }}
          </button>
          <button
            type="button"
            v-else
            @click="
              mynft == 0 ? $toast($t('bPleasepurchaseNFTfirst')) : (nft = true)
            "
            v-music
          >
            {{ $t("bChangeProtector") }}
          </button>
        </div>
        <h1>{{ $t("bMy-BAG") }}</h1>
        <!--<span>My-NFT award<img src="../../../static/image/NFTtop.png"></span>-->
        <button
          type="button"
          @click="$router.push('/market/NFTMarket?change=box')"
          v-music
        >
          {{ $t("fMARKET") }}<img src="../../../static/image/arrowcopy.png" />
        </button>

        <!-- <p
          :class="
            showBonus.reward == 0 || showBonus.bool == true
              ? 'preventReClick'
              : ''
          "
          @click="getBonus()"
        >
          <img src="../../../static/image/reward.png" />{{ $t("eReceive") }}
          <span>+{{ showBonus.reward }}</span>
          <i v-if="showBonus.bool == false"></i>
        </p> -->
        
      </div>
      <div class="nav">
        <p
          :class="change == 'box' ? 'active' : ''"
          @click="changeto('box')"
          v-music
        >
          {{ $t("mMystery") }}
        </p>
        <p
          :class="change == 'rare' ? 'active' : ''"
          @click="changeto('rare')"
          v-music
        >
          {{ $t("bRareNFT") }}
        </p>
        <p
          :class="change == 'ordinary' ? 'active' : ''"
          @click="changeto('ordinary')"
          v-music
        >
          {{ $t("bOrdinaryNFT") }}
        </p>
      </div>
      <div class="boxopen">
        <p>
          <button
            type="button"
            v-if="change == 'box'"
            @click="opento"
            v-movedown
            v-music
          >
            {{ $t("bOpenBox") }}
          </button>
        </p>
        <p>
          <button type="button" @click="giveto" v-movedown v-music>
            {{ $t("bGiveAway") }}
          </button>
        </p>
      </div>
      <ul class="list" v-if="change == 'box'">
        <li v-for="(item, index) in nftlist" :key="index">
          <img
            style="object-fit: cover;"
            @click="
              $router.push(
                '/details?id=' +
                  item.tokenId +
                  '&sort=' +
                  item.sort +
                  '&price=' +
                  item.price
              )
            "
            src="../../../static/image/1487.png"
            v-music
          />
          <p>
            <input
              type="checkbox"
              :class="item.price != '' || item.pledge == 1 ? 'sell' : ''"
              name="arr"
              v-model="tokenIdarr"
              :value="item.tokenId"
              @click.stop
            />ID: {{ item.tokenId }}
          </p>
        </li>
      </ul>
      <ul class="list" v-else-if="change == 'rare'">
        <li v-for="(item, index) in nftlist" :key="index">
          <span v-if="item.price != ''">{{ $t("bPendingorder") }}</span>
          <span v-if="item.pledge == 1">{{ $t("epledge") }}</span>
          <img
            @click="
              $router.push(
                '/details?id=' +
                  item.tokenId +
                  '&sort=' +
                  item.sort +
                  '&price=' +
                  item.price
              )
            "
            :src="item.image"
            v-music
          />
          <p>
            <input
              type="checkbox"
              :class="item.price != '' || item.pledge == 1 ? 'sell' : ''"
              name="arr"
              v-model="tokenIdarr"
              :value="item.tokenId"
              @click.stop
            />ID: {{ item.tokenId }}
          </p>
        </li>
      </ul>
      <ul class="list" v-else-if="change == 'ordinary'">
        <li v-for="(item, index) in nftlist" :key="index">
          <span v-if="item.price != ''">{{ $t("bPendingorder") }}</span>
          <span v-if="item.pledge == 1">{{ $t("epledge") }}</span>
          <img
            @click="
              $router.push(
                '/details?id=' +
                  item.tokenId +
                  '&sort=' +
                  item.sort +
                  '&price=' +
                  item.price
              )
            "
            :src="item.image"
            v-music
          />
          <p>
            <input
              type="checkbox"
              :class="item.price != '' || item.pledge == 1 ? 'sell' : ''"
              name="arr"
              v-model="tokenIdarr"
              :value="item.tokenId"
              @click.stop
            />ID: {{ item.tokenId }}
          </p>
        </li>
      </ul>
    </div>
    <give ref="give"></give>
    <purchasesuccess v-if="success == 2"></purchasesuccess>
    <success v-if="success == 3"></success>
    <nftimg v-if="nft"></nftimg>
  </div>
</template>

<script>
import web3tools from "../../web3/web3tools";
import purchasesuccess from "./purchasesuccess";
import success from "./success";
import give from "./give";
import nftimg from "./nftimg";
let _this;
export default {
  components: {
    purchasesuccess,
    success,
    give,
    nftimg
  },
  data() {
    return {
      nft: false,
      tokenIdarr: [],
      success: 1,
      nftlist: [],
      seobool: false,
      LMTbalance: 0,
      LMGbalance: 0,
      change: this.$route.query.change,
      list: [],
      NFTimg: "",
      mynft: 0,
      showBonus: { reward: "", bool: "" }
    };
  },
  mounted() {
    //			this.query()
    _this = this;
    this.mynftlist();
    this.showExpBonus();
    if (this.change == "box") {
      this.boxquery();
    } else if (this.change == "rare") {
      this.NFTquery("rare");
    } else if (this.change == "ordinary") {
      this.NFTquery("ordinary");
    }
    if (
      this.$cookies.get("playerTockenId") != 0 &&
      this.$cookies.get("playerTockenId") != "" &&
      this.$cookies.get("playerTockenId") != undefined
    ) {
      this.tokenurl();
    }
  },
  watch: {
    tokenIdarr: {
      handler: function() {
        if (this.tokenIdarr.length >= 10) {
          $("input[type=checkbox]:not(:checked)").attr("disabled", "disabled");
        } else {
          $("input[type=checkbox]").removeAttr("disabled", "disabled");
        }
      }
    }
  },
  methods: {
    mynftlist() {
      web3tools.getbalance(this.$store.state.NFTaddr, "NFT", num => {
        this.mynft = num;
      });
    },
    tokenurl() {
      let that = this;
      web3tools.tokenURI(
        this.$store.state.NFTaddr,
        this.$cookies.get("playerTockenId"),
        e => {
          this.$nftget(e, {}).then(res => {
            that.NFTimg = res;
          });
        }
      );
    },
    showExpBonus() {
      web3tools.showExpBonus(this.$store.state.gameaddr, e => {
        this.showBonus.reward = e;
      });
      web3tools.showBonusDone(this.$store.state.gameaddr, e => {
        this.showBonus.bool = e;
      });
    },
    getBonus() {
      web3tools.getBonus(
        this.$store.state.gameaddr,
        e => {
          this.$toast("Please wait");
          this.showBonus.bool = true;
        },
        e => {
          this.showExpBonus();
          this.$toast("Success");
        }
      );
    },
    query(arr) {
      this.list = [];
      for (let i = 0; i < arr.length; i++) {
        let tokenId = arr[i];
        web3tools.queryIsRare(this.$store.state.NFTaddr, arr[i], e => {
          let obj = [];
          if (e == 1) {
            obj["sort"] = "Rare";
          } else {
            obj["sort"] = "Ordinary";
          }
          obj["tokenId"] = tokenId;
          this.list.push(obj);
          this.$post(this.$apiUtil.openBox, {
            key: tokenId,
            rare: e == 1 ? "rarity" : "ordinary"
          }).then(res => {});
        });
      }
    },
    changeto(text) {
      this.change = text;
      this.$route.query.change = text;
      history.replaceState("", "", "/#/nft?change=" + text);
      if (this.change == "box") {
        this.boxquery();
      } else if (this.change == "rare") {
        this.NFTquery("rare");
      } else if (this.change == "ordinary") {
        this.NFTquery("ordinary");
      }
    },
    opento() {
      if (this.change == "box" && this.tokenIdarr.length != 0) {
        this.$refs.give.give = true;
        this.$refs.give.blindbox = 5;
      }
    },
    giveto() {
      if (this.change == "box" && this.tokenIdarr.length != 0) {
        this.$refs.give.give = true;
        this.$refs.give.blindbox = 1;
      } else if (this.change != "box" && this.tokenIdarr.length != 0) {
        this.$refs.give.give = true;
        this.$refs.give.blindbox = 2;
      }
    },

    boxquery() {
      this.tokenIdarr = [];
      this.nftlist = [];
      this.seobool = false;
      web3tools.getOrders(
        this.$store.state.BOXmarketaddr,
        this.$cookies.get("walletAddress"),
        tokenlist => {
          if (tokenlist == "") {
            this.querybox();
          }
          for (let n = 0; n < tokenlist.length; n++) {
            console.log("20202020202020202");
            let obj = [];
            obj["price"] = tokenlist[n].amount;
            obj["sort"] = "box";
            obj["tokenId"] = tokenlist[n].tokenId;
            if (this.change == "box") {
              _this.forgo(obj);
            }
            if (Number(tokenlist.length) - 1 == n) {
              this.querybox();
            }
          }
        }
      );
    },
    querybox() {
      let ool = 0;
      web3tools.getbalance(this.$store.state.Blindboxaddr, "box", num => {
        console.log(num);
        if (num == "" || num == 0) {
          this.seobool = true;
        }
        for (let i = 0; i < num; i++) {
          console.log("101010100101010101010");
          web3tools.tokenOfOwnerByIndex(
            this.$store.state.Blindboxaddr,
            i,
            e => {
              ool++;
              let obj = [];
              obj["tokenId"] = e;
              obj["price"] = "";
              obj["sort"] = "box";
              if (this.change == "box") {
                _this.forgo(obj);
              }
              if (num == ool) {
                this.seobool = true;
              }
            }
          );
        }
      });
    },
    NFTquery(txt) {
      this.tokenIdarr = [];
      this.nftlist = [];
      this.seobool = false;
      web3tools.showDepositeIds(this.$store.state.gameaddr, tokenlist => {
        if (tokenlist == "") {
          this.QNFTquery(txt);
        }
        for (let n = 0; n < tokenlist.length; n++) {
          console.log("22222222222222");
          web3tools.queryIsRare(
            this.$store.state.NFTaddr,
            tokenlist[n],
            sort => {
              web3tools.tokenURI(this.$store.state.NFTaddr, tokenlist[n], e => {
                this.$nftget(e, {}).then(res => {
                  console.info("res =" + res);
                  let obj = [];
                  if (res.image != "" && res.image != undefined) {
                    obj = res;
                    obj["price"] = "";
                    obj["pledge"] = 1;
                    obj["tokenId"] = tokenlist[n];
                    if (_this.change == "rare" && sort == 1) {
                      obj["sort"] = "rare";
                      if (txt == "rare") {
                        _this.forgo(obj);
                      }
                    } else if (_this.change == "ordinary" && sort != 1) {
                      obj["sort"] = "ordinary";
                      if (txt == "ordinary") {
                        _this.forgo(obj);
                      }
                    }
                    if (Number(tokenlist.length) - 1 == n) {
                      _this.QNFTquery(txt);
                    }
                  } else {
                    _this
                      .$post(_this.$apiUtil.openBox, {
                        key: tokenlist[n],
                        rare: sort == 1 ? "rarity" : "ordinary"
                      })
                      .then(res => {
                        console.log(res.data);
                        obj = res.data;
                        obj["price"] = "";
                        obj["pledge"] = 1;
                        obj["tokenId"] = tokenlist[n];
                        if (_this.change == "rare" && sort == 1) {
                          obj["sort"] = "rare";
                          if (txt == "rare") {
                            _this.forgo(obj);
                          }
                        } else if (_this.change == "ordinary" && sort != 1) {
                          obj["sort"] = "ordinary";
                          if (txt == "ordinary") {
                            _this.forgo(obj);
                          }
                        }
                        if (Number(tokenlist.length) - 1 == n) {
                          _this.QNFTquery(txt);
                        }
                      });
                  }
                });
              });
            }
          );
        }
      });
    },
    QNFTquery(txt) {
      web3tools.getOrders(
        this.$store.state.NFTmarketaddr,
        this.$cookies.get("walletAddress"),
        tokenlist => {
          if (tokenlist == "") {
            this.queryNFT(txt);
          }
          for (let n = 0; n < tokenlist.length; n++) {
            console.log("8888888888888888888");
            web3tools.queryIsRare(
              this.$store.state.NFTaddr,
              tokenlist[n].tokenId,
              sort => {
                web3tools.tokenURI(
                  this.$store.state.NFTaddr,
                  tokenlist[n].tokenId,
                  e => {
                    this.$nftget(e, {}).then(res => {
                      let obj = [];
                      if (res.image != "" && res.image != undefined) {
                        obj = res;
                        obj["price"] = tokenlist[n].amount;
                        obj["tokenId"] = tokenlist[n].tokenId;
                        obj["pledge"] = "";
                        if (_this.change == "rare" && sort == 1) {
                          obj["sort"] = "rare";
                          if (txt == "rare") {
                            _this.forgo(obj);
                          }
                        } else if (_this.change == "ordinary" && sort != 1) {
                          obj["sort"] = "ordinary";
                          if (txt == "ordinary") {
                            _this.forgo(obj);
                          }
                        }
                        if (Number(tokenlist.length) - 1 == n) {
                          _this.queryNFT(txt);
                        }
                      } else {
                        _this
                          .$post(_this.$apiUtil.openBox, {
                            key: tokenlist[n].tokenId,
                            rare: sort == 1 ? "rarity" : "ordinary"
                          })
                          .then(res => {
                            console.log(res.data);
                            obj = res.data;
                            obj["price"] = tokenlist[n].amount;
                            obj["tokenId"] = tokenlist[n].tokenId;
                            obj["pledge"] = "";
                            if (_this.change == "rare" && sort == 1) {
                              obj["sort"] = "rare";
                              if (txt == "rare") {
                                _this.forgo(obj);
                              }
                            } else if (
                              _this.change == "ordinary" &&
                              sort != 1
                            ) {
                              obj["sort"] = "ordinary";
                              if (txt == "ordinary") {
                                _this.forgo(obj);
                              }
                            }
                            if (Number(tokenlist.length) - 1 == n) {
                              _this.queryNFT(txt);
                            }
                          });
                      }
                    });
                  }
                );
              }
            );
          }
        }
      );
    },
    queryNFT(txt) {
      let ool = 0;
      web3tools.getbalance(this.$store.state.NFTaddr, "NFT", num => {
        if (num == "" || num == 0) {
          this.seobool = true;
        }
        for (let i = 0; i < num; i++) {
          web3tools.tokenOfOwnerByIndex(
            this.$store.state.NFTaddr,
            i,
            tokenId => {
              web3tools.queryIsRare(
                this.$store.state.NFTaddr,
                tokenId,
                sort => {
                  web3tools.tokenURI(this.$store.state.NFTaddr, tokenId, e => {
                    this.$nftget(e, {}).then(res => {
                      ool++;
                      let obj = [];
                      if (res.image != "" && res.image != undefined) {
                        obj = res;
                        obj["tokenId"] = tokenId;
                        obj["price"] = "";
                        obj["pledge"] = "";
                        if (_this.change == "rare" && sort == 1) {
                          obj["sort"] = "rare";
                          if (txt == "rare") {
                            _this.forgo(obj);
                       
                          }
                        } else if (_this.change == "ordinary" && sort != 1) {
                          obj["sort"] = "ordinary";
                          if (txt == "ordinary") {
                            _this.forgo(obj);
                          }
                        }
                        if (num == ool) {
                          _this.seobool = true;
                        }
                      } else {
                        _this
                          .$post(_this.$apiUtil.openBox, {
                            key: tokenId,
                            rare: sort == 1 ? "rarity" : "ordinary"
                          })
                          .then(res => {
                            obj = res.data;
                            obj["tokenId"] = tokenId;
                            obj["price"] = "";
                            obj["pledge"] = "";
                            if (_this.change == "rare" && sort == 1) {
                              obj["sort"] = "rare";
                              if (txt == "rare") {
                                _this.forgo(obj);
                              }
                            } else if (
                              _this.change == "ordinary" &&
                              sort != 1
                            ) {
                              obj["sort"] = "ordinary";
                              if (txt == "ordinary") {
                                _this.forgo(obj);
                              }
                            }
                            if (num == ool) {
                              _this.seobool = true;
                            }
                          });
                      }
                    });
                  });
                }
              );
            }
          );
        }
      });
    },
    forgo(obj) {
      if (_this.nftlist.length == 0) {
        _this.nftlist.push(obj);
        return false;
      }
      let bool = false;
      for (let a = 0; a < _this.nftlist.length; a++) {
        if (obj.tokenId == _this.nftlist[a].tokenId) {
          bool = true;
          break;
        }
        if (bool == false && _this.nftlist.length - 1 == a) {
          _this.nftlist.push(obj);
        }
      }
      console.log(_this.nftlist);
    }
  }
};
</script>

<style scoped>
.nft {
  width: 100%;
  margin-bottom: 0.93rem;
  float: left;
}

.nft .nav {
  margin: 0 0.15rem 0.12rem;
  background: #490785;
  border-radius: 0.06rem;
  border: 1px solid #c18df4;
  padding: 0.03rem;
  color: #ffffff;
  display: flex;
  justify-content: space-around;
}

.nft .nav p {
  flex: 1;
  text-align: center;
  padding: 0.1rem 0;
  border-radius: 0.06rem;
  font-size: 0.14rem;
}

.nft .nav .active {
  background: #f2c900;
  color: #000000;
}

.nft .boxopen {
  display: flex;
  justify-content: space-between;
  margin: 0 0.25rem 0.0967rem;
}

.nft .boxopen p {
  width: 1.46rem;
}

.nft .boxopen p button {
  height: 0.32rem;
  width: 1.13rem;
  font-size: 0.14rem;
  border-radius: 0.05rem;
  margin-left: 0.0333rem;
  background: linear-gradient(#ffffff, #01d5d2);
}

.nft .boxopen p:first-child button {
  float: right;
  margin-right: 0.0333rem;
  margin-left: 0;
}

.nft .top {
  background: url(../../../static/image/NFTminingBG.png);
  margin: 0.17rem 0.11rem 0;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  height: 1.9rem;
  position: relative;
}

.nft .top > h1 {
  font-size: 0.28rem;
  text-align: right;
  color: #ffffff;
  font-family: Magistral-Bold;
  padding-top: 0.34rem;
  margin-right: 0.1667rem;
  font-weight: bold;
  line-height: 0.2033rem;
}

.nft .top > h1 span {
  font-size: 0.19rem;
}

.nft .top > p {
  float: right;
  border-radius: 0.15rem;
  background: linear-gradient(#ffffff, #01d5d2);
  padding-left: 0.1rem;
  padding-right: 0.12rem;
  font-size: 0.12rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.1rem;
  margin-right: 0.1733rem;
  text-transform: uppercase;
  padding-top: 0.03rem;
  padding-bottom: 0.03rem;
  color: #570e91;
  font-family: Magistral-Bold;
  position: relative;
}
.nft .top > span {
  float: right;
  color: #ffffff;
  font-size: 0.16rem;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  margin-right: 0.1733rem;
  margin-top: 0.15rem;
}
.nft .top > span img {
  width: 0.1267rem;
  margin-left: 0.05rem;
}

.nft .top > p img {
  width: 0.16rem;
  margin-right: 0.06rem;
}
.nft .top > p span {
  font-size: 0.16rem;
  margin-left: 0.06rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 0.6rem;
}
.nft .top > p i {
  width: 0.08rem;
  height: 0.08rem;
  border-radius: 50%;
  display: block;
  background: #d71111;
  position: absolute;
  top: 0;
  right: 0;
}
.nft .top .left {
  position: absolute;
  top: 0.12rem;
  left: 0.2267rem;
}

.nft .top .img {
  width: 1.2rem;
  height: 1.2rem;
  border: 2px solid #35e7ff;
  background: #3e365d;
  border-radius: 0.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}
/*.nft .top div p {
		color: #ffffff;
		text-transform: uppercase;
		text-align: center;
	}*/

.nft .top .img img {
  width: 100%;
  height: 100%;
  border-radius: 0.1rem;
}

.nft .top .left button {
  width: 1.6rem;
  height: 0.3167rem;
  margin-top: 2px;
  color: #35e7ff;
  font-size: 0.12rem;
  text-transform: uppercase;
  background: url(../../../static/image/nftbutton.png);
  background-size: 100% 100%;
}

.nft .top > button {
  float: right;
  margin-top: 0.2rem;
  margin-right: 0.1667rem;
  border-radius: 0.15rem;
  font-size: 0.14rem;
  font-family: Magistral-Bold;
  font-weight: bold;
  background: linear-gradient(#fffc00, #db7100);
  padding: 0.05rem 0.12rem;
  margin-left: 30%;
  min-width: 1.29rem;
}

.nft .top button img {
  margin-left: 0.06rem;
  width: 0.12rem;
  height: 0.12rem;
  vertical-align: middle;
  margin-top: -0.03rem;
}

.nft .top .mine {
  background: url(../../../static/image/withdrawbutton.png);
  background-repeat: no-repeat;
  background-size: 100%;
  width: 1.29rem;
  text-transform: uppercase;
}

.nft .seo {
  margin: 0.04rem 0.14rem 0.12rem;
  background: rgba(73, 7, 133, 0.55);
  border-radius: 0.21rem;
  border: 1px solid #6a5c9e;
  height: 0.41rem;
  display: flex;
  align-items: center;
  position: relative;
}

.nft .seo input {
  color: #ffffff;
  width: 80%;
  padding: 0;
  font-size: 0.16rem;
  font-family: Magistral-Bold;
  font-weight: bold;
}

.nft .seo img {
  width: 0.16rem;
  height: 0.16rem;
  margin-left: 0.113rem;
  margin-right: 0.14rem;
}

.nft .list {
  margin: 0 0.25rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.nft .list li {
  background: url(../../../static/image/NFT2BG.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding-top: 0.1833rem;
  width: 1.46rem;
  padding-bottom: 0.2733rem;
  margin-bottom: 0.0133rem;
  position: relative;
}
.nft .list li span {
  height: 0.17rem;
  position: absolute;
  top: 0;
  left: 0.04rem;
  padding-left: 0.06rem;
  padding-right: 0.08rem;
  display: flex;
  align-items: center;
  font-size: 0.12rem;
  font-family: "Magistral-Book";
  color: #ffffff;
  background: url(../../../static/image/nftlistorder.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.nft .list li img {
  background: #3e365d;
  width: 1.04rem;
  border-radius: 0.1rem;
  border: 2px solid #35e7ff;
  display: block;
  margin: 0 auto;
  min-height: 1.04rem;
}

.nft .list li p {
  color: #ffffff;
  font-size: 0.12rem;
  margin-top: 0.06rem;
  display: flex;
  align-items: center;
  padding-left: 0.2633rem;
}

.nft .list li p input {
  width: 0.2rem;
  height: 0.2rem;
  border-radius: 0.0333rem;
  margin-right: 0.06rem;
  position: relative;
}

.nft .list li p .sell {
  width: 0;
}

.nft .list li p input::after {
  position: absolute;
  top: 0;
  background-color: #fff;
  color: #fff;
  width: 0.2rem;
  height: 0.2rem;
  display: inline-block;
  visibility: visible;
  padding-left: 0px;
  text-align: center;
  content: " ";
  box-sizing: border-box;
  border-radius: 0.0333rem;
}

.nft .list li p .sell::after {
  width: 0;
}

.nft .list li p input:checked::after {
  background-image: url(../../../static/image/nftyes.png);
  background-size: 0.1667rem;
  background-position: center;
  background-repeat: no-repeat;
}
/*.nft .list {
		float: left;
		width: 100%;
	}
	
	.nft .list>li {
		margin: 0 .12rem 0;
		background: url(../../../static/image/NFT2BG.png);
		background-repeat: no-repeat;
		background-size: 100%;
		display: flex;
		padding-bottom: .08rem;
	}
	
	.nft .list>li img {
		width: 1.04rem;
		height: .86rem;
		border: 2px solid #35E7FF;
		border-radius: .1rem;
		margin: .12rem .1967rem .1267rem .11rem;
		background: #3E365D;
	}
	
	.nft .list>li .right {
		position: relative;
		width: 100%;
		padding-right: .2767rem;
		flex: 1;
	}
	
	.nft .list>li .right h1 {
		color: #ffffff;
		font-size: .14rem;
		margin-top: .25rem;
		width: 40%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-family: Magistral-Medium;
	}
	
	.nft .list>li .right p {
		margin-top: .22rem;
		font-size: .14rem;
		color: #ffffff;
		font-family: Magistral-Medium;
		line-height: .1033rem;
	}
	
	.nft .list>li .right span {
		margin-top: .2133rem;
		display: block;
		font-size: .12rem;
		color: #ffffff;
		font-family: Magistral-Book;
		text-transform: uppercase;
		line-height: .09rem;
	}
	
	.nft .list>li .right ol {
		height: .0867rem;
		border-radius: .045rem;
		margin-top: .04rem;
		border: 1px solid #35E7FF;
	}
	
	.nft .list>li .right ol li {
		width: 0%;
		height: 100%;
		border-radius: .045rem;
		display: block;
		background: linear-gradient(#00FD12, #06D501);
		margin-top: .001rem;
	}
	
	.nft .list>li .right div {
		position: absolute;
		right: .27rem;
		top: .2567rem;
		width: .8463rem;
	}
	
	.nft .list>li .right div button {
		width: 100%;
		height: .1723rem;
		font-size: .12rem;
		font-weight: bold;
		text-transform: uppercase;
		background: linear-gradient(#F2F047, #1ED94F);
		border-radius: .0862rem;
		font-family: Magistral-Bold;
	}
	
	.nft .list>li .right div button a {
		font-size: .12rem;
		font-family: Magistral-Bold;
	}
	
	.nft .list>li .right div button:first-child {
		margin-bottom: .0833rem;
		background: linear-gradient(#FFFC00, #DB7100);
	}*/
</style>
