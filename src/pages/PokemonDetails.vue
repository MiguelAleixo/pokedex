<style scoped>
.my-card {
  width: 100%;
  max-width: 550px;
}
.poke-colors {
  background-color: #eb6253;
  color: #fff;
}
.progress-bar {
  z-index: 1;
  position: absolute;
}
</style>

<template>
  <div style="background-color: rgba(235, 98, 83, 0.2);">
    <q-page>
      <q-toolbar style="z-index: 1" class="bg-red-5 text-white">
        <q-btn
          flat
          round
          dense
          icon="arrow_back"
          v-go-back="`/region/${this.$route.params.region}`"
          class="q-mr-sm"
        />
        <q-toolbar-title>
          <strong> {{ (data.details.name || "-") | capitalize }} </strong>
        </q-toolbar-title>
      </q-toolbar>
      <q-linear-progress
        v-if="data.isRequesting"
        class="progress-bar"
        color="amber-12"
        track-color="red"
        indeterminate
      />
      <div class="flex flex-center" style="height: 93vh;">
        <q-card class="my-card" v-if="!data.isRequesting">
          <q-card-section horizontal>
            <q-img
              class="col-7"
              :src="
                data.details.sprites.other['official-artwork']['front_default']
              "
            />
            <q-card-section>
              <div class="text-subtitle1">
                <strong> Nome: </strong>
                {{ (data.details.name || "-") | capitalize }}
              </div>
              <div class="text-subtitle1">
                <strong> Número: </strong> {{ data.details.order || "-" }}
              </div>
              <div class="text-subtitle1">
                <strong> Altura: </strong> {{ data.details.height || "-" }}
              </div>
              <div class="text-subtitle1">
                <strong> Peso: </strong> {{ data.details.weight || "-" }}
              </div>
              <div class="text-subtitle1">
                <strong> Habilidades: </strong>
              </div>
              <div
                class="text-subtitle1"
                v-for="(item, i) in data.details.abilities"
                :key="i"
              >
                {{ (item.ability.name || "-") | capitalize }}
              </div>
              <div class="text-subtitle1">
                <strong> Tipo: </strong>
              </div>
              <div
                class="text-subtitle1"
                v-for="(item, i) in data.details.types"
                :key="i+10"
              >
                {{ (item.type.name || "-") | capitalize }}
              </div>
            </q-card-section>
          </q-card-section>
        </q-card>
      </div>
    </q-page>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "PokemonDetails",
  computed: {
    ...mapGetters("details", ["data"]),
  },
  methods: {
    ...mapActions("details", ["getDetails"])
  },
  filters: {
    capitalize: function(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  },
  beforeMount() {
    const id = this.$route.params.id;
    this.getDetails(id);
  }
};
</script>
