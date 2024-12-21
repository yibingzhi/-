<template>
  <!--  精选页面-->
  <MediaList>

    <el-carousel indicator-position="outside" style="height: 20vh;">
      <el-carousel-item v-for="item in 3" :key="item" style="display: flex;justify-content: center">
        <img alt="bugu" src="../../assets/images/布谷布谷.png " style="height: 200px; ">
      </el-carousel-item>
    </el-carousel>


  </MediaList>
</template>

<script lang="ts" setup>

import MediaList from "../../components/MediaList.vue";
</script>


<style scoped>
.el-carousel__item h3 {
  display: flex;
  color: #475669;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>