export class SaveTimeCardAction {
  constructor(id, day, startTime, endTime) {
    this.id = id;
    this.day = day;
    this.startTime = startTime;
    this.endTime = endTime;
    this.finished = false;
  }

  execute(app) {
    app.saveTimeCard(this);
  }
}
