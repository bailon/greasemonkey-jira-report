// ==UserScript==
// @name			Jira - Daily Report
// @description		Generates an email with the tasks worked in the day
// @exclude			*
// ==/UserScript==

(function () {
	var table 		= document.getElementById('issuetable');
	var forEach 	= Array.prototype.forEach;
	var config		= {
			recipient	: 'officepel@eckert-caine.com',
			subject		: 'Daily Report',
			msgStart	: getRandomMessageStart(),
			msgEnd		: getRandomMessageEnd()
		};


	function report () {
		if (!document.getElementById('issuetable')) {
			return;
		}

		clearContent();
		removeColumns(['issuetype', 'assignee', 'reporter', 'created', 'updated', 'duedate']);
		generateEmail();
	}


	function removeColumns (columns) {
		var cells
		, 	len = columns.length;

		for (i = 0; i < len; i++) {
			removeColumnNodes(document.querySelectorAll('.' + columns[i]));
			removeColumnNodes(document.querySelectorAll('.headerrow-' + columns[i]));
		}
	}


	function removeColumnNodes (nodeCells) {
		var cells = nodeListToArray(nodeCells);
			
		cells.forEach(function (cell) {
			cell.parentNode.removeChild(cell);
		});
	}


	function nodeListToArray (nodeCells) {
		var cells = [];
		
		for (var j = nodeCells.length; j--; cells.unshift(nodeCells[j]));
		
		return cells;	
	}


	function clearContent () {
		var content;

		// information table
		content = document.querySelectorAll('.result-header');
		content[0].parentNode.removeChild(content[0]);

		// previous button
		content = document.querySelectorAll('#previous-view');
		content[0].parentNode.removeChild(content[0]);
	}

	
	function generateEmail () {
		var mail = 'mailto:' + config.recipient + '?subject=' + config.subject + '&body=' + getMessageBody();

		// maybe use some parser to generate it in plain/text format

		window.location = mail;
	}


	function getMessageBody () {
		return config.msgStart + '\n\n\n' + config.msgEnd;
	}


	function getRandomMessageStart () {
		return 'Hey guys';
	}


	function getRandomMessageEnd () {
		var msg = ['Best regards.', 'Kind regards.','Gracias!'];
		
		return msg[Math.floor(Math.random() * msg.length)];
	}


	window.addEventListener("load", function(e) {
		report();
	}, false);
})()
