<template>
  <v-overlay :value="overlay" opacity="0.2">
    <v-progress-circular indeterminate color="primary" size="120"
      ><div v-text="count == undefined ? 'Loading ...' : count"></div
    ></v-progress-circular>
    <div class="PrimaryFontColorXSmall" v-if="count != undefined">Verifying...Please wait...</div>
  </v-overlay>
</template>
<script>
export default {
  props: {
    overlay: Boolean,
    count: Number,
  },
};
</script>
