<template>

  <!--  关注页面-->
  <el-row :gutter="0" style="height: 90vh; background-color: pink">

    <el-col :span="4">
      <el-scrollbar height="90vh">
        <el-menu>
          <el-menu-item v-for="i in 100">
            <el-avatar :size="50" :src="circleUrl"/>
            <el-text style="margin-left: 2vh">张三</el-text>
          </el-menu-item>
        </el-menu>
      </el-scrollbar>
    </el-col>

    <el-col :span="20" style="height: 98vh;">
      <el-scrollbar height="90vh">
        <MediaList></MediaList>
      </el-scrollbar>
    </el-col>
  </el-row>

</template>
<script lang="ts" setup>

import Recommended from "./Recommended.vue";
import {ref} from "vue";
import MediaList from "../../components/MediaList.vue";

const circleUrl = ref('http://117.72.100.74:8080/index.php?action=file&file=%E5%A4%B4%E5%83%8F%2F%E7%94%B7%E5%A4%B4%2Fphoto_2024-11-26_20-10-33.jpg')
</script>

<style scoped>
Recommended {
  margin-top: 10px;
}


</style>