<template>
    <div class="how-work-wrapper">
        <div class="d-flex justify-content-between align-items-center ">
            <div class="d-flex flex-column  align-items-center justify-content-between how-work-item">
                <img v-bind:src="imgThird" alt="">
                <span>بازی خود را به اشتراک بزار</span>
            </div>
            <div class="divider" >
                <i class="fa fa-angle-down d-none"></i>
                <img v-bind:src="arrow" class="arrow" alt="">
            </div>
            <div id="reverse-item" class="d-flex flex-column align-items-center justify-content-between how-work-item">
                <img v-bind:src="imgSecond" alt="">
                <span>ما برای شما با پیک رایگان میفرستیم</span>
            </div>
            <div class="divider" >
                <i class="fa fa-angle-down d-none"></i>
                <img v-bind:src="arrow" class="arrow" alt="">
            </div>
            <div class="d-flex flex-column align-items-center justify-content-between how-work-item">
                <img v-bind:src="imgFirst" alt="">
                <span>بازی دلخواه خود را انتخاب کن</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TheSlogan",
        data(){
            return{
                imgFirst:'img/icon-how-it-works-devices.png',
                imgSecond:'img/icon-how-it-works-shipping.png',
                imgThird:'img/icon-how-it-works-discs.png',
                arrow:'img/icon-how-it-works-arrow.png'
            }
        }
    }
</script>

<style scoped>
    .how-work-wrapper{
        padding: 50px;
        background-color: white;
        text-align: center;
    }
    .how-work-wrapper span{
        font-size: 17px;
        display: block;
        margin-top: 30px;
        opacity: 0.54;
    }
    @media (max-width: 992px) {
        .how-work-wrapper img{
            max-width: 160px;
        }
        .how-work-wrapper span{
            font-size: 12px;
        }
        .arrow{
            width: 24px;
        }

    }
    @media (max-width: 684px) {
        .how-work-wrapper div:nth-child(1){
            flex-direction: column;
        }
        div.how-work-item{
            flex-direction:  row !important;
            justify-items: center;
        }
        .arrow{
            transform: rotate(90deg);
            width: 14px;
            margin-bottom: -25px;
            display: none;
        }
        .divider{
            margin-top: 20px;
            margin-bottom: 20px;
            width: 90%;
            border-bottom: 1px solid #e6e8e8;
            text-align: center;

        }
        .divider i{
           display: block !important;
            margin-bottom: -10px;

        }
        #reverse-item{
            flex-direction: row-reverse !important;
        }
        .how-work-wrapper span{
            margin-top: 0px;
            margin-right: 5px;
        }
    }
</style>