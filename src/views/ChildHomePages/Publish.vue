<template>
  <div class="mx-3" v-if="renderPage">
    <Snackbar :SnackBarComponent="SnackBarComponent" />
    <DeleteArticle :DeleteArticleDialog="DeleteArticleDialog" @clicked="DeleteArticleDialogExit" />
    <v-toolbar flat class="mt-5" :color="$vuetify.theme.dark == true ? '#121212' : ''">
      <div
        v-if="$vuetify.breakpoint.name == 'md' || $vuetify.breakpoint.name == 'lg' || $vuetify.breakpoint.name == 'xl'"
        class="display-1 dark_text--text mt-n5"
      >
        {{ CurrentView == "LIST_VIEW" ? "Publish" : StoreObj.action == "CREATE" ? "Publish Article" : "Edit Article" }}
      </div>
      <v-spacer />
      <!-- =========================== LIST VIEW ============================= -->
      <v-text-field
        v-if="CurrentView == 'LIST_VIEW'"
        dense
        outlined
        clearable
        label="Search"
        v-model="search"
        prepend-inner-icon="mdi-magnify"
        color="primary"
        :class="$vuetify.breakpoint.name == 'sm' || $vuetify.breakpoint.name == 'xs' ? 'mt-2 mr-2 ml-n3' : 'mt-3 mr-4'"
        :style="$vuetify.breakpoint.name == 'sm' || $vuetify.breakpoint.name == 'xs' ? 'max-width: 300px;' : 'max-width: 250px;'"
      >
      </v-text-field>
      <v-menu v-model="FilterMenu" bottom offset-y :close-on-content-click="false">
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-if="CurrentView == 'LIST_VIEW'" small color="primary" fab v-on="on" v-bind="attrs" class="elevation-1 mt-n5">
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
      <v-tooltip bottom v-if="CurrentView == 'LIST_VIEW'">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-if="CurrentView == 'LIST_VIEW'"
            small
            fab
            v-on="on"
            v-bind="attrs"
            color="primary"
            class="elevation-1 mt-n5 ml-3"
            @click="checkItem(undefined, 'CREATE', undefined)"
          >
            <v-icon> mdi-plus </v-icon>
          </v-btn>
        </template>
        <span class="white--text"> Publish Article</span>
      </v-tooltip>
      <!-- =========================== PUBLISH VIEW ============================= -->
      <v-btn
        v-if="CurrentView == 'DETAIL_VIEW'"
        small
        class="borderRadius text-capitalize mt-n5 mr-2"
        color="primary"
        outlined
        @click="(CurrentView = 'LIST_VIEW'), renderPageMethod()"
        ><v-icon small class="mr-1">mdi-chevron-double-left</v-icon>back</v-btn
      >
      <v-btn
        v-if="CurrentView == 'DETAIL_VIEW'"
        small
        class="borderRadius text-capitalize mt-n5"
        color="primary"
        :loading="loading"
        @click="SaveMethod()"
        ><v-icon small class="mr-1">mdi-content-save</v-icon>save</v-btn
      >
    </v-toolbar>
    <v-row no-gutters v-if="CurrentView == 'LIST_VIEW'">
      <v-col cols="12" md="3" v-for="(item, idx) in ArticlesList" :key="idx">
        <v-hover v-slot="{ hover }">
          <v-card class="ma-2" :elevation="hover ? 12 : 2" :class="{ 'on-hover': hover }" :color="$vuetify.theme.dark == true ? '#272727' : ''">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn
                  fab
                  dark
                  small
                  color="orange"
                  :style="'position: absolute; right: 60px; z-index: 1'"
                  class="mt-2"
                  @click="checkItem(item, 'EDIT', idx)"
                  v-on="on"
                >
                  <v-icon> mdi-pencil</v-icon>
                </v-btn>
              </template>
              <span> Edit </span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn
                  fab
                  dark
                  small
                  color="red"
                  v-on="on"
                  :style="'position: absolute; right: 10px; z-index: 1'"
                  class="mt-2"
                  @click="checkItem(item, 'DELETE', idx)"
                >
                  <v-icon> mdi-delete</v-icon>
                </v-btn>
              </template>
              <span> Delete </span>
            </v-tooltip>
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
    <!-- ***************************************************************************************************** -->
    <v-card-text v-else-if="CurrentView == 'DETAIL_VIEW'">
      <v-form ref="form">
        <v-row no-gutters>
          <v-col cols="12" md="12">
            <v-text-field
              outlined
              dense
              label="Title"
              :rules="[(v) => !!v || 'Title is required']"
              v-model="article.article_title"
              :class="$vuetify.breakpoint.name == 'sm' || $vuetify.breakpoint.name == 'xs' ? 'mt-n4' : ''"
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" md="12">
            <v-text-field outlined dense label="Description" :rules="[(v) => !!v || 'Description is required']" v-model="article.article_description">
            </v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field outlined dense label="Image URL" :rules="[(v) => !!v || 'URL is required']" v-model="article.image_src"> </v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-select
              outlined
              dense
              :items="PublishCategoryItems"
              v-model="article.category"
              :rules="[(v) => !!v || 'Category is required']"
              label="Category"
              :class="$vuetify.breakpoint.name == 'sm' || $vuetify.breakpoint.name == 'xs' ? '' : 'ml-4'"
            ></v-select>
          </v-col>
          <v-col cols="12" md="12">
            <!-- <v-textarea rows="10" outlined dense label="Details" :rules="[(v) => !!v || 'Details are required']" v-model="article.article_data"> 
            </v-textarea> -->
            <vue-editor v-model="article.article_data"></vue-editor>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </div>
</template>

<script>
import Snackbar from "@/components/Extras/Snackbar.vue";

import DeleteArticle from "@/components/Publish/Dialogs/DeleteArticle.vue";

import { VueEditor } from "vue2-editor";

export default {
  data: () => ({
    renderPage: true,
    article: {
      article_title: "",
      article_description: "",
      article_data: "",
      image_src: "",
      created_on: 0,
      category: "",
      published_by: "Admin",
      publisher_email_id: "",
      favourite: false,
    },
    ArticlesList: [],
    search: "",
    StoreObj: {},
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
    PublishCategoryItems: [
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
    loading: false,
    DeleteArticleDialog: false,
    SnackBarComponent: {},
  }),
  components: {
    Snackbar,
    VueEditor,
    DeleteArticle,
  },
  async mounted() {
    this.ArticlesList = this.$store.getters.get_articles_list.filter(
      (itm) => itm.publisher_email_id === this.$store.getters.get_current_user_details.user_email_id
    );
    this.$store.commit("SET_PREVIOUS_ROUTE", this.$store.getters.get_current_route);
    this.$store.commit("SET_CURRENT_ROUTE", this.$route.name);

    if (this.$store.getters.get_previous_route != this.$route.name && this.$store.getters.get_from_detail_view == true) {
      this.$store.commit("SET_DETAIL_VIEW", false);
      this.$router.push("/" + this.$store.getters.get_previous_route);
    }
    this.CurrentView = "LIST_VIEW";
    this.FilterMethod();
    console.warn("ArticlesList", this.ArticlesList);
  },
  watch: {
    search(val) {
      if (val == "" || val == null) {
        this.ArticlesList = this.$store.getters.get_articles_list.filter(
          (itm) => itm.publisher_email_id == this.$store.getters.get_current_user_details.user_email_id
        );
      } else {
        this.ArticlesList = this.$store.getters.get_articles_list
          .filter((itm) => itm.publisher_email_id == this.$store.getters.get_current_user_details.user_email_id)
          .filter((itm) => itm.article_title.toLowerCase().includes(val.toLowerCase()));
      }
    },
    CurrentView(val) {
      if (val == "DETAIL_VIEW") {
        this.$store.commit("SET_DETAIL_VIEW", true);
      } else {
        this.$store.commit("SET_DETAIL_VIEW", false);
      }
    },
  },
  methods: {
    renderPageMethod() {
      this.renderPage = false;
      this.$nextTick(() => {
        this.renderPage = true;
      });
    },
    checkItem(item, action, idx) {
      this.StoreObj = item == undefined ? {} : item;
      this.StoreObj.action = action;
      this.StoreObj.idx = idx;
      switch (action) {
        case "CREATE":
          this.article.article_title = "";
          this.article.article_description = "";
          this.article.article_data = "";
          this.article.image_src = "";
          this.article.category = "";
          this.CurrentView = "DETAIL_VIEW";
          break;
        case "EDIT":
          this.article.article_title = this.StoreObj.article_title;
          this.article.article_description = this.StoreObj.article_description;
          this.article.article_data = this.StoreObj.article_data;
          this.article.image_src = this.StoreObj.image_src;
          this.article.category = this.StoreObj.category;
          this.CurrentView = "DETAIL_VIEW";
          break;
        case "DELETE":
          this.DeleteArticleDialog = true;
          break;
      }
    },
    SaveMethod() {
      if (this.$refs.form.validate()) {
        if (this.StoreObj.action == "CREATE") {
          let article = {
            article_id: ++this.$store.getters.get_articles_list.length,
            article_title: this.article.article_title,
            article_description: this.article.article_description,
            article_data: this.article.article_data,
            image_src: this.article.image_src,
            created_on: new Date().getTime(),
            category: this.article.category,
            published_by: "Admin",
            publisher_email_id: "admin@articlz.com",
            favourite: false,
          };
          console.log("article", article);
          let article_list = this.$store.getters.get_articles_list;
          article_list.push(article);
          this.$store.commit("SET_ARTICLES_LIST", article_list);
          this.CurrentView = "LIST_VIEW";
          this.renderPageMethod();
        } else {
          this.ArticlesList[this.StoreObj.idx].article_title = this.article.article_title;
          this.ArticlesList[this.StoreObj.idx].article_description = this.article.article_description;
          this.ArticlesList[this.StoreObj.idx].article_data = this.article.article_data;
          this.ArticlesList[this.StoreObj.idx].image_src = this.article.image_src;
          this.ArticlesList[this.StoreObj.idx].category = this.article.category;
          this.$store.commit("SET_ARTICLES_LIST", this.ArticlesList);
          this.CurrentView = "LIST_VIEW";
          this.renderPageMethod();
        }
      } else {
        this.SnackBarComponent = {
          SnackbarVmodel: true,
          SnackbarColor: "red",
          Top: true,
          SnackbarText: "Please fill in required fields!",
        };
      }
    },
    FilterMethod() {
      // Fitler BY
      if (this.CategoryValue == "All")
        this.$store.getters.get_articles_list.filter((itm) => itm.published_by == this.$store.getters.get_current_user_details.user_email_id);
      else if (this.CategoryValue != "All")
        this.ArticlesList = this.$store.getters.get_articles_list
          .filter((itm) => itm.publisher_email_id == this.$store.getters.get_current_user_details.user_email_id)
          .filter((itm) => itm.category == this.CategoryValue);

      // Sort BY
      switch (this.SortByValue) {
        case "LATEST":
          this.ArticlesList = this.$store.getters.get_articles_list
            .filter((itm) => itm.publisher_email_id == this.$store.getters.get_current_user_details.user_email_id)
            .sort((a, b) => b.created_on - a.created_on);
          break;
        case "FIRST":
          this.ArticlesList = this.$store.getters.get_articles_list
            .filter((itm) => itm.publisher_email_id == this.$store.getters.get_current_user_details.user_email_id)
            .sort((a, b) => a.created_on - b.created_on);
          break;
        case "AZ":
          this.ArticlesList = this.$store.getters.get_articles_list
            .filter((itm) => itm.publisher_email_id == this.$store.getters.get_current_user_details.user_email_id)
            .sort((a, b) => a.article_title.toLowerCase().localeCompare(b.article_title.toLowerCase()));
          break;
        case "ZA":
          this.ArticlesList = this.$store.getters.get_articles_list
            .filter((itm) => itm.publisher_email_id == this.$store.getters.get_current_user_details.user_email_id)
            .sort((a, b) => b.article_title.toLowerCase().localeCompare(a.article_title.toLowerCase()));
          break;
      }
      this.FilterMenu = false;
    },
    DeleteArticleDialogExit(Toggle) {
      this.DeleteArticleDialog = false;
      if (Toggle == 2) {
        this.ArticlesList.splice(this.StoreObj.idx, 1);
        for (let i = 1; i <= this.ArticlesList.length; i++) {
          this.ArticlesList[i].article_id = i;
        }
        this.$store.commit("SET_ARTICLES_LIST", this.ArticlesList);
      }
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
