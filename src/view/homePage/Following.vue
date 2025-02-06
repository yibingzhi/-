<template>

  <!--  关注页面-->
  <el-row :gutter="0" style="height: 90vh;">

    <el-col :span="4">
      <el-scrollbar height="90vh">
        <el-menu>
          <el-menu-item v-for="i in userList">
            <el-avatar :size="50" :src="i.avatarUrl"/>
            <el-link :href="'/User/' + i.userId" class="mx-1" style="margin-top: 1px;">
              {{ i.nickname }}
            </el-link>
          </el-menu-item>
        </el-menu>
      </el-scrollbar>
    </el-col>

    <el-col :span="20" style="height: 98vh;">
      <el-scrollbar height="90vh">
        <!--        <MediaList></MediaList>-->
        <Recommended></Recommended>
      </el-scrollbar>
    </el-col>
  </el-row>

</template>
<script lang="ts" setup>

import Recommended from "./Recommended.vue";
import {onMounted, ref} from "vue";
import FollowApi from "../../api/FollowApi"
import {useUserStore} from "../../stores/userStore";

const circleUrl = ref('http://117.72.100.74:8080/index.php?action=file&file=%E5%A4%B4%E5%83%8F%2F%E7%94%B7%E5%A4%B4%2Fphoto_2024-11-26_20-10-33.jpg')
const userList = ref()
onMounted(async () => {
  try {
    const res = await FollowApi.getUserFollowings({userId: useUserStore().user.data.userId});
    userList.value = res.data
    console.log(userList.value)
    console.log()
  } catch (error) {
  }


})


</script>

<style scoped>
Recommended {
  margin-top: 10px;
}


</style>