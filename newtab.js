var $area;

/**
 * @brief Get the value of the textarea
 */
const getContent = () => {
	return $area.value;
};

/**
 * @brief Directly set the value of the textarea
 */
const setContent = (notes) => {
	$area.value = notes;
};

// Set to true when saving to avoid conflicts
var saving = false;
/**
 * @brief Saves the content to chrome storage
 */
const saveContent = () => {
	if (saving) return;
	saving = true;

	chrome.storage.sync.set({notes: getContent()}, () => {
		saving = false;
	});
};

/**
 * @brief Once the DOM has been loaded
 */
const onReady = () => {
	// Setup area
	$area = document.querySelector('#notes-area');

	chrome.storage.sync.get(['notes'], ({notes}) => {
		setContent(notes || '');
		onLoaded();
	});
};

/**
 * @brief When the synced data has been loaded
 */
const onLoaded = () => {
	document.addEventListener('keyup', () => {
		saveContent();
	});
}

//! Wait for the DOM to load
if (document.readyState === "complete") {
	onReady();
}
else {
	document.addEventListener('DOMContentLoaded', onReady);
}