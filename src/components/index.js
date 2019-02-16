import Vue from 'vue'
import { HasError, AlertError, AlertSuccess } from 'vform'

import TheChild from './TheChild';
import TheHero from './TheHero';
import SearchInput from './SearchInput';
import TheSlogan from './TheSlogan';
import NewPosts from './NewPosts';
import SignForm from './SignForm';
import MainFooter from './MainFooter';
import ThePlatforms from './ThePlatforms';

[
	HasError,
	AlertError,
	AlertSuccess,
	TheChild,
	TheHero,
	SearchInput,
	TheSlogan,
	NewPosts,
	SignForm,
	MainFooter,
	ThePlatforms,
].forEach(Component => {
	Vue.component(Component.name, Component)
})