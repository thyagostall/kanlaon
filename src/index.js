import { KanLaonApplication } from './kanlaon_application';
import { SaveTimeCardAction } from './save_timecard_action';

document.querySelector("#time-card input[type=submit]").addEventListener('click', saveTimeCard);

document.querySelector('tbody#time-card').addEventListener('click', focusOnForm);

function focusOnForm(e) {
  document.querySelector('#modal-form input[name=day]').focus();

  e.preventDefault();
};

const kanLaon = new KanLaonApplication();
kanLaon.registerObserver(refreshState);
kanLaon.state = {
  timecards: [
    {day: 1, startTime: '08:00', endTime: '12:00'},
    {day: 1, startTime: '13:00', endTime: '18:00'},
    {day: 2, startTime: '08:00', endTime: '12:00'},
    {day: 2, startTime: '13:00', endTime: '18:00'},
    {day: 3, startTime: '08:00', endTime: '12:00'},
    {day: 3, startTime: '13:00', endTime: '18:00'},
    {day: 4, startTime: '08:00', endTime: '12:00'},
    {day: 4, startTime: '13:00', endTime: '18:00'}
  ]
}
kanLaon.notifyObservers();

function saveTimeCard(e) {
  const day = document.querySelector('#time-card input[name=day]').value;
  const startTime = document.querySelector('#time-card input[name=start-time]').value;
  const endTime = document.querySelector('#time-card input[name=end-time]').value;

  kanLaon.perform(new SaveTimeCardAction(day, startTime, endTime));

  e.preventDefault();
}

function refreshState(state) {
  for (const timecard of state.timecards) {
    updateTimeCard(timecard);
  }
}

function updateTimeCard(timecard) {
  let row = document.querySelector(`tr[data-id="${timecard.day}-${timecard.startTime}-${timecard.endTime}"]`);
  if (!row) {
    row = document.createElement('tr');
    row.dataset.id = `${timecard.day}-${timecard.startTime}-${timecard.endTime}`;

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
    row.className = 'text-center performing-action-row';
  } else {
    row.className = 'text-center';
  }
}

