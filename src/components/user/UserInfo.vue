<template>
  <div class="d-flex justify-content-between flex-wrap">
    <div class="user-info col-md-5 mb-2">
      <div class="d-flex align-items-center">
        <h5 class="p-3 mr-auto">اطلاعات کاربری شما :</h5>
        <a href="#tickets" class="btn btn-info button-orange">
          <i class="fa fa-envelope mr-1"></i>ارسال تیکت
        </a>
      </div>

      <div class="pl-4 d-flex">
        <span class>نام: {{user.full_name}}</span>
      </div>
      <div class="p-4 mt-3">
        <span>موجودی شما:</span>
        <span v-if="userBalance" class="balance p-1">{{userBalance.user_balance}} تومان</span>
      </div>
      <div class="p-4 d-flex flex-wrap align-items-center">
        <span class="mr-3 mb-2">افزایش اعتبار :</span>
        <div class="d-flex align-items-center">
          <!--<button id="btnSeven" v-on:click="setRentDay($event,7)" class="btn btn-day-number  mb-2">7</button>-->
          <!--<button id="btnTen" v-on:click="setRentDay($event,10)" class="btn btn-day-number mb-2">10</button>-->
          <!--<button id="btnTwenty" v-on:click="setRentDay($event,20)" class="btn btn-day-number mb-2">20-->
          <!--</button>-->
          <!--<button id="btnThrity" v-on:click="setRentDay($event,30)" class="btn btn-day-number mb-2">30-->
          <!--</button>-->
          <input
            type="text"
            class="form-control mr-4 mb-2"
            name="chargePrice"
            v-model="chargePrice"
            placeholder="به تومان وارد کنید..."
          >
          <has-error :form="chargeBalanceForm" field="chargePrice"/>
          <button
            id="btnSubmitRent"
            class="p-2 btn btn-info button-orange mb-2 game-card-btn"
          >پرداخت</button>
        </div>
      </div>
    </div>
    <div class="user-info col-md-6 mb-2"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Form from "vform";

export default {
  name: "UserInfo",
  data() {
    return {
      chargePrice: null,
      userBalance: null,
      chargeBalanceForm: new Form({})
    };
  },
  computed: {
    ...mapGetters({
      user: "auth/user"
    })
  },
  created() {
    this.fetchData();
  },
  methods: {
    setRentDay(event, day) {
      $("#btnSeven").removeClass("btn-day-number-active");
      $("#btnTen").removeClass("btn-day-number-active");
      $("#btnTwenty").removeClass("btn-day-number-active");
      $("#btnThrity").removeClass("btn-day-number-active");

      event.target.classList.add("btn-day-number-active");
      this.selectedDayRent = day;
    },
    async fetchData() {
      await axios
        .get("/user-finance")
        .then(response => {
          this.userBalance = response.data.data;
        })
        .catch(error => {});
    }
  },
  watch: {
    chargePrice() {
      const result = this.chargePrice
        .replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.$nextTick(() => (this.chargePrice = result));
    }
  }
};
</script>

<style scoped>
.user-info {
  height: auto;
  border-radius: 15px;
  background-color: #ebebeb;
}

.balance {
  position: relative;
  height: 80px;
  width: auto;
  background-color: #1b9a59;
  color: white;
  border-radius: 5px;
}

.btn-day-number:hover {
  background-color: rgba(214, 86, 17, 0.6);
}

.btn-day-number-active {
  background-color: rgba(214, 86, 17, 0.6);
}
</style>