$(document).ready(function(){

  $('#textBox').on('input', function(){
    var textAreaLength = $('#textBox').val().length;
    var maxCharacters = 140;
    var currentCharacterCount = maxCharacters - textAreaLength;
    var counter = $("#textBox").siblings('.counter');

      if (currentCharacterCount < 0){
        counter.text(currentCharacterCount);
        counter.css("color", "red");
      } else {
        counter.text(currentCharacterCount);
      }
  });
});