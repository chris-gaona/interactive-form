$(function() {
  'use strict';

  $('input#name').focus();

  var otherInput = '<input type="text" id="other-title" placeholder="Your Title">';

  $('select#title').on('change', function() {
    var otherOption = $(this).val();

    if (otherOption === 'other') {
      $('fieldset#main').append(otherInput);

    } else {
      $('fieldset#main').find('#other-title').remove();
    }
  });

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

});
