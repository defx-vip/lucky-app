export default {
	install(Vue) {
		Vue.directive('movedown', {
			inserted(el, binding) {
				el.addEventListener('mousedown', () => {
					$(el).addClass('movebutton')
					$(el).find('span').remove()
					$(el).append('<span></span>')
					setTimeout(function() {
						$(el).find('span').remove()
						$(el).removeClass('movebutton')
					}, 200)
				})

			}
		})
	}
}