import {createRouter, createWebHistory} from 'vue-router'
import HomePage from "./view/HomePage.vue";
import VideoPage from "./view/VideoPage.vue";
import SearchResults from "./view/SearchResults.vue";
import Recommended from "./view/homePage/Recommended.vue";
import Featured from "./view/homePage/Featured.vue";
import Following from "./view/homePage/Following.vue";
import Friends from "./view/homePage/Friends.vue";
import mediaList from "./components/MediaList.vue";
import UserProfile from "./components/UserProfile.vue";
import AiPage from "./view/AiPage.vue";
import xunigundong from "./view/homePage/xunigundong.vue";

import CreatorPage from "./view/Creator/CreatorPage.vue";
import GuanZhuGuanLi from "./view/Creator/GuanZhuGuanLi.vue";
import FaBuShiPin from "./view/Creator/FaBuShiPin.vue";


const routes = [
    {
        path: '/',
        component: HomePage,
        children: [
            {
                path: '/',
                component: Recommended
            },
            {
                path: '/Featured',
                component: Featured
            },
            {
                path: '/Following',
                component: Following
            },
            {
                path: '/:mediaId',
                component: mediaList
            },
            {
                path: '/Friends',
                component: Friends
            },
            {
                path: '/User/:userId',
                component: UserProfile
            },
            {
                path: '/AI',
                component: AiPage
            },

            {

                path: '/xxx',
                component: xunigundong
            },
            {
                path: '/video/User/:userId',
                component: UserProfile
            },

        ]
    },
    {
        path: '/video/:videoId',
        name: 'video',
        props: true,// 或自定义函数
        component: VideoPage

    },

    {
        path: '/search',
        component: SearchResults
    },
    {
        path: '/UserProfile',
        component: UserProfile
    },
    {
        path: '/creator',
        name: 'creator',
        component: CreatorPage,
        children:
            [

                {
                    path: '/creator/fabu',
                    name: 'fabu',
                    component: FaBuShiPin,
                },
                {
                    path: '/creator/guanzhu',
                    name: 'guanzhu',
                    component: GuanZhuGuanLi,
                },
            ]

    }
]

const router = createRouter({
    // history: createMemoryHistory(),
    history: createWebHistory(),
    routes,
})


export default router;