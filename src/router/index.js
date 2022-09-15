import Vue from 'vue'
import Router from 'vue-router'
import lobby from '@/components/lobby/index'
import nft from '@/components/nft/index'
import earn from '@/components/earn/index'
import market from '@/components/market/index'
import ready from '@/components/ready/index'
import wallet from '@/components/lobby/wallet'
import withdrawal from '@/components/lobby/withdrawal'
import recharge from '@/components/lobby/recharge'
import sell from '@/components/nft/sell'
import offsell from '@/components/nft/offsell'
import marketdetails from '@/components/market/marketdetails'
import NFTMarket from '@/components/market/NFTMarket'
import TreasureChest from '@/components/market/TreasureChest'
import Exchange from '@/components/market/Exchange'
import member from '@/components/earn/member'
import lppledge from '@/components/earn/lppledge'
import lp from '@/components/earn/lp'
import lpall from '@/components/earn/lpall'
import assetdetails from '@/components/lobby/assetdetails'
import notice from '@/components/lobby/notice'
import noticedetails from '@/components/lobby/noticedetails'
import caseopen from '@/components/ready/caseopen'
import grade from '@/components/ready/grade'
import ranking from '@/components/ready/ranking'
import calendar from '@/components/ready/calendar'
import game from '@/components/lobby/game'
import marketbuy from '@/components/market/marketbuy'
import upgradein from '@/components/nft/upgradein'
import details from '@/components/nft/details'
import detailsup from '@/components/nft/detailsup'
import rule from '@/components/nft/rule'
import blindbox from '@/components/market/blindbox'
import receive from '@/components/nft/receive'
import earnplay from '@/components/earn/earnplay'
import earnplaylist from '@/components/earn/earnplaylist'
import sign from '@/components/lobby/signin'
import memberlist from '@/components/earn/memberlist'
import friend from '@/components/earn/friend'
import Treasure from '@/components/market/Treasure'
import ExchangeLMT from '@/components/market/ExchangeLMT'
import myPledge from '@/components/earn/myPledge'
import myTeam from '@/components/earn/myTeam'

Vue.use(Router)

export default new Router({
	routes: [{
			path: '/',
			name: 'lobby',
			component: lobby,
			meta: {
				navShow: true
			}
		},
		{
			path: '/nft',
			name: 'nft',
			component: nft,
			meta: {
				navShow: true
			}
		},
		{
			path: '/earn',
			name: 'earn',
			component: earn,
			meta: {
				navShow: true
			}
		},
		{
			path: '/market',
			name: 'market',
			component: market,
			meta: {
				navShow: true
			},
			children: [{
					path: '/market/NFTMarket',
					name: 'NFTMarket',
					component: NFTMarket,
					meta: {
						navShow: true,
						parentname: '/market/NFTMarket',
					}
				},
				{
					path: '/market/Treasure',
					name: 'Treasure',
					component: Treasure,
					meta: {
						navShow: true,
						parentname: '/market/Treasure',
					},
					children: [{
						path: '/market/TreasureChest',
						name: 'TreasureChest',
						component: TreasureChest,
						meta: {
							navShow: true,
							parentname: '/market/TreasureChest',
							parent:'/market/Treasure'
						}
					}, {
						path: '/market/ExchangeLMT',
						name: 'ExchangeLMT',
						component: ExchangeLMT,
						meta: {
							navShow: true,
							parentname: '/market/ExchangeLMT',
							parent:'/market/Treasure'
						}
					}]
				},
				{
					path: '/market/Exchange',
					name: 'Exchange',
					component: Exchange,
					meta: {
						navShow: true,
						parentname: '/market/Exchange',
					}
				},
			]
		},
		{
			path: '/marketdetails',
			name: 'marketdetails',
			component: marketdetails,
			meta: {
				navShow: true,
			}
		},
		{
			path: '/ready',
			name: 'ready',
			component: ready,
			meta: {
				navShow: true
			}
		},

		{
			path: '/wallet',
			name: 'wallet',
			component: wallet,
			meta: {
				navShow: true
			}
		},
		{
			path: '/withdrawal',
			name: 'withdrawal',
			component: withdrawal,
			meta: {
				navShow: true
			}
		},
		{
			path: '/recharge',
			name: 'recharge',
			component: recharge,
			meta: {
				navShow: true
			}
		},
		{
			path: '/sell',
			name: 'sell',
			component: sell,
			meta: {
				navShow: true
			}
		},
		{
			path: '/offsell',
			name: 'offsell',
			component: offsell,
			meta: {
				navShow: true
			}
		},
		{
			path: '/member',
			name: 'member',
			component: member,
			meta: {
				navShow: true
			}
		},
		{
			path: '/lppledge',
			name: 'lppledge',
			component: lppledge,
			meta: {
				navShow: true
			}
		},
		{
			path: '/assetdetails',
			name: 'assetdetails',
			component: assetdetails,
			meta: {
				navShow: true
			}
		},
		{
			path: '/notice',
			name: 'notice',
			component: notice,
			meta: {
				navShow: true
			}
		},
		{
			path: '/noticedetails',
			name: 'noticedetails',
			component: noticedetails,
			meta: {
				navShow: true
			}
		},
		{
			path: '/caseopen',
			name: 'caseopen',
			component: caseopen,
			meta: {
				navShow: true
			}
		},
		{
			path: '/grade',
			name: 'grade',
			component: grade,
			meta: {
				navShow: true
			}
		},
		{
			path: '/ranking',
			name: 'ranking',
			component: ranking,
			meta: {
				navShow: true
			}
		},
		{
			path: '/calendar',
			name: 'calendar',
			component: calendar,
			meta: {
				navShow: true
			}
		},
		{
			path: '/game',
			name: 'game',
			component: game,
			meta: {
				navShow: false
			}
		},
		{
			path: '/marketbuy',
			name: 'marketbuy',
			component: marketbuy,
			meta: {
				navShow: true
			}
		},
		{
			path: '/upgradein',
			name: 'upgradein',
			component: upgradein,
			meta: {
				navShow: true
			}
		},
		{
			path: '/details',
			name: 'details',
			component: details,
			meta: {
				navShow: true
			}
		},
		{
			path: '/rule',
			name: 'rule',
			component: rule,
			meta: {
				navShow: true
			}
		},
		{
			path: '/blindbox',
			name: 'blindbox',
			component: blindbox,
			meta: {
				navShow: true
			}
		},
		{
			path: '/receive',
			name: 'receive',
			component: receive,
			meta: {
				navShow: true
			}
		},
		{
			path: '/myPledge',
			name: 'myPledge',
			component: myPledge,
			meta: {
				navShow: true
			}
		},
		{
			path: '/myTeam',
			name: 'myTeam',
			component: myTeam,
			meta: {
				navShow: true
			}
		},
		{
			path: '/detailsup',
			name: 'detailsup',
			component: detailsup,
			meta: {
				navShow: true
			}
		},
		{
			path: '/lp',
			name: 'lp',
			component: lp,
			meta: {
				navShow: true
			}
		},
		{
			path: '/lpall',
			name: 'lpall',
			component: lpall,
			meta: {
				navShow: true
			}
		},
		{
			path: '/earnplay',
			name: 'earnplay',
			component: earnplay,
			meta: {
				navShow: true
			}
		},
		{
			path: '/earnplaylist',
			name: 'earnplaylist',
			component: earnplaylist,
			meta: {
				navShow: true
			}
		},
		{
			path: '/sign',
			name: 'sign',
			component: sign,
			meta: {
				navShow: false
			}
		},
		{
			path: '/memberlist',
			name: 'memberlist',
			component: memberlist,
			meta: {
				navShow: false
			}
		},
		{
			path: '/friend',
			name: 'friend',
			component: friend,
			meta: {
				navShow: false
			}
		},
	]
})