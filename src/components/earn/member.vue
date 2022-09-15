<template>
  <div class="member">
      <header> 
      <img
        @click="$router.back(-1)"
        src="../../../static/image/headerback.png"
        v-music
      />
      <p>{{ $t("edividendrights") }}</p>
    </header>
    <div class="top">
      <p>
        <span>{{ $t("eLEVEL") }} {{ level }}</span>
        <!-- <span>{{ $t("eLMVMember") }}</span> -->

        <img v-if="level <= 2  " src="../../assets/nftClub/userIcon.png" alt="" class="grade-img" />
        <img v-else-if="nftlist.length >= 1 && level >= 3 && level < 5 " src="../../assets/nftClub/broker.png" alt="" class="grade-img"/>
        <img v-else-if="nftlist.length >= 1 && level >= 5 &&  level < 7 " src="../../assets/nftClub/culld.png" alt="" class="grade-img" />
        <img v-else-if="nftlist.length >= 1 && level >= 7" src="../../assets/nftClub/SubDAO.png" alt="" class="grade-img" />
     
      </p>
      <div class="operation">
        <div class="left">
          <img src="../../../static/image/LMV.png" />
          <p>LMV : {{ LMV }}</p>
        </div>
        <div class="right">
          <!-- <p v-if="$store.state.environment=='production'" @click="$parent.$refs['pop'].pop=true" v-music>invite friends</p>
            -->
         <!-- <p @click="invitation = true" v-music>{{ $t("einvitefriends") }}</p> -->
       

          <!-- <div class="bottom">
            <div
              class="bottom-bg"
              style="margin-right:10px;text-align: center;width: 60px;"
              @click.stop="$parent.$refs['pop'].pop = true"
              v-html="$t('ebecomeaPartner')"
              v-music
            ></div>
            <div
              class="bottom-bg"
              style="margin-left:10px"
              @click.stop="$parent.$refs['pop'].pop = true"
              v-music
            >
              {{ $t("eformaunion") }}
            </div>
          </div> -->
          

       <!-- <button type="button"     @click="$parent.$refs['pop'].pop=true" v-music>Invite friends list</button> -->
     
       <!-- <button type="button" @click="$router.push('/friend')" v-music>
           {{ $t("eInvitefriendslist") }}
        </button> -->


          <div class="bottom">
            <div class="bottom-bg">
              <div type="button" @click="mint = true">
                {{ $t("eMint") }}
              </div>
            </div>

            <div class="bottom-bg">
              <div type="button" @click="withdraw = true">
                {{ $t("eRedeem") }}
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>

    <ul>
      <li class="bottom-list">
        <p>{{ $t("eRebateRewards") }}</p>
        <button
          type="button"
          @click.stop="$parent.$refs['pop'].pop = true"
          v-music
        >
          {{ $t("eReceive") }}
        </button>
      </li>
      <li>
        <p>{{ $t("eFriendDividends") }}</p>
        <button
          type="button"
          @click.stop="$parent.$refs['pop'].pop = true"
          v-music
        >
          {{ $t("eReceive") }}
        </button>
      </li>
      <li>
        <p>{{ $t("eMenberDividends") }}</p>
        <button
          type="button"
          @click="$router.push('/memberlist?type=member')"
          v-music
        >
          {{ $t("eReceive") }}
        </button>
      </li>
        <li>
        <p v-if="level <= 2 ">{{ $t("UpgradeBroker") }}</p>
        <p v-else-if="nftlist.length >= 1 && level >= 3 && level < 5 ">{{ $t("UpgradeBroker") }}</p>
        <p v-else-if="nftlist.length >= 1 && level >= 5 &&  level < 7 ">{{ $t("UpgradeBroker1") }}</p>
         <p v-else-if="nftlist.length >= 1 && level >= 7 ">{{ $t("UpgradeBroker2") }}</p>
        <button
          type="button"
          @click.stop="$parent.$refs['pop'].pop = true"
          v-music
        >
            {{ $t("GO") }}
        </button>
      </li>
    </ul>

    

    <div class="memberpop" v-if="mint">
      <div class="memberin">
        <img src="../../../static/image/memberback.png" @click="mint = false" />
        <h1>{{ $t("eMint") }} LMV</h1>
        <p>
          {{ $t("eExisting") }} LMT: {{ parseFloat(Number(LMT).toFixed(4)) }}
        </p>
        <div>
          <p>
            <input
              type="text"
              v-model="amount"
              v-on:input="inputFunc()"
              onkeyup="this.value=this.value.replace(/[^\d]/g,'') "
              onafterpaste="this.value=this.value.replace(/[^\d]/g,'') "
            /><span
              @click="
                amount =
                  parseInt(Number(LMT)) -
                  (parseInt(Number(LMT)) % Number(proportion))
              "
              v-music
              >{{ $t("eMAX") }}</span
            >
          </p>
          <button
            v-if="approvebool == false"
            type="button"
            @click="approve($event)"
            v-movedown
            v-music
            v-preventReClick
          >
            {{ $t("eAPPROVE") }}
          </button>
          <button
            v-else
            type="button"
            @click="deposit($event)"
            v-movedown
            v-music
            v-preventReClick
          >
            {{ $t("eMint") }}
          </button>
        </div>
        <span v-if="$i18n.locale == 'en'"
          >Please input an integer that can be divided by {{ proportion }}</span
        >
        <span v-if="$i18n.locale == 'zh'"
          >請輸入能被{{ proportion }}除以的整數</span
        >
      </div>
    </div>
    <div class="memberpop" v-if="withdraw">
      <div class="memberin">
        <img
          src="../../../static/image/memberback.png"
          @click="withdraw = false"
        />
        <h1>{{ $t("eredemption") }}</h1>
        <p>{{ $t("eMinted") }} LMT: {{ Number(LMV) * Number(proportion) }}</p>
        <div>
          <p>
            <input
              type="text"
              v-model="redeemamount"
              onkeyup="this.value=this.value.replace(/[^\d]/g,'') "
              onafterpaste="this.value=this.value.replace(/[^\d]/g,'') "
            /><span
              @click="
                redeemamount =
                  parseInt(Number(LMV) * Number(proportion)) -
                  (parseInt(Number(LMV) * Number(proportion)) %
                    Number(proportion))
              "
              v-music
              >{{ $t("eMAX") }}</span
            >
          </p>
          <button
            type="button"
            @click="redeem($event)"
            v-movedown
            v-music
            v-preventReClick
          >
            {{ $t("eredemption") }}
          </button>
        </div>
        <span v-if="$i18n.locale == 'en'"
          >Please input an integer that can be divided by {{ proportion }}</span
        >
        <span v-if="$i18n.locale == 'zh'"
          >請輸入能被{{ proportion }}除以的整數</span
        >
      </div>
    </div>
    <invitation v-if="invitation"></invitation>
  </div>
</template>

<script>
import web3tools from "../../web3/web3tools";
import invitation from "./invitation";
let that;
export default {
  components: {
    invitation
  },
  data() {
    return {
      statusImg:false,
      mint: false,
      withdraw: false,
      invitation: false,
      LMV: 0,
      LMT: 0,
      amount: "",
      redeemamount: "",
      approvebool: false,
      approvebalance: 0,
      proportion: 1000,
      level: 0,
      nftlist:[],
    };
  },
  mounted() {
    this.getbalance();
    this.getlevel();
    this.NFTquery("rare");
    var a = 6
    if(a >= 0){
       console.log(a)
    }else if(a  >= 2){
       console.log(a)
    }else if(a  >= 3){
       console.log(a)
    }else if(a  >= 5){
        console.log(a)
    }
  },
  methods: {
    getlevel() {
      this.$post(this.$apiUtil.getMemberLevel, {
        playerId: this.$cookies.get("playerId"),
        walletAddress: this.$cookies.get("walletAddress")
      }).then(res => {
        this.level = res.data;
      });
    },
    redeem(event) {
      if (
        Number(this.redeemamount) % Number(this.proportion) != 0 ||
        this.redeemamount == ""
      ) {
        this.$toast("Amount is incorrect");
        return false;
      }
      if (
        Number(this.redeemamount) >
        Number(this.LMV) * Number(this.proportion)
      ) {
        this.$toast("Number exceeds minted limit");
        return false;
      }

      web3tools.redeem(
        this.$store.state.LMVaddr,
        Number(this.redeemamount) / Number(this.proportion),
        e => {
          this.$toast("Please wait");
          $(event.target).addClass("preventReClick");
        },
        e => {
          $(event.target).removeClass("preventReClick");
          this.getbalance();
          this.withdraw = false;
          this.redeemamount = "";
        }
      );
    },
    deposit(event) {
      if (
        Number(this.amount) % Number(this.proportion) != 0 ||
        this.amount == ""
      ) {
        this.$toast("Amount is incorrect");
        return false;
      }
      web3tools.LMVdeposit(
        this.$store.state.LMVaddr,
        this.amount,
        e => {
          this.$toast("Please wait");
          $(event.target).addClass("preventReClick");
        },
        e => {
          $(event.target).removeClass("preventReClick");
          this.getbalance();
          this.mint = false;
          this.amount = "";
        }
      );
    },
    approve(event) {
      if (
        Number(this.amount) % Number(this.proportion) != 0 ||
        this.amount == ""
      ) {
        this.$toast("Amount is incorrect");
        return false;
      }
      web3tools.approve(
        this.$store.state.LMTaddr,
        this.$store.state.LMVaddr,
        Number(this.amount) * 10,
        e => {
          this.$toast("Please wait");
          $(event.target).addClass("preventReClick");
        },
        e => {
          this.approvebool = true;
          $(event.target).removeClass("preventReClick");
          this.getbalance();
        }
      );
    },
    getbalance() {
      web3tools.getbalance(this.$store.state.LMVaddr, "LMV", balance => {
        this.LMV = balance;
      });
      web3tools.getbalance(this.$store.state.LMTaddr, "LMT", balance => {
        this.LMT = balance;
      });
      web3tools.allowance(
        this.$store.state.LMTaddr,
        this.$cookies.get("walletAddress"),
        this.$store.state.LMVaddr,
        approve => {
          this.approvebalance = approve;
        }
      );
    },
    inputFunc() {
      //				if(Number(this.amount)%Number(this.proportion)!=0){
      //					this.amount=Number(this.amount)*Number(this.proportion)
      //				}
      if (Number(this.approvebalance) >= Number(this.amount)) {
        this.approvebool = true;
      } else {
        this.approvebool = false;
      }
    },
    handleInput(e) {
      if (
        e.target.value != "" &&
        e.key == "." &&
        -1 == e.target.value.indexOf(".")
      ) {
        return;
      }
      if (
        e.target.value.toString() !==
        e.target.value.match(/^\d*(\.?\d{0,3})/g)[0]
      ) {
        e.target.value = e.target.value.match(/^\d*(\.?\d{0,3})/g)[0] || null;
      }
      //			e.target.value = e.target.value.match(/^\d*(\.?\d{0,2})/g)[0] || null;
    },
    NFTquery(txt) {
      this.change = txt;
      // this.$route.query.change = txt;
      let _this = this;
      if (txt == "rare") {
        this.nftlist = [];
      }
      this.numOverall = 0;
      this.seobool = false;
      web3tools.showDepositeIds(this.$store.state.gameaddr, tokenlist => {
        if (tokenlist == "") {
          this.QNFTquery(txt);
        }
        for (let n = 0; n < tokenlist.length; n++) {
          web3tools.queryIsRare(
            this.$store.state.NFTaddr,
            tokenlist[n],
            sort => {
              web3tools.tokenURI(this.$store.state.NFTaddr, tokenlist[n], e => {
                this.$nftget(e, {}).then(res => {
                  let obj = this.obj;
                  if (res.image != "" && res.image != undefined) {
                    obj = res;
                    obj["price"] = "";
                    obj["pledge"] = 1;
                    obj["tokenId"] = tokenlist[n];
                    if (txt == "rare" && sort == 1) {
                      obj["sort"] = "rare";
                      if (txt == "rare") {
                        _this.forgo(obj);
                      }
                    } else if (txt == "ordinary" && sort != 1) {
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
                        obj = res.data;
                        obj["price"] = "";
                        obj["pledge"] = 1;
                        obj["tokenId"] = tokenlist[n];
                        if (txt == "rare" && sort == 1) {
                          obj["sort"] = "rare";
                          if (txt == "rare") {
                            _this.forgo(obj);
                          }
                        } else if (txt == "ordinary" && sort != 1) {
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
      let _this = this;
      web3tools.getOrders(
        this.$store.state.NFTmarketaddr,
        this.$cookies.get("walletAddress"),
        tokenlist => {
          if (tokenlist == "") {
            this.queryNFT(txt);
          }
          for (let n = 0; n < tokenlist.length; n++) {
            web3tools.queryIsRare(
              this.$store.state.NFTaddr,
              tokenlist[n].tokenId,
              sort => {
                web3tools.tokenURI(
                  this.$store.state.NFTaddr,
                  tokenlist[n].tokenId,
                  e => {
                    this.$nftget(e, {}).then(res => {
                      let obj = this.obj;
                      if (res.image != "" && res.image != undefined) {
                        obj = res;
                        obj["price"] = tokenlist[n].amount;
                        obj["tokenId"] = tokenlist[n].tokenId;
                        obj["pledge"] = "";
                        if (txt == "rare" && sort == 1) {
                          obj["sort"] = "rare";
                          if (txt == "rare") {
                            _this.forgo(obj);
                          }
                        } else if (txt == "ordinary" && sort != 1) {
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
                            obj = res.data;
                            obj["price"] = tokenlist[n].amount;
                            obj["tokenId"] = tokenlist[n].tokenId;
                            obj["pledge"] = "";
                            if (txt == "rare" && sort == 1) {
                              obj["sort"] = "rare";
                              if (txt == "rare") {
                                _this.forgo(obj);
                              }
                            } else if (txt == "ordinary" && sort != 1) {
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
      let _this = this;
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
                      let obj = this.obj;
                      if (res.image != "" && res.image != undefined) {
                        obj = res;
                        obj["tokenId"] = tokenId;
                        obj["price"] = "";
                        obj["pledge"] = "";
                        if (txt == "rare" && sort == 1) {
                          obj["sort"] = "rare";
                          if (txt == "rare") {
                            _this.forgo(obj);
                          }
                        } else if (txt == "ordinary" && sort != 1) {
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
                            if (txt == "rare" && sort == 1) {
                              obj["sort"] = "rare";
                              if (txt == "rare") {
                                _this.forgo(obj);
                              }
                            } else if (txt == "ordinary" && sort != 1) {
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
      let _this = this;
      if (_this.nftlist.length == 0) {
        web3tools.isApprovedForAll(
          this.$store.state.NFTaddr,
          this.$cookies.get("walletAddress"),
          this.$store.state.gameaddr,
          e => {
            web3tools.nftInfo(this.$store.state.gameaddr, obj.tokenId, res => {
              // if (obj.sort == "ordinary") {
              //   obj["profit"] = this.levelFn(obj.level);
              //   this.overallFn(obj.level);
              // } else {
              //   // obj["profit"] = this.levelRareFn(obj.level);
              //   this.overallRareFn(obj.level);
              // }
              obj["isLink"] = res._isLink;
              obj["isDepos"] = res._isDepos;
              obj["approvebool"] = e;
              _this.nftlist.push(obj);
              console.log(_this.nftlist,"ssssssssss")
            });
          }
        );
        return false;
      }
      let bool = false;
      for (let a = 0; a < _this.nftlist.length; a++) {
        if (obj.tokenId == _this.nftlist[a].tokenId) {
          bool = true;
          break;
        }
        if (bool == false && _this.nftlist.length - 1 == a) {
          web3tools.isApprovedForAll(
            this.$store.state.NFTaddr,
            this.$cookies.get("walletAddress"),
            this.$store.state.gameaddr,
            e => {
              web3tools.nftInfo(
                this.$store.state.gameaddr,
                obj.tokenId,
                res => {
                  // if (obj.sort == "ordinary") {
                  //   obj["profit"] = this.levelFn(obj.level);
                  //   this.overallFn(obj.level);
                  // } else {
                  //   obj["profit"] = this.levelRareFn(obj.level);
                  //   this.overallRareFn(obj.level);
                  // }
                  obj["isLink"] = res._isLink;
                  obj["isDepos"] = res._isDepos;
                  obj["approvebool"] = e;
                  _this.nftlist.push(obj);
                  console.log(_this.nftlist,"ssssssssss")
                }
              );
            }
          );
        }
      }
     
    },
  },
  
};
</script>

<style scoped>
  .grade-img{
      width: 166px;
      height: 45px;
  }
.member .top {
  background: url(../../../static/image/meber.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  margin: 0.1rem 0.11rem 10pc;
  padding-bottom: 0.12rem;

}

.member .top > p {
  font-size: 0.16rem;
  color: #ffffff;
  display: flex;
  justify-content: space-between;
  margin: 0 0.3rem 0;
  padding-top: 0.12rem;
}

.member .top > p span:first-child {
  text-transform: uppercase;
}

.member .top .operation {
  display: flex;
  justify-content: space-between;
  margin: 20px .18rem 0 0.3rem;
  align-items: flex-end;
}

.member .top .operation .left img {
  width: 0.5rem;
  display: block;
  margin: 0 auto;
}

.member .top .operation .left p {
  margin-top: 0.12rem;
  font-size: 0.16rem;
  color: #ffffff;
}

.member .top .operation .right p {
  width: 1.64rem;
  height: 0.3rem;
  /* border: 1px solid #ffffff; */
  border-radius: 0.0667rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.16rem;
  color: #ffffff;
  text-transform: uppercase;
}

.member .top .operation .right div {
  /* margin-top: 0.07rem; */
  /* display: flex;
  justify-content: space-between; */
}

.member .top .operation .right div button {
  background: linear-gradient(#fffc00, #db7100);
  height: 0.28rem;
  border-radius: 0.14rem;
  font-size: 0.12rem;
  padding: 0 0.22rem;
}

.member ul li {
  margin: 0 0.15rem 0.07rem;
  border: 1px solid #c18df4;
  border-radius: 0.0667rem;
  background: rgba(73, 7, 133, 0.9);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.14rem;
}

.member ul li p {
  font-size: 0.16rem;
  color: #ffffff;
}

.member ul li p span {
  margin-left: 0.07rem;
}

.member ul li button {
  background: #f2c900;
  width: 0.7rem;
  height: 0.3rem;
  border-radius: 0.05rem;
  margin: 0.0667rem 0;
}

.member .bottom {
  /* margin: 0.51rem 0.1867rem 0; */
  /* display: flex; */
  /* justify-content: space-between; */
  margin-bottom: 20px;
}
.bottom-list {
  text-align: center;
  /* display: flex; */
  /* justify-content: center;
  align-items: center; */
  background: url(../../../static/image/915button.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;

  /* text-align: center;
  line-height: 30px;
  color: #ffffff;
  font-size: 12px; */
}
.bottom-bg {
  background: url(../../../static/image/915button.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding: 0 20px;
  width: 80px;
  height: 30px;
  text-align: center;
  line-height: 30px !important;
  color: #ffffff;
  margin-top: 10px !important;
  justify-content: center;
  align-items: center;
  display: flex;
  border-radius: 10px;
  /*color: #ffffff;
  font-size: 12px; */
}
.member .bottom {
  /* text-align: center; */
  /* display: flex; */
  /* justify-content: center;
  align-items: center;*/
  margin-right: 35px; 
}
.member .bottom div {
 /*  background: linear-gradient(#fffc00, #db7100);  */


  /*font-size: 0.12rem;
  color: #ffffff;
  padding: 0 10px;
  height: 0.27rem;
  line-height: 0.27rem;
  border-radius: 0.215rem;
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 20px;*/
}

.member .bottom button:first-child {
  font-size: 0.12rem;
}

.memberpop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(5, 0, 9, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

.memberpop .memberin {
  background: url(../../../static/image/memberpop.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  flex: 1;
  margin: 0 0.28rem;
  position: relative;
  padding-bottom: 0.33rem;
}

.memberpop .memberin > img {
  position: absolute;
  width: 0.1833rem;
  right: 0.1667rem;
  top: 0.15rem;
}

.memberpop .memberin h1 {
  text-align: center;
  margin-top: 0.25rem;
  color: #f2c900;
  font-size: 0.2rem;
  text-transform: uppercase;
  margin-bottom: 0.55rem;
  font-family: "Magistral-Bold";
}

.memberpop .memberin > p {
  text-align: center;
  color: #ffffff;
  font-size: 0.16rem;
  text-transform: uppercase;
  margin-bottom: 0.22rem;
}

.memberpop .memberin div {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 0.22rem;
}

.memberpop .memberin div p {
  border: 1px solid #35e7ff;
  border-radius: 0.0667rem;
  background: #4b0082;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 0.3367rem;
  padding: 0 0.0663rem;
  flex: 1;
}

.memberpop .memberin div p input {
  font-size: 0.16rem;
  color: #ffffff;
  flex: 1;
  width: 1rem;
  margin-right: 0.1rem;
}

.memberpop .memberin div p span {
  font-size: 0.16rem;
  color: #ffffff;
  width: 0.5rem;
  display: block;
}

.memberpop .memberin button {
  width: 1.2rem;
  height: 0.4rem;
  border-radius: 0.0667rem;
  background: linear-gradient(#fffc00, #db7100);
  font-size: 0.16rem;
  text-transform: uppercase;
  margin-left: 0.2rem;
  flex: none;
}
.memberpop .memberin > span {
  display: block;
  text-align: center;
  color: #ffffff;
  font-size: 0.14rem;
  margin-top: 0.1rem;
}
.member > button {
  margin: 0.17rem 0.18rem 0;
  width: -webkit-fill-available;
  height: 0.46rem;
  border-radius: 0.23rem;
  background: linear-gradient(#fffc00, #db7100);
  font-size: 0.16rem;
  text-transform: uppercase;
}
</style>
