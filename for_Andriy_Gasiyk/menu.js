$(document).ready(function() {
  
  var maxRecords = 4;
  var records = [];
  var currentSelection;
  var totalSum = 0;

  // "Витрати", "Дохід"...
  $('.record-form-menu a').click(function () {
      currentSelection = $(this).text();
      // Підсвічуємо обраний пункт
      $('.record-form-menu a').removeClass('selected').removeClass('selectedNot');
      if (currentSelection === 'Витрати' || currentSelection === 'Дохід') {
        $('#inpSum').focus();
      }
      $(this).addClass(currentSelection === 'Переказ' ? 'selectedNot' : 'selected');  
      updateIcon(currentSelection);
    });

  function updateIcon(currentSelection) {
    const inpSum = $('.input');
    const shakeMenu = $('#shake-menu');

    if (currentSelection === 'Витрати') {
      inpSum.css('--input-before-content', '"−"');
      shakeMenu.removeClass('shake-animation');
    } else if (currentSelection === 'Дохід') {
      inpSum.css('--input-before-content', '"+"');
      shakeMenu.removeClass('shake-animation');
    } else if (currentSelection === 'Переказ') {
      inpSum.css('--input-before-content', '"✖"');
      shakeMenu.addClass('shake-animation');
    }
  };

  // Дії при кліці на кнопку "+ запис"
  $('#addEntry , #addEntry1').click(function () {
    $('#add_entry-btn').css({ 'display': 'block' });
    $('#inpSum').focus();
    $('body').css({ 'overflow': 'hidden' });
    $('.record-form-menu a').removeClass('selected selectedNot');
    $('.point.1').addClass('selected');
    currentSelection = 'Витрати';
  });

  // Випадання списку категорій
  $('#FMLeft').click(function() {
    $('#category_select').toggle();
  });

  // Вибір категорії
  $(document).on('click', '.selectItem', function () {
    const selectItemHTML = $(this).html();
    $('#selectedItem').html(selectItemHTML);
  });



  // Генерування списку категорій
  function renderCategories() {
    const categoriesHTML = categories.map(category => `
      <li class="selectItem" style="padding: 5.6px 14px;">
        <div class="icon-option">
          <div class="icon-circle" style="background-color: ${category.color}; font-size: 23px; ${category.style}">
            <span class="${category.class}">${category.icon}</span>
          </div>
          <span class="label">${category.name}</span>
        </div>
      </li>
    `).join('');

    $('.categories').html(categoriesHTML)
  };

  renderCategories();
  
  // При кліці ховати певні елементи
  $('.screen').click(function (event) {
    if (event.target.closest('.field_main.left') === null && event.target.closest('.add_record_form_window') === null) {
      $('#category_select').css('display', 'none');
      $('#add_entry-btn').css('display', 'none');
      $('body').css('overflow', 'auto');
    } else if (event.target.closest('.field_main.left') === null) {
      $('#category_select').css('display', 'none');
    }
  });

  // Закривання меню
  $('#close').click(function() {
    $('#add_entry-btn').css({'display':'none'});
    $('body').css({'overflow':'auto'});
    $('.record-form-menu a').removeClass('selected selectedNot');
    $('.point.1').addClass('selected');
    $('.input').css('--input-before-content', '"−"');
    $('#shake-menu').removeClass('shake-animation');
    $('#inpSum').val('');
    $('#selectedItem').text('Обрати')
  });

  // Функціонал кнопки "Додати запис"
  $('#submitButton , #submitButton1').click(function() {
    const formAnimation = $('#shake-menu')
    const inpSum = $('#inpSum').val();
    const errorSum = $('#errorSum');
    const fmLeft = $('#FMLeft');
    const selectedItem = $('#selectedItem').html();
    const errorSel = $('#errorSel');
    const form = $('#add_entry-btn');
    const time = $('#timePicker').val();
    const date = $('#dataToday').val();
    const currentTime = new Date();
    const transactionTime = new Date(date + ' ' + time);
    const additionalBlock = '<div style="margin: -7px 0 0px 52px; width: max-content;"><span class="span"></span>&nbsp;<span style="color: rgb(53, 64, 82);">Готівка</span></div>';

    // Розрахунок різниці у хвилинах
    const timeDifference = Math.floor((currentTime - transactionTime) / (1000));

    // Генерація відповідного часового запису
    let timeAgo;

    if (timeDifference < 60) {
      timeAgo = `${timeDifference} секунд тому`;
    } else if (timeDifference < 60 * 60) { // менше ніж 60 хвилин
      const minutes = Math.floor(timeDifference / 60);
      timeAgo = `${minutes} ${getNoun(minutes, 'хвилину', 'хвилини', 'хвилин')} тому`;
    } else if (timeDifference < 60 * 60 * 24) { // менше ніж 24 години
      const hours = Math.floor(timeDifference / 60 / 60);
      timeAgo = `${hours} ${getNoun(hours, 'годину', 'години', 'годин')} тому`;
    } else { // якщо >= 24 годин, виводимо дату
      const transactionDate = new Date(date + ' ' + time);
      const options = { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' };
      timeAgo = transactionDate.toLocaleDateString('uk-UA', options);
    };

    function getNoun(number, one, few, many) {
      const absNumber = Math.abs(number);
      if (absNumber % 10 === 1 && absNumber % 100 !== 11) {
        return one;
      }
      if (absNumber % 10 >= 2 && absNumber % 10 <= 4 && (absNumber % 100 < 10 || absNumber % 100 >= 20)) {
        return few;
      }
      return many;
    };

    // const transaction = {
    //   amount: inpSum,
    //   category: selectedItem,
    //   date: date,
    //   sign: currentSelection === 'Витрати' ? '-' : (currentSelection === 'Дохід' ? '+' : ''),
    //   currentSelection: currentSelection
    // };

    if (selectedItem === "Обрати") {
      formAnimation.addClass('shake-animation');
      errorSel.css({ 'display': 'block' });
      fmLeft.css({ 'border': '1px solid rgb(254, 59, 44)' });
    } else {
      errorSel.css({ 'display': 'none' });
      fmLeft.css({ 'border': '1px solid rgb(204, 210, 219)' });
    } if (currentSelection === 'Переказ') {
      formAnimation.addClass('shake-animation');
    } if (inpSum === "" || inpSum === "0" || isNaN(inpSum)) {
      formAnimation.addClass('shake-animation');
      errorSum.css({ 'display': 'block' });
    } else {
      errorSum.css({ 'display': 'none' });
    } if (selectedItem != "Обрати" && inpSum > 0 && currentSelection != 'Переказ') {

      // const newRecord = {
      //   amount: transaction.amount,
      //   category: transaction.category,
      //   timeAgo: timeAgo,
      //   sign: transaction.sign,
      //   currentSelection: transaction
      // };

      const newRecord = {
        amount: inpSum,
        category: selectedItem,
        date: date,
        timeAgo: timeAgo,
        sign: currentSelection === 'Витрати' ? '-' : (currentSelection === 'Дохід' ? '+' : ''),
        currentSelection: currentSelection
      };

      // Додати новий запис до масиву
      records.unshift(newRecord);

      // Каркас для запису
      var newRecordsHtml = records.map(record => {
        return `
          <li class="saved_record">
            <div class="transaction_category">${record.category}${additionalBlock}</div>
            <div class="">
              <p class="amount time ${record.currentSelection}"><b>${record.sign}${record.amount}.00 грн</b></p>
              <p class="timeAgo">${record.timeAgo}</p>
            </div>
          </li>
        `;
      }).join('');

      while (records.length > maxRecords) {
        records.shift();
      } if (currentSelection === 'Витрати') {
        totalSum -= parseFloat(newRecord.amount);
      } else if (currentSelection === 'Дохід') {
        totalSum += parseFloat(newRecord.amount);
      }

      $('#output').html(newRecordsHtml);
      $('#outputSum span').text(`${totalSum.toFixed(2)} грн`);
      localStorage.setItem('outputHtml', newRecordsHtml);

      setTimeout(function () {
        $('#shake-menu').removeClass('shake-animation');
      }, 1000);
      
      form.css({'display':'none'});
      $('#inpSum').val('');
      $('#add_entry-btn').css({'display': 'none'});
      $('body').css({'overflow':'auto'});
      $('.point2').removeClass('selected');
      $('.point.1').addClass('selected');
      $('.input').css('--input-before-content', '"−"');
      $('#selectedItem').text('Обрати');
      $('#shake-menu').removeClass('shake-animation');
    }
  });

  $(document).keydown(function (event) {
    const form = $('#add_entry-btn');
    if (event.key === 'Enter' && form.css('display') === 'block') {
      event.preventDefault(); // Щоб уникнути додаткової обробки Enter (наприклад, відправлення форми)
      $('#submitButton').click();
    }
  });

  $(document).keyup(function (event) {
    if (event.key === '+') {
      $('#add_entry-btn').css({ 'display': 'block' });
      $('#inpSum').focus();
      $('body').css({ 'overflow': 'hidden' });
      $('.record-form-menu a').removeClass('selected selectedNot');
      $('.point.1').addClass('selected');
      currentSelection = 'Витрати';
      return false;
    };
  });

  $('.screen').keydown(function (event) {
    const categorySelect = $('#category_select');
    if (event.key === '+') {
      categorySelect.css({ 'display': 'block' });
    } else if (event.key === '-') {
      if (categorySelect.css('display') === 'none') {
        $('.screen').css({ 'display': 'none' });
      } else {
        categorySelect.css({ 'display': 'none' });
      }
    }
  });

  $('#inpSum').on('keydown', function (e) {
    if (e.key === '-' || e.key === '+') {
      e.preventDefault();
    }
  });
});
