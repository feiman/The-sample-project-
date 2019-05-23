import "babel-polyfill";
import 'animate.css'
import "./../static/style/iview.css";
import "./element#FF6933/index.css";
import "./../static/font_text/iconfont.css";
import "./element#FF6933/reset.scss";
import "./element#FF6933/icon.scss";
import "./element#FF6933/msgbox.scss"; // 弹窗
import VideoPlayer from 'vue-video-player';

// 按需引入
import { Col, Icon, Input, Modal, Option, Row, Select, Switch } from "iview";
import Element,{Loading} from "element-ui";

import { List } from 'vant';
import Vue from "vue";
import VueDND from 'awe-dnd'; //拖拽排序
import VueProgressBar from "vue-progressbar";
import filters from "./filters";
import frame from "./frame.vue";
import iviewArea from "iview-area";
import msgBox from "./components/msgbox.vue"; // 弹窗
import msgBox2 from "./components/msgbox2.vue"; // 弹窗
import router from "./router";
import set_get_param from "./common/plug.js"; //plug
import store from "./store";
Vue.use(VideoPlayer);
import "videojs-contrib-hls";
Vue.use(List);

Vue.use(VueDND);

Vue.use(Element);
// 按需引入
Vue.component("Select", Select);
Vue.component("Option", Option);
Vue.component("Icon", Icon);
Vue.component("Modal", Modal);
Vue.component("Row", Row);
Vue.component("Col", Col);
Vue.component("mySwitch", Switch);
Vue.component("msgBox", msgBox);
Vue.component("msgBox2", msgBox2);

Vue.component("Input", Input);

Vue.use(iviewArea); // iview ui area plug




Vue.prototype.Loading= Loading;

Vue.prototype.set_get_param = set_get_param; // 方法
Vue.prototype.storage = set_get_param.storage; // storage 储存


Vue.use(VueProgressBar, {
  failedColor: "#874b4b",
  thickness: "2px",
  transition: {
    speed: "0.2s",
    opacity: "0.6s"
  },
  autoRevert: true,
  location: "top",
  inverse: false
});

// 过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

var loadingInstance;
router.beforeEach((to,path,next)=>{
 loadingInstance = Loading.service({ fullscreen: true })
next()
})

router.afterEach((to,path)=>{
 loadingInstance.close()
});

new Vue({
  store,
  router,
  el: "#root",
  render: h => h(frame)
});
