<template>
  <div
    v-infinite-scroll="loadMore"
    infinite-scroll-disabled="true"
    infinite-scroll-distance="10"
    class="listTwo"
  >
    <div class="list" v-for="(item, index) in list" :key="index">
      <div class="list-left">
        <img :src="item.image" alt="" />
      </div>
      <div class="list-right">
        <div class="list-two">
          <div>
            ID：{{ item.tokenId }}
            <span v-if="item.sort == 'ordinary'" class="OrdinaryRare">
              {{ $t("mOrdinary") }}
            </span>
            <span v-else class="OrdinaryRare"> {{ $t("mRare") }} </span>
          </div>

          <div>{{ $t("income") }}</div>

          <div
            v-if="
              ($route.query.price == '' || $route.query.price == undefined) &&
                item.isLink == false
            "
          >
            {{ $t("inactivated") }}
          </div>

          <div
            v-else-if="
              ($route.query.price == '' || $route.query.price == undefined) &&
                item.isLink == true &&
                item.isDepos == false &&
                item.approvebool == false
            "
          >
            {{ $t("bapprove") }}
          </div>

          <div
            v-else-if="
              ($route.query.price == '' || $route.query.price == undefined) &&
                item.isLink == true &&
                item.isDepos == false &&
                item.approvebool == true
            "
          >
            {{ $t("epledge") }}
          </div>

          <div
            v-else-if="
              ($route.query.price == '' || $route.query.price == undefined) &&
                item.isLink == true &&
                item.isDepos == true
            "
          >
            {{ $t("PledgedText") }}
          </div>
        </div>
        <div class="list-two">
          <div>Level：{{ item.level }}</div>
          <!-- <div class="numColo">{{ $t("UnderConn") }}111111111</div> -->
          <div class="numColo">{{ item.profit }}</div>

          <!-- 激活 -->
          <div
            class="vation"
            v-if="
              ($route.query.price == '' || $route.query.price == undefined) &&
                item.isLink == false
            "
            @click="linkNft(item.tokenId)"
          >
            {{ $t("bactivation") }}
          </div>

          <!-- 確定质押 -->
          <div
            class="vation"
            v-else-if="
              ($route.query.price == '' || $route.query.price == undefined) &&
                item.isLink == true &&
                item.isDepos == false &&
                item.approvebool == false
            "
            @click="approve()"
          >
            {{ $t("bapprove") }}
          </div>

          <!-- 质押 -->
          <div
            class="vation"
            v-else-if="
              ($route.query.price == '' || $route.query.price == undefined) &&
                item.isLink == true &&
                item.isDepos == false &&
                item.approvebool == true
            "
            @click="depositeNft(item.tokenId)"
          >
            {{ $t("epledge") }}
          </div>

          <!-- 确定赎回 -->
          <div
            class="vation"
            v-else-if="
              ($route.query.price == '' || $route.query.price == undefined) &&
                item.isLink == true &&
                item.isDepos == true
            "
            @click="withdrawNft(item.tokenId)"
          >
            {{ $t("eredemption") }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import web3tools from "../../../web3/web3tools";
export default {
  props: {
    list: {
      type: Array,
      default: []
    }
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    jump(id, sort) {
      this.$router.push({
        path: "/details",
        query: { id: id, sort: sort, price: "" }
      });
    },

    loadMore() {
      this.$emit("queryInitNft");
    },
    linkNft(id) {
      web3tools.linkNft(
        this.$store.state.gameaddr,
        id,
        e => {
          this.$toast("Please wait");
        },
        e => {
          this.$emit("changListFn", 1);
          this.$toast("Success");
        }
      );
    },
    approve() {
      web3tools.approveto(
        this.$store.state.NFTaddr,
        this.$store.state.gameaddr,
        e => {
          this.$toast("Please wait");
        },
        e => {
          this.$toast("Approve succeeded");
          this.$emit("changListFn", 1);
          // this.approvebool = true;
        }
      );
    },
    depositeNft(id) {
      web3tools.depositeNft(
        this.$store.state.gameaddr,
        id,
        e => {
          this.$toast("Please wait");
          if (
            this.$cookies.get("isNFT") == 1 &&
            this.$cookies.get("head") == id
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
          if (this.$cookies.get("playerTockenId") == id) {
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
        },
        e => {
          // that.roleLevel()
          this.$emit("changListFn", 1);
          this.$toast("Success");
        }
      );
    },
    withdrawNft(id) {
      web3tools.withdrawNft(
        this.$store.state.gameaddr,
        id,
        e => {
          this.$toast("Please wait");
        },
        e => {
          // that.roleLevel()
          this.$emit("changListFn", 1);
          this.$toast("Success");
        }
      );
    }
  }
};
</script>
<style scoped>
.listTwo {
  /* height: 300px;
  overflow: auto; */
}
.list {
  width: 100%;
  height: 75px;
  background: #490785;
  opacity: 0.9;
  border-radius: 7px;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.list-left {
  width: 52px;
  height: 52px;
  background: #9653e0;
  border: 1px solid #35e7ff;
  border-radius: 3px;
  justify-items: center;
  align-items: center;
  margin-left: 10px;
}
.list-left img {
  width: 52px;
  height: 52px;
  border-radius: 3px;
}
.list-right {
  flex: 5;
}
.list-two {
  justify-items: center;
  align-items: center;
  display: flex;
  text-align: center;
  color: #ffffff;
  margin-right: 10px;
}
.list-two div {
  width: 90px;
  font-size: 14px;
}
.vation {
  /* width: 50px; */
  height: 30px;
  background: #f2c900;
  border-radius: 5px;
  text-align: center;
  line-height: 30px !important;
  justify-content: center;
  align-items: center;
  color: #666666;
  font-size: 12px;
}
.numColo {
  color: #f2c900;
}
.change {
  height: 100px;
}
.OrdinaryRare {
  color: #f2c900;
  font-size: 12px;
  padding-left: 5px;
}
</style>
