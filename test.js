let asyncify = require('./asyncify.js')
function a(){
	function b(){
		window.showModalDialog()
	}
	showModalDialog()
}
let b = asyncify(a, /(?=\s)(window\.)?showModalDialog/)
console.log('Original Function: ------------------------------')
console.log(String(a))
console.log('Transforms Into: ------------------------------')
console.log(String(b))
