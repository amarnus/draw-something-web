// ---- WebSocket ---- //
var ws;

function init_ws() {
	uninit_ws();
	// Resolve the path. Allow static override using global constants.
	path = 
	  'ws://:hostname::port'
	    .replace(':hostname', ((typeof SERVER_HOSTNAME !== 'undefined') ? SERVER_HOSTNAME : window.location.hostname))
	    .replace(':port', ((typeof SERVER_PORT !== 'undefined') ? SERVER_PORT : 8005));
	
	ws = new WebSocket(path);
	ws.onopen = function() { console.log("ws opened."); }
	ws.onclose = function() { console.log("ws closed."); }
	ws.onmessage = function(e) {
		// if e.data contains position of points, draw them
		// else it is a text message, display it
		try {
			obj = JSON.parse(e.data);
			clickX = obj["x"];
			clickY = obj["y"];
			clickDrag = obj["drag"];
			redraw();
		} catch (err) {
			console.log("message: " + e.data);
		}
	}
}

function uninit_ws() {
	if (typeof ws === undefined && ws instanceof WebSocket)
		ws.close();
}

// ---- Guess word ---- //
function guess_word() {
	word=document.getElementById('le_word_tf').value;
	ws.send(word);
}
