export class FormTimecard {
  constructor(submitCallback) {
    const form = document.querySelector('#time-card-form');
    this.dateField = form.querySelector('input[name="date"]');
    this.startTimeField = form.querySelector('input[name="start-time"]');
    this.endTimeField = form.querySelector('input[name="end-time"]');
    this.breakDurationField = form.querySelector('input[name="break-duration"]');
    this.submitButton = form.querySelector('input[type=submit]');

    this.submitButton.addEventListener('click', (e) => {
      submitCallback();
      e.preventDefault();
    });
  }

  focus() {
    this.startTimeField.focus();
  }

  enable() {
    this.dateField.disabled = false;
    this.startTimeField.disabled = false;
    this.endTimeField.disabled = false;
    this.breakDurationField.disabled = false;
    this.submitButton.disabled = false;
  }

  disable() {
    this.dateField.disabled = true;
    this.startTimeField.disabled = true;
    this.endTimeField.disabled = true;
    this.breakDurationField.disabled = true;
    this.submitButton.disabled = true;
  }

  clear() {
    this.dateField.value = '';
    this.startTimeField.value = '';
    this.endTimeField.value = '';
    this.breakDurationField.value = '';
  }

  setData(timecard) {
    this.dateField.value = timecard.date;
    this.startTimeField.value = timecard.startTime;
    this.endTimeField.value = timecard.endTime;
    this.breakDurationField.value = timecard.breakDuration;
  }

  getData() {
    return {
      date: this.dateField.value,
      startTime: this.startTimeField.value,
      endTime: this.endTimeField.value,
      breakDuration: this.breakDurationField.value
    }
  }
}
