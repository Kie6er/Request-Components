import $ from "jquery";
$(document).ready(function () {
	$('.form').on('submit', function (evt) {
		evt.preventDefault();
		if (validationForm($(evt.currentTarget)) === true) {
			$(this).submit();
		};
	});
	function validationForm(form) {
		let result = true;

		form.find('input').each(function (index, element) {
			removeError($(element));
			// Проверка валидации для Чекбокса
			if ($(element).data('required')) {
				if ($(element).attr('type') === 'checkbox' && !$(element).is(':checked')) {
					removeError($(element));
					$(element).parent().addClass('error');
					if ($(element).parent().find('span').length > 0) {
						const errorText = $(`<p class="error-text">Подсказка</p>`);
						$(element).parent().find('span').append(errorText);
					}
					result = false;
				}
			}
		});

		function removeError(input) {
			const parent = input.parent();
			if (parent.hasClass('error')) {
				parent.find('.error-text').remove();
				parent.removeClass('error');
			}
		}
		return result
	}

})