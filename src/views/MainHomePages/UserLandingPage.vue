<template>
  <v-app>
    <Snackbar :SnackBarComponent="SnackBarComponent" />
    <BecomePublisher :BecomePublisherDialog="BecomePublisherDialog" @clicked="BecomePublisherDialogExit" />
    <v-app-bar app clipped-left :class="$vuetify.breakpoint.name == 'sm' || $vuetify.breakpoint.name == 'xs' ? '' : 'px-3'">
      <div v-if="$vuetify.breakpoint.name == 'sm' || $vuetify.breakpoint.name == 'xs'">
        <v-toolbar flat dense style="background-color: transparent" class="ml-n3">
          <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="ml-n3"></v-app-bar-nav-icon>
          <div class="MobileTitle">{{ $route.name }}</div>
        </v-toolbar>
      </div>
      <div v-else>
        <v-card class="elevation-0 mt-1" tile @click="$router.push('/Articles')" :style="'cursor: pointer;'">
          <v-img v-if="!$vuetify.theme.dark" contain width="120px" src="@/assets/ArticlzLogoLight.png"></v-img>
          <v-img v-if="$vuetify.theme.dark" contain width="120px" src="@/assets/ArticlzLogoDark.png"></v-img>
        </v-card>
        <v-btn text dense v-for="(item, idx) in RouterList" :key="idx" class="mx-1" @click="$router.push(item.Path)">
          {{ item.Name }}
        </v-btn>
        <v-btn
          v-if="$store.getters.get_current_user_details.user_type == 'READER'"
          text
          dense
          color="red"
          class="mx-1"
          @click="BecomePublisherDialog = true"
        >
          become a Publisher
        </v-btn>
      </div>
      <v-spacer />
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon @click="$vuetify.theme.dark = !$vuetify.theme.dark" v-on="on">
            <v-icon class="mx-3">
              {{ $vuetify.theme.dark == true ? "mdi-weather-night" : "mdi-white-balance-sunny" }}
            </v-icon>
          </v-btn>
        </template>
        <span class="white--text">{{ $vuetify.theme.dark == true ? "Turn Off Dark Mode" : "Turn on Dark Mode" }}</span>
      </v-tooltip>
      <v-menu v-model="ProfileMenu" open-on-hover bottom offset-y :close-on-content-click="false">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-on="on" v-bind="attrs" @click="ProfileMenu = true" class="mr-1">
            <v-icon class="mx-3"> mdi-account </v-icon>
          </v-btn>
        </template>
        <v-card width="250">
          <v-card-text align="center">
            <v-icon style="font-size: 80px"> mdi-account-circle </v-icon>
            <div class="font-weight-regular py-3">{{ $store.getters.get_current_user_details.user_email_id }}</div>
            <div class="font-weight-bold">{{ $store.getters.get_current_user_details.user_type }}</div>
            <v-btn dark block small color="red" class="mt-3" @click="Logout()" :loading="loading"
              ><v-icon dark small class="mr-1"> mdi-power </v-icon> logout
            </v-btn>
          </v-card-text>
        </v-card>
      </v-menu>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Snackbar from "@/components/Extras/Snackbar.vue";
import RouterListPublisher from "@/JsonFiles/RouterListPublisher.json";
import RouterListReader from "@/JsonFiles/RouterListReader.json";

import BecomePublisher from "@/components/UserLandingPage/Dialogs/BecomePublisher.vue";

export default {
  data: () => ({
    drawer: false,
    loading: false,
    RouterList: [],
    ProfileMenu: false,
    SnackBarComponent: {},
    BecomePublisherDialog: false,
  }),
  components: {
    Snackbar,
    BecomePublisher,
  },
  mounted() {
    console.warn("CurrentUserDetails", this.$store.getters.get_current_user_details);
    this.drawer = false;
    this.loading = false;
    this.RouterList = this.$store.getters.get_current_user_details.user_type === "READER" ? RouterListReader : RouterListPublisher;
    console.log("RouterList", this.RouterList);
    this.$router.push("/Articles");
  },
  watch: {
    "$route.name"(path) {
      if (path == "LandingPage" && this.$store.getters.get_current_route == "Articles") {
        setTimeout(() => {
          this.$router.push("/Articles");
        }, 100);
      } else if (path == "LandingPage" && this.$store.getters.get_current_route == "Favorites") {
        setTimeout(() => {
          this.$router.push("/Favorites");
        }, 100);
      } else {
        setTimeout(() => {
          this.$router.push("/" + path);
        }, 100);
      }
    },
  },
  methods: {
    BecomePublisherDialogExit(Toggle) {
      this.BecomePublisherDialog = false;
      if (Toggle == 2) {
        this.SnackBarComponent = {
          SnackbarVmodel: true,
          SnackbarColor: "green",
          Top: true,
          SnackbarText: "Publisher request sent successfully!",
        };
      }
    },
    Logout() {
      this.loading = true;
      this.$store.commit("SET_ARTICLES_LIST", []);

      setTimeout(() => {
        this.RouterList = [];
        this.$router.push("/");
      }, 500);
    },
  },
};
</script>

<style>
.MobileTitle {
  font-size: 24px !important;
  font-weight: 300;
}
</style>
