<template>

  <!--  导航栏组件-->
  <el-menu
      :default-active="activeIndex"
      :ellipsis="false"
      class="el-menu-demo"
      mode="horizontal"
      router
      style="align-items: center"
      @select="handleSelect"
  >
    <el-menu-item index="/">
      <img
          alt="Element logo"
          src="../../assets/images/布谷布谷.png"
          style="width: 100px"
      />
    </el-menu-item>


    <SearchBar style="left: -8%"></SearchBar>
    <div style="width: 30vh">
      <div v-show=" userStore.isLogin">
        <el-popover
            :disabled="false"
            :width="200"
            content="this is content, this is content, this is content"
            placement="top-start"
            title="Title"
            trigger="hover"
        >
          <template #reference>
            <el-button class="m-2">通知</el-button>
          </template>
        </el-popover>


        <el-popover

            :width="200"
            content="this is content, this is content, this is content"
            placement="top-start"
            title="Title"
            trigger="hover"
        >
          <template #reference>
            <el-button class="m-2">私信</el-button>
          </template>
        </el-popover>


        <el-popover

            :width="200"
            content="this is content, this is content, this is content"
            placement="top-start"
            title="Title"
            trigger="hover"
        >
          <template #reference>
            <el-button class="m-2">投稿</el-button>
          </template>
        </el-popover>
      </div>
    </div>

    <el-button v-if="!userStore.isLogin" plain @click="centerDialogVisible = true">
      请登录
    </el-button>

    <el-dialog
        v-model="centerDialogVisible"
        align-center
        title="Warning"
        width="500"
    >
      <el-input v-model="username" placeholder="请输入用户名" style="width: 240px"/>
      <el-input v-model="password" placeholder="请输入密码" style="width: 240px"/>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="centerDialogVisible = false">关闭</el-button>
          <el-button type="primary" @click="userLogin()">
            登录
          </el-button>
        </div>
      </template>
    </el-dialog>

    <el-popover
        :width="300"
        placement="top-start"
        trigger="hover"
    >
      <template #reference>

        <el-avatar v-if=" userStore.isLogin" :size="50" :src="circleUrl" style="margin: 0 3vh"/>
      </template>
      <template #default>
        <el-button class="m-2">个人中心</el-button>
        <el-button class="m-2">个人中心</el-button>
        <el-button class="m-2">个人中心</el-button>
        <el-button class="m-2">个人中心</el-button>
        <el-button class="m-2">个人中心</el-button>
        111111111111111111111111
      </template>
    </el-popover>

  </el-menu>

</template>

<script lang="ts" setup>
import {ref} from 'vue'
import SearchBar from "./SearchBar.vue";
import userApi from '../../api/userApi';
import {ElMessage} from "element-plus";
import {useUserStore} from "../../stores/userStore";


const centerDialogVisible = ref(false)
const circleUrl = ref('http://117.72.100.74/index.php?action=file&file=%E5%A4%B4%E5%83%8F%2F%E7%94%B7%E5%A4%B4%2Fphoto_2024-11-26_20-10-33.jpg')
const activeIndex = ref('1')
// const isLogin = ref(true)
// const isLogin = ref(false)
const username = ref("巴旦木")
const password = ref("123456")


const userStore = useUserStore();
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

async function userLogin() {
  try {
    // 发送登录请求
    const res = await userApi.login({
      nickname: username.value,
      password: password.value
    });
    console.log(res)
    userStore.user = res

    console.log("----------------------")
    console.log(userStore.user)
    console.log(userStore.user.data.userId)
    console.log("----------------------")
    // 如果登录成功
    if (userStore.user.code === 200) {
      ElMessage({
        message: '登录成功',
        type: 'success',
      })
      userStore.login();
      console.log(userStore.user.isLogin)
      centerDialogVisible.value = false

      // 这里可以添加跳转到仪表板的逻辑
    } else {
      // 登录失败
      ElMessage({
        message: '登录失败',
        type: 'error',
      })
      centerDialogVisible.value = false
    }
  } catch (error) {
    // 捕获任何可能的错误
    console.error('登录时发生错误:', error);
    ElMessage({
      message: '登录失败',
      type: 'error',
    })
  }
}

</script>

<style>
.el-menu--horizontal > .el-menu-item:nth-child(1) {
  margin-right: auto;
}

</style>