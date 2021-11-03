export class StatusLogger {
    target;

    constructor(target) {
        this.target = target;
    }

    message(text) {
        this.#createLog('message', text);
    }
    blood(text) {
        this.#createLog('blood', text);
    }
    shout(text) {
        this.#createLog('shout', text);
    }
    info(text) {
        this.#createLog('info', text);
    }

    #createLog(classNamePostfix, text) {
        const element = document.createElement('div');
        element.className = `status-log-${classNamePostfix}`;
        element.textContent = text;
        this.target.appendChild(element);        
        this.target.scrollTop = this.target.scrollHeight;
    }

}