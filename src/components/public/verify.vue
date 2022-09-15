<template>
	<div class="verify">
		<div>
			<h1>{{$t('lPleaseVerify')}}</h1>
			<slide-verify :l="42" :r="10" :w="300" :h="160" :imgs="imgs" @success="onSuccess" @fail="onFail" @refresh="onRefresh" :slider-text="$t('lSlidefilledright')"></slide-verify>
		</div>
	</div>
</template>

<script>
	import img1 from '../../../static/image/verification/1.jpg'
	import img2 from '../../../static/image/verification/2.jpg'
	import img3 from '../../../static/image/verification/3.jpg'
	import img4 from '../../../static/image/verification/4.jpg'
	import img5 from '../../../static/image/verification/5.jpg'
	import img6 from '../../../static/image/verification/6.jpg'
	import img7 from '../../../static/image/verification/7.jpg'
	import img8 from '../../../static/image/verification/8.jpg'
	import img9 from '../../../static/image/verification/9.jpg'
	import img10 from '../../../static/image/verification/10.jpg'
	import img11 from '../../../static/image/verification/11.jpg'
	import img12 from '../../../static/image/verification/12.jpg'
	import img13 from '../../../static/image/verification/13.jpg'
	import img14 from '../../../static/image/verification/14.jpg'
	import img15 from '../../../static/image/verification/15.jpg'
	import img16 from '../../../static/image/verification/16.jpg'
	import img17 from '../../../static/image/verification/17.jpg'
	import img18 from '../../../static/image/verification/18.jpg'
	import img19 from '../../../static/image/verification/19.jpg'
	import img20 from '../../../static/image/verification/20.jpg'
	export default {
		data() {
			return {
				imgs: [
                  img1,
                  img2,
                  img3,
                  img4,
                  img5,
                  img6,
                  img7,
                  img8,
                  img9,
                  img10,
                  img11,
                  img12,
                  img13,
                  img14,
                  img15,
                  img16,
                  img17,
                  img18,
                  img19,
                  img20,
                ],
			}
		},
		mounted() {
		},
		methods: {
			onSuccess() {
				let _this=this
				this.$toast('Verified')
				this.$parent.verify=false
				console.log(this.$parent.verify)
				setTimeout(function() {
					_this.$parent.Connect()
				},500)
			},
			onFail() {
				this.$toast('Failed')
			},
			onRefresh() {
			},
		},
	}
</script>

<style scoped>
	.verify {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(0, 0, 0, .6);
		z-index: 3;
	}
	
	.verify>div {
		background: #ffffff;
		border-radius: 0.1rem;
		padding-bottom: 0.1rem;
	}
	
	.verify>div>h1 {
		text-align: center;
		padding: 0.15rem;
	}
</style>