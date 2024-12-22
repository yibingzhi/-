<template>
  <el-row v-if="!isLoading" :gutter="20" style="height: 95vh;">
    <el-col :span="16">
      <VideoPlayer :Video_information="videoinformation" style="height: 97%"></VideoPlayer>
    </el-col>
    <el-col :span="8">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="Ta的作品" name="first">
          <el-row :align="'middle'" :gutter="20">
            <el-col :span="18">
              <el-link style="font-size: 150%">
                @{{ videoinformation.title }}
              </el-link>
              <div style="margin-top: 2vh">
                <el-text>{{ videoinformation.value?.followers || 0 }}粉丝</el-text>

                <el-divider direction="vertical"/>
                <el-text style="margin: 0 20px">{{
                    videoinformation?.likeCount || 0
                  }}获赞
                </el-text>
              </div>
            </el-col>
            <el-col :span="4">
              <el-button>关注</el-button>
            </el-col>
          </el-row>
          <el-divider></el-divider>
          <el-scrollbar height="74vh">
            <el-row :justify="'space-around'">
              <el-image v-for="item in userVideoList|| 0" :key="item.id" :fit="'fill'"
                        :src="item.coverImagePath"
                        style="width: 18vh; height: 24vh; margin: 0.5vh; border-radius: 10px; cursor: pointer;"
                        @click.native="$router.push({ name: 'video', params: { videoId: item.videoId } })    "
              />
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
import {onMounted, ref, watch} from 'vue'
import type {TabsPaneContext} from 'element-plus'
import MediaList from "../components/MediaList.vue";
import CommentSection from "../components/CommentSection.vue";
import VideoPlayer from "../components/VideoPlayer.vue";
import videoApi from "../api/videoApi";
import {useRoute} from "vue-router";

const isLoading = ref(true);
const route = useRoute();
const videoId = route.params.videoId; // 获取查询参数
const activeName = ref('first')
const videoinformation = ref({})

const userVideoList = ref([])

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}


onMounted(async () => {
  try {
    const response = await videoApi.getVideoDetails({videoId: videoId});
    videoinformation.value = response;
    isLoading.value = false;
    console.log(response)
  } catch (error) {
    console.error('Failed to fetch video details:', error);
  }
  try {
    const response = await videoApi.getVideoListByAuthorId({creatorId: videoinformation.value.creatorId});
    userVideoList.value = response.data;
    console.log(response.data)
  } catch (error) {
    console.error('Failed to fetch video details:', error);
  }
})


watch(() => route.path, (newPath, oldPath) => {
  console.log('Route changed from', oldPath, 'to', newPath);
  // 这里可以调用你的数据获取方法
  window.location.reload();

});

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
