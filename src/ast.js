/**
    E -> T E1 .
    E1 -> sop T E1 | .
    T -> F T1 .
    T1 -> pop F T1 | .
    F -> lpar E rpar | number .
 */

class AST {
    static lparen = () => new AST_LParen();
    static rparen = () => new AST_RParen();
    static sop = value => new AST_BinaryOp(value);
    static pop = value => new AST_BinaryOp(value);
    static number = value => new AST_Number(value);

    static handler = value => {
        if (Array.isArray(value)) {
            switch (value.length) {
                case 1:
                    return value[0];
                case 2:
                    value[1].left = value[0];
                    break;
            }
            return value[1];
        }
        return value;
    };

    static p_handler = value => {
        if (Array.isArray(value)) {
            switch (value.length) {
                case 1:
                    return value[0];
                case 2:
                    value[0].right = value[1];
                    break;
                case 3:
                    value[2].left = value[1];
                    value[0].right = value[2];
                    break;
            }
            return value[0];
        }
        return value;
    };
}

class AST_Node {
    constructor(type, value = null) {
        this.type = type.toUpperCase();
        if (value) this.value = value;
    }
}

class AST_LParen extends AST_Node {
    constructor() {
        super('l_paren');
    }

    eval() {
        return;
    }
}

class AST_RParen extends AST_Node {
    constructor() {
        super('r_paren');
    }

    eval() {
        return;
    }
}

class AST_BinaryOp extends AST_Node {
    constructor(value) {
        super('binary_op', value);
    }

    eval() {
        const operandA = this.left.eval();
        const operandB = this.right.eval();
        switch (this.value) {
            case '+':
                return operandA + operandB;
            case '-':
                return operandA - operandB;
            case '*':
                return operandA * operandB;
            case '/':
                return operandA / operandB;
        }
    }
}

class AST_Number extends AST_Node {
    constructor(value) {
        super('number', value);
    }

    eval() {
        return parseFloat(this.value);
    }
}

module.exports = {
    AST
}