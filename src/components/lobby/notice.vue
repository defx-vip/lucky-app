<template>
	<div class="notice">
		<!-- <div class="seo">
			<img src="../../../static/image/seonft.png" />
			<input type="text" placeholder="Search" />
		</div> -->
		<ul v-infinite-scroll="loadMore"
			infinite-scroll-disabled="true"
			infinite-scroll-distance="10">
			<li v-for="(item, index) in list" :key="item.id">
				<div class="list" @click="$router.push('/noticedetails?id='+item.id)" v-music>
					<img src="../../../static/image/notice.png" />
					<div class="right">
						<h1>{{index+1}}.  {{item.tittle}}</h1>
						<p>{{item.content}}</p>
						<span>{{ timeFrom(item.createTime) }}</span>
					</div>
				</div>
				<!-- <div class="delete">
					<img src="../../../static/image/delete.png" />
				</div> -->
			</li>
		</ul>
		<!-- <div class="load" ><mt-spinner type="fading-circle"></mt-spinner></div> -->
		<!-- <div class="nolist" v-if="total==0">{{$t('eNodata')}}</div> -->


		<!-- <noticedelete v-if="nodelete"></noticedelete> -->
	</div>
</template>

<script>
	export default {
		data() {
			return {
				pages: 1,
				list: [],
				total:1,
				nextbool:false,
			}
		},
		created() {
		},
		methods: {
			 timeFrom(time) {
				var nowDay = new Date(time);
				//十位需要乘1000，十三位可以直接用
				return `${nowDay.getFullYear()}-${nowDay.getMonth() +
				1}-${nowDay.getDate()}`;
			},
			loadMore() {
				let _this=this
				if(Number(_this.list.length)>=Number(_this.total)){
					return false;
				}
				if(_this.nextbool==true){
					return false;
				}
				_this.nextbool=true;
				this.$post(this.$apiUtil.getnoticelist, {
					playerId:this.$cookies.get('playerId'),
					walletAddress:this.$cookies.get('walletAddress'),
					size: 10,
					current: this.pages
				}).then((res) => {
					// debugger
					_this.total=res.data.total
					for(let i = 0; i < res.data.records.length; i++) {
						_this.list.push(res.data.records[i]);
					}
					_this.pages = _this.pages + 1;
					_this.nextbool=false;
				})
			},
		},
		mounted() {

		}
	}
</script>

<style scoped>
	.notice {
		margin-bottom: .93rem;
	}
	.notice .seo {
		margin: .2rem .14rem 0;
		background: rgba(73, 7, 133, .55);
		border-radius: .21rem;
		border: 1px solid #6A5C9E;
		height: .41rem;
		display: flex;
		align-items: center;
		position: relative;
	}
	
	.notice .seo input {
		color: #ffffff;
		width: 80%;
		padding: 0;
		font-size: .16rem;
		font-family: Magistral-Bold;
		font-weight: bold;
	}
	
	.notice .seo img {
		width: .16rem;
		height: .16rem;
		margin-left: .113rem;
		margin-right: .14rem;
	}
	.notice ul{
		margin-top: .1rem;
	}
	.notice ul li {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		/*overflow: auto;*/
	}
	
	.notice ul li .delete {
		margin-left: .2rem;
		padding-right: .2rem;
	}
	
	.notice ul li .list {
		display: flex;
		background: url(../../../static/image/10BG.png);
		background-repeat: no-repeat;
		background-size: 100%;
		margin: 0 0 .05rem 3%;
		width: 94%;
		padding-bottom: .15rem;
	}
	
	.notice ul li .list img {
		width: .4867rem;
		height: .4867rem;
		margin-top: .1833rem;
		margin-left: .19rem;
		margin-right: .1767rem;
	}
	
	.notice ul li .list .right {
		color: #ffffff;
		line-height: .15rem;
		margin-right: .22rem;
		flex: 1;
    	width: 0;
	
	}
	
	.notice ul li .list .right h1 {
		color: #ffffff;
		margin-top: .2267rem;
		font-size: .14rem;
		font-family: Magistral-Medium;
		line-height: .1033rem;
		margin-bottom: .1233rem;
		text-transform: uppercase;
	}
	
	.notice ul li .list .right p {
		font-size: .12rem;
		color: #ffffff;
		/* line-height: .09rem; */
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-family: Magistral-Book;
		width: 90%;
	}
	
	.notice ul li .list .right span {
		font-size: .12rem;
		text-align: right;
		display: block;
		margin-top: .1rem;
		color: #F5D90E;
		font-family: Magistral-Book;
		line-height: .09rem;
	}
</style>