function fire() {
	let output = "";

	for(let count=0; count < window.localStorage.length; count++) {
		output += window.localStorage.getItem(count);
	}

	alert(output);
}

function saveNote() {
	let note = {
							title: document.getElementById("title").value,
							email: document.getElementById("email").value,
							message: document.getElementById("message").value
						};

	print(note);
	saveToStorage(note);
}
					

function saveToStorage(toBeSaved) {
	let storageLength = window.localStorage.length;
	console.log("length: " + storageLength)
	window.localStorage.setItem(storageLength, JSON.stringify(toBeSaved));
}

function print(msg) {
	console.log("'twas said: " + msg.title + " and "  + msg.email + " and " + msg.message);
}