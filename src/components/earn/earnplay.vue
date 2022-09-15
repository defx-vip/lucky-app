<template>
    <div class="play">
        <header>
			<img @click="$router.back(-1)" src="../../../static/image/headerback.png" v-music/>
			<p>{{$t('eLuckyFarm')}}</p>
		</header>
        <div class="play-top">
            <div class="play-top-con">
                <div class="logo"><img src="../../../static/image/LMT.png" alt=""></div>
                <div class="line"><p></p></div>
                <div class="accum"><p v-html="$t('eAccumulatedDividends')"></p></div>
                <div class="right"><p>{{prizeNumber}} {{$t('LMT')}}</p></div>
            </div>
        </div>
        <div class="play-main">
            <div class="main-box">
                <div class="more">
                    <p>{{$t('eWantMore')}}</p>
                    <p>{{$t('eHeadtotheLobby')}}</p>
                    <p class="btn" @click="goherf" v-music>{{$t('eGO')}}!</p>
                </div>
                <div class="btn" @click="$router.push('/earnplaylist')" v-movedown v-music>{{$t('eRECEIVEEARNINGS')}}</div>
                <div class="rule">
                    <p class="title">{{$t('eRule')}}</p>
                    <p>{{$t('eThewheeloffortune')}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                prizeNumber:0,
            }
        },
        mounted() {
            this.getPrizeNum()
        },
        methods: {
            getPrizeNum(){
                 let _this = this
                this.$post(this.$apiUtil.getPrizeNumber, {playerId:this.$cookies.get('playerId')})
                .then((res) => {
                   _this.prizeNumber = res.data.prizeNumber
				})
            },
            goherf() {
				window.location.href = process.env.hrefall
			},
        },
    }
</script>

<style scoped>
.play{
    width: 100%;
}

.play-top{
    width: 3.5rem;
    height: 1.02rem;
    margin: .23rem auto 0;
    border-radius: .1rem;
    background: url(../../../static/image/earnplay1.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
.play-top-con{
    display: flex;
    justify-content: center;
    padding-top: .19rem;
    box-sizing: border-box;
}
.play-top-con .logo{
    width: .5rem;
    height: .5rem;
    border-radius: 50%;
    overflow: hidden;
    margin-right: .2rem;
}
.play-top-con .logo img{
    width: 100%;
}
.play-top-con .line{
    width: 0.02rem;
    height: 0.3rem;
    background: linear-gradient(0deg, #9701D5, #B300FD);
    margin-right: .11rem;    
    align-self: center;
}
.play-top-con .accum{
    font-family: Magistral-Medium;
    color: #FFF;
    margin-right: .5rem;
    align-self: center;
    font-size: .14rem;
}
.play-top-con .right{
    font-family: Magistral-Medium;
    color: #EAAA00;
    align-self: center;
    font-size: .17rem;
}
.play-main{
    width: 3.5rem;
    height: 5.143rem;
    background: url(../../../static/image/earnplay2.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    margin: .1rem auto 1rem;
    padding: .18rem;
    border-radius: .1rem;
    box-sizing: border-box;
}
.main-box .more{
    height: 1.4rem;
    background: url(../../../static/image/reanplaymain.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    font-family: Magistral-Medium;
    font-size: .2rem;
    padding: .3rem auto 0;
    box-sizing: border-box;
    text-align: center;
}
.main-box .more p{
    color: #FFFFFF;
    font-size: .2rem;
}
.main-box .more p:nth-child(1){
    padding-top: .4rem;
    box-sizing: border-box;
}
.main-box .more>.btn{
    width: .75rem;
    height: .2rem;
    line-height: .2rem;
    margin: .2rem auto;
    background: linear-gradient(90deg, #FEFF00, #FF13BF);
    border-radius: .15rem;
    font-size: .14rem;
    color: #FFF;
}
.main-box .btn{
    width: 2.27rem;
    height: .39rem;
    line-height: .39rem;
    margin: .15rem auto 0;
    text-align: center;
    color: #000000;
    font-size: .14rem;
    background: linear-gradient(#FFFC00, #DB7100);
    border-radius: .3rem;
    text-transform: uppercase;
}
.main-box .rule{
    width: 3.19rem;
    height: 2.51rem;
    border: .01rem solid #35E7FF;
    margin: .15rem auto;
    padding: .11rem .23rem .32rem;
    box-sizing: border-box;
    color: #FFF;
    border-radius: .1rem;
}
.main-box .rule .title{
    text-align: center;
    font-size: .17rem;
}
.main-box .rule p{
    width: 100%;
    font-size: .13rem;
    line-height: .24rem;
}
</style>