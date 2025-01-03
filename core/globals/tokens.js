class Tokens {
    __list;
    __current = 0;

    previous() {
        this.__current--;
    }

    /**
     * 
     * @returns {{ type: string, value: string, from: number, to: number }} Token
     */
    last() {
        if (this.__current <= 0) return null;
        return this.__list[this.__current - 1];
    }

    /**
     * 
     * @returns {{ type: string, value: string, from: number, to: number }} Token
     */
    ahead() {
        if (this.__current >= this.__list.length) return null;
        return this.__list[this.__current + 1];
    }

    next() {
        this.__current++;
    }

    /**
     * 
     * @returns {{ type: string, value: string, from: number, to: number }} Token
     */
    consume() {
        if (this.__current >= this.__list.length) return null;
        return this.__list[this.__current];
    }

    setTokens(tokens) {
        this.__list = tokens;
    }
}

module.exports = Tokens;
