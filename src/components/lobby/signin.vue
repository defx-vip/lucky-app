<template>
  <div class="signin">
    <div class="frame">
      <div class="top">
        <img
          v-if="$i18n.locale == 'en'"
          src="../../../static/image/signin.png"
        />
        <img
          v-if="$i18n.locale == 'zh'"
          src="../../../static/image/signinzh.png"
        />
        <img
          v-if="$i18n.locale == 'en'"
          src="../../../static/image/LoginBonus.png"
        />
        <img
          v-if="$i18n.locale == 'zh'"
          src="../../../static/image/LoginBonuszh.png"
        />
      </div>
      <ul v-if="week != 0">
        <li v-for="(item, index) in sign" :key="item.id">
          <div class="normal" v-if="item.week != 7">
            <p v-if="$i18n.locale == 'en'">DAY {{ item.week }}</p>
            <p v-if="$i18n.locale == 'zh'">{{ item.zhweek }}</p>
            <img :src="item.img" />
            <span v-if="bool.isShowReward == true">{{ item.gold }}</span>
            <div class="noselect" v-if="Number(week) < item.week">
              <img src="../../../static/image/locking.png" />
            </div>
            <div class="noselect" v-if="Number(week) > item.week">
              <img src="../../../static/image/signyes.png" />
            </div>
            <div
              class="select"
              v-if="Number(week) == item.week"
              @click="signin()"
              v-music
              v-preventReClick
            >
              <img src="../../../static/image/signgo.png" />
            </div>
          </div>
          <div class="normal" v-else>
            <div class="left">
              <p v-if="$i18n.locale == 'en'">
                DAY {{ item.week
                }}<img
                  v-if="Number(week) != item.week"
                  src="../../../static/image/locking.png"
                />
              </p>
              <p v-if="$i18n.locale == 'zh'">
                {{ item.zhweek
                }}<img
                  v-if="Number(week) != item.week"
                  src="../../../static/image/locking.png"
                />
              </p>
              <span v-if="bool.isShowReward == true">{{ item.gold }}</span>
            </div>
            <img src="../../../static/image/cup.png" />
            <div
              class="select"
              v-if="Number(week) == item.week"
              @click="signin()"
              v-music
              v-preventReClick
            >
              <img src="../../../static/image/signgo7.png" />
            </div>
          </div>
        </li>
      </ul>
      <p>{{ $t("lComebacktomorrowforaBIGGERBONUS") }}</p>
      <button type="button" @click="signin" v-movedown v-music v-preventReClick>
        {{ $t("lContinue") }}!
      </button>
    </div>
    <turntable v-if="turntablego"></turntable>
  </div>
</template>

<script>
import turntable from "./turntable";
export default {
  components: {
    turntable
  },
  data() {
    return {
      week: 0,
      sign: [
        {
          zhweek: "第一天",
          week: 1,
          gold: 10,
          img: require("../../../static/image/Gold1.png")
        },
        {
          zhweek: "第二天",
          week: 2,
          gold: 20,
          img: require("../../../static/image/Gold2.png")
        },
        {
          zhweek: "第三天",
          week: 3,
          gold: 30,
          img: require("../../../static/image/Gold3.png")
        },
        {
          zhweek: "第四天",
          week: 4,
          gold: 40,
          img: require("../../../static/image/Gold4.png")
        },
        {
          zhweek: "第五天",
          week: 5,
          gold: 50,
          img: require("../../../static/image/Gold5.png")
        },
        {
          zhweek: "第六天",
          week: 6,
          gold: 60,
          img: require("../../../static/image/Gold6.png")
        },
        {
          zhweek: "第七天",
          week: 7,
          gold: 70
        }
      ],
      signweek: "",
      turntablego: false,
      bool: {}
    };
  },
  mounted() {
    console.log(this.bool.isShowReward);
    this.signinto();
  },
  methods: {
    signinto() {
      this.$post(this.$apiUtil.reward_getOne, {
        playerId: this.$cookies.get("playerId"),
        walletAddress: this.$cookies.get("walletAddress")
      }).then(res => {
        if (res.data == true) {
          this.$router.push("/");
          this.signweekto();
        } else {
          this.$post(this.$apiUtil.reward_sign, {
            playerId: this.$cookies.get("playerId"),
            walletAddress: this.$cookies.get("walletAddress")
          }).then(res => {
            this.signweekto();
          });
        }
      });
    },
    signweekto() {
      this.$post(this.$apiUtil.getSignWeek, {
        playerId: this.$cookies.get("playerId"),
        walletAddress: this.$cookies.get("walletAddress")
      }).then(res => {
        this.bool = res.data;
        this.week = res.data.next;
      });
    },
    signin() {
      if (this.bool.isShowTurntable == true) {
        this.turntablego = true;
      } else {
        this.$router.push("/");
      }
    }
  }
};
</script>

<style scoped>
.signin {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.64);
  z-index: 3;
  /*display: flex;
		align-items: center;
		justify-content: center;*/
  background: url(../../../static/image/signBG.png);
  background-repeat: no-repeat;
  background-size: 100%;
  overflow: auto;
}

.signin .frame {
  background: url(../../../static/image/signinBG.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 100%;
  margin-top: 0.9333rem;
  margin-bottom: 1.22rem;
  padding-bottom: 0.12rem;
}

.signin .frame .top {
  margin-top: -0.6367rem;
  display: inline-block;
  width: 100%;
}

.signin .frame .top img:nth-child(1) {
  height: 0.3033rem;
  display: block;
  margin: 0 auto;
}

.signin .frame .top img:nth-child(2) {
  height: 0.5567rem;
  display: block;
  margin: 0.0833rem auto;
}

.signin .frame > p {
  margin-left: 0.14rem;
  font-size: 0.16rem;
  color: #ffffff;
  font-family: "Magistral-Book";
  margin-top: 0.05rem;
}

.signin .frame > button {
  margin: 0.5rem auto 0;
  display: block;
  width: 1.8rem;
  height: 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.2rem;
  background: linear-gradient(#fffc00, #db7100);
}

.signin ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0.1rem 0.12rem 0;
}

.signin ul li {
  background-image: url(../../../static/image/signdown.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 31.5%;
  margin-bottom: 0.2rem;
  position: relative;
  height: 1.25rem;
}

.signin ul li .normal > p {
  text-align: center;
  font-size: 0.18rem;
  color: #ffffff;
  margin-top: 0.05rem;
}

.signin ul li .normal > img {
  width: 100%;
  margin-top: -0.1rem;
  margin-bottom: -0.32rem;
}

.signin ul li .normal > span {
  display: block;
  font-size: 0.22rem;
  text-align: center;
  color: #f2c800;
}

.signin ul li:nth-child(7) {
  background-image: url(../../../static/image/signdown7.png);
  width: 100%;
  margin-bottom: 0;
}

.signin ul li:nth-child(7) .normal {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.signin ul li:nth-child(7) .normal > img {
  width: 1.43rem;
  margin-bottom: 0;
  margin-right: 0.2533rem;
  margin-top: -0.2933rem;
  position: relative;
  z-index: 1;
}

.signin ul li .left p {
  display: flex;
  margin-left: 0.29rem;
  align-items: center;
  font-size: 0.18rem;
  color: #ffffff;
  margin-top: 0.05rem;
}

.signin ul li .left p img {
  width: 0.17rem;
  margin-left: 0.2167rem;
}

.signin ul li .left span {
  margin-top: 0.23rem;
  display: block;
  margin-left: 0.28rem;
  font-size: 0.4rem;
  color: #f2c800;
}

.signin ul li .noselect {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(55, 3, 108, 0.6);
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.signin ul li .noselect img {
  width: 0.52rem;
}

.signin ul li .select {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.signin ul li .select img {
  width: 122%;
}

.signin ul li:nth-child(7) .select img {
  width: 107%;
}
</style>
