function validate() {
	var min_len = 3;
	
	var first_name_field = $("#firstname");
	var last_name_field = $("#lastname");
	var email_field = $("#email");
	
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

function validate_min_length(field, len) {
	if(field.length < len) {
		alert("please enter a name longer than safkds " + field.val(name));
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