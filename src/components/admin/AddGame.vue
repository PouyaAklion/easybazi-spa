<template>
  <div class="container-fluid">
    <h5>بازی جدید:</h5>
    <form @submit.prevent="addGame()" class="container" action>
      <div class="d-flex justify-content-between">
        <input
          v-model="newGameForm.name"
          type="text"
          placeholder="نام بازی انگلیسی"
          class="form-control mr-3"
        >
        <input
          v-model="newGameForm.persian_name"
          type="text"
          placeholder="نام فارسی بازی"
          class="form-control ml-3"
        >
      </div>
      <div class="d-flex mt-3">
        <select v-model="newGameForm.console_type_id" class="form-control mr-3">
          <option v-for="type in consoleType" :key="type.id" :value="type.id">{{type.name}}</option>
        </select>
        <input
          v-model="newGameForm.age_class"
          type="text"
          placeholder="رده سنی"
          class="form-control ml-3"
        >
      </div>

      <div class="d-flex mt-3">
        <input
          v-model="newGameForm.production_date"
          type="date"
          placeholder="تاریخ تولید"
          class="form-control mr-3"
        >
        <select v-model="newGameForm.can_play_online" class="form-control ml-3">
          <option selected>امکان آنلاین بازی کردن</option>
          <option value="0">خیر</option>
          <option value="1">بلی</option>
        </select>
      </div>

      <div class="d-flex mt-3 align-items-start">
        <input
          v-model="newGameForm.company_name"
          type="text"
          placeholder="اسم شرکت سازنده"
          class="form-control mr-3"
        >
        <textarea
          v-model="newGameForm.description"
          type="text"
          rows="3"
          placeholder="توضیحات"
          class="form-control ml-3"
        ></textarea>
      </div>
      <button type="submit" class="btn btn-info button-orange">
        ثبت بازی جدید
        <i :class="{'ml-2 fa fa-spinner fa-spin': newGameForm.busy}"></i>
      </button>
    </form>
    <h5 class="mt-4">عکس بازی</h5>
    <div class="container">
      <div class="row">
        <div class="col-md-3">
          <input
            type="file"
            id="gameImage"
            name="image"
            ref="gameImage"
            class="form-control-file"
            @change="onImageChanged"
            accept="image/*"
          >
          <button @click="onUpload" class="btn btn-info button-orange mt-1">
            ثبت تصویر
            <i :class="{'ml-2 fa fa-spinner fa-spin': uploadBusy}"></i>
          </button>
        </div>
        <div class="col-md-8 game-image mr-3 mt-2">
          <img v-if="gameImage" class :src="url" alt>
        </div>
      </div>
    </div>

    <h5 class="mt-4">ویدیو بازی</h5>
    <div class="container">
      <div class="row">
        <div class="col-md-3">
          <input
            type="file"
            id="gameVideo"
            name="image"
            ref="gameVideo"
            class="form-control-file"
            @change="onVideoChanged"
            accept="video/*"
          >
          <button @click="onVideoUpload" class="btn btn-info button-orange mt-1">
            ثبت ویدیو
            <i :class="{'ml-2 fa fa-spinner fa-spin': VideoUploadBusy}"></i>
          </button>
        </div>
        <div class="col-md-8 game-image mr-3 mt-2">
          <video class :src="videoUrl" controls></video>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Form from "vform";
import swal from "sweetalert2";

export default {
  name: "AddGame",
  data() {
    return {
      consoleType: [],
      lastGame: null,

      gameImage: null,
      url: null,
      uploadBusy: false,

      gameVideo: null,
      videoUrl: null,
      VideoUploadBusy: false,
      imageTypes: [
        { type: "app_cover", width: 200, height: 240 },
        { type: "app_main", width: 450, height: 400 },
        { type: "site_main", width: 450, height: 400 },
        { type: "site_cover", width: 150, height: 175 }
      ],
      newGameForm: new Form({
        name: "",
        persian_name: "",
        console_type_id: Number,
        age_class: "",
        production_date: Date,
        can_play_online: Number,
        company_name: "",
        description: ""
      })
    };
  },
  methods: {
    onImageChanged(e) {
      this.gameImage = this.$refs.gameImage.files[0];
      this.url = URL.createObjectURL(this.gameImage);
    },

    removeImage: function(e) {
      this.gameImage = null;
      this.url = null;
    },

    onVideoChanged(e) {
      this.gameVideo = this.$refs.gameVideo.files[0];
      this.videoUrl = URL.createObjectURL(this.gameVideo);
    },

    removeVideo: function(e) {
      this.gameVideo = null;
      this.videoUrl = null;
    },

    async onUpload() {
      if (!this.gameImage) {
        swal({
          type: "خطا",
          title: "خطا",
          text: "تصویر بازی را انتخاب کنید",
          focusConfirm: false,
          confirmButtonColor: "#d65611",
          confirmButtonText: "باشه"
        });
        return;
      }
      this.uploadBusy = true;
      let formData;
      let config = { headers: { "Content-Type": "multipart/form-data" } };
      let isUploadOk = 0;
      for (let i = 0; i < 4; i++) {
        formData = new FormData();
        formData.append("imageable_id", this.lastGame.id);
        formData.append("imageable_type", "AppGameInfo");
        formData.append("image", this.gameImage);
        formData.append("type", this.imageTypes[i].type);
        formData.append("width", this.imageTypes[i].width);
        formData.append("height", this.imageTypes[i].height);

        await axios
          .post("/photo", formData, config)
          .then(response => {
            isUploadOk += response.data.status;
            if (isUploadOk == 4) {
              this.uploadBusy = false;
              swal({
                type: "success",
                title: "موفقیت آمیز",
                text: "تصاویر با موفقیت ثبت شد",
                focusConfirm: false,
                confirmButtonColor: "#d65611",
                confirmButtonText: "باشه"
              });
            } else if ((response.data.status = 0)) {
              this.uploadBusy = false;
              swal({
                type: "error",
                title: "خطا",
                text: response.data.message,
                focusConfirm: false,
                confirmButtonColor: "#d65611",
                confirmButtonText: "باشه"
              });
            }
          })
          .catch(error => {
            this.uploadBusy = false;
            swal({
              type: "error",
              title: "خطا",
              text: error.data.message,
              focusConfirm: false,
              confirmButtonColor: "#d65611",
              confirmButtonText: "باشه"
            });
          });
      }
    },
    async onVideoUpload() {
      if (!this.gameVideo) {
        swal({
          type: "خطا",
          title: "خطا",
          text: "ویدیو بازی را انتخاب کنید",
          focusConfirm: false,
          confirmButtonColor: "#d65611",
          confirmButtonText: "باشه"
        });
        return;
      }
      this.VideoUploadBusy = true;
      let formData;
      let config = { headers: { "Content-Type": "multipart/form-data" } };
      let isUploadOk = 0;

      formData = new FormData();
      formData.append("videoable_id", this.lastGame.id);
      formData.append("videoable_type", "AppGameInfo");
      formData.append("video", this.gameVideo);
      formData.append("type", 0);

      await axios
        .post("/video", formData, config)
        .then(response => {
          console.log(response);
          if (response.data.status == 1) {
            this.VideoUploadBusy = false;
            swal({
              type: "success",
              title: "موفقیت آمیز",
              text: "ویدیو با موفقیت ثبت شد",
              focusConfirm: false,
              confirmButtonColor: "#d65611",
              confirmButtonText: "باشه"
            });
          } else if (response.data.status == 0) {
            this.VideoUploadBusy = false;
            swal({
              type: "error",
              title: "خطا",
              text: response.message,
              focusConfirm: false,
              confirmButtonColor: "#d65611",
              confirmButtonText: "باشه"
            });
          }
        })
        .catch(error => {
          this.VideoUploadBusy = false;
          swal({
            type: "error",
            title: "خطا",
            text: error.data.message,
            focusConfirm: false,
            confirmButtonColor: "#d65611",
            confirmButtonText: "باشه"
          });
        });
    },
    async getConsoleTypeId() {
      await axios
        .get("/console-type")
        .then(response => {
          this.consoleType = response.data.data;
        })
        .catch(error => {
          swal({
            type: "error",
            title: "خطا",
            text: error.data.message,
            focusConfirm: false,
            confirmButtonColor: "#d65611",
            confirmButtonText: "باشه"
          });
        });
    },
    async addGame() {
      await this.newGameForm
        .post("/game-info")
        .then(response => {
          if (response.data.status == 1) {
            this.lastGame = response.data.data;
            console.log(this.lastGame);
            swal({
              type: "success",
              title: "موفقیت آمیز",
              text: "بازی با موفقیت ثبت شد",
              focusConfirm: false,
              confirmButtonColor: "#d65611",
              confirmButtonText: "باشه"
            });
          } else {
            swal({
              type: "error",
              title: "خطا",
              text: response.data.message,
              focusConfirm: false,
              confirmButtonColor: "#d65611",
              confirmButtonText: "باشه"
            });
          }
        })
        .catch(error => {
          swal({
            type: "error",
            title: "خطا",
            text: "error",
            focusConfirm: false,
            confirmButtonColor: "#d65611",
            confirmButtonText: "باشه"
          });
          console.log(error);
        });
    }
  },
  created() {
    this.getConsoleTypeId();
  }
};
</script>

<style scoped>
.game-image {
  /*width: 50%;*/
  /*height: 400px;*/
  max-height: 360px;

  padding: 0 !important;
  object-fit: contain;
  background: linear-gradient(to right, #c6c6c6, #ebebeb);
  border-radius: 10px;
}

.game-image img {
  height: 100%;
  width: 100%;
  border-radius: 15px;
}
.game-image video {
  height: 100%;
  width: 100%;
  border-radius: 15px;
}
</style>