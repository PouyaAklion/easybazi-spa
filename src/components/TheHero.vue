<template>
  <div class="position-relative">
    <div class="d-flex justify-content-center">
      <div class="header d-flex justify-content-around mt-4 align-items-center my-3">
        <img v-bind:src="logoUrl" class="logo" alt>
        <span class="w-75"></span>
        <button v-if="!authenticated" @click="showSignForm" class="btn btn-info button-orange">ورود</button>
        <button v-else @click="pushToHome" class="btn btn-info button-orange">پروفایل</button>
      </div>
    </div>
    <div class="overlay"></div>
    <div class="gradient-overlay"></div>
    <div class="hero" v-bind:style="{ backgroundImage: `url(${imgUrl})` }">
      <div class="caption-wrapper">
        <h1 class>
          <span>کرایه اشتراک</span>
          <span>معاوضه بازی</span>
        </h1>
        <h3 class>
          <span>ارسال رایگان.</span>
          <span>تنوع محصولات</span>
        </h3>
        <button class="btn btn-info button-orange btn-search">جستوی بازی</button>
      </div>
    </div>
    <div class="learn-more">
      <a href="#learn_more">بیشتر</a>
      <a href="#learn_more">
        <img v-bind:src="indexImgUrl" alt>
      </a>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "TheHero",
  data() {
    return {
      imgUrl: "img/hero.jpg",
      logoUrl: "img/logo.png",
      indexImgUrl: "img/index.png",
      orangeColor: "#d65611"
    };
  },
  computed: mapGetters({
    authenticated: "auth/check"
  }),
  methods: {
    ...mapActions(["showSingForm"]),
    showSignForm() {
      this.$store.dispatch("modals/showSingForm");
    },
    pushToHome() {
      this.$router.push({ name: "home" });
    }
  }
};
</script>

<style scoped>
.header {
  position: absolute;
  width: 95%;
  z-index: 2;
}
.btn-orange {
  padding-right: 30px;
  padding-left: 30px;
  -webkit-box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.75);
}
.btn-orange:hover {
  padding-right: 30px;
  padding-left: 30px;
  -webkit-box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.75);
}
.logo {
  height: 70px;
}
.hero {
  height: 800px;
  width: 100%;
  width: 100%;
  background-size: cover;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  height: calc(100vh - 200px);
  min-height: 600px;
  max-height: 1440px;
}
.overlay {
  position: absolute;
  width: 100%;
  top: 0;
  height: calc(100vh - 200px);
  min-height: 600px;
  max-height: 1440px;
  background-color: rgba(0, 0, 0, 0.2);
}
.gradient-overlay {
  position: absolute;
  width: 100%;
  top: 0;
  height: calc(100vh - 200px);
  min-height: 600px;
  max-height: 1440px;
  background: linear-gradient(
    to left,
    rgba(0, 0, 0, 0.9) 0,
    rgba(0, 0, 0, 0.1) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00000000', endColorstr='#00000000', GradientType=1 );
}
.caption-wrapper {
  position: absolute;
  text-align: center;
  width: 100%;
}
.caption-wrapper h1 {
  margin-bottom: 5px;
  color: #fff;
  font-weight: 500;
  font-size: 56px;
  text-shadow: 2px 2px 2px #000;
}
.caption-wrapper h3 {
  margin-bottom: 48px;
  color: #a0a7a9;
  font-weight: 300;
  font-size: 32px;
  text-shadow: 2px 2px 2px #000;
}
.btn-search {
  font-size: 16px;
  padding: 8px 38px;
  -webkit-transform: scale(1.5, 1.5);
  transform: scale(1.5, 1.5);
  -webkit-box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.75);
}
.learn-more {
  display: flex;
  align-items: center;
  flex-direction: column;
  text-shadow: 2px 2px 2px #000;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  margin-bottom: -40px;
}
.learn-more a {
  background-color: transparent;
  color: #ffffff;
  text-decoration: none;
  cursor: pointer;
}
@media only screen and (min-width: 600px) {
  .gradient-overlay {
    max-height: 900px;
  }
  .hero {
    max-height: 900px;
  }
  body {
    background: red;
  }
}
</style>