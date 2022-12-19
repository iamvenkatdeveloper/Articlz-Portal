<template>
  <div>
    <v-dialog v-model="BecomePublisherDialog" persistent max-width="350px">
      <v-card>
        <v-toolbar dark dense class="elevation-0" color="primary">
          <v-icon dark class="mr-1"> mdi-account </v-icon>
          <div>Become Publisher</div>
          <v-spacer></v-spacer>
          <v-btn icon @click="BecomePublisherDialogEmit((Toggle = 1))"><v-icon>mdi-close</v-icon></v-btn>
        </v-toolbar>
        <v-card-text class="text-center mt-5 pb-0">
          <div>Are sure you want to become Publisher?</div>
        </v-card-text>
        <v-card-actions class="pb-4 mt-2">
          <v-spacer />
          <v-btn small class="borderRadius text-capitalize" color="primary" outlined @click="BecomePublisherDialogEmit((Toggle = 1))"
            ><v-icon small class="mr-1">mdi-close</v-icon>Cancel</v-btn
          >
          <v-btn small class="borderRadius text-capitalize mr-2" color="primary" :loading="loading" @click="BecomePublisherDialogEmit((Toggle = 2))"
            ><v-icon small class="mr-1">mdi-check</v-icon>Confirm</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  props: {
    BecomePublisherDialog: Boolean,
  },
  data: () => ({
    Toggle: 0,
    loading: false,
    SnackBarComponent: {},
  }),
  methods: {
    BecomePublisherDialogEmit(Toggle) {
      this.loading = true;
      if (Toggle == 2) {
        setTimeout(() => {
          this.loading = false;
          this.$emit("clicked", Toggle);
        }, 500);
      } else {
        this.loading = false;
        this.$emit("clicked", Toggle);
      }
    },
  },
};
</script>
