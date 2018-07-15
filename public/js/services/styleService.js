import {valueStorage as store} from '../services/valueStorage.js';


class StyleService {
	isStyleActivated() {
		if(store.getItem('style')) {
			return true;
		} else {
			return false;
		}
	}

	getStyle() {
		return store.getItem('style');
	}

	getCurrentStyleName() {
		return store.getItem('currentStyleName');
	}

	saveStyle(styleName) {
		let base = "../stylesheets/";
		let chosenStyle = styleName == "Fruity" ? base + "index.css" : base + "style.css";
		
		store.setItem('style', chosenStyle);
		store.setItem('currentStyleName', styleName);
		
		return chosenStyle;
	}
}

export const styleService = new StyleService();