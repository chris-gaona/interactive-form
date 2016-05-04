$(function() {
  'use strict';

  //Set focus on the first text field
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
  var optionsArray = $('#color option').toArray();

  var intialOption = '<option><-- Please select a T-shirt theme</option>';
  $('select#color').empty().append(intialOption);

  $('select#design').on('change', function() {
    var designOption = $(this).val();

    if (designOption === 'js puns') {
      $('select#color').empty().append(optionsArray[0]).append(optionsArray[1]).append(optionsArray[2]);

    } else if (designOption === 'heart js') {
      $('select#color').empty().append(optionsArray[3]).append(optionsArray[4]).append(optionsArray[5]);

    } else {
      $('select#color').empty().append(intialOption);
    }
  });

  //Register for Activities section of the form.

  //Some events are at the same time as others. If the user selects a workshop, don't allow selection of a workshop at the same date and time -- you should disable the checkbox and visually indicate that the workshop in the competing time slot isn't available.
  var labelsArray = $('fieldset.activities label').toArray();

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

    } else if ($(this).is(':checked') && $('p#total-dollars').text().length != 0){
      initialAmount = $('p#total-dollars').text().split('$');
      newAmount = parseInt(initialAmount[1]) + parseInt(money[1]);
      $('p#total-dollars').text('Total: $' + newAmount);

    } else if (!$(this).is(':checked')) {
      initialAmount = $('p#total-dollars').text().split('$');
      newAmount = parseInt(initialAmount[1]) - parseInt(money[1]);
      $('p#total-dollars').text('Total: $' + newAmount);
    }

  }); //on change()

});
