<template>
  <div id="app">
    <div class="navbar-fixed">
      <nav>
        <div class="nav-wrapper teal darken-4">
          <a href="#" class="brand-logo center">Vue TV Series</a>
          <ul id="nav-mobile" class="right">
            <li><a href="#">GitHub</a></li>
          </ul>
        </div>
      </nav>
    </div>

    <div class="container" style="margin-top:30px">
      <ul>
        <li v-for="(error, index) of errors" :key="index">
          field <b>{{ error.field }}</b> - {{ error.defaultMessage }}
        </li>
      </ul>
      <a
        @click="enableForm(true)"
        class="waves-effect waves-dark teal darken-2 btn-small"
        style="margin-bottom: 20px;"
      >
        New Series<i class="material-icons left">create</i>
      </a>
      <form @submit.prevent="save" id="register-form">
        <div class="box-form">
          <label for="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Name"
            v-model="series.name"
          />
          <label for="description">Description</label>
          <input
            type="text"
            id="description"
            placeholder="Description"
            v-model="series.description"
          />
          <label for="description">Genres</label>
          <input
            type="text"
            id="genres"
            placeholder="Genres"
            v-model="series.genres"
          />
          <label for="description">Rent Value</label>
          <input
            type="number"
            step=".01"
            id="rent"
            placeholder="Rent Value"
            v-model="series.rentValue"
          />
          <label for="seasons">Seasons</label>
          <input
            type="number"
            id="seasons"
            placeholder="Seasons"
            v-model="series.seasons"
          />
          <label for="year">Year</label>
          <input
            type="number"
            id="seasons"
            placeholder="Year"
            v-model="series.year"
          />

          <button class="waves-effect waves-dark teal darken-2 btn-small">
            Save<i class="material-icons left">save</i>
          </button>
        </div>
        <table
          class="responsive-table striped grey lighten-1"
          style="margin-bottom:30px; margin-top:30px; border:2px solid teal; font-size:12px; color: #333;"
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Genres</th>
              <th>Rent Value</th>
              <th>Seasons</th>
              <th>Year</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="series of seriesList" :key="series.id">
              <td style="font-weight: bold; width: 15%;">{{ series.name }}</td>
              <td>
                {{ series.description }}
              </td>
              <td>{{ series.genres }}</td>
              <td>${{ series.rentValue }}</td>
              <td>{{ series.seasons }}</td>
              <td>{{ series.year }}</td>
              <td>
                <a
                  @click="edit(series)"
                  class="waves-effect btn-small blue darken-2"
                >
                  <i class="material-icons">create</i>
                </a>
                <a
                  @click="remove(series)"
                  class="waves-effect btn-small red darken-2"
                >
                  <i class="material-icons">delete_sweep</i>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  </div>
</template>

<script>
import Series from "./services/series";

export default {
  data() {
    return {
      series: {
        id: null,
        name: null,
        description: null,
        genres: null,
        rentValue: null,
        seasons: null,
        year: null,
      },
      seriesList: [],
      errors: [],
    };
  },

  mounted() {
    this.listAll();
  },

  methods: {
    listAll() {
      Series.listAll().then((res) => {
        this.seriesList = res.data;
      });
    },

    save() {
      this.enableForm(false);

      if (!this.series.id) {
        Series.save(this.series)
          .then(() => {
            this.series = {};
            this.errors = [];
            this.listAll();
            alert(`Saved!`);
          })
          .catch((e) => {
            this.errors = e.response.data.errors;
          });
      } else {
        Series.update(this.series)
          .then(() => {
            this.series = {};
            this.errors = [];
            this.listAll();
            alert(`Updated!`);
          })
          .catch((e) => {
            this.errors = e.response.data.errors;
          });
      }
    },

    edit(series) {
      this.enableForm(true);
      this.series = series;
      this.disableInputs(false);
      document.querySelector("#name").focus();
    },

    remove(series) {
      this.series = series;
      this.disableInputs(true);

      if (confirm(`Are you sure you want to delete '${this.series.name}'?`)) {
        Series.delete(series)
          .then(() => {
            this.series = {};
            this.listAll();
            this.errors = [];
            alert("Deleted!");
          })
          .catch((e) => {
            this.errors = e.response.data.errors;
          });
      }
    },

    disableInputs(value) {
      document.querySelectorAll("input").forEach((element) => {
        element.disabled = value;
      });
    },

    enableForm(isEnable) {
      if (isEnable)
        document.querySelector(".box-form").classList.add("box-form-enabled");
      else
        document
          .querySelector(".box-form")
          .classList.remove("box-form-enabled");
    },
  },
};
</script>

<style>
.box-form {
  display: none;
}

.box-form-enabled {
  display: block !important;
}
</style>
