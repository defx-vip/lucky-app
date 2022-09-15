<template>
  <div class="playlist">
    <header>
      <img
        @click="$router.back(-1)"
        src="../../../static/image/headerback.png"
        v-music
      />
      <p>{{ $t("MyTeam") }}</p>
    </header>

    <div class="teamBox">
      <div class="team">
        <div class="teamList">
          <div class="teamFlex">
            <img src="../../assets/nftClub/person.png" alt="" />
            <div class="title-met">{{ $t("myfriends") }}</div>
          </div>
          <div>
            <div class="number-num">{{ linealSize}}</div>
          </div>
        </div>

        <div class="teamList">
          <div class="teamFlex">
            <img src="../../assets/nftClub/team.png" alt="" />
            <div class="title-met">{{ $t("MyTeams") }}</div>
          </div>
          <div>
            <div class="number-num">{{   teamTotal }}</div>
          </div>
        </div>

        <div class="invitation">
          <div>{{ $t("InvitationLink") }} ：</div>
          <div class="invitation-friends" @click="popupStatus = true">
            {{ $t("addFriends") }}
            <img src="../../assets/nftClub/open.png" alt="" class="open-img" />
          </div>
        </div>

        <div class="address">
          <div class="address-txt">
            {{ interceptFn($store.state.walletAddress) }}
          </div>
          <div
            class="copy"
            type="button"
            v-music
            v-clipboard:copy="href"
            v-clipboard:success="copy"
          >
            {{ $t("COPY") }}
          </div>
        </div>

        <div class="list-title">
          <div style="width: 10%;">#</div>
          <div>{{ $t("logonTime") }}</div>
          <div>{{ $t("address") }}</div>
          <div>{{ $t("TeamSize") }}</div>
        </div>

        <div
          v-infinite-scroll="queryInitList"
          infinite-scroll-disabled="true"
          infinite-scroll-distance="10"
        >
          <div class="list-titles" v-for="(item, index) in list" :key="item.id">
            <div style="width: 5%">{{ index + 1 }}</div>
            <div>{{ timeFrom(item.invitationTime) }}</div>
            <div class="address-list">
              {{ intercept(item.walletAddress) }}
            </div>
            <div style="width: 20%">{{item.teamTotal}}</div>
          </div>
        </div>
      </div>
    </div>

    <PopupComm v-if="popupStatus" :statusZhEn="statusZhEn"></PopupComm>
  </div>
</template>

<script>
import PopupComm from "./components/Popup.vue";
import i18n from "../../i18n/index";
let _this;
export default {
  components: {
    PopupComm
  },
  data() {
    return {
      total: "",
      linealSize: "",
      teamTotal: "",
      list: [],
      popupStatus: false,
      pageNft: 1,
      nextbool: false,
      href:
        window.location.protocol +
        "//" +
        window.location.host +
        "/#/?code=" +
        this.$store.state.walletAddress,
      statusZhEn: false,
      pages: 1
    };
  },
  mounted() {
    // this.queryInitList();
    if (i18n.locale == "zh") {
      // 中文
      this.statusZhEn = false;
    } else {
      // 英文
      this.statusZhEn = true;
    }
  },
  methods: {
    copy() {
      this.$toast("copied");
    },
    queryInitList() {
      if (this.nextbool == true) {
        return false;
      }
      this.nextbool = true;
      this.$post(this.$apiUtil.getMyTeamInfo, {
        walletAddress: this.$store.state.walletAddress,
        pageSize: 10,
        pageNum: this.pageNft
      }).then(res => {
        if (res && res.data && res.data.linealList) {
          this.linealSize = res.data.linealSize;
          this.teamTotal = res.data.teamTotal;
          for (let i = 0; i < res.data.linealList.length; i++) {
            this.list.push(res.data.linealList[i]);
          }
          this.pageNft = this.pageNft + 1;
          this.nextbool = false;
        }
      });
      // if (this.nextbool == true) {
      //   return false;
      // }
      // this.nextbool = true;
      // this.$post(this.$apiUtil.invitationLst, {
      //   playerId: this.$cookies.get("playerId"),
      //   pageSize: 10,
      //   pageNum: this.pages,
      //   walletAddress: this.$cookies.get("walletAddress")
      // }).then(res => {
      //   this.total = res.data.total;
      //   for (let i = 0; i < res.data.lst.length; i++) {
      //     this.list.push(res.data.lst[i]);
      //   }
      //   this.pages = this.pages + 1;
      //   this.nextbool = false;
      // });
    },

    interceptFn(str) {
      if (!str) {
        return "";
      }
      var fisrt = str.substring(0, 8);
      var last = str.substring(str.length - 8, str.length);
      return fisrt + "......." + last;
    },

    intercept(str) {
      // js 超出的部分 中间省略号
      if (!str) {
        return "";
      }
      var fisrt = str.substring(0, 4);
      var last = str.substring(str.length - 4, str.length);
      return fisrt + "...." + last;
    },
    timeFrom(time) {
      var nowDay = new Date(time);
      //十位需要乘1000，十三位可以直接用
      return `${nowDay.getFullYear()}-${nowDay.getMonth() +
        1}-${nowDay.getDate()}`;
    }
  }
};
</script>

<style scoped>
.teamBox {
  padding: 20px;
  padding-top: 10px;
}
.team {
  background: url("../../assets/nftClub/nftClubBg.png") no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 180px;
  padding-top: 10px;
}
.teamList {
  padding: 10px;
  padding-right: 20px;
  padding-left: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.teamList img {
  width: 15px;
  height: 15px;
}
.teamFlex {
  display: flex;
  align-items: center;
  justify-content: center;
}
.teamFlex .title-met {
  margin-left: 20px;
  color: #fffeff;
}
.invitation {
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
  color: #ffffff;
  display: flex;
  justify-content: space-between;
}
.invitation-friends {
  color: #3ce3e1;
}
.address {
  width: 270px;
  height: 30px;
  line-height: 30px;
  background: #cbaaf8;
  border-radius: 3px;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 2px;
  padding-right: 20px;
  margin-top: 20px;
}
.address-txt {
  color: #f2c900;
  background: #4b0888;
  height: 25px;
  line-height: 25px;
  border-radius: 3px;
  padding-left: 10px;
  padding-right: 10px;
}
.copy {
  color: #000000;
  font-size: 14px;
  font-weight: bold;
  width: 50px;
  text-align: right;
}
.number-num {
  color: #f2c900;
}
.open-img {
  width: 10px;
  height: 10px;
}
.list-title {
  color: #ffffff;
  font-size: 14px;
  display: flex;
  margin-top: 30px;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: #490785;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #c18df4;
}
.list-title div {
  width: 28%;
}
.list-titles {
  color: #ffffff;
  font-size: 14px;
  display: flex;
  margin-top: 10px;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: #490785;
  height: 42px;
  border-radius: 5px;
  font-size: 12px;
}
.list-titles div {
  width: 32%;
  text-align: center;
}
.address-list {
  color: #f2c900;
}
</style>
