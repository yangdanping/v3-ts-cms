<template>
  <div class="nav-header">
    <Icon :name="isCollapse ? 'fold' : 'expand'" @click="handleCollapseClick" size="28px" color="#fff" class="collapse" />
    <div class="content">
      <NavBreadcrumb :breadcrumbs="breadcrumbs" />
      <div class="content-right">
        <div class="box">
          <el-switch v-model="themeType" @change="changeTheme" active-color="#1e1e1e" inline-prompt :active-icon="Moon" :inactive-icon="Sunny" />
        </div>
        <UserInfo />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from '@/store';
import Icon from '../../Icon.vue';
import UserInfo from './UserInfo.vue';
import NavBreadcrumb from '@/base-ui/breadcrumb';
import { Sunny, Moon } from '@element-plus/icons-vue';
import { pathMapBreadcrumbs, emitter, LocalCache } from '@/utils';
const route = useRoute(); // 当前路由
const store = useStore(); // 当前路由
const themeType = ref(true);
const isCollapse = ref(false);
// 由于Main中也要用到,所以不用事件总线来传送
// handleFoldClick中的isCollapse值 --> 控制Main.vue中el-aside的宽度 --> NavMenu.vue
const emit = defineEmits(['collapseChange']);
const handleCollapseClick = () => {
  isCollapse.value = !isCollapse.value;
  emit('collapseChange', isCollapse.value);
};

themeType.value = LocalCache.getCache('theme') === 'dark' ? true : false;

// 获得面包屑 [{name:,path:}]
const breadcrumbs = computed(() => {
  const userMenus = store.state.login.userMenus; // 计算属性收集依赖,值变化后会重新计算
  const currentPath = route.path;
  return pathMapBreadcrumbs(userMenus, currentPath);
});
console.log(breadcrumbs.value);

const changeTheme = () => emitter.emit('changeThemeType', themeType.value);
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
