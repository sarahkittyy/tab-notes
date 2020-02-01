(function () {
	
// Panel options to save / load
let config = {};
var $panel;
var $slideables;
var $panelToggle;

/**
 * @brief Fetches the saved config options
 */
const getConfig = (callback) => {
	chrome.storage.sync.get(['opts'], ({opts}) => {
		try {
			config = JSON.parse(opts);
		}
		catch (e) {
			config = {};
		}
		callback();
	});
};

/**
 * @brief Config saving logic
 */
var saving = false;
const saveConfig = () => {
	if (saving) return;
	saving = true;

	chrome.storage.sync.set({opts: JSON.stringify(config)}, () => {
		saving = false;
	});
};

/**
 * @brief Close the drawer, if it's open
 */
const closeDrawer = () => {
	$slideables.forEach($e => $e.removeAttribute('slideout'));
}

/**
 * @brief Open the drawer, even if it's already opoen
 */
const openDrawer = () => {
	$slideables.forEach($e => $e.setAttribute('slideout', ''));
};

/**
 * @brief Toggle the drawer open
 */
const toggleDrawer = () => {
	if ($panel.hasAttribute('slideout')) {
		closeDrawer();
	}
	else {
		openDrawer();
	}
};
	
/**
 * @brief Run after data is ready.
 */
const onLoaded = () => {
	$panelToggle.addEventListener('click', toggleDrawer);
	document.addEventListener('keyup', (e) => {
		if(e.key === 'Escape') {
			closeDrawer();
		}
	});
};

/**
 * @brief Run with the DOM is loaded
 */
const onReady = () => {
	$panel = document.querySelector('#side-panel');
	$panelToggle = document.querySelector('#panel-toggle');
	$slideables = document.querySelectorAll('.slideout');
	getConfig(onLoaded);
};

//! Wait for the dom to load
if(document.readyState === "complete") {
	onReady();
}
else {
	document.addEventListener("DOMContentLoaded", onReady);
}

})();