import $ from 'cash-dom';

const fieldRules = /^[a-z0-9\-\_]+$/;

const validator = (userName) => {
	if (!fieldRules.test(userName)) {
		$('.username.input').addClass('field-invalid');
		return 'Not valid';
	}
	$('.username.input').removeClass('field-invalid');
	return 'Valid';
}

export { validator };