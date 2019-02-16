<template>
  <div>
    <footer id="footer" class="text-white">
      <div class="container p-5 text-dark">
        <div class="row">
          <div class="col-lg-4 col-md-4">
            <h5 class="pl-0 ml-0">
              <strong>پشتیبانی</strong>
            </h5>
            <ul class="list-group mb-5 py-2">
              <a class="list-group-item list-group-item-action pb-5 pl-1" href="#">
                <h6>مرکز پشتیبانی</h6>
              </a>
              <a class="list-group-item list-group-item-action pb-5 pl-1" href="#">
                <h6>ارتباط با ما</h6>
              </a>
              <a class="list-group-item list-group-item-action pb-5 pl-1" href="#">
                <h6>طرح های تشویقی</h6>
              </a>
            </ul>
          </div>
          <div class="col-lg-4 col-md-4">
            <h5 class="pl-0 ml-0">
              <strong>درباره ما</strong>
            </h5>
            <ul class="list-group mb-5 py-2">
              <a class="list-group-item list-group-item-action pb-5 pl-1" href="#">
                <h6>درباره ما</h6>
              </a>
              <a class="list-group-item list-group- item-action pb-5 pl-1" href="#">
                <h6>بلاگ</h6>
              </a>
              <a class="list-group-item list-group-item-action pb-5 pl-1" href="#">
                <h6>مرتبط</h6>
              </a>
              <a class="list-group-item list-group-item-action pb-5 pl-1" href="#">
                <h6>حریم خصوصی</h6>
              </a>
              <a class="list-group-item list-group-item-action pb-5 pl-1" href="#">
                <h6>قوانین سایت</h6>
              </a>
            </ul>
          </div>

          <div class="col-lg-4 col-md-4">
            <h5 class="pl-0 ml-0">
              <strong>کارت هدیه</strong>
            </h5>
            <ul class="list-group mb-5 py-2">
              <a class="list-group-item list-group-item-action pb-5 pl-1" href="#">
                <h6>معرفی به دوستان</h6>
              </a>
              <a class="list-group-item list-group-item-action pb-5 pl-1" href="#">
                <h6></h6>
              </a>
              <a class="list-group-item list-group-item-action pb-5 pl-1" href="#">
                <h6></h6>
              </a>
            </ul>
          </div>
        </div>
        <p class>&copy; تمامی حقوق مادی و معنوی متعلق به ایزی بازی است</p>
      </div>
      <div class="footer-img py-5" v-bind:style="{ 'background-image': 'url(' + image + ')' }">j</div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "MainFooter",
  data() {
    return {
      image: "img/footer-img.jpg"
    };
  }
};
</script>

<style scoped>
#footer {
  background-color: rgb(240, 240, 240);
  display: block;
  width: 100vw;
}

#footer a {
  margin-right: 0px;

  padding-right: 50px;
  color: #000000;
  text-decoration: none;
  height: 40px;
  font-size: 12px;
}

.item-contents {
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
  position: relative;
  height: inherit;
}

.list-group-item {
  background-color: rgb(240, 240, 240);
  border-color: rgb(240, 240, 240);
}

.footer-img {
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
}

p {
  opacity: 0.54;
  margin: 8px 0px;
  font-size: 16px;
}

a:hover {
  background-color: rgb(233, 233, 233);
  outline: 0;
}
</style>