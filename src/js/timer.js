 export default class CountdownTimer{
  constructor({selector, targetDate}) {
    this.targetDate = targetDate;
    this.timerSelector = document.querySelector(selector);

    this.timerDays = this.timerSelector.querySelector('[data-value="days"]');
    this.timerHours = this.timerSelector.querySelector('[data-value="hours"]');
    this.timerMins = this.timerSelector.querySelector('[data-value="mins"]');
    this.timerSecs = this.timerSelector.querySelector('[data-value="secs"]');
    
    this.timerInterval = null;
    this.timerIsActive = false; 
   };
  //Добавляет ноль впереди, если число не двухзначное
  pad(value) {
    return String(value).padStart(2, '0');
  };
  //переводит в нужный формат
  getTime(time) { /*
 * Оставшиеся дни: делим значение UTC на 1000 * 60 * 60 * 24, количество
 * миллисекунд в одном дне (миллисекунды * секунды * минуты * часы)
 */
const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
/*
 * Оставшиеся часы: получаем остаток от предыдущего расчета с помощью оператора
 * остатка % и делим его на количество миллисекунд в одном часе
 * (1000 * 60 * 60 = миллисекунды * минуты * секунды)
 */
const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
/*
 * Оставшиеся минуты: получаем оставшиеся минуты и делим их на количество
 * миллисекунд в одной минуте (1000 * 60 = миллисекунды * секунды)
 */
const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
/*
 * Оставшиеся секунды: получаем оставшиеся секунды и делим их на количество
 * миллисекунд в одной секунде (1000)
 */
  const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

  return {days, hours, mins, secs};};
  //выводит значения в цикле
   timerStart() {
      if (this.timerIsActive) {
      console.log('timer is active');
      return
     };
     this.timerIsActive = true;
     this.timerInterval = setInterval(() => {
       const timeDifference = this.targetDate - new Date();
       //const timeDifference = new Date() - this.targetDate; //для проверки 
     if (timeDifference < 0) {
       console.log('timer is finish');
       clearTimeout(this.timerInterval);
       return
     }; 
      this.setValue(this.getTime(timeDifference));
     }, 1000);
   };
  //выводит значения на страницу
   setValue({days, hours, mins, secs}) {
     this.timerDays.textContent = days;
     this.timerHours.textContent = hours;
     this.timerMins.textContent = mins;
     this.timerSecs.textContent = secs;
   };
};
const time = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Feb 13, 2022'),
});
time.timerStart();