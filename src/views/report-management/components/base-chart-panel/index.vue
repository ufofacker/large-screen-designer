<template>
  <div
    :id="id"
    class="base-chart-panel"
    :style="getChartPanelStyle"
  >

    <div
      ref="chartBox"
      :key="id"
      :style="getChartBoxStyle"
      class="chart-box"
      @click="onFocus($event)"
    >
      <div
        v-if="active"
        class="drag-mask"
      />
      <component
        :is="componentName"
        :id="id"
        ref="chart"
        :config="config"
        v-bind="$attrs"
      />
    </div>
    <div
      v-for="(item) in btnResizePosition"
      v-show="active"
      :key="item"
      :style="{'width':btnResizeSize.width,'height':btnResizeSize.height}"
      :class="[`${item}-resize`]"
      @mousedown.stop.prevent="mouseDown"
    />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import _lodash from 'lodash'
import { getAllComponents } from '@/utils'
const _comps = getAllComponents(require.context('../chart', true, /\.vue$/))
export default {
  name: 'BaseChartPanel',
  components: {
    ..._comps
  },
  props: {
    id: {
      default: '',
      type: String
    },
    active: {
      default: false,
      type: Boolean
    },
    componentName: {
      default: () => {
        return 'lineChart'
      },
      type: String
    },
    btnResizePosition: {
      default: () => { // 右下，左下，左上，右上
        return ['rb', 'lb', 'lt', 'rt']
      },
      type: Array
    },
    btnResizeSize: {
      default: () => {
        return {
          width: '12px',
          height: '12px'
        }
      },
      type: Object
    },
    config: {
      default: () => {
        return {}
      },
      type: Object
    },
    api: {
      default: () => {
        return {}
      },
      type: Object
    }
  },
  data() {
    return {
      isActive: false // 图表是否处于点击激活状态
    }
  },
  computed: {
    getChartBoxStyle() {
      const width = this.config.width || 300
      const height = this.config.height || 300
      return {
        width: width + 'px',
        height: height + 'px'
      }
    },
    getChartPanelStyle() {
      const left = this.config.left || 0
      const top = this.config.top || 0
      return {
        left: left + 'px',
        top: top + 'px'
      }
    }
  },
  watch: {
    active(val) {
      this.isActive = val
    },
    config: {
      deep: true,
      handler: function(val) {
        console.log('base-chart-panel    config', val)
        const _chart = this.$refs.chart
        _chart.updateChart(val.chartOptions)
      }
    }
  },
  methods: {
    ...mapMutations('reportManagement', [
      'UPDATE_CHART_GEOINFO'
    ]),
    onFocus(ev) {
      ev.stopPropagation()
      const _options = _lodash.cloneDeep(this.$refs.chart.options)
      const _api = this.$refs.chart.api
      this.$emit('panelFocus', {
        id: this.id,
        api: _api,
        chartOptions: _options
      })
    },
    mouseDown(ev) {
      let _moveWidth = 0
      let _moveHeight = 0
      let _realWidth = ''
      let _realHeight = ''
      const _chart = this.$refs.chart.chartInstance
      const _target = ev.target// resize按钮
      const _targetEvent = ev || window.event// resize按钮触发
      const _resizeEle = this.$el // 图表面板
      const _chartBox = this.$refs.chartBox// 图表包裹盒子
      const _xOffsetDistance = _targetEvent.clientX - _target.offsetLeft
      const _yOffsetDistance = _targetEvent.clientY - _target.offsetTop
      let _preData = null
      if (_target.className === 'rb-resize') {
        _preData = {
          _maxWidth: _resizeEle.parentNode.clientWidth - _resizeEle.offsetLeft - 2,
          _maxHeight: _resizeEle.parentNode.clientHeight - _resizeEle.offsetTop - 2,
          _targetOffsetWidth: _target.offsetWidth,
          _targetOffsetHeight: _target.offsetHeight
        }
      } else if (_target.className === 'lb-resize') {
        _preData = {
          _maxWidth: _resizeEle.offsetLeft + _resizeEle.offsetWidth,
          _maxHeight: _resizeEle.parentNode.clientHeight - _resizeEle.offsetTop - 2,
          _resizeEleOffsetWidth: _resizeEle.offsetWidth,
          _resizeEleLeft: _resizeEle.style.left
        }
      } else if (_target.className === 'lt-resize') {
        _preData = {
          _maxWidth: _resizeEle.offsetLeft + _resizeEle.offsetWidth,
          _maxHeight: _resizeEle.offsetTop + _resizeEle.offsetHeight,
          _resizeEleOffsetWidth: _resizeEle.offsetWidth,
          _resizeEleOffsetHeight: _resizeEle.offsetHeight,
          _resizeEleLeft: _resizeEle.style.left,
          _resizeEleTop: _resizeEle.style.top
        }
      } else if (_target.className === 'rt-resize') {
        _preData = {
          _maxWidth: _resizeEle.parentNode.clientWidth - _resizeEle.offsetLeft - 2,
          _maxHeight: _resizeEle.offsetTop + _resizeEle.offsetHeight,
          _resizeEleOffsetHeight: _resizeEle.offsetHeight,
          _resizeEleTop: _resizeEle.style.top,
          _targetOffsetWidth: _target.offsetWidth
        }
      }
      document.onmousemove = ev => {
        const event = ev || window.event
        switch (_target.className) {
          case 'rb-resize': {
            const _left = event.clientX - _xOffsetDistance
            const _top = event.clientY - _yOffsetDistance
            _moveWidth = _preData._targetOffsetWidth + _left
            _moveHeight = _preData._targetOffsetHeight + _top
            if (_moveWidth > _preData._maxWidth) {
              _moveWidth = _preData._maxWidth
            } else if (_moveWidth < 100) {
              return false
            }
            if (_moveHeight > _preData._maxHeight) {
              _moveHeight = _preData._maxHeight
            } else if (_moveHeight < 100) {
              return false
            }
            this.$store.commit('reportManagement/UPDATE_CHART_GEOINFO', {
              id: _resizeEle.id,
              geoInfo: {
                width: _moveWidth,
                height: _moveHeight
              }
            })
            _realWidth = _moveWidth + 'px'
            _realHeight = _moveHeight + 'px'
          }
            break
          case 'lb-resize': {
            const _left = event.clientX - _xOffsetDistance
            const _top = event.clientY - _yOffsetDistance
            _moveWidth = _preData._resizeEleOffsetWidth - _left
            _moveHeight = _target.offsetHeight + _top
            let _diffLeft = (parseInt(_preData._resizeEleLeft) + _left)
            if (_moveWidth > _preData._maxWidth) {
              _moveWidth = _preData._maxWidth
              _diffLeft = 0
            } else if (_moveWidth < 100) {
              return false
            }
            if (_moveHeight > _preData._maxHeight) {
              _moveHeight = _preData._maxHeight
            } else if (_moveHeight < 100) {
              return false
            }
            _realWidth = _moveWidth + 'px'
            _realHeight = _moveHeight + 'px'
            this.$store.commit('reportManagement/UPDATE_CHART_GEOINFO', {
              id: _resizeEle.id,
              geoInfo: {
                width: _moveWidth,
                height: _moveHeight,
                left: _diffLeft
              }
            })
            requestAnimationFrame(() => {
              _resizeEle.style.left = _diffLeft + 'px'
            })
          }
            break
          case 'lt-resize': {
            const _left = event.clientX - _xOffsetDistance
            const _top = event.clientY - _yOffsetDistance
            _moveWidth = _preData._resizeEleOffsetWidth - _left
            _moveHeight = _preData._resizeEleOffsetHeight - _top
            let _diffLeft = (parseInt(_preData._resizeEleLeft) + _left)
            if (_moveWidth > _preData._maxWidth) {
              _moveWidth = _preData._maxWidth
              _diffLeft = 0
            } else if (_moveWidth < 100) {
              return false
            }
            const _diffTop = (parseInt(_preData._resizeEleTop) + _top)
            if (_moveHeight > _preData._maxHeight) {
              _moveHeight = _preData._maxHeight
            } else if (_moveHeight < 100) {
              return false
            }
            _realWidth = _moveWidth + 'px'
            _realHeight = _moveHeight + 'px'
            this.$store.commit('reportManagement/UPDATE_CHART_GEOINFO', {
              id: _resizeEle.id,
              geoInfo: {
                width: _moveWidth,
                height: _moveHeight,
                top: _diffTop,
                left: _diffLeft
              }
            })
            requestAnimationFrame(() => {
              _resizeEle.style.left = _diffLeft + 'px'
              _resizeEle.style.top = _diffTop + 'px'
            })
          }
            break
          case 'rt-resize': {
            const _left = event.clientX - _xOffsetDistance
            const _top = event.clientY - _yOffsetDistance
            _moveWidth = _preData._targetOffsetWidth + _left
            _moveHeight = _preData._resizeEleOffsetHeight - _top
            if (_moveWidth > _preData._maxWidth) {
              _moveWidth = _preData._maxWidth
            } else if (_moveWidth < 100) {
              return false
            }
            const _diffTop = (parseInt(_preData._resizeEleTop) + _top)
            if (_moveHeight > _preData._maxHeight) {
              _moveHeight = _preData._maxHeight
            } else if (_moveHeight < 100) {
              return false
            }
            _realWidth = _moveWidth + 'px'
            _realHeight = _moveHeight + 'px'
            this.$store.commit('reportManagement/UPDATE_CHART_GEOINFO', {
              id: _resizeEle.id,
              geoInfo: {
                width: _moveWidth,
                height: _moveHeight,
                top: _diffTop
              }
            })
            requestAnimationFrame(() => {
              _resizeEle.style.top = _diffTop + 'px'
            })
          }
            break
        }
        requestAnimationFrame(() => {
          _chartBox.style.cssText += `width:${_realWidth};height:${_realHeight};`
        })
        return false
      }
      document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null
        _chart.resize()
      }
      return false
    }
  }
}
</script>

<style lang="scss" scoped>
.base-chart-panel {
  position: absolute;
  display: inline-block;
  margin: 0;
  .chart-box {
    position: relative;
    display: inline-block;
  }
  .drag-mask {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 9999;
    background: rgba(65, 106, 148, 0.5);
  }
  .btn-resize {
    display: block;
    position: absolute;
    width: 10px;
    height: 10px;
    overflow: hidden;
  }
  .rb-resize {
    //右下缩放按钮
    @extend .btn-resize;
    border-right: 2px solid #b2b2b2;
    border-bottom: 2px solid #b2b2b2;
    right: -3px;
    bottom: 0;
    cursor: nw-resize;
  }
  .lb-resize {
    //左下缩放按钮
    @extend .btn-resize;
    border-left: 2px solid #b2b2b2;
    border-bottom: 2px solid #b2b2b2;
    left: -3px;
    bottom: 0;
    cursor: sw-resize;
  }
  .lt-resize {
    //左上缩放按钮
    @extend .btn-resize;
    border-left: 2px solid #b2b2b2;
    border-top: 2px solid #b2b2b2;
    left: -3px;
    top: -3px;
    cursor: nw-resize;
  }
  .rt-resize {
    //右上缩放按钮
    @extend .btn-resize;
    border-right: 2px solid #b2b2b2;
    border-top: 2px solid #b2b2b2;
    right: -3px;
    top: -3px;
    cursor: ne-resize;
  }
}
</style>

