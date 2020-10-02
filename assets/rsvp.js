$(document).ready(function () {
  $("#submit_rsvp").click(function () {

    var proceed = true;
    //simple validation at client's end
    //loop through each field and we simply change border color to red for invalid fields
    $("#rsvp_form .form-group input[required], #rsvp_form .form-group textarea[required]").each(function () {
      $(this).css('background-color', '');
      if (!$.trim($(this).val())) { //if this field is empty
        $(this).css('background-color', '#FFDEDE'); //change border color to #FFDEDE
        proceed = false; //set do not proceed flag
      }
      //check invalid email
      var email_reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      if ($(this).attr("type") == "email" && !email_reg.test($.trim($(this).val()))) {
        $(this).css('background-color', '#FFDEDE'); //change border color to #FFDEDE
        proceed = false; //set do not proceed flag
      }
    });

    if (proceed) //everything looks good! proceed...
    {
      //get input field values data to be sent to server
      post_data = {

        'name': $('input[name=name]').val(),
        'guest': $('input[name=guest]:checked').val(),
        'guests': $('input[name=guests]').val(),
        'attending': $('input[name=attending]:checked').val(),
        'message': $('textarea[name=message]').val()
      };

			var $form = $('#rsvp_form'),
				output = '';
				url = 'https://script.google.com/macros/s/AKfycbwMwuaCFa1AwXkYIAAEUxJKSjddvuR0z2nem7PsIkoVDrdqPzG4/exec';

			var jqxhr = $.ajax({
				url: url,
				method: "GET",
				dataType: "json",
				data: post_data
			}).done(function() {
					output = '<h6 class="text-center">' + 'Thank you!' + '</h6>';
					//reset values in all input fields
					$("#rsvp_form  input[required=true], #rsvp_form textarea[required=true]").val('');
					$("#rsvp_form .form-group").slideUp(); //hide form after success
					$('html, body').animate({scrollTop: $("#rsvp_form .form-group").offset().top - 150}, 2000);
				})
				.fail(function() {
					output = '<div class="alert alert-danger">' + 'Failed to rsvp try again' + '</div><br>';
				})
				.always(function() {
					$("#rsvp_form #contact_results").hide().html(output).slideDown();
				});

    }
  });

  //reset previously set border colors and hide all message on .keyup()
  $("#rsvp_form  input[required=true], #rsvp_form textarea[required=true]").keyup(function () {
    $(this).css('background-color', '');
    $("#result").slideUp();
  });
});



