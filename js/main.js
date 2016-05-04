$(function() {
  'use strict';

  $('input#name').focus();

  var otherInput = '<input type="text" id="other-title" placeholder="Your Title">';

  $('select#title').on('change', function() {
    var otherOption = $(this).val();

    if (otherOption == 'other') {
      console.log('Yes!');
      $('fieldset#main').append(otherInput);

    } else {
      console.log('No!');
      $('fieldset#main').find('#other-title').remove();
    }
  });

});
