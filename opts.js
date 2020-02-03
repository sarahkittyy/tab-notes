(function() {
	
/**
 * @brief Once the DOM loads
 */
const onReady = () => {

};
	
//! Wait for the DOM to load
if (document.readyState === "complete") {
	onReady();
}
else {
	document.addEventListener('DOMContentLoaded', onReady);
}

})();