<template>
  <div>
    <div class="rtl wrapper fixed-top">
      <nav class="navbar navbar-expand-md navbar-dark custom-navbar">
        <!--<div @click="toggleActive" vs-type="filled"><i-->
        <!--class="fa fa-bars h-100 text-white w-100 menu pt-1 navbar-toggler"></i></div>-->
        <!--<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">-->
        <!--<span class="navbar-toggler-icon"></span>-->
        <!--</button>-->
        <a class="navbar-brand img-fluid" href="#">
          <img class="brand" src="assets/img/logo.pn'" alt>
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <router-link id="testt" :to="{name:'games'}" class="nav-link active">
                بازی ها
                <span class="sr-only">(current)</span>
              </router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">اخبار بازی</a>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled" href="#">تماس با ما</a>
            </li>
          </ul>
        </div>

        <form
          @keydown.enter.prevent
          class="d-none form-navbar form-inline my-2 my-lg-0 position-relative"
        >
          <span class="fa fa-search fa-search-placeholder"></span>
          <input
            v-model="searchedText"
            class="form-control mr-sm-2 custom-search-input"
            type="search"
            placeholder="جستجو..."
            aria-label="Search"
          >
        </form>
        <div class="nav navbar-nav ml-auto navbar-left">
          <!--<i @click="isShowSmSearchInput = !isShowSmSearchInput" class="nav-item nav-link ml-auto search-sm-toggler fa fa-search text-white" ></i>-->
          <li v-if="user" class="nav-item dropdown nav-link position-absolute">
            <i
              class="dropdown-toggle ml-2 mb-3 fa fa-user text-white"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            ></i>

            <div class="dropdown-menu bg-dark text-white" aria-labelledby="navbarDropdown">
              <router-link
                :to="{name:'home'}"
                class="ml-1 mt-1 text-white d-block"
              >{{user.full_name}}</router-link>
              <a @click.prevent="logout" class="ml-1 mt-1 text-white d-block">خروج</a>
            </div>
          </li>
        </div>
        <SearchResults
          v-if="!isShowSmSearchInput"
          :searchString="searchedText"
          top="50px"
          left="75px"
          width="50vw"
        />
        <!--<fa class="d-none d-sm-inline-block" icon="shopping-cart" color="white" fixed-width/>-->
        <li v-else>
          <!--<button v-if="!authenticated" @click="showSignForm" :vs-color="orangeColor" class="p-1 btn btn-info button-orange">ورود|ثبت نام</button>-->
        </li>
      </nav>
      <div v-if="isShowSmSearchInput">
        <form
          @keydown.enter.prevent
          class="custom-search-bg d-flex justify-content-center align-items-center position-relative"
        >
          <div>
            <span class="fa fa-search fa-search-placeholder"></span>
            <input
              v-model="searchedText"
              class="form-control mr-sm-2 custom-search-input"
              type="search"
              placeholder="جستجو..."
              aria-label="Search"
            >
          </div>
          <i
            class="close-sm-search fa fa-times"
            @click="isShowSmSearchInput =!isShowSmSearchInput"
            fixed-width
          ></i>
        </form>
        <search-result :searchString="searchedText" top="100px" left="20px" width="80vw"></search-result>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
export default {
  name: "TheNavbar",

  data() {
    return {
      searchedText: "",
      isShowSmSearchInput: false
    };
  },
  computed: {
    ...mapGetters({
      user: "auth/user"
    })
  },
  methods: {
    ...mapMutations({
      toggleSidebar: "modals/TOGGLE_SIDEBAR"
    }),
    ...mapActions({
      logout: "auth/logout"
    }),
    logout() {
      this.$store.dispatch("auth/logout");
      this.$router.push({ name: "welcome" });
    },
    toggleActive: function() {
      this.toggleSidebar();
    }
  }
};
</script>
<style scoped>
.wrapper {
}

.custom-navbar {
  max-height: 50px !important;
  background-color: rgb(19, 38, 43) !important;
}

.custom-navbar a {
  color: white !important;
}

.custom-btn {
  color: white;
  border-radius: 0px !important;
  border: 1px solid #ffffff;
}

.custom-btn:hover {
  background-color: white !important;
}

.custom-search-input {
  border-radius: 0px;
  width: 50vw;
  border: 2px solid #13262b !important;
  background-color: #5a676b;
  color: rgba(255, 255, 255, 0.87) !important;
  position: relative;
  text-indent: 22px;
  border-radius: 24px;
}

.form-control:focus {
  outline: 0px !important;
  -webkit-box-shadow: none;
  box-shadow: none;
}

.fa-search-placeholder {
  position: absolute;
  margin-right: 10px;
  top: 34%;
  z-index: 100;
  font-size: 1.2em !important;
  color: rgba(255, 255, 255, 0.87);
}

.form-navbar span.fa-search-placeholder {
  top: 25%;
}

::placeholder {
  color: rgba(255, 255, 255, 0.87);
  opacity: 1; /* Firefox */
}

:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: rgba(255, 255, 255, 0.87);
}

::-ms-input-placeholder {
  /* Microsoft Edge */
  color: rgba(255, 255, 255, 0.87);
}

.brand {
  height: 40px;
  margin-left: 20px;
  margin-right: 5px;
}

.menu {
  font-size: 1.5em;
  cursor: pointer;
}

.custom-navbar a.active {
  /*color: #d3ffc3 !important;*/
  border-bottom: 2px solid white;
}

.custom-navbar a:hover {
  background-color: #1b1e21;
  color: #d65611 !important;
}

.custom-search-bg {
  height: 50px;
  background-color: rgb(19, 38, 43) !important;
}

.search-sm-toggler:hover {
  cursor: pointer;
}

.close-sm-search:hover {
  cursor: pointer;
}

@media (max-width: 991px) {
  .navbar {
    justify-content: start;
  }

  .form-inline {
    margin-right: auto;
  }
}

/*@media (max-width: 536px) {*/
/*.form-inline {*/
/*!*width: 100% !important;*!*/
/*}*/
/*}*/
/*@media (min-width: 1250px) {*/
/*.form-inline {*/
/*width: 35vw;*/
/*}*/
/*}*/
.dropdown {
  line-height: 1;
}
.dropdown-menu {
  margin-right: -120px;
}

.dropdown svg:hover {
  color: #d65611 !important;
  cursor: pointer;
}

@media (min-width: 0px) {
  .form-navbar {
    display: block !important;
  }

  .search-sm-toggler {
    display: none;
  }
}
@media (max-width: 300px) {
  #testt {
    font-size: 0.8em !important;
  }
}
.navbar-left {
  margin-left: 25px !important;
  position: absolute;
  left: 20px;
}
</style>
