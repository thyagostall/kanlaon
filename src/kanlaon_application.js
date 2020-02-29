export class KanLaonApplication {
  constructor() {
    this.observers = [];
    this.state = [];
  }

  perform(action) {
    action.execute(this);
  }

  registerObserver(callback) {
    this.observers.push(callback);
  }

  notifyObservers() {
    this.observers.forEach(observer => observer(this.state));
  }
}
