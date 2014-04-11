var PHP = require("./php").PHP;

module.exports = function(info) {
    var text = info.inputs.text;

    var tokens = PHP.Lexer(text, {
        short_open_tag: 1
    });

    try {
        new PHP.Parser(tokens);
        return [];
    } catch (e) {
        return [{
            row: e.line - 1,
            column: null,
            text: e.message.charAt(0).toUpperCase() + e.message.substring(1),
            type: "error"
        }];
    }
};
