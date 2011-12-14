function init() {
	var validator = new Validator("myform");
	validator.addValidation($("#firstname"), "is_num"); 
	validator.addValidation($("#firstname"), "required", "", "fuck yo field"); 
	validator.addValidation($("#firstname"), "max_len", 3);
	validator.addValidation($("#lastname"), "max_len", 8);
	validator.addValidation($("#email"), "email", "", "insert a valid email doh");
	validator.addValidation($("#Country"), "combobox");
	validator.setAlphaNumeric($("#address"), "");
}

