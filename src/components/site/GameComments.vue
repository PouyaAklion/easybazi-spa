<template>
  <div>
    <SignForm v-if="!authCheck" top="50px" :redirect="this.$route.path"></SignForm>
    <div class="row m-3 p-3">
      <div class="col-8 m-auto">
        <h6>متن دیدگاه</h6>
        <div class="mt-2">
          <form @submit.prevent="sendComment">
            <textarea
              id="commentInput"
              @focus="showSignForm"
              v-model="commentForm.text"
              type="text"
              :class="{'is-invalid': commentForm.errors.has('comment')}"
              class="form-control"
              rows="5"
              name="comment"
              placeholder="دیدگاه خود را وارد کنید..."
            ></textarea>
            <has-error :form="commentForm" field="comment"/>
            <button type="submit" class="btn btn-info button-orange mt-2 text-center" value="ارسال">
              ارسال
              <i :class="{'ml-2 fa fa-spinner fa-spin': commentForm.busy}"></i>
            </button>
          </form>
        </div>
        <button
          v-if="!isCommentsReceive"
          @click="fetchComments"
          class="btn btn-light btn-block mt-4 border-orange"
        >نمایش دیدگاه دیگران</button>
        <div class="mt-4">
          <div v-for="comment in comments" class="comment-container p-4">
            <span class>{{comment.user.full_name}}</span>
            <span class>میگه:</span>
            <p class="m-1 p-1" style="white-space: pre-wrap;direction: ltr">{{comment.text}}</p>
            <span class="float-left mb-1 text-muted">{{comment.created_at | moment("jYYYY/jM/jD")}}</span>
          </div>
          <div
            v-if="isCommentsReceive && comments.length==0"
            class="alert alert-warning p-1 m-auto"
            style="max-width:400px"
          >
            <div>دیدگاهی برای این بازی ثبت نشده است! اولین نفری باشید که نظر می دهید</div>
          </div>
        </div>

        <button
          v-if="haveNextPage"
          @click="fetchComments(++currentPage)"
          class="btn btn-light btn-block border-orange"
        >نمایش دیدگاه های بیشتر</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import Form from "vform";
import swal from "sweetalert2";
import axios from "axios";

export default {
  name: "GameComments",
  data() {
    return {
      comments: [],
      isCommentsReceive: false,
      haveNextPage: null,
      currentPage: 1,
      lastPage: null,

      commentForm: new Form({
        commentable_id: "",
        commentable_type: "GameInfo",
        text: ""
      })
    };
  },
  props: {
    id: null
  },
  computed: {
    ...mapGetters({
      authCheck: "auth/check"
    })
  },

  methods: {
    ...mapActions(["showSingForm"]),
    ...mapMutations({
      SHOW_SING_FORM: "modals/SHOW_SING_FORM"
    }),
    async fetchComments(currentPage) {
      if (this.id) {
        await axios
          .get("/game-info-comments/" + this.id + "/?page=" + currentPage)
          .then(response => {
            this.comments.push(...response.data.data.data);
            this.haveNextPage = response.data.data.next_page_url;
            this.currentPage = response.data.data.current_page;
            this.lastPage = response.data.data.last_page;
            this.isCommentsReceive = true;
          })
          .catch(error => {});
      }
    },
    async sendComment() {
      if (this.authCheck) {
        this.commentForm.text = this.commentForm.text.trim();
        if (!this.commentForm.text) {
          this.commentForm.errors.set(
            "comment",
            "لطفا دیدگاه خود را وارد کنید"
          );
          return;
        }
        this.commentForm.errors.clear("comment");
        this.commentForm.commentable_id = this.id;
        await this.commentForm
          .post("/comment")
          .then(response => {
						swal.fire({
              type: "success",
              title: "موفقیت آمیز",
              text: "دیدگاه شما با موفقیت ارسال شد",
              focusConfirm: false,
              confirmButtonColor: "#d65611",
              confirmButtonText: "باشه"
            })
          })
          .catch(error => {
            swal.fire({
              type: "error",
              title: "خطا",
              text: "مشکل در برقراری ارتباط با سرور",
              focusConfirm: false,
              confirmButtonColor: "#d65611",
              confirmButtonText: "باشه"
            });
          });
      } else {
        this.showSignForm();
      }
    },
    showSignForm() {
      if (!this.authCheck) {
        $("#commentInput").blur();
        this.$store.dispatch("modals/showSingForm");
      }
    }
  },
  created() {},
  watch: {
    id() {
      this.comments = [];
      this.isCommentsReceive = false;
      this.haveNextPage = null;
      this.currentPage = 1;
      this.lastPage = null;
    },
    authCheck() {
      swal({
        type: "success",
        title: "با موفقیت وارد شدید",
        text: "",
        focusConfirm: false,
        confirmButtonColor: "#d65611",
        confirmButtonText: "باشه"
      });
    }
  }
};
</script>

<style scoped>
.comment-container {
  margin-bottom: 2rem;
  width: 100%;
  min-height: 100px;
  border-radius: 15px;
  background-color: #ebebeb;
}

.border-orange {
  border: 1px solid #cacaca;
}

.border-orange:hover {
  background-color: rgba(214, 86, 17, 0.5);
}

.text-orange {
  color: #d65611;
}
</style>