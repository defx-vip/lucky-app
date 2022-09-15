<template>
  <div
    class="teamlist"
    v-infinite-scroll="loadMore"
    infinite-scroll-disabled="true"
    infinite-scroll-distance="10"
  >
    <div class="list" v-for="(item, index) in list" :key="index">
      <div class="list-two">
        <div>{{ timeFrom(item.rewardDate) }}</div>
        <div class="numColo">{{intercept(item.walletAddressFrom)  }}</div>
        <div class="numColo">{{ item.rewardNumber }}LMT</div>
        <div class="noFriend">
          <span>{{ $t("rebate") }} </span>
          <!-- <span>{{ $t("teamRewards") }} </span> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    list: {
      type: Array,
      default: []
    }
  },
  methods: {
    loadMore() {
      this.$emit("queryInit");
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
.teamlist {
  /* height: 305px;
  overflow: scroll; */
}
.friend {
  background: url("../../../assets/nftClub/noReceive.png") no-repeat;
  background-size: 100% 100%;
  width: 100px;
  height: 20px;
  font-size: 12px !important;
  line-height: 20px;
}
.noFriend {
  color: #ffffff;
  height: 20px;
  font-size: 12px !important;
  line-height: 20px;
}
.below {
  padding-top: 5px;
}
.list {
  width: 100%;
  height: 40px;
  background: #490785;
  opacity: 0.9;
  border-radius: 7px;
  margin-top: 10px;
}
.list-two {
  text-align: center;
  color: #ffffff;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
}
.list-two div {
  flex: 1;
  font-size: 14px;
}
.numColo {
  color: #f2c900;
}
</style>
