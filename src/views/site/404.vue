<template>
  <!--<card class="text-center">-->
  <!--<div class="links">-->
  <!--<router-link :to="{ name: 'welcome' }">-->
  <!--Home-->
  <!--</router-link>-->
  <!--</div>-->
  <!--</card>-->
  <div class="main-notfound">
    <div class="main2">
      <div class="main3"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound"
};
</script>


<style lang="scss">
@import "~compass-mixins/lib/compass";
@import "~compass-mixins/lib/animate";
*,
*:after,
*:before {
  @include box-sizing(border-box);
}
.main-notfound {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #1a1a1a;
  font-family: IRANSans;
  overflow: hidden;
  color: #1a1a1a;
  &:after,
  &:before {
    content: "404";
    position: absolute;
    font-size: 100px;
    left: 0;
    right: 0;
    text-align: center;
    bottom: 340px;
    font-weight: 600;
    z-index: 200;
  }
  &:before {
    content: "صفحه مورد نظر پیدا نشد!";
    font-size: 22px;
    font-weight: 400;
    bottom: 330px;
  }
}

.main2 {
  display: block;
  width: 35px;
  height: 140px;
  background: #646464;
  border-bottom: 10px solid #333;
  margin: auto;
  @include transform-origin(50%, 100%);
  @include animation(5s find linear infinite);
  @include border-bottom-radius(4px);
  position: absolute;
  left: 0;
  right: 0;
  bottom: -5px;
  &:after {
    content: "";
    position: absolute;
    border-style: solid;
    border-width: 25px 25px 0 25px;
    border-color: #333 transparent transparent transparent;
    width: 85px;
    left: -25px;
    top: 0;
    @include box-shadow(0px -10px 0 #feaf33);
  }
  &:before {
    content: "";
    position: absolute;
    width: 8px;
    height: 15px;
    background: #feaf33;
    left: 0;
    right: 0;
    margin: auto;
    top: 40px;
    @include border-radius(6px);
    @include box-shadow(0px 0 1px 2px #333);
  }
}

.main3 {
  display: block;
  width: 250px;
  height: 200px;
  background: #fffee2;
  @include border-radius(50%);
  position: absolute;
  left: -107px;
  bottom: 270px;
  margin: auto;
  text-align: center;
  color: #333;
  font-size: 90px;
  line-height: 200px;
  font-weight: 600;
  &:after {
    content: "";
    position: absolute;
    border-style: solid;
    border-width: 190px 75px 0 75px;
    border-color: rgba(255, 254, 226, 0.3) transparent transparent transparent;
    width: 230px;
    left: 10px;
    top: 100%;
    @include translateY(-60px);
  }
}
@include keyframes(find) {
  25% {
    @include rotate(25deg);
  }
  0%,
  50%,
  100% {
    @include rotate(0deg);
  }
  75% {
    @include rotate(-25deg);
  }
}
</style>
