<template>
  <div
    v-infinite-scroll="loadMore"
    infinite-scroll-disabled="true"
    infinite-scroll-distance="10"
    class="listTwo"
  >
    <div class="list" v-for="(item, index) in list" :key="index">
      <div class="list-right">
        <div class="list-two">
          <div>#</div>
          <div>{{ $t("address") }}</div>
          <div>NFT</div>
          <div>{{ $t("below") }}</div>
        </div>
        <div class="list-two">
          <div>{{ index + 1 }}</div>
          <div class="numColo">{{ intercept(item.wallet_address) }}</div>
          <div class="numColo">{{ item.deposite_nft_count }}</div>
          <div class="numColo below">{{ item.team_deposite_nft_count }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
  methods: {
    loadMore() {
      this.$emit("queryInitFriends");
    },

    intercept(str) {
      // js 超出的部分 中间省略号
      if (!str) {
        return "";
      }
      var fisrt = str.substring(0, 4);
      var last = str.substring(str.length - 4, str.length);
      return fisrt + "...." + last;
    }
  }
};
</script>
<style scoped>
.listTwo {
  /* height: 300px;
  overflow: auto; */
}
.below {
  padding-top: 5px;
}
.list {
  width: 100%;
  height: 75px;
  background: #490785;
  opacity: 0.9;
  border-radius: 7px;
  margin-top: 10px;
}
.list-right {
}
.list-two {
  text-align: center;
  color: #ffffff;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 5px;
}
.list-two div {
  flex: 1;
  font-size: 14px;
}

.numColo {
  color: #f2c900;
}
</style>
