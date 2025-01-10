<template>
  <el-row justify="center" style="width: 100vh">
    <el-col>
      <h5>发布视频</h5>

      <el-form ref="formRef" :model="form" label-width="120px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="form.description" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="视频文件">
          <el-upload
              ref="videoUploadRef"
              :auto-upload="false"
              :limit="1"
              :on-change="handleVideoChange"
              :on-exceed="handleExceed"
              accept=".mp4"
              action="http://localhost:8080/video/publish"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传mp4文件</div>
          </el-upload>
          <!-- 视频预览 -->
          <div v-if="form.videoPreviewUrl" style="margin-top: 10px;">
            <video :src="form.videoPreviewUrl" controls height="240" width="320"></video>
          </div>
        </el-form-item>
        <el-form-item label="封面图片">
          <el-upload
              ref="coverImageUploadRef"
              :auto-upload="false"
              :limit="1"
              :on-change="handleCoverImageChange"
              :on-exceed="handleExceed"
              accept=".jpg"
              action="http://localhost:8080/video/publish"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg文件</div>
          </el-upload>
          <!-- 图片预览 -->
          <div v-if="form.coverImagePreviewUrl" style="margin-top: 10px;">
            <img :src="form.coverImagePreviewUrl" alt="封面图片预览" style="max-width: 320px; max-height: 240px;">
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import {onUnmounted, reactive, ref} from 'vue'
import {ElMessage, UploadInstance} from "element-plus";
import axios from 'axios';
import {useUserStore} from "../../stores/userStore";

const formRef = ref()
const videoUploadRef = ref<UploadInstance>()
const coverImageUploadRef = ref<UploadInstance>()
const userStore = useUserStore()

const form = reactive({
  title: '',
  description: '',
  creatorId: '',
  videoFile: null,
  coverImage: null,
  nickname: '',
  videoPreviewUrl: '',
  coverImagePreviewUrl: ''
})

const handleExceed = (files, fileList) => {
  alert(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件`)
}

const handleVideoChange = (file, fileList) => {
  form.videoFile = fileList.length > 0 ? fileList[fileList.length - 1].raw : null
  if (form.videoFile) {
    form.videoPreviewUrl = URL.createObjectURL(form.videoFile)
  } else {
    form.videoPreviewUrl = ''
  }
}

const handleCoverImageChange = (file, fileList) => {
  form.coverImage = fileList.length > 0 ? fileList[fileList.length - 1].raw : null
  if (form.coverImage) {
    form.coverImagePreviewUrl = URL.createObjectURL(form.coverImage)
  } else {
    form.coverImagePreviewUrl = ''
  }
}

const submitForm = () => {
  if (!formRef.value) return
  formRef.value.validate((valid) => {
    if (valid) {
      const formData = new FormData()
      formData.append('title', form.title)
      formData.append('description', form.description)
      const userStore = useUserStore()
      formData.append('creatorId', userStore.user.data.userId)
      formData.append('videoFile', form.videoFile)
      formData.append('coverImage', form.coverImage)
      formData.append('nickname', userStore.user.data.nickname)

      // 使用 axios 发送 POST 请求
      axios.post('http://localhost:8080/video/publish', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
          .then(response => {
            console.log('Success:', response.data)
            alert('视频发布成功！')
            ElMessage({
              message: '视频发布成功等待管理员审核',
              type: 'success',
            })
            formRef.value.resetFields()
          })
          .catch(error => {
            console.error('Error:', error)
            if (error.response) {
              // 服务器响应了错误状态
              console.log('服务器错误状态:', error.response.status)
              console.log('服务器错误信息:', error.response.data)
              alert(`服务器错误: ${error.response.status} - ${JSON.stringify(error.response.data)}`)
            } else if (error.request) {
              // 请求已发出，但没有响应
              console.log('请求已发出，但没有响应:', error.request)
              alert('请求没有响应，请检查网络连接或服务器状态')
            } else {
              // 设置请求时发生错误
              console.log('设置请求时发生错误:', error.message)
              alert('设置请求时发生错误: ' + error.message)
            }
          })
    } else {
      console.log('请填写完整信息')
      return false
    }
  })
}

// 清理预览URL
onUnmounted(() => {
  if (form.videoPreviewUrl) URL.revokeObjectURL(form.videoPreviewUrl);
  if (form.coverImagePreviewUrl) URL.revokeObjectURL(form.coverImagePreviewUrl);
})
</script>

<style scoped>
</style>