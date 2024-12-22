<template>
  <!--  精选页面-->
  <MediaList :VideoList="VideoList">

    <el-carousel indicator-position="outside" style="height: 20vh;">
      <el-carousel-item v-for="item in 3" :key="item" style="display: flex;justify-content: center">
        <img alt="bugu" src="../../assets/images/布谷布谷.png " style="height: 200px; ">
      </el-carousel-item>
    </el-carousel>


  </MediaList>
</template>

<script lang="ts" setup>
import MediaList from "../../components/MediaList.vue";
import {onMounted, ref} from "vue";
import type {TabsPaneContext} from "element-plus";
import videoApi from "../../api/videoApi"

const VideoList = ref<[]>([])

onMounted(async () => {

  try {
    const res = await videoApi.getAuditedVideos();
    VideoList.value = res.data
    console.log(VideoList.value)
  } catch (error) {
  }
});


const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}


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