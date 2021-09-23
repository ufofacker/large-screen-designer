<template>
  <div class="report-management">
    <!-- <div class="pagination">分页栏</div> -->
    <div
      ref="reportList"
      class="report-list"
    >
      <div
        class="list-item btn-add"
        @click="onClickAddBtn"
      ><i class="el-icon-plus" /><span class="btn-add_text">新建报表 </span></div>
      <div
        v-for="(item,index) in reportListView"
        :key="index"
        :class="['list-item',item.hidden ? 'ele__place-holder':'',activeIndex === index ? 'card-hover':'']"
        @mouseenter="activeIndex = index"
        @mouseleave="activeIndex = -1"
      >
        <div
          v-if="activeIndex === index"
          class="panel-edit"
        >
          <el-button type="primary">编辑</el-button>
        </div>
        <div class="item__content">{{ item.reportName }}</div>
        <!-- <div class="item__operate-bar" /> -->
      </div>
    </div>
  </div>
</template>

<script>
import { getReportList } from '@/api/reportManagement'
import { debounce } from 'throttle-debounce'
import _lodash from 'lodash'
export default {
  name: 'ReportManagement',
  data() {
    return {
      reportList: [],
      activeIndex: -1,
      reportListView: [] // 报表列表

    }
  },
  created() {
    this.getList()
  },
  mounted() {
    const debounceFunc = debounce(1000, false, (num) => {
      this.fillReportList()
    })
    window.addEventListener('resize', debounceFunc, false)
  },
  methods: {
    /**
     * @description: 计算需要填充到报表列表中的空元素，解决元素尺寸不一的问题
     */
    fillReportList() {
      const _list = _lodash.cloneDeep(this.reportList)
      const mainContainerWidth = this.$refs.reportList && this.$refs.reportList.clientWidth
      const initElementWidth = 274// report-list容器的宽度
      const rowMax = Math.floor(mainContainerWidth / initElementWidth)
      const emptyNum = rowMax - this.reportList.length % rowMax
      for (let i = 0; i < emptyNum; i++) {
        _list.push({
          hidden: true
        })
      }
      this.reportListView = _list
    },
    /**
     * @description: 跳转到报表创建模式界面
     */
    onClickAddBtn() {
      this.$router.push('/ReportManagement/selectMode')
    },
    /**
     * @description: 获取报表列表
     */
    async getList() {
      try {
        const _res = await getReportList()
        this.reportList = _res.data && _res.data.list
        this.fillReportList()
      } catch (error) {
        console.log('请求失败！')
      }
    }

  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
.report-management {
  width: 100%;
  padding: 20px;
  .ele__place-holder {
    opacity: 0;
  }
  .report-list {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-flow: row wrap;
    .btn-add {
      font-size: 40px;
      color: #2196f3;
      background-image: linear-gradient(
        -90deg,
        rgba(0, 222, 255, 0.39),
        rgba(0, 174, 255, 0.19)
      );
      &:hover {
        color: #fff;
        border: 3px solid #3b4d65;
      }
    }
    .btn-add_text {
      margin-top: 12px;
      font-size: 16px;
    }
  }
  .list-item {
    display: flex;
    background: #4f647f;
    position: relative;
    flex-shrink: 0;
    flex-grow: 1;
    border: 3px solid #3b4d65;
    @include alignCenterByFlex(250px, 180px);
    flex-flow: column nowrap;
    margin: 12px;
    &:hover {
      cursor: pointer;
    }
    .item__content {
      flex: 1;
      @include alignCenterByFlex(100%, 100%);
    }
    .item__operate-bar {
      width: 100%;
      height: 40px;
    }
    .panel-edit {
      position: absolute;
      @include alignCenterByFlex(100%, 100%);
      background: rgba(64, 158, 255, 0.2);
    }
  }
  .card-hover {
    border: 3px solid #00baff;
  }
}
</style>

