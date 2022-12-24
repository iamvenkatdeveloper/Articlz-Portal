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
        <v-toolbar flat dense style="background-color: transparent" class="mx-n7">
          <v-card class="elevation-0 mt-1" tile @click="$router.push('/Articles')" :style="'cursor: pointer;'">
            <v-img v-if="!$vuetify.theme.dark" contain width="120px" src="@/assets/ArticlzLogoLight.png"></v-img>
            <v-img v-if="$vuetify.theme.dark" contain width="120px" src="@/assets/ArticlzLogoDark.png"></v-img>
          </v-card>
          <v-btn text dense v-for="(item, idx) in RouterList" :key="idx" class="mx-1" @click="OpenPage(item)">
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
        </v-toolbar>
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
          <v-btn icon v-on="on" v-bind="attrs" @click="ProfileMenu = true">
            <v-icon class="mx-3"> mdi-account </v-icon>
          </v-btn>
        </template>
        <v-card width="250">
          <v-btn icon @click="ProfileMenu = false" absolute right class="mt-1 mr-n2">
            <v-icon> mdi-close </v-icon>
          </v-btn>
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
    <v-navigation-drawer v-model="drawer" app clipped color="primary" dark width="150">
      <v-card-text align="center">
        <v-card color="primary" elevation="0" @click="$router.push('/Articles')" :style="'cursor: pointer;'">
          <v-img contain width="125px" src="@/assets/ArticlzLogo.png"></v-img>
        </v-card>
      </v-card-text>
      <v-divider></v-divider>
      <v-list dense nav>
        <v-list-item v-for="(item, idx) in RouterList" :key="idx" link @click="OpenPage(item)">
          <v-list-item-content>
            <v-list-item-title class="white--text">{{ item.Name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="BecomePublisherDialog = true">
          <v-list-item-content>
            <v-list-item-title class="white--text">Become a Publisher</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
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
    if (this.$store.getters.get_current_route == "" && this.$store.getters.get_current_route == "") this.$router.push("/Articles");
    else {
      this.$router.push("/" + this.$store.getters.get_current_route);
    }
  },
  watch: {
    "$route.name"(path) {
      if (path == "LandingPage") {
        setTimeout(() => {
          if (this.$store.getters.get_current_route == "" && this.$store.getters.get_current_route == "") this.$router.push("/Articles");
          else {
            this.$router.push("/" + this.$store.getters.get_current_route);
          }
        }, 1);
      }
    },
  },
  methods: {
    OpenPage(item) {
      this.$store.commit("SET_DETAIL_VIEW", false);
      this.$router.push(item.Path);
    },
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
      this.$store.commit("SET_PREVIOUS_ROUTE", "");
      this.$store.commit("SET_CURRENT_ROUTE", "");
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
