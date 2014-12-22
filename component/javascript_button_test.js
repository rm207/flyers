var button_id_array = [
	['ICON_BUT_REQUEST',], //request
	['ICON_BUT_SHOWSIM',], //more like this
	['ICON_BUT_BIBEXPORT',], //add to saved
	['ICON_BOOKCART_SAVED',], //remove from saved
	['ICON_MYLISTS_SAVE',], //add to my lists
	['ICON_MYLISTS_SAVE_TO_LIST',], //Add Marked to My Lists
	['ICON_MYLISTS_RECORD'], //Add to My Lists
	['ICON_BUT_MARC_DISPLAY',], //marc display
];

//
for (var i=0; i<button_id_array.length; i++) {
	button_id_array[i][1] = document.getElementById(button_id_array[i][0]);
	
	if (button_id_array[i][1]) {
		if (button_id_array[i][1].parentElement.tagName == 'A') {
			//console.log (button_id_array[i][1]);
			temp_element = button_id_array[i][1].parentElement.cloneNode(true);
			document.getElementById('icon_but_output').appendChild(temp_element);
			//document.getElementsByTagName('body')[0].appendChild(temp_element);
			delete temp_element;
		}
	}
}

icon_but_output_elements = document.getElementById('icon_but_output').getElementsByTagName('A');
for (var i=0; i<icon_but_output_elements; i++) {
	//set the button for the div to this style
	//display: inline-block;

	//set the anchor tag for each of the elements in 'icon_but_output'
	//display: block;
	//width: 100%	
}


