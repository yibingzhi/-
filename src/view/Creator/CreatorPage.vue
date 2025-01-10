<template>
  <el-row class="tac" gutter="10">
    <el-col span="5">
      <h3 class="mb-2">布谷创作者中心</h3>
      <el-menu
          class="el-menu-vertical-demo"
          default-active="2"
          router
          @close="handleClose"
          @open="handleOpen"
      >
        <el-menu-item index="/creator/fabu">
          <el-icon>
            <icon-menu/>
          </el-icon>
          <span>发布视频</span>
        </el-menu-item>
        <el-menu-item index="">
          <el-icon>
            <icon-menu/>
          </el-icon>
          <span>作品管理</span>
        </el-menu-item>
        <el-sub-menu index="">
          <template #title>
            <el-icon>
              <icon-menu/>
            </el-icon>
            <span>互动管理</span>
          </template>
          <el-menu-item index="1-1">关注管理</el-menu-item>
          <el-menu-item index="1-2">粉丝管理</el-menu-item>
          <el-menu-item index="1-3">评论管理</el-menu-item>
          <el-menu-item index="1-4-1">弹幕管理</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="">
          <template #title>
            <el-icon>
              <icon-menu/>
            </el-icon>
            <span>数据中心</span>
          </template>
          <el-menu-item index="">关注管理</el-menu-item>
          <el-menu-item index="">粉丝管理</el-menu-item>
          <el-menu-item index="">评论管理</el-menu-item>
          <el-menu-item index="">弹幕管理</el-menu-item>
        </el-sub-menu>


        <el-sub-menu index="">
          <template #title>
            <el-icon>
              <icon-menu/>
            </el-icon>
            <span>帮助中心</span>
          </template>
        </el-sub-menu>
        <el-menu-item index="/">
          <el-icon>
            <icon-menu/>
          </el-icon>
          <span>回到首页</span>
        </el-menu-item>
      </el-menu>
    </el-col>

    <el-col span="14" style="">

      <router-view></router-view>

    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import {Menu as IconMenu,} from '@element-plus/icons-vue'

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>
