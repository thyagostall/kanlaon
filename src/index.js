import { KanLaonApplication } from './kanlaon_application';
import { SaveTimeCardAction } from './save_timecard_action';

document.querySelector("#time-card input[type=submit]").addEventListener('click', saveTimeCard);

let counter = 0;

const kanLaon = new KanLaonApplication();
kanLaon.registerObserver(updateTimeCardAction);

function saveTimeCard(e) {
  const day = document.querySelector('#time-card input[name=day]').value;
  const startTime = document.querySelector('#time-card input[name=start-time]').value;
  const endTime = document.querySelector('#time-card input[name=end-time]').value;

  kanLaon.perform(new SaveTimeCardAction(counter++, day, startTime, endTime));

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

