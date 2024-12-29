<template>
  <!--  个人信息组件-->
  <el-row :align="'middle'" :gutter="20" :justify="'center'" style="height: 20vh;">
    <el-col :span="4" style="">
      <el-avatar :size="100" :src=" user.avatarUrl  || circleUrl"/>
    </el-col>
    <el-col :span="12" style="">
      <h3>{{ user.nickname }}</h3>
      <div>
        <span>关注：{{ guanzhushu }}</span>
        <el-divider direction="vertical"/>
        <span>粉丝：{{ fensishu }}</span>
        <el-divider border-style="dashed" direction="vertical"/>
      </div>
      <div>
        <span>IP属地 北京&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span>
          <el-tag type="primary">男 22岁s</el-tag>
          <el-tag type="success">山西·临汾</el-tag>
          <el-tag type="info">燕京理工学院</el-tag></span>
      </div>
      <el-text>{{ user.description }}</el-text>

    </el-col>
    <el-col :push="2" :span="4">
      <div v-if="!(userStore.user.data.userId ===user.userId)" style="margin-top: 10vh">
        <el-button plain type="primary"
                   @click="guanzhu ? followUser(route.params.userId) : unfollowUser(route.params.userId)  ">
          {{ guanzhu ? '关注' : '已关注' }}
        </el-button>
        <el-button plain type="primary">私信</el-button>
      </div>
      <div v-if="(userStore.user.data.userId ===user.userId)" style="margin-top: 10vh">
        <el-button plain type="primary"
                   @click="">
          编辑个人资料
        </el-button>
      </div>
    </el-col>
    <el-divider/>
  </el-row>
  <el-row>

    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="作品" name="first" style="display:flex;">
        <MediaList :VideoList="VideoList"></MediaList>
      </el-tab-pane>
      <el-tab-pane label="喜欢" name="second">

        <MediaList :VideoList="likeVideoList"></MediaList>
      </el-tab-pane>
      <el-tab-pane label="收藏" name="third">
        <MediaList :VideoList="favoritesVideoList"></MediaList>
      </el-tab-pane>
      <el-tab-pane label="观看历史" name="fourth">
        <MediaList></MediaList>
      </el-tab-pane>
    </el-tabs>
  </el-row>

</template>
<script lang="ts" setup>
import {onMounted, ref, watch} from "vue";
import MediaList from "./MediaList.vue";
import {useRoute} from "vue-router";
import {ElMessage, TabsPaneContext} from 'element-plus'

import userApi from "../api/userApi"
import videoApi from "../api/videoApi"
import likeApi from "../api/likeRecoreApi"
import favoitesApi from "../api/VideoFavoitesApi"
import {useUserStore} from "../stores/userStore";
import followApi from '../api/FollowApi'

const guanzhu = ref(false)

const userStore = useUserStore()
const user = ref({});
const route = useRoute()
const circleUrl = ref('http://117.72.100.74/index.php?action=file&file=%E5%A4%B4%E5%83%8F%2F%E7%94%B7%E5%A4%B4%2Fphoto_2024-11-26_20-10-33.jpg')
const activeName = ref('first')
const VideoList = ref<[]>([])
const likeVideoList = ref<[]>([])
const favoritesVideoList = ref<[]>([])
const guanzhushu = ref()
const fensishu = ref()
const updateuser = ref({
  ninckname: '',
  description: ''

})

onMounted(async () => {


  try {
    const res = await userApi.getUserInfo({userId: route.params.userId});
    user.value = res.data
    // console.log(user.value)
    // console.log(user.value.avatarUrl)
  } catch (error) {
  }

  try {
    const res = await videoApi.getVideoListByAuthorId({creatorId: route.params.userId});
    VideoList.value = res.data
    // console.log(VideoList.value)
  } catch (error) {
  }


  await isUserFollowed(route.params.userId)
  await getUserFollowers()
  await getUserFollowings()
});


const handleClick = (tab: TabsPaneContext, event: Event) => {

  if (tab.paneName == "first")
    console.log("1")

  if (tab.paneName == "second") {

    if (userStore.user.data.userId === user.userId) {
      likeVideo(userStore.user.data.userId)
    } else {
      likeVideo(route.params.userId)
    }

  }


  if (tab.paneName == "third")
    if (userStore.user.data.userId === user.userId) {
      favorites(userStore.user.data.userId)
    } else {
      favorites(route.params.userId)
    }
  if (tab.paneName == "fourth")
    console.log("4===========================")
}
const likeVideo = async (userId: number) => {
  try {
    const rsp = await likeApi.getLikedVideosByUserId({
      userId: userId,
    })


    likeVideoList.value = rsp.data
    console.log(rsp)
  } catch (e) {

  }
}
const favorites = async (userId: number) => {
  try {
    const rsp = await favoitesApi.getFavoritesByUser({
      userId: userId,
    })
    favoritesVideoList.value = rsp.data
    // console.log(rsp)
  } catch (e) {

  }
}
const followUser = async (followedId: any) => {

  try {
    const rsp = await followApi.followUser({
      followerId: userStore.user.data.userId,
      followedId: followedId
    })
    guanzhu.value = false;

    ElMessage.success('关注成功')
  } catch (e) {

  }


}
const unfollowUser = async (followedId: any) => {
  try {
    const rsp = await followApi.unfollowUser({
      followerId: userStore.user.data.userId,
      followedId: followedId
    })
    ElMessage.success('取消关注成功')
    guanzhu.value = true;
  } catch (e) {

  }


}
const isUserFollowed = async (followedId: any) => {
  try {
    const rsp = await followApi.isUserFollowed({
      followerId: userStore.user.data.userId,
      followedId: followedId
    })

    guanzhu.value = !rsp.data
  } catch (e) {

  }


}
//获取关注列表
const getUserFollowings = async () => {
  try {
    const rsp = await followApi.getUserFollowings({
      userId: route.params.userId
    })
    guanzhushu.value = rsp.data.length
    console.log(rsp)
  } catch (e) {

  }


}

//获取粉丝列表
const getUserFollowers = async () => {
  try {
    const rsp = await followApi.getUserFollowers({
      userId: route.params.userId
    })
    fensishu.value = rsp.data.length
    console.log(rsp)
  } catch (e) {

  }


}


watch(
    () => route.path + JSON.stringify(route.query),
    (newValue, oldValue) => {
      // 只有当路由路径或查询参数发生变化时才刷新页面
      if (newValue !== oldValue) {
        location.reload()
      }
    }
)

</script>

<style scoped>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>