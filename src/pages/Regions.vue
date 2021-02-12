<style scoped>
a {
  color: inherit;
  text-decoration: inherit;
}
.rounded {
  border-radius: 0 0 20px 20px;
}
.progress-bar {
  z-index: 1;
  position: absolute;
}
</style>

<template>
  <q-page>
    <div>
      <q-toolbar class="bg-red-5 text-white" style="z-index: 1">
        <q-toolbar-title>
          <strong> Regiões </strong>
        </q-toolbar-title>
      </q-toolbar>
      <q-linear-progress
        class="progress-bar"
        v-if="data.isRequesting"
        color="amber-12"
        track-color="red"
        indeterminate
      />
      <q-toolbar class="bg-red-5 text-white rounded shadow-2">
        <div class="q-pa-sm flex column" style="align-items: center">
          <p class="text-bold" style="margin: 0">
            A-Z
          </p>
          <q-toggle
            color="amber-12"
            v-model="order"
            val="battery"
            @input="orderAz"
          />
        </div>
      </q-toolbar>

      <q-list>
        <router-link
          :to="`/region/${region.name}`"
          v-for="(region, i) in regions"
          :key="i"
        >
          <q-item clickable v-ripple>
            <q-item-section>
              {{ region.name | capitalize }}
            </q-item-section>
          </q-item>
        </router-link>
      </q-list>
      <div class="row justify-center q-mt-md">
        <q-pagination
          :value="pagination.page"
          color="red-5"
          text-color="white"
          :max="pagesNumber"
          @input="paginate"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Regions",
  data() {
    return {
      pagination: {
        page: 1,
        rowsPerPage: 10
      },
      order: false,
      regions: []
    };
  },
  computed: {
    ...mapGetters("regions", ["data"]),
    pagesNumber() {
      const { count } = this.data.regions;
      return Math.ceil(count / this.pagination.rowsPerPage) || 0;
    }
  },
  methods: {
    ...mapActions("regions", ["requestRegions", "orderRegions"]),
    async getRegions() {
      await this.requestRegions(this.pagination);
      this.contructByState();
    },
    paginate(value) {
      this.order = false;
      this.pagination.page = value;
      this.getRegions();
    },
    orderAz(value) {
      if (value) {
        this.regions.sort((a, b) => a.name.localeCompare(b.name));
        const payload = {
          order: value,
          page: this.pagination.page,
          results: this.regions
        };
        this.orderRegions(payload);
      } else {
        this.getRegions();
      }
    },
    contructByState() {
      this.regions = [...this.data.regions.results];
      this.order = this.data.regions.order;
      this.pagination.page = this.data.regions.page;
    }
  },
  filters: {
    capitalize: function(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  },
  beforeMount() {
    if (!this.data.regions.count) {
      this.getRegions();
    } else {
      this.contructByState();
    }
  }
};
</script>
