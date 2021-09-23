<template>
  <div class="chart-config-panel">
    <el-tabs
      v-model="tabActiveName"
      :stretch="true"
      @tab-click="handleClick"
    >
      <!-- 图表配置 -->
      <el-tab-pane
        label="配置"
        name="first"
      >
        <el-collapse
          v-model="collapseActiveName"
          accordion
        >
          <!-- 图表标题 -->
          <el-collapse-item
            v-if="title._showChartConfig"
            title="标题"
            name="title"
          >
            <el-form
              ref="title"
              :model="title"
              label-width="100px"
              class="demo-title"
            >
              <!-- 显示标题 -->
              <el-form-item
                label="显示标题"
                prop="show"
              >
                <el-switch v-model="title.show" />
              </el-form-item>
              <!-- 标题名称 -->
              <el-form-item
                label="标题名称"
                prop="text"
              >
                <el-input
                  v-model.lazy="title.text"
                  placeholder="请输入名称"
                />
              </el-form-item>
              <!-- 字体大小 -->
              <el-form-item
                label="字体大小"
                prop="fontSize"
                :disabled="!title.show"
              >
                <el-input-number
                  v-model="title.textStyle.fontSize"
                  :min="0"
                  :max="100"
                  label="请输入字体大小"
                  :disabled="!title.show"
                />
              </el-form-item>
              <!-- 字体粗细 -->
              <el-form-item
                label="字体粗细"
                prop="fontWeight"
              >
                <el-select
                  v-model="title.textStyle.fontWeight"
                  placeholder="请选择字体粗细"
                  :disabled="!title.show"
                >
                  <el-option
                    label="正常"
                    value="normal"
                  />
                  <el-option
                    label="粗体"
                    value="bold"
                  />
                  <el-option
                    label="特粗"
                    value="bolder"
                  />
                  <el-option
                    label="细体"
                    value="lighter"
                  />
                </el-select>
              </el-form-item>
              <!-- 标题位置 -->
              <el-form-item
                label="标题位置"
                prop="left"
              >
                <el-select
                  v-model="title.left"
                  placeholder="请选择标题位置"
                  :disabled="!title.show"
                >
                  <el-option
                    label="左对齐"
                    value="left"
                  />
                  <el-option
                    label="居中对齐"
                    value="center"
                  />
                  <el-option
                    label="右对齐"
                    value="right"
                  />
                </el-select>
              </el-form-item>
              <!-- 标题颜色 -->
              <el-form-item
                label="标题颜色"
                prop="color"
              >
                <el-color-picker
                  v-model="title.textStyle.color"
                  :disabled="!title.show"
                />
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <!-- X坐标轴 -->
          <el-collapse-item
            v-if="xAxis._showChartConfig"
            title="X轴"
            name="xAxis"
          >
            <el-form
              ref="xAxis"
              :model="xAxis"
              label-width="100px"
              class="demo-xAxis"
            >
              <!-- 是否显示X轴 -->
              <el-form-item
                label="显示X轴"
                prop="show"
              >
                <el-switch v-model="xAxis.show" />
              </el-form-item>
              <!-- 名称 -->
              <el-form-item
                label="名称"
                prop="name"
              >
                <el-input
                  v-model.lazy="xAxis.name"
                  placeholder="请输入名称"
                />
              </el-form-item>
              <!-- 显示网格线 -->
              <el-form-item
                label="显示网格线"
                prop="show"
              >
                <el-switch v-model="xAxis.splitLine.show" />
              </el-form-item>
              <!-- 字体大小 -->
              <el-form-item
                label="字体大小"
                prop="fontSize"
                :disabled="!xAxis.show"
              >
                <el-input-number
                  v-model="xAxis.nameTextStyle.fontSize"
                  :min="0"
                  :max="100"
                  label="请输入字体大小"
                  :disabled="!xAxis.show"
                />
              </el-form-item>
              <!-- 字体粗细 -->
              <el-form-item
                label="字体粗细"
                prop="fontWeight"
              >
                <el-select
                  v-model="xAxis.nameTextStyle.fontWeight"
                  placeholder="请选择字体粗细"
                  :disabled="!xAxis.show"
                >
                  <el-option
                    label="正常"
                    value="normal"
                  />
                  <el-option
                    label="粗体"
                    value="bold"
                  />
                  <el-option
                    label="特粗"
                    value="bolder"
                  />
                  <el-option
                    label="细体"
                    value="lighter"
                  />
                </el-select>
              </el-form-item>
              <!-- 标题颜色 -->
              <el-form-item
                label="标题颜色"
                prop="color"
              >
                <el-color-picker
                  v-model="xAxis.nameTextStyle.color"
                  :disabled="!xAxis.show"
                />
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <!-- Y坐标轴 -->
          <el-collapse-item
            v-if="yAxis._showChartConfig"
            title="Y轴"
            name="yAxis"
          >
            <el-form
              ref="yAxis"
              :model="yAxis"
              label-width="100px"
              class="demo-yAxis"
            >
              <!-- 是否显示X轴 -->
              <el-form-item
                label="显示Y轴"
                prop="show"
              >
                <el-switch v-model="yAxis.show" />
              </el-form-item>
              <!-- 名称 -->
              <el-form-item
                label="名称"
                prop="name"
              >
                <el-input
                  v-model.lazy="yAxis.name"
                  placeholder="请输入名称"
                />
              </el-form-item>
              <!-- 显示网格线 -->
              <el-form-item
                label="显示网格线"
                prop="show"
              >
                <el-switch v-model="yAxis.splitLine.show" />
              </el-form-item>
              <!-- 字体大小 -->
              <el-form-item
                label="字体大小"
                prop="fontSize"
                :disabled="!yAxis.show"
              >
                <el-input-number
                  v-model="yAxis.nameTextStyle.fontSize"
                  :min="0"
                  :max="100"
                  label="请输入字体大小"
                  :disabled="!yAxis.show"
                />
              </el-form-item>
              <!-- 字体粗细 -->
              <el-form-item
                label="字体粗细"
                prop="fontWeight"
              >
                <el-select
                  v-model="yAxis.nameTextStyle.fontWeight"
                  placeholder="请选择字体粗细"
                  :disabled="!yAxis.show"
                >
                  <el-option
                    label="正常"
                    value="normal"
                  />
                  <el-option
                    label="粗体"
                    value="bold"
                  />
                  <el-option
                    label="特粗"
                    value="bolder"
                  />
                  <el-option
                    label="细体"
                    value="lighter"
                  />
                </el-select>
              </el-form-item>
              <!-- 标题颜色 -->
              <el-form-item
                label="标题颜色"
                prop="color"
              >
                <el-color-picker
                  v-model="yAxis.nameTextStyle.color"
                  :disabled="!yAxis.show"
                />
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <!-- 图例 -->
          <el-collapse-item
            v-if="legend._showChartConfig"
            title="图例"
            name="legend"
          >
            <el-form
              ref="legend"
              :model="legend"
              label-width="100px"
              class="demo-legend"
            >
              <!-- 是否显示图例 -->
              <el-form-item
                label="显示图例"
                prop="show"
              >
                <el-switch v-model="legend.show" />
              </el-form-item>
              <!-- 图例名称 -->
              <el-form-item
                label="图例名称"
                prop="lengendLabel"
              >
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="图例名称用逗号‘,’分隔"
                  placement="top-start"
                >
                  <el-input
                    v-model.lazy="lengendLabel"
                    placeholder="请输入名称"
                  />
                </el-tooltip>
              </el-form-item>
              <!-- 图例图形宽度 -->
              <el-form-item
                label="图例图形宽度"
                prop="itemWidth"
                :disabled="!legend.show"
              >
                <el-input-number
                  v-model="legend.itemWidth"
                  :min="0"
                  :max="100"
                  label="请输入字体大小"
                  :disabled="!legend.show"
                />
              </el-form-item>
              <!-- 图例图形高度 -->
              <el-form-item
                label="图例图形高度"
                prop="itemHeight"
                :disabled="!legend.show"
              >
                <el-input-number
                  v-model="legend.itemHeight"
                  :min="0"
                  :max="100"
                  label="请输入字体大小"
                  :disabled="!legend.show"
                />
              </el-form-item>
              <!-- 字体大小 -->
              <el-form-item
                label="字体大小"
                prop="fontSize"
                :disabled="!legend.show"
              >
                <el-input-number
                  v-model="legend.textStyle.fontSize"
                  :min="0"
                  :max="100"
                  label="请输入字体大小"
                  :disabled="!legend.show"
                />
              </el-form-item>
              <!-- 字体粗细 -->
              <el-form-item
                label="字体粗细"
                prop="fontWeight"
              >
                <el-select
                  v-model="legend.textStyle.fontWeight"
                  placeholder="请选择字体粗细"
                  :disabled="!legend.show"
                >
                  <el-option
                    label="正常"
                    value="normal"
                  />
                  <el-option
                    label="粗体"
                    value="bold"
                  />
                  <el-option
                    label="特粗"
                    value="bolder"
                  />
                  <el-option
                    label="细体"
                    value="lighter"
                  />
                </el-select>
              </el-form-item>
              <!-- 字体颜色 -->
              <el-form-item
                label="标题颜色"
                prop="color"
              >
                <el-color-picker
                  v-model="legend.textStyle.color"
                  :disabled="!legend.show"
                />
              </el-form-item>
            </el-form>
          </el-collapse-item>

        </el-collapse>
      </el-tab-pane>
      <!-- 数据配置 -->
      <el-tab-pane
        label="数据"
        name="second"
      >
        <el-form
          :model="api"
          label-width="85px"
          class="demo-api"
        >
          <!-- 接口名称 -->
          <el-form-item
            label="接口名称"
            prop="url"
          >
            <el-input
              v-model="api.url"
              type="textarea"
              rows="4"
              placeholder="示例：https://some-domain.com/api/chartData"
              maxlength="100"
              show-word-limit
            />
          </el-form-item>
          <!-- 请求方式 -->
          <el-form-item
            label="请求方式"
            prop="method"
          >
            <el-radio
              v-model="api.method"
              label="post"
            >POST</el-radio>
            <el-radio
              v-model="api.method"
              label="get"
            >GET</el-radio>
          </el-form-item>
          <div
            v-for="(item,index) in api.dataBind"
            :key="index"
          >
            <span class="config__part-title">{{ '图例数据绑定 - '+item.name }}</span>
            <!-- 包含x轴，y轴的图表配置 -->
            <div v-if="['line-chart','bar-chart'].includes(item.configType)">
              <!-- X轴字段 -->
              <el-form-item
                label="X轴字段"
                prop="label"
              >
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="绑定为X轴数据源的字段名称"
                  placement="top-start"
                >
                  <el-input
                    v-model.lazy="item.label"
                    placeholder="请输入X轴绑定字段名称"
                  />
                </el-tooltip>
              </el-form-item>
              <!-- Y轴字段 -->
              <el-form-item
                label="Y轴字段"
                prop="value"
              >
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="绑定为Y轴数据源的字段名称"
                  placement="top-start"
                >
                  <el-input
                    v-model.lazy="item.value"
                    placeholder="请输入Y轴绑定字段名称"
                  />
                </el-tooltip>
              </el-form-item>
            </div>
            <!-- 仪表盘配置 -->
            <el-form-item
              v-if="['gauge-chart'].includes(item.configType)"
              label="数据字段"
              prop="value"
            >
              <el-tooltip
                class="item"
                effect="dark"
                content="绑定到仪表盘的数据字段"
                placement="top-start"
              >
                <el-input
                  v-model.lazy="item.value"
                  placeholder="请输入绑定字段名称"
                />
              </el-tooltip>
            </el-form-item>
            <!-- 饼图 -->
            <div v-if="['pie-chart'].includes(item.configType)">
              <!-- 图例名称字段 -->
              <el-form-item
                label="图例名称"
                prop="label"
              >
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="绑定为图例名的字段名称"
                  placement="top-start"
                >
                  <el-input
                    v-model.lazy="item.label"
                    placeholder="请输入字段名称"
                  />
                </el-tooltip>
              </el-form-item>
              <!-- 数据字段 -->
              <el-form-item
                label="数据字段"
                prop="value"
              >
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="绑定到图例的数据字段"
                  placement="top-start"
                >
                  <el-input
                    v-model.lazy="item.value"
                    placeholder="请输入字段名称"
                  />
                </el-tooltip>
              </el-form-item>
            </div>
          </div>
          <!-- 刷新配置 -->
          <div class="btn-refresh">
            <el-button
              v-if="activeChartId !== ''"
              style="width:80%"
              type="primary"
              @click="onRefresh"
            >测试接口</el-button>
          </div>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <div class="btn-save">
      <el-button
        v-if="activeChartId !== ''"
        style="width:60%"
        type="primary"
        @click="onSaveConfig"
      >保存配置</el-button>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import { debounce } from 'throttle-debounce'
import _lodash from 'lodash'
import { genCommConfig, getConfigByChartType, genApiConfig, getBindData } from '../../config/chartConfig'
const _commConfig = genCommConfig()
const _api = genApiConfig()
export default {
  name: 'ChartConfigPanel',
  props: {
    activeChartId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      tabActiveName: 'first', // 当前页签名称
      collapseActiveName: '1', // 当前面板项名称
      curConfigCompId: '', // 组件id
      title: _commConfig.title,
      xAxis: _commConfig.xAxis,
      yAxis: _commConfig.yAxis,
      legend: _commConfig.legend,
      series: [],
      api: _api,
      lengendLabel: ''
    }
  },
  watch: {
    title: {
      deep: true,
      handler: function(val) {
        this._debounceUpdateConfig && this._debounceUpdateConfig('title')
      }
    },
    xAxis: {
      deep: true,
      handler: function(val) {
        this._debounceUpdateConfig && this._debounceUpdateConfig('xAxis')
      }
    },
    yAxis: {
      deep: true,
      handler: function(val) {
        this._debounceUpdateConfig && this._debounceUpdateConfig('yAxis')
      }
    },
    legend: {
      deep: true,
      handler: function(val) {
        this._debounceUpdateConfig && this._debounceUpdateConfig('legend')
      }
    },
    lengendLabel: function(newVal, oldVal) {
      const self = this
      if (oldVal) {
        const _list = newVal.split(',')
        _list.forEach((item, key) => {
          item = item.trim()
          if (self.series[key]) {
            self.series[key]['name'] = item
          }
        })
        self.series = [...self.series]
        self.legend.data = _list
      }
    }
  },
  mounted() {
    this._debounceUpdateConfig = debounce(500, false, (type) => {
      if (this.activeChartId !== '') {
        const _config = {}
        if (type === 'legend') {
          _config['series'] = _lodash.cloneDeep(this.series)
        }
        _config[type] = _lodash.cloneDeep(this[type])
        this.$store.commit('reportManagement/UPDATE_DRAWING_LIST_ITEM', { id: this.curConfigCompId, chartOptions: _config })
      }
    })
  },
  methods: {
    ...mapMutations('reportManagement', [
      'UPDATE_DRAWING_LIST_ITEM',
      'UPDATE_CHART_API'
    ]),
    ...mapActions('reportManagement', [
      'saveReportInfo'
    ]),
    onRefresh() {
      this.$store.commit('reportManagement/UPDATE_CHART_API', { id: this.curConfigCompId, api: this.api, dataBind: this.dataBind })
    },
    onSaveConfig() {
      this.saveReportInfo()
    },
    resetConfig() {
      const _commConfig = genCommConfig()
      const _api = genApiConfig()
      this.title = _commConfig.title
      this.xAxis = _commConfig.xAxis
      this.yAxis = _commConfig.yAxis
      this.legend = _commConfig.legend
      this.api = _api
    },
    updateConfig(obj) {
      this.resetConfig()
      const self = this
      const _chartConfig = obj.chartOptions
      this.curConfigCompId = obj.id
      if (_chartConfig.legend && Array.isArray(_chartConfig.legend.data) && _chartConfig.legend.data.length > 0) {
        this.lengendLabel = _chartConfig.legend.data.join(',')
      }
      const _chartName = obj.id.substring(0, obj.id.indexOf('_'))
      const _configType = getConfigByChartType(_chartName)
      _configType.forEach((item, key) => {
        const _obj = _chartConfig[item] || null
        if (_obj) {
          const _arrList = ['series']
          if (_arrList.includes(item)) {
            _obj.forEach((_oItem, key) => {
              self[item][key] = self[item][key] ? { ...self[item][key], ..._oItem } : { ..._oItem }
            })
          } else {
            self[item] = { ...self[item], ..._obj }
            self[item]._showChartConfig = true
          }
        } else {
          typeof self[item] === 'object' ? self[item]._showChartConfig = false : ''
        }
      })
      self.api = { ...self.api, ...obj.api }
      if (Array.isArray(self.api.dataBind) && self.api.dataBind.lenght === 0) {
        this.api.dataBind = this.genDataBind(_chartConfig.series, _chartName)
      }
    },
    genDataBind(series, chartName) {
      let _list = []
      const _funMapping = {
        'pie': this.getConfigByPie,
        'line': this.getConfigByHasAxis,
        'bar': this.getConfigByHasAxis,
        'gauge': this.getConfigByGauge
      }
      series.map((item, key) => {
        _list = [..._list, ..._funMapping[item.type](item, chartName)]
      })
      return _list
    },
    getConfigByPie(item, chartName) {
      const _list = []
      if (Array.isArray(item.data)) {
        item.data.forEach((dItem, dKey) => {
          const _obj = _lodash.cloneDeep(getBindData(chartName))
          _obj.name = dItem.name
          _list.push(_obj)
        })
      }
      return _list
    },
    getConfigByGauge(item, chartName) {
      const _list = []
      if (item.name && item.name !== 'style') {
        const _obj = _lodash.cloneDeep(getBindData(chartName))
        _obj.name = item.name
        _list.push(_obj)
      }
      return _list
    },
    getConfigByHasAxis(item, chartName) {
      const _list = []
      if (item.name && item.name !== 'style') {
        const _obj = _lodash.cloneDeep(getBindData(chartName))
        _obj.name = item.name
        _list.push(_obj)
      }
      return _list
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    resetConfigPanel() {
      const _commConfig = genCommConfig()
      this.title = _commConfig.title
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
.chart-config-panel {
  width: 100%;
  ::v-deep .el-tabs__item {
    color: #fff;
  }
  ::v-deep .el-collapse-item__header {
    padding: 0 8px;
    background: #1d1f26;
    color: #bcc9d4;
  }
  ::v-deep .el-collapse-item__content {
    background: #000;
    padding: 8px;
    color: #fff;
  }
  ::v-deep.el-tabs__content {
    overflow: auto;
    position: relative;
    padding-bottom: 18px;
    height: calc(100vh - 204px);
  }
  .btn-refresh {
    width: 100%;
    text-align: center;
  }
  .btn-save {
    width: 100%;
    position: absolute;
    bottom: 40px;
    left: 0;
    text-align: center;
  }
  .config__part-title {
    display: inline-block;
    padding-bottom: 10px;
    font-size: 14px;
    margin: 15px;
  }
}
</style>

