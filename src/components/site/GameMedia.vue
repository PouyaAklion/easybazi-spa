<template>
  <div class="media-section p-4">
    <div class="row m-3 p-3">
      <h4 class="d-inline-block mr-3">در رسانه ها</h4>
      <div class="d-flex flex-wrap">
        <a class="mr-1 card-link link-orange-active" href>همه</a>
        <a class="mr-1 card-link" href>ویدیو ها</a>
        <a class="mr-1 card-link" href>تصاویر</a>
      </div>
    </div>
    <div class="d-flex flex-wrap justify-content-center m-3 p-3">
      <div v-for="media in allMedia" class="card m-2" :key="media.id">
        <img
          class="card-img-top"
          src="/img/logo.png"
          alt="Card image cap"
        >
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "GameMedia",
  data() {
    return {
      allMedia: [1, 2, 3]
    };
  },
  methods: {
    async fetchData() {
      this.gameId = this.$route.params.id;
      await axios.get("/game-info-photos/" + this.gameId).then(response => {
        this.allMedia = response.data.data;
      });
    }
  },
  async created() {
    this.fetchData();
  },
  watch: {
    $route(to, from) {
      this.fetchData();
    }
  }
};
</script>

<style scoped>
.media-section {
  background-color: #fafafa;
}
.card {
  height: 100%;

  background: linear-gradient(to right, #eeeeee, #ebebeb);
  border: 0px;
  border-radius: 0px;
}
.card img {
  border-radius: 0px;
}
.card-img-top {
  max-height: 250px !important;
}
</style>