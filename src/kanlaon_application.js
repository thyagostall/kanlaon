export class KanLaonApplication {
  constructor(dispatchHandler) {
    this.subscribers = [];
    this.state = [];

    this.dispatchHandler = dispatchHandler;
  }

  subscribe(callback) {
    this.subscribers.push(callback);
  }

  dispatch(action) {
    this.dispatchHandler(this.state, action);
    this.subscribers.forEach(callback => callback(this));
  }

  getState() {
    return this.state;
  }
}
