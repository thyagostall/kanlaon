import { KanLaonApplication } from './kanlaon_application';
import { FormTimecard } from './form_timecard';
import { TableBody } from './table_body';

const form = new FormTimecard(() => {
  const timecard = form.getData();

  kanLaon.dispatch({ type: 'update-timecard', timecard: timecard });
  setTimeout(() => {
    timecard.finished = true;
    kanLaon.dispatch({ type: 'update-timecard', timecard: timecard });
  }, 2000);
});

const tableBody = new TableBody((timecardId) => {
  kanLaon.dispatch({ type: 'edit-timecard', timecardId: timecardId });
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
  tableBody.updateState(timecards);
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
