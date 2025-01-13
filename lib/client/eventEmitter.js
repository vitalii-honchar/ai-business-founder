
const eventItemVisible = "item-visible";

class EventEmitter {
    static #instance = null;
    #listeners = {};

    static getInstance() {
        if (!this.#instance) {
            this.#instance = new EventEmitter();
        }
        return this.#instance;
    }

    emit(event, data) {
        if (this.#listeners[event]) {
            this.#listeners[event].forEach(callback => callback(data));
        }
    }

    subscribe(event, callback) {
        if (!this.#listeners[event]) {
            this.#listeners[event] = [];
        }
        this.#listeners[event].push(callback);
        return () => this.unsubscribe(event, callback);
    }

    unsubscribe(event, callback) {
        if (this.#listeners[event]) {
            this.#listeners[event] = this.#listeners[event].filter(cb => cb !== callback);
        }
    }
}

export { eventItemVisible };

export default EventEmitter.getInstance();