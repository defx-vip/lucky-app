export default {
  install (Vue) {
    Vue.directive('preventReClick', {
      inserted (el, binding) {
        el.addEventListener('click', () => {
          if (!el.disabled) {
          	  el.disabled = true
          	  $(el).css({"pointer-events":"none"})
            setTimeout(() => {
              el.disabled = false
              $(el).css({"pointer-events":""})
            }, binding.value || 3000)
          }
        })
      }
    })
  }
}