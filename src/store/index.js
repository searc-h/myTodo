import { createStore } from 'vuex';
import allopen from './allopen'
import myinfo from './myinfo'
import myopen from './myopen'
import myprivate from './myprivate'
import message from './message'
const store = createStore({
	modules:{
		allopen,
		myinfo,
		myopen,
		myprivate,
		message
	}
});

export default store