import Vue from "vue";
import Vuex from "vuex";

import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    CurrentUserDetails: {},
    ArticlesList: [],
    FavoritesArticlesList: [],
    CurrentRoute: "",
    CurrentIdx: 0,
  },
  getters: {
    get_current_user_details: (state) => {
      return state.CurrentUserDetails;
    },
    get_articles_list: (state) => {
      return state.ArticlesList;
    },
    get_favorites_articles_list: (state) => {
      return state.FavoritesArticlesList;
    },
    get_current_route: (state) => {
      return state.CurrentRoute;
    },
    get_current_idx: (state) => {
      return state.CurrentIdx;
    },
  },
  mutations: {
    SET_CURRENT_USER_DETAILS(state, CurrentUserDetails) {
      state.CurrentUserDetails = CurrentUserDetails;
    },
    SET_ARTICLES_LIST(state, ArticlesList) {
      state.ArticlesList = ArticlesList;
    },
    SET_FAVORITES_ARTICLES_LIST(state, FavoritesArticlesList) {
      state.FavoritesArticlesList = FavoritesArticlesList;
    },
    SET_CURRENT_ROUTE(state, CurrentRoute) {
      state.CurrentRoute = CurrentRoute;
    },
    SET_CURRENT_IDX(state, CurrentIdx) {
      state.CurrentIdx = CurrentIdx;
    },
  },
  actions: {},
  modules: {},
  plugins: [createPersistedState()],
});
