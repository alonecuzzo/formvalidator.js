/*
	===========================================================================
	Simple form Validator for js.
	
	===========================================================================
*/

function FormValidator() {
	
	
}

function sfm_show_error_msg(msg, input_elmt)
{
    document.error_disp_handler.ShowMsg(msg, input_elmt);
}

function testMinLen(objValue, strMinLen, strError)
{
    var ret = true;
    if (eval(objValue.value.length) < eval(strMinLen))
    {
        if (!strError || strError.length == 0)
        {
            strError = objValue.name + " : " + strMinLen + " characters minimum  ";
        } //if               
       // sfm_show_error_msg(strError, objValue);
		alert(strError);
        ret = false;
    } //if 
    return ret;
}

function testMaxLength(objValue, strMaxLen, strError)
{
    var ret = true;
    if (eval(objValue.value.length) > eval(strMaxLen))
    {
        if (!strError || strError.length == 0)
        {
            strError = objValue.name + " : " + strMaxLen + " characters maximum ";
        } //if 
        //sfm_show_error_msg(strError, objValue);
		alert(strError);
        ret = false;
    } //if 
    return ret;
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