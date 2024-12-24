<template>
  <!-- 媒体展示 -->
  <slot></slot>
  <el-card shadow="hover"
           style="
                  height: 35vh;
                  width: 35vh;
                  border-radius: 20px;
                  margin: 10px;">


    <router-link :to="{ name: 'video', params: { videoId: props.video.videoId } }" style=" text-decoration: none;">
      <video ref="myVideo"
             :poster="props.video.coverImagePath "
             loop
             @mouseout="pauseVideo"
             @mouseover="playVideo">
        <source
            :src="props.video.videoFilePath"
            type="video/mp4">
      </video>
    </router-link>

    <template #footer>
      <el-col>
        <el-text class="mx-1" size="large" style="display: block">{{ props.video.description }}</el-text>
        <el-link :href="'/User/' + props.video.creatorId" class="mx-1" style="margin-top: 1px;">
          @{{ props.video.title }}
        </el-link>

      </el-col>
    </template>

  </el-card>
</template>

<script lang="ts" setup>
import {ref} from 'vue';

const props = defineProps({
  video: {
    type: Object,
    required: true
  }
});
// console.log("-------------------================")
// console.log(props.video)
// console.log("-------------------============")


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
