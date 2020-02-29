export class SaveTimeCardAction {
  constructor(day, startTime, endTime) {
    this.day = day;
    this.startTime = startTime;
    this.endTime = endTime;
    this.finished = false;
  }

  execute(app) {
    app.state.timecards.push({
      day: this.day,
      startTime: this.startTime,
      endTime: this.endTime
    });

    app.notifyObservers();
  }
}
