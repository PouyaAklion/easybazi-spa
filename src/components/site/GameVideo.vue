<template>
  <div>
    <div class="video-wrap">
      <div v-if="isGameReceive" class="video-container">
        <video v-if="isGameReceive" ref="videoElement" autoplay loop>
          <source :src="game.game_info.videos[0].url" type="video/mp4">
        </video>
      </div>
    </div>
    <div v-if="isGameReceive" class="row m-3 p-3">
      <div class="col-md-6">
        <div id="tt1" class="d-flex game-container">
          <div class="game-img-container m-2">
            <img class="mb-4" :src="game.game_info.photos[0].url" alt>
            <span class="p-2">
              <span class="mt-4" v-if="game.count!=0">
                <span class="available-bullet"></span>
                <span class="ml-4">موجود</span>
              </span>
              <span v-else>
                <span class="available-bullet non-available-bullet"></span>
                <span class="ml-4">ناموجود</span>
              </span>
            </span>
          </div>
          <div class="game-info-container ml-auto">
            <div class="d-flex flex-column m-2 align-items-end">
              <h4 class="p-2 game-card-name">{{game.game_info.name}}</h4>
              <h5 class="p-2">Region: {{game.region}}</h5>
              <span class="p-2">
                <img
                  v-if="game.game_info.console.name=='ps4'"
                  class="d-block ml-auto"
                  src="http://localhost/izibazi/assets/img/icon-platform-ps4.png"
                  height="20px"
                  width="100px"
                >
                <img
                  v-else
                  src="http://localhost/izibazi/assets/img/icon-platform-xone.png"
                  height="18px"
                  width="100px"
                >
              </span>
              <h5 class="p-2 game-card-name">{{game.price}} تومان</h5>
              <div v-if="this.rentOrSale=='rent'&&this.rentOptions!=[]" class="p-2">
                <button
                  v-for="option in rentOptions"
                  :id="'btnOpt'+option.day_count"
                  :key="option.id"
                  v-on:click="setRentDay($event,option.day_count)"
                  class="btn btn-day-number mb-2 mr-1"
                >{{option.day_count}} روز</button>
                <button
                  id="btnSubmitRent"
                  @click="showRentModal"
                  class="p-2 btn btn-info button-orange mb-2 game-card-btn"
                  disabled
                  data-toggle="modal"
                  data-target="#rentModal"
                >کرایه</button>
              </div>
              <div v-else>
                <button
                  id="btnSubmitshop"
                  class="p-2 btn btn-info button-orange mb-2 game-card-btn"
                >خرید</button>
              </div>
            </div>
          </div>
        </div>
        <p class="alert-warning rounded mt-3 p-3">
          کاربر گرامی برای کرایه هر بازی لازم است حداقل ارزش بازی را به
          عنوان ودیعه پرداخت کنید
        </p>
      </div>
      <div class="col-md-6">
        <div id="tt2" class="game-container p-2">
          <h5 class="m-2">بازی های مشابه:</h5>
          <RelatedSwiper :action="rentOrSale" :id="game.id"></RelatedSwiper>
        </div>
      </div>
    </div>
    <game-navbar></game-navbar>
    <div v-if="isGameReceive" class="row m-3 p-3">
      <p>{{game.game_info.description}}</p>
    </div>
    <GameComments v-if="isGameReceive" :id="game.game_info.id"></GameComments>

    <!-- Modal -->
    <div
      v-if="authCheck"
      class="modal"
      id="rentModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">فرآیند خرید</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body text-center">
            <transition name="fade" mode="out-in">
              <div v-if="step==1" key="1">
                <img src="/img/cash.svg" height="160" alt>
                <h6 class="mt-2">روش پرداخت خود را انتخاب کنید</h6>
                <button
                  v-if="userBalance||userBalance>rentPrice"
                  class="btn btn-info button-orange mb-1"
                  @click="paymetnAction(0)"
                >
                  <i class="far fa-id-badge"></i>
                  کیف پول
                </button>
                <button class="btn btn-info button-orange mb-1" @click="paymetnAction(1)">
                  <i class="far fa-credit-card"></i>
                  درگاه پرداخت
                </button>
              </div>
              <div v-if="step===2" key="2">
                <img src="/img/address.svg" height="130" alt>
                <h6 class="mt-2">مشخصات محل سکونت خود را وارد کنید</h6>
                <div class="row p-4">
                  <div class="col-md-6">
                    <select
                      v-model="address.state_id"
                      name="state"
                      @change="getCitis(address.state_id)"
                      class="form-control m-1"
                      :class="{'is-invalid':address.errors.has('state')}"
                    >
                      <option
                        v-for="state in states"
                        :value="state.id"
                        :key="state.id"
                      >{{state.name}}</option>
                    </select>
                    <has-error :form="address" field="state"></has-error>
                    <input
                      v-model="address.home_phone_number"
                      name="phoneNumber"
                      type="tel"
                      class="form-control m-1"
                      :class="{'is-invalid':address.errors.has('phoneNumber')}"
                      placeholder="شماره تلفن"
                    >
                    <has-error :form="address" field="phoneNumber"></has-error>
                  </div>
                  <div class="col-md-6">
                    <select
                      v-model="address.city_id"
                      name="city"
                      class="form-control m-1"
                      :class="{'is-invalid':address.errors.has('city')}"
                    >
                      <option v-for="city in cities" :value="city.id" :key="city.id">{{city.name}}</option>
                    </select>
                    <has-error :form="address" field="city"></has-error>
                    <input
                      v-model="address.postcode"
                      name="postcode"
                      type="text"
                      class="form-control m-1"
                      :class="{'is-invalid':address.errors.has('postcode')}"
                      placeholder="کد پستی"
                    >
                    <has-error :form="address" field="postcode"></has-error>
                  </div>
                  <div class="col-12">
                    <textarea
                      v-model="address.content"
                      name="content"
                      class="form-control m-1"
                      :class="{'is-invalid':address.errors.has('content')}"
                      placeholder="آدرس خود را وارد کنید..."
                    ></textarea>
                    <has-error :form="address" field="content"></has-error>
                  </div>
                  <div class="col-8 m-auto text-center">
                    <button
                      class="btn btn-info button-orange btn-block m-2"
                      @click="rentGame"
                    >پرداخت</button>
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Form from "vform";
import swal from "sweetalert2";
import axios from "axios";

export default {
  name: "GameVideo",
  data() {
    return {
      step: 1,
      rentApi: "",
      states: [],
      cities: [],
      game: null,
      gameId: null,
      isGameReceive: false,
      videoElement: null,
      videoContainer: null,
      paused: true,
      overflowHeight: 0,
      rentOrSale: "",
      selectedDayRent: null,
      userBalance: null,
      rentPrice: null,
      rentOptions: [],

      address: new Form({
        state_id: Number,
        city_id: Number,
        postcode: String,
        home_phone_number: Number,
        content: String,
        latitude: 0,
        longitude: 0
      })
    };
  },
  methods: {
    updatePaused(event) {
      let vid = this.$refs.videoElement;
      this.paused = vid.paused;
      if (vid.paused) {
        vid.play();
      } else {
        vid.pause();
      }
    },
    getOverflowHeight(event) {
      if (
        $(".embed-responsive").css("height") >=
        $(".video-container").css("height")
      ) {
        this.overflowHeight =
          $(".embed-responsive").prop("scrollHeight") -
          $(document).height() * 0.9;
        let offset = this.overflowHeight;
        $(".game_container").css("bottom", offset);
        console.log(this.overflowHeight);
      } else {
        $(".game_container").css("bottom", 0);
      }
    },
    setRentDay(event, day) {
      $("#btnOpt7").removeClass("btn-day-number-active");
      $("#btnOpt10").removeClass("btn-day-number-active");
      $("#btnOpt20").removeClass("btn-day-number-active");
      $("#btnOpt30").removeClass("btn-day-number-active");

      event.target.classList.add("btn-day-number-active");
      this.selectedDayRent = day;
      this.rentPrice = (this.game.price * day) / 100;
      $("#btnSubmitRent").prop("disabled", false);
      $("#btnSubmitRent").html(this.rentPrice + " تومان");
    },
    async fetchData() {
      this.gameId = this.$route.params.id;
      this.rentOrSale = this.$route.params.action;
      if (this.rentOrSale == "rent") {
        console.log(this.gameId + "  " + this.rentOrSale);
        await axios.get("/game-for-rent/" + this.gameId).then(response => {
          this.game = response.data.data;
          this.isGameReceive = true;
        });
        await axios.get("/rent-type").then(response => {
          this.rentOptions = response.data.data;
        });
      } else if (this.rentOrSale == "sale") {
        console.log(this.gameId + "  " + this.rentOrSale);
        await axios.get("/game-for-shop/" + this.gameId).then(response => {
          this.game = response.data.data;
          this.isGameReceive = true;
        });
      }
    },
    async getUserBalance() {
      await axios
        .get("/user-finance")
        .then(response => {
          this.userBalance = response.data.data;
        })
        .catch(error => {});
    },
    showSignForm() {
      this.$store.dispatch("modals/showSingForm");
    },
    showRentModal() {
      if (!this.authCheck) {
        this.showSignForm();
        return;
      }
      this.step = 1;

      this.getStates();
      this.getAddress();
    },
    paymetnAction(action) {
      this.step++;
      if (action == 0) {
        this.rentApi = "/rent-game-with-wallet";
      } else if (action == 1) {
        this.rentApi = "/rent-game";
      }
    },
    async getAddress() {
      await axios
        .get("/user-last-address")
        .then(response => {
          if (response.data.status != 1) {
            swal({
              type: "خطا",
              title: "خطا",
              text: response.message,
              focusConfirm: false,
              confirmButtonColor: "#d65611",
              confirmButtonText: "باشه"
            });
            return;
          }

          let lastAddress = response.data.data;
          this.getCitis(lastAddress.state_id);
          this.address.state_id = lastAddress.state_id;
          this.address.city_id = lastAddress.city_id;
          this.address.content = lastAddress.content;
          this.address.postcode = lastAddress.postcode;
          this.address.home_phone_number = lastAddress.home_phone_number;
          this.address.postcode = lastAddress.postcode;
          this.address.latitude = lastAddress.latitude;
          this.address.longitude = lastAddress.longitude;
        })
        .catch(error => {
          swal.fire({
            type: "خطا",
            title: "خطا",
            text: "مشکل در برقراری ارتباط با سرور",
            focusConfirm: false,
            confirmButtonColor: "#d65611",
            confirmButtonText: "باشه"
          });
        });
    },
    async getStates() {
      await axios
        .get("/states")
        .then(response => {
          this.states = response.data.data;
        })
        .catch(error => {});
    },
    async getCitis(stateId) {
      await axios
        .get("/state/" + stateId + "/cities")
        .then(response => {
          this.cities = response.data.data;
          // console.log(this.cities);
        })
        .catch(error => {});
    },
    async rentGame() {
      if (!this.address.city_id) {
        this.address.errors.set("city", "شهر خود را انتخاب کنید");
        return;
      } else if (!this.address.state_id) {
        this.address.errors.clear("city");
        this.address.errors.set("state", "استان خود را وارد کنید");
        return;
      } else if (!this.address.postcode) {
        this.address.errors.clear("state");
        this.address.errors.set("postcode", "کد پستی خود را وارد کنید");
        return;
      } else if (!this.address.home_phone_number) {
        this.address.errors.clear("postcode");
        this.address.errors.set("phoneNumber", "شماره تلفن خود را وارد کنید");
        return;
      } else if (!this.validMobileNumber(this.address.home_phone_number)) {
        this.address.errors.set(
          "phoneNumber",
          "لطفا شماره موبایل 11 رقمی وارد کنید"
        );
        return;
      } else if (!this.address.content) {
        this.address.errors.clear("phoneNumber");
        this.address.errors.set("content", "آدرس خود را وارد کنید");
        return;
      }
      await this.address
        .post("/address")
        .then(response => {
          console.log(response);
        })
        .catch(error => {});
    },

    validMobileNumber: function(mobile) {
      var re = /^\d{4}\d{3}\d{4}$/;
      return re.test(mobile);
    }
  },
  computed: {
    ...mapGetters({
      currentGame: "game/currentGame",
      authCheck: "auth/check"
    }),
    playing() {
      return !this.paused;
    }
  },
  async created() {
    this.fetchData();
    this.getUserBalance();
  },
  mounted() {
    this.$nextTick(function() {
      window.addEventListener("load", this.getOverflowHeight);
      window.addEventListener("resize", this.getOverflowHeight);
      //Init
      this.getOverflowHeight();
    });
  },
  beforeDestroy() {
    window.removeEventListener("load", this.getOverflowHeight);
    window.removeEventListener("resize", this.getOverflowHeight);
  },
  watch: {
    $route(to, from) {
      this.fetchData();
    }
  }
};
</script>

<style scoped>
.video-wrap {
  width: 100%;
  max-height: 50% !important;
  /*max-width: 600px;*/
}

video {
  max-width: 100%;
}

.video-container {
  position: relative;
  overflow: hidden;
  height: 0;
  padding-bottom: 40%;
}

.video-container video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: fill;
}

.game-img-container {
  max-width: 150px;
  max-height: 175px;
  object-fit: contain;
  background: linear-gradient(to right, #eeeeee, #ebebeb);
  border-radius: 10px;
}

.game-img-container img {
  height: 100%;
  border-radius: 15px;
}

.game-container {
  min-height: 280px;
  background-color: #ebebeb;
  border-radius: 20px;
}

.game-card-btn {
  min-width: 100px;
}

.game-card-name {
  text-align: end;
}

.available-bullet {
  position: absolute;
  height: 15px;
  width: 15px;
  margin-top: 5px;
  border-radius: 50%;
  background-color: #00b04c;
}

.non-available-bullet {
  background-color: #b02011;
}

.btn-day-number:hover {
  background-color: rgba(214, 86, 17, 0.6);
}

.btn-day-number-active {
  background-color: rgba(214, 86, 17, 0.6);
}

.rent-modal {
  /*position: fixed;*/
  /*top: 42%;*/
  /*left: 42%;*/
  /*background-color: #d0d0d0;*/
  /*border-radius: 15px;*/
  /*height: 200px;*/
  /*width: 300px;*/
  /*z-index: 10000;*/
}

.alert-container {
  border-radius: 20px;
}

@media (max-width: 1100px) {
  .game-container {
    min-width: 265px;
  }
}

@media (max-width: 375px) {
  .game-img-container {
    max-height: 145.8px;
    max-width: 125px;
  }
}

/*.video-container {*/
/*position: relative;*/
/*top: 50px;*/
/*width: 100%;*/
/*height: 75% !important;*/
/*overflow: hidden;*/
/*}*/

/*.video-container video {*/
/*!*Make video to at least 100% wide and tall*!*/
/*width: 100%;*/
/*max-height: 100%;*/

/*!* Setting width & height to auto prevents the browser from stretching or squishing the video *!*/
/*!*width: auto;*!*/
/*height: auto;*/

/*!* Center the video *!*/
/*position: absolute;*/
/*top: 50%;*/
/*left: 50%;*/
/*transform: translate(-50%, -50%);*/

/*}*/

/*.game_container {*/
/*position: absolute;*/
/*bottom: 0px;*/
/*left: 0px;*/
/*height: 180px;*/
/*width: 100%;*/
/*background-color: rgba(0, 0, 0, 0.36);*/
/*z-index: 2;*/
/*}*/

/*.game-info {*/
/*position: absolute;*/
/*top: calc(50px + 90%)*/
/*}*/

/*.btn-play-control {*/
/*z-index: 4;*/
/*position: absolute;*/
/*bottom: 0;*/
/*right: 0;*/
/*cursor: pointer;*/
/*}*/
</style>