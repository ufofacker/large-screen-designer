const _debounce = function(fn, delay) {
  let _timeout = null
  return function() {
    if (_timeout) {
      clearTimeout(_timeout)
    }
    const args = arguments
    const self = this
    _timeout = setTimeout(function() {
      fn.apply(self, args)
    }, delay)
  }
}
export default (Vue) => {
  Vue.directive('debounce', {
    inserted: function(el, binding) {
      if (binding.value !== binding.oldValue) {
        const _target = el.querySelector('input')
        _target.oninput = _debounce(function(ev) {
          _target.dispatchEvent(new Event('change'))
        }, parseInt(binding.value) || 500)
      }
    }
  })
}
