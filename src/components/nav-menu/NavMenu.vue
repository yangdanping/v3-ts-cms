<template>
  <div class="nav-menu">
    <div class="logo" :class="{ ['move-to-left']: isCollapse }">
      <img src="@/assets/img/logo.svg" alt="logo" />
      <span class="title">Vue3+TS</span>
    </div>
    <!-- 根据userMenus动态生成菜单(default-active是当前激活菜单的index,决定了显示哪个菜单项,所以要改成动态的) -->
    <el-menu
      :default-active="activeValue"
      :collapse="isCollapse"
      :unique-opened="true"
      background-color="#1e1e1e"
      :text-color="isCollapse ? '' : '#fff'"
      active-text-color="#43bf88"
    >
      <template v-for="item in userMenus" :key="item.id">
        <!-- 二级菜单 -->
        <template v-if="item.type === 1">
          <!-- 二级菜单包含标题和子菜单(使用id作为唯一标识,用于展开,注意是要string类型) -->
          <el-sub-menu :index="item.id + ''">
            <template #title><Icon :name="item.icon ?? ''" :label="item.name" :isMenuIcon="true" /></template>
            <template v-for="subItem in item.children" :key="subItem.id">
              <el-menu-item :index="subItem.id + ''" @click="handleItemClick(subItem)">
                <template #title><Icon :name="subItem.icon ?? ''" :label="subItem.name" /></template>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <!-- 一级菜单(该项目没有) -->
        <template v-else-if="item.type === 2">
          <el-menu-item :index="item.id + ''">
            <template #title><Icon :name="item.type ?? ''" :label="item.name" /></template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from '@/store';
import Icon from '@/components/Icon.vue';
import { pathMapToMenu } from '@/utils';
const router = useRouter();
const route = useRoute(); // 当前路由
const store = useStore();
const currentPath = route.path; // 拿到当前活跃的路径

const userMenus = computed(() => store.state.login.userMenus);
const activeMenu = pathMapToMenu(userMenus.value, currentPath);
const activeValue = ref(activeMenu.id + '');

const props = defineProps({
  isCollapse: {
    type: Boolean,
    default: false
  }
});

const handleItemClick = (item: any) => {
  router.push({ path: item.url ?? '/not-found' });
};
</script>

<style lang="scss" scoped>
$menuTextColor: #fff;

.nav-menu {
  height: 100%;
  .logo {
    display: flex;
    align-items: center;
    height: 28px;
    padding: 12px 10px 8px 30px;
    transition: all 0.3s;
    img {
      height: 100%;
      margin: 0 15px 0 9px;
    }
    .title {
      font-size: 16px;
      font-weight: 700;
      color: $menuTextColor;
    }
    &.move-to-left {
      padding-left: 8px;
    }
  }
  .el-menu {
    border-right: none;
    // 二级菜单高亮
    :deep(.el-sub-menu__title):hover {
      text-shadow: 0 0 20px #fff;
    }
    .el-menu-item {
      background-color: #333;

      &:hover {
        text-shadow: 0 0 20px #fff;
      }
      &.is-active {
        color: $menuTextColor;
        background-color: #43bf88;
      }
    }
    &.el-menu--collapse {
      :deep(.el-sub-menu:not(.is-active)) i {
        color: $menuTextColor;
      }
    }
  }
}
.el-menu--popup {
  .el-menu-item:not(.is-active) span {
    color: $menuTextColor;
  }
}
</style>
