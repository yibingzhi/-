// main.ts
import {createApp} from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import UndrawUi from 'undraw-ui';
import 'undraw-ui/dist/style.css';
import router from './router.ts';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';
import {createPinia} from 'pinia';
import App from './App.vue';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const app = createApp(App);


const pinia = createPinia()

// 使用插件
pinia.use(piniaPluginPersistedstate)
app.use(pinia);
app.use(UndrawUi);
app.use(router);
app.use(ElementPlus);


app.mount('#app');
