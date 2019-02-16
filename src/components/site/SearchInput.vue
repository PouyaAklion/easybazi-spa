<template>
    <div class=" my-5 ">
        <div id="large-search" class="mb-1 justify-content-center">
            <form  @keydown.enter.prevent="" class="form-inline my-2 my-lg-0 d-inline-block">
                <span class="fa fa-search input-search-icon"></span>
                <input  v-model="searchedText" class="form-control mr-sm-2 custom-search-input search-input-large " type="search" placeholder="جستجو..."
                       aria-label="Search">
            </form>
            <SearchResults :searchString="searchedText" top="103vh" width="74vw" />
        </div>

        <div class="d-flex justify-content-around flex-wrap">
            <a class="btn-custom">محبوب ترین ها</a>
            <a class="btn-custom">پر فروش ترین ها</a>
            <div id="small-search" >
                <form @keydown.enter.prevent="" class="form-inline my-2 my-lg-0 d-inline-block">
                    <span class="fa fa-search input-search-icon"></span>
                    <input v-model="searchedText" class="form-control mr-sm-2 custom-search-input " type="search" placeholder="جستجو..."
                           aria-label="Search">
                </form>
                <SearchResults :searchString="searchedText" top="105vh" width="400px" />
            </div>
            <!--<search-result :searchString="searchedText" top="800px" left="33%" width="400px" ></search-result>-->
            <a class="btn-custom">جدید ترین ها</a>
            <a class="btn-custom">ارزان ترین ها</a>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SearchInput",
        data(){
            return{
                searchedText:''
            }
        }
    }
</script>

<style scoped>
    .btn-custom {
        border-radius: 20px;
        padding: 6px 9px;
        min-width: 130px;
        text-align: center;
        border: 1px solid #cfd2d3;
        color: #d65611 !important;

    }
    .btn-custom:hover {
        background-color: #f2f3f3;

    }

    .custom-search-input {
        width: 400px;
        border: 2px solid #717c7f !important;
        background-color: #f2f2f2;
        color: rgba(0, 0, 0, 0.87) !important;
        position: relative;
        text-indent: 22px;
        border-radius: 24px;
        box-shadow: 0 2px 1px -1px rgba(0, 0, 0, .2), 0 1px 1px 0 rgba(0, 0, 0, .14), 0 1px 3px 0 rgba(0, 0, 0, .12);
    }

    .form-control:focus {
        outline: 0px !important;
        -webkit-box-shadow: none;
        box-shadow: none;
    }

    .fa-search {
        position: absolute;
        margin-right: 10px;
        z-index: 100;
        font-size: 1.2em !important;
        color: rgba(0, 0, 0, 0.87);
    }
    .search-input-large{
        width: 70vw;
    }
    .input-search-icon{
        padding-top: 10px;
    }
    #large-search{
        display: none;
    }
    @media (max-width: 992px) {
        #small-search {
            display: none;
        }
        #large-search{
            display: flex;
        }
    }
    @media (max-width: 539px) {
        .btn-custom {
            padding: 6px 9px;
            min-width: 100px;
            text-align: center;
            border: none;
            color: #d65611 !important;

        }
    }

</style>