<template>
  <div class="invitation">
    <div class="invitationin">
      <img
        src="../../../../static/image/memberback.png"
        @click="$parent.popupStatus = false"
      />
      <div class="title">{{ $t("friend") }}</div>

      <div class="my-prop">
        <img src="../../../assets/nftClub/luang.png" alt="" v-if="statusZhEn" />
        <img src="../../../assets/nftClub/chang.png" alt="" v-else />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    statusZhEn: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>

<style scoped>
.title {
  height: 14px;
  font-size: 16px;
  font-family: Magistral;
  font-weight: bold;
  color: #ffffff;
  text-align: center;
  margin-top: 20px;
}
.my-prop {
  width: 100%;
  height: 92%;
  overflow: scroll;
  margin-top: 15px;
}
.my-prop img {
  display: block;
  width: 95%;
  height: 1000px;
  margin: 0 auto;
}
.invitation {
  position: absolute;
  background: rgba(5, 0, 9, 0.5);
  display: flex;
  align-items: start;
  justify-content: center;
  z-index: 2;
  overflow-y: auto;
  overflow-x: hidden;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0 auto;
}

.invitation .invitationin {
  background-repeat: no-repeat;
  background-size: 100% 100%;
  flex: 1;
  margin: 0 0.12rem;
  position: relative;
  padding-bottom: 0.34rem;
  margin-top: 1rem;
  width: 307px;
  height: 383px;
  background: #703dbc;
  border-radius: 20px 17px 17px 17px;
}

.invitation .invitationin > img {
  position: absolute;
  right: 0.25rem;
  top: 0.14rem;
  width: 0.15rem;
  height: 0.15rem;
}

.invitation .invitationin > h1 {
  margin-top: 0.28rem;
  color: #ffffff;
  font-size: 0.2rem;
  margin-left: 0.2133rem;
  text-transform: uppercase;
  font-family: "Magistral-Bold";
}

.invitation .invitationin .img {
  background: #4f098c;
  margin: 0.48rem 0.4rem 0;
  border-radius: 0.2rem;
  text-align: center;
  padding-bottom: 0.2rem;
}

.invitation .invitationin .img > img {
  width: 1.7rem;
  display: inline-block;
  margin: -0.26rem auto 0;
}

.invitation .invitationin .img .center {
  background: #a774da;
  margin: -0.22rem 0.2633rem 0;
  border-radius: 0.0667rem;
  position: relative;
  padding-bottom: 0.2rem;
}

.invitation .invitationin .img .center h1 {
  text-align: left;
  padding-top: 0.15rem;
  margin-left: 0.1233rem;
  color: #f2c900;
  font-size: 0.24rem;
  font-family: "Magistral-Bold";
  text-transform: uppercase;
}

.invitation .invitationin .img .center p {
  text-align: left;
  color: #f2c900;
  font-family: "Magistral-Bold";
  font-size: 0.16rem;
  margin-left: 0.1233rem;
  text-transform: uppercase;
  margin-top: 0.08rem;
}

.invitation .invitationin .img .center span {
  font-size: 0.14rem;
  color: #ffffff;
  margin-top: 0.3rem;
  display: block;
}

.invitation .invitationin .img .center h6 {
  font-size: 0.5rem;
  color: #f2c900;
  font-family: "Magistral-Bold";
  padding-bottom: 0.1rem;
}

.invitation .invitationin .img .bottom {
  display: flex;
  justify-content: space-between;
  margin: 0 0.2633rem;
  align-items: flex-end;
  padding: 0.14rem 0;
}

.invitation .invitationin .img .bottom p {
  font-size: 0.2rem;
  font-family: "Magistral-Bold";
  color: #ffffff;
}

.invitation .invitationin .img .bottom div {
  width: 0.8rem;
  background: #ffffff;
  height: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.0667rem;
}

.invitation .invitationin > p {
  margin-top: 0.1667rem;
  text-align: center;
  color: #ffffff;
  font-size: 0.12rem;
  margin-bottom: 0.17rem;
}

.invitation .invitationin button {
  display: block;
  width: 1.4rem;
  height: 0.3rem;
  border-radius: 0.15rem;
  margin: 0.2rem auto 0;
  font-size: 0.14rem;
  text-transform: uppercase;
  background: linear-gradient(#ffffff, #01d5d2);
}
</style>
