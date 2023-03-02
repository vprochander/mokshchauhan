(function($) {
    "use strict";


    $("form.mf_form_validate").each(function() {
        $(this).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                email: {
                    required: true,
                    email: true
                },
                phone: {
                    required: true,
                    number: true
                },
                password: "required",
                repeat_password: {
                    equalTo: "#password_field"
                }
            }
        });
    });

    $("form.ajax_submit").on('submit', function(e) {
        e.preventDefault();
        var has_errors = false,
            form = $(this),
            form_fields = form.find('input'),
            form_message = form.find('textarea'),
            server_result_display = form.find('.server_response');

        var name = form.find('[name=name]').val(),
            email = form.find('[name=email]').val(),
            phone = form.find('[name=phone]').val(),
            subject = form.find('[name=subject]').val(),
            message = form.find('[name=message]').val();


        form_fields.each(function() {
            if ($(this).hasClass('error')) {
                has_errors = true;
            }
        });

        if (form_message.length > 0) {
            if (form_message.hasClass('error')) {
                has_errors = true;
            }
        }
        var datastring = form.serialize();
        if (!has_errors) {
            $.ajax({
                type: "POST",
                url: form.attr('action'),
                headers: {
                    "Accept": "application/json"
                },
                data: datastring,
                success: function(data) {
                    console.log('data', data);
                    // var response = jQuery.parseJSON(data);
                    var response = {
                        status : "success",
                        message: 'Message send success',
                        ok: data.ok,
                    };
                    if (response.status == 'error') {
                        server_result_display.empty().html('<div class="mb-0 mt-3 alert alert-danger  alert-dismissible">' + response.errors + ' <button type="button" class="close" data-dismiss="alert">&times;</button></div>');
                    } else if (response.status == 'success') {
                        server_result_display.empty().html('<div class="mb-0 mt-3 alert alert-success  alert-dismissible">' + response.message + '<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
                        setTimeout(function() {
                            $('form.ajax_submit .mf_alert').fadeOut(500);
                        }, 1500);
                        form.trigger("reset");
                    }
                },
                error: function() {
                    server_result_display.empty().html('<div class="mb-0 mt-3 alert alert-danger  alert-dismissible">Server error! Please try again...<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
                }
            });
        }

        return false;
    });
})(jQuery);