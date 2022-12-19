<template>
  <div class="mx-3">
    <Snackbar :SnackBarComponent="SnackBarComponent" />
    <v-toolbar v-if="CurrentView == 'LIST_VIEW'" flat class="mt-5" :color="$vuetify.theme.dark == true ? '#121212' : ''">
      <div class="display-1 dark_text--text mt-n5">Articles</div>
      <v-spacer />
      <v-text-field
        dense
        outlined
        clearable
        label="Search"
        v-model="search"
        prepend-inner-icon="mdi-magnify"
        color="primary"
        class="mt-3 mr-4"
        :style="'max-width: 250px;'"
      >
      </v-text-field>
      <v-menu v-model="FilterMenu" bottom offset-y :close-on-content-click="false">
        <template v-slot:activator="{ on, attrs }">
          <v-btn small color="primary" fab v-on="on" v-bind="attrs" class="elevation-1 mt-n5">
            <v-icon> mdi-filter-outline </v-icon>
          </v-btn>
        </template>
        <v-card width="250">
          <v-card-text align="center">
            <div>Filter By</div>
            <v-autocomplete outlined dense label="Select Category" :items="CategoryItems" v-model="CategoryValue" class="mt-3"> </v-autocomplete>
            <div class="my-n4">Sort By</div>
            <v-radio-group v-model="SortByValue">
              <v-radio label="Latest" value="LATEST"></v-radio>
              <v-radio label="Posted First" value="FIRST"></v-radio>
              <v-radio label="A-Z" value="AZ"></v-radio>
              <v-radio label="Z-A" value="ZA"></v-radio>
            </v-radio-group>
          </v-card-text>
          <v-card-actions class="mt-n9">
            <v-spacer />
            <v-btn outlined text small class="text-Capitalize mr-1" @click="FilterMenu = !FilterMenu" color="red"> Close </v-btn>
            <v-btn small class="text-Capitalize mr-1" color="primary" @click="FilterMethod"> Apply </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </v-toolbar>
    <v-row no-gutters v-if="CurrentView == 'LIST_VIEW'">
      <v-col cols="12" md="3" v-for="(item, idx) in ArticlesList" :key="idx">
        <v-hover v-slot="{ hover }">
          <v-card
            class="ma-2"
            :elevation="hover ? 12 : 2"
            :class="{ 'on-hover': hover }"
            :color="$vuetify.theme.dark == true ? '#272727' : ''"
            @click="CheckItem(item, idx)"
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
      </v-col>
    </v-row>
    <v-card-text v-else-if="CurrentView == 'DETAIL_VIEW'">
      <!-- ***************************************************************************************************** -->
      <v-carousel v-model="CurrentIdx" hide-delimiters height="auto">
        <v-carousel-item v-for="(item, idx) in ArticlesList" :key="idx">
          <v-row no-gutters class="mx-5 px-15">
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
              <div class="display-1">
                {{ item.article_title }}
              </div>
              <div class="Description py-5">{{ item.article_description }}</div>
            </v-col>
            <v-col cols="12" md="12" sm="12" xs="12">
              <v-img class="" :src="item.image_src" alt="No Image found!" height="400px" max-width="100%" align="center"></v-img>
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
              <div class="py-3">
                {{ item.article_data ? item.article_data : "-" }}
              </div>
            </v-col>
          </v-row>
        </v-carousel-item>
      </v-carousel>
      <!-- ***************************************************************************************************** -->
    </v-card-text>
  </div>
</template>

<script>
import Snackbar from "@/components/Extras/Snackbar.vue";

import Articles from "@/JsonFiles/Articles.json";

export default {
  data: () => ({
    ArticlesList: [],
    search: "",
    CurrentView: "",
    CurrentIdx: 0,
    CurrentItem: {},
    CategoryItems: [
      "All",
      "Technology",
      "Business",
      "Politics",
      "Sports",
      "Startups",
      "Entertainment",
      "International",
      "Automobile",
      "Travel",
      "Fashion",
      "Education",
      "Health & Fitness",
      "Others",
    ],
    CategoryValue: "All",
    SortByValue: "LATEST",
    FilterMenu: false,
    SnackBarComponent: {},
  }),
  components: {
    Snackbar,
  },
  async mounted() {
    if (this.$store.getters.get_articles_list.length == 0) {
      await this.$store.commit("SET_ARTICLES_LIST", Articles);
      this.ArticlesList = Articles;
    } else {
      this.ArticlesList = this.$store.getters.get_articles_list;
    }
    this.$store.commit("SET_CURRENT_ROUTE", this.$route.name);
    this.CurrentView = "LIST_VIEW";
    this.FilterMethod();
    console.warn("ArticlesList", this.ArticlesList);
  },
  watch: {
    search(val) {
      if (val == "" || val == null) {
        this.ArticlesList = this.$store.getters.get_articles_list;
      } else {
        this.ArticlesList = this.$store.getters.get_articles_list.filter((itm) => itm.article_title.toLowerCase().includes(val.toLowerCase()));
      }
    },
  },
  methods: {
    FilterMethod() {
      // Fitler BY
      if (this.CategoryValue == "All") this.ArticlesList = this.$store.getters.get_articles_list;
      else if (this.CategoryValue != "All")
        this.ArticlesList = this.$store.getters.get_articles_list.filter((itm) => itm.category == this.CategoryValue);

      // Sort BY
      switch (this.SortByValue) {
        case "LATEST":
          this.ArticlesList = this.$store.getters.get_articles_list.sort((a, b) => b.created_on - a.created_on);
          break;
        case "FIRST":
          this.ArticlesList = this.$store.getters.get_articles_list.sort((a, b) => a.created_on - b.created_on);
          break;
        case "AZ":
          this.ArticlesList = this.$store.getters.get_articles_list.sort((a, b) =>
            a.article_title.toLowerCase().localeCompare(b.article_title.toLowerCase())
          );
          break;
        case "ZA":
          this.ArticlesList = this.$store.getters.get_articles_list.sort((a, b) =>
            b.article_title.toLowerCase().localeCompare(a.article_title.toLowerCase())
          );
          break;
      }
      this.FilterMenu = false;
    },

    // Add to Favorite
    AddToFavorite(idx) {
      this.ArticlesList[idx].favourite = !this.ArticlesList[idx].favourite;
      this.$store.commit("SET_ARTICLES_LIST", this.ArticlesList);
      this.SnackBarComponent = {
        SnackbarVmodel: true,
        SnackbarColor: "green",
        Top: true,
        SnackbarText: this.ArticlesList[idx].favourite == true ? "Added to Favorites" : "Removed from Favorites",
      };
    },

    // Detail View Initialization
    CheckItem(item, idx) {
      this.CurrentIdx = idx;
      this.CurrentItem = item;
      this.CurrentView = "DETAIL_VIEW";
    },

    // Loading next and previous articles
    LoadPreviousItem() {
      this.CurrentItem = this.ArticlesList[--this.CurrentIdx];
      this.transistionLeft();
    },
    LoadNextItem() {
      this.CurrentItem = this.ArticlesList[++this.CurrentIdx];
      this.transistionRight();
    },
  },
};
</script>

<style>
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

/* Description of the Article CSS */
.Description {
  font-size: x-large;
}
</style>
