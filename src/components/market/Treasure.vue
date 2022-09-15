<template>
	<div class="Treasure">
		<div class="nav">
			<!--<p :class="$route.meta.parentname=='/market/TreasureChest'?'active':''" v-if="$store.state.environment=='production'" @click.stop="$parent.$parent.$refs['pop'].pop=true" v-music>Mystery</p>-->
			<p :class="$route.meta.parentname=='/market/TreasureChest'?'active':''" @click="$router.push('/market/TreasureChest')" v-music>{{$t('mMystery')}}</p>
			<p :class="$route.fullPath=='/market/ExchangeLMT?change=LMT'?'active':''" @click="$router.push('/market/ExchangeLMT?change=LMT');$refs['Exchange'].reset()" v-music>{{$t('LMT')}}</p>
			<p :class="$route.fullPath=='/market/ExchangeLMT?change=LMG'?'active':''" @click="$router.push('/market/ExchangeLMT?change=LMG');$refs['Exchange'].reset()" v-music>{{$t('LMG')}}</p>
		</div>
		<router-view ref="Exchange"></router-view>
	</div>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		mounted() {
			console.log(this.$route)
		},
		methods: {
		},
	}
</script>

<style scoped>
	
	.Treasure {
		padding-top: .8667rem;
	}
	.Treasure .nav {
		margin: 0.08rem 0.15rem 0.02rem;
		background: #490785;
		border-radius: .06rem;
		border: 1px solid #C18DF4;
		padding: .03rem;
		color: #ffffff;
		display: flex;
		justify-content: space-around;
	}
	
	.Treasure .nav p {
		flex: 1;
		text-align: center;
		padding: 0.08rem 0;
		border-radius: 0.06rem;
		font-size: .16rem;
	}
	
	.Treasure .nav .active {
		background: #F2C900;
		color: #000000;
	}
</style>