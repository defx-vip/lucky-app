import Web3 from 'web3'
import { ethers } from 'ethers'
import { abi as LMTAbi } from '@/web3/abi/LMT.json'
import { abi as LMGAbi } from '@/web3/abi/LMG.json'
import { abi as LPAbi } from '@/web3/abi/LP.json'
import { abi as TttPoolAbi } from '@/web3/abi/TttPool.json'
import { abi as LuckyBoxAbi } from '@/web3/abi/LmtLuckyBox.json'
import { abi as LMVAbi } from '@/web3/abi/LuckyvipToken_metadata.json'
import { abi as PLMTExchangeAbi } from '@/web3/abi/LuckyExchange_metadata.json'
import { abi as ExchangeAbi } from '@/web3/abi/Exchange.json'
import { abi as ExchangeNUMAbi } from '@/web3/abi/ExchangeNUM.json'

import { abi as NFTopenAbi } from '@/web3/abi/BrianNftsByBraindom.json'
import { abi as BlindboxAbi } from '@/web3/abi/LuckyTicket_metadata.json'
import { abi as NFTAbi } from '@/web3/abi/LuckyNFT_metadata.json'
import { abi as UnicornMarketAbi } from '@/web3/abi/LuckyMarket.json'
import { abi as GameAbi } from '@/web3/abi/LuckyFi.json'
import $cookies from 'vue-cookies'
import $store from '../store/index'
import { Toast } from 'mint-ui';
//build
$store.state.LMTaddr = process.env.LMTaddr; //LMT
$store.state.LMGaddr = process.env.LMGaddr; //LMG
$store.state.ETHaddr = process.env.ETHaddr; //ETH
$store.state.LMGLPaddr = process.env.LMGLPaddr; //LMGLP
$store.state.LMTLPaddr = process.env.LMTLPaddr; //LMTLP
$store.state.TttPooladdr = process.env.TttPooladdr; //LMTpool
$store.state.GggPooladdr = process.env.GggPooladdr; //LMGpool
$store.state.LMVaddr = process.env.LMVaddr; //LMV
$store.state.Exchangeaddr = process.env.Exchangeaddr; //Exchange
$store.state.PLMTExchangeaddr = process.env.PLMTExchangeaddr; //LMTExchangepolygon
$store.state.PLMGExchangeaddr = process.env.PLMGExchangeaddr; //LMGExchangepolygon
$store.state.USDTaddr = process.env.USDTaddr; //USDT

$store.state.Blindboxaddr = process.env.Blindboxaddr; //LuckyBox
$store.state.NFTaddr = process.env.NFTaddr; //NFT
$store.state.BOXmarketaddr = process.env.BOXmarketaddr; //BOXmarket
$store.state.NFTmarketaddr = process.env.NFTmarketaddr; //NFTmarket
$store.state.gameaddr = process.env.gameaddr; //game
$store.state.LMTExchangeNUMaddr = process.env.LMTExchangeNUMaddr; //LMTExchangenum
$store.state.LMGExchangeNUMaddr = process.env.LMGExchangeNUMaddr; //LMGExchangenum
let _contract_instance;
let from_addr = '',
	network = process.env.network,
	tips = "Please switch to " + process.env.networkunit + " network";

let we3_loadingInstance

var ethUtil = require('ethereumjs-util')
var sigUtil = require('eth-sig-util')
class Web3Tools {
	constructor() {
		// this.userinfo_contract_json = json;
		// this.user_info_contract_addr = addr;
		this.init_web3(1);

		// this.init_web3_1_0_version();
	}

	async init_web3(change) {
		if(window.ethereum) {
			this.ethereum = window.ethereum;
			this.web3 = new Web3(ethereum);

			ethereum.autoRefreshOnNetworkChange = true;
			if(change != 1) {
				let ch = 1
				if(window.location.href.indexOf("utm_source=luckyWallet") == -1){
//				if(ch == 1) {
					await ethereum.enable()
					//				.then(function(accounts) {
					//					console.log(accounts[0])
					let provider = new ethers.providers.Web3Provider(window.ethereum)
					let signer = provider.getSigner()
					await signer.getAddress().then(function(accounts) {
							from_addr = accounts;
							// console.log(from_addr)
						})
						//    				console.log(address)
						//					from_addr = address;
						//					console.log(from_addr)
						//				})
						.catch(function(reason) {
							Toast("Please link wallet");
							// Handle error. Likely the user rejected the login:
							//                  MessageBox.alert(i18n.t('UserRejected'), '', {
							//                      confirmButtonText: 'OK',
							//                      callback: action => {
							//                          window.open('https://metamask.io', '_blank');
							//                      }
							//                  });
							return false;
						})
				} else {
					var account = await ethereum.enable()
					console.log(account)
					from_addr = account[0];
				}
			}
			this.listening_web3();
			// //console.log( 'this.web3', this.web3 );
//			ethereum.on('accountsChanged', function(accounts) {
//				// //console.log(accounts[0])
//			})
//			ethereum.on('networkChanged', function(result) {
//				// //console.log(result)
//			})

			return true;
		} else if(window.web3) {
			this.web3 = new Web3(web3.currentProvider);
			this.listening_web3();
			//console.log( 'this.web3', this.web3 );
			return true;
		} else {
			//			console.log(i18n.t('NoEthereum'));
			// MessageBox.alert(i18n.t('NoEthereum'), '', {
			//     confirmButtonText: 'OK',
			//     callback: action => {
			//         window.open('https://metamask.io', '_blank');
			//     }
			// });
			return false;
		}

	}

	async init_web3_singIn() {
		if(window.ethereum) {
			this.ethereum = window.ethereum;
			this.web3 = new Web3(ethereum);
			this.listening_web3();
			//console.log( 'this.web3', this.web3 );
			return true;
		} else if(window.web3) {
			this.web3 = new Web3(web3.currentProvider);
			this.listening_web3();
			//console.log( 'this.web3', this.web3 );
			return true;
		} else {
			// //console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
			// MessageBox('Non-Ethereum browser detected. You should consider trying MetaMask!', '', {});
			//console.log(i18n.t('NoEthereum'));

			// MessageBox.alert(i18n.t('NoEthereum'), '', {
			//     confirmButtonText: 'OK',
			//     callback: action => {
			//         window.open('https://metamask.io', '_blank');
			//     }
			// });
			return false;
		}

	}

	async verifyWeb3(num) {

		console.log('==' + from_addr)

		if(this.web3) {
			//console.log('==' + from_addr);
		} else {
			var _web3 = await this.init_web3();
		}
		console.log(111111111)
		console.log(ethereum.networkVersion)
		//		if(num=='p'){
		//			if(ethereum.networkVersion != networkp) {
		//				Toast(tipsp);
		//				return false;
		//			}
		//		}else{
		
		//		}

		if($cookies.get('walletAddress') == '') {
			return false;
		}
		this.web3.eth.net.getId().then((e) => {
			if(e != network) {
				Toast(tips);
				return false;
			}
		})
		//		if($cookies.get('walletAddress').toString().toUpperCase() != from_addr.toString().toUpperCase()) {
		//			return false;
		//		}

		return true;
	}
	async verifyWeb3Addr() {
		// //console.log('==' + from_addr)
		if(this.web3) {
			// //console.log('==' + from_addr);
		} else {
			var _web3 = await this.init_web3();
			// //console.log(_web3)
			// //console.log('==2 ' + from_addr)
			return true;
		}
		return true;
	}

	listening_web3() {
		this.web3.eth.net.isListening().then((result) => {});
		this.web3.eth.net.getId().then((result) => {
			// eth_net_id = result;
		});
	}

	event_contract(contract_instance) {
		contract_instance.events.NewArtist((error, event) => {
			//console.log( 'eventInfo', error, event );
		}).on('data', (result) => {
			//console.log( 'data', result.returnValues );
		}).on('changed', (result) => {
			//console.log( 'changed', result );
		}).on('error', console.error);

		contract_instance.events.eventInfo((error, event) => {
			//console.log( 'eventInfo', error, event );
		}).on('data', (result) => {
			//console.log( 'data', result.returnValues );
		}).on('changed', (result) => {
			//console.log( 'changed', result );
		}).on('error', console.error);
	}
	change_web3(fromaddr, toaddr, money) {
		this.web3.eth.sendTransaction({
				from: fromaddr,
				to: toaddr,
				value: money
			})
			.on('transactionHash', function(hash) {})
			.on('receipt', function(receipt) {})
			.on('error', function(error) {})
	}
	abi(contract_address) {
		let _contract_instance
		if(contract_address == $store.state.Blindboxaddr) {
			_contract_instance = new this.web3.eth.Contract(BlindboxAbi, contract_address)
		} else if(contract_address == $store.state.NFTaddr) {
			_contract_instance = new this.web3.eth.Contract(NFTAbi, contract_address)
		} else if(contract_address == $store.state.BOXmarketaddr || contract_address == $store.state.NFTmarketaddr) {
			_contract_instance = new this.web3.eth.Contract(UnicornMarketAbi, contract_address)
		} else if(contract_address == $store.state.gameaddr) {
			_contract_instance = new this.web3.eth.Contract(GameAbi, contract_address)
		} else if(contract_address == $store.state.ETHaddr || contract_address == $store.state.USDTaddr) {
			_contract_instance = new this.web3.eth.Contract(LMTAbi, contract_address)
		} else if(contract_address == $store.state.LMTExchangeNUMaddr || contract_address == $store.state.LMGExchangeNUMaddr) {
			_contract_instance = new this.web3.eth.Contract(ExchangeNUMAbi, contract_address)
		} else if(contract_address == $store.state.TttPooladdr || contract_address == $store.state.GggPooladdr) {
			_contract_instance = new this.web3.eth.Contract(TttPoolAbi, contract_address)
		} else if(contract_address == $store.state.LMGLPaddr || contract_address == $store.state.LMTLPaddr) {
			_contract_instance = new this.web3.eth.Contract(LPAbi, contract_address)
		} else if(contract_address == $store.state.LMVaddr) {
			_contract_instance = new this.web3.eth.Contract(LMVAbi, contract_address)
		} else if(contract_address == $store.state.LMGaddr) {
			_contract_instance = new this.web3.eth.Contract(LMGAbi, contract_address)
		} else if(contract_address == $store.state.LMTaddr) {
			_contract_instance = new this.web3.eth.Contract(LMTAbi, contract_address)
		} else if(contract_address == $store.state.PLMTExchangeaddr || contract_address == $store.state.PLMGExchangeaddr) {
			_contract_instance = new this.web3.eth.Contract(PLMTExchangeAbi, contract_address)
		}
		return _contract_instance

	}
	async getEthAddrInfo() {
		var _verify = await this.verifyWeb3Addr();
		//console.log(from_addr);
		if(from_addr == '') {
			return '';
		}
		return from_addr;
	}

	async verifyWeb3AddrSingIn() {
		//console.log('==' + from_addr)
		var _web3 = await this.init_web3();
		//console.log('==2 ' + from_addr)
		return true;
	}

	// init web3 singin
	async initWeb3SingIn() {
		var _web3 = await this.init_web3_singIn();

		//console.log('web3.eth.coinbase == ', this.web3.eth.coinbase)

		return _web3;
	}

	async getEthAddrInfoSingIn() {
		//console.log(this.web3)
		if(this.web3) {
			var _verify = await this.verifyWeb3AddrSingIn();
			// //console.log('====== ', from_addr);
		}
		return from_addr;
	}

	sign_web(_nonce, _sign_web_callback) {
		console.log(_nonce)
		var text = '' + _nonce
		var msg = ethUtil.bufferToHex(new Buffer(text, 'utf8'))
		var from = from_addr
		var params = [msg, from]
		var method = 'personal_sign'
		if(this.web3==undefined){
			this.ethereum = window.ethereum;
			this.web3 = new Web3(ethereum);

			ethereum.autoRefreshOnNetworkChange = true;
		}
		this.web3.currentProvider.sendAsync({
			method,
			params,
			from,
		}, function(err, result) {
			if(err) return console.error(err)
			if(result.error) return console.error(result.error)
			const msgParams = {
				data: msg
			}
			msgParams.sig = result.result
			// console.dir({ msgParams })
			const recovered = sigUtil.recoverPersonalSignature(msgParams)
			// console.dir({ recovered })
			console.log(result.result)
			 if (recovered === from||recovered === from.toLowerCase()) {
				_sign_web_callback(result.result)
			} else {
				console.dir(recovered)
			}
		})
	}

	async getgoBalance(_account, show) {
		var _verify = await this.verifyWeb3Addr();
		this.web3.eth.getBalance(_account).then(show);
	}
	linkNft(contract_address, tokenId, _callback, _callbackin) {
		this.verifyWeb3().then(rs => {
			if(rs) {
				this.base_transaction = {
					'from': from_addr,
					'gas': 60 * 10000,
				}
				let _contract_instance = this.abi(contract_address)
				_contract_instance.methods.linkNft(tokenId).send(this.base_transaction)
					.on('transactionHash', function(hash) {
						_callback(true)
					})
					.on('receipt', function(receipt) {
						_callbackin(true)
					})
					.on('error', function(error) {

					})
			}
		})
	}
	depositeNft(contract_address, tokenId, _callback, _callbackin) {
		this.verifyWeb3().then(rs => {
			if(rs) {
				this.base_transaction = {
					'from': from_addr,
					'gas': 60 * 10000,
				}
				let _contract_instance = this.abi(contract_address)
				_contract_instance.methods.depositeNft(tokenId).send(this.base_transaction)
					.on('transactionHash', function(hash) {
						_callback(true)
					})
					.on('receipt', function(receipt) {
						_callbackin(true)
					})
					.on('error', function(error) {

					})
			}
		})
	}
	withdrawNft(contract_address, tokenId, _callback, _callbackin) {
		this.verifyWeb3().then(rs => {
			if(rs) {
				this.base_transaction = {
					'from': from_addr,
					'gas': 60 * 10000,
				}
				let _contract_instance = this.abi(contract_address)
				_contract_instance.methods.withdrawNft(tokenId).send(this.base_transaction)
					.on('transactionHash', function(hash) {
						_callback(true)
					})
					.on('receipt', function(receipt) {
						_callbackin(true)
					})
					.on('error', function(error) {

					})
			}
		})
	}
	getBonus(contract_address, _callback, _callbackin) {
		this.verifyWeb3().then(rs => {
			if(rs) {
				this.base_transaction = {
					'from': from_addr,
					'gas': 60 * 10000,
				}
				let _contract_instance = this.abi(contract_address)
				_contract_instance.methods.getBonus().send(this.base_transaction)
					.on('transactionHash', function(hash) {
						_callback(true)
					})
					.on('receipt', function(receipt) {
						_callbackin(true)
					})
					.on('error', function(error) {

					})
			}
		})
	}
	batchCreatPersonNFT(contract_address, tokenId, _callback, _callbackin) {
		this.verifyWeb3().then(rs => {
			if(rs) {
				this.base_transaction = {
					'from': from_addr,
					'gas': 300 * 10000,
				}
				//				let _contract_instance = new this.web3.eth.Contract(GameAbi, contract_address)
				let _contract_instance = this.abi(contract_address)
				// console.log(contract_address)
				// console.log(tokenId)
				_contract_instance.methods.batchMintFromTicket(tokenId).send(this.base_transaction)
					.on('transactionHash', function(hash) {
						_callback(true)
					})
					.on('receipt', function(receipt) {
						_callbackin(true)
					})
					.on('error', function(error) {

					})
			}
		})
	}
	bonusForIds(contract_address, tokenId, _callback, _callbackin) {
		this.verifyWeb3().then(rs => {
			if(rs) {
				this.base_transaction = {
					'from': from_addr,
					'gas': 60 * 10000,
				}
				let _contract_instance = new this.web3.eth.Contract(GameAbi, contract_address)
				_contract_instance.methods.bonusForIds(tokenId).send(this.base_transaction)
					.on('transactionHash', function(hash) {
						_callback(true)
					})
					.on('receipt', function(receipt) {
						_callbackin(true)
					})
					.on('error', function(error) {

					})
			}
		})
	}
	bonusForAllId(contract_address, addr, _callback, _callbackin) {
		this.verifyWeb3().then(rs => {
			if(rs) {
				this.base_transaction = {
					'from': from_addr,
					'gas': 60 * 10000,
				}
				let _contract_instance = new this.web3.eth.Contract(GameAbi, contract_address)
				_contract_instance.methods.bonusForAllId(addr).send(this.base_transaction)
					.on('transactionHash', function(hash) {
						_callback(true)
					})
					.on('receipt', function(receipt) {
						_callbackin(true)
					})
					.on('error', function(error) {

					})
			}
		})
	}
	levelup(contract_address, tokenId, _callback, _callbackin) {
		this.verifyWeb3().then(rs => {
			if(rs) {
				this.base_transaction = {
					'from': from_addr,
					'gas': 60 * 10000,
				}
				let _contract_instance = new this.web3.eth.Contract(GameAbi, contract_address)
				_contract_instance.methods.levelup(tokenId).send(this.base_transaction)
					.on('transactionHash', function(hash) {
						_callback(true)
					})
					.on('receipt', function(receipt) {
						_callbackin(true)
					})
					.on('error', function(error) {

					})
			}
		})
	}
	swapExactTokensForTokens(contract_address, form, to, mine, amount1, amount2, time, _callback, _callbackin) {
		this.verifyWeb3().then(rs => {
			if(rs) {
				this.base_transaction = {
					'from': from_addr,
					'gas': 60 * 10000,
				}
				let _contract_instance = new this.web3.eth.Contract(ExchangeAbi, contract_address)
				_contract_instance.methods.swapExactTokensForTokens(web3tools.web3.utils.toWei(amount1.toString(), 'ether'), web3tools.web3.utils.toWei(amount2.toString(), 'ether'), [form, to], mine, time).send(this.base_transaction)
					.on('transactionHash', function(hash) {
						_callback(true)
					})
					.on('receipt', function(receipt) {
						_callbackin(true)
					})
					.on('error', function(error) {

					})
			}
		})
	}
	bidOrder(contract_address, tokenId, _callback, _callbackin) {
		this.verifyWeb3().then(rs => {
			if(rs) {
				this.base_transaction = {
					'from': from_addr,
					'gas': 60 * 10000,
				}
				let _contract_instance = new this.web3.eth.Contract(UnicornMarketAbi, contract_address)
				_contract_instance.methods.bidOrder(tokenId).send(this.base_transaction)
					.on('transactionHash', function(hash) {
						_callback(true)
					})
					.on('receipt', function(receipt) {
						_callbackin(true)
					})
					.on('error', function(error) {

					})
			}
		})
	}
	cancelOrder(contract_address, tokenId, _callback, _callbackin) {
		this.verifyWeb3().then(rs => {
			if(rs) {
				this.base_transaction = {
					'from': from_addr,
					'gas': 60 * 10000,
				}
				//				let _contract_instance = new this.web3.eth.Contract(UnicornMarketAbi, contract_address)
				let _contract_instance = this.abi(contract_address)
				_contract_instance.methods.cancelOrder(tokenId).send(this.base_transaction)
					.on('transactionHash', function(hash) {
						_callback(true)
					})
					.on('receipt', function(receipt) {
						_callbackin(true)
					})
					.on('error', function(error) {

					})
			}
		})
	}
	onERC721Received(contract_address, form, to, tokenId, price, _callback, _callbackin) {
		this.verifyWeb3().then(rs => {
			if(rs) {
				this.base_transaction = {
					'from': from_addr,
					'gas': 60 * 10000,
				}
				let _contract_instance = new this.web3.eth.Contract(UnicornMarketAbi, contract_address)
				let _data = this.web3.utils.padLeft(this.web3.utils.toHex(this.web3.utils.toWei(price.toString(), 'ether')), 64);
				// console.log(contract_address)
				// console.log(form)
				// console.log(to)
				// console.log(tokenId)
				// console.log(_data)
				//				return false;
				_contract_instance.methods.onERC721Received(to, form, tokenId, _data).send(this.base_transaction)
					.on('transactionHash', function(hash) {
						_callback(true)
					})
					.on('receipt', function(receipt) {
						_callbackin(true)
					})
					.on('error', function(error) {

					})
			}
		})
	}
	safeTransferFrom(contract_address, form, to, tokenId, price, _callback, _callbackin) {
		this.verifyWeb3().then(rs => {
			if(rs) {
				this.base_transaction = {
					'from': from_addr,
					'gas': 60 * 10000,
				}
				//				let _contract_instance = new this.web3.eth.Contract(NFTAbi, contract_address)
				let _contract_instance = this.abi(contract_address)
				let _data = this.web3.utils.padLeft(this.web3.utils.toHex(this.web3.utils.toWei(price.toString(), 'ether')), 64);
				_contract_instance.methods.safeTransferFrom(form, to, tokenId, _data).send(this.base_transaction)
					.on('transactionHash', function(hash) {
						_callback(true)
					})
					.on('receipt', function(receipt) {
						_callbackin(true)
					})
					.on('error', function(error) {

					})
			}
		})
	}
	giveNFT(contract_address, form, to, tokenId, _callback, _callbackin) {
		this.verifyWeb3().then(rs => {
			if(rs) {
				this.base_transaction = {
					'from': from_addr,
					'gas': 300 * 10000,
				}
				let _contract_instance = this.abi(contract_address)
				_contract_instance.methods.giveNFT(form, to, tokenId).send(this.base_transaction)
					.on('transactionHash', function(hash) {
						_callback(true)
					})
					.on('receipt', function(receipt) {
						console.log(receipt)
						_callbackin(true)
					})
					.on('error', function(error) {

					})
			}
		})
	}
	giveTicket(contract_address, form, to, tokenId, _callback, _callbackin) {
		this.verifyWeb3().then(rs => {
			if(rs) {
				this.base_transaction = {
					'from': from_addr,
					'gas': 300 * 10000,
				}
				let _contract_instance = this.abi(contract_address)
				_contract_instance.methods.giveTicket(form, to, tokenId).send(this.base_transaction)
					.on('transactionHash', function(hash) {
						_callback(true)
					})
					.on('receipt', function(receipt) {
						console.log(receipt)
						_callbackin(true)
					})
					.on('error', function(error) {

					})
			}
		})
	}
	mintPublic(contract_address, amount, _callback, _callbackin) {
		this.verifyWeb3().then(rs => {
			if(rs) {
				this.base_transaction = {
					'from': from_addr,
					'gas': 300 * 10000,
				}
				let _contract_instance = new this.web3.eth.Contract(BlindboxAbi, contract_address)
				_contract_instance.methods.mintPublic(amount).send(this.base_transaction)
					.on('transactionHash', function(hash) {
						_callback(true)
					})
					.on('receipt', function(receipt) {
						console.log(receipt)
						_callbackin(true)
					})
					.on('error', function(error) {

					})
			}
		})
	}
	mintWhitelist(contract_address, amount, _callback, _callbackin) {
		this.verifyWeb3().then(rs => {
			if(rs) {
				this.base_transaction = {
					'from': from_addr,
					'gas': 300 * 10000,
				}
				let _contract_instance = new this.web3.eth.Contract(BlindboxAbi, contract_address)
				_contract_instance.methods.mintWhitelist(amount).send(this.base_transaction)
					.on('transactionHash', function(hash) {
						_callback(true)
					})
					.on('receipt', function(receipt) {
						console.log(receipt)
						_callbackin(true)
					})
					.on('error', function(error) {

					})
			}
		})
	}
	//	blindbox(contract_address, _callback,_callbackin) {
	//		this.verifyWeb3().then(rs => {
	//			if(rs) {
	//				this.base_transaction = {
	//					'from': from_addr,
	//					'gas': 21 * 10000,
	//				}
	//				let _contract_instance = new this.web3.eth.Contract(LuckyBoxAbi, contract_address)
	//				_contract_instance.methods.box().send(this.base_transaction)
	//					.on('transactionHash', function(hash) {
	//						_callback(true)
	//					})
	//					.on('receipt', function(receipt) {
	//						console.log(receipt)
	//						_callbackin(true)
	//					})
	//					.on('error', function(error) {
	//
	//					})
	//			}
	//		})
	//	}
	withdrawReward(contract_address, _callback, _callbackin) {
		this.verifyWeb3().then(rs => {
			if(rs) {
				this.base_transaction = {
					'from': from_addr,
					'gas': 60 * 10000,
				}
				let _contract_instance = new this.web3.eth.Contract(TttPoolAbi, contract_address)
				_contract_instance.methods.withdrawReward().send(this.base_transaction)
					.on('transactionHash', function(hash) {
						_callback(true)
					})
					.on('receipt', function(receipt) {
						_callbackin(true)
					})
					.on('error', function(error) {

					})
			}
		})
	}
	withdraw(contract_address, id, _callback, _callbackin) {
		this.verifyWeb3().then(rs => {
			if(rs) {
				this.base_transaction = {
					'from': from_addr,
					'gas': 60 * 10000,
				}
				let _contract_instance
				if(contract_address == $store.state.LMVaddr) {
					_contract_instance = new this.web3.eth.Contract(LMVAbi, contract_address)
				} else {
					_contract_instance = new this.web3.eth.Contract(TttPoolAbi, contract_address)
				}
				_contract_instance.methods.withdraw(id).send(this.base_transaction)
					.on('transactionHash', function(hash) {
						_callback(true)
					})
					.on('receipt', function(receipt) {
						_callbackin(true)
					})
					.on('error', function(error) {

					})
			}
		})
	}
	deposit(contract_address, amount, id, _callback, _callbackin) {
		this.verifyWeb3().then(rs => {
			if(rs) {
				this.base_transaction = {
					'from': from_addr,
					'gas': 60 * 10000,
				}
				let _contract_instance
				_contract_instance = new this.web3.eth.Contract(TttPoolAbi, contract_address)
				console.log(web3tools.web3.utils.toWei(amount.toString(), 'ether'))
				_contract_instance.methods.deposit(id, web3tools.web3.utils.toWei(amount.toString(), 'ether')).send(this.base_transaction)
					.on('transactionHash', function(hash) {
						_callback(true)
					})
					.on('receipt', function(receipt) {
						_callbackin(true)
					})
					.on('error', function(error) {

					})
			}
		})
	}
	LMVdeposit(contract_address, amount, _callback, _callbackin) {
		this.verifyWeb3().then(rs => {
			if(rs) {
				this.base_transaction = {
					'from': from_addr,
					'gas': 60 * 10000,
				}
				let _contract_instance = this.abi(contract_address)
				console.log(web3tools.web3.utils.toWei(amount.toString(), 'ether'))
				_contract_instance.methods.deposit(web3tools.web3.utils.toWei(amount.toString(), 'ether')).send(this.base_transaction)
					.on('transactionHash', function(hash) {
						_callback(true)
					})
					.on('receipt', function(receipt) {
						_callbackin(true)
					})
					.on('error', function(error) {

					})
			}
		})
	}
	redeem(contract_address, amount, _callback, _callbackin) {
		this.verifyWeb3().then(rs => {
			if(rs) {
				this.base_transaction = {
					'from': from_addr,
					'gas': 60 * 10000,
				}
				let _contract_instance = this.abi(contract_address)
				_contract_instance.methods.redeem(web3tools.web3.utils.toWei(amount.toString(), 'ether')).send(this.base_transaction)
					.on('transactionHash', function(hash) {
						_callback(true)
					})
					.on('receipt', function(receipt) {
						_callbackin(true)
					})
					.on('error', function(error) {

					})
			}
		})
	}
	approveBatch(contract_address, address, tokenId, _callbackin, _callback) {
		this.verifyWeb3().then(rs => {
			if(rs) {
				console.log(from_addr)
				this.base_transaction = {
					'from': from_addr,
					'gas': 300 * 10000,
				}
				let _contract_instance = this.abi(contract_address)
				console.log(tokenId)
				_contract_instance.methods.approveBatch(address, tokenId).send(this.base_transaction)
					.on('transactionHash', function(hash) {
						_callbackin(true)
					})
					.on('receipt', function(receipt) {
						_callback(true)
					})
					.on('error', function(error) {

					})
			}
		})
	}
	exchangeA2B(contract_address, amount, _callbackin, _callback) {
		this.verifyWeb3().then(rs => {
			if(rs) {
				this.base_transaction = {
					'from': from_addr,
					'gas': 60 * 10000,
				}
				let _contract_instance = this.abi(contract_address)
				_contract_instance.methods.exchangeA2B(web3tools.web3.utils.toWei(amount.toString(), 'mwei')).send(this.base_transaction)
					.on('transactionHash', function(hash) {
						_callbackin(true)
					})
					.on('receipt', function(receipt) {
						_callback(true)
					})
					.on('error', function(error) {

					})
			}
		})
	}
	exchangeB2A(contract_address, amount, _callbackin, _callback) {
		this.verifyWeb3().then(rs => {
			if(rs) {
				this.base_transaction = {
					'from': from_addr,
					'gas': 60 * 10000,
				}
				let _contract_instance = this.abi(contract_address)
				_contract_instance.methods.exchangeB2A(web3tools.web3.utils.toWei(amount.toString(), 'ether')).send(this.base_transaction)
					.on('transactionHash', function(hash) {
						_callbackin(true)
					})
					.on('receipt', function(receipt) {
						_callback(true)
					})
					.on('error', function(error) {

					})
			}
		})
	}
	approve(contract_address, address, amount, _callbackin, _callback) {
		this.verifyWeb3().then(rs => {
			if(rs) {
				console.log(from_addr)
				this.base_transaction = {
					'from': from_addr,
					'gas': 300 * 10000,
				}
				let _contract_instance
				if(contract_address == $store.state.LMTLPaddr) {
					_contract_instance = new this.web3.eth.Contract(LPAbi, contract_address)
				} else if(contract_address == $store.state.LMGLPaddr) {
					_contract_instance = new this.web3.eth.Contract(LPAbi, contract_address)
				} else if(contract_address == $store.state.LMGaddr) {
					_contract_instance = new this.web3.eth.Contract(LMGAbi, contract_address)
				} else if(contract_address == $store.state.LMTaddr) {
					_contract_instance = new this.web3.eth.Contract(LMTAbi, contract_address)
				} else {
					_contract_instance = this.abi(contract_address)
				}
				let am;
				if(contract_address == $store.state.USDTaddr) {
					am = web3tools.web3.utils.toWei(amount.toString(), 'mwei')
				} else {
					am = web3tools.web3.utils.toWei(amount.toString(), 'ether')
				}
				_contract_instance.methods.approve(address, am).send(this.base_transaction)
					.on('transactionHash', function(hash) {
						_callbackin(true)
					})
					.on('receipt', function(receipt) {
						_callback(true)
					})
					.on('error', function(error) {

					})
			}
		})
	}
	approveto(contract_address, address, _callbackin, _callback) {
		this.verifyWeb3().then(rs => {
			if(rs) {
				this.base_transaction = {
					'from': from_addr,
					'gas': 60 * 10000,
				}
				let _contract_instance = this.abi(contract_address)
				_contract_instance.methods.setApprovalForAll(address, true).send(this.base_transaction)
					.on('transactionHash', function(hash) {
						_callbackin(true)
					})
					.on('receipt', function(receipt) {
						_callback(true)
					})
					.on('error', function(error) {

					})
			}
		})
	}
	watchAsset() {
		ethereum.request({
				method: 'wallet_watchAsset',
				params: {
					type: 'ERC20',
					options: {
						address: '',
						symbol: 'LMG',
						decimals: 18,
						//					image: 'https://foo.io/token-image.svg',
					},
				},
			})
			.then((success) => {
				console.log(success)
				console.log(111111111)
			})
			.catch(console.error);
	}

	transfer(contract_address, toabi, money, toaddr, _callback, _callbackin) {
		this.verifyWeb3().then(rs => {
			if(rs) {
				this.base_transaction = {
					'from': from_addr,
					'gas': 60 * 10000,
				}
				let _contract_instance
				if(toabi == "LMG") {
					_contract_instance = new this.web3.eth.Contract(LMGAbi, contract_address)
				} else if(toabi == "LMT") {
					_contract_instance = new this.web3.eth.Contract(LMTAbi, contract_address)
				}
				_contract_instance.methods.transfer(toaddr, web3tools.web3.utils.toWei(money.toString(), 'ether')).send(this.base_transaction)
					.on('transactionHash', function(hash) {
						_callback(true)
					})
					.on('receipt', function(receipt) {
						_callbackin(true)
					})
					.on('error', function(error) {

					})
			}
		})
	}
	APR(contract_address, id, success) {
		this.web3.eth.net.getId().then((e) => {
			if(e != network) {
				Toast(tips);
				return false;
			}
			let _contract_instance;
			_contract_instance = this.abi(contract_address)
			_contract_instance.methods.APRpid(id).call().then((result) => {
				success(result)
			})
		})
	}
	pools(contract_address, id, success) {
		this.web3.eth.net.getId().then((e) => {
			if(e != network) {
				Toast(tips);
				return false;
			}
			let _contract_instance;
			_contract_instance = this.abi(contract_address)
			_contract_instance.methods.pools(id).call().then((result) => {
				success(result)
			})
		})
	}
	getReserves(contract_address, success) {
		this.web3.eth.net.getId().then((e) => {
			if(e != network) {
				Toast(tips);
				return false;
			}
			let _contract_instance;
			_contract_instance = this.abi(contract_address)
			_contract_instance.methods.getReserves().call().then((result) => {
				success(result)
			})
		})
	}
	bonusForLoginNext(contract_address, tokenId, success) {
		this.web3.eth.net.getId().then((e) => {
			if(e != network) {
				Toast(tips);
				return false;
			}
			let _contract_instance;
			_contract_instance = this.abi(contract_address)
			_contract_instance.methods.bonusForLoginNext(tokenId).call().then((result) => {
				success(this.web3.utils.fromWei(result, 'ether'))
			})
		})
	}
	getMintIds(contract_address, addr, success) {
		this.web3.eth.net.getId().then((e) => {
			if(e != network) {
				Toast(tips);
				return false;
			}
			let _contract_instance;
			_contract_instance = this.abi(contract_address)
			_contract_instance.methods.showMintedIdsOneTime(addr).call().then((result) => {
				success(result)
			})
		})
	}
	queryIsRare(contract_address, tokenId, success) {
		this.web3.eth.net.getId().then((e) => {
			if(e != network) {
				Toast(tips);
				return false;
			}
			let _contract_instance;
			_contract_instance = this.abi(contract_address)
			_contract_instance.methods.showRarity(tokenId.toString()).call().then((result) => {
				success(result)
			})
		})
	}
	tokenURI(contract_address, tokenId, success) {
		this.web3.eth.net.getId().then((e) => {
			if(e != network) {
				Toast(tips);
				return false;
			}
			let _contract_instance;
			_contract_instance = new this.web3.eth.Contract(NFTAbi, contract_address)
			// console.log(tokenId)
			// console.log(contract_address)
			_contract_instance.methods.tokenURI(tokenId.toString()).call().then((result) => {
				success(result)
			})
		})
	}
	bonusForLogin(contract_address, tokenId, success) {
		this.web3.eth.net.getId().then((e) => {
			if(e != network) {
				Toast(tips);
				return false;
			}
			let _contract_instance;
			_contract_instance = new this.web3.eth.Contract(GameAbi, contract_address)
			console.log(tokenId)
			_contract_instance.methods.bonusForLogin(tokenId).call().then((result) => {
				success(this.web3.utils.fromWei(result, 'ether'))
			})
		})
	}
	costForLevelup(contract_address, tokenId, success) {
		this.web3.eth.net.getId().then((e) => {
			if(e != network) {
				Toast(tips);
				return false;
			}
			let _contract_instance;
			_contract_instance = new this.web3.eth.Contract(GameAbi, contract_address)
			console.log(tokenId)
			_contract_instance.methods.costForLevelup(tokenId).call().then((result) => {
				success(this.web3.utils.fromWei(result, 'ether'))
			})
		})
	}
	BonusTimeLeft(contract_address, tokenId, success) {
		this.web3.eth.net.getId().then((e) => {
			if(e != network) {
				Toast(tips);
				return false;
			}
			let _contract_instance;
			_contract_instance = new this.web3.eth.Contract(GameAbi, contract_address)
			console.log(tokenId)
			_contract_instance.methods.BonusTimeLeft(tokenId).call().then((result) => {
				success(result)
			})
		})
	}
	personLevel(contract_address, tokenId, success) {
		this.web3.eth.net.getId().then((e) => {
			if(e != network) {
				Toast(tips);
				return false;
			}
			let _contract_instance = this.abi(contract_address);
			//			_contract_instance = new this.web3.eth.Contract(GameAbi, contract_address)
			console.log(tokenId)
			_contract_instance.methods.levelOfToken(tokenId).call().then((result) => {
				success(result)
			})
		})
	}
	nftInfo(contract_address, tokenId, success) {
		this.web3.eth.net.getId().then((e) => {
			if(e != network) {
				Toast(tips);
				return false;
			}
			let _contract_instance = this.abi(contract_address);
			_contract_instance.methods.nftInfo(tokenId).call().then((result) => {
				success(result)
			})
		})
	}
	showExpBonus(contract_address, success) {
		this.web3.eth.net.getId().then((e) => {
			if(e != network) {
				Toast(tips);
				return false;
			}
			let _contract_instance = this.abi(contract_address);
			_contract_instance.methods.showExpBonus().call({'from': from_addr}).then((result) => {
				success(this.web3.utils.fromWei(result, 'ether'))
			})
		})
	}
	showBonusDone(contract_address, success) {
		this.web3.eth.net.getId().then((e) => {
			if(e != network) {
				Toast(tips);
				return false;
			}
			let _contract_instance = this.abi(contract_address);
			_contract_instance.methods.showBonusDone().call({'from': from_addr}).then((result) => {
				success(result)
			})
		})
	}
	showDepositeIds(contract_address, success) {
		this.web3.eth.net.getId().then((e) => {
			if(e != network) {
				Toast(tips);
				return false;
			}
			let _contract_instance = this.abi(contract_address);
			_contract_instance.methods.showDepositeIds().call({'from': from_addr}).then((result) => {
				success(result)
			})
		})
	}
	getOrders(contract_address, mineaddr, success) {
		this.web3.eth.net.getId().then((e) => {
			if(e != network) {
				Toast(tips);
				return false;
			}
			let _contract_instance;
			_contract_instance = new this.web3.eth.Contract(UnicornMarketAbi, contract_address)
			if(mineaddr == '') {
				_contract_instance.methods.getOrders().call().then((result) => {
					// console.log('get')
					// console.log(result)
					success(result)
				})
			} else {
				_contract_instance.methods.getOrders(mineaddr).call().then((result) => {
					// console.log('get')
					// console.log(result)
					success(result)
				})
			}
		})
	}
	tokenOfOwnerByIndex(contract_address, index, success) {
		this.web3.eth.net.getId().then((e) => {
			if(e != network) {
				Toast(tips);
				return false;
			}
			let _contract_instance;
			if(contract_address == $store.state.Blindboxaddr) {
				_contract_instance = new this.web3.eth.Contract(BlindboxAbi, contract_address)
			} else {
				_contract_instance = new this.web3.eth.Contract(NFTAbi, contract_address)
			}
			_contract_instance.methods.tokenOfOwnerByIndex($cookies.get('walletAddress'), index).call().then((result) => {
				success(result)
			})
		})
	}
	poolEarned(contract_address, id, success) {
		this.web3.eth.net.getId().then((e) => {
			if(e != network) {
				Toast(tips);
				return false;
			}
			let _contract_instance;
			_contract_instance = new this.web3.eth.Contract(TttPoolAbi, contract_address)
			_contract_instance.methods.poolEarned($cookies.get('walletAddress'), id).call().then((result) => {
				success(this.web3.utils.fromWei(result, 'ether'))
			})
		})
	}
	isApprovedForAll(contract_address,owner,address, success) {
		this.web3.eth.net.getId().then((e) => {
			if(e != network) {
				Toast(tips);
				return false;
			}
			let _contract_instance = this.abi(contract_address);
			_contract_instance.methods.isApprovedForAll(owner,address).call().then((result) => {
				success(result)
			})
		})
	}
	allowance(contract_address, owneraddr, addr, success) {
		this.web3.eth.net.getId().then((e) => {
			if(e != network) {
				Toast(tips);
				return false;
			}
			let _contract_instance = this.abi(contract_address)
			_contract_instance.methods.allowance(owneraddr, addr).call().then((result) => {
				if(contract_address == $store.state.USDTaddr) {
					success(this.web3.utils.fromWei(result, 'mwei'))
				} else {
					success(this.web3.utils.fromWei(result, 'ether'))
				}

			})
		})
	}
	getbalance(contract_address, toabi, success) {
		this.web3.eth.net.getId().then((e) => {
			if(e != network) {
				Toast(tips);
				return false;
			}
			let _contract_instance;
			if(toabi == "LMG") {
				_contract_instance = new this.web3.eth.Contract(LMGAbi, contract_address)
			} else if(toabi == "LMT") {
				_contract_instance = new this.web3.eth.Contract(LMTAbi, contract_address)
			} else if(toabi == "LP") {
				_contract_instance = new this.web3.eth.Contract(LPAbi, contract_address)
			} else if(toabi == "THR") {
				_contract_instance = new this.web3.eth.Contract(TttPoolAbi, contract_address)
			} else if(toabi == "NFT") {
				_contract_instance = new this.web3.eth.Contract(NFTAbi, contract_address)
			} else if(toabi == "LMV") {
				_contract_instance = new this.web3.eth.Contract(LMVAbi, contract_address)
			} else if(toabi == "box") {
				_contract_instance = new this.web3.eth.Contract(BlindboxAbi, contract_address)
			}
			_contract_instance.methods.balanceOf($cookies.get('walletAddress')).call().then((result) => {
				//				    console.log('get')
				if(toabi == "NFT" || toabi == "box") {
					success(result)
				} else {
					success(this.web3.utils.fromWei(result, 'ether'))
				}
				//				    console.log(result)
				//    console.log(this.web3.utils.fromWei(result, 'ether'))

			})
		})

	}
	userTotalHashToken(contract_address, success) {
		let walletAddress = $cookies.get('walletAddress')
		if (!walletAddress) return

		this.web3.eth.net.getId().then((e) => {
			if (e != network) {
				Toast(tips);
				return false;
			}
			let _contract_instance = new this.web3.eth.Contract(GameAbi, contract_address)
			_contract_instance.methods.userTotalHashToken(walletAddress).call().then((result) => {
				success(result)
			})
		})
	}
}

let web3tools = new Web3Tools();
export default web3tools