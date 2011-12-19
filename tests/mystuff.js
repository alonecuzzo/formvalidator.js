function init() {
	var validator = new Validator("myform");
	validator.addValidation($("#firstname"), "is_num"); 
	validator.addValidation($("#firstname"), "required", "", "fuck yo field"); 
	validator.addValidation($("#firstname"), "max_len", 3);
	validator.addValidation($("#lastname"), "max_len", 8);
	validator.addValidation($("#email"), "requiredEmail", "", "insert a valid email doh");
	validator.setAlphaNumeric($("#address"), "");
	validator.addValidation($("#Country"), "requiredComboBox", "fill in this combobox");
	
	//for radio buttons just add the validation to the radio name
	validator.addValidation("sex", "requiredRadio");
}

