<template>
  <div class="news-wrapper">
    <h4 class="mb-3 text-muted">جدید ترین اخبار بازی</h4>
    <div v-for="section in rowCount()" :key="section" class="row mb-2">
      <div v-for="post in getSection(section)" :key="post" class="col-md-4 mb-2">
        <div class="card text-white">
          <img class="card-img" v-bind:src="post.imgUrl" alt="Card image">
          <div class="card-img-overlay">
            <h5 class="card-title">{{post.title}}</h5>
            <div class="d-flex flex-column h-100">
              <p class="card-text flex-grow-1">{{post.content}}</p>
              <p class>{{post.date}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button class="btn btn-info button-orange">بیشتر</button>
  </div>
</template>

<script>
export default {
  name: "NewPosts",
  data() {
    return {
      orangeColor: "#d65611",
      news: [
        {
          imgUrl: "img/battlefield.jpg",
          title: "اولین تصاویر بازی",
          content: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت",
          date: "یک روز پیش"
        },
        {
          imgUrl: "img/blackops4.jpg",
          title: " متن ساختگی با تولید",
          content: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت",
          date: "دو روز پیش"
        },
        {
          imgUrl: "img/Deadpool.jpg",
          title: " متن ساختگی با تولید",
          content: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت",
          date: "هفته پیش"
        },
        {
          imgUrl: "img/justcause3.jpg",
          title: " متن ساختگی با تولید",
          content: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت",
          date: "دو هفته پیش"
        },
        {
          imgUrl: "img/needforspeed.jpg",
          title: " متن ساختگی با تولید",
          content: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت",
          date: "سه هفته پیش"
        },
        {
          imgUrl: "img/justcause3.jpg",
          title: " متن ساختگی با تولید",
          content: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت",
          date: "ماه پیش"
        }
      ]
    };
  },
  methods: {
    rowCount: function() {
      var postLength = this.news.length;
      return Math.ceil(postLength / 3);
    },
    getSection: function(section) {
      section = section - 1;
      return this.news.slice(section * 3, section * 3 + 3);
    }
  },
  computed: {
    // getSection:function(section) {
    //     return this.news.slice(section,section+3);
    // }
  }
};
</script>

<style scoped>
.news-wrapper {
  padding: 50px;
}
.card-img {
  max-height: 250px !important;
}
.card {
  border-radius: 0px;
  border: 1px solid #fafafa;
}
.card-img-overlay {
  background-color: rgba(27, 30, 33, 0.4);
  /*transition: all 0.3s;*/
}
.card-img-overlay:hover {
  background-color: rgba(27, 30, 33, 0.8);
  cursor: pointer;
}
.btn-orange {
  padding-right: 30px;
  padding-left: 30px;
}
.btn-orange:hover {
  padding-right: 30px;
  padding-left: 30px;
}
@media (max-width: 1100px) {
  .card-img-overlay h5 {
    font-size: 1em;
  }
  .card-img-overlay p {
    font-size: 0.8em;
  }
}
@media (max-width: 768px) {
  .card-img-overlay h5 {
    font-size: 0.9em;
  }
  .card-img-overlay p {
    font-size: 0.7em;
  }
}
.card {
  height: 100%;
  width: 100%;
  background: linear-gradient(to right, #eeeeee, #ebebeb);
  border: 0px;
  border-radius: 0px;
}
.card img {
  border-radius: 0px;
}
</style>