// src/api/user.js

import http from "../api/http.js";

const FollowApi = {

    /**
     * 关注用户
     *
     * @param followerId 关注者的用户ID
     * @param followedId 被关注者的用户ID
     * @return 返回关注成功的HTTP响应
     */

    followUser(params) {
        return http.post('/follow', null, {params: params})
    },

    /**
     * 取消关注用户
     *
     * @param followerId 取消关注者的用户ID
     * @param followedId 被取消关注者的用户ID
     * @return 返回取消关注成功的HTTP响应
     */

    unfollowUser(params) {
        return http.delete("/follow", {params: params})
    },

    /**
     * 获取用户的关注列表
     *
     * @param userId 用户ID
     * @return 返回用户关注的用户列表
     */


    getUserFollowings(params) {
        return http.get("/follow/followings", {params: params})
    },

    /**
     * 获取用户的粉丝列表
     *
     * @param userId 用户ID
     * @return 返回用户的粉丝列表
     */


    getUserFollowers(params) {
        return http.get("/follow/followers", {params: params})
    },


    /**
     * 获取用户的互关列表
     *
     * @param userId 用户ID1
     */

    getMutualFollowers(params) {
        return http.get("/mutual-followers", {params: params})
    },


    /**
     * 检查用户是否已关注
     *
     * @param followerId 关注者的用户ID
     * @param followedId 被关注者的用户ID
     * @return 返回是否关注的结果
     */

    isUserFollowed(params) {
        return http.get("/follow/check-follow", {params: params})
    },


}
export default FollowApi;