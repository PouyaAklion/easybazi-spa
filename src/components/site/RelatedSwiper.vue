<template>
  <div v-if="id" class="games-wrapper p-0">
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
          <div class="thumbnail-card">
            <div class="thumbnail-wrapper d-flex flex-column align-items-start">
              <router-link
                class="w-100"
                :to="{path:'/game/'+game.game_info.name.split(' ').join('-') + '/' +game.id+'/'+action}"
              >
                <div class="game-inslide-container">
                  <img class="w-100 game-img" :src="game.game_info.photos[0].url" alt="s">
                </div>
              </router-link>

              <div class>
                <a href="#">
                  <p class="mr-1 mt-1">{{game.game_info.name}}</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="swiper-scrollbar swiper-games-scrollbar" :class="'scrollbar-'+this.content"></div>
      <slot name="after-wrapper"/>
    </div>
    <div
      class="swiper-button-prev swiper-games-prev d-none d-sm-block p-1"
      :class="this.content+'-prev'"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27 44">
        <path d="M0,22L22,0l2.1,2.1L4.2,22l19.9,19.9L22,44L0,22L0,22L0,22z"></path>
      </svg>
    </div>
    <div
      class="swiper-button-next swiper-games-next d-none d-sm-block p-1"
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
  name: "RelatedSwiper",
  props: {
    content: "",
    id: null,
    action: null
  },
  data() {
    return {
      games: [],
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
    },
    id() {
      if (this.id) {
        this.fetchData();
      } else {
        this.resultReceived = false;
      }
    }
  },

  mounted() {
    this.fetchData();
    this.recreateSwiper();
  },

  updated() {
    // this.fetchData()
    this.swiper.update();
  },

  beforeDestroy() {
    if (this.swiper) this.swiper.destroy();
  },
  created() {},

  methods: {
    setGamesRoute() {
      this.updateRoute();
    },
    control(swiper) {
      this.controlled = swiper;
      this.recreateSwiper();
    },
    async fetchData() {
      if (this.action == "rent") {
        await axios.get("/game-for-rent-related/" + this.id).then(response => {
          this.games = response.data.data;
          this.isSlidesReceive = true;
        });
      } else if (this.action == "sale") {
        await axios.get("/game-for-shop-related/" + this.id).then(response => {
          this.games = response.data.data;
          this.isSlidesReceive = true;
        });
      }
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
            slidesPerView: 3,
            spaceBetween: 10,
            // observer: true,
            navigation: {
              nextEl: "." + this.content + "-next",
              prevEl: "." + this.content + "-prev"
            },
            breakpoints: {
              1260: {
                slidesPerView: 3,
                spaceBetween: 10
              },
              1080: {
                slidesPerView: 3,
                spaceBetween: 10
              },
              900: {
                slidesPerView: 3,
                spaceBetween: 10
              },
              720: {
                slidesPerView: 3,
                spaceBetween: 10
              },
              540: {
                slidesPerView: 2,
                spaceBetween: 10
              },
              361: {
                slidesPerView: 1,
                spaceBetween: 10,
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
  margin-left: -46px !important;
  z-index: 100 !important;
}

.swiper-button-next {
  background-image: none;
  fill: #d65611;
  margin-right: -46px !important;
  z-index: 100 !important;
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

@media (min-width: 768px) and (max-width: 1024px) {
  .swiper-wrapper {
    justify-content: space-between !important;
  }
}
</style>