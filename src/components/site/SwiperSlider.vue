<template>
  <div class="games-wrapper p-0">
    <div
      v-show="isSlidesReceive"
      class="swiper-container swiper-games"
      :class="'container-'+this.content"
      dir="ltr"
    >
      <slot name="before-wrapper"/>
      <div class="swiper-wrapper">
        <slot/>
        <div class="swiper-slide" v-for="(game, index) in games" :key="index">
          <!--:style="{left: `${virtualData.offset}px`,width:`178.2px`}"-->
          <div class="thumbnail-card">
            <div class="thumbnail-wrapper d-flex flex-column">
              <router-link
                v-if="content=='popularRents'"
                v-on:click.native="setCurrentGame"
                class="w-100"
                :to="{path:'/game/'+game.game_info.name.split(' ').join('-') + '/' +game.id+'/rent'}"
              >
                <div class="game-inslide-container">
                  <img class="w-100 game-img" :src="game.game_info.photos[0].url" alt="s">
                </div>
              </router-link>
              <router-link
                v-if="content=='mostSale'"
                v-on:click.native="setCurrentGame"
                class="w-100"
                :to="{path:'/game/'+game.game_info.name.split(' ').join('-') + '/' +game.id+'/sale'}"
              >
                <div class="game-inslide-container">
                  <img class="w-100 game-img" :src="game.game_info.photos[0].url" alt="s">
                </div>
              </router-link>
              <div class>
                <a href="#">
                  <p class="m-1">{{game.game_info.name}}</p>
                </a>
              </div>
              <div class>
                <p class="m-0 p-0">{{game.price}} تومان</p>
              </div>
              <div class="button-wrapper">
                <button :vs-color="orangeColor" class="btn btn-info button-orange mb-2 w-100">سفارش</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="swiper-scrollbar swiper-games-scrollbar" :class="'scrollbar-'+this.content"></div>
      <slot name="after-wrapper"/>
    </div>
    <div
      class="swiper-button-prev swiper-games-prev d-none d-sm-block"
      :class="this.content+'-prev'"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27 44">
        <path d="M0,22L22,0l2.1,2.1L4.2,22l19.9,19.9L22,44L0,22L0,22L0,22z"></path>
      </svg>
    </div>
    <div
      class="swiper-button-next swiper-games-next d-none d-sm-block"
      :class="this.content+'-next'"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27 44">
        <path d="M27,22L27,22L5,44l-2.1-2.1L22.8,22L2.9,2.1L5,0L27,22L27,22z"></path>
      </svg>
    </div>
  </div>
</template>

<script>
import {
  A11y,
  Keyboard,
  Navigation,
  Scrollbar,
  Swiper
} from "swiper/dist/js/swiper.esm.js";
import merge from "lodash-es/merge";
import axios from 'axios';
import { mapActions } from "vuex";

Swiper.use([Navigation, Keyboard, A11y, Scrollbar]);

export default {
  name: "SwiperSlider",
  props: {
    content: "",
    games: []
  },
  data() {
    return {
      orangeColor: "#d65611",

      isSlidesReceive: false
    };
  },
  computed: {
    defaultScrollbars() {
      return this.options.scrollbar && !this.options.scrollbar.el;
    },
    converGameNameToUrl() {}
  },

  watch: {
    options() {
      this.recreateSwiper();
    }
  },

  mounted() {
    this.recreateSwiper();
  },

  updated() {
    this.swiper.update();
  },

  beforeDestroy() {
    if (this.swiper) this.swiper.destroy();
  },
  async created() {
    if (this.content == "popularRents") {
      await axios.get("/game-for-rent-index/329").then(response => {
        this.games = response.data.data.data;
        this.isSlidesReceive = true;
      });
    }
    if (this.content == "mostSale") {
      await axios.get("/game-for-shop-index/329").then(response => {
        this.games = response.data.data.data;
        this.isSlidesReceive = true;
      });
    }
  },

  methods: {
    ...mapActions({
      setCurrentGame: "game/setCurrentGame"
    }),
    setCurrentGame() {
      this.$store.dispatch("game/setCurrentGame", this.games);
    },
    setGamesRoute() {
      this.updateRoute();
    },
    control(swiper) {
      this.controlled = swiper;
      this.recreateSwiper();
    },

    recreateSwiper() {
      if (this.swiper) this.swiper.destroy();

      this.swiper = new Swiper(
        ".container-" + this.content,
        merge(
          {
            preloadImages: false,
            keyboard: {
              enabled: true,
              onlyInViewport: true
            },
            a11y: true,
            // navigation: {},
            slidesPerView: 8,
            spaceBetween: 10,
            slidesPerGroup: 8,
            // observer: true,
            navigation: {
              nextEl: "." + this.content + "-next",
              prevEl: "." + this.content + "-prev"
            },
            breakpoints: {
              1260: {
                slidesPerView: 7,
                spaceBetween: 10,
                slidesPerGroup: 7
              },
              1080: {
                slidesPerView: 6,
                spaceBetween: 10,
                slidesPerGroup: 6
              },
              900: {
                slidesPerView: 5,
                spaceBetween: 10,
                slidesPerGroup: 5
              },
              720: {
                slidesPerView: 4,
                spaceBetween: 10,
                slidesPerGroup: 4
              },
              540: {
                slidesPerView: 3,
                spaceBetween: 10,
                slidesPerGroup: 3
              },
              361: {
                slidesPerView: 2,
                spaceBetween: 10,
                slidesPerGroup: 2,
                slidesOffsetBefore: 1
              }
            },
            scrollbar: {
              el: ".scrollbar-" + this.content,
              hide: true
            }
          },
          this.options,
          {
            controller: {
              control: this.controlled
            }
          }
        )
      );

      this.$emit("update:swiper", this.swiper);
    }
  }
};
</script>
<style scoped>
.games-wrapper {
  position: relative;
  width: 100%;
}
.swiper-slide {
  flex-shrink: 0;
  text-align: center;
  font-size: 18px;
  /*background: #fff;*/
  width: 100%;
  height: 100%;
  /*background-color: #fafafa;*/
}

.swiper-button-prev,
.swiper-button-next {
  transform: translateY(-50%);
  border-radius: 60px;
  z-index: 9999;
}
.swiper-button-prev {
  background-image: none;
  fill: #d65611;
  margin-left: -40px !important;
}
.swiper-button-next {
  background-image: none;
  fill: #d65611;
  margin-right: -40px !important;
}
.game-img {
  max-height: 200px;
  width: 100%;
}
.game-inslide-container {
  height: 175px;
  width: 150px;
  background-color: #ebebeb;
  border-radius: 20px;
}
.game-inslide-container img {
  height: 175px;
  width: 150px;
  border-radius: 20px;
}
@media (max-width: 900px) and (min-width: 361px) {
  .game-inslide-container {
    height: 145.8px;
    width: 125px;
    background-color: #ebebeb;
    border-radius: 20px;
  }
  .game-inslide-container img {
    height: 145.8px;
    width: 125px;
    border-radius: 20px;
  }
}
@media (min-width: 576px) {
  .games-wrapper {
    /*padding: 0 3rem !important;*/
  }
}
</style>