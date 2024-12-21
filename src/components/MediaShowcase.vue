<template>
  <!-- 媒体展示 -->
  <slot></slot>
  <el-card shadow="hover"
           style="

                  height: 35vh;
                  width: 35vh;
                  border-radius: 20px;
                  margin: 10px;">
    <video ref="myVideo"
           loop
           poster="../assets/images/布谷布谷.png"
           @mouseout="pauseVideo"
           @mouseover="playVideo">
      <source
          src="https://bugugu.oss-cn-beijing.aliyuncs.com/%E6%B5%8B%E8%AF%95/%E7%BB%BF%E5%B0%8F%E6%9E%97%E5%AD%90/6719280684936056076-%E6%9C%89%E4%BA%BA%E6%94%B6%E9%97%B2%E7%BD%AE%E5%AE%9D%E8%B4%9D%E5%90%97%EF%BC%8C%E5%8F%8D%E6%AD%A3%E6%88%91%E9%97%B2%E7%9D%80%E4%B9%9F%E6%98%AF%E9%97%B2%E7%9D%80.mp4"
          type="video/mp4">
    </video>
    <template #footer>
      <el-col>
        <el-text class="mx-1" size="large" style="display: block">不为浮云遮望眼</el-text>
        <el-link class="mx-1" href="/UserProfile" style="margin-top: 1px">@党卓橦大帅逼</el-link>
      </el-col>
    </template>

  </el-card>
</template>

<script lang="ts" setup>
import {ref} from 'vue';

const myVideo = ref<HTMLVideoElement | null>(null);

const playVideo = () => {
  if (myVideo.value) {
    myVideo.value.play();
  }
};

const pauseVideo = () => {
  if (myVideo.value) {
    myVideo.value.pause();
  }
};

const stopVideo = () => {
  if (myVideo.value) {
    myVideo.value.pause(); // 先暂停
    myVideo.value.currentTime = 0; // 重置到视频开始
    myVideo.value.load(); // 重新加载视频
  }
};
</script>

<style scoped>
video {
  border-radius: 10px;
  width: 100%;
  height: 20vh;
  object-fit: scale-down;
  cursor: pointer;


}
</style>
