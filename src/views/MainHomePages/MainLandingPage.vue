<template>
  <v-app>
    <LoginPage :LoginPageDialog="LoginPageDialog" @close="LoginPageDialogExit" />
    <v-app-bar app clipped-left color="primary" elevation="0">
      <v-toolbar dense flat color="primary" class="pa-0 ma-0">
        <v-card class="elevation-0" tile @click="$router.push('/')" :style="'cursor: pointer;'">
          <v-img contain width="125px" src="@/assets/ArticlzLogo.png"></v-img>
        </v-card>
        <v-spacer />
        <v-btn dark text class="text-capitalize" @click="LoginPageDialog = true"> Sign in/sign up </v-btn>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn dark icon @click="$vuetify.theme.dark = !$vuetify.theme.dark" v-on="on">
              <v-icon class="mx-3">
                {{ $vuetify.theme.dark == true ? "mdi-weather-night" : "mdi-white-balance-sunny" }}
              </v-icon>
            </v-btn>
          </template>
          <span class="white--text">{{ $vuetify.theme.dark == true ? "Turn Off Dark Mode" : "Turn on Dark Mode" }}</span>
        </v-tooltip>
      </v-toolbar>
    </v-app-bar>
    <v-main>
      <v-card tile height="370" color="primary">
        <v-card-text align="left">
          <v-row no-gutters class="mx-5">
            <v-col cols="12" md="7" sm="12">
              <div class="pt-10">
                <p class="font-weight-light display-3 pt-5 ml-5 white--text">Articles for Everyone !</p>
                <blockquote class="blockquote text-left white--text">
                  <p class="mb-0">Explore more than 1000+ articles on different topics that helps you grow, learn and do more...</p>
                  <br />
                  <footer class="blockquote-footer white--text">
                    “A reader lives a thousand lives before he dies . . . The man who never reads lives only one.”
                    <br />
                    <cite title="Source Title">George R.R. Martin</cite>
                  </footer>
                </blockquote>
              </div>
            </v-col>
            <v-col cols="12" md="5" sm="12">
              <v-img src="@/assets/BackgroundImage.png" contain height="350" class="mt-n3" />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-row no-gutters class="ma-5">
        <v-col cols="12" md="3" v-for="(item, idx) in ArticlesList" :key="idx">
          <v-hover v-slot="{ hover }">
            <v-card
              class="ma-2"
              :elevation="hover ? 12 : 2"
              :class="{ 'on-hover': hover }"
              :color="$vuetify.theme.dark == true ? '#272727' : ''"
              @click="CheckItem(idx)"
            >
              <v-img :src="item.image_src" alt="No Image found!" height="170" max-width="100%"></v-img>
              <v-card-text class="px-0 mx-2 my-0 py-2">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <div class="mx-1 mt-1 dark_text--text" v-on="on" v-bind="attrs">
                      {{
                        item.article_title
                          ? item.article_title.length > 40
                            ? item.article_title.slice(0, 40) + "..."
                            : item.article_title
                          : "title not available : ("
                      }}
                    </div>
                  </template>
                  <span>{{ item.article_title }}</span>
                </v-tooltip>
                <v-toolbar dense flat height="30" class="ml-n2 mt-1">
                  <small class="ml-n3"><v-icon class="mt-n1" color="green">mdi-circle-small</v-icon> {{ item.category }}</small>
                  <v-spacer />
                  <small>
                    <v-icon small class="mt-n1 mx-0" color="purple">mdi-timer-outline</v-icon>
                    {{ item.created_on ? new Date(item.created_on).toLocaleString() : "-" }}
                  </small>
                </v-toolbar>
              </v-card-text>
            </v-card>
          </v-hover>
        </v-col></v-row
      >
      <v-footer tile height="100" color="#2B3A55">
        <v-card-text class="font-weight-light white--text" align="center"
          ><div class="FooterText">Copyright &#169; Articlz {{ new Date().getFullYear() }}</div>
          <div class="FooterText mt-2">
            <v-icon dark small>mdi-pencil-ruler</v-icon> Designed & developed by
            <a href="https://www.linkedin.com/in/g-venkatesh-35849022a" target="_blank" class="white--text" title="Connect on LinkedIn"
              >G Venkatesh</a
            >
          </div>
        </v-card-text>
      </v-footer>
    </v-main>
  </v-app>
</template>

<script>
import LoginPage from "@/components/MainLandingPage/Dialogs/LoginPage.vue";

import Articles from "@/JsonFiles/Articles.json";

export default {
  data: () => ({
    ArticlesList: [],
    LoginPageDialog: false,
  }),
  components: {
    LoginPage,
  },
  mounted() {
    this.ArticlesList = Articles;
  },
  methods: {
    LoginPageDialogExit() {
      this.LoginPageDialog = false;
    },
    CheckItem(Idx) {
      this.$store.commit("SET_CURRENT_IDX", Idx);
      this.$router.push("/View");
    },
  },
};
</script>

<style>
.FooterText {
  font-size: 16px;
}
/* html,
body {
  overflow-y: hidden;
}

.v-main__wrap {
  height: calc(100vh - 65px);
  overflow-y: auto;
  overflow-x: hidden;
}

#content {
  height: calc(100vh - 65px);
  overflow-y: hidden;
} */
</style>
