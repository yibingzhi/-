// src/api/user.js

import http from "../api/http.js";

const likeApi = {

    /**
     * 获取视频的点赞数
     */

    getLikesCountByVideoId(params) {
        return http.get("/ikes/count/video", {params: params})
    },

    /**
     * 根据用户ID获取点赞数
     */

    getLikesCountByUserId(params) {
        return http.get("/likes/count/user", {params: params})
    },

    /**
     * 检查用户是否点赞了视频
     */

    isUserLikedVideo(params) {
        return http.get("/likes/check", {params: params})
    },

    /**
     * 用户点赞视频
     */

    likeVideo(params) {
        return http.post("/likes/like", null, {params: params})

    },

    /**
     * 用户取消点赞视频
     */

    unlikeVideo(params) {
        return http.delete("/likes/unlike", {params: params})
    },

    /**
     * 根据用户ID获取用户点赞的视频列表
     */

    getLikedVideosByUserId(params) {


        return http.get("/likes/user/videos", {params: params})

    },

    /**
     * 获取点赞了特定视频的用户列表
     */

    getUsersWhoLikedVideo(params) {
        return http.get("/likes/video/users", {params: params})
    },

    /**
     * 获取热门视频列表
     */

    getPopularVideos(params) {
        return http.get("/likes/popular", {params: params})
    }

    /**
     * 获取两个用户共同点赞的视频列表
     */
}
export default likeApi;