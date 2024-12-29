import http from "./http.js";

const VideoFavoitesApi = {


    /**
     * 添加视频到用户的收藏列表
     *
     * @return 操作结果
     * @param int
     */

    addFavorite(params) {

        return http.post("/favorites/add", null, {params: params})
    },

    /**
     * 从用户的收藏列表中移除视频
     *
     * @param user_id  用户ID
     * @param video_id 视频ID
     * @return 操作结果
     */

    removeFavorite(params) {
        return http.delete("/favorites/remove", {params: params})
    },

    /**
     * 获取用户的收藏视频列表
     *
     * @param user_id 用户ID
     * @return 收藏的视频列表
     */

    getFavoritesByUser(params) {
        return http.get("/favorites/list", {params: params})
    },

    /**
     * 检查视频是否已被用户收藏
     *
     * @param user_id  用户ID
     * @param video_id 视频ID
     * @return 是否收藏的结果
     */

    isVideoFavorited(params) {

        return http.get("/favorites/is-favorited", {params: params})
    }


}
export default VideoFavoitesApi;