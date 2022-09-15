'use strict'
const merge= require('webpack-merge')
const prodEnv= require('./prod.env')
const testEnv= require('./test.env')




// let baseURLStatus
// if (location.href.includes('http://dapp.luckymeta.io/#/') ) {

// 	baseURLStatus = true
// } else {
// 	baseURLStatus = false
// }

// const orterProps  = baseURLStatus ? {
	
// } : {
// 	hrefAdmin: '"http://gametest1.luckymeta.io"',// 5x5slots 测试服
// 	hrefall: '"http://gametest.luckymeta.io/#/"', // 測試
// 	href1: '"http://sic.luckymeta.io/"', // 測試
// 	href2: '"http://bac.luckymeta.io/"', // 測試
// 	href3: '"http://texa.luckymeta.io/"', // 測試
// }

module.exports=  {

	NODE_ENV: '"development"',
	baseURL: '""',
	network: 137,
	networkunit: '"Polygon"',
  
	hrefAdmin: '"http://slots5.luckymeta.io"',// 5x5 slots 正式服
	hrefall: '"http://slots.luckymeta.io/"',// 正式的
	href1: '"http://sicb.luckymeta.io/"',// 正式的
	href2: '"http://bacc.luckymeta.io/"',// 正式的
	href3: '""',
  
	//Polygon
	LMTaddr: '"0xB8bDB98AF8C987336B9476Fd8a98BdF190b6f10E"', //LMT
	LMGaddr: '"0x33179f19B9cca4015FA950Bbee9352c0De918953"', //LMG
	ETHaddr: '"0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619"', //ETH
	LMGLPaddr: '""', //LMGLP
	LMTLPaddr: '""', //LMTLP
	TttPooladdr: '"0x7C8a75FD7027c0B58eda3E6C4e8BBd262C1B0277"', //LMTpool
	GggPooladdr: '"0x5719b5616d02598038DFcec0a73D39A7233edaFc"', //LMGpool
	LMVaddr: '"0xc907fB82B6E63fA0D2F9dE8F5Eff5Fa3603e349F"', //LMV
	Exchangeaddr: '""', //Exchange
	PLMTExchangeaddr: '"0x521786166e4aDd6AFA6dAc7110571e8b72f58be3"',//LMTExchangepolygon
	PLMGExchangeaddr: '"0xC4d7d9749B6a93A1C70c18669c9431253c6eA7d8"',//LMGExchangepolygon
	USDTaddr: '"0xc2132D05D31c914a87C6611C10748AEb04B58e8F"', //USDT
  
	Blindboxaddr: '"0xc8F70bD743E032E1d277087de3bBA377AEEfFd4f"', //LuckyBox
	NFTaddr: '"0x9FfEe0B6450cb8F8A59cb46bAeB00133E49555bf"', //NFT
	BOXmarketaddr: '"0xbF1Ef4dEcade0E8af160d59322b6bC0217a03b69"', //BOXmarket
	NFTmarketaddr: '"0x8710E6f45fCC173f699F3Fd87C87cFF17e5566C4"', //NFTmarket
	gameaddr: '"0xB52EDb80B726a09447EEff2cfCDbCE7d7466442c"', //game
	LMTExchangeNUMaddr: '""', //LMTExchangenum
	LMGExchangeNUMaddr: '""', //LMGExchangenum
  }
  

