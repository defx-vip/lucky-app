<template>
  <div class="invitation">
    <header>
      <img
        @click="$router.back(-1)"
        src="../../../static/image/headerback.png"
        v-music
      />
      <p>NFT CLUB</p>
    </header>

    <div class="content">
      <div class="nftBg">
        <div class="title_fx">
          <div class="penson">
            <span> {{ $t("mining") }}</span>
            <img src="../../assets/nftClub/penson.png" alt="" />
          </div>
          <div class="userIcon">
            <img
              src="../../assets/nftClub/wei.png"
              v-if="weekCount < totalCount"
            />
            <img src="../../assets/nftClub/userIcon.png" v-else />
          </div>
        </div>

        <div class="right-activity" v-if="weekCount < totalCount">
          {{ $t("Activity") }}: <span>{{ weekCount }}/{{ totalCount }}</span>
        </div>

        <div class="right-activity" v-else>
          {{ $t("Activity") }}: <span>{{ $t("Unlocked") }}</span>
        </div>

        <div class="exhibition" v-if="statusTable == 1">
          <div class="bition-number">
            <div>{{ $t("total1") }}</div>
            <p>{{ nftlist.length }}</p>
          </div>
          <div class="bition-number">
            <div>{{ $t("myPledgeAmount1") }}</div>
            <p>{{ numberTatel || 0 }}</p>
          </div>
          <div class="bition-number"  style="border:0">
            <div>{{ $t("finalStrength1") }}</div>
            <p>{{ calculatingPowerNum || 0 }}</p>
          </div>
        </div>

        <div class="exhibition" v-if="statusTable == 2">
          <div class="bition-number">
            <div>{{ $t("total") }}</div>
            <p>{{ paramData.total || 0 }}</p>
          </div>
          <div class="bition-number">
            <div>{{ $t("pledgedTwo") }}</div>
            <p>{{ paramData.pleg || 0 }}</p>
          </div>
          <div class="bition-number  "  style="border:0">
            <div>{{ $t("Numberofteam") }}</div>
            <p> {{ $t("Getting") }}</p>
            <!-- {{ nftQuantity || 0 }}  -->
          </div>
        </div>

        <div class="exhibition" v-if="statusTable == 3">
          <div class="bition-number">
            <div>{{ $t("total") }}</div>
            <p>{{ paramData.total || 0 }}</p>
          </div>
          <div class="bition-number">
            <div>{{ $t("pledgedTwo") }}</div>
            <p>{{ paramData.pleg || 0 }}</p>
          </div>
          <div class="bition-number  "  style="border:0">
            <div>{{ $t("Totalteampower") }}</div>
            <p>{{ $t("Getting") }}</p>
          </div>
        </div>

        <div class="balance">
          <div>
            <!-- 总收入 -->
            <div class="earnings" v-if="statusTable == 1">
              <span class="yellow"> {{ $t("personalIncome1") }} : </span>
              <span>{{ showBonus.reward }}</span>
            </div>

            <div class="earnings" v-if="statusTable == 2">
              <span class="yellow">{{ $t("TotalRevenueTwo") }}:</span
              ><span>{{ paramData.received }}</span>
            </div>

            <div class="earnings" v-if="statusTable == 3">
              <span class="yellow">{{ $t("Directtotalrevenue") }}:</span>
              <span>{{ paramData.receivedFriend }}</span>
            </div>

            <div class="earnings" v-if="statusTable == 3">
              <span class="yellow">{{ $t("today") }}:</span>
              <span>{{ paramData.receivedTeam }}</span>
            </div>
          </div>
         
          <div class="harvest" v-if="(statusTable == 1 || statusTable == 3 )  && showBonus.bool">
            {{ numTime }}
          </div>

          <div
            class="harvest11"
            @click="getBonus()"
            v-if=" (statusTable == 1 || statusTable == 3 ) && showBonus.bool == false"
          >
            {{ $t("harvest") }}
          </div>
        </div>
        <div class="myNft">
          <div
            v-music
            :class="statusTable == 1 ? 'my' : 'friends'"
            @click="changListFn(1)"
          >
            <span v-if="statusTable == 1"> {{ $t("mine") }} </span>
            <span v-else>{{ $t("mine") }} </span>
          </div>

          <div
            v-music
            :class="statusTable == 2 ? 'my' : 'friends'"
            @click="changListFn(2)"
          >
            <span> {{ $t("friends") }} </span>
          </div>

          <div
            v-music
            :class="statusTable == 3 ? 'my' : 'friends'"
            @click="changListFn(3)"
          >
            <span> {{ $t("rebateReward") }} </span>
          </div>

          <!-- <a
            class="friends"
            @click.stop="$parent.$refs['notActive'].notActive = true"
            v-music
            >{{ $t("rebateReward") }}
          </a> -->
        </div>

        <MyPledgeList
          v-if="statusTable == 1"
          :list="nftlist"
          @changListFn="changListFn"
        >
        </MyPledgeList>

        <!-- 朋友的nft -->
        <FriendsPledgeList
          v-if="statusTable == 2"
          :list="listTow"
          @queryInitFriends="queryInitFriends"
        ></FriendsPledgeList>

        <!-- 朋友nft -->
        <TeamPledgeList
          v-if="statusTable == 3"
          :list="listThress"
          @queryInitNft="queryInitNft"
        ></TeamPledgeList>

        <div class="change"></div>
      </div>
    </div>
  </div>
</template>
<script>
import FriendsPledgeList from "./components/FriendsPledgeList.vue";
import MyPledgeList from "./components/MyPledgeList.vue";
import TeamPledgeList from "./components/TeamPledgeList.vue";
import web3tools from "../../web3/web3tools";

export default {
  components: {
    MyPledgeList,
    FriendsPledgeList,
    TeamPledgeList
  },
  data() {
    return {
      statusTable: 1,
      nftlist: [],
      listTow: [],
      listThress: [],
      total: 1,
      pages: 1,
      pageNft: 1,
      pageFriends: 1,
      seobool: false,
      numOverall: 0,
      paramData: {
        ertoday: "", //今天收的
        myComputer: "", //是工会等级
        pleg: "", //是总质押nft
        received: "", //received叠加总的收入
        total: "" //团队总人数
      },
      nextbool: false,
      showBonus: {
        reward: "",
        bool: ""
      },
      tokenIdarr: [],
      change: this.$route.query.change,
      obj: [],
      dataPledge: "",
      approvebool: false,
      nftQuantity: 0,
      // timestamp: new Date().getTime(), // 当前
      // stamp: new Date(
      //   new Date().setHours(0, 0, 0, 0) + 24 * 60 * 60 * 1000 - 1
      // ).getTime(), // 每天晚上的23：59：59点
      numTime: "",
      numTimeStatus: false,
      totalCount: "",
      weekCount: "",
      calculatingPowerNum:"",
    };
  },
  created() {
    this.queryInit();
    this.showExpBonus();
    this.NFTquery("rare");
    this.NFTquery("ordinary");
    // this.timeFrom();
    this.setRegular(this.timestamp);
    setInterval(() => {
      this.setRegular();
    }, 1000);
    this.getBlindFn();
    this.myCalculatingPower();
  },
  methods: {
    // 我的总算力
       myCalculatingPower(){
        // NFTaddr
          web3tools.userTotalHashToken(this.$store.state.gameaddr,  num => {
                this.calculatingPowerNum =  (num/1e8).toFixed(2) 
          });
      },
    getBlindFn() {
      this.$post(this.$apiUtil.getBlindBoxTaskForWeekProgress, {
        playerId: this.$cookies.get("playerId")
      }).then(res => {
        if (res && res.data) {
          this.totalCount = res.data.param.totalCount;
          if (res.data.param.weekCount > res.data.param.totalCount) {
            this.weekCount = res.data.param.totalCount;
          } else {
            this.weekCount = res.data.param.weekCount;
          }
        }
      });
    },
    setRegular() {
      const day = 1000 * 60 * 60 * 24;
      let executeTime = parseInt(new Date().getTime() / day) * day + day;
      // let time = new Date().setHours(8, 0, 0, 0);
      this.format(executeTime - new Date().getTime() / 1000);
    },
    format(second) {
      second = second > 0 ? second : 0;
      //定义变量 d,h,m,s保存倒计时的时间
      let h, m, s;
      h = Math.floor((second / 60 / 60) % 24);
      m = Math.floor((second / 60) % 60);
      s = Math.floor(second % 60);
      this.numTime = `${h < 10 ? "0" + h : h}:${m < 10 ? "0" + m : m}:${
        s < 10 ? "0" + s : s
      }`;
    },
    roleLevel(id) {
      web3tools.nftInfo(this.$store.state.gameaddr, id, e => {
        return e;
      });
      web3tools.isApprovedForAll(
        this.$store.state.NFTaddr,
        this.$cookies.get("walletAddress"),
        this.$store.state.gameaddr,
        e => {
          this.approvebool = e;
        }
      );
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

    showExpBonus() {
      web3tools.showExpBonus(this.$store.state.gameaddr, e => {
        this.showBonus.reward = e;
      });
      web3tools.showBonusDone(this.$store.state.gameaddr, e => {
        this.showBonus.bool = e;
      });
    },
    // 头部信息
    queryInit() {
      this.$post(this.$apiUtil.getRebateRewardTopInfo, {
        playerId: this.$cookies.get("playerId")
      }).then(res => {
        if (res && res.data && res.data.param) {
          this.paramData = res.data.param;
          
        }
      });
    },

    // 朋友的nft
    queryInitFriends() {
      if (this.nextbool == true) {
        return false;
      }
      this.nextbool = true;
      this.$post(this.$apiUtil.getRebateRewardFriendsInfo, {
        playerId: this.$cookies.get("playerId"),
        pageSize: 10,
        pageNum: this.pageFriends
      }).then(res => {
        res.data.lst;
        for (let i = 0; i < res.data.lst.length; i++) {
          this.nftQuantity += Number(res.data.lst[i].team_deposite_nft_count);
          this.listTow.push(res.data.lst[i]);
        }
        this.pageFriends = this.pageFriends + 1;
        this.nextbool = false;
      });
    },

    // 质押
    queryInitNft() {
      if (this.nextbool == true) {
        return false;
      }
      this.nextbool = true;
      this.$post(this.$apiUtil.getRebateRewardInfoList, {
        playerId: this.$cookies.get("playerId"),
        pageSize: 10,
        pageNum: this.pageNft
      }).then(res => {
        for (let i = 0; i < res.data.lst.length; i++) {
          this.listThress.push(res.data.lst[i]);
        }
        this.pageNft = this.pageNft + 1;
        this.nextbool = false;
      });
    },

    changListFn(type) {
      if (type == 1) {
        this.NFTquery("rare");
        this.NFTquery("ordinary");
      } else if (type == 2) {
        this.queryInitFriends();
      } else if (type == 3) {
        this.queryInitNft();
      }
      this.statusTable = type;
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
              if (obj.sort == "ordinary") {
                obj["profit"] = this.levelFn(obj.level);
                this.overallFn(obj.level);
              } else {
                obj["profit"] = this.levelRareFn(obj.level);
                this.overallRareFn(obj.level);
              }
              obj["isLink"] = res._isLink;
              obj["isDepos"] = res._isDepos;
              obj["approvebool"] = e;
              _this.nftlist.push(obj);
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
                  if (obj.sort == "ordinary") {
                    obj["profit"] = this.levelFn(obj.level);
                    this.overallFn(obj.level);
                  } else {
                    obj["profit"] = this.levelRareFn(obj.level);
                    this.overallRareFn(obj.level);
                  }
                  obj["isLink"] = res._isLink;
                  obj["isDepos"] = res._isDepos;
                  obj["approvebool"] = e;
                  _this.nftlist.push(obj);
                }
              );
            }
          );
        }
      }
    },

    // 计算日收益 普通
    levelFn(level) {
      if (level == "1") {
        return 1.82;
      } else if (level == "2") {
        return 9.13;
      } else if (level == "3") {
        return 20.09;
      } else if (level == "4") {
        return 34.7;
      } else if (level == "5") {
        return 52.96;
      } else if (level == "6") {
        return 74.88;
      } else if (level == "7") {
        return 100.45;
      } else if (level == "8") {
        return 129.68;
      } else if (level == "9") {
        return 162.55;
      } else if (level == "10") {
        return 199.08;
      }
    },
    // 我的总算力普通
    overallFn(level) {
      if (level == "1") {
        this.numOverall += 1;
      } else if (level == "2") {
        this.numOverall += 5;
      } else if (level == "3") {
        this.numOverall += 11;
      } else if (level == "4") {
        this.numOverall += 19;
      } else if (level == "5") {
        this.numOverall += 29;
      } else if (level == "6") {
        this.numOverall += 41;
      } else if (level == "7") {
        this.numOverall += 55;
      } else if (level == "8") {
        this.numOverall += 71;
      } else if (level == "9") {
        this.numOverall += 89;
      } else if (level == "10") {
        this.numOverall += 109;
      }
    },
    // 稀有 收益
    levelRareFn(level) {
      if (level == "1") {
        return 1.82;
      } else if (level == "2") {
        return 43.83;
      } else if (level == "3") {
        return 89.49;
      } else if (level == "4") {
        return 138.81;
      } else if (level == "5") {
        return 191.78;
      } else if (level == "6") {
        return 248.4;
      } else if (level == "7") {
        return 308.6;
      } else if (level == "8") {
        return 372.6;
      } else if (level == "9") {
        return 440.18;
      } else if (level == "10") {
        return 511.41;
      }
    },
    // 稀有 算力
    overallRareFn(level) {
      if (level == "1") {
        this.numOverall += 1;
      } else if (level == "2") {
        this.numOverall += 24;
      } else if (level == "3") {
        this.numOverall += 49;
      } else if (level == "4") {
        this.numOverall += 76;
      } else if (level == "5") {
        this.numOverall += 105;
      } else if (level == "6") {
        this.numOverall += 136;
      } else if (level == "7") {
        this.numOverall += 169;
      } else if (level == "8") {
        this.numOverall += 204;
      } else if (level == "9") {
        this.numOverall += 241;
      } else if (level == "10") {
        this.numOverall += 280;
      }
    }
  },
  computed: {
    numberTatel: function() {
      let num = 0;
      for (let z = 0; z < this.nftlist.length; z++) {
        if (this.nftlist[z].pledge != "") {
          num += 1;
        }
      }
      return num;
    }
  }
};
</script>
<style scoped>
.right-activity {
  text-align: right;
  padding-right: 20px;
  padding-bottom: 10px;
  color: #ffffff;
}
.right-activity span {
  color: #f2c900;
  padding-left: 10px;
}
.statusTop {
  padding-top: 20px !important;
}
.statusChang {
  padding-top: 0px;
}
.content {
  padding: 15px;
}
.nftBg {
  background: url("../../assets/nftClub/nftClubBg.png") no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 230px;
  /* background: red; */
}

.title_fx {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  padding-top: 20px;
  padding-bottom: 10px;
}
.penson {
  color: #fffeff;
  font-size: 20px;
  font-weight: bold;
}
.penson img {
  width: 15px;
  height: 18px;
  vertical-align: middle;
  padding-left: 10px;
}
.userIcon img {
  width: 144px;
  height: 47px;
}
.exhibition {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
}
.bition-number {
  flex: 1;
  text-align: center;
  border-right: 1px solid #02c5e5;
  height: 57px;
}
.bition-number div {
  color: #ffffff;
  font-size: 14px;
  padding-top: 3px;
}
.bition-number p {
  color: #f2c900;
  font-size: 14px;
  padding-top: 5px;
}
.bition-number-No {
  border: 0;
}
.bition-number-No p {
  padding-top: 1px;
}
.balance {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* padding-left: 15px; */
  padding-right: 15px;
  padding-top: 15px;
  color: #ffffff;
  padding-bottom: 20px;
  height: 20px;
}
.balance span {
  color: #f2c900;
  padding-left: 10px;
}
.earnings {
  font-size: 14px;
}
.earnings .yellow {
  color: #ffffff;
}

.harvest {
  font-size: 14px;
  width: 100px;
  background: #cbaaf8;
  text-align: center;
  line-height: 35px;
  border-radius: 3px;
  color: #ffffff;
}
.harvest11 {
  font-size: 14px;
  width: 100px;
  background: #f2c900;
  text-align: center;
  line-height: 35px;
  border-radius: 3px;
  color: #000000;
}
.myNft {
  width: 100%;
  height: 43px;
  border: 1px solid #c18df4;
  border-radius: 7px;
  margin-top: 10px;
  background: #440981;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
}
.myNft div {
  font-size: 14px;
}
.my {
  width: 110px;
  height: 36px;
  background: #f2c900;
  border-radius: 5px;
  flex: 1;
  line-height: 36px;
  text-align: center;
  margin-left: 3px;
  margin-right: 3px;
  color: #000000;
}
.friends {
  flex: 1;
  width: 110px;
  height: 36px;
  line-height: 36px;
  /* padding-top: 15px; */
  text-align: center;
  border-radius: 5px;
  flex: 1;
}
.rewards {
  flex: 1;
  width: 110px;
  height: 36px;
  border-radius: 5px;
  flex: 1;
  line-height: 36px;
  text-align: center;
  margin-right: 3px;
}
.change {
  height: 100px;
}
.reward {
  height: 36px;
  font-size: 24px;
  color: #ffffff;
  padding-left: 15px;
  height: 60px;
}
</style>
