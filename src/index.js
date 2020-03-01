import { KanLaonApplication } from './kanlaon_application';
import { FormTimecard } from './form_timecard';

const form = new FormTimecard(() => {
  const timecard = form.getData();

  kanLaon.dispatch({ type: 'update-timecard', timecard: timecard });
  setTimeout(() => {
    timecard.finished = true;
    kanLaon.dispatch({ type: 'update-timecard', timecard: timecard });
  }, 2000);
});

const tableBody = document.querySelector('#time-card-table');
tableBody.addEventListener('click', (e) => {
  if (e.target.parentNode.id !== 'edit-button')
    return;

  kanLaon.dispatch({ type: 'edit-timecard', timecardId: e.target.parentNode.parentNode.parentNode.dataset.id });

  e.preventDefault();
});

const kanLaon = new KanLaonApplication((state, action) => {
  if (action.type === 'add-timecard') {
    state.push(action.timecard);
  } else if (action.type === 'edit-timecard') {
    const timecard = state.find(element => element.date === action.timecardId);

    form.setData(timecard);
    form.enable();
    form.focus();
  } else if (action.type === 'update-timecard') {
    const index = state.findIndex(element => element.date === action.timecard.date);
    state.splice(index, 1, action.timecard);

    form.clear();
    form.disable();
  }
});

kanLaon.subscribe((app) => {
  const timecards = app.getState();
  for (let timecard of timecards) {
    updateTimeCard(timecard);
  }
});

kanLaon.dispatch({type: 'add-timecard', timecard: {finished: true, date: '2020-02-21', startTime: '07:30', endTime: '16:20', breakDuration: '01:00'}});
kanLaon.dispatch({type: 'add-timecard', timecard: {finished: true, date: '2020-02-22', }});
kanLaon.dispatch({type: 'add-timecard', timecard: {finished: true, date: '2020-02-23', }});
kanLaon.dispatch({type: 'add-timecard', timecard: {finished: true, date: '2020-02-24', }});
kanLaon.dispatch({type: 'add-timecard', timecard: {finished: true, date: '2020-02-25', }});
kanLaon.dispatch({type: 'add-timecard', timecard: {finished: true, date: '2020-02-26', startTime: '07:54', endTime: '18:43', breakDuration: '01:00'}});
kanLaon.dispatch({type: 'add-timecard', timecard: {finished: true, date: '2020-02-27', startTime: '07:42', endTime: '18:25', breakDuration: '01:00'}});
kanLaon.dispatch({type: 'add-timecard', timecard: {finished: true, date: '2020-02-28', startTime: '10:59', endTime: '21:50', breakDuration: '01:00'}});
kanLaon.dispatch({type: 'add-timecard', timecard: {finished: true, date: '2020-02-29', }});
kanLaon.dispatch({type: 'add-timecard', timecard: {finished: true, date: '2020-03-01', }});
kanLaon.dispatch({type: 'add-timecard', timecard: {finished: true, date: '2020-03-02', startTime: '07:30', endTime: '18:00', breakDuration: '01:00'}});
kanLaon.dispatch({type: 'add-timecard', timecard: {finished: true, date: '2020-03-03', startTime: '06:50', endTime: '15:40', breakDuration: '01:00'}});
kanLaon.dispatch({type: 'add-timecard', timecard: {finished: true, date: '2020-03-04', startTime: '07:30', endTime: '18:00', breakDuration: '01:00'}});
kanLaon.dispatch({type: 'add-timecard', timecard: {finished: true, date: '2020-03-05', startTime: '07:30', endTime: '18:00', breakDuration: '01:00'}});
kanLaon.dispatch({type: 'add-timecard', timecard: {finished: true, date: '2020-03-06', startTime: '06:50', endTime: '15:40', breakDuration: '01:00'}});
kanLaon.dispatch({type: 'add-timecard', timecard: {finished: true, date: '2020-03-07', }});
kanLaon.dispatch({type: 'add-timecard', timecard: {finished: true, date: '2020-03-08', }});
kanLaon.dispatch({type: 'add-timecard', timecard: {finished: true, date: '2020-03-09', startTime: '07:30', endTime: '18:00', breakDuration: '01:00'}});
kanLaon.dispatch({type: 'add-timecard', timecard: {finished: true, date: '2020-03-10', startTime: '06:50', endTime: '15:40', breakDuration: '01:00'}});
kanLaon.dispatch({type: 'add-timecard', timecard: {finished: true, date: '2020-03-11', startTime: '07:30', endTime: '18:00', breakDuration: '01:00'}});
kanLaon.dispatch({type: 'add-timecard', timecard: {finished: true, date: '2020-03-12', startTime: '07:30', endTime: '18:00', breakDuration: '01:00'}});
kanLaon.dispatch({type: 'add-timecard', timecard: {finished: true, date: '2020-03-13', startTime: '06:50', endTime: '15:40', breakDuration: '01:00'}});
kanLaon.dispatch({type: 'add-timecard', timecard: {finished: true, date: '2020-03-14', }});
kanLaon.dispatch({type: 'add-timecard', timecard: {finished: true, date: '2020-03-15', }});
kanLaon.dispatch({type: 'add-timecard', timecard: {finished: true, date: '2020-03-16', startTime: '07:30', endTime: '18:00', breakDuration: '01:00'}});
kanLaon.dispatch({type: 'add-timecard', timecard: {finished: true, date: '2020-03-17', startTime: '06:50', endTime: '15:40', breakDuration: '01:00'}});
kanLaon.dispatch({type: 'add-timecard', timecard: {finished: true, date: '2020-03-18', startTime: '07:30', endTime: '18:00', breakDuration: '01:00'}});
kanLaon.dispatch({type: 'add-timecard', timecard: {finished: true, date: '2020-03-19', startTime: '07:30', endTime: '17:28', breakDuration: '01:00'}});
kanLaon.dispatch({type: 'add-timecard', timecard: {finished: true, date: '2020-03-20', startTime: '06:50', endTime: '15:40', breakDuration: '01:00'}});

function updateTimeCard(timecard) {
  let row = document.querySelector(`tr[data-id="${timecard.date}"]`);
  if (!row) {
    row = createNewRow(`${timecard.date}`);

    const table = document.querySelector('#time-card-table');
    table.appendChild(row);
  }

  const day = timecard.date.match(/(\d{4})-(\d{2})-(\d{2})/)[3];
  row.querySelector('td[data-field-name="day"]').textContent = day;
  row.querySelector('td[data-field-name="start-time"]').textContent = timecard.startTime;
  row.querySelector('td[data-field-name="end-time"]').textContent = timecard.endTime;
  row.querySelector('td[data-field-name="break-duration"]').textContent = timecard.breakDuration;

  if (timecard.finished) {
    row.className = '';
  } else {
    row.className = 'performing-action-row';
  }
}

function createNewRow(id) {
  const row = document.createElement('tr');
  row.dataset.id = id;

  const dayColumn = document.createElement('td');
  dayColumn.dataset.fieldName = 'day';

  const startTimeColumn = document.createElement('td');
  startTimeColumn.dataset.fieldName = 'start-time';
  startTimeColumn.className = 'text-center';

  const endTimeColumn = document.createElement('td');
  endTimeColumn.dataset.fieldName = 'end-time';
  endTimeColumn.className = 'text-center';

  const breakDurationColumn = document.createElement('td');
  breakDurationColumn.dataset.fieldName = 'break-duration';
  breakDurationColumn.className = 'text-center';

  const editColumn = document.createElement('td');
  editColumn.className = 'text-center';
  editColumn.innerHTML = `<a href="#" id="edit-button"><i class="fa fa-edit"></i></a>`;

  row.appendChild(dayColumn);
  row.appendChild(startTimeColumn);
  row.appendChild(endTimeColumn);
  row.appendChild(breakDurationColumn);
  row.appendChild(editColumn);

  return row;
}
