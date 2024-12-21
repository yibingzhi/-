// src/api/user.js
import http from './http';

const videoApi = {
    // 发布视频接口
    publish(data) {
        return http.post('/video/publish', data)
    },

    //根据视频id获取视频
    getVideoDetails(params) {
        return http.get('/video', {params: params})
    },


    // 获取视频列表
    getVideoList(params) {
        return http.get('/video/list', {params: params})
    },

    //根据创作者id获取该创作者发布的所有视频列表接口
    getVideoListByAuthorId(params) {
        return http.get('/video/creator', {params: params})
    },

    // 获取审核通过视频列表接口，返回所有审核状态为1（审核通过）的视频列表信息，若没有则返回空列表
    getAuditedVideos() {
        return http.get('/video/audited')
    },

    // 根据视频分类获取视频列表接口，接收视频分类名称作为请求参数，返回该分类下的所有视频列表信息，若分类名称为空或不存在则返回相应提示

    getAuditedVideosByCategory() {
        return http.get('/audited/category')
    }


};

export default videoApi;