function identity(x) {
    return x;
}

function reverse(str) {
    return str
    .split('')
    .reverse()
    .join('');
}

function wrap(str, wrapper) {
    return wrapper + str + reverse(wrapper);
}

function repeat(str, n) {
    var s = '';
    for(var i = n; n--; n <= 0) {
        s += str;
    }
    return s;
}

function block(str) {
    return wrap(str, '\n');
}

function indent(str, prefix) {
    prefix = prefix || '    ';
    return str.split('\n')
    .map(function(line) {
        return prefix + line;
    })
    .join('\n');
}

function MarkdownRenderer(options) {
    if(!(this instanceof MarkdownRenderer)) {
        return new MarkdownRenderer(options);
    }
    this.options = options || {};
}

MarkdownRenderer.prototype.code = function(code, lang, escaped) {
    return block(
        wrap(lang + block(code), '```')
    );
};

MarkdownRenderer.prototype.blockquote = function(quote) {
    return block(indent(quote, '> '));
};

MarkdownRenderer.prototype.html = function(html) {
    return block(html);
};

MarkdownRenderer.prototype.heading = function(text, level, raw) {
    return block(repeat('#', level) + ' ' + raw);
};

MarkdownRenderer.prototype.hr = function() {
    return block('---');
};

MarkdownRenderer.prototype.list = function(body, ordered) {

};

MarkdownRenderer.prototype.listitem = function(text) {
    return '\t' + text + '\n';
};

MarkdownRenderer.prototype.paragraph = function(text) {
    return block(text);
};

MarkdownRenderer.prototype.table = function(header, body) {
    return '\n' + header + '\n' + body + '\n\n';
};

MarkdownRenderer.prototype.tablerow = function(content) {
    line = repeat('-', content.length);
    return block(line + block(content) + line);
};

MarkdownRenderer.prototype.tablecell = function(content, flags) {
    return '| ' + content;
};

// span level renderer
MarkdownRenderer.prototype.strong = function(text) {
    return wrap(text, '**');
};

MarkdownRenderer.prototype.em = function(text) {
    return wrap(text, '*');
};

MarkdownRenderer.prototype.codespan = function(text) {
    return wrap(text, '`');
};

MarkdownRenderer.prototype.br = function() {
    return '\n\n';
};

MarkdownRenderer.prototype.del = function(text) {
    return text;
};

MarkdownRenderer.prototype.link = function(href, title, text) {
    return '['+text+']('+href+')';
};

MarkdownRenderer.prototype.image = function(href, title, text) {
    return '!'+MarkdownRenderer.prototype.link(href, title, text);
};


MarkdownRenderer.prototype.footnote = function(refname, text) {
    return '[^'+refname+']: ' + text;
};

MarkdownRenderer.prototype.math = function(formula, type, inline) {
    var wrapper = inline ? identity : block;
    return wrapper('$$'+wrapper(formula)+'$$');
};

MarkdownRenderer.prototype.reffn = function(refname) {
    return '[^'+refname+']';
};

// Exports
module.exports = MarkdownRenderer;
