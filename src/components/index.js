import Vue from 'vue'
import { HasError, AlertError, AlertSuccess } from 'vform'

import TheChild from './site/TheChild';
import TheHero from './site/TheHero';
import SearchInput from './site/SearchInput';
import TheSlogan from './site/TheSlogan';
import NewPosts from './site/NewPosts';
import SignForm from './site/SignForm';
import MainFooter from './site/MainFooter';
import ThePlatforms from './site/ThePlatforms';
import SearchResults from './site/SearchResults';

import UserInfo from './user/UserInfo'
import UserTicket from './user/UserTicket'
import UserItem from './user/UserItem'

import AddGame from './admin/AddGame'
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
	SearchResults,
	UserInfo,
	UserItem,
	UserTicket,
	AddGame
].forEach(Component => {
	Vue.component(Component.name, Component)
})