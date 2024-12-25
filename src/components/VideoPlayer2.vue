<template>
  <!-- 视频组件 -->
  <el-row>
    <el-col :sapn="5">
      <el-row class="nav">
        <el-col>
          <div ref="dplayerContainer" class="vedio"></div>
          <el-row class="hudong" style="position: absolute; z-index: 1; top: 40vh; right: 2vh; display: block">
            <!--            <el-avatar :size="50" :src="userInfo ? userInfo.data.avatarUrl : circleUrl" class="child"-->
            <!--                       @click="() => {}"/>-->
            <!--            <div v-for="(button, index) in buttons" :key="index" class="child">-->
            <!--              <el-button type="primary" @click="handleButtonClick(button.action)">{{ button.label }}</el-button>-->
            <!--            </div>-->
          </el-row>
        </el-col>
        <el-col></el-col>
      </el-row>
    </el-col>


  </el-row>
</template>

<script setup>
import {onBeforeUnmount, onMounted, ref, watch} from 'vue';
import DPlayer from 'dplayer';
import userApi from "../api/userApi.js";

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
const buttons = [
  {label: '点赞', action: 'like'},
  {label: '评论', action: 'comment'},
  {label: '收藏', action: 'favorite'},
  {label: '分享', action: 'share'}
];


// 处理按钮点击事件
const handleButtonClick = (action) => {
  // 这里可以添加按钮点击后的逻辑
  console.log(action);
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

  // console.log(props.Video_information.videoId)
  // console.log(props.Video_information)
  // console.log(props.Video_information.creatorId)
  userInfo.value = await userApi.getUserInfo({userId: props.Video_information.creatorId})
});

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
defineExpose({play, pause});

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
  background-color: pink;
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
