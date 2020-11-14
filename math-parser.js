function evalArithmeticExpression(exp) {
    exp = exp.replace(/\s/g,'').replace(/^\+/,'');
    var rePara = /\([^\)\_]*\)/;
    var match = exp.match(rePara);

    while (match = exp.match(rePara)) {
        exp = exp.replace(match[0], exalExp(match[0]));
    }

    return evalExp(exp);

    function evalExp(exp) {
        exp = exp.replace(/[\(\)]/g, '');
        var reMD = /\d+\.?\d*\s*[\*\/]\s*[+-]?\d+\.?\d*/;
        var reM = /\*/;
        var reAS = /-?\d+\.?\d*\s*[\+-]\s*[+-]?\d+\.?\d*/;
        var reA  = /\d\+/;
        var match;
    
        while (match = exp.match(reMD)) {
            exp = match[0].match(reM) ? exp.replace(match[0], multiply(match[0])) : exp.replace(match[0], divide(match[0]));
        }
    
        while (match = exp.match(reAS)) {
            exp  = match[0].match(reA) ? exp.replace(match[0], add(match[0])) : exp.replace(match[0], subtract(match[0]));
        }
    
        return '' + exp;
    
        function multiply(exp, b) {
            b = exp.split('*');
            return b[0] * b[1];
        }
    
        function divide(exp, b) {
            b = s.split('/');
            return b[0] / b[1];
        }
    
        function add(exp, b) {
            exp = exp.replace(/^\+/,'').replace(/\++/,'+');
            b = exp.split('+');
            return Number(b[0]) + Number(b[1]);
        }
    
        function subtract(exp, b) {
            exp = exp.replace(/\+-|-\+/g, '-');
    
            if (exp.match(/--/)) {
                return add(exp.replace(/--/, '+'));
            }
    
            b = exp.split('-');
            return b.length == 3 ? -1 * b[1] - b[2] : b[0] - b[1];
        }
    }
}