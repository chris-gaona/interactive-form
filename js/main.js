$(function() {
  'use strict';

  //Set focus on the first text field on page load
  $('input#name').focus();


  ///////////////////////////////
  //Job Role section of the form.
  ///////////////////////////////

  //otherInput variable holds the input for when other is
  //selected
  var otherInput = '<input type="text" id="other-title" placeholder="Your Title">';

  //job role select on change
  $('select#title').on('change', function() {
    //otherOption variable holds the current options value
    var otherOption = $(this).val();

    //if otherOption equals other do the following...
    if (otherOption === 'other') {
      //append the new input field
      $('fieldset#main').append(otherInput);

    } else {
      //else find id of new input field and remove it
      $('fieldset#main').find('#other-title').remove();
    }
  }); //on change()


  ///////////////////////////////
  //T-Shirt Info section of the form.
  ///////////////////////////////

  //intially hides the color select field
  $('#colors-js-puns').hide();
  //optionsArray variable holds color options & converts
  //it to an array
  var optionsArray = $('#color option').toArray();

  //intialOption variable holds the intial option...not really //needed anymore since I'm hiding the colors select field
  //on page load
  var intialOption = '<option><-- Please select a T-shirt theme</option>';
  //on page load empty the colors select field & append
  //the intialOption
  $('select#color').empty().append(intialOption);

  //theme select field on change
  $('select#design').on('change', function() {
    //designOption variable holds the current options value
    var designOption = $(this).val();

    //if designOption is equal to 'js puns' do the following...
    if (designOption === 'js puns') {
      //show colors select field
      $('#colors-js-puns').show();
      //empty color select field & append first 3 array items
      $('select#color').empty().append(optionsArray[0]).append(optionsArray[1]).append(optionsArray[2]);

    //else if designOption is equal to 'heart js' do the
    //following...
    } else if (designOption === 'heart js') {
      //show colors select field
      $('#colors-js-puns').show();
      //empty color select field & append last 3 array items
      $('select#color').empty().append(optionsArray[3]).append(optionsArray[4]).append(optionsArray[5]);

    } else {
      //else empty color select field & append intialOption...
      //not really needed because I'm hiding color select field
      $('select#color').empty().append(intialOption);

      //hide color select field
      $('#colors-js-puns').hide();
    }
  }); //on change()

  //////////////////////////////
  //Register for Activities section of the form.
  //////////////////////////////

  //Some events are at the same time as others. If the user selects a workshop, don't allow selection of a workshop at the same date and time -- you should disable the checkbox and visually indicate that the workshop in the competing time slot isn't available.
  //activities select field on change
  $('fieldset.activities input').on('change', function() {
    //text variable holds current option's closest label text
    var text = $(this).closest('label').text();
    //splits the string at — & uses pop to return the last
    //portion of the string after —
    var getDayDollar = text.split(' — ').pop();
    //split returns an array with string before ',' as the first
    //part of the array & the string after ',' as the second
    //part of the array
    var dayDollarArray = getDayDollar.split(',');
    //create money variable
    var money;

    //if getDayDollar is equal to $200
    if (getDayDollar === '$200') {
      //money equals getDayDollar and splits the 200 from the
      //$ sign
      money = getDayDollar.split('$');
    } else {
      //else money equals second item in dayDollarArray & splits
      //dollar amount from $ sign
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
      newAmount = parseInt(initialAmount[1], 10) + parseInt(money[1], 10);
      $('p#total-dollars').text('Total: $' + newAmount);

    } else if (!$(this).is(':checked')) {
      initialAmount = $('p#total-dollars').text().split('$');
      newAmount = parseInt(initialAmount[1], 10) - parseInt(money[1], 10);
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
      e.preventDefault();

      $('fieldset.activities').find('span').addClass('visible-block');
    }

    //Payment option must be selected.
    if ($('select#payment').val() === 'select_method') {
      e.preventDefault();

      $('select#payment').prev().prev().children().addClass('visible-block');
    } else {
      $('select#payment').prev().prev().children().removeClass('visible-block');
    }

    //If "Credit card" is the selected payment option, make sure the user supplied a credit card number, a zip code, and a 3 number CVV value.

    //Extra Credit: Validate the credit card number so that it's a validly formatted credit card number. (see the Resources links for information on how to do this.)

    //creates validateCreditCard function & passes in value
    function validateCreditCard(value) {
      // accept only digits, dashes or spaces
      //[ start of a character set
      //^ start of string
      //will accept digits only \d
      //will accept a - after the digits
      //or a \s (space)
      //will accept preceding expression multiple times +
      if (/[\D-\s]+/.test(value)) {
        //return false to prevent anything else in this
        //function from occurring if test is false
        return false;
      }

      //Luhn Algorithm:
      //define variables
      var check = 0;
      var digits = 0;
      var oddNumber = false;

      //for loop defines n variable to equal value.length - 1
      //the -1 drops the last digit
      //as long as n is greater than or equal to 0 keep looping
      //n-- loops backwards
      for(var n = value.length - 1; n >= 0; n--) {
        //cDigit variable holds value and returns
        //each digit in the string in reverse order
        var reverseDigits = value.charAt(n);
        //nDigit variables holds the result of parsing cDigit
        //specifying 10 as the radix (10 is the decimal numeral
        //system commonly used by humans)
        digits = parseInt(reverseDigits, 10);

        //if oddNumber is true do the following
        if (oddNumber) {
          //times each nDigit by 2 and checks to see if it
          //is greater than 9
          if ((digits *= 2) > 9) {
            //minus 9 to every digit that is greater than 9
            digits -= 9;
          }
        }

        //add nDigit to check, which adds all the digits
        //together
        check += digits;
        //changes even to true if it's false or false if
        //it's true...this flips it so that it only does
        //the previous on odd numbered digits
        oddNumber = !oddNumber;
      } //end of for loop

      //check divided by 10 and return the remainder
      //if it equals 0 it's true else it's false
      //the amount that you would need to add to get
      //a multiple of 10
      return (check % 10) == 0;
    }

    function validateZip(zip) {
        var re = /^\d{5}(?:[-\s]\d{4})?$/;
        return re.test(zip);
    }

    function validateCvv(cvv) {
        var re = /^\d{3}/;
        return re.test(cvv);
    }

    if ($('select#payment').val() === 'credit card') {
      var creditCardInput = $('#cc-num').val();
      if (creditCardInput === '' || validateCreditCard(creditCardInput) === false) {
        e.preventDefault();

        $('#cc-num').prev().css('color', 'red');
      } else {
        $('#cc-num').prev().css('color', '#000');
      }

      var zipInput = $('#zip').val();
      if (zipInput === '' || validateZip(zipInput) === false) {
        e.preventDefault();

        $('#zip').prev().css('color', 'red');
      } else {
        $('#zip').prev().css('color', '#000');
      }

      var cvvInput = $('#cvv').val();
      if (cvvInput === '' || validateCvv(cvvInput) === false) {
        e.preventDefault();

        $('#cvv').prev().css('color', 'red');
      } else {
        $('#cvv').prev().css('color', '#000');
      }
    }

  });

});
