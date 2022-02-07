/**
    E -> T E1 .
    E1 -> sop T E1 | .
    T -> F T1 .
    T1 -> pop F T1 | .
    F -> lpar E rpar | number .
 */

class AST_Node {
    constructor(type, value = null) {
        this.type = type.toUpperCase();
        if (value) this.value = value;
    }

    static lparen = () => new AST_Node('l_paren');
    static rparen = () => new AST_Node('r_paren');
    static sop = value => new AST_Node('operator', value);
    static pop = value => new AST_Node('operator', value);
    static number = value => new AST_Node('number', value);

    static prod_handler = value => {
        if (Array.isArray(value)) {
            // console.log(`prod handler: ${JSON.stringify(value, null, 2)}`)
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

    static prod_prime_handler = value => {
        // console.log(`prime handler: ${JSON.stringify(value, null, 2)}`)
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

module.exports = {
    AST_Node
}