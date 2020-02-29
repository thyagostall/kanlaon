document.querySelector("#time-card input[type=submit]").addEventListener('click', saveTimeCard);

let counter = 0;

class ApplicationState {
  constructor() {
    this.observers = [];
  }

  performAction(action) {
    action.execute(this);
  }

  registerObserver(callback) {
    this.observers.push(callback);
  }

  notifyObservers(event) {
    this.observers.forEach(observer => observer(event));
  }
}

class SaveTimeCardAction {
  constructor(id, day, startTime, endTime) {
    this.id = id;
    this.day = day;
    this.startTime = startTime;
    this.endTime = endTime;
    this.finished = false;
  }

  execute(applicationState) {
    applicationState.notifyObservers(this);
    setTimeout(() => {
      this.finished = true;
      applicationState.notifyObservers(this);
    }, 2000);
  }
}

const applicationState = new ApplicationState();
applicationState.registerObserver(updateTimeCardAction);

function saveTimeCard(e) {
  const day = document.querySelector('#time-card input[name=day]').value;
  const startTime = document.querySelector('#time-card input[name=start-time]').value;
  const endTime = document.querySelector('#time-card input[name=end-time]').value;

  applicationState.performAction(new SaveTimeCardAction(counter++, day, startTime, endTime));

  e.preventDefault();
}

function updateTimeCardAction(timecard) {
  console.log(timecard);
  let row = document.querySelector(`tr[data-id="${timecard.id}"]`);
  if (!row) {
    row = document.createElement('tr');
    row.dataset.id = timecard.id;

    const dayColumn = document.createElement('td');
    dayColumn.dataset.fieldName = 'day';

    const startTimeColumn = document.createElement('td');
    startTimeColumn.dataset.fieldName = 'start-time';

    const endTimeColumn = document.createElement('td');
    endTimeColumn.dataset.fieldName = 'end-time';

    row.appendChild(dayColumn);
    row.appendChild(startTimeColumn);
    row.appendChild(endTimeColumn);

    const table = document.querySelector('tbody#time-card');
    table.appendChild(row);
  }

  row.querySelector('td[data-field-name="day"]').textContent = timecard.day;
  row.querySelector('td[data-field-name="start-time"]').textContent = timecard.startTime;
  row.querySelector('td[data-field-name="end-time"]').textContent = timecard.endTime;

  if (!timecard.finished) {
    row.className = 'performing-action-row';
  } else {
    row.className = '';
  }
}

