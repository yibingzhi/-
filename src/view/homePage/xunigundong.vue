<template>
  <div class="scroll-container">
    <RecycleScroller
        v-slot="{ item, index }"
        :itemSize="300"
        :items="videoItems"
        class="scroller"
        key-field="id"
        @scroll.native="handleScroll"
    >
      <div :key="item.id" class="video-container">
        <!-- 上一个视频按钮 -->
        <el-button
            :disabled="index === 0"
            class="scroll-button prev"
            type="primary"
            @click="scrollToPrevious(index)"
        >
          上一个视频
        </el-button>
        <!-- 下一个视频按钮 -->
        <el-button
            :disabled="index === videoItems.length - 1"
            class="scroll-button next"
            type="primary"
            @click="scrollToNext(index)"
        >
          下一个视频
        </el-button>
        <!-- 视频播放器 -->
        <VideoPlayer
            :isPlaying="currentIndex === index"
            :videoId="item.id"
            @loaded="onVideoLoaded(item.id)"
            @pause="onVideoPause(item.id)"
            @play="onVideoPlay(item.id)"
        />
      </div>
    </RecycleScroller>
  </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue';
import VideoPlayer from '../../components/VideoPlayer.vue';

// 定义视频数量
const videoCount = ref(10);
// 视频数据数组
const videoItems = ref([...Array(videoCount.value).keys()].map(i => ({id: i + 1, index: i})));
// 当前播放的视频索引
const currentIndex = ref(0);
// 防止重复滚动的标志
const isScrolling = ref(false);

/**
 * 滚动到下一个视频的方法
 * - 检查是否正在滚动或已到最后一个视频
 * - 增加当前视频索引并滚动到新的视频位置
 * - 暂停上一个视频并播放下一个视频
 */
const scrollToNext = (index: number) => {
  if (isScrolling.value || index >= videoItems.value.length - 1) return;
  isScrolling.value = true;

  currentIndex.value = index + 1;

  pauseVideo(index + 1); // 暂停上一个视频
  playVideo(currentIndex.value + 1); // 播放下一个视频

  setTimeout(() => {
    isScrolling.value = false; // 结束滚动状态
  }, 500); // 500ms 后允许再次滚动
};

/**
 * 滚动到上一个视频的方法
 * - 检查是否正在滚动或已到第一个视频
 * - 减少当前视频索引并滚动到新的视频位置
 * - 暂停下一个视频并播放上一个视频
 */
const scrollToPrevious = (index: number) => {
  if (isScrolling.value || index <= 0) return;
  isScrolling.value = true;

  currentIndex.value = index - 1;

  pauseVideo(index + 1); // 暂停下一个视频
  playVideo(currentIndex.value + 1); // 播放上一个视频

  setTimeout(() => {
    isScrolling.value = false; // 结束滚动状态
  }, 500); // 500ms 后允许再次滚动
};

/**
 * 处理鼠标滚轮事件
 * - 根据滚轮方向调用相应的滚动方法
 */
const handleScroll = (event: WheelEvent) => {
  if (isScrolling.value) return;
  if (event.deltaY > 0) {
    scrollToNext(currentIndex.value); // 向下滚动
  } else {
    scrollToPrevious(currentIndex.value); // 向上滚动
  }
};

// 当视频加载完成时的回调
const onVideoLoaded = (id: number) => {
  console.log(`视频 ${id} 加载完成`);
};

// 当视频开始播放时的回调
const onVideoPlay = (id: number) => {
  console.log(`视频 ${id} 开始播放`);
};

// 当视频暂停时的回调
const onVideoPause = (id: number) => {
  console.log(`视频 ${id} 暂停播放`);
};

/**
 * 播放指定ID的视频
 * @param id - 视频的ID
 */
const playVideo = (id: number) => {
  const videoPlayer = document.querySelector(`#video-${id} video`);
  if (videoPlayer) {
    (videoPlayer as HTMLVideoElement).play();
  }
};

/**
 * 暂停指定ID的视频
 * @param id - 视频的ID
 */
const pauseVideo = (id: number) => {
  const videoPlayer = document.querySelector(`#video-${id} video`);
  if (videoPlayer) {
    (videoPlayer as HTMLVideoElement).pause();
  }
};
</script>

<style scoped>
.scroll-container {
  height: 90vh;
  position: relative;
}

.scroller {
  height: 100%; /* 使 RecycleScroller 充满整个容器 */
  overflow-y: auto; /* 允许垂直滚动 */
  overflow-x: hidden; /* 隐藏水平滚动 */
}

.video-container {
  position: relative;
  margin-top: 10px;
  border-radius: 10px;
  height: 300px; /* 与 RecycleScroller 的 itemSize 保持一致 */
  overflow: hidden; /* 防止视频溢出 */
}

.scroll-button {
  position: absolute;
  top: 10px;
  z-index: 1;
  opacity: 0.8; /* 按钮半透明，使其不干扰视频播放 */
}

.scroll-button.prev {
  left: 10px;
}

.scroll-button.next {
  right: 10px;
}

/* 确保 VideoPlayer 组件不超出容器 */
.video-player {
  width: 100%;
  height: 100%;
}
</style>
