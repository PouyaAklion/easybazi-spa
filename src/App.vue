<template>
  <div id="app">
    <load-bar ref="loading"/>
		<transition name="page" mode="out-in">
            <component v-if="layout" :is="layout"/>
    </transition>
    <!-- <router-view/> -->
  </div>
</template>
<script>
import LoadBar from "./components/site/LoadBar";
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

</style>
