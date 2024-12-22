<template>
  <!-- 使用 el-scrollbar 组件创建一个带滚动条的容器，高度为 90vh，并监听滚轮事件 -->
  <el-scrollbar height="90vh" @wheel="handleScroll">
    <!-- 上一个视频按钮，点击时调用 scrollToPrevious 方法 -->
    <el-button
        :disabled="currentIndex === 0"
        class="scroll-button prev"
        type="primary"
        @click="scrollToPrevious"
    >
      上一个视频
    </el-button>
    <!-- 下一个视频按钮，点击时调用 scrollToNext 方法 -->
    <el-button
        :disabled="currentIndex === Video_informations.length - 1"
        class="scroll-button next"
        type="primary"
        @click="scrollToNext"
    >
      下一个视频
    </el-button>

    <!-- 使用 v-for 渲染多个 VideoPlayer 组件 -->
    <div
        v-for="(video, index) in Video_informations"
        :key="video.id || index"
        ref="videoContainers"
        class="video-container"
    >
      <!-- 传递视频播放状态和ID，监听视频加载、暂停和播放事件 -->
      <VideoPlayer
          :Video_information="video"
          :isPlaying="currentIndex === index"
          :videoId="video.id"
          @loaded="onVideoLoaded(index)"
          @pause="onVideoPause(index)"
          @play="onVideoPlay(index)"
      />
    </div>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import {nextTick, onMounted, ref, watch} from 'vue';
import VideoPlayer from '../../components/VideoPlayer.vue';
import api from '../../api';

// 存储视频信息
const Video_informations = ref([]);
// 存储视频容器的引用
const videoContainers = ref<HTMLElement[]>([]);
// 当前视频的索引
const currentIndex = ref(0);
// 防止重复滚动的标志
const isScrolling = ref(false);

// 获取视频列表
async function getVideo() {
  try {
    const response = await api.videoApi.getAuditedVideos();
    Video_informations.value = response.data;
    console.log(response);
  } catch (error) {
  }
}

// 初始化时获取视频列表
onMounted(() => {
  getVideo().then(() => {
    nextTick(() => {
      updateVideoContainers();
    });
  });
});

// 监听Video_informations的变化
watch(Video_informations, () => {
  nextTick(() => {
    updateVideoContainers();
  });
});

function updateVideoContainers() {
  videoContainers.value = Array.from(document.querySelectorAll('.video-container'));
}

/**
 * 滚动到下一个视频的方法
 * - 检查是否正在滚动或已到最后一个视频
 * - 增加当前视频索引并滚动到新的视频位置
 * - 暂停上一个视频并播放下一个视频
 */
const scrollToNext = async () => {
  if (isScrolling.value || currentIndex.value >= Video_informations.value.length - 1) return;
  isScrolling.value = true;

  const previousIndex = currentIndex.value;
  currentIndex.value++;

  try {
    await nextTick();
    if (videoContainers.value[currentIndex.value]) {
      videoContainers.value[currentIndex.value].scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  } catch (error) {
    console.error('Error scrolling to next video:', error);
  } finally {
    setTimeout(() => {
      isScrolling.value = false;
    }, 500);
  }

  pauseVideo(previousIndex);
  playVideo(currentIndex.value);
};

/**
 * 滚动到上一个视频的方法
 * - 检查是否正在滚动或已到第一个视频
 * - 减少当前视频索引并滚动到新的视频位置
 * - 暂停下一个视频并播放上一个视频
 */
const scrollToPrevious = async () => {
  if (isScrolling.value || currentIndex.value <= 0) return;
  isScrolling.value = true;

  const nextIndex = currentIndex.value;
  currentIndex.value--;

  try {
    await nextTick();
    if (videoContainers.value[currentIndex.value]) {
      videoContainers.value[currentIndex.value].scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  } catch (error) {
    console.error('Error scrolling to previous video:', error);
  } finally {
    setTimeout(() => {
      isScrolling.value = false;
    }, 500);
  }

  pauseVideo(nextIndex);
  playVideo(currentIndex.value);
};

/**
 * 处理鼠标滚轮事件
 * - 阻止默认的滚动行为
 * - 根据滚轮方向调用相应的滚动方法
 */
const handleScroll = (event: WheelEvent) => {
  event.preventDefault();
  if (isScrolling.value) return;
  if (event.deltaY > 0) {
    scrollToNext(); // 向下滚动
  } else {
    scrollToPrevious(); // 向上滚动
  }
};

// 当视频加载完成时的回调
const onVideoLoaded = (index: number) => {
  console.log(`视频 ${index} 加载完成`);
};

// 当视频开始播放时的回调
const onVideoPlay = (index: number) => {
  console.log(`视频 ${index} 开始播放`);
};

// 当视频暂停时的回调
const onVideoPause = (index: number) => {
  console.log(`视频 ${index} 暂停播放`);
};

/**
 * 播放指定索引的视频
 * @param index - 视频的索引
 */
const playVideo = (index: number) => {
  if (videoContainers.value[index]) {
    const videoPlayer = videoContainers.value[index].querySelector('video');
    if (videoPlayer) {
      try {
        videoPlayer.play();
      } catch (error) {
        console.error(`Failed to play video at index ${index}:`, error);
      }
    }
  }
};

/**
 * 暂停指定索引的视频
 * @param index - 视频的索引
 */
const pauseVideo = (index: number) => {
  if (videoContainers.value[index]) {
    const videoPlayer = videoContainers.value[index].querySelector('video');
    if (videoPlayer) {
      try {
        videoPlayer.pause();
      } catch (error) {
        console.error(`Failed to pause video at index ${index}:`, error);
      }
    }
  }
};
</script>

<style scoped>
/* 设置每个视频容器的外边距和圆角 */
.video-container {
  margin-top: 10px;
  border-radius: 10px;
}

/* 定义滚动按钮的样式 */
.scroll-button {
  position: absolute;
  top: 10px;
  cursor: pointer;
  z-index: 1;
}

.scroll-button.prev {
  left: 10px;
}

.scroll-button.next {
  right: 10px;
}
</style>
