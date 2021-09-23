
<template>
  <div class="large-screen-design">
    <!-- 顶部工具栏 -->
    <el-menu
      :default-active="activeIndex2"
      mode="horizontal"
      class="header-bar"
      background-color="#38485f"
      text-color="#fff"
      active-text-color="#ffd04b"
      @select="handleSelect"
    >
      <el-submenu index="Chart_2D">
        <template slot="title">图表</template>
        <div
          class="menu-wrapper"
          @dragstart="onDragstart"
        >
          <el-menu-item
            v-for="(item) in selectList.chart"
            :id="item.typeId"
            :key="item.typeId"
            :index="item.typeId"
            :draggable="true"
          ><span :class="['iconfont', item.iconClass]" /><span style="margin-left:8px;">{{ item.name }}</span></el-menu-item>
        </div>
      </el-submenu>
    </el-menu>
    <!-- 设计器主面板 -->
    <div class="main-content">
      <div
        ref="mainStageWrapper"
        class="droped-container--wrapper"
      >
        <!-- 主舞台 -->
        <div
          id="main-stage"
          ref="mainStage"
          class="droped-container"
          @dragover.stop="onDragover"
          @drop.stop="onDrop"
          @click="onPanelBlur"
        >
          <!-- 基础图表组件 -->
          <baseChartPanel
            v-for="(item) in drawingChartList"
            :id="item.id"
            :ref="item.id"
            :key="item.id"
            :draggable="true"
            :active="activeChartId === item.id"
            :config="item.details"
            :api="item.api"
            :component-name="item.componentName"
            @panelFocus="onPanelFocus"
          />
        </div>
      </div>
      <div class="config-container">
        <!-- <div>{{ '   draging时的元素左边距:  ' +test.left }}</div>
        <div>{{ '   draging时的元素由边距:  ' +test.top }}</div><br> -->
        <!-- 组件配置面板 -->
        <chartConfigPanel
          ref="chartConfigPanel"
          :active-chart-id="activeChartId"
        >33</chartConfigPanel>
        <!-- 底部工具栏 -->
        <div class="bottom-bar">
          <el-tooltip
            class="item"
            effect="dark"
            content="全屏"
            placement="top-end"
          >
            <i
              class="el-icon-full-screen"
              @click="setFullScreen"
            />
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="画板设置"
            placement="top-end"
          >
            <i
              class="el-icon-setting"
              @click="showStageSetting = true"
            />
          </el-tooltip>
        </div>
      </div>
    </div>
    <!-- 画布设置dialog -->
    <el-dialog
      title="画布设置"
      width="300px"
      center
      :visible.sync="showStageSetting"
    >
      <el-form
        ref="stageSettingForm"
        :model="stageSettingForm"
      >
        <el-form-item
          label="分辨率"
          label-width="55px"
        >
          <el-select
            v-model="stageSettingForm.resolution"
            placeholder="请选择分辨率比例"
          >
            <el-option
              v-for="(item,index) in selectList.resolution"
              :key="index"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="cancelStageSetting">取 消</el-button>
        <el-button
          type="primary"
          @click="saveStageSetting"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { requestFullscreen } from '@/utils'
import { toolTypeList, chart } from './config/headerPanel'
import { resolution } from './config/dataMapping'
import { createUUID } from '@/utils'
import baseChartPanel from './components/base-chart-panel/index.vue'
import chartConfigPanel from './components/chart-config-panel/index.vue'
import { debounce } from 'throttle-debounce'
const lines = { // 参考线
  xTop: null, // x轴顶部参考线
  xCenter: null,
  xBottom: null,
  yLeft: null,
  yCenter: null,
  yRight: null
}
export default {
  name: 'LargeScreenDesign',
  components: {
    baseChartPanel,
    chartConfigPanel
  },
  data() {
    return {
      activeChartId: '',
      showConfigPanel: false,
      showStageSetting: false,
      stageSettingForm: { // 舞台配置表单
        resolution: '1' // 分辨率
      },
      test: { // 测试
        left: 0,
        top: 0
      }, // 测试
      toolTypeList,
      activeIndex: '1',
      activeIndex2: '1',
      currentDragNode: null,
      selectList: {
        resolution, // 分辨率列表
        chart// 图表列表
      },
      lineGap: 2 // 默认参考线间隔
    }
  },
  computed: {
    ...mapState('reportManagement', ['drawingChartList'])
  },
  watch: {
    activeChartId(val) {
      if (val === '') {
        this.$refs.chartConfigPanel.resetConfigPanel()
      }
    }
  },
  created() {
    this.getReportDetails()
  },
  mounted() {
    this.initRefLines()
    const debounceFunc = debounce(500, false, (num) => {
      this.updateStageStyle()
    })
    window.addEventListener('resize', debounceFunc, false)
    this.$nextTick(() => {
      this.updateStageStyle()
      this.initChart()
    })
  },
  methods: {
    ...mapMutations('reportManagement', [
      'SET_DRAWING_LIST',
      'UPDATE_CHART_GEOINFO'
    ]),
    ...mapActions('reportManagement', [
      'getReportDetails'
    ]),
    updateStageStyle() {
      const _eleWrapper = this.$refs.mainStageWrapper
      const _ele = this.$refs.mainStage
      // console.log('_eleWrapper.offsetWidth  _eleWrapper.offsetHeight', _eleWrapper.offsetWidth + '____' + _eleWrapper.offsetHeight)
      // console.log('_eleWrapper.clientWidth  _eleWrapper.clientHeight', _eleWrapper.clientWidth + '____' + _eleWrapper.clientHeight)
      let _cHeight = Math.ceil(_eleWrapper.offsetHeight) - 1
      let _cWidth = Math.ceil(_eleWrapper.offsetWidth) - 1
      if (String(_cHeight).indexOf('.') !== -1) {
        _cHeight = Math.floor(_cHeight)
      }
      if (String(_cWidth).indexOf('.') !== -1) {
        _cWidth = Math.floor(_cWidth)
      }
      const styleConfig = {
        width: 0,
        height: 0
      }
      const _res = resolution.find((item, index) => {
        return item.value === this.stageSettingForm.resolution
      })
      const _preRatio = parseFloat((_res.ratioValue[0] / _res.ratioValue[1]).toFixed(2)) // 预设宽高比例
      const _realRatio = _cWidth / _cHeight // 容器真实宽高比例
      if (_preRatio > _realRatio) {
        const _ratioValue = _res.ratioValue[1] / _res.ratioValue[0]
        styleConfig.width = _cWidth
        styleConfig.height = _cWidth * (_ratioValue.toFixed(2))
      } else if (_preRatio < _realRatio) {
        const _ratioValue = _res.ratioValue[0] / _res.ratioValue[1]
        styleConfig.height = _cHeight
        styleConfig.width = _cHeight * (_ratioValue.toFixed(2))
      } else {
        styleConfig.width = _cWidth
        styleConfig.height = _cHeight
      }
      _ele.style.height = Math.floor(styleConfig.height) + 'px'
      _ele.style.width = Math.floor(styleConfig.width) + 'px'
    },
    /**
     * @description 图表面板获取焦点
     */
    onPanelFocus(data) {
      this.showConfigPanel = true
      this.activeChartId = data.id
      this.$refs.chartConfigPanel.updateConfig(data)
    },
    /**
     * @description 图表面板失去焦点
     */
    onPanelBlur() {
      this.activeChartId = ''
      this.showConfigPanel = false
    },
    /**
     * @description 初始化参考线
     */
    initRefLines() {
      for (const position in lines) {
        const node = lines[position] = document.createElement('div')
        node.classList.add('ref-line', position)
        node.style.cssText = `display:none;opacity:0.7;position:absolute;background:#4DAEFF;` +
          `z-index:1000;${position[0] === 'x' ? 'width:100%;height:1px;left:0;' : 'width:1px;height:100%;top:0;'}`
        node.show = () => {
          node.style.display = 'block'
        }
        node.hide = () => {
          node.style.display = 'none'
        }
        node.isShow = () => {
          return node.style.display !== 'none'
        }
        this.$refs.mainStage.appendChild(node)
      }
    },
    initChart() {
      const self = this
      self.drawingChartList.forEach((item, key) => {
        const ele = self.$refs[item.id][0].$el
        const _cloneNodeWidth = item.details.width
        const _cloneNodeHeight = item.details.height
        const _left = item.details.left
        const _top = item.details.top
        const _cloneNodeInfo = {
          _width: `${_cloneNodeWidth}px`,
          _height: `${_cloneNodeHeight}px`,
          _top: `${_top}px`,
          _left: `${_left}px`
        }
        ele.classList.add('drag-box')
        ele.style.cssText +=
          `top:${_cloneNodeInfo._top};left:${_cloneNodeInfo._left};`
        ele.addEventListener('dragstart', (ev) => {
          const _id = ev.target.id
          const _res = self.drawingChartList.find((item, key) => {
            return item.id === _id
          })
          _res['node'] = ele
          ev.dataTransfer.setData('id', _id)
          const _xOffsetDistance = ev.clientX - ele.offsetLeft
          const _yOffsetDistance = ev.clientY - ele.offsetTop
          ele.ondrag = (event) => {
            const _left = event.clientX - _xOffsetDistance
            const _top = event.clientY - _yOffsetDistance
            self.dragOuterLimit({ _left, _top }, ele)
            self.checkNode(ele, '.drag-box')
          }
        }, false)
      })
    },
    /**
     * @description 设计器全屏
     */
    setFullScreen() {
      requestFullscreen(document.documentElement)
    },
    /**
     * @description 选中节点拖拽
     * @param dragNode 当前拖拽的元素
     * @param checkNodes drop面板中已有的可拖拽元素
     */
    checkNode(dragNode, checkNodes) {
      checkNodes = typeof checkNodes === 'string' ? document.querySelectorAll(checkNodes) : checkNodes
      const _dragRect = dragNode.getBoundingClientRect()
      this.unCheckNode()
      Array.from(checkNodes).forEach((item) => {
        item.classList.remove('ref-line-active')
        if (item === dragNode) return
        const { top, height, bottom, left, width, right } = item.getBoundingClientRect()
        // 获取相对位置
        const _dragWidthHalf = _dragRect.width / 2
        const _itemWidthHalf = width / 2
        const _dragHeightHalf = _dragRect.height / 2
        const _itemHeightHalf = height / 2
        const _conditions = {
          top: [
            // xTop-top 参考线出现在非拖拽item的上方 拖拽元素的上方
            {
              isNearly: this._isNearly(_dragRect.top, top),
              lineNode: lines.xTop,
              lineValue: item.offsetTop,
              dragValue: top - _dragRect.top
            },
            // xTop - bottom 参考线出现在非拖拽item的上方 拖拽元素的下方
            {
              isNearly: this._isNearly(_dragRect.bottom, top),
              lineNode: lines.xTop,
              lineValue: item.offsetTop,
              dragValue: top - _dragRect.bottom
            },
            // xCenter 中心线
            {
              isNearly: this._isNearly(_dragRect.top + _dragHeightHalf, top + _itemHeightHalf),
              lineNode: lines.xCenter,
              lineValue: item.offsetTop + _itemHeightHalf,
              dragValue: top + _itemHeightHalf - _dragHeightHalf - _dragRect.top
            },
            // xBottom-top 参考线出现在非拖拽item的下方 拖拽元素的下方
            {
              isNearly: this._isNearly(_dragRect.bottom, bottom),
              lineNode: lines.xBottom,
              lineValue: item.offsetTop + height,
              dragValue: bottom - _dragRect.bottom
            },
            // xBottom-bottom 参考线出现在非拖拽item的下方 拖拽元素的上方
            {
              isNearly: this._isNearly(_dragRect.top, bottom),
              lineNode: lines.xBottom,
              lineValue: item.offsetTop + height,
              dragValue: _dragRect.top - bottom
            }
          ],
          left: [
            // yLeft-left 参考线出现在非拖拽item的左方 拖拽元素的左方
            {
              isNearly: this._isNearly(_dragRect.left, left),
              lineNode: lines.yLeft,
              lineValue: item.offsetLeft,
              dragValue: left - _dragRect.left
            },
            // yLeft-right 参考线出现在非拖拽item的左方 拖拽元素的右方
            {
              isNearly: this._isNearly(_dragRect.right, left),
              lineNode: lines.yLeft,
              lineValue: item.offsetLeft,
              dragValue: left - _dragRect.right
            },
            // yCenter 中心
            {
              isNearly: this._isNearly(_dragRect.left + _dragWidthHalf, left + _itemWidthHalf),
              lineNode: lines.yCenter,
              lineValue: item.offsetLeft + _itemWidthHalf,
              dragValue: left + _itemWidthHalf - _dragWidthHalf - _dragRect.left
            },
            // yRight-left 参考线出现在非拖拽item的右方 拖拽元素的右方
            {
              isNearly: this._isNearly(_dragRect.right, right),
              lineNode: lines.yRight,
              lineValue: item.offsetLeft + width,
              dragValue: right - _dragRect.right
            },
            // yRight-right 参考线出现在非拖拽item的右方 拖拽元素的左方
            {
              isNearly: this._isNearly(_dragRect.left, right),
              lineNode: lines.yRight,
              lineValue: item.offsetLeft + width,
              dragValue: right - _dragRect.left
            }
          ]
        }
        for (const key in _conditions) {
          // 遍历符合的条件并处理
          _conditions[key].forEach((condition, index) => {
            // 判断拖拽元素是否和其他元素在间隔范围内
            if (!condition.isNearly) return
            item.classList.add('ref-line-active')
            dragNode.style[key] = `${parseInt(dragNode.style[key]) + parseInt(condition.dragValue)}px`
            condition.lineNode.style[key] = `${condition.lineValue}px`
            condition.lineNode.show()
          })
        }
      })
    },
    /**
     * @description 拖拽完成后，隐藏参考线
     */
    unCheckNode() {
      Object.values(lines).forEach((item) => item.hide())
      Array.from(document.querySelectorAll('.ref-line-active')).forEach((item) => item.classList.remove('ref-line-active'))
    },
    /**
     * @description 靠近其他元素
     */
    _isNearly(dragValue, targetValue) {
      return Math.abs(dragValue - targetValue) <= this.lineGap
    },
    getDropContainerStyle() {
      const _stageConfig = JSON.parse(this.stageSettingForm.resolution)
      return {
        width: _stageConfig[0] + 'px',
        height: _stageConfig[1] + 'px'
      }
    },
    /**
     * @description 取消舞台配置
     */
    cancelStageSetting() {
      this.stageSettingForm.resolution = '1'
      this.showStageSetting = false
    },
    /**
     * @description 保存舞台配置
     */
    saveStageSetting() {
      // TODO
      this.showStageSetting = false
      this.updateStageStyle()
    },
    onDragover(ev) {
      // 阻止浏览器默认行为，使得目标元素可以放置被拖动的元素
      ev.preventDefault()
    },
    onDragstart(ev) {
      // 使用组件id属性传递组件类别标识
      ev.dataTransfer.setData('id', ev.target.id)
    },
    onDrop(ev) {
      const _data = ev.dataTransfer.getData('id') // 菜单拖拽的id为图表类型
      const _chartTypeList = this.selectList.chart.map((item) => item.typeId)
      if (_chartTypeList.includes(_data)) { // 当前拖动的是菜单项
        const _id = `${_data}_${createUUID()}`
        const _nodeInfo = {
          componentName: _data, // 组件名称
          id: _id, // 为组件增加唯一标识
          details: {
            width: 300,
            height: 200,
            chartOptions: {}
          },
          api: {}
        }
        this.$store.commit('reportManagement/SET_DRAWING_LIST', [_nodeInfo])
        this.$nextTick(() => {
          this.dropSourceEle(ev, _nodeInfo)
        })
      } else { // 当前拖动的是首次创建的克隆节点
        this.dropCloneNode(ev, _data)
      }
    },
    /**
     * @description 从菜单拖拽元素
     */
    dropSourceEle(ev, data) {
      const _cloneNode = this.$refs[data.id][0].$el
      const _cloneNodeWidth = data.details.width
      const _cloneNodeHeight = data.details.height
      _cloneNode.draggable = true
      let _left, _top
      if (Object.is(ev.currentTarget, ev.target)) {
        _left = Math.abs(ev.layerX - _cloneNodeWidth / 2)
        _top = Math.abs(ev.layerY - _cloneNodeHeight / 2)
      } else { // 拖拽到非拖拽面板里
        _left = Math.abs(_cloneNodeWidth / 2 - (ev.target.offsetLeft + ev.layerX - 10))// 10为drop到的那个元素的左外边距
        _top = Math.abs(_cloneNodeHeight / 2 - (ev.target.offsetTop + ev.layerY))
      }
      const _cloneNodeInfo = {
        _width: `${_cloneNodeWidth}px`,
        _height: `${_cloneNodeHeight}px`,
        _top: `${_top}px`,
        _left: `${_left}px`
      }
      _cloneNode.classList.add('drag-box')
      _cloneNode.style.cssText +=
        `top:${_cloneNodeInfo._top};left:${_cloneNodeInfo._left};`
      this.$store.commit('reportManagement/UPDATE_CHART_GEOINFO', {
        id: data.id,
        geoInfo: {
          width: _cloneNodeWidth,
          height: _cloneNodeHeight,
          top: _top,
          left: _left
        }
      })
      this.setCloneNodeDragable(_cloneNode)
    },
    /**
     * @description 放置克隆节点
     */
    dropCloneNode(ev, data) {
      const _res = this.drawingChartList.find((item, key) => {
        return item.id === data
      })
      if (_res) {
        this.$store.commit('reportManagement/UPDATE_CHART_GEOINFO', {
          id: _res.id,
          geoInfo: {
            width: _res.node.clientWidth,
            height: _res.node.clientHeight,
            top: parseInt(_res.node.style.top),
            left: parseInt(_res.node.style.left)
          }
        })
        _res.node.ondrag = null
        delete _res.node
      }
    },
    /**
     * @description: 克隆节点绑定拖动事件
     */
    setCloneNodeDragable(ele) {
      const self = this
      ele.addEventListener('dragstart', (ev) => {
        const _id = ev.target.id
        const _res = self.drawingChartList.find((item, key) => {
          return item.id === _id
        })
        _res['node'] = ele
        ev.dataTransfer.setData('id', _id)
        const _xOffsetDistance = ev.clientX - ele.offsetLeft
        const _yOffsetDistance = ev.clientY - ele.offsetTop
        ele.ondrag = (event) => {
          const _left = event.clientX - _xOffsetDistance // 获取节点移动的偏移量
          const _top = event.clientY - _yOffsetDistance
          // this.test.left = _left
          // this.test.top = _top
          self.dragOuterLimit({ _left, _top }, ele)
          this.checkNode(ele, '.drag-box')
        }
      }, false)
    },
    /**
     * @description 拖拽边界检测
     */
    dragOuterLimit(offsetData, cloneNode, limitRange = 2) {
      const _dragTarget = cloneNode
      const _mainStage = this.$refs.mainStage
      if (offsetData._left <= limitRange) { // 判定左边界
        offsetData._left = limitRange
      }
      if (offsetData._left - limitRange >= _mainStage.offsetWidth - _dragTarget.offsetWidth) { // 判定右边界
        offsetData._left = _mainStage.offsetWidth - _dragTarget.offsetWidth - limitRange
      }
      if (offsetData._top <= limitRange) { // 判定上边界
        offsetData._top = limitRange
      }
      if (offsetData._top - limitRange >= _mainStage.offsetHeight - _dragTarget.offsetHeight) { // 判定下边界
        offsetData._top = _mainStage.offsetHeight - _dragTarget.offsetHeight - limitRange
      }
      cloneNode.style.cssText += `top:${offsetData._top}px;left:${offsetData._left}px;`
    },
    /**
     * @description  菜单选择
     */
    handleSelect(key, keyPath) {

    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
$border: #4f647f;
$dropContent: #283444;
$boxContent: #38485f;
$textLight: #fff;
$error: #fc5531;
$stageWrapper: #2f3d4b;
$bgConfigPanel: #2d343c;
.flex-left {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-flow: row nowrap;
}
.large-screen-design {
  width: 100%;
  height: calc(100vh - 50px);
  padding: 0 2px;
  .no-data {
    @include alignCenterByFlex(100%, 100%);
  }
  .el-menu-item {
    margin: 0 10px;
  }
  .el-submenu {
    margin: 0 10px;
  }
  .header-bar {
    display: flex;
    align-items: center;
  }
  .main-content {
    display: flex;
    flex-flow: row nowrap;
    position: relative;
    height: calc(100% - 66px);
    background: $boxContent;
  }
  .drag-box:hover {
    cursor: move;
  }
  .droped-container--wrapper {
    position: relative;
    width: 100%;
    overflow: auto;
    background: url('../../assets/screen_designer/bg_panel_unit.png') repeat;
  }
  .droped-container {
    position: relative;
    width: 100%;
    height: 100%;
    border: 1px solid $error;
    background: $dropContent;
  }
  .config-container {
    position: relative;
    width: 300px;
    flex-shrink: 0;
    color: $textLight;
    padding: 4px;
    background: $bgConfigPanel;
  }
  .bottom-bar {
    @extend .flex-left;
    position: absolute;
    bottom: 0px;
    right: 0px;
    width: 100%;
    height: 30px;
    color: $textLight;
    border-radius: 4px;
    border: 1px solid $border;
    background: rgba(56, 72, 95, 0.3);
    &:hover {
      cursor: pointer;
    }
    & > i {
      height: 100%;
      @include alignCenterByFlex(30px, 100%);
    }
  }
}
</style>

