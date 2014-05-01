var symbol = require("zed/symbol");
var indexToLine = require("zed/util").indexToLine;

var FN_REGEX = /function\s+([a-zA-Z0-9_\$]+)\s*\(([^\)]*)\)/mg;
var CLASS_REGEX = /class\s+([a-zA-Z0-9_\$]+)\s*\{/mg;

module.exports = function(info) {
    var match;
    var tags = [];
    var path = info.path;
    var text = info.inputs.text;
    // Functions
    while (match = FN_REGEX.exec(text)) {
        //console.log(match);
        tags.push({
            symbol: match[1] + "(" + match[2] + ")",
            locator: indexToLine(text, match.index),
            path: path,
            type: "function"
        });
    }
    // Functions
    while (match = CLASS_REGEX.exec(text)) {
        //console.log(match);
        tags.push({
            symbol: match[1],
            locator: indexToLine(text, match.index),
            path: path,
            type: "type"
        });
    }
    return symbol.updateSymbols(path, tags);
};
