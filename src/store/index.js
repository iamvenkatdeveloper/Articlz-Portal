import Vue from "vue";
import Vuex from "vuex";

import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    CurrentUserDetails: {},
    ArticlesList: [],
    FavoritesArticlesList: [],
    PreviousRoute: "",
    CurrentRoute: "",
    CurrentIdx: 0,
    fromDetailView: false,
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
    get_previous_route: (state) => {
      return state.PreviousRoute;
    },
    get_current_idx: (state) => {
      return state.CurrentIdx;
    },
    get_from_detail_view: (state) => {
      return state.fromDetailView;
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
    SET_PREVIOUS_ROUTE(state, PreviousRoute) {
      state.PreviousRoute = PreviousRoute;
    },
    SET_CURRENT_IDX(state, CurrentIdx) {
      state.CurrentIdx = CurrentIdx;
    },
    SET_DETAIL_VIEW(state, fromDetailView) {
      state.fromDetailView = fromDetailView;
    },
  },

  actions: {},
  modules: {},
  plugins: [createPersistedState()],
});
