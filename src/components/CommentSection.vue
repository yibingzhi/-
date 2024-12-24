<template>
  <!--  评论区组件-->

  <el-scrollbar height="84vh">
    <u-comment :config="config" @submit="submit">
      <!--      <template>导航栏卡槽</template>-->
      <!--      <template #header>头部卡槽</template>-->
      <!-- <template #action="{ user }">动作卡槽{{ user.username }}</template> -->
      <!-- <template #avatar="{ id, user }">头像卡槽{{ user.avatar }}</template> -->
      <!-- <template #info>信息卡槽</template> -->
      <!-- <template #card>用户信息卡片卡槽</template> -->
      <template #func>功能区域卡槽</template>
    </u-comment>
  </el-scrollbar>
</template>

<script lang="ts" setup>
// 下载表情包资源emoji.zip https://gitee.com/undraw/undraw-ui/releases/tag/v0.0.0
// static文件放在public下,引入emoji.ts文件可以移动assets下引入,也可以自定义到指定位置
import emoji from '../assets/emoji'
import {onMounted, reactive} from 'vue'
import {CommentApi, CommentSubmitApi, ConfigApi, Time, UToast} from 'undraw-ui'
import {useUserStore} from '../stores/userStore'
import commentApi from '../api/commentApi'

const props = defineProps({
  videoId: {
    type: String,
    required: true
  }
})

const userStore = useUserStore()

console.log('评论组件')
// console.log(props.videoId)
// userStore.user.userId
console.log()
console.log('================================================')
const config = reactive<ConfigApi>({
  user: {
    id: userStore.user.data.userId,
    username: userStore.user.data.nickname,
    avatar: userStore.user.data.avatarUrl,
  } as any, // 当前用户信息
  emoji: emoji, // 表情包数据
  comments: [], // 评论数据
  relativeTime: true, // 开启人性化时间
  show: {
    level: false,    // 关闭等级显示
    homeLink: true, // 关闭个人主页链接跳转
    address: false, // 关闭地址信息
    likes: false    // 关闭点赞按钮显示
  }
})

/**
 * 评论对象数据结构
 * 存储结构: 一个评论表，通过paretnId是否为空判断类型 评论/回复
 * 层数: 两层
 * 第一层：评论 parentId属性为空; 第二层关系: id等于parentId的数据，则为第二层回复的评论数据
 * 第二层: 回复 parentId属性不为空; 第一层关系: parentId等于第一层id，则为第一层评论的回复数据
 *
 */


onMounted(async () => {

})

// config.comments = comments;

async function fetchAndProcessComment() {
  const rep = await commentApi.getCommentListByVideoId({videoId: props.videoId});

  config.comments = rep.data
}

// 调用函数
fetchAndProcessComment();


// 评论提交事件
let temp_id = 100
// 提交评论事件
const submit = async ({content, parentId, finish}: CommentSubmitApi) => {


  try {
    const res = await commentApi.addComment({
      content: content,
      parentId: parentId,
      uid: config.user.id,
      videoId: props.videoId,
      address: "user/" + userStore.user.data.userId
    })
    if (res === true) {
      UToast({message: '评论成功!', type: 'info'})
    }
  } catch (e) {
    UToast({message: '评论失败!', type: 'info'})
  }
  let str = '提交评论:' + content + ';\t父id: ' + parentId
  console.log(str)

  // 模拟请求接口生成数据
  const comment: CommentApi = {
    id: String((temp_id += 1)),
    parentId: parentId,
    uid: config.user.id,
    content: content,
    createTime: new Time().toString(),
    user: {
      username: config.user.username,
      avatar: config.user.avatar
    },
    reply: null
  }
  finish(comment)

}


// 假设你有一个名为 `comment` 的对象，包含原始数据


</script>

<style lang="scss" scoped>
</style>