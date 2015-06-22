// ==UserScript==
// @name         Jira - Daily Report
// @description  Generates an email with the tasks worked in the day
// @exclude      *
// ==/UserScript==

(function () {
    var table = document.getElementById('issuetable');
    var forEach = Array.prototype.forEach;
    var config = {
        recipient: 'report@email.com',
        subject: 'Daily Report',
        msgStart: getRandomMessageStart(),
        msgEnd: getRandomMessageEnd(),
        columns: ['issuetype', 'assignee', 'reporter', 'created', 'updated', 'duedate']
    };


    function report () {
        if (!document.getElementById('issuetable')) {
            return;
        }

        clearContent();
        removeColumns(config.columns);
        generateEmail();
    }


    function removeColumns (columns) {
        for (var i = 0, len = columns.length; i < len; i++) {
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
        for (var j = nodeCells.length, cells = []; j--; cells.unshift(nodeCells[j]));

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
})();
