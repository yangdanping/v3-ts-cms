<template>
  <div class="nav-header">
    <Icon :name="isCollapse ? 'fold' : 'expand'" @click="handleCollapseClick" size="28px" class="collapse" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Icon from '../Icon.vue';
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
  .collapse {
    cursor: pointer;
  }
}
</style>
