<template>
  <div>
    <h5 class="mb-3">آخرین بازی هایی که تا الان کرایه کرده اید:</h5>
    <div class="items-wrapper d-flex flex-row flex-wrap align-content-center">
      <div
        v-for="item in rentItems"
        :key="item.game_for_rent.game_info.id"
        @click="pushToGameRentPage(item.game_for_rent.game_info.name,item.game_for_rent.game_info.id)"
        class="item-wrapper m-3 p-1"
      >
        <div class="d-flex p-2">
          <img class="img-item" :src="item.game_for_rent.game_info.photos[0].url" alt>
          <div class="flex-grow-1 d-flex flex-column text-left">
            <span class="p-1">{{item.game_for_rent.game_info.name}}</span>
            <span class="p-1">Region: {{item.game_for_rent.region}}</span>
            <span class="p-1">اجاره {{item.rent_type.day_count}} روزه</span>
            <span v-if="item.is_finish==1" class="p-1">وضعیت:تمام شده</span>
            <span v-else-if="item.is_success==1" class="p-1">وضعیت:دریافت شده</span>
            <span v-else-if="item.is_sent==1" class="p-1">وضعیت:ارسال شده</span>
            <span v-else class="p-1">وضعیت:درحال ارسال</span>
          </div>
        </div>
        <div class="d-flex justify-content-around align-items-center item-bottom">
          <span>مهلت پایان اجاره: {{ item.finished_at | moment("jYYYY/jM/jD") }}</span>
          <button class="btn btn-info button-orange item-bottom">{{item.rent_price}} تومان</button>
        </div>
      </div>
    </div>
    <h5 class="mb-3">آخرین بازی هایی که تا الان خریده اید:</h5>
    <div class="items-wrapper d-flex flex-row flex-wrap align-content-center">
      <div
        v-for="item in shopItems"
        :key="item.game_for_shop.game_info.id"
        @click="pushToGameShopPage(item.game_for_shop.game_info.name,item.game_for_shop.game_info.id)"
        class="item-wrapper m-3 p-1"
      >
        <div class="d-flex p-2">
          <img class="img-item" :src="item.game_for_shop.game_info.photos[0].url" alt>
          <div class="flex-grow-1 d-flex flex-column text-left">
            <span class="p-1">{{item.game_for_shop.game_info.name}}</span>
            <span class="p-1">Region: {{item.game_for_shop.region}}</span>
            <span v-if="item.is_finish==1" class="p-1">وضعیت:تمام شده</span>
            <span v-else-if="item.is_success==1" class="p-1">وضعیت:دریافت شده</span>
            <span v-else-if="item.is_sent==1" class="p-1">وضعیت:ارسال شده</span>
            <span v-else class="p-1">وضعیت:درحال ارسال</span>
          </div>
        </div>
        <div class="d-flex justify-content-around align-items-center item-bottom">
          <span>تاریخ خرید: {{ item.created_at | moment("jYYYY/jM/jD") }}</span>
          <button class="btn btn-info button-orange item-bottom">{{item.game_price}} تومان</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import swal from "sweetalert2";

export default {
  name: "UserItem",
  data() {
    return {
      rentItems: [],
      shopItems: []
    };
  },
  created: function() {
    this.fetchData();
    let somedate = new Date();
  },
  methods: {
    async fetchData() {
      await axios
        .get("/user-game-for-rent-requests")
        .then(response => {
          this.rentItems = response.data.data;
        })
        .catch(error => {});
      await axios
        .get("/user-game-for-shop-requests")
        .then(response => {
          this.shopItems = response.data.data;
        })
        .catch(error => {});
    },
    pushToGameRentPage(gameName, gameId) {
      this.$router.push({
        path: `/game/${gameName.split(" ").join("-")}/${gameId}/rent`
      });
    },
    pushToGameShopPage(gameName, gameId) {
      this.$router.push({
        path: `/game/${gameName.split(" ").join("-")}/${gameId}/sale`
      });
    }
  }
};
</script>

<style scoped>
.items-wrapper {
  height: auto;
}

.item-wrapper {
  min-width: 310px;
  max-width: 310px;
  height: 200px;
  border-radius: 20px;
  background-color: #ebebeb;
}

.img-item {
  width: 110px;
  height: 130px;
  border-radius: 15px;
}
.item-wrapper:hover {
  border: 1px solid #d65611;
  cursor: pointer;
}

.item-bottom {
  font-size: 0.9em;
}
</style>