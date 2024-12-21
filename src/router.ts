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
import Video from "./components/Video.vue";


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
            }

        ]
    },
    {
        path: '/video',
        component: VideoPage
    },
    {
        path: '/video2',
        component: Video
    },
    {
        path: '/search',
        component: SearchResults
    },
    {
        path: '/UserProfile',
        component: UserProfile
    },
]

const router = createRouter({
    // history: createMemoryHistory(),
    history: createWebHistory(),
    routes,
})


export default router;