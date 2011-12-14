function init() {
	add_validation($("#firstname"), "is_num"); 
	add_validation($("#firstname"), "max_len", 3);
	add_validation($("#lastname"), "max_len", 8);
}

