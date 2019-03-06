<template>
  <div class="mt-5 mb-5">
    <h4>تیکت ها</h4>
    <div class="container m-auto ticket-container d-flex flex-column p-0">
      <div class="messages-container p-3 flex-grow-1">
        <div
          v-for="ticket in tickets"
          :key="ticket.id"
          class="message-container w-50 mt-2 p-3"
          :class="[ticket.is_user_sent==0 ? 'admin-message' :'']"
        >
          <span v-if="ticket.is_user_sent==1">شما:</span>
          <div v-if="ticket.is_user_sent==0" class="d-flex justify-content-end">:Admin</div>
          <p style="white-space: pre-wrap;direction: ltr">{{ticket.text}}</p>
          <div class="d-flex justify-content-end align-items-center">
            <span>{{ ticket.created_at | moment("jYYYY/jM/jD") }}</span>
            <span
              v-if="ticket.is_user_sent==1&&ticket.is_seen==1"
              class="far fa-check-double ml-1 p-1 text-orange"
            ></span>
            <span
              v-if="ticket.is_user_sent==1&&ticket.is_seen==0"
              class="far fa-check ml-1 p-1 text-orange"
            ></span>
          </div>
        </div>
      </div>
      <div class="input-container">
        <form @submit.prevent="sendTicket" class="d-flex align-content-between p-3 h-100" action>
          <textarea v-model="ticketForm.text" type="text" class="form-control" rows="4"></textarea>
          <button class="btn btn-info button-orange align-self-center ml-2" type="submit">
            ارسال
            <i :class="{'fa ml-2 fa-spinner fa-spin': ticketForm.busy}"></i>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Form from "vform";
import swal from "sweetalert2";
import axios from 'axios';

export default {
  name: "UserTicket",
  data() {
    return {
      tickets: [],
      adminClass: "float-left",
      index: Number,
      ticketForm: new Form({
        text: "",
        is_user_sent: 1
      })
    };
  },
  methods: {
    async loadTickets() {
      await axios
        .get("/ticket")
        .then(response => {
          let ticketContainer = this.$el.querySelector(".messages-container");
          let reversedArray = response.data.data.data.reverse();
          this.tickets.push(...reversedArray);
          this.$nextTick(() => {
            ticketContainer.scrollTop = ticketContainer.scrollHeight;
          });
        })
        .catch(error => {});
    },
    async sendTicket() {
      if (this.ticketForm.text != "") {
        await this.ticketForm
          .post("/ticket")
          .then(response => {
            console.log(response);
            if (response.data.status == 1) {
              let ticketContainer = this.$el.querySelector(
                ".messages-container"
              );
              this.$nextTick(() => {
                this.tickets.push(response.data.data);
                this.ticketForm.text = "";
              });
              swal({
                type: "success",
                title: "موفقیت آمیز",
                text: "تیکت شما با موفقیت ارسال شد",
                focusConfirm: false,
                confirmButtonColor: "#d65611",
                confirmButtonText: "باشه"
              }).then(() => {
                ticketContainer.scrollTop = ticketContainer.scrollHeight;
              });
            } else {
            }
          })
          .catch(error => {});
      }
    }
  },

  created() {
    this.loadTickets();
  }
};
</script>

<style scoped>
.ticket-container {
  min-height: 400px;

  background-color: #c6c6c6;
  border-radius: 15px;
}

.messages-container {
  background-color: #e9e9e9;
  max-height: 500px;
  overflow-y: scroll;
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
}

.message-container {
  background-color: rgba(214, 86, 17, 0.15);
}

.admin-message {
  background-color: rgba(214, 86, 17, 0.3);
  margin-right: auto;
}

.input-container {
  /*position: absolute;*/
  /*left: 0;*/
  /*bottom: 0;*/
  width: 100%;
  height: 150px;
  background-color: #c6c6c6;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
}

.form-control {
  resize: none;
}

.form-control:focus {
  border-color: rgba(214, 86, 17, 0.8);
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset,
    0 0 8px rgba(214, 86, 17, 0.6);
  outline: 0 none;
}

.message-container {
  border-radius: 10px;
  padding-bottom: 0 !important;
}

/*.messages-container::-webkit-scrollbar-track*/
/*{*/
/*-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);*/
/*border-radius: 10px;*/
/*background-color: #F5F5F5;*/
/*}*/

/*.messages-container::-webkit-scrollbar*/
/*{*/
/*width: 15px;*/
/*background-color: #F5F5F5;*/
/*}*/

/*.messages-container::-webkit-scrollbar-thumb*/
/*{*/
/*border-radius: 10px;*/
/*-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);*/
/*background-color: #d65611;*/
/*}*/
@media (max-width: 992px) {
  /*.admin-message{*/
  /*float: left;*/
  /*}*/
  .message-container {
    width: 100% !important;
  }
}
</style>