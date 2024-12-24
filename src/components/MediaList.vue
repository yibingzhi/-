<template>
  <!--  媒体列表-->

  <el-scrollbar height="90vh">
    <slot></slot>
    <el-row :justify="'space-around'">
      <el-col v-for="i in VideoList " :span="6">
        <MediaShowcase :video="i"></MediaShowcase>
      </el-col>

    </el-row>
  </el-scrollbar>
</template>
<script lang="ts" setup>

import MediaShowcase from "./MediaShowcase.vue";
import {useRoute} from "vue-router";
import {ref, watch} from "vue";

const route = useRoute();
const currentPath = ref(route.path); // 当前路由路径

const props = defineProps({
  VideoList: {
    type: Array,
    required: true
  }
});

// console.log("---------------------")
// console.log(props.VideoList)
// console.log("---------------------")

// 监听路由变化
watch(route, (to, from) => {
  if (to && from) {
    currentPath.value = to.path; // 更新当前路径
    console.log('路由变化:', to.path, from.path);
    // 在这里执行刷新逻辑
  }
}, {immediate: true});

</script>

<style scoped>

</style>