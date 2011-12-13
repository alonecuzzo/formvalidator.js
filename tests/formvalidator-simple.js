function validate() {
	var min_len = 3;
	
	var first_name_field = $("#firstname");
	var last_name_field = $("#lastname");
	var email_field = $("#email");
	var key_up_observers = new Array();
	
	//see http://www.javascriptkit.com/javatutors/javascriptkey3.shtml
	//http://api.jquery.com/attr/
	
	
	//alert("lulz: " + email_field.val())
	//array of fields that need
	var min_length_fields = new Array(first_name_field, last_name_field);
	
	for(var i=0; i<=min_length_fields.length-1;i++) {
		validate_min_length(min_length_fields[i], min_len);
	}
	
	if(!validateEmail(email_field.val())){
		alert("please enter valid email");
	}
}

function addit(){
	var first_name_field = $("#firstname");
	first_name_field.attr("onkeyup", "return key_up_listener(this, 4)");
//	just do this using jquery http://api.jquery.com/keypress/
	first_name_field.attr("onkeypress", "return key_down_listener(this, true, false)");
}

function add_validation(field, type, max_len) {
	if(!field) {
		alert("invalid field");
	}
	
	switch(type) {
		case "max_len":
			
			break;
			
	}
}

//
function ValidationRule(field, desc) {
	
}

function key_down_listener(field, isNumericOnly, isAlphaOnly) {
	if(isNumericOnly) {			
		if(!limit_field_to_num(field)){
			return false;
		} else {
			return true;
		}
	} else if(isAlphaOnly) {
		
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

function limit_field_to_alpha(field) {
	
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
	if(field.value.length > mLen) {
		field.value = field.value.substring(0, mLen);
	}
}

function validate_min_length(field, len) {
	if(field.length < len) {
		alert("please enter a name longer than " + field.val());
	}
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