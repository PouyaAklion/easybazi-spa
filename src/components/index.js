import Vue from 'vue'

import TheChild from './TheChild';
import TheHero from './TheHero';
import SearchInput from './SearchInput';
import TheSlogan from './TheSlogan';
import NewPosts from './NewPosts';
import SignForm from './SignForm';
import MainFooter from './MainFooter';
[
		TheChild,
		TheHero,
		SearchInput,
		TheSlogan,
		NewPosts,
		SignForm,
		MainFooter
].forEach(Component => {
    Vue.component(Component.name, Component)
})