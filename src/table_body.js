export class TableBody {

  constructor(editButtonCallback) {
    const tableBody = document.querySelector('#time-card-table');
    tableBody.addEventListener('click', (e) => {
      if (e.target.parentNode.id !== 'edit-button')
        return;

      editButtonCallback(e.target.parentNode.parentNode.parentNode.dataset.id);
      e.preventDefault();
    });
  }

  updateState(timecards) {
    for (let timecard of timecards) {
      this.updateRow(timecard);
    }
  }

  updateRow(timecard) {
    let row = document.querySelector(`tr[data-id="${timecard.date}"]`);
    if (!row) {
      row = this.createNewRow(`${timecard.date}`);

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

  createNewRow(id) {
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

}
