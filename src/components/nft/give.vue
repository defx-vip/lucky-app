<template>
  <div class="give" v-if="give" @click="give = false">
    <div class="inputaddr" v-if="blindbox == 1" @click.stop>
      <h1>Give away {{ $parent.tokenIdarr.length }} Blind Boxes to:</h1>
      <input
        type="text"
        v-model="Address"
        :placeholder="$t('bEnterWalletAddress')"
      />
      <center>
        <div type="button" @click="verification" v-movedown v-music class="myBtn">
          {{ $t("OK") }}
        </div>
      </center>
    </div>
    <div class="inputaddr" v-if="blindbox == 2" @click.stop>
      <h1 v-if="$i18n.locale == 'en'">
        Gift {{ $parent.tokenIdarr.length }} rare NFTs to:
      </h1>
      <h1 v-if="$i18n.locale == 'zh'">
        贈送{{ $parent.tokenIdarr.length }}個 {{$route.query.change == "rare"?'稀有':'普通'}} NFT給:
      </h1>
      <input
        type="text"
        v-model="Address"
        :placeholder="$t('bEnterWalletAddress')"
      />
      <center>
        <div type="button" @click="verification" v-movedown v-music class="myBtn">
          {{ $t("OK") }}
        </div>
      </center>
    </div>
    <div class="seeaddr" v-if="blindbox == 3" @click.stop>
      <h1>Give away {{ $parent.tokenIdarr.length }} Blind Boxes to:</h1>
      <div>
        <img src="../../../static/image/1487.png" />
      </div>
      <p>
        {{ $t("eAddress") }}：{{ Address.substring(0, 7) }}***{{
          Address.substring(Address.length - 6, Address.length)
        }}
      </p>
      <center>
        <button type="button" @click="giveTicket($event)" v-movedown v-music>
          {{ $t("bSEND") }}
        </button>
      </center>
    </div>
    <div class="seeaddr" v-if="blindbox == 4" @click.stop>
      <h1 v-if="$i18n.locale == 'en'">
        Gift {{ $parent.tokenIdarr.length }} rare NFTs to:
      </h1>
      <h1 v-if="$i18n.locale == 'zh'">
        贈送{{ $parent.tokenIdarr.length }}個稀有NFT給
      </h1>
      <p>
        {{ $t("eAddress") }}：{{ Address.substring(0, 7) }}***{{
          Address.substring(Address.length - 6, Address.length)
        }}
      </p>
      <center>
        <button type="button" @click="giveNFT($event)" v-movedown v-music>
          {{ $t("bSEND") }}
        </button>
      </center>
    </div>
    <div class="openaddr" v-if="blindbox == 5" @click.stop>
      <h1 v-if="$i18n.locale == 'en'">
        Would you like to open {{ $parent.tokenIdarr.length }} Mystery Chests?
      </h1>
      <h1 v-if="$i18n.locale == 'zh'">
        你想打開{{ $parent.tokenIdarr.length }}個神祕寶箱?
      </h1>
      <center>
        <button
          type="button"
          @click="approveBatch($event)"
          v-if="approvebool == false"
          v-music
        >
          {{ $t("bAUTH") }}
        </button>
        <button
          type="button"
          @click="batchCreatPersonNFT($event)"
          v-else
          v-music
        >
          {{ $t("YES") }}
        </button>
        <button type="button" @click.stop="give = false" v-movedown v-music>
          {{ $t("NO") }}
        </button>
      </center>
    </div>
    <div class="inputaddr" v-if="blindbox == 6" @click.stop>
      <h1>{{ $t("bPleaseinputnickname") }}</h1>
      <input
        type="text"
        v-model="nickname"
        maxlength="64"
        :placeholder="$t('bPleaseinputnickname')"
      />
      <center>
        <div @click="updateNickName" v-movedown v-music class="myBtn">
          {{ $t("OK") }}
        </div>
      </center>
    </div>
  </div>
</template>

<script>
import web3tools from "../../web3/web3tools";
export default {
  data() {
    return {
      give: false,
      blindbox: 0,
      Address: "",
      approvebool: false,
      nickname: this.$cookies.get("nickname")
    };
  },
  watch: {
    give: {
      handler: function() {
        this.approvebool = false;
        this.nickname = this.$cookies.get("nickname");
      }
    }
  },
  mounted() {
    //			web3tools.getMintIds(this.$store.state.gameaddr, this.$cookies.get('walletAddress'), (arr) => {
    //				console.log(arr)
    //			})
  },
  methods: {
    updateNickName() {
      this.$post(this.$apiUtil.updateNickName, {
        playerId: this.$cookies.get("playerId"),
        walletAddress: this.$cookies.get("walletAddress"),
        nickname: this.nickname
      }).then(res => {
        this.$store.state.nickname = this.nickname;
        this.$cookies.set("nickname", this.nickname, {
          expires: 0
        });
        console.log(this.$store.state.nickname);
        this.$toast("Modified successfully");
        this.give = false;
        this.blindbox = 0;
        this.$emit("userInfoName", this.nickname);
      });
    },
    verification() {
      var isAddress = web3tools.web3.utils.isAddress(this.Address);
      if (!isAddress) {
        this.$toast("Please enter correct address");
      } else {
        if (this.blindbox == 1) {
          this.blindbox = 3;
        } else if (this.blindbox == 2) {
          this.blindbox = 4;
        }
      }
    },
    giveNFT(event) {
      let that = this;
      web3tools.giveNFT(
        this.$store.state.NFTaddr,
        this.$cookies.get("walletAddress"),
        this.Address,
        this.$parent.tokenIdarr,
        e => {
          this.$toast("Please wait");
          $(event.target).addClass("preventReClick");
          for (let i = 0; i < this.$parent.tokenIdarr.length; i++) {
            console.log(this.$parent.tokenIdarr[i]);
            if (
              this.$cookies.get("isNFT") == 1 &&
              this.$cookies.get("head") == this.$parent.tokenIdarr[i] &&
              this.$parent.change != "box"
            ) {
              that
                .$post(that.$apiUtil.updateHead, {
                  playerId: that.$cookies.get("playerId"),
                  walletAddress: that.$cookies.get("walletAddress"),
                  head: 0,
                  isNFT: 0
                })
                .then(res => {
                  that.$store.state.head = 1;
                  that.$cookies.set("head", 1, {
                    expires: 0
                  });
                  that.$store.state.isNFT = 0;
                  that.$cookies.set("isNFT", 0, {
                    expires: 0
                  });
                });
            }
            if (
              this.$parent.tokenIdarr[i] ==
                this.$cookies.get("playerTockenId") &&
              this.$parent.change != "box"
            ) {
              that
                .$post(that.$apiUtil.updateNFTLevel, {
                  playerId: that.$cookies.get("playerId"),
                  walletAddress: that.$cookies.get("walletAddress"),
                  playerTockenId: 0,
                  nftLevel: 1,
                  rare: 2
                })
                .then(res => {
                  this.$store.state.playerTockenId = 0;
                  this.$cookies.set("playerTockenId", 0, {
                    expires: 0
                  });
                });
            }
          }
        },
        e => {
          this.$toast("Transferred successfully");
          this.give = false;
          this.blindbox = 0;
          if (this.$parent.change == "rare") {
            this.$parent.NFTquery("rare");
          } else if (this.$parent.change == "ordinary") {
            this.$parent.NFTquery("ordinary");
          }
        }
      );
    },
    giveTicket(event) {
      web3tools.giveTicket(
        this.$store.state.Blindboxaddr,
        this.$cookies.get("walletAddress"),
        this.Address,
        this.$parent.tokenIdarr,
        e => {
          this.$toast("Please wait");
          $(event.target).addClass("preventReClick");
        },
        e => {
          this.$toast("Transferred successfully");
          this.give = false;
          this.blindbox = 0;
          this.$parent.boxquery();
        }
      );
    },
    approveBatch(event) {
      web3tools.approveBatch(
        this.$store.state.Blindboxaddr,
        this.$store.state.NFTaddr,
        this.$parent.tokenIdarr,
        e => {
          this.$toast("Please wait");
          $(event.target).addClass("preventReClick");
        },
        e => {
          this.$toast("Approve succeeded");
          $(event.target).removeClass("preventReClick");
          this.approvebool = true;
        }
      );
    },
    batchCreatPersonNFT(event) {
      let _this = this;
      web3tools.batchCreatPersonNFT(
        this.$store.state.NFTaddr,
        this.$parent.tokenIdarr,
        e => {
          this.$toast("Please wait");
          $(event.target).addClass("preventReClick");
        },
        e => {
          web3tools.getMintIds(
            _this.$store.state.NFTaddr,
            _this.$cookies.get("walletAddress"),
            arr => {
              console.log(arr);
              _this.give = false;
              _this.blindbox = 0;
              _this.$parent.query(arr);
              _this.$parent.success = 2;
              _this.$parent.mynftlist();
            }
          );
        }
      );
    }
  }
};
</script>

<style scoped>
    .myBtn{
    height: 0.37rem;
    line-height: 0.37rem;
    border-radius: 0.185rem;
    min-width: 0.57rem;
    font-size: 0.17rem;
    font-family: "Magistral-Bold";
    background: -webkit-gradient(linear, left top, left bottom, from(#fffc00), to(#db7100));
    background: linear-gradient(#fffc00, #db7100);
    padding: 0 0.29rem;
  }
    
.give {
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100vh;
  z-index: 2;
  display: flex;
  align-items: center;
}

.give > div {
  /*background: rgba(154, 97, 255, .94);*/
  margin: 0 0.32rem;
  flex: 1;
  border-radius: 0.1333rem;
}

.give .openaddr {
  margin: 0 0.2rem;
}

.give .inputaddr,
.give .openaddr {
  background-image: url(../../../static/image/inputaddr.png);
  background-size: 100% 100%;
  background-position: center;
}

.give .inputaddr h1 {
  margin-top: 0.52rem;
  margin-left: 0.16rem;
  display: block;
  color: #ffffff;
  font-size: 0.16rem;
  margin-bottom: 0.23rem;
}

.give .inputaddr input {
  margin: 0 auto;
  display: block;
  width: 86%;
  height: 0.39rem;
  background: #4a147a;
  color: #ffffff;
  padding: 0 2%;
  border-radius: 0.0667rem;
}

.give .inputaddr center {
  display: flex;
  justify-content: center;
  padding: 0.26rem 0 0.3867rem;
}

.give > div center button {
  height: 0.37rem;
  border-radius: 0.185rem;
  min-width: 0.57rem;
  font-size: 0.17rem;
  font-family: "Magistral-Bold";
  background: linear-gradient(#fffc00, #db7100);
  padding: 0 0.29rem;
}

.give .seeaddr {
  background-image: url(../../../static/image/seeaddr.png);
  background-size: 100% 100%;
  background-position: center;
}

.give .seeaddr h1 {
  text-align: center;
  color: #ffffff;
  font-size: 0.16rem;
  padding-top: 0.44rem;
}

.give .seeaddr p {
  text-align: center;
  font-size: 0.16rem;
  margin-top: 0.14rem;
  color: #ffffff;
}

.give .seeaddr center {
  display: flex;
  justify-content: center;
  padding: 0.2rem 0 0.34rem;
}

.give .seeaddr div {
  margin-top: 0.17rem;
}

.give .seeaddr div img {
  display: block;
  margin: 0 auto;
  background: #8554de;
  width: 1.4067rem;
  border-radius: 0.067rem;
  border: 2px solid #35e7ff;
}

.give .openaddr h1 {
  text-align: center;
  color: #ffffff;
  font-size: 0.16rem;
  padding: 0.39rem 0;
}

.give .openaddr center {
  padding-bottom: 0.3167rem;
  display: flex;
  justify-content: center;
}

.give .openaddr center button:nth-child(2) {
  margin-left: 0.3867rem;
}
</style>
