<template>
  <div class="assetdetails">
    <header>
      <img
        @click="$router.back(-1)"
        src="../../../static/image/headerback.png"
        v-music
      />
      <p>{{ $t("lTransactions") }}</p>
    </header>

    <div class="frame">
      <div class="rankTitle">
        <div :class="statusRank == 1 ? 'rankChang' : ''" @click="rankFn(1)">
             {{ $t("TransactionTitle") }}
        </div>
        <div :class="statusRank == 2 ? 'rankChang' : ''" @click="rankFn(2)">
             {{ $t("GameRecordTitle") }}
        </div>
      </div>

      <div class="scllo" v-show="statusRank == 1">
        <table
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="true"
          infinite-scroll-distance="10"
        >
          <thead>
            <tr>
              <th>#</th>
              <th>{{ $t("lAssets") }}</th>
              <th>{{ $t("lDetail") }}</th>
              <th>{{ $t("fTIME") }}</th>
              <th>{{ $t("bType") }}</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(item, index) in assetlist" :key="item.id">
              <td>
                <div style="width: 0.2rem; margin: 0 auto">{{ index + 1 }}</div>
              </td>
              <td>
                <div style="width: 0.6rem; margin: 0 auto">
                  {{ item.tokenCode }}
                </div>
              </td>
              <td>
                <div style="width: 0.5rem; margin: 0 auto">
                  <b>{{ item.type == 0 ? "-" : "+" }}{{ item.balance }}</b>
                </div>
              </td>
              <td>
                <div >
                  <span>{{ formateTime(item.createTime) }}</span>
                </div>
              </td>
              <td>
                <div v-if="item.type == 1">{{ $t("lTRANSFER") }}</div>
                <div v-if="item.type == 0">{{ $t("lWD") }}</div>
                <div v-if="item.type == 6">{{ $t("fREWARD") }}</div>
                <div v-if="item.type == 7">{{ $t("bUPGRADE") }}</div>
                <div v-if="item.type == 5">{{ $t("lSIGN") }}</div>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- <div class="load" v-if="Number(assetlist.length) > 0"><mt-spinner type="fading-circle"></mt-spinner></div> -->
        <div class="nolist" v-if="assetlist.length <= 0">
          {{ $t("eNodata") }}
        </div>
      </div>

      <div class="scllo" v-show="statusRank == 2">
        <table
          v-infinite-scroll="getGameFn"
          infinite-scroll-disabled="true"
          infinite-scroll-distance="10"
        >
          <thead>
            <tr>
              <th>#</th>
              <th>{{ $t("fTIME") }}</th>
              <th>{{ $t("lAssets") }}</th>
              <th>{{ $t("lDetail") }}</th>
              <th> {{ $t("bType") }} </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in gamelist" :key="item.id">
              <td>
                <div style="width: 0.2rem; margin: 0 auto">{{ index + 1 }}</div>
              </td>
              <td>
                <div style="width: 0.8rem; margin: 0 auto">
                  {{ formateTime(item.createTime) }}
                </div>
              </td>
              <td>
                <div style="width: 0.5rem; margin: 0 auto">LMG</div>
              </td>
              <td>
                <div>
                  <b>{{ item.scoreplus }}</b>
                </div>
              </td>
              <td>
                <div>
                  {{ item.gameType }}
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- <div class="load" v-if="Number(assetlist.length) > 0"><mt-spinner type="fading-circle"></mt-spinner></div> -->

        <div class="nolist" v-if="gamelist.length <= 0">
          {{ $t("eNodata") }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pages: 1,
      assetlist: [],
      total: 1,
      nextbool: false,
      statusRank: 1,
      pageNum: 2,
      nextboolStatus: false,
      gamelist: [],
    };
  },
  created() {
    this.getGameFn();
  },
  methods: {
    getGameFn() {
      let _this = this;
      if (_this.nextboolStatus == true) {
        return false;
      }
      _this.nextboolStatus = true;
      this.$post(this.$apiUtil.getGameRedcord, {
        pageNum: this.pageNum,
        pageSize: 10,
        playerId: this.$cookies.get("playerId"),
        walletAddress: this.$cookies.get("walletAddress"),
      }).then((res) => {
        if (res) {
          _this.total = res.data.total;
          for (let i = 0; i < res.data.lst.length; i++) {
            _this.gamelist.push(res.data.lst[i]);
          }
          _this.pageNum = _this.pageNum + 1;
          _this.nextboolStatus = false;
        }
      });
    },
    rankFn(type) {
      this.statusRank = type;
    },
    loadMore() {
      let _this = this;
      if (Number(_this.assetlist.length) >= Number(_this.total)) {
        return false;
      }
      if (_this.nextbool == true) {
        return false;
      }
      _this.nextbool = true;
      this.$post(this.$apiUtil.withdrawrecharge, {
        playerId: this.$cookies.get("playerId"),
        walletAddress: this.$cookies.get("walletAddress"),
        size: 15,
        current: this.pages,
      }).then((res) => {
        if (res) {
          _this.total = res.data.total;
          for (let i = 0; i < res.data.records.length; i++) {
            _this.assetlist.push(res.data.records[i]);
          }
          _this.pages = _this.pages + 1;
          _this.nextbool = false;
        }
      });
    },
    formateTime(time) {
     
      var nowDay = new Date(time);
      //十位需要乘1000，十三位可以直接用
      return `${nowDay.getFullYear()}-${nowDay.getMonth() +
        1}-${nowDay.getDate()}`;
 
    },
  },
  mounted() {},
};
</script>

<style scoped>
.rankTitle {
  display: flex;
  /* justify-content: center; */
  /* align-items: center; */
  padding-bottom: 10px;
  padding-top: 10px;
  color: #ffffff;

  border-radius: 4px;
  padding-left: 20px;
  margin-bottom: 20px;
}
.rankTitle div {
  text-align: center;
  width: 110px;
  height: 30px;
  line-height: 30px;
}
.rankChang {
  width: 80px;
  height: 30px;
  line-height: 30px;
  background: #f2c900;
  border: 1px solid #ffffff;
  border-radius: 15px;
  color: black;
}
.assetdetails {
  margin-bottom: 0.93rem;
}

.assetdetails .frame {
  background: url(../../../static/image/29BG.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  margin: 0.2rem 0.2rem 0;
  padding: 0.2rem 0.15rem 0.44rem;
  position: relative;
}

.assetdetails .frame table {
  width: 100%;
}
.assetdetails .frame .scllo {
  /*max-height: 2rem;*/
  max-height: 4.5rem;
  overflow: auto;
  scrollbar-width: none;
}
.assetdetails .frame .scllo::-webkit-scrollbar {
  display: none;
}
.assetdetails .frame table thead th {
  color: #ffffff;
  text-transform: uppercase;
  font-size: 0.12rem;
  font-family: "Magistral-Bold";
  /*padding-bottom: .17rem;*/
}

.assetdetails .frame table td div {
  color: #ffffff;
  /*font-weight: bold;*/
  font-size: 0.12rem;
  text-align: center;
  padding-top: 0.23rem;
  line-height: 0.12rem;
  text-transform: uppercase;
  font-family: "Magistral-Medium";
}

.assetdetails .frame table td span {
  font-weight: normal;
  font-family: "Magistral-Book";
}

.assetdetails .frame table td b {
  /*font-size: .15rem;*/
  color: #f5d90e;
  /*font-weight: bold;*/
}
.assetdetails .load {
  display: flex;
  justify-content: center;
  margin-top: 0.2rem;
}
.assetdetails .nolist {
  color: #ffffff;
  margin-top: 0.2rem;
  text-align: center;
  font-family: "Magistral-Medium";
}
</style>
