$(function() {
  'use strict';

  //Set focus on the first text field on page load
  $('input#name').focus();

  //Job Role section of the form. Reveal a text field when the "Other" option is selected from the "Job Role" drop down menu
  var otherInput = '<input type="text" id="other-title" placeholder="Your Title">';

  $('select#title').on('change', function() {
    var otherOption = $(this).val();

    if (otherOption === 'other') {
      $('fieldset#main').append(otherInput);

    } else {
      $('fieldset#main').find('#other-title').remove();
    }
  });

  //T-Shirt Info section of the form. For the T-Shirt color menu, only display the options that match the design selected in the "Design" menu.

  //Extra Credit: Hide the "Color" label and select menu until a T-Shirt design is selected from the "Design" menu.
  $('#colors-js-puns').hide();
  var optionsArray = $('#color option').toArray();

  var intialOption = '<option><-- Please select a T-shirt theme</option>';
  $('select#color').empty().append(intialOption);

  $('select#design').on('change', function() {
    var designOption = $(this).val();

    if (designOption === 'js puns') {
      $('#colors-js-puns').show();
      $('select#color').empty().append(optionsArray[0]).append(optionsArray[1]).append(optionsArray[2]);

    } else if (designOption === 'heart js') {
      $('#colors-js-puns').show();
      $('select#color').empty().append(optionsArray[3]).append(optionsArray[4]).append(optionsArray[5]);

    } else {
      $('select#color').empty().append(intialOption);
      $('#colors-js-puns').hide();
    }
  });

  //Register for Activities section of the form.

  //Some events are at the same time as others. If the user selects a workshop, don't allow selection of a workshop at the same date and time -- you should disable the checkbox and visually indicate that the workshop in the competing time slot isn't available.
  $('fieldset.activities input').on('change', function() {
    var text = $(this).closest('label').text();
    //splits the string at — & use pop to return the last
    //portion of the string after —
    var getDayDollar = text.split(' — ').pop();
    //split returns an array with string before ',' as the first
    //part of the array & the string after ',' as the second
    //part of the array
    var dayDollarArray = getDayDollar.split(',');
    //create money variable
    var money;

    if (getDayDollar === '$200') {
      money = getDayDollar.split('$');
    } else {
      money = dayDollarArray[1].split('$');
    }

    //When a user unchecks an activity, make sure that competing activities (if there are any) are no longer disabled.
    if ($(this).is(':checked')) {
      $(this).parent('label').siblings().each(function() {
        if ($(this).text().indexOf(dayDollarArray[0]) != -1) {
          $(this).css('opacity', '0.2');
          $(this).children('input').attr('disabled', true);
        }
      });
    } else {
      $(this).parent('label').siblings().each(function() {
        if ($(this).text().indexOf(dayDollarArray[0]) != -1) {
          $(this).css('opacity', '1');
          $(this).children('input').attr('disabled', false);
        }
      });
    }

    //As a user selects activities to register for, a running total is listed below the list of checkboxes. For example, if the user selects "Main conference" then Total: $200 should appear. If they add 1 workshop the total should change to Total: $300.
    var amount = '<p id="total-dollars">Total: $' + money[1] + '</p>';
    var initialAmount;
    var newAmount;

    if ($(this).is(':checked') && $('p#total-dollars').text().length === 0) {
      $('fieldset.activities').after(amount);

    } else if ($(this).is(':checked') && $('p#total-dollars').text().length !== 0){
      initialAmount = $('p#total-dollars').text().split('$');
      newAmount = parseInt(initialAmount[1]) + parseInt(money[1]);
      $('p#total-dollars').text('Total: $' + newAmount);

    } else if (!$(this).is(':checked')) {
      initialAmount = $('p#total-dollars').text().split('$');
      newAmount = parseInt(initialAmount[1]) - parseInt(money[1]);
      $('p#total-dollars').text('Total: $' + newAmount);
    }

    if ($('p#total-dollars').text() === 'Total: $0') {
      $('p#total-dollars').remove();
    }

  }); //on change()


  //Payment Info section of the form. Display payment sections based on chosen payment option

  $('#credit-card').hide().next('div').hide().next('div').hide();

  //When a user selects the "Credit Card" payment option, display the #credit-card div, and hide the "Paypal" and "Bitcoin information.
  //When a user selects the "PayPal" payment option, display the Paypal information, and hide the credit card information and the "Bitcoin" information.
  //When a user selects the "Bitcoin" payment option, display the Bitcoin information, and hide the credit card information.
  $('#cvv').attr('maxlength', '3');

  $('select#payment').on('change', function() {
    var paymentOption = $(this).val();

    if (paymentOption === 'credit card') {
      $('#credit-card').show().next('div').hide().next('div').hide();

    } else if (paymentOption === 'paypal') {
      $('#credit-card').hide().next('div').show().next('div').hide();

    } else if (paymentOption === 'bitcoin') {
      $('#credit-card').hide().next('div').hide().next('div').show();

    } else if (paymentOption === 'select_method') {
      $('#credit-card').hide().next('div').hide().next('div').hide();
    }

  });


  //Form validation. Display error messages and don't let the user submit the form if any of these validation errors exist:
  //function to validate email input
  function validateEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
  }

  $('form').on('submit', function(e) {
    //Name field can't be empty
    if ($('input#name').val() === '') {
      e.preventDefault();

      $('input#name').prev().css('color', 'red').find('span').addClass('visible');
    }

    //Email field must be a validly formatted e-mail address (you don't have to check that it's a real e-mail address, just that it's formatted like one: dave@teamtreehouse.com for example. You'll need to use a regular expression to get this requirement. See the list of Resources for links to learn about regular expressions.
    var emailInput = $('input#mail').val();

    if (emailInput === '' || validateEmail(emailInput) === false) {
      e.preventDefault();

      $('input#mail').prev().css('color', 'red').find('span').addClass('visible');
    }

    //make sure a shirt is picked --> design & color
    if ($('select#design').val() === 'Select Theme') {
      e.preventDefault();

      $('fieldset.shirt').find('span').addClass('visible-block');
    }

    //At least one activity must be checked from the list under "Register for Activities."
    var oneIsChecked = false;
    $('fieldset.activities input').each(function() {
      if ($(this).is(':checked')) {
        oneIsChecked = true;
        return false;
      }
    });

    if (oneIsChecked === true) {
      $('fieldset.activities').find('span').removeClass('visible-block');
    } else {
      $('fieldset.activities').find('span').addClass('visible-block');
    }

    //Payment option must be selected.
    if ($('select#payment').val() === 'select_method') {
      $('select#payment').prev().prev().children().addClass('visible-block');
    } else {
      $('select#payment').prev().prev().children().removeClass('visible-block');
    }

    //If "Credit card" is the selected payment option, make sure the user supplied a credit card number, a zip code, and a 3 number CVV value.
    function validateZip(zip) {
        var re = /^\d{5}(?:[-\s]\d{4})?$/;
        return re.test(zip);
    }

    function validateCvv(cvv) {
        var re = /^\d{3}/;
        return re.test(cvv);
    }

    if ($('select#payment').val() === 'credit card') {
      if ($('#cc-num').val() === '') {
        $('#cc-num').prev().css('color', 'red');
      } else {
        $('#cc-num').prev().css('color', '#000');
      }

      var zipInput = $('#zip').val();
      if (zipInput === '' || validateZip(zipInput) === false) {
        $('#zip').prev().css('color', 'red');
      } else {
        $('#zip').prev().css('color', '#000');
      }

      var cvvInput = $('#cvv').val();
      if (cvvInput === '' || validateCvv(cvvInput) === false) {
        $('#cvv').prev().css('color', 'red');
      } else {
        $('#cvv').prev().css('color', '#000');
      }
    }

  });


  //Style the "select" menus (drop down menus) on the form, so they match the styling of the text fields (see Resources links for an article on how to improve the look of select menus using CSS and JavaScript).


  //Validate the credit card number so that it's a validly formatted credit card number. (see the Resources links for information on how to do this.)

});
