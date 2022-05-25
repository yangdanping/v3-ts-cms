<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="asideWidth">
        <NavMenu :isCollapse="isMenuCollapse" />
      </el-aside>
      <el-container class="page">
        <el-header class="page-header">
          <NavHeader @collapseChange="handleCollapseChange" />
        </el-header>
        <el-main class="page-content">
          <div class="page-info">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import NavMenu from '@/components/nav-menu';
import NavHeader from '@/components/nav-header';

const isMenuCollapse = ref(false);
const asideWidth = computed(() => (!isMenuCollapse.value ? '210px' : '60px'));
const handleCollapseChange = (isCollapse: boolean) => {
  isMenuCollapse.value = isCollapse;
};
</script>

<style lang="scss" scoped>
$headerHeight: 48px; //header高度
.main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  .main-content,
  .page {
    height: 100%;
  }
  .page-header {
    background: #333;
    color: #fff;
  }

  .el-header {
    height: $headerHeight !important;
  }
  .el-aside {
    line-height: 200px;
    text-align: left;
    background-color: #1e1e1e;
    transition: width 0.3s; //折叠动作平滑效果
    overflow-x: hidden;
    overflow-y: auto;
    scrollbar-width: none; // firefox
    -ms-overflow-style: none; //IE 10+
    cursor: pointer;
    // 用父选择器标识符&使得.el-aside的滚轮隐藏
    &::-webkit-scrollbar {
      display: none;
    }
  }
  .el-header,
  .el-footer {
    display: flex;
    align-items: center;
    text-align: center;
    color: #333;
  }

  .el-main {
    color: #333;
    text-align: center;
    background-color: #f0f2f5;
  }

  .page {
    .page-content {
      height: calc(100% - $headerHeight);
      .page-info {
        background-color: #fff;
        border-radius: 8px;
        overflow: hidden;
        min-width: 500px;
      }
    }
  }
}
</style>
