function init() {
	var validator = new Validator("myform");
	validator.addValidation($("#firstname"), "is_num"); 
	validator.addValidation($("#firstname"), "max_len", 3);
	validator.addValidation($("#lastname"), "max_len", 8);
	validator.addValidation($("#email"), "email");
}

