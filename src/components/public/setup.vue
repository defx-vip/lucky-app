<template>
	<div class="setup" @click="$parent.setup=false">
		<div @click.stop>
			<h1>{{$t('lGamesettings')}}</h1>
			<ul>
				<li>
					<img src="../../../static/image/SoundEffects.png" />
					<p>{{$t('lSoundEffects')}}</p>
					<div>
						<label><input type="checkbox" v-model="Sound"></label>
					</div>
				</li>
				<li>
					<img src="../../../static/image/Music.png" />
					<p>{{$t('lMusic')}}</p>
					<div>
						<label><input type="checkbox" v-model="Music"></label>
					</div>
				</li>
				<li>
					<img src="../../../static/image/Language.png" />
					<p>{{$t('Language')}}</p>
					<div @click="Language==false?Language=true:Language=false" :class="Language==true?'lan':''">
						<p v-if="$i18n.locale=='en'">English</p>
						<p v-if="$i18n.locale=='zh'">中文（繁体）</p>
						<div>
							<p @click.stop="lan('en')">English</p>
							<p @click.stop="lan('zh')">中文（繁体）</p>
						</div>
						<img class="down" src="../../../static/image/Languagedown.png" />
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				Sound: JSON.parse(this.$store.state.Sound),
				Music: JSON.parse(this.$store.state.Music),
				Language:false,
			}
		},
		watch: {
			'Sound': {
				handler: function() {
					this.$store.state.Sound = this.Sound;
					this.$cookies.set("Sound", this.Sound, {
						expires: 0
					});
				}
			},
			'Music': {
				handler: function() {
					if(this.Music == false) {
						document.getElementById('playall').pause()
					} else {
						document.getElementById('playall').play()
					}
					this.$store.state.Music = this.Music;
					this.$cookies.set("Music", this.Music, {
						expires: 0
					});
				}
			}
		},
		mounted() {
			console.log(JSON.parse(this.$store.state.Music))
		},
		methods: {
			lan(txt) {
				if(localStorage.locale!=txt){
					this.$i18n.locale = txt
					localStorage.setItem('locale', txt)
					location.reload()
				}
				this.Language=false;
			},
		},
	}
</script>

<style scoped>
	.setup {
		position: fixed;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, .6);
		width: 100%;
		height: 100vh;
		z-index: 3;
		display: flex;
		align-items: center;
	}
	
	.setup>div {
		background-image: url(../../../static/image/setupbackground.png);
		background-size: 100% 100%;
		background-position: center;
		flex: 1;
		margin: 0 0.12rem;
		height: 3.2rem;
	}
	
	.setup>div h1 {
		font-size: .2rem;
		text-align: center;
		margin-top: 0.3rem;
		color: #DFE117;
		text-transform: uppercase;
		font-family: 'Magistral-Bold';
		margin-bottom: 0.4rem;
	}
	
	.setup>div ul {
		padding-bottom: .34rem;
	}
	
	.setup>div ul li {
		display: flex;
		align-items: center;
		margin: 0 .43rem;
		justify-content: space-between;
		margin-bottom: .34rem;
	}
	
	.setup>div ul li img {
		width: .25rem;
		height: .25rem;
		margin-right: .23rem;
	}
	
	.setup>div ul li p {
		font-size: .14rem;
		flex: 1;
		color: #DFE117;
		font-family: Magistral-Bold;
	}
	
	.setup>div label {
		position: relative;
		width: .46rem;
		height: .2533rem;
		display: block;
	}
	
	.setup>div label input {
		width: .46rem;
		height: .2533rem;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 2;
		border: 0;
		background: 0 0;
		-webkit-appearance: none;
		outline: 0
	}
	
	.setup>div label input:before {
		content: '';
		width: .42rem;
		height: .22rem;
		border: 2px solid #000000;
		background-color: #000000;
		border-radius: .2rem;
		cursor: pointer;
		display: inline-block;
		position: relative;
		vertical-align: middle;
		-webkit-box-sizing: content-box;
		box-sizing: content-box;
		border-color: #000000;
		-webkit-transition: border .4s, -webkit-box-shadow .4s;
		transition: border .4s, box-shadow .4s;
	}
	
	.setup>div label input:checked:before {
		border-color: #C18DF4;
		background-color: #C18DF4;
		transition: border .4s, box-shadow .4s, background-color 1.2s;
		-webkit-transition: border .4s, -webkit-box-shadow .4s, background-color 1.2s;
		background-color: #C18DF4
	}
	
	.setup>div label input:checked:after {
		left: .22rem
	}
	
	.setup>div label input:after {
		content: '';
		width: .22rem;
		height: .22rem;
		position: absolute;
		top: 50%;
		left: 1px;
		-webkit-transform: translateY(-50%);
		border-radius: 100%;
		background-color: #fff;
		-webkit-transition: left .2s;
		transition: left .2s
	}
	
	.setup>div ul li div p {
		font-size: .12rem;
		color: #ffffff;
		font-family: 'Magistral-Medium';
		margin-bottom: 0.05rem;
	}
	
	.setup>div ul li div img {
		width: 0.12rem;
		height: 0.08rem;
		margin: 0;
		position: absolute;
		top: 0.09rem;
		right: 0.06rem;
	}
	.setup>div ul li:nth-child(3){
		align-items: flex-start;
	}
	.setup>div ul li:nth-child(3)>div{
		background: #280346;
		padding-top: .06rem;
		padding-left: .1rem;
		padding-bottom: .05rem;
		border-radius: .033rem;
		position: relative;
		padding-right: 0.3rem;
		height: 0.17rem;
    	overflow: hidden;
    	width: 0.75rem;
	}
	.setup>div ul li:nth-child(3)>div div{
		display: none;
	}
	.setup>div ul li:nth-child(3) .lan{
		height: auto;
	}
	.setup>div ul li:nth-child(3) .lan>p{
		display: none;
	}
	.setup>div ul li:nth-child(3) .lan div{
		display: block;
	}
	.setup>div ul li:nth-child(3) .lan img{
		transform:rotate(180deg);
	}
	 
	.setup>div ul li:nth-child(3)>p{
		height: 0.25rem;
    	display: flex;
   		align-items: center;
	}
	    
</style>