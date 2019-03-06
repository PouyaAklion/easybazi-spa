<template>
  <div>
    <TheCarousel></TheCarousel>
    <div class="container-fluid p-0 pt-3 pt-sm-5 pb-sm-3">
      <div class="flex">
        <a class="btn-custom" href="games/xbox-one">Xbox One</a>
        <a class="btn-custom" href="games/ps4">PlayStaion 4</a>
        <!--<a class="btn-custom" href="games/xbox-one">موارد جدید به زوری افزوده میشود...</a>-->
      </div>
      <h1 class="mt-5">همه کنسول ها</h1>
      <h3 class="mt-4 mb-2">پرطرفدار ترین های کرایه ای</h3>

      <SwiperSlider content="popularRents"></SwiperSlider>
      <br>
      <br>
      <br>
      <h3 class="mt-4 mb-2">پرفروش ترین</h3>
      <SwiperSlider content="mostSale"></SwiperSlider>
      <br>
      <br>
      <br>
      <br>
      <!--<h3 class="mt-4 mb-2">جدید ترین</h3>-->
      <!--<swiper-slider content="newGames"></swiper-slider>-->
    </div>
    <MainFooter></MainFooter>
  </div>
</template>

<script>
export default {
  name: "games"
};
</script>

<style scoped>
.btn-custom {
  border-radius: 20px;
  padding: 6px 9px;
  min-width: 130px;
  text-align: center;
  border: 1px solid #cfd2d3;
  color: #d65611 !important;
  text-decoration: none;
  background-color: #ffffff;
}

.btn-custom:hover {
  background-color: #f2f3f3;
}
</style>