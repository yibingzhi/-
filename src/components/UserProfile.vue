<template>
  <!--  个人信息组件-->

  <el-row :align="'middle'" :gutter="20" :justify="'center'" style="height: 20vh;">
    <el-col :span="4" style="">
      <el-avatar :size="100" :src="circleUrl"/>
    </el-col>
    <el-col :span="12" style="">
      <h3>翌冰之</h3>
      <div>
        <span>关注：1000</span>
        <el-divider direction="vertical"/>
        <span>粉丝：100</span>
        <el-divider border-style="dashed" direction="vertical"/>
        <span>获赞：1000</span>
      </div>
      <div>
        <span>布谷号：Dzt0010 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span>IP属地 北京&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span>
          <el-tag type="primary">男 22岁</el-tag>
          <el-tag type="success">山西·临汾</el-tag>
          <el-tag type="info">燕京理工学院</el-tag></span>
      </div>
      <el-text>慵懒</el-text>

    </el-col>
    <el-col :push="2" :span="4">
      <div style="margin-top: 10vh">
        <el-button plain type="primary">关注</el-button>
        <el-button plain type="primary">私信</el-button>
      </div>
    </el-col>
    <el-divider/>
  </el-row>
  <el-row>

    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="作品" name="first" style="display:flex;">
        <MediaList></MediaList>
      </el-tab-pane>
      <el-tab-pane label="喜欢" name="second">

        <MediaList></MediaList>
      </el-tab-pane>
      <el-tab-pane label="收藏" name="third">
        <MediaList></MediaList>
      </el-tab-pane>
      <el-tab-pane label="观看历史" name="fourth">
        <MediaList></MediaList>
      </el-tab-pane>
    </el-tabs>
  </el-row>

</template>
<script lang="ts" setup>
import {onMounted, ref} from "vue";
import MediaList from "./MediaList.vue";
import {useRoute} from "vue-router";
import type {TabsPaneContext} from 'element-plus'

import userApi from "../api/userApi"


const user = ref();
const route = useRoute()

const circleUrl = ref('http://117.72.100.74:8080/index.php?action=file&file=%E5%A4%B4%E5%83%8F%2F%E7%94%B7%E5%A4%B4%2Fphoto_2024-11-26_20-10-33.jpg')

const activeName = ref('first')

onMounted(async () => {

  // 假设从某个 API 获取用户数据
  user.value = await userApi.getUserInfo({userId: route.params.userId})

  console.log("---------------------------------")
  console.log(user.value)
  console.log("---------------------------------")
})

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}


</script>

<style scoped>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>