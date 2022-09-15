<template>
	<div class="rule">
		<header>
			<img @click="$router.back(-1)" src="../../../static/image/headerback.png" v-music/>
			<p>{{$t('bNFTupgraderules')}}</p>
		</header>
		<div>
			<h1 v-if="$route.query.sort=='rare'">{{$t('mRare')}}-{{$t('LMT')}}</h1>
			<h1 v-if="$route.query.sort=='ordinary'">{{$t('mOrdinary')}}-{{$t('LMG')}}</h1>
			<table border="1" v-if="$route.query.sort=='rare'">
				<thead>
					<tr>
						<th>{{$t('eLEVEL')}}</th>
						<th>{{$t('bUpgradeconsumption')}} ({{$t('LMT')}})</th>
						<th>{{$t('bearnings')}}({{$t('LMT')}})</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td align="center">1</td>
						<td align="center" class="price">0</td>
						<td align="center" class="price">4</td>
					</tr>
					<tr>
						<td align="center">2</td>
						<td align="center" class="price">1000</td>
						<td align="center" class="price">8</td>
					</tr>
					<tr>
						<td align="center">3</td>
						<td align="center" class="price">4000</td>
						<td align="center" class="price">33</td>
					</tr>
					<tr>
						<td align="center">4</td>
						<td align="center" class="price">8000</td>
						<td align="center" class="price">67</td>
					</tr>
					<tr>
						<td align="center">5</td>
						<td align="center" class="price">13000</td>
						<td align="center" class="price">108</td>
					</tr>
					<tr>
						<td align="center">6</td>
						<td align="center" class="price">19000</td>
						<td align="center" class="price">158</td>
					</tr>
					<tr>
						<td align="center">7</td>
						<td align="center" class="price">26000</td>
						<td align="center" class="price">217</td>
					</tr>
					<tr>
						<td align="center">8</td>
						<td align="center" class="price">34000</td>
						<td align="center" class="price">283</td>
					</tr>
					<tr>
						<td align="center">9</td>
						<td align="center" class="price">45000</td>
						<td align="center" class="price">375</td>
					</tr>
					<tr>
						<td align="center">10</td>
						<td align="center" class="price">50000</td>
						<td align="center" class="price">417</td>
					</tr>
				</tbody>
			</table>
			<table border="1" v-if="$route.query.sort=='ordinary'">
				<thead>
					<tr>
						<th>{{$t('eLEVEL')}}</th>
						<th>{{$t('bUpgradeconsumption')}} ({{$t('LMG')}})</th>
						<th>{{$t('bearnings')}}({{$t('LMG')}})</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td align="center">1</td>
						<td align="center" class="price">0</td>
						<td align="center" class="price">400</td>
					</tr>
					<tr>
						<td align="center">2</td>
						<td align="center" class="price">100000</td>
						<td align="center" class="price">800</td>
					</tr>
					<tr>
						<td align="center">3</td>
						<td align="center" class="price">400000</td>
						<td align="center" class="price">4150</td>
					</tr>
					<tr>
						<td align="center">4</td>
						<td align="center" class="price">800000</td>
						<td align="center" class="price">6650</td>
					</tr>
					<tr>
						<td align="center">5</td>
						<td align="center" class="price">1300000</td>
						<td align="center" class="price">21650</td>
					</tr>
					<tr>
						<td align="center">6</td>
						<td align="center" class="price">1900000</td>
						<td align="center" class="price">37500</td>
					</tr>
					<tr>
						<td align="center">7</td>
						<td align="center" class="price">2600000</td>
						<td align="center" class="price">59150</td>
					</tr>
					<tr>
						<td align="center">8</td>
						<td align="center" class="price">3400000</td>
						<td align="center" class="price">87500</td>
					</tr>
					<tr>
						<td align="center">9</td>
						<td align="center" class="price">4500000</td>
						<td align="center" class="price">125000</td>
					</tr>
					<tr>
						<td align="center">10</td>
						<td align="center" class="price">5000000</td>
						<td align="center" class="price">166650</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
</script>

<style scoped>
	.rule {
		width: 100%;
		margin-bottom: .93rem;
	}
	.rule div {
		background: url(../../../static/image/rule.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		margin: 0.25rem 0.11rem 0;
		padding-bottom: .2567rem;
	}
	
	.rule div h1 {
		text-align: center;
		color: #DFE117;
		font-size: .2rem;
		padding: 0.2767rem 0 0.24rem;
		text-transform: uppercase;
		font-family: 'Magistral-Bold';
	}
	
	.rule div table {
		width: 92%;
		margin: 0 0.16rem;
		color: #ffffff;
		font-size: .12rem;
		border-color: #35E7FF;
	}
	
	.rule div table thead tr {
		height: 0.49rem;
	}
	
	.rule div table thead tr th {
		font-size: .12rem;
		text-transform: uppercase;
	}
	
	.rule div table thead tr th:nth-child(1) {
		width: 0.5833rem;
	}
	
	.rule div table thead tr th:nth-child(2) {
		width: 1.2933rem;
	}
	.rule div table thead tr td{
		font-size: .16rem;
	}
	.rule div table .price {
		color: #DFE117;
	}
	
	.rule div table tbody tr {
		height: .35rem;
	}
</style>