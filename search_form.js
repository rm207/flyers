<script type="text/javascript">
function search_form_style() {
	//modify some of the elements in our top search form to enable responsive function
	if (document.getElementsByName('searchtool')) {	
		//remove the border around the searchtool
		//don't have to do this now
		//document.getElementsByClassName('browseSearchtool')[0].className = '';
		
		//change the form class for responsive function
		var target_form = document.getElementsByName('searchtool')[0];
		target_form.className = 'form-inline';

		//wrap the inner contents of the form in a div with class form-group
		var form_html = target_form.innerHTML;
		target_form.innerHTML = '<div class="form-group">\n' + form_html + '\n</div>';

		//change the input values so that they have the proper class name 
		document.getElementById('searchtype').className = 'form-control';
		document.getElementById('searcharg').className = 'form-control';
		document.getElementById('sortdropdown').className += ' form-control';
		
		//wrap the input element for the checkbox in a div and label
		var checkbox_label = document.getElementsByClassName('availLimMessage')[0];
		var form_html = document.getElementsByName('availlim')[0].outerHTML;
		document.getElementsByName('availlim')[0].outerHTML = '<div class="checkbox"><label>\n' +  form_html  + '\n' + checkbox_label.innerHTML + '</label></div>';	
		//set the original label to not display
		checkbox_label.style='display:none';
		
		//set the submit and sort button to display correctly
		document.getElementsByName('SUBMIT')[0].className = 'btn btn-default';
		if (document.getElementById('sortbutton')) {
			document.getElementById('sortbutton').className = 'btn btn-default';
		}//end if
	}//end if
}
</script>