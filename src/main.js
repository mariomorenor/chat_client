import Vue from "vue";
import "./plugins/fontawesome";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import Buefy from "buefy";
import "buefy/dist/buefy.css";

import VueSocketIO from "vue-socket.io";

Vue.use(Buefy, {
  defaultIconComponent: "fa",
  defaultIconPack: "fas",
});

Vue.config.productionTip = false;

Vue.use(
  new VueSocketIO({
    debug: true,
    connection:
      process.env.NODE_ENV !== "production"
        ? "http://127.0.0.1:5001"
        : "https://chatserver-ql8c.onrender.com",
    vuex: {
      store,
      actionPrefix: "SOCKET_",
      mutationPrefix: "SOCKET_",
    },
  })
);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
