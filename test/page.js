var fs = require('fs');
var path = require('path');
var assert = require('assert');

var kramed = require('kramed');

var renderer = require('../');

var CONTENT = fs.readFileSync(path.join(__dirname, './fixtures/PAGE.md'), 'utf8');
var RENDERED = render(CONTENT);
var HR_CONTENT = fs.readFileSync(path.join(__dirname, './fixtures/HR_TITLE_MIX.md'), 'utf8');
var HR_RENDERED = render(HR_CONTENT);

function render(content) {
    var lexed = kramed.lexer(content);

    // Options to parser
    var options = Object.create(kramed.defaults);
    options.renderer = renderer();

    return kramed.parser(lexed, options);
}

describe('Markdown renderer', function() {
    it('should strip all html tags', function() {
        assert.equal(RENDERED.indexOf('</'), -1);
    });
    it('should produce the same html output as the original', function() {
        assert.equal(
            kramed(RENDERED),
            kramed(CONTENT)
        );
    });

    it('should not turn HRs into titles', function() {
        assert.equal(
            kramed(HR_RENDERED),
            kramed(HR_CONTENT)
        );
    })
});
