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
      //adds focus to newly appended input field
      $('#other-title').focus();

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

  //activities select field on change
  $('fieldset.activities input').on('change', function() {
    //define variables for this section
    var text,
        getDayDollar,
        dayDollarArray,
        money;

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
    } //if statement


    //////////////////////////////
    //Running total dollar amount.
    //////////////////////////////

    //define variables
    var amount = '<p id="total-dollars">Total: $' + money + '</p>',
        totalDollars = $('p#total-dollars'),
        initialAmount,
        newAmount;

    //if the current checkbox is checked && total dollars paragraph's
    //text length is equal to zero do the following...
    if ($(this).is(':checked') && totalDollars.text().length === 0) {
      //Places amount string after activities fieldset
      $('fieldset.activities').after(amount);

    //else if current checkbox is checked && total dollars paragraph's text
    //is not equal to zero do the following...
    } else if ($(this).is(':checked') && totalDollars.text().length !== 0) {
      //initialAmount variable holds total dollars paragraph's text &
      //splits it at '$'
      initialAmount = totalDollars.text().split('$');
      //newAmount variable holds the parsed initialAmount[1], which is the
      //second part of the array & uses the standard 10 as second parameter
      //parses money variable as well. The parsing makes it so both numbers
      //can be added together
      newAmount = parseInt(initialAmount[1], 10) + parseInt(money, 10);
      //changes total dollars paragraph's text to the new amount
      totalDollars.text('Total: $' + newAmount);

    //else if the current checkbox is not checked do the following...
    } else if (!$(this).is(':checked')) {
      //initialAmount holds total dollars paragraph's text & splits at '$'
      initialAmount = totalDollars.text().split('$');
      //newAmount does the same as above except it subtracts instead of adding
      newAmount = parseInt(initialAmount[1], 10) - parseInt(money, 10);
      //new amount is placed in paragraph text
      totalDollars.text('Total: $' + newAmount);
    }

    //if total dollars paragraph's text is equal to 'Total: $0'
    if (totalDollars.text() === 'Total: $0') {
      //remove it
      totalDollars.remove();
    }

  }); //on change()


  //////////////////////////////
  //Payment Info section of the form.
  //////////////////////////////

  //define variables used in this section
  var creditCardContainer = $('#credit-card');

  //create hideAllDivs function
  function defaultView() {
    //make credit card option default
    $('select option[value="credit card"]').attr('selected', true);
    //make credit card div the default view
    creditCardContainer.show().next('div').hide().next('div').hide();
  }
  //call defaultView()
  defaultView();

  //on page load makes #cvv input field have a maxlength of 3
  $('#cvv').attr('maxlength', '3');

  //when the payment select field changes do the following...
  $('select#payment').on('change', function() {
    //get value of current option selected
    var paymentOption = $(this).val();

    //if current option equals 'credit card' do the following...
    if (paymentOption === 'credit card') {
      //show only the credit card div / input fields
      creditCardContainer.show().next('div').hide().next('div').hide();

    //if current option selected equals paypal
    } else if (paymentOption === 'paypal') {
      //show only the paypal div
      creditCardContainer.hide().next('div').show().next('div').hide();

    //if current option selected equals bitcoin
    } else if (paymentOption === 'bitcoin') {
      //show only the bitcoin div
      creditCardContainer.hide().next('div').hide().next('div').show();

    //if current option selected equals select_method
    } else if (paymentOption === 'select_method') {
      //hide all divs
      defaultView();
    }

  });


  //////////////////////////////
  //Form Validation section of the form.
  //////////////////////////////

  //Form validation. Display error messages and don't let the user submit the form if any of these validation errors exist:
  //function to validate email input...passes in email to test
  function validateEmail(email) {
    //defines regex variable to hold regular expression to test emails
    var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //return true or false depending on whether the email value passes
    //the test based on the regular expression
    return regex.test(email);
  }

  //on sumbit of the form...
  $('form').on('submit', function(e) {
    //define variables
    var nameInput = $('input#name'),
        emailInput = $('input#mail'),
        emailInputValue = $('input#mail').val();

    //name field can't be empty
    if (nameInput.val() === '') {
      //prevents default behavior of submit button...used multiple times below
      e.preventDefault();

      //adds visible error to user
      nameInput.prev().css('color', 'red').find('span').addClass('visible');

    } else {
      //adds visible error to user
      nameInput.prev().css('color', '#000').find('span').removeClass('visible');
    }

    //Email field must be a validly formatted e-mail address (you don't have to check that it's a real e-mail address, just that it's formatted like one: dave@teamtreehouse.com for example. You'll need to use a regular expression to get this requirement. See the list of Resources for links to learn about regular expressions.

    //if email input is empty or validateEmail function returns false
    if (emailInputValue === '' || validateEmail(emailInputValue) === false) {
      e.preventDefault();

      //adds visible error to user
      emailInput.prev().css('color', 'red').find('span').addClass('visible');

    } else {
      //removes visible error to user
      emailInput.prev().css('color', '#000').find('span').removeClass('visible');
    }

    //makes sure a shirt is picked
    if ($('select#design').val() === 'Select Theme') {
      e.preventDefault();

      //adds visible error to user
      $('fieldset.shirt').find('span').addClass('visible-block');

    } else {
      //removes visible error to user
      $('fieldset.shirt').find('span').removeClass('visible-block');
    }

    //validates that at least one activity is checked
    var oneIsChecked = false;
    //iterate through each activity checkbox
    $('fieldset.activities input').each(function() {
      //if one is checked change oneIsChecked to true
      if ($(this).is(':checked')) {
        oneIsChecked = true;
        //return false to break the loop
        return false;
      }
    });

    //if one checkbox is checked
    if (oneIsChecked === true) {
      //remove error message & allow user to submit
      $('fieldset.activities').find('span').removeClass('visible-block');

    } else {
      //prevent user from submitting the form
      e.preventDefault();

      //add error message for user
      $('fieldset.activities').find('span').addClass('visible-block');
    }

    //if no payment method is selected
    if ($('select#payment').val() === 'select_method') {
      e.preventDefault();

      //add error message for user
      $('select#payment').prev().prev().children().addClass('visible-block');

    } else {
      //remove error message for user
      $('select#payment').prev().prev().children().removeClass('visible-block');
    }


    //////////////////////////////
    //Credit Card Form Validation section of the form.
    //////////////////////////////

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

    //validates zip code
    function validateZip(zip) {
      //defines regular expression
      //^ start of string
      //must be a digit & cannot be more than 5
      //(?: starts a grouping
      //[-\s] matches a hyphen or a space
      //must be more digits & cannot be more than 4
      //everything between both '?' is optional
      //$ end of string
      var regex = /^\d{5}(?:[-\s]\d{4})?$/;
      //returns true or false depending on if the string passes
      //the regular expression test
      return regex.test(zip);
    }

    //validates CVV
    function validateCvv(cvv) {
      //defines regular expression
      //^ start of string
      //must be digit & cannot be more than 3 digits
      //$ end of string
      var regex = /^\d{3}$/;
      //returns true or false depending on if the string passes
      //the regular expression test
      return regex.test(cvv);
    }

    //define variables
    var creditCardInput = $('#cc-num'),
        creditCardValue = creditCardInput.val(),
        zipInput = $('#zip'),
        zipValue = zipInput.val(),
        cvvInput = $('#cvv'),
        cvvValue = cvvInput.val();

    //if payment select option equals 'credit card'
    if ($('select#payment').val() === 'credit card') {
      //if creditCardValue is empty or validateCreditCard returns false
      if (creditCardValue === '' || validateCreditCard(creditCardValue) === false) {
        e.preventDefault();

        //add visible error for user
        creditCardInput.prev().css('color', 'red');

      } else {
        //remove visible error for user
        creditCardInput.prev().css('color', '#000');
      }

      //if zipValue is empty or validateZip return false
      if (zipValue === '' || validateZip(zipValue) === false) {
        e.preventDefault();

        //add visible error for user
        zipInput.prev().css('color', 'red');

      } else {
        //remove visible error for user
        zipInput.prev().css('color', '#000');
      }

      //if cvvValue is empty or validateCvv return false
      if (cvvValue === '' || validateCvv(cvvValue) === false) {
        e.preventDefault();

        //add visible error for user
        cvvInput.prev().css('color', 'red');

      } else {
        //remove visible error for user
        cvvInput.prev().css('color', '#000');
      }
    }

  });

});
