$(document).ready(function() {
  // Відкривання й закривання субменю
  $('.menu_btn').click(function() {
    if ($('.submenu').css('display') === 'none') {
      $('.submenu').addClass('show');
    } else {
      $('.submenu').removeClass('show');
    }
  });

  // Встановлення дати
  $('#dataToday').val(new Date().toISOString().slice(0, 10));
  
  const currentDate = new Date();
  const currentHour = currentDate.getHours();
  const currentMinute = currentDate.getMinutes();
  const currentTimeString = `${currentHour}:${currentMinute}`;

  flatpickr("#timePicker", {
    enableTime: true,
    dateFormat: "H:i", // Формат виведення тільки часу з секундами
    defaultDate: currentTimeString,
  });

  const months = [
    'Січень', 'Лютий', 'Березень', 'Квітень',
    'Травень', 'Червень', 'Липень', 'Серпень',
    'Вересень', 'Жовтень', 'Листопад', 'Грудень'
  ];

  let currentMonthIndex = currentDate.getMonth();
  const prevMonthButton = $('#prevMonth');
  const nextMonthButton = $('#nextMonth');
  const currentMonthElement = $('#currentMonth');

  function updateMonth() {
    currentMonthElement.text(months[currentMonthIndex] + ' 2024');
  }

  prevMonthButton.click(function () {
    if (currentMonthIndex > 0) {
      currentMonthIndex--;
      updateMonth();
    }
  });

  nextMonthButton.click(function () {
    if (currentMonthIndex < months.length - 1) {
      currentMonthIndex++;
      updateMonth();
    }
  });

  // Ініціалізація при завантаженні сторінки
  updateMonth();

  $('#out').click(function () {
    $('#end').toggleClass('show');
    $('#body').css('display', 'none');
  });
});