<template>
  <div class="d-flex flex-wrap justify-content-around">
    <a href="#">
      <img v-bind:src="xboxImgUrl" alt>
    </a>
    <a href="#">
      <img v-bind:src="ps4ImgUrl" alt>
    </a>
  </div>
</template>

<script>
export default {
  name: "ThePlatforms",
  data() {
    return {
      ps4ImgUrl: "img/icon-platform-ps4.png",
      xboxImgUrl: "img/icon-platform-xone.png",
      isacrive: true
    };
  }
};
</script>

<style scoped>
a {
  padding: 10px;
  font-size: 14px;
}
a img {
  position: relative;
  height: 30px;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=50)";
  filter: alpha(opacity=50);
  -moz-opacity: 0.5;
  opacity: 0.5;
  -khtml-opacity: 0.5;
}

a img:hover {
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
  filter: alpha(opacity=100);
  -moz-opacity: 1;
  opacity: 1;
  -khtml-opacity: 1;
}
</style>