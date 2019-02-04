<template>
  <div id="app">
    <load-bar ref="loading"/>
    <div id="nav">
      <router-link to="/">Welcome</router-link>|
      <router-link to="/home">Home</router-link>
    </div>
		<transition name="page" mode="out-in">
            <component v-if="layout" :is="layout"/>
    </transition>
    <!-- <router-view/> -->
  </div>
</template>
<script>
import LoadBar from "./components/LoadBar";
// Load layout components dynamically.
const requireContext = require.context("./layouts", false, /.*\.vue$/);

const layouts = requireContext
  .keys()
  .map(file => [file.replace(/(^.\/)|(\.vue$)/g, ""), requireContext(file)])
  .reduce((components, [name, component]) => {
    components[name] = component.default || component;
    return components;
  }, {});
export default {
  el: "#app",
  components: {
    LoadBar
  },
  data: () => ({
    layout: null,
    defaultLayout: "default"
  }),

  metaInfo() {
    const { appName } = window.config;

    return {
      title: appName,
      titleTemplate: `%s · ${appName}`
    };
  },

  mounted() {
    this.$loading = this.$refs.loading;
  },

  methods: {
    /**
     * Set the application layout.
     *
     * @param {String} layout
     */
    setLayout(layout) {
      if (!layout || !layouts[layout]) {
        layout = this.defaultLayout;
      }

      this.layout = layouts[layout];
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
