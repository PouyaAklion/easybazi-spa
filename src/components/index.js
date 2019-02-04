import Vue from 'vue'

import TheChild from './TheChild';
[
  	TheChild,
].forEach(Component => {
    Vue.component(Component.name, Component)
})