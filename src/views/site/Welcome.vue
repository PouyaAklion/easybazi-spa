<template>
  <div class>
    <TheHero/>
    <ThePlatforms/>
    <SearchInput id="learn_more"/>
    <TheSlogan/>
    <NewPosts/>
    <SignForm top="0px"/>
    <MainFooter/>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
// import SwiperSlider from "../components/SwiperSlider";

export default {
  // components: { SwiperSlider },
  layout: "basic",

  metaInfo() {
    return { title: "home" };
  },

  data: () => ({
    title: window.config.appName
  }),

  computed: mapGetters({
    authenticated: "auth/check"
  })
};
</script>

<style scoped>
.top-right {
  position: absolute;
  right: 10px;
  top: 18px;
}

.title {
  font-size: 85px;
}
</style>
