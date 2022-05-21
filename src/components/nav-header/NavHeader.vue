<template>
  <div class="nav-header">
    <Icon :name="isCollapse ? 'fold' : 'expand'" @click="handleCollapseClick" size="28px" color="#fff" class="collapse" />
    <div class="content">
      <div>面包屑</div>
      <div class="content-right">
        <div class="box">
          <el-switch v-model="themeType" active-color="#1e1e1e" inline-prompt :active-icon="Moon" :inactive-icon="Sunny" />
        </div>
        <UserInfo />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Icon from '../Icon.vue';
import UserInfo from './src/UserInfo.vue';
import { Sunny, Moon } from '@element-plus/icons-vue';
const themeType = ref(true);
const isCollapse = ref(false);
// 由于Main中也要用到,所以不用事件总线来传送
// handleFoldClick中的isCollapse值 --> 控制Main.vue中el-aside的宽度 --> NavMenu.vue
const emit = defineEmits(['collapseChange']);

const handleCollapseClick = () => {
  isCollapse.value = !isCollapse.value;
  emit('collapseChange', isCollapse.value);
};
</script>

<style lang="scss" scoped>
.nav-header {
  display: flex;
  width: 100%;
  .collapse {
    cursor: pointer;
  }

  .content {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    .content-right {
      display: flex;
      align-items: center;
      color: #fff;
      .box {
        margin-right: 40px;
      }
    }
  }
}
</style>
