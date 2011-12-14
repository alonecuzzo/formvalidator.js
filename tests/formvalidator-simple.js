function Validator(form_id) {
	//onSubmit="return validate()" 
	this.formToValidate = $("#"+form_id);
	this.emailArray = [];
	this.comboboxArray = [];
	this.requiredArray = [];
	this.addValidation = add_validation;
	this.setAlphaNumeric = set_char_alphanumeric;
	
	this.validateRequiredField = validate_required_field;
	this.validateEmailField = validate_email_field;
	
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

function add_validation(field, type, max_len) {
	if(!field) {
		alert("invalid field");
	}
	if(max_len) {
		var mLen = max_len;
	}
	var validator_instance = this;
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
				validator_instance.validateEmailField($(this), false);
			});
			break;
			
		case "combobox":
			this.comboboxArray.push(field.attr("id"));
			break;
		
		case "required":
		//	var validator_instance = this;
			field.blur(function() {
				validator_instance.validateRequiredField($(this));
			});
			break;
		
		case "requiredEmail":
			field.blur(function() {
				validator_instance.validateEmailField($(this), true);
			});
			break;
	}
}

function validate_required_field(field) {
	//check required stuff
	if(!validate_min_length(field, 1))
	{
		field.add().css("border", "1px solid #f00");
		if(field.parent().parent().find(".error").val()==undefined){
			$("<div class='error'>this is a required field</div>").appendTo(field.parent().parent());
		} else {
			field.parent().parent().find(".error").show();
		}
	} else {
		field.add().css("border", "");
		field.parent().parent().find(".error").hide();
	}
}

function validate_email_field(field, isReq) {
	var is_req = isReq;
	if(is_req == "true") {
		if(!validateEmail(field.val()))
		{
			//alert("field is not valid email: " +field.attr('id'));
			field.add().css("border", "1px solid #f00");
			if(field.parent().parent().find(".error").val()==undefined){
				$("<div class='error'>not a valid email</div>").appendTo(field.parent().parent());
			} else {
				field.parent().parent().find(".error").show();
			}
		} else {
			field.add().css("border", "");
			field.parent().parent().find(".error").hide();
		}
	} else {
		if(field.val().length>=1){
			if(!validateEmail(field.val()))
			{
				field.add().css("border", "1px solid #f00");
				
				if(field.parent().parent().find(".error").val()==undefined){
					$("<div class='error'>not a valid email</div>").appendTo(field.parent().parent());
				} else {
					field.parent().parent().find(".error").show();
				}
			} else {
				field.add().css("border", "");
				field.parent().parent().find(".error").hide();
			}
		}
	}
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
	if(field.val().length > mLen) {
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
