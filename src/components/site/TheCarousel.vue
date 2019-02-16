<template>

        <div id="carousel" class="swiper-container" dir="ltr">
            <slot name="before-wrapper"/>
            <div class="swiper-wrapper">
                <slot/>
                <a href="#" class="swiper-slide"
                     v-for="(slide, index) in slides"
                     :key="index">
                    <!--:style="{left: `${virtualData.offset}px`,width:`178.2px`}"-->
                        <div class="carousel-img" :style="{'background-image':'url(' + slide +')'}"></div>
                </a>

            </div>
            <slot name="after-wrapper"/>
            <!-- Add Pagination -->
            <div id="carousl-pagination" class="swiper-pagination"></div>
            <!-- Add Navigation -->
            <div id="carousel-button-prev" class="swiper-button-prev">
                <svg class="bg-slide-button p-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27 44"><path d="M0,22L22,0l2.1,2.1L4.2,22l19.9,19.9L22,44L0,22L0,22L0,22z"/></svg>
            </div>

            <div id="carousel-button-next" class="swiper-button-next">
                <svg class="bg-slide-button p-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27 44"><path d="M27,22L27,22L5,44l-2.1-2.1L22.8,22L2.9,2.1L5,0L27,22L27,22z"/></svg>
            </div>
        </div>


</template>

<script>
    import {A11y,Autoplay,Pagination,Swiper} from 'swiper/dist/js/swiper.esm.js'
    import merge from 'lodash-es/merge'

    // see http://idangero.us/swiper/api/#custom-build
    Swiper.use([A11y,Autoplay,Pagination])

    export default {
        name: 'Carousel',
        // props: {
        //     options: { type: Object, required: true },
        // },
        data() {
            return {
                orangeColor: '#d65611',
                games: [],
                isSlidesReceive: false,
                slides:[
                "http://localhost/izibazi/assets/img/2.jpg",
                "http://localhost/izibazi/assets/img/3.jpg",
                "http://localhost/izibazi/assets/img/4.jpg",
                "http://localhost/izibazi/assets/img/1.jpg"
                ]
            }
        },
        computed: {
            // defaultPagination() {
            //     return this.options.pagination && !this.options.pagination.el
            // },
            defaultScrollbars() {
                return this.options.scrollbar && !this.options.scrollbar.el
            },
            // defaultNavigation() {
            //     const { navigation: nav } = this.options
            //     return nav && (!nav.nextEl && !nav.prevEl)
            // },
        },

        watch: {
            options() {
                this.recreateSwiper()
            },
        },

        mounted() {
            this.recreateSwiper()
        },

        updated() {
            this.carousel.update()
        },

        beforeDestroy() {
            if (this.carousel) this.carousel.destroy()
        },
        async created() {
            // await axios.get('/game-for-rent')
            //     .then(response => {
            //         this.games = response.data.data.data
            //         console.log(this.games[3])
            //         this.games.forEach(function (game) {
            //             // console.log(game)
            //             // this.slides.push(game)
            //         })
            //         this.isSlidesReceive = true;
            //     })
        },

        methods: {
            control(swiper) {
                this.controlled = swiper
                this.recreateSwiper()
            },

            recreateSwiper() {
                if (this.carousel) this.carousel.destroy()

                this.carousel = new Swiper(
                    '#carousel',
                    merge(
                        {
                            preloadImages: false,
                            a11y: true,
                            // navigation: {},
                            // observer: true,
                            pagination: {
                                el: '#carousl-pagination',
                                clickable: true,
                            },
                            navigation: {
                                nextEl: '#carousel-button-next',
                                prevEl: '#carousel-button-prev',
                            },
                            autoplay: {
                                delay: 2500,
                                disableOnInteraction: false,
                            },
                        },
                        this.options,
                        {
                            controller: {
                                control: this.controlled,
                            },
                        },
                    ),
                )

                this.$emit('update:swiper', this.carousel)
            },
        },
    }
</script>
<style scoped>
    .swiper-container {
    margin-top: 50px;
    }
    .swiper-wrapper{
        position: relative;
        width: 100%;
        height: 100%;
        z-index: 1;
        display: flex;
        transition-property: transform,-webkit-transform;
        box-sizing: content-box;
        }
    .swiper-slide {
        text-align: center;
        font-size: 18px;
        background: #fff;
        height: 400px;
        flex-shrink: 0;
        display: -webkit-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
         -webkit-box-pack: center;
         -ms-flex-pack: center;
         -webkit-justify-content: center;
        justify-content: center;
         -webkit-box-align: center;
         -ms-flex-align: center;
         -webkit-align-items: center;
        align-items: center;
        }
    .bg-slide-button{
        height: 80px;
        width: 60px;
        border-radius: 5px;
        background-color: rgba(30, 30, 30, 0.8);
        margin-left:-20px !important;
        margin-right:-20px !important;

    }
    .carousel-img{
        height: 100%;
        width: 100%;
        background-size: cover;
        background-position: 50% 0;
        background-repeat: no-repeat;
        position: relative;
    }
    .swiper-button-prev {
        background-image: none;
        fill: #d65611;
    }
    .swiper-button-next {
        background-image: none;
        fill: #d65611;
    }
    @media(max-width: 599px){
        .swiper-slide{
            height: 200px;
        }
    }
</style>











































<!--<template>-->
    <!--&lt;!&ndash; ... &ndash;&gt;-->
    <!--<div>-->
        <!--<div class="swiper-container">-->
            <!--<div class="swiper-wrapper">-->
                <!--<div class="swiper-slide"><img src="assets/img/2.jpg"></div>-->
                <!--<div class="swiper-slide"><img src="assets/img/2.jpg"></div>-->
                <!--<div class="swiper-slide"><img src="assets/img/2.jpg"></div>-->
                <!--<div class="swiper-slide"><img src="assets/img/2.jpg"></div>-->
                <!--<div class="swiper-slide"><img src="assets/img/2.jpg"></div>-->
                <!--<div class="swiper-slide"><img src="assets/img/2.jpg"></div>-->
                <!--<div class="swiper-slide"><img src="assets/img/2.jpg"></div>-->
                <!--<div class="swiper-slide"><img src="assets/img/2.jpg"></div>-->
                <!--<div class="swiper-slide"><img src="assets/img/2.jpg"></div>-->
                <!--<div class="swiper-slide"><img src="assets/img/2.jpg"></div>-->
            <!--</div>-->
            <!--&lt;!&ndash; Add Arrows &ndash;&gt;-->
            <!--<div class="swiper-button-next"></div>-->
            <!--<div class="swiper-button-prev"></div>-->
        <!--</div>-->
    <!--&lt;!&ndash;<div class="swiper-container">&ndash;&gt;-->
        <!--&lt;!&ndash;<div class="swiper-wrapper">&ndash;&gt;-->
            <!--&lt;!&ndash;&lt;!&ndash; It is important to set "left" style prop on every slide &ndash;&gt;&ndash;&gt;-->
            <!--&lt;!&ndash;<div class="swiper-slide">&ndash;&gt;-->
                 <!--&lt;!&ndash;&lt;!&ndash;v-for="slide in slides">&ndash;&gt;&ndash;&gt;-->
                 <!--&lt;!&ndash;&lt;!&ndash;:key="index"&ndash;&gt;&ndash;&gt;-->
                 <!--&lt;!&ndash;&lt;!&ndash;:style="{left: `${virtualData.offset}px`}"&ndash;&gt;&ndash;&gt;-->
            <!--&lt;!&ndash;<img src="assets/img/2.jpg">&ndash;&gt;-->
            <!--&lt;!&ndash;</div>&ndash;&gt;-->
            <!--&lt;!&ndash;<div class="swiper-slide">&ndash;&gt;-->
                <!--&lt;!&ndash;&lt;!&ndash;v-for="slide in slides">&ndash;&gt;&ndash;&gt;-->
                <!--&lt;!&ndash;&lt;!&ndash;:key="index"&ndash;&gt;&ndash;&gt;-->
                <!--&lt;!&ndash;&lt;!&ndash;:style="{left: `${virtualData.offset}px`}"&ndash;&gt;&ndash;&gt;-->
                <!--&lt;!&ndash;<img src="assets/img/2.jpg">&ndash;&gt;-->
            <!--&lt;!&ndash;</div>&ndash;&gt;-->
            <!--&lt;!&ndash;<div class="swiper-slide">&ndash;&gt;-->
                <!--&lt;!&ndash;&lt;!&ndash;v-for="slide in slides">&ndash;&gt;&ndash;&gt;-->
                <!--&lt;!&ndash;&lt;!&ndash;:key="index"&ndash;&gt;&ndash;&gt;-->
                <!--&lt;!&ndash;&lt;!&ndash;:style="{left: `${virtualData.offset}px`}"&ndash;&gt;&ndash;&gt;-->
                <!--&lt;!&ndash;<img src="assets/img/2.jpg">&ndash;&gt;-->
            <!--&lt;!&ndash;</div>&ndash;&gt;-->
        <!--&lt;!&ndash;</div>&ndash;&gt;-->
        <!--&lt;!&ndash;&lt;!&ndash; Add Pagination &ndash;&gt;&ndash;&gt;-->
        <!--&lt;!&ndash;<div class="swiper-pagination"></div>&ndash;&gt;-->
        <!--&lt;!&ndash;&lt;!&ndash; Add Navigation &ndash;&gt;&ndash;&gt;-->
        <!--&lt;!&ndash;<div class="swiper-button-prev bg-slide-button"></div>&ndash;&gt;-->
        <!--&lt;!&ndash;<div class="swiper-button-next bg-slide-button"></div>&ndash;&gt;-->
    <!--&lt;!&ndash;</div>&ndash;&gt;-->
    <!--</div>-->
<!--</template>-->
<!--<script>-->
    <!--import Swiper from "swiper";-->

    <!--export default {-->
        <!--name:'Carousel',-->
        <!--data() {-->
            <!--return {-->
                <!--// dummy slides data-->
                <!--slides:[-->
                    <!--"assets/img/2.jpg",-->
                    <!--"assets/img/2.jpg",-->
                    <!--"assets/img/2.jpg"-->
                <!--]-->
                <!--// slides: (function () {-->
                <!--//     var slides = [-->
                <!--//         // "assets/img/1.jpg",-->
                <!--//         // "assets/img/2.jpg",-->
                <!--//         // "assets/img/2.jpg"-->
                <!--//     ];-->
                <!--//     for (var i = 0; i < 20; i += 1) {-->
                <!--//         slides.push('Slide ' + (i + 1));-->
                <!--//     }-->
                <!--//-->
                <!--//     return slides;-->
                <!--// }()),-->
                <!--// // virtual data-->
                <!--// virtualData: {-->
                <!--//     slides: [],-->
                <!--// },-->
            <!--}-->
        <!--},-->
        <!--mounted() {-->
            <!--const self = this;-->
            <!--var swiper = new Swiper('.swiper-container', {-->
                <!--// ...-->
                <!--pagination: {-->
                    <!--el: '.swiper-pagination',-->
                    <!--clickable: true,-->
                <!--},-->
                <!--navigation: {-->
                    <!--nextEl: '.swiper-button-next',-->
                    <!--prevEl: '.swiper-button-prev',-->
                <!--},-->
                <!--// autoplay: {-->
                <!--//     delay: 2500,-->
                <!--//     disableOnInteraction: false,-->
                <!--// },-->
                <!--// virtual: {-->
                <!--//     slides: self.slides,-->
                <!--//     renderExternal(data) {-->
                <!--//         // assign virtual slides data-->
                <!--//         self.virtualData = data;-->
                <!--//     },-->
                <!--// },-->
            <!--});-->
        <!--},-->
    <!--};-->
<!--</script>-->

<!--<style scoped>-->

    <!--.swiper-container {-->
        <!--background-color:red;-->
        <!--margin-top: 50px;-->
        <!--width: auto;-->
        <!--height: auto !important;-->
    <!--}-->
    <!--.swiper-wrapper{-->
        <!--height: auto;-->
        <!--width:auto;-->
    <!--}-->
    <!--.swiper-slide {-->
        <!--text-align: center;-->
        <!--font-size: 18px;-->
        <!--background: #fff;-->

        <!--/* Center slide text vertically */-->
        <!--display: -webkit-box;-->
        <!--display: -ms-flexbox;-->
        <!--display: -webkit-flex;-->
        <!--display: flex;-->
         <!-- -webkit-box-pack: center;-->
         <!-- -ms-flex-pack: center;-->
         <!-- -webkit-justify-content: center;-->
        <!--justify-content: center;-->
         <!-- -webkit-box-align: center;-->
         <!-- -ms-flex-align: center;-->
         <!-- -webkit-align-items: center;-->
        <!--align-items: center;-->
    <!--}-->
    <!--/*.bg-slide-button{*/-->
        <!--/*height: 80px;*/-->
        <!--/*width: 60px;*/-->
        <!--/*border-radius: 5px;*/-->
        <!--/*background-color: rgba(30, 30, 30, 0.8);*/-->
        <!--/*margin-left:-20px !important;*/-->
        <!--/*margin-right:-20px !important;*/-->
    <!---->
    <!--/*}*/-->
    <!--/*.swiper-pagination-bullet-active {*/-->
        <!--/*opacity: 1;*/-->
        <!--/*background: #f62aff;*/-->
    <!--/*}*/-->
    <!---->
<!--</style>-->
