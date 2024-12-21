<template>

  <!--  侧边栏组件-->
  <!--  <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">-->
  <!--    <el-radio-button :value="false">expand</el-radio-button>-->
  <!--    <el-radio-button :value="true">collapse</el-radio-button>-->
  <!--  </el-radio-group>-->
  <el-menu
      :collapse="isCollapse"
      background-color=""
      class="el-menu-vertical-demo"
      default-active="2"
      router
      @close="handleClose"
      @open="handleOpen"
  >
    <el-menu-item index="/Featured">
      <el-icon>
        <icon-menu/>
      </el-icon>
      <template #title>精选</template>
    </el-menu-item>
    <el-menu-item index="/">
      <el-icon>
        <icon-menu/>
      </el-icon>
      <template #title>推荐</template>
    </el-menu-item>


    <el-menu-item :disabled="!userStore.isLogin" index="/Following">
      <el-icon>
        <icon-menu/>
      </el-icon>
      <template #title>关注</template>
    </el-menu-item>
    <el-menu-item :disabled="!userStore.isLogin" index="/Friends">
      <el-icon>
        <icon-menu/>
      </el-icon>
      <template #title>朋友</template>
    </el-menu-item>
    <el-menu-item :disabled="!userStore.isLogin"
                  :index="`${userProfilePath }`">
      <el-icon>
        <icon-menu/>
      </el-icon>
      <template #title>我的</template>
    </el-menu-item>
    <el-menu-item index="/AI">
      <el-icon>
        <icon-menu/>
      </el-icon>
      <template #title>AI</template>
    </el-menu-item>


    <el-divider content-position="right"></el-divider>


    <el-menu-item index="/知识">
      <el-icon>
        <icon-menu/>
      </el-icon>
      <template #title>知识</template>
    </el-menu-item>
    <el-menu-item index="/游戏">
      <el-icon>
        <icon-menu/>
      </el-icon>
      <template #title>游戏</template>
    </el-menu-item>

    <el-menu-item index="/二次元">
      <el-icon>
        <icon-menu/>
      </el-icon>
      <template #title>二次元</template>
    </el-menu-item>
    <el-menu-item index="/音乐">


      <el-icon>
        <icon-menu/>
      </el-icon>
      <template #title>音乐</template>
    </el-menu-item>
    <el-menu-item index="/美食">
      <el-icon>
        <icon-menu/>
      </el-icon>
      <template #title>美食</template>
    </el-menu-item>


  </el-menu>
</template>

<script lang="ts" setup>
import {Menu as IconMenu,} from '@element-plus/icons-vue'
import {useUserStore} from '../../stores/userStore'
import {computed} from "vue";


const userStore = useUserStore();

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}


const userProfilePath = computed(() => {
  return userStore.isLogin && userStore.user?.data?.userId
      ? `/User/${userStore.user.data.userId}`
      : '#'
})
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 150px;
  min-height: 400px;
}


</style>