<template>
	<div class="noticedelete">
		<div class="frame">
			<p>Are you sure to delete this<br>announcement?</p>
			<div>
				<button type="button">YES</button>
				<button type="button">NO</button>
			</div>
		</div>
	</div>
</template>

<script>
</script>

<style scoped>
	.noticedelete {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		background: rgba(0, 0, 0, .5);
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.noticedelete .frame {
		background: url(../../../static/image/27BG.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}
	
	.noticedelete .frame p {
		font-size: .18rem;
		color: #ffffff;
		font-weight: bold;
		margin: .715rem .35rem .425rem;
		text-align: center;
		line-height: .24rem;
	}
	
	.noticedelete .frame div {
		margin: 0 .17rem;
		display: flex;
		justify-content: space-between;
	}
	
	.noticedelete .frame div button {
		background-repeat: no-repeat;
		background-size: 100% 100%;
		width: 45%;
		height: .45rem;
		padding-bottom: .05rem;
		margin-bottom: .51rem;
		font-size: .18rem;
		color: #ffffff;
		font-weight: bold;
	}
	
	.noticedelete .frame div button:nth-child(1) {
		background-image: url(../../../static/image/YES.png);
	}
	
	.noticedelete .frame div button:nth-child(2) {
		background-image: url(../../../static/image/NO.png);
	}
</style>