// src/api/user.js

import http from "../api/http.js";

const userApi = {

//根据视频id获取评论
    getCommentListByVideoId(params) {
        return http.get('/comments/video', {params: params})
    },

//添加评论
    addComment(data) {
        return http.post('/comments', data)
    },
//回复评论

    replyComment(data) {
        return http.post('/comments/reply', data)
    }
}
export default userApi;