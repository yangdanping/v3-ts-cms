<template>
  <template v-if="!isMenuIcon">
    <span :class="iconLabel">
      <span v-if="label && side === 'right'">{{ label }}</span>
      <el-icon :size="size" :color="color">
        <User v-if="name === 'user'" />
        <Iphone v-else-if="name === 'iphone'" />
        <Expand v-else-if="name === 'expand'" />
        <Fold v-else-if="name === 'fold'" />
      </el-icon>
      <span v-if="label && side === 'left'">{{ label }}</span>
    </span>
  </template>
  <!-- ElMenu专用 -->
  <template v-else>
    <span v-if="label && side === 'right'">{{ label }}</span>
    <el-icon :size="size" :color="color">
      <Monitor v-if="name === 'el-icon-monitor'" />
      <Setting v-else-if="name === 'el-icon-setting'" />
      <Goods v-else-if="name === 'el-icon-goods'" />
      <ChatLineRound v-else-if="name === 'el-icon-chat-line-round'" />
    </el-icon>
    <span v-if="label && side === 'left'">{{ label }}</span>
  </template>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { User, Iphone, Monitor, Goods, Setting, ChatLineRound, Expand, Fold } from '@element-plus/icons-vue';

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: ''
  },
  side: {
    type: String,
    default: 'left'
  },
  isMenuIcon: {
    type: Boolean,
    default: false
  }
});

// 若外界有传label,则使flex布局生效
const iconLabel = computed(() => ({ iconLabel: !!props.label ?? false }));
</script>

<style lang="scss" scoped>
.iconLabel {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
