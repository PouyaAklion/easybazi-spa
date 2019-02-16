<template>
  <div>
    <div v-if="isAdmin==0" class="container-fluid p-0 pt-3 pt-sm-5 pb-sm-3 mt-5 pr-1 pl-0">
      <UserInfo/>
      <UserItem/>
      <UserTicket id="tickets"/>
    </div>
    <div v-if="isAdmin==1" class="container-fluid p-0 pt-3 pt-sm-5 pb-sm-3 mt-5 pr-1 pl-0">
      <AddGame/>
    </div>
    <MainFooter/>
  </div>
</template>

<script>
import swal from "sweetalert2";
import { mapGetters } from "vuex";
// import SwiperSlider from "../components/SwiperSlider";

export default {
  // components: { SwiperSlider },
  middleware: "auth",
  data() {
    return {
      userRents: []
    };
  },
  computed: {
    ...mapGetters({
      isAdmin: "auth/isAdmin"
    })
  },
  methods: {
    // async fetchRents(){
    //     await axios.get('/user-game-for-rent-requests')
    //         .then(response => {
    //             this.userRents=response.data.data
    //             console.log(this.userRents)
    //     })
    //         .catch(error =>{
    //             swal({
    //                 type: 'error',
    //                 title: 'خطا در اتصال به سرور' ,
    //                 text:  'اینترنت خود را چک کنید',
    //                 focusConfirm: false,
    //                 confirmButtonColor: '#d65611',
    //                 confirmButtonText: 'باشه',
    //             })
    //         })
    // }
  }

  // metaInfo () {
  //   return { title: "salaaam" }
  // }
};
</script>

<style scoped>
.container-fluid {
  padding-right: 1rem !important;
  padding-left: 1rem !important;
}
</style>