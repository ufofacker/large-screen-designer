<template>
  <div class="select-mode">
    <div
      ref="page"
      class="main-content"
    >
      <el-card class="box-card">
        <div
          slot="header"
          class="clearfix"
        >
          <span class="tip">请选择创建报表的方式</span>
          <el-button
            ref="nextStep"
            style="float: right; padding: 3px 0"
            type="text"
            @click="goScreenDesigner"
          >下一步</el-button>
        </div>
        <el-card class="box-card">
          <el-radio
            v-model="createMode"
            :label="1"
          >通过自定义方式创建报表</el-radio>
        </el-card>
        <el-card class="box-card">
          <el-radio
            v-model="createMode"
            :label="2"
          >通过报表布局创建报表</el-radio>
          <div class="split-line" />
          <div
            ref="reportList"
            class="report-list"
          >
            <div
              v-if="createMode !== 2"
              class="disabled-mask"
            />
            <div
              v-for="(item,index) in layoutList"
              :key="index"
              :class="['list-item',activeLyoutIndex === index ? 'card-active':'']"
              @click="activeLyoutIndex = index"
            >
              <div
                v-if="activeLyoutIndex === index"
                class="panel__check-item"
              >
                <div class="icon-box"> <i class="el-icon-check" /></div>
              </div>
              <div class="item__content">{{ item.reportName }}</div>
            </div>
          </div>
        </el-card>
        <el-card class="box-card">
          <el-radio
            v-model="createMode"
            :label="3"
          >通过报表模板创建报表</el-radio>
          <div class="split-line" />
          <div
            ref="reportList"
            class="report-list"
          >
            <div
              v-if="createMode !== 3"
              class="disabled-mask"
            />
            <div
              v-for="(item,index) in templateList"
              :key="index"
              :class="['list-item',activeTempletIndex === index ? 'card-active':'']"
              @click="activeTempletIndex = index"
            >
              <div
                v-if="activeTempletIndex === index"
                class="panel__check-item"
              >
                <div class="icon-box"> <i class="el-icon-check" /></div>
              </div>
              <div class="item__content">{{ item.reportName }}</div>
            </div>
          </div>
        </el-card>
      </el-card>
    </div>
  </div>
</template>

<script>

export default {
  name: 'SelectMode',
  data() {
    return {
      createMode: 1, // 1:自定义模式,2:布局模式,3:模板模式
      activeLyoutIndex: -1, // 布局列表激活状态项索引
      activeTempletIndex: -1, // 模板列表激活状态项索引
      layoutList: [{ reportName: 'dsfsd' }], // 布局列表
      templateList: [{ reportName: '撒旦发射点' }] // 模板列表
    }
  },
  watch: {
    createMode(newVal) {
      this.activeTempletIndex = this.activeLyoutIndex = -1
    }
  },
  methods: {
    /**
     * @description 跳转到大屏设计器
     */
    goScreenDesigner() {
      if (this.createMode !== 1) {
        this.$message({
          message: '请选择自定义方式创建报表（该功能即将开发，敬请期待！）',
          type: 'warning'
        })
      } else {
        this.$router.push('/ReportManagement/LargeScreenDesign')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
.select-mode {
  width: 100%;
  .disabled {
    pointer-events: none;
  }
  .split-line {
    display: block;
    height: 1px;
    width: 100%;
    margin-bottom: 10px;
    margin-top: 6px;
    position: relative;
    background-color: #dcdfe6;
  }
  .disabled-mask {
    position: absolute;
    background-color: rgba(200, 201, 204, 0.5);
    width: 100%;
    height: 100%;
    z-index: 1;
    cursor: not-allowed;
  }
  .main-content {
    .box-card {
      margin-bottom: 24px;
      min-height: 180px;
      &:first-child {
        min-height: 50px;
        line-height: 24px;
      }
    }
    .card-group__radio {
      width: 100%;
    }
  }
  .tip {
    color: #304156;
    font-size: 18px;
  }

  .report-list {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-flow: row wrap;
    .btn-add {
      font-size: 40px;
      color: #2196f3;
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
    flex-grow: 0;
    border: 3px solid #3b4d65;
    @include alignCenterByFlex(200px, 142px);
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
    .icon-box {
      width: 36px;
      height: 36px;
      font-size: 24px;
      color: #fff;
      background: #67c23a;
      border: 2px solid #fff;
      border-radius: 26px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .panel__check-item {
      position: absolute;
      @include alignCenterByFlex(100%, 100%);
      background: rgba(31, 158, 255, 0.4);
    }
  }
  .card-active {
    border: 3px solid #00baff;
  }
}
</style>

