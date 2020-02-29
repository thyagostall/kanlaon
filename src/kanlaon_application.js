export class KanLaonApplication {
  constructor() {
    this.observers = [];
  }

  perform(action) {
    action.execute(this);
  }

  registerObserver(callback) {
    this.observers.push(callback);
  }

  notifyObservers(event) {
    this.observers.forEach(observer => observer(event));
  }

  saveTimeCard(timecard) {
    this.notifyObservers(timecard);
  }
}
