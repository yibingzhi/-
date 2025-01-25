<template>
  <nav-bar></nav-bar>
  <el-tabs v-model="activeName" class="demo-tabs" style="margin-top: 2vh" @tab-click="handleClick">
    <el-tab-pane label="视频" name="first">
      <MediaList></MediaList>


    </el-tab-pane>
    <el-tab-pane label="用户" name="second">
      <el-scrollbar height="90vh">
        <el-row :gutter="20" justify="center">
          <el-card v-for="i in 10" style="width: 70vh; height: 35vh;margin: 1vh">
            <el-row>
              <el-col :span="20">
                <el-avatar :size="100" :src="circleUrl"/>
                <div>
                  <el-text>翌冰之</el-text>
                  <p>
                    <el-text>
                      抖音号：110110111
                    </el-text>
                    <el-divider direction="vertical"></el-divider>

                    <el-text>100万获赞</el-text>


                    <el-divider direction="vertical"></el-divider>
                    <el-text>100万粉丝</el-text>
                  </p>

                  <p>很高兴认识你</p>

                </div>


              </el-col>
              <el-col :span="4">
                <el-button style="margin-top: 10vh" type="danger">关注</el-button>
              </el-col>
            </el-row>
          </el-card>
        </el-row>
      </el-scrollbar>
    </el-tab-pane>

  </el-tabs>
</template>
<script lang="ts" setup>
import {ref} from 'vue'
import type {TabsPaneContext} from 'element-plus'
import NavBar from "../components/HomePage/NavBar.vue";
import MediaList from "../components/MediaList.vue";

const activeName = ref('first')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
const circleUrl = ref('http://117.72.100.74:8080/index.php?action=file&file=%E5%A4%B4%E5%83%8F%2F%E7%94%B7%E5%A4%B4%2Fphoto_2024-11-26_20-10-33.jpg')
</script>

<style>

</style>