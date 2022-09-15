import $store from './index'
import $cookies from 'vue-cookies'
export default {
	install(Vue) {
		Vue.directive('music', {
			inserted(el, binding) {
				el.addEventListener('click', () => {
					//      	alert()
					//        let audio = new Audio();
					//        audio.src = "/static/image/burronclick_2.mp3";
					//					document.getElementById('playall').pause()
					if(JSON.parse($store.state.Sound) != false && JSON.parse($cookies.get('Sound')) != false) {
						document.getElementById('buttonaudio').play()
					}
					//					setTimeout(function(){
					//						document.getElementById('playall').play()
					//					},1000)

					//        let playPromiser = audio.play();
				})
			}
		})
	}
}