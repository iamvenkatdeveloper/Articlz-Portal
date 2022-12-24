<template>
  <v-app>
    <LoginPage :LoginPageDialog="LoginPageDialog" @close="LoginPageDialogExit" />
    <v-app-bar app clipped-left color="primary" elevation="0">
      <v-toolbar dense flat color="primary" class="pa-0 ma-0">
        <v-card class="elevation-0" tile @click="$router.push('/')" :style="'cursor: pointer;'" color="primary">
          <v-img
            contain
            :width="$vuetify.breakpoint.name == 'sm' || $vuetify.breakpoint.name == 'xs' ? '90px' : '125px'"
            src="@/assets/ArticlzLogo.png"
          ></v-img>
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
      <v-card-text :class="$vuetify.breakpoint.name == 'sm' || $vuetify.breakpoint.name == 'xs' ? 'ma-0 pa-0 mt-3 px-3' : ''">
        <!-- ***************************************************************************************************** -->
        <v-carousel
          v-model="CurrentIdx"
          hide-delimiters
          height="auto"
          :show-arrows-on-hover="$vuetify.breakpoint.name == 'sm' || $vuetify.breakpoint.name == 'xs'"
        >
          <v-carousel-item v-for="(item, idx) in ArticlesList" :key="idx">
            <v-row no-gutters :class="$vuetify.breakpoint.name == 'sm' || $vuetify.breakpoint.name == 'xs' ? '' : 'mx-5 px-15'">
              <v-col cols="12" md="12" sm="12" xs="12">
                <v-toolbar flat dense class="ma-0 pa-0" :color="$vuetify.theme.dark == true ? '#121212' : ''">
                  <div class="font-weight-bold">
                    <v-icon x-large class="mt-n1 ml-n7 mr-n2" color="primary">mdi-circle-small</v-icon>
                    {{ item.category ? item.category : "-" }}
                  </div>
                  <v-spacer />
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        v-on="on"
                        icon
                        v-model="item.favourite"
                        @click.stop="AddToFavorite(idx)"
                        dark
                        :color="$vuetify.theme.dark == true ? '#121212' : ''"
                      >
                        <v-icon color="primary"> {{ item.favourite == true ? "mdi-star" : "mdi-star-outline" }} </v-icon>
                      </v-btn>
                    </template>
                    <span> {{ item.favourite == true ? "Remove from favorites" : "Add to favorites" }} </span>
                  </v-tooltip>
                </v-toolbar>
              </v-col>
              <v-col cols="12" md="12" sm="12" xs="12">
                <div :class="$vuetify.breakpoint.name == 'sm' || $vuetify.breakpoint.name == 'xs' ? 'MobileHeading' : 'display-1'">
                  {{ item.article_title }}
                </div>
                <div :class="$vuetify.breakpoint.name == 'sm' || $vuetify.breakpoint.name == 'xs' ? 'MobileDescription py-2' : 'Description py-5'">
                  {{ item.article_description }}
                </div>
              </v-col>
              <v-col cols="12" md="12" sm="12" xs="12">
                <v-img
                  class=""
                  :src="item.image_src"
                  alt="No Image found!"
                  :height="$vuetify.breakpoint.name == 'sm' || $vuetify.breakpoint.name == 'xs' ? '200px' : '400px'"
                  max-width="100%"
                  align="center"
                ></v-img>
              </v-col>
              <v-col cols="12" md="12" sm="12" xs="12">
                <div class="mt-3">
                  <v-icon small class="mt-n1 mx-0 mr-1" color="green">mdi-account</v-icon>
                  {{ item.published_by ? item.published_by : "-" }}
                </div>
              </v-col>
              <v-col cols="12" md="12" sm="12" xs="12">
                <div>
                  <v-icon small class="mt-n1 mx-0" color="blue">mdi-timer-outline</v-icon>
                  {{ item.created_on ? new Date(item.created_on).toLocaleString() : "-" }}
                </div>
              </v-col>
              <v-col cols="12" md="12" sm="12" xs="12">
                <div class="py-3" v-html="item.article_data"></div>
              </v-col>
            </v-row>
          </v-carousel-item>
        </v-carousel>
        <!-- ***************************************************************************************************** -->
      </v-card-text>
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
    CurrentIdx: 0,
  }),
  components: {
    LoginPage,
  },
  mounted() {
    this.ArticlesList = Articles;
    this.CurrentIdx = this.$store.getters.get_current_idx;
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  },
  methods: {
    LoginPageDialogExit() {
      this.LoginPageDialog = false;
    },
  },
};
</script>

<style>
.FooterText {
  font-size: 16px;
}
.MobileHeading {
  font-size: 18px;
  font-weight: 400;
}

.MobileDescription {
  font-size: 16px;
  font-weight: 400;
}

/* Previous Button */

.v-window__prev {
  position: fixed;
  top: 50%;
  left: 20px !important;
}

/* Next Button */

.v-window__next {
  position: fixed;
  top: 50%;
  right: 20px !important;
}
</style>
