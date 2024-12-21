<template>
  <div class="chat-container">
    <div class="chat-header">聊天</div>
    <div class="chat-content">
      <div v-for="message in messages" :key="message.id" class="chat-message">
        <div class="user-info">
          <img :src="message.user.avatar" alt="avatar" class="avatar"/>
          <span class="username">{{ message.user.username }}</span>
        </div>
        <div class="message-content">
          <p>{{ message.content }}</p>
          <span class="timestamp">{{ message.createTime }}</span>
        </div>
      </div>
    </div>
    <div class="chat-input">
      <el-input
          v-model="newMessage"
          class="input-field"
          placeholder="请输入内容"
          @keyup.enter="sendMessage"
      />
      <el-button type="primary" @click="sendMessage">发送</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newMessage: '',
      messages: [
        {
          id: 1,
          content: '你好!',
          uid: 2,
          user: {
            username: '用户1',
            avatar: 'https://via.placeholder.com/40',
          },
          createTime: '06-29 09:10',
        },
        // 添加更多消息对象...
      ],
    };
  },
  methods: {
    sendMessage() {
      if (this.newMessage.trim() !== '') {
        const newMsg = {
          id: Date.now(),
          content: this.newMessage,
          uid: 1,
          user: {
            username: '用户1',
            avatar: 'https://via.placeholder.com/40',
          },
          createTime: new Date().toLocaleString(),
        };
        this.messages.push(newMsg);
        this.newMessage = '';
      }
    },
  },
};
</script>

<style scoped>
.chat-container {
  width: 400px;
  border: 1px solid #ddd;
  display: flex;
  flex-direction: column;
}

.chat-header {
  background-color: #f5f5f5;
  padding: 10px;
  font-weight: bold;
}

.chat-content {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
}

.chat-message {
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
}

.user-info {
  display: flex;
  align-items: center;
  margin-right: 10px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.username {
  font-weight: bold;
}

.message-content {
  background-color: #e0f7fa;
  padding: 10px;
  border-radius: 10px;
  position: relative;
}

.timestamp {
  font-size: 0.8em;
  color: #888;
  margin-top: 5px;
}

.chat-input {
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #f5f5f5;
}

.input-field {
  flex: 1;
  margin-right: 10px;
}
</style>
