angular.module('learntoprogram.directivesCode', [])
    .controller('SingleCode', function ($scope, $rootScope, $location) {
        $scope.send = function() {
            sendWithButton(inputEditor);
        };
    })
    .directive('singleCode', function() {
        return {
            restrict: 'E',
            templateUrl : 'partials/singleCode.html',
            link: initEditor
        };
    })
    .controller('MultiCode', function ($scope, $rootScope, $location) {
    })
    .directive('multiCode', function() {
        return {
            restrict: 'E',
            templateUrl : 'partials/multiCode.html'
        };
    })

var editorIndex = 0;
var inputEditor;
var history = Array();
var historyIndex = 0;
var currentScope;

function sendWithButton($scope) {
    sendCommand($scope, inputEditor);
    inputEditor.focus();
}

function initEditor($scope) {
    inputEditor = ace.edit("inputEditor")
    inputEditor.setHighlightActiveLine(false);
    inputEditor.renderer.setShowGutter(false);
    //editor.setTheme("ace/theme/monokai");
    inputEditor.getSession().setMode("ace/mode/javascript");
    inputEditor.focus();
    inputEditor.scope = $scope;

    function scrollHistoryUp(editor) {
        if (historyIndex <= 0) {
            return;
        }
        historyIndex--;
        editor.setValue(history[historyIndex]);
    }

    function scrollHistoryDown(editor) {
        if (historyIndex >= history.length) {
            editor.setValue("");
            return;
        }

        historyIndex++;
        editor.setValue(history[historyIndex]);
    }

    if ($scope.isSingle()) {
        inputEditor.commands.addCommand({
            name: 'send',
            bindKey: {win: 'Return',  mac: 'Return'},
            exec: sendCommand,
            readOnly: false// false if this command should not apply in readOnly mode
        });

        inputEditor.commands.addCommand({
            name: 'historyUp',
            bindKey: {win: 'up',  mac: 'up'},
            exec: scrollHistoryUp,
            readOnly: false// false if this command should not apply in readOnly mode
        });

        inputEditor.commands.addCommand({
            name: 'historyDown',
            bindKey: {win: 'down',  mac: 'down'},
            exec: scrollHistoryDown,
            readOnly: false// false if this command should not apply in readOnly mode
        });
    } else {
        inputEditor.commands.addCommand({
            name: 'send',
            bindKey: {win: 'Ctrl-Return',  mac: 'Ctrl-Return'},
            exec: sendCommand,
            readOnly: false// false if this command should not apply in readOnly mode
        });
    }
}

function addLog(kind, text) {
    var outputTable = document.getElementById("outputTable");
    var row = outputTable.insertRow(editorIndex);
    var kindCell = row.insertCell(0);
    var textCell = row.insertCell(1);

    kindCell.innerHTML = kind;
    kindCell.className = 'labelCell';
    textCell.className = 'editorCell';

    if (kind == 'Error: ') {
        kindCell.innerHTML = 'Out:';
        textCell.innerHTML = "<span style='color:red'>" + text + "</span>"
    } else {
        var editorDiv = document.createElement('div');
        editorDiv.className = 'outputEditor';
        textCell.appendChild(editorDiv);
        var editor = ace.edit(editorDiv);
        editor.getSession().setMode("ace/mode/javascript");
        editor.setValue(text);
        editor.renderer.setShowGutter(false);

        editor.setReadOnly(true);
        editor.setHighlightActiveLine(false);
        editor.setShowPrintMargin(false);
        editor.selection.clearSelection();
        editor.renderer.hideCursor();
    }
    editorIndex++;
}

function clearLog() {
    var outputTable = document.getElementById("outputTable");
    for (var i = 0; i < editorIndex; i++) {
        outputTable.deleteRow(i);
    }
    editorIndex = 0;
}

function sendCommand(editor) {
    var text = editor.getValue();
    if (text == '') {
        return;
    }
    if (history.length == 0 || history[history.length - 1] != text) {
        history.push(text);
    }
    historyIndex = history.length;

    if (editor.scope.isSingle()) {
        editor.setValue("");
        addLog("In: ", text);
    } else {
        clearLog();
    }

    try {
        var output = window.eval(text);
        if (output != undefined || !editor.scope.isSingle()) {
            if (typeof output == "string") {
                addLog("Out: ", "\"" + output + "\"");
            } else {
                addLog("Out: ", output + "");
            }
        }
    } catch (err) {
        addLog("Error: ",  err);
    }

    // scroll to bottom
    var outputDiv = document.getElementById("outputArea");
    outputDiv.scrollTop = outputDiv.scrollHeight;
}
