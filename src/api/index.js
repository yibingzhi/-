// src/api/index.js
import videoApi from './videoApi.js';
import userApi from './userApi.js';
import commentApi from "./commentApi.js";

// 导入其他API模块

export default {
    videoApi: videoApi,
    userApi: userApi,
    commentApi: commentApi,

    // 其他API模块
};