<template>
  <!-- u-chat 组件用于显示聊天界面 -->
  <u-chat :config="config" style="width: 500px" @submit="submit" @load-more="loadMore">
    <!-- 自定义头部插槽 -->
    <template #header>
      <div style="height: 40px; display: flex; align-items: center;">
        <div>聊天</div>
      </div>
    </template>
  </u-chat>
</template>

<script lang="ts" setup>
import {onMounted, reactive, ref} from 'vue';
import {ChatApi, ChatConfigApi, usePage} from 'undraw-ui';
import emoji from '../assets/emoji';
import {useUserStore} from "../stores/userStore";


const userStore = useUserStore();

// 定义消息的接口，描述消息的结构
interface Message {
  uid: string;
  content: string;
  userId: string;
}

// WebSocket 连接对象
const socket = ref<WebSocket | null>(null);

// 初始化聊天配置
const config = reactive<ChatConfigApi>({
  user: {
    // 当前用户信息
    id: 1,
    username: userStore.user.data.nickname,
    avatar: 'https://static.juzicon.com/images/image-180327173755-IELJ.jpg'
  },
  // 聊天数据数组
  data: [],
  // 表情包数据
  emoji: emoji // 可选
});

// 模拟聊天数据
let data = [
  // ... 您的初始数据
];

// 生成随机延迟的函数，模拟网络延迟
function getRandom(min: number, max: number) {
  return Math.round(Math.random() * (max - min) + min);
}

// 用于分页加载更多数据的变量
let n = 0;

// 加载更多消息的函数
function loadMore(finish: Function) {
  if (n <= Math.ceil(data.length / 4)) {
    // 模拟加载更多数据的延迟
    setTimeout(() => {
      // 使用 usePage 函数进行分页
      finish(usePage(++n, 4, data));
    }, getRandom(200, 500));
  } else {
    // 没有更多消息时，传入空数组
    finish([]);
  }
}

// 在组件挂载时初始化WebSocket连接
onMounted(() => {
  connectWebSocket();
});

// 建立WebSocket连接的函数
function connectWebSocket() {
  // 获取WebSocket连接
  socket.value = new WebSocket('ws://localhost:8080/channel/echo?userId=6');

  // 连接打开时触发
  socket.value.onopen = () => {
    console.log('WebSocket 连接已打开');
  };

  // 接收到消息时触发
  socket.value.onmessage = (event: MessageEvent) => {
    // 解析接收到的消息
    const message = JSON.parse(event.data) as Message;
    // 构造聊天消息对象
    const chat: ChatApi = {
      content: message.content,
      uid: parseInt(message.uid),
      user: {
        // 根据消息的uid动态设置用户名和头像
        username: `用户${message.uid}`,
        avatar: message.uid === '6' ? 'https://static.juzicon.com/images/image-180327173755-IELJ.jpg' : 'https://static.juzicon.com/images/image-231107185110-DFSX.png'
      },
      createTime: new Date().toLocaleString()
    };
    // 将消息添加到聊天数据中
    config.data.push(chat);
  };

  // 连接关闭时触发
  socket.value.onclose = () => {
    console.log('WebSocket 连接已关闭');
  };

  // 发生错误时触发
  socket.value.onerror = (error: Event) => {
    console.log('WebSocket 错误:', error);
  };
}

// 提交消息的函数
function submit(val: string, finish: Function) {
  // 检查WebSocket连接是否存在且消息内容不为空
  if (socket.value && val.trim() !== '') {
    // 构造发送的消息对象
    const message: Message = {
      uid: '6',
      content: val,
      userId: '5'
    };
    // 通过WebSocket发送消息
    socket.value.send(JSON.stringify(message));

    // 本地添加发送的消息
    const chat: ChatApi = {
      content: val,
      uid: 1, // 这里修正为与发送消息的uid一致
      user: {
        username: userStore.user.data.nickname,
        avatar: userStore.user.data.avatarUrl
      },
      createTime: new Date().toLocaleString()
    };
    // 将消息添加到聊天数据中
    config.data.push(chat);
    // 调用finish函数，告知提交操作完成
    finish(chat);
  }
}
</script>

<!-- 样式部分 -->
<style lang="scss" scoped>
</style>