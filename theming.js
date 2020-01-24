(function () {

var $area;
var $themeButton;
var $svg;

/**
 * @brief Set the active theme
 */
const setTheme = (mode) => {
	const f = e => e.setAttribute('theme', mode);
	f($area);
	f($themeButton);
	f($svg);
	saveTheme();
};

/**
 * @brief Get the active theme
 */
const getTheme = () => {
	return $area.getAttribute('theme');
};

/**
 * @brief Toggle between light and dark theme
 */
const toggleTheme = () => {
	getTheme() === 'light' ? setTheme('dark') : setTheme('light');
}

/**
 * @brief Run once globals are set up
 */
const onLoaded = () => {
	$themeButton.addEventListener('click', toggleTheme);
};

/**
 * @brief Load the preferred theme from chrome storage
 */
const loadTheme = (callback) => {
	chrome.storage.sync.get(['theme'], ({theme}) => {
		setTheme(theme || 'dark');
		callback();
	});
};

/**
 * @brief Load the saved theme from chrome storage
 */
var saving = false;
const saveTheme = () => {
	if (saving) return;
	saving = true;
	
	chrome.storage.sync.set({theme: getTheme()}, () => {
		saving = false;
	});
}

/**
 * @brief Run once the dom has loaded
 */
const onReady = () => {
	$themeButton = document.querySelector('#theme-button');
	$area = document.querySelector('#notes-area');
	$svg = document.querySelector('#theme-button-svg');
	
	loadTheme(onLoaded);
}


//! Wait for the DOM to load
if (document.readyState === "complete") {
	onReady();
}
else {
	document.addEventListener('DOMContentLoaded', onReady);
}

})();