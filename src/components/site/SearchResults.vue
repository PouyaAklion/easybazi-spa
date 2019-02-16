<template>
    <div v-if="resultReceived" v-click-outside="onClickOutside"
         class="search-result-container p-4" v-bind:style="[centered ? {'width':width,'top': top,'left':'50%','transform':'translate('-50%','-50%')'}:{top: top, left: left, width: width}]">
        <div v-for="item in rentItems" :key="item.game_info.id" v-on:click="pushToRentGame(item.game_info.name,item.game_info.id)" class="d-flex mb-1 search-item-container">
            <div class="game-img-container">
                <img :src="item.game_info.photos[0].url" alt="">
            </div>
            <div class="flex-grow-1 text-left">
                <div class="d-flex flex-column align-items-end">
                    <div class="pb-1">{{item.game_info.name}}</div>
                    <div class="pb-1 "> Region: {{item.region}}</div>
                    <span class="alert-orange p-1 text-light"> کرایه ای </span>
                </div>
            </div>
        </div>
        <hr v-if="rentItems.length!=0">
        <div v-for="item in shopItems" :key="item.game_info.id" v-on:click="pushToShopGame(item.game_info.name,item.game_info.id)" class="d-flex mb-1 search-item-container">
            <div class="game-img-container">
                <img :src="item.game_info.photos[0].url" alt="">
            </div>
            <div class="flex-grow-1 text-left">
                <div class="d-flex flex-column align-items-end">
                    <div class="pb-1">{{item.game_info.name}}</div>
                    <div class="pb-1 "> Region: {{item.region}}</div>
                    <span class="alert-orange p-1 text-light">فروشی</span>
                </div>
            </div>
        </div>
        <hr v-if="shopItems.length!=0">
        <div v-for="item in postItems" :key="item.id" class="d-flex mb-1 search-item-container">
            <div class="game-img-container">
                <img :src="item.photos[0].url" width="65px" alt="">
            </div>
            <div class="flex-grow-1 text-right">
                <div class="d-flex flex-column align-items-start ml-1">
                    <div class="pb-1">{{item.title.split(' ').slice(0,12).join(' ') + ' ...'}}</div>
                </div>
            </div>
        </div>
        <div v-if="anyResult" class="text-center alert alert-dark"  >هیچ موردی پیدا نشد!</div>
    </div>
</template>

<script>

    import Form from 'vform'
    export default {
        name: "SearchResults",
        data(){
            return{
                anyResult:false,
                resultReceived: false,
                rentItems: null,
                shopItems:null,
                postItems: null,
                searchForm: new Form({
                    text: this.searchString,
                    city_id: 329
                }),
            }
        },
        props: {
            searchString:'',
            top: String,
            left: String,
            width: String,
            centered:false
        },
        created(){
            // this.fetchData()
        },
        methods:{
            async fetchData(){


                    await this.searchForm.post('/global-search')
                        .then(({data}) => {
                            console.log(data)
                            this.rentItems = data.data[0].game_for_rents
                            this.shopItems = data.data[1].game_for_shops
                            this.postItems = data.data[2].posts
                            this.anyResult=false;

                            if (this.rentItems.length == 0 && this.shopItems.length == 0 && this.postItems.length == 0) {
                                this.anyResult = true;
                            }
                            this.resultReceived = true
                        })
                        .catch(error => {

                        })

            },
            onClickOutside(event) {
                this.resultReceived = false;
            },
            pushToRentGame(gameName,gameId){
                this.resultReceived=false
                this.$router.push({ path: `/game/${gameName.split(' ').join('-')}/${gameId}/rent` })
                // this.$router.go(this.$router.currentRoute)
            },
            pushToShopGame(gameName,gameId){
                this.resultReceived=false
                this.$router.push({ path: `/game/${gameName.split(' ').join('-')}/${gameId}/sale`})
                // this.$router.go(this.$router.currentRoute)
            }
        },
        watch:{
            'searchString' (){
                // console.log(this.searchString)
                if(this.searchString.length>=3){
                    this.searchForm.text=this.searchString
                    this.fetchData()
                }else{
                    this.resultReceived = false
                }
            }
        }
    }
</script>

<style scoped>
    .search-result-container {
        position: absolute;
        min-height: 100px;
        max-height: 450px;
        /*left: 50%;*/
        /*!* bring your own prefixes *!*/
        /*transform: translate(-50%, -50%);*/
        overflow-y: scroll;
        background-color: #ebebeb;
        z-index: 10;
        border-radius: 20px;
    }

    .game-img-container {
        min-width: 70px;
        min-height: 82px;
        max-width: 70px;
        max-height: 82px;
        object-fit: contain;
        background: linear-gradient(to right, #eeeeee, #ebebeb);
        border-radius: 5px;
    }

    .game-img-container img {
        height: 100%;
        width: 100%;
        border-radius: 5px;
    }
    .alert-orange {
        font-size: 0.8em;
        background-color: rgba(214, 86, 17, 0.6);
        border-radius: 4px;
    }
    .search-item-container:hover{
        background-color: #dddddd;
        cursor: pointer;
    }
    @media (max-width: 425px){
        .game-img-container {
            min-width: 55px;
            min-height: 68px;
            max-width: 55px;
            max-height: 68px;
        }
    }
</style>