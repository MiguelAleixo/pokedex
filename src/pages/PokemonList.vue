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
.q-field--outlined .q-field__control:hover:before {
  border-color: red;
}
</style>

<template>
  <q-page>
    <div>
      <q-toolbar style="z-index: 1" class="bg-red-5 text-white">
        <q-btn
          flat
          round
          dense
          icon="arrow_back"
          v-go-back="'/'"
          class="q-mr-sm"
        />
        <q-toolbar-title>
          <strong> Pokemons de {{ data.list.name | capitalize }} </strong>
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
        <div class="q-pa-sm">
          <q-input
            class="input"
            placeholder="Pesquisar Pokemon"
            color="amber-12"
            bg-color="white"
            rounded
            outlined
            @input="searchPokemon"
            v-model="search"
          >
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
      </q-toolbar>
      <q-list>
        <router-link
          :to="`/details/${data.list.name}/${pokemon['pokemon_species'].name}`"
          v-for="(pokemon, i) in fakeList"
          v-bind:key="i"
        >
          <q-item clickable v-ripple>
            <q-item-section>
              {{ pokemon["pokemon_species"].name | capitalize }}
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
          :max-pages="8"
          :boundary-numbers="true"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "PokemonList",
  data() {
    return {
      fakeList: [],
      pagination: {
        page: 1,
        rowsPerPage: 10,
        count: 0
      },
      order: false,
      pokemons: [],
      search: "",
      timeout: 0
    };
  },
  computed: {
    ...mapGetters("list", ["data"]),
    pagesNumber: {
      get: function() {
        return (
          Math.ceil(this.pagination.count / this.pagination.rowsPerPage) || 0
        );
      },
      set: function(value) {
        this.pagination.count = value;
      }
    }
  },
  methods: {
    ...mapActions("list", ["requestList", "orderList"]),
    paginate(value) {
      this.pagination.page = value;
      const copy = Object.assign([], this.pokemons);
      this.fakeList = copy.splice(
        (this.pagination.page - 1) * this.pagination.rowsPerPage,
        this.pagination.rowsPerPage
      );
    },
    async getList() {
      const id = this.$route.params.id;
      await this.requestList(id);
      this.constructByState();
    },
    orderAz(value) {
      if (value) {
        this.pokemons.sort((a, b) => {
          return a["pokemon_species"].name.localeCompare(
            b["pokemon_species"].name
          );
        });
        const payload = {
          order: value,
          page: this.pagination.page,
          results: this.pokemons
        };
        this.orderList(payload);
        this.paginate(this.pagination.page);
      } else {
        // this.searchPokemon(this.search, 0);
        this.getList();
      }
    },
    searchPokemon(value, time = 500) {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.pokemons = [...this.data.list.results];
        this.pokemons = this.pokemons.filter(
          item =>
            item["pokemon_species"].name
              .toLowerCase()
              .indexOf(value.toLowerCase()) !== -1
        );
        this.pagesNumber = this.pokemons.length;
        this.paginate(1);
      }, time);
    },
    constructByState() {
      this.pokemons = [...this.data.list.results];
      this.pagination.count = this.data.list.count;
      this.order = this.data.list.order;
      this.pagination.page = this.data.list.page;
      this.paginate(this.pagination.page);
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
    if (
      !this.data.list.count ||
      this.data.list.name !== this.$route.params.id
    ) {
      this.getList();
    } else {
      this.constructByState();
    }
  }
};
</script>
