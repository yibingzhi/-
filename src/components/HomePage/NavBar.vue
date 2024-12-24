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
            <el-button class="m-1">通知</el-button>
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
            <el-button class="m-1">私信</el-button>
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
            <el-button class="m-1">投稿</el-button>
          </template>
        </el-popover>
      </div>
    </div>

    <el-button v-if="!userStore.isLogin" plain @click="centerDialogVisible = true">
      请登录
    </el-button>


    <el-popover
        :width="150"
        placement="top-start"
        trigger="hover"

    >
      <template #reference>

        <el-avatar v-if="userStore.isLogin" :size="50" :src=" userStore?.user.data.avatarUrl || circleUrl"
                   style="margin: 0 3vh"/>
      </template>
      <template #default>
        <el-row :justify="'center'" style="background-color: pink">
          <el-col span="20" style="">
            <el-button class="m-2" @click="$router.push(`/user/${userStore.user.data.userId}`)">个人中心</el-button>
            <el-button class="m-2">我的喜欢</el-button>
            <el-button class="m-2">我的收藏</el-button>
            <el-button class="m-2">历史记录</el-button>
            <el-button class="m-2" @click="logout()">退出登录</el-button>
          </el-col>
        </el-row>
      </template>
    </el-popover>

  </el-menu>
  <el-dialog
      v-model="centerDialogVisible2"
      align-center
      title="登录"
      width="500"
  >

    <el-row>
      <el-col style="margin: 0.5vh">
        <span>用户名</span>
        <el-input v-model="username" placeholder="请输入用户名" style="width: 200px;margin-left: 5vh"/>
      </el-col>
      <el-col style="margin: 0.5vh"><span>邮箱</span>
        <el-input v-model="email" placeholder="请输入邮箱" style="width: 200px;margin-left: 7vh"/>
      </el-col>
      <el-col style="margin: 0.5vh"><span>邮箱验证码</span>
        <el-input v-model="emailCode" placeholder="请输入邮箱验证码" style="width: 200px;margin-left: 2vh"/>
        <el-button style="margin-left: 2vh" @click="getemailCode()">获取验证码</el-button>
      </el-col>

      <el-col style="margin: 0.5vh"><span>密码</span>
        <el-input v-model="password" placeholder="请输入密码" style="width: 200px;margin-left: 7vh"/>
      </el-col>

    </el-row>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="centerDialogVisible2 = false">关闭</el-button>
        <el-button type="primary" @click="userRegister()">
          注册
        </el-button>
      </div>
    </template>
  </el-dialog>


  <el-dialog
      v-model="centerDialogVisible"
      align-center
      title="登录"
      width="500"
  >
    <el-input v-model="username" placeholder="请输入用户名" style="width: 240px"/>
    <el-input v-model="password" placeholder="请输入密码" style="width: 240px"/>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="() => { centerDialogVisible = false; centerDialogVisible2 = true }">没有账号，去注册
        </el-button>

        <el-button @click="centerDialogVisible = false">关闭</el-button>
        <el-button type="primary" @click="userLogin()">
          登录
        </el-button>
      </div>
    </template>
  </el-dialog>

</template>

<script lang="ts" setup>
import {ref} from 'vue'
import SearchBar from "./SearchBar.vue";
import {ElMessage} from "element-plus"; // 假设你使用的是Element Plus组件库
import {useRouter} from 'vue-router';
import userApi from '../../api/userApi'; // 假设这是你的API模块的路径
import {useUserStore} from '../../stores/userStore'; // 假设你使用的是Pinia或Vuex

const router = useRouter();


const centerDialogVisible = ref(false)
const centerDialogVisible2 = ref(false)
const circleUrl = ref('http://117.72.100.74/index.php?action=file&file=%E5%A4%B4%E5%83%8F%2F%E7%94%B7%E5%A4%B4%2Fphoto_2024-11-26_20-10-33.jpg')
const activeIndex = ref('1')
const username = ref("巴旦木")
const password = ref("123456")
const email = ref("")
const emailCode = ref("")
const uuid = ref()


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
    userStore.login(res)
    // 如果登录成功
    if (userStore.user.code === 200) {
      ElMessage({
        message: '登录成功',
        type: 'success',
      })
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

async function userRegister() {
  try {
    const res = await userApi.register({
      nickname: username.value,
      email: email.value,
      password: password.value
    }, {
      uuid: uuid.value,
      code: emailCode.value
    });

    console.log(res);

    // 假设API返回的响应对象中包含了code字段
    if (res.code === 200) {
      ElMessage({
        message: '注册成功',
        type: 'success',
      });


      centerDialogVisible2.value = false
    } else {
      // 如果API返回的不是成功状态码，处理错误
      ElMessage({
        message: '注册失败，请检查输入信息',
        type: 'error',
      });
    }
  } catch (error) {
    console.error('注册失败:', error);
    ElMessage({
      message: '注册过程中发生错误，请稍后再试',
      type: 'error',
    });
  }
}


async function getemailCode() {

  console.log(email.value)

  try {
    const res = await userApi.getEmailCode({
      email: email.value // 确保email变量在这里被正确引用
    });

    console.log(res);

    // 假设API返回的响应对象中包含了code字段
    if (res.code === 200) {
      uuid.value = res.data
      console.log(uuid.value)
      ElMessage({
        message: '获取成功',
        type: 'success',
      });

      // 如果需要，这里可以更新用户状态
      // 假设API响应中包含一个emailCode字段
      if (res.data && res.data.emailCode) {
        // 更新用户状态中的验证码
        console.log('Email Code:', res.data.emailCode);
      }

      // 这里可以添加更多操作，比如：
      // - 开始计时器，限制用户在一定时间内不能再次请求验证码
      // - 启用验证码输入框
    } else {
      // 如果API返回的不是成功状态码，处理错误
      ElMessage({
        message: '获取验证码失败，请检查邮箱地址',
        type: 'error',
      });
    }
  } catch (error) {
    console.error('获取验证码失败:', error);
    ElMessage({
      message: '获取验证码过程中发生错误，请稍后再试',
      type: 'error',
    });
  }
}


function logout() {
  clearUserStore()
  // 重定向到登录页面
  router.push('/Featured');
  window.location.reload();
}


function clearUserStore() {
  userStore.logout(); // 调用 Pinia 的 $reset 方法来重置 store 的状态
}

</script>

<style>
.el-menu--horizontal > .el-menu-item:nth-child(1) {
  margin-right: auto;
}

.m-2 {
  width: 80%;
  margin: 1vh;
  height: 40px;

}

</style>