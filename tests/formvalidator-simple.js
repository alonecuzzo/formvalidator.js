function Validator(form_id) {
	//disable submit
	$('input[type=submit]').attr('disabled', 'disabled');
	//onSubmit="return validate()" 
	this.formToValidate = $("#" + form_id);
	this.radioArray = [];
	this.itemsToValidate = [];
	this.checkBoxArray = [];
	this.addValidation = add_validation;
	this.setAlphaNumeric = set_char_alphanumeric;
	
	this.validateRequiredField = validate_required_field;
	this.validateEmailField = validate_email_field;
	this.findInvalidator = find_invalidator;
	this.validateEntireForm = validate_entire_form;
	this.validateComboBox = validate_combo_box;
	this.validateRadio = validate_radio;
	this.addRadioListeners = add_radio_listeners;
	this.validateCheckBoxes = validate_checkboxes;
	
	this.radioCount = 0;
	this.checkBoxCount = 0;
	
	//there has to be a better way of doing this, just leaving it there for now as a reference to the validator object 
	//for the return function
	var validator_instance = this;
	this.formToValidate.submit(function() {
		//now search through email array to see if any don't match
		var fn;
		var fv;
		for(var i=0; i <= validator_instance.emailArray.length-1; i++) {
			fn = "#" + validator_instance.emailArray[i];
			fv = $(fn).val();
			 if(!validateEmail(fv)){
			 	alert("please enter valid email");
	 		 }
		}
		
		for(var i=0; i <= validator_instance.comboboxArray.length-1; i++) {
			fn = "#" + validator_instance.comboboxArray[i];
			fv = $(fn).val();
			 if(fv == ""){
			 	alert("please enter valid combobox value");
	 		 }
		}
	});
}

// sets alpha/alpha character limits
function set_char_limit(field, is_alpha, is_num) {
	if(is_num) {
		field.keypress(function(e){			
			var unicode = e.charCode ? e.charCode : e.keyCode;
			if (unicode!=8){ //if the key isn't the backspace key (which we should allow)
				if (unicode<48||unicode>57) //if not a number
					return false;
			} //disable key press
		});
	} else if(is_alpha) {
		field.keypress(function(evt) {
			 evt = evt || window.event;
			 var charCode = evt.keyCode || evt.which;
			 var charStr = String.fromCharCode(charCode);
			 return /[a-z]/i.test(charStr);
		});
	}
}

function set_char_alphanumeric(field, additional_char) {
	//allow alpha numeric and then additional chars
	field.keypress(function(evt){
		evt = evt || window.event;
		var charCode = evt.keyCode || evt.which;
		var charStr = String.fromCharCode(charCode);
		return /^([\.a-zA-Z0-9-]+)$/.test(charStr);
	});
}

Object.prototype.getName = function() { 
   var funcNameRegex = /function (.{1,})\(/;
   var results = (funcNameRegex).exec((this).constructor.toString());
   return (results && results.length > 1) ? results[1] : "";
};

function add_validation(field, type, max_len, error_msg) {
	if(!field) {
		alert("invalid field");
	}
	if(max_len) {
		var mLen = max_len;
	}
	var validator_instance = this;
	var inv;
	switch(type) {
		case "max_len":
	          field.attr("onkeyup", "return key_up_listener(this, " + max_len + ")");
			break;

		case "is_alpha":
			set_char_limit(field, true, false);
			break;

		case "is_num":
			set_char_limit(field, false, true);
			break;
			
		case "email":
			field.blur(function() {
				validator_instance.validateEmailField($(this), false, error_msg);
			});
			break;
			
		case "combobox":
			this.comboboxArray.push(field.attr("id"));
			break;
		
		case "required":
			inv = new Invalidator(field);
			this.itemsToValidate.push(inv);
			field.blur(function() {
				validator_instance.validateRequiredField($(this), error_msg);
			});
			break;
		
		case "requiredEmail":
			inv = new Invalidator(field);
			this.itemsToValidate.push(inv);
			field.blur(function() {
				validator_instance.validateEmailField($(this), true, error_msg);
			});
			break;
			
		case "requiredComboBox":
			inv = new Invalidator(field);
			this.itemsToValidate.push(inv);
			field.change(function(){
				validator_instance.validateComboBox($(this), error_msg);
			});
			break;
			
		case "requiredRadio":
			//if it's radio we're looking for the radio names
			this.radioArray.push(field);
			validator_instance.addRadioListeners(field);
			break;
			
		case "requiredCheckBox":
			this.checkBoxArray.push(field);
			break;
	}
}

//just keeps track of what's valid
function Invalidator(f) {
	this.field = f;
	this.isValid = false;
}

function add_radio_listeners(f) {
	var instance_var = this;
	$("input[name='" + f + "']").bind("click", function() {
		instance_var.validateEntireForm();
	});
}

function validate_checkboxes() {
	var i, validator_instance=this;
	for(i=0; i<=this.checkBoxArray.length-1;i++) {
		$("input[name='" + this.checkBoxArray[i] + "']").each(function(){
			if($(this).attr("checked") == "checked")
			{
				validator_instance.checkBoxCount += 1;
			}
		});
	}
	if(this.checkBoxCount >= this.checkBoxArray.length) {
		return true;
	} else {
		return false;
	}
}

function validate_radio() {
	//scroll through all required radio names and then return true if they're all valid, false if not
	var i, ret=false, validator_instance=this;
	for(i=0; i<=this.radioArray.length-1; i++) {
		//for each name, check to see that at least one radio item is pressed
		$("input[name='" + this.radioArray[i] + "']").each(function(){
			if($(this).attr("checked") == "checked")
			{
				validator_instance.radioCount += 1;
			}
		});
	}
	if(this.radioCount >= this.radioArray.length) {
		return true;
	} else {
		return false;
	}
}

//should run after every focus change to see if the button should be enabled
function validate_entire_form() {
	var needed_num_valid = this.itemsToValidate.length;
	var actual_valid_items = 0;
	
	for(var i = 0; i <= this.itemsToValidate.length-1; i++) {
		if(this.itemsToValidate[i].isValid == true) {
			actual_valid_items += 1;
		}
	}
	if((actual_valid_items>=needed_num_valid) && this.validateRadio() && this.validateCheckBoxes() ) {
		$('input[type="submit"]').removeAttr('disabled');
	} else {
		$('input[type=submit]').attr('disabled', 'disabled');
	}
	
	this.radioCount = 0;
	this.checkBoxCount = 0;
}

function find_invalidator(field) {
	for(var i = 0; i <= this.itemsToValidate.length-1; i++) {
		if(this.itemsToValidate[i].field.attr("id") == field.attr("id")){
			return this.itemsToValidate[i];
		}
	}
}

function validate_required_field(field, error_msg) {
	//check required stuff
	if(!validate_min_length(field, 1))
	{
		field.add().css("border", "1px solid #f00");
		if(field.parent().parent().find(".error").val()==undefined){
			$("<div class='error'>" + error_msg + "</div>").appendTo(field.parent().parent());
		} else {
			field.parent().parent().find(".error").show();
		}
		
		if(this.findInvalidator(field)) {
			this.findInvalidator(field).isValid = false;
		} else {
			alert("error: trying to valid field that doesn't exist");
		}	
		//is invalid
	} else {
		field.add().css("border", "");
		field.parent().parent().find(".error").hide();
		//is valid
		if(this.findInvalidator(field)) {
			this.findInvalidator(field).isValid = true;
			//alert("checking set value: " + this.findInvalidator(field) )
		} else {
			alert("error: trying to valid field that doesn't exist");
		}
	}
	this.validateEntireForm();
}


function validate_combo_box(field, error_msg) {
	if(field.val() != "") {
		//field is valid
		this.findInvalidator(field).isValid = true;
		
	} else {
		//field is invalid
		//i don't think we need a message here since the submit button doesn't become active unless all required fields are selected
		this.findInvalidator(field).isValid = false;
	}
	this.validateEntireForm();
}


function validate_email_field(field, isReq, error_msg) {
	var is_req = isReq;
	if(is_req == true) {
		if(!validateEmail(field.val()))
		{ 
			//alert("field is not valid email: " +field.attr('id'));
			field.add().css("border", "1px solid #f00");
			if(field.parent().parent().find(".error").val()==undefined){
				$("<div class='error'>"+error_msg+"</div>").appendTo(field.parent().parent());
			} else {
				field.parent().parent().find(".error").show();
			}
			
			if(this.findInvalidator(field)) {
				this.findInvalidator(field).isValid = false;
			} else {
				alert("error: trying to valid field that doesn't exist");
			}
			
		} else {
			field.add().css("border", "");
			field.parent().parent().find(".error").hide();
			
			if(this.findInvalidator(field)) {
				this.findInvalidator(field).isValid = true;
			} else {
				alert("error: trying to valid field that doesn't exist");
			}
		}
		
	} else {
		if(field.val().length>=1){
			if(!validateEmail(field.val()))
			{
				field.add().css("border", "1px solid #f00");
				
				if(field.parent().parent().find(".error").val()==undefined){
					$("<div class='error'>"+error_msg+"</div>").appendTo(field.parent().parent());
				} else {
					field.parent().parent().find(".error").show();
				}
			} else {
				field.add().css("border", "");
				field.parent().parent().find(".error").hide();
			}
		}
	}
	this.validateEntireForm();
}

function key_up_listener(field, max_len) {
	var mLen = max_len;
	if(!field) {
		alert("field is invalid");
	}
	
	if(mLen>0) {
		limit_field_length(field, mLen);
	}
}

function limit_field_to_num(e) {
	var unicode = e.charCode ? e.charCode : e.keyCode;
	alert("unicode: " + unicode)
	if (unicode!=8){ //if the key isn't the backspace key (which we should allow)
		if (unicode<48||unicode>57) //if not a number
			return false;
	} //disable key press
}

function limit_field_length(field, max_len) {
	var mLen = max_len;
			//alert("shortening: " + mLen + " " + field.value.length)
	if(field.value.length > mLen) {
		field.value = field.value.substring(0, mLen);
	}
}

function validate_min_length(field, len) {
	var myLen = len;
	if(field.val().length < myLen) {
		return false;
	//	alert("please enter a name longer than " + field.val());
	}
	return true;
}

function validateEmail(email)
{
    var splitted = email.match("^(.+)@(.+)$");
    if (splitted == null) return false;
    if (splitted[1] != null)
    {
        var regexp_user = /^\"?[\w-_\.]*\"?$/;
        if (splitted[1].match(regexp_user) == null) return false;
    }
    if (splitted[2] != null)
    {
        var regexp_domain = /^[\w-\.]*\.[A-Za-z]{2,4}$/;
        if (splitted[2].match(regexp_domain) == null)
        {
            var regexp_ip = /^\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\]$/;
            if (splitted[2].match(regexp_ip) == null) return false;
        } // if
        return true;
    }
    return false;
}
