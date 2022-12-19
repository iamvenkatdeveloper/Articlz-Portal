import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#7A0BC0",
        dark_text: "243D25",
      },
      dark: {
        primary: "#7A0BC0",
        dark_text: "white",
      },
    },
  },
});
