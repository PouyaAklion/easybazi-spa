import Vue from 'vue'
import { HasError, AlertError, AlertSuccess } from 'vform'

// Site Components
import TheNavbar from './site/TheNavbar';
import TheCarousel from './site/TheCarousel';
import TheChild from './site/TheChild';
import TheHero from './site/TheHero';
import SearchInput from './site/SearchInput';
import TheSlogan from './site/TheSlogan';
import NewPosts from './site/NewPosts';
import SignForm from './site/SignForm';
import MainFooter from './site/MainFooter';
import ThePlatforms from './site/ThePlatforms';
import SearchResults from './site/SearchResults';
import SwiperSlider from './site/SwiperSlider';
import GameVideo from './site/GameVideo';
import GameMedia from './site/GameMedia';
import GameComments from './site/GameComments';
import GameNavbar from './site/GameNavbar';
import RelatedSwiper from './site/RelatedSwiper';

// User Components
import UserInfo from './user/UserInfo'
import UserTicket from './user/UserTicket'
import UserItem from './user/UserItem'

//Admin components
import AddGame from './admin/AddGame'
[
	HasError,
	AlertError,
	AlertSuccess,
	TheNavbar,
	TheCarousel,
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
	AddGame,
	SwiperSlider,
	GameMedia,
	GameVideo,
	GameComments,
	GameNavbar,
	RelatedSwiper
].forEach(Component => {
	Vue.component(Component.name, Component)
})