<script lang="ts" setup>
import NavBar from "../components/HomePage/NavBar.vue";
import Sidebar from "../components/HomePage/Sidebar.vue";
</script>

<template>

  <nav-bar></nav-bar>
  <el-row :gutter="0" style="margin-top: 5px;">
    <el-col :span="3">
      <Sidebar></Sidebar>
    </el-col>

    <el-col :span="21">

      <!--      <VideoPlayer/>-->
      <router-view></router-view>

    </el-col>


  </el-row>

</template>

<style scoped>


</style>