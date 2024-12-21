<template>
  <el-row :gutter="20" style="height: 95vh;">
    <el-col :span="16">
      <VideoPlayer :Video_information="videoinformation" style="height: 97%"></VideoPlayer>
    </el-col>
    <el-col :span="8">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="Ta的作品" name="first">
          <el-row :align="'middle'" :gutter="20">
            <el-col :span="18">
              <el-link style="font-size: 150%">
                @翌冰之
              </el-link>
              <div style="margin-top: 2vh">
                <span>{{ videoinformation.value?.followers || 0 }}粉丝</span>
                <el-divider direction="vertical"></el-divider>
                <span>{{ videoinformation.value?.likes || 0 }}获赞</span>
              </div>
            </el-col>
            <el-col :span="4">
              <el-button>关注</el-button>
            </el-col>
          </el-row>
          <el-divider></el-divider>
          <el-scrollbar height="74vh">
            <el-row :justify="'center'">
              <el-image v-for="item in videoinformation.value?.relatedVideos || 100" :key="item.id" :fit="'fill'"
                        :src="item.coverUrl"
                        style="width: 17vh; height: 22vh; margin: 0.5vh; border-radius: 10px"/>
            </el-row>
          </el-scrollbar>

        </el-tab-pane>
        <el-tab-pane label="评论" name="second">
          <CommentSection></CommentSection>
        </el-tab-pane>
        <el-tab-pane label="相关推荐" name="third">
          <MediaList></MediaList>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import {onMounted, ref} from 'vue'
import type {TabsPaneContext} from 'element-plus'
import MediaList from "../components/MediaList.vue";
import CommentSection from "../components/CommentSection.vue";
import VideoPlayer from "../components/VideoPlayer.vue";
import videoApi from "../api/videoApi";

const activeName = ref('first')
const videoinformation = ref({})

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}


onMounted(async () => {
  try {
    const response = await videoApi.getVideoDetails({videoId: 2});
    videoinformation.value = response;
    console.log("-------------------------------+++++++++++")
    console.log(videoinformation)
    console.log("-------------------------------+++++++++++")
  } catch (error) {
    console.error('Failed to fetch video details:', error);
  }
})

const url = 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
</script>

<style scoped>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
