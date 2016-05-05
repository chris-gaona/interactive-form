$(function() {
  'use strict';

  //Set focus on the first text field on page load
  $('input#name').focus();


  ///////////////////////////////
  //Job Role section of the form.
  ///////////////////////////////

  //define variables for this section
  var otherInput,
      otherOption,
      fieldsetMain = $('fieldset#main');
  //otherInput variable holds the input for when other is
  //selected
  otherInput = '<input type="text" id="other-title" placeholder="Your Title">';

  //job role select on change
  $('select#title').on('change', function() {
    //otherOption variable holds the current options value
    otherOption = $(this).val();

    //if otherOption equals other do the following...
    if (otherOption === 'other') {
      //append the new input field
      fieldsetMain.append(otherInput);

    } else {
      //else find id of new input field and remove it
      fieldsetMain.find('#other-title').remove();
    }
  }); //on change()


  ///////////////////////////////
  //T-Shirt Info section of the form.
  ///////////////////////////////

  //define variables for this section
  var colorContainer = $('#colors-js-puns'),
      selectColor = $('select#color'),
      optionsArray,
      intialOption,
      designOption;

  //intially hides the color select field
  colorContainer.hide();
  //optionsArray variable holds color options & converts
  //it to an array
  optionsArray = $('#color option').toArray();

  //intialOption variable holds the intial option...not really //needed anymore since I'm hiding the colors select field
  //on page load
  intialOption = '<option><-- Please select a T-shirt theme</option>';
  //on page load empty the colors select field & append
  //the intialOption
  selectColor.empty().append(intialOption);

  //theme select field on change
  $('select#design').on('change', function() {
    //designOption variable holds the current options value
    designOption = $(this).val();

    //if designOption is equal to 'js puns' do the following...
    if (designOption === 'js puns') {
      //show colors select field
      colorContainer.show();
      //empty color select field & append first 3 array items
      selectColor.empty().append(optionsArray[0]).append(optionsArray[1]).append(optionsArray[2]);

    //else if designOption is equal to 'heart js' do the
    //following...
    } else if (designOption === 'heart js') {
      //show colors select field
      colorContainer.show();
      //empty color select field & append last 3 array items
      selectColor.empty().append(optionsArray[3]).append(optionsArray[4]).append(optionsArray[5]);

    } else {
      //else empty color select field & append intialOption...
      //not really needed because I'm hiding color select field
      selectColor.empty().append(intialOption);

      //hide color select field
      colorContainer.hide();
    }
  }); //on change()


  //////////////////////////////
  //Register for Activities section of the form.
  //////////////////////////////

  //define variables for this section
  var text,
      getDayDollar,
      dayDollarArray,
      money;

  //activities select field on change
  $('fieldset.activities input').on('change', function() {
    //text variable holds current option's closest label text
    text = $(this).closest('label').text();
    //getDayDollar variable holds the split of the string at — & uses pop
    //to return the last portion of the string after —
    getDayDollar = text.split(' — ').pop();
    //dayDollarArray variable holds the split at the ',' &
    //returns an array with string before ',' as the first
    //part of the array & the string after ',' as the second
    //part of the array
    dayDollarArray = getDayDollar.split(',');

    //if getDayDollar is equal to $200, which equals the Main Conference
    //checkbox
    if (getDayDollar === '$200') {
      //money equals getDayDollar and splits the 200 from the
      //$ sign & the pop returns the last part of the array
      money = getDayDollar.split('$').pop();
    } else {
      //else money equals second item in dayDollarArray & splits
      //dollar amount from $ sign & the pop returns the last part of
      //the array
      money = dayDollarArray[1].split('$').pop();
    }

    //if current checkbox is checked do the following...
    if ($(this).is(':checked')) {
      //target the parent label and it's siblings of the current checkbox
      //& for each sibling do the following...
      $(this).parent('label').siblings().each(function() {
        //if current sibling's text matches the text in the first part
        //of dayDollarArray
        if ($(this).text().indexOf(dayDollarArray[0]) != -1) {
          //change current sibling's css opacity to 0.2
          $(this).css('opacity', '0.2');
          //change current sibling's input to disabled
          $(this).children('input').attr('disabled', true);
        }
      });

    //else if current checkbox is not checked do the following...
    } else {
      //target the parent label and it's siblings of the current checkbox
      //& for each sibling do the following...
      $(this).parent('label').siblings().each(function() {
        //if current sibling's text matches the text in the first part
        //of dayDollarArray
        if ($(this).text().indexOf(dayDollarArray[0]) != -1) {
          //change current sibling's css opacity to 1 to make it fully
          //visible
          $(this).css('opacity', '1');
          //change current sibling's input to enabled
          $(this).children('input').attr('disabled', false);
        }
      });
    }

    //As a user selects activities to register for, a running total is listed below the list of checkboxes. For example, if the user selects "Main conference" then Total: $200 should appear. If they add 1 workshop the total should change to Total: $300.
    var amount = '<p id="total-dollars">Total: $' + money + '</p>';
    var initialAmount;
    var newAmount;

    if ($(this).is(':checked') && $('p#total-dollars').text().length === 0) {
      $('fieldset.activities').after(amount);

    } else if ($(this).is(':checked') && $('p#total-dollars').text().length !== 0){
      initialAmount = $('p#total-dollars').text().split('$');
      newAmount = parseInt(initialAmount[1], 10) + parseInt(money, 10);
      $('p#total-dollars').text('Total: $' + newAmount);

    } else if (!$(this).is(':checked')) {
      initialAmount = $('p#total-dollars').text().split('$');
      newAmount = parseInt(initialAmount[1], 10) - parseInt(money, 10);
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
      return (check % 10) === 0;
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
