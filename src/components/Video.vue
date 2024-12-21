<template>
  <VideoPlayer :Video_information="videoInformation"></VideoPlayer>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import VideoPlayer from './VideoPlayer.vue';
import videoApi from '../api/videoApi';

console.log("-------------------------------+++++++++++")
const videoInformation = ref(null);

onMounted(async () => {
  videoInformation.value = await videoApi.getVideoDetails({videoId: 1})
  console.log("-------------------------------+++++++++++")
  console.log(videoInformation.value)
  console.log("-------------------------------+++++++++++")
})

</script>
