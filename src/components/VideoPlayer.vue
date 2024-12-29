<template>
  <!-- 视频组件 -->
  <el-row>
    <el-col :span="isComment ? 16 : 24" class="nav">
      <div ref="dplayerContainer" class="vedio"></div>
      <el-row class="hudong" style="position: absolute; z-index: 1; top: 40vh; right: 2vh; display: block">
        <el-avatar :size="50" :src="userInfo ? userInfo.data.avatarUrl : circleUrl" class="child" @click="() => {}"/>
        <div v-for="(button, index) in buttons" :key="index" class="child">
          <el-button type="primary" @click="handleButtonClick(button.action)">{{ button.label }}</el-button>
        </div>


      </el-row>
      <el-col style="position: absolute;  top: 70vh;left: 10vh;">
        <el-col>
          <el-link :href="'/User/' + props.Video_information.creatorId"
                   style="color: white; font-size: 20px;display: block">
            @ {{ userInfo?.data?.nickname || '布谷' }}
          </el-link>
        </el-col>

        <el-text style="" type="primary">{{ props.Video_information.description }}</el-text>
      </el-col>
    </el-col>

    <el-col v-if="isComment" :span="8">
      <CommentSection :videoId="props.Video_information.videoId"></CommentSection>
    </el-col>


  </el-row>
</template>

<script setup>
import {computed, onBeforeUnmount, onMounted, ref, watch} from 'vue';
import DPlayer from 'dplayer';
import userApi from "../api/userApi.js";
import CommentSection from "./CommentSection.vue";
import likeApi from "../api/likeRecoreApi.js";
import {useUserStore} from "../stores/userStore.js";
import VideoFavoitesApi from "../api/VideoFavoitesApi.js";
import {ElMessage} from "element-plus";


const userSrore = useUserStore();

// 定义一个ref来存储DPlayer实例
const dplayerContainer = ref(null);
const dplayerInstance = ref(null);
const userInfo = ref(null);


// 头像URL
const circleUrl = ref('https://bugugu.oss-cn-beijing.aliyuncs.com/20241030/img/cover/1730266350013fdc3caa0ab14428986a78229f40806a6.jpg');

// 定义props
const props = defineProps({
  Video_information: {
    type: Object,
    required: true
  }
});

// 使用watch来监视Video_information的变化
watch(() => props.Video_information.videoFilePath, (newValue) => {
  if (dplayerInstance.value && newValue) {

    // 更新视频源
    dplayerInstance.value.switchVideo({
      url: newValue,
      pic: props.Video_information.coverImagePath || 'https://yibz-bugu.oss-cn-beijing.aliyuncs.com/20241220/images/e6e4f990ad1d4d75b4e32afb8821b8be.jpg',
    });
  }
});

// 按钮列表
const likeButton = ref(true)
const isComment = ref(false);
const favoriteButton = ref(true);
const buttons = ref([
  {label: computed(() => likeButton.value ? '点赞' : '已点赞'), action: 'like'},
  {label: '评论', action: 'comment'},
  {label: computed(() => favoriteButton.value ? '收藏' : '已收藏'), action: 'favorite'},
  {label: '分享', action: 'share'}
]);


// 处理按钮点击事件
const handleButtonClick = (action) => {
  // 这里可以添加按钮点击后的逻辑
  if (action === 'comment') {
    isComment.value = !isComment.value;
  }
  if (action === 'like') {
    likeButton.value ? likeVideo(userSrore.user.data.userId, props.Video_information.videoId) : unlikeVideo(userSrore.user.data.userId, props.Video_information.videoId);


  }
  if (action === 'favorite') {

    favoriteButton.value ? favorites(userSrore.user.data.userId, props.Video_information.videoId) : unfavorites(userSrore.user.data.userId, props.Video_information.videoId);

  }
  if (action === 'share') {
    isComment.value = !isComment.value;
  }
};


onMounted(async () => {

  // 初始化DPlayer实例
  dplayerInstance.value = new DPlayer({
    container: dplayerContainer.value,
    screenshot: true,
    autoplay: true,
    muted: true,    // 静音
    video: {
      url: props.Video_information.videoFilePath || 'https://yibz-bugu.oss-cn-beijing.aliyuncs.com/videos/170bda0c-5fdc-4009-8af1-e2f287eda253.mp4',
      pic: props.Video_information.coverImagePath || 'https://yibz-bugu.oss-cn-beijing.aliyuncs.com/20241220/images/e6e4f990ad1d4d75b4e32afb8821b8be.jpg',
      // url: 'https://yibz-bugu.oss-cn-beijing.aliyuncs.com/videos/170bda0c-5fdc-4009-8af1-e2f287eda253.mp4',
      // pic: 'https://yibz-bugu.oss-cn-beijing.aliyuncs.com/20241220/images/e6e4f990ad1d4d75b4e32afb8821b8be.jpg',
    },
    danmaku: {
      user: props.Video_information.nickname || '布谷',
      id: props.Video_information.videoId || '1', // 使用视频的ID
      // id: '1', // 使用视频的ID
      api: 'http://localhost:1207/', // 后端获取弹幕列表的接口路径
    }
  });

  userInfo.value = await userApi.getUserInfo({userId: props.Video_information.creatorId})


  await isUserLikedVideo(userSrore.user.data.userId, props.Video_information.videoId)
  await isUserfavoriteVideo(props.Video_information.videoId)
});

const likeVideo = async (userId, videoId) => {

  try {
    const rsp = await likeApi.likeVideo({
      userId: userId,
      videoId: videoId
    })
    if (rsp.code === 200) {
      likeButton.value = false
      ElMessage.success("点赞成功")
      return
    }
    ElMessage.error("点赞失败")

  } catch (e) {

    // ElMessage.error('未知错误')
  }
}
const unlikeVideo = async (userId, videoId) => {
  try {
    const rsp = await likeApi.unlikeVideo({
      userId: userId,
      videoId: videoId
    })
    if (rsp.code === 200) {
      likeButton.value = true
      ElMessage.success("取消点赞成功")
      return
    }
    ElMessage.error("取消点赞失败")

  } catch (e) {

    ElMessage.error('未知错误')
  }
}
const isUserLikedVideo = async (userId, videoId) => {
  try {
    const rsp = await likeApi.isUserLikedVideo({
      userId: userId,
      videoId: videoId
    })
    // console.log(rsp)
    likeButton.value = !rsp.data;
  } catch (e) {

    // ElMessage.error('未知错误')
  }
}
const favorites = async (userId, videoId) => {
  try {
    const rsp = await VideoFavoitesApi.addFavorite({
      userId: userId,
      videoId: videoId
    })
    if (rsp.code === 200) {
      favoriteButton.value = false
      ElMessage.success("收藏成功")
    }


  } catch (e) {

    // ElMessage.error('未知错误')
  }
}
const unfavorites = async (userId, videoId) => {
  try {
    const rsp = await VideoFavoitesApi.removeFavorite({
      userId: userId,
      videoId: videoId
    })
    if (rsp.code === 200) {
      favoriteButton.value = true
      ElMessage.success("取消收藏成功")
      return
    }


  } catch (e) {

    // ElMessage.error('未知错误')
  }
}
const isUserfavoriteVideo = async (videoId) => {
  try {
    const rsp = await VideoFavoitesApi.isVideoFavorited({
      userId: userSrore.user.data.userId,
      videoId: videoId
    })

    favoriteButton.value = !rsp.data;

  } catch (e) {

    // ElMessage.error('未知错误')
  }
}


// 暴露方法给父组件
const play = () => {
  if (dplayerInstance.value) {
    dplayerInstance.value.play();

  }
};
const pause = () => {
  if (dplayerInstance.value) {
    dplayerInstance.value.pause();

  }
};
const onComment = () => {
  isComment.value = false;
};

defineExpose({play, pause, onComment});

// 在组件卸载时销毁DPlayer实例
onBeforeUnmount(() => {
  if (dplayerInstance.value) {
    dplayerInstance.value.destroy();
  }
});
</script>

<style scoped>
@import url('https://cdn.jsdelivr.net/npm/dplayer/dist/DPlayer.min.css');

.nav {
  max-height: 100%;
  max-width: 100%;
  height: 90vh;
  border-radius: 10px;
  position: relative;
}

.vedio {
  max-height: 100%;
  max-width: 100%;
  height: 100vh;
  border-radius: 10px;
}

.child {
  margin-top: 20px;
  margin-right: 20px;
  margin-bottom: 10px;
  margin-left: 20px;
}

/* 优化按钮布局 */
.hudong {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding-right: 10px;
}
</style>
