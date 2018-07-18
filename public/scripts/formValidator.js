$(document).ready(function(){

  //event listener for input click
  $("input").click(function(event){

    const characterCount = $('textBox').val().length;
    const maxCharaterCount = 140;

    event.preventDefault();

    if (characterCount === null || characterCount > maxCharaterCount){
      return;

    } else {
      const tempStr = $("form").serialize();
    }
  });
});