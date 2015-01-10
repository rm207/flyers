<!-- Begin
var isDOM = (document.getElementById ? true : false);
var isIE4 = ((document.all && !isDOM) ? true : false);
var isNS4 = (document.layers ? true : false);
function getRef(id) {
if (isDOM) return document.getElementById(id);
if (isIE4) return document.all[id];
if (isNS4) return document.layers[id];
}
function getSty(id) {
return (isNS4 ? getRef(id) : getRef(id).style);
}
// Hide timeout.
var popTimer = 0;
// Array showing highlighted menu items.
var litNow = new Array();
function popOver(menuNum, itemNum) {
clearTimeout(popTimer);
hideAllBut(menuNum);
litNow = getTree(menuNum, itemNum);
changeCol(litNow, true);
targetNum = menu[menuNum][itemNum].target;
if (targetNum > 0) {
thisX = parseInt(menu[menuNum][0].ref.left) + parseInt(menu[menuNum][itemNum].ref.left);
thisY = parseInt(menu[menuNum][0].ref.top) + parseInt(menu[menuNum][itemNum].ref.top);
with (menu[targetNum][0].ref) {
left = parseInt(thisX + menu[targetNum][0].x);
top = parseInt(thisY + menu[targetNum][0].y);
visibility = 'visible';
      }
   }
}
function popOut(menuNum, itemNum) {
if ((menuNum == 0) && !menu[menuNum][itemNum].target)
hideAllBut(0)
else
popTimer = setTimeout('hideAllBut(0)', 500);
}
function getTree(menuNum, itemNum) {

// Array index is the menu number. The contents are null (if that menu is not a parent)
// or the item number in that menu that is an ancestor (to light it up).
itemArray = new Array(menu.length);

while(1) {
itemArray[menuNum] = itemNum;
// If we've reached the top of the hierarchy, return.
if (menuNum == 0) return itemArray;
itemNum = menu[menuNum][0].parentItem;
menuNum = menu[menuNum][0].parentMenu;
   }
}

// Pass an array and a boolean to specify colour change, true = over colour.
function changeCol(changeArray, isOver) {
for (menuCount = 0; menuCount < changeArray.length; menuCount++) {
if (changeArray[menuCount]) {
newCol = isOver ? menu[menuCount][0].overCol : menu[menuCount][0].backCol;
// Change the colours of the div/layer background.
with (menu[menuCount][changeArray[menuCount]].ref) {
if (isNS4) bgColor = newCol;
else backgroundColor = newCol;
         }
      }
   }
}
function hideAllBut(menuNum) {
var keepMenus = getTree(menuNum, 1);
for (count = 0; count < menu.length; count++)
if (!keepMenus[count])
menu[count][0].ref.visibility = 'hidden';
changeCol(litNow, false);
}

// *** MENU CONSTRUCTION FUNCTIONS ***

function Menu(isVert, popInd, x, y, width, overCol, backCol, borderClass, textClass) {
// True or false - a vertical menu?
this.isVert = isVert;
// The popout indicator used (if any) for this menu.
this.popInd = popInd
// Position and size settings.
this.x = x;
this.y = y;
this.width = width;
// Colours of menu and items.
this.overCol = overCol;
this.backCol = backCol;
// The stylesheet class used for item borders and the text within items.
this.borderClass = borderClass;
this.textClass = textClass;
// Parent menu and item numbers, indexed later.
this.parentMenu = null;
this.parentItem = null;
// Reference to the object's style properties (set later).
this.ref = null;
}

function Item(text, href, frame, length, spacing, target) {
this.text = text;
this.href = href;
this.frame = frame;
this.length = length;
this.spacing = spacing;
this.target = target;
// Reference to the object's style properties (set later).
this.ref = null;
}

function writeMenus() {
if (!isDOM && !isIE4 && !isNS4) return;

for (currMenu = 0; currMenu < menu.length; currMenu++) with (menu[currMenu][0]) {
// Variable for holding HTML for items and positions of next item.
var str = '', itemX = 0, itemY = 0;

// Remember, items start from 1 in the array (0 is menu object itself, above).
// Also use properties of each item nested in the other with() for construction.
for (currItem = 1; currItem < menu[currMenu].length; currItem++) with (menu[currMenu][currItem]) {
var itemID = 'menu' + currMenu + 'item' + currItem;

// The width and height of the menu item - dependent on orientation!
var w = (isVert ? width : length);



///I CHANGED THIS RIGHT HERE ... ADDED THE -1
var h = (isVert ? length : width) - 1 ;

// Create a div or layer text string with appropriate styles/properties.
// Thanks to Paul Maden (www.paulmaden.com) for helping debug this in IE4, apparently
// the width must be a miniumum of 3 for it to work in that browser.
if (isDOM || isIE4) {
str += '<div id="' + itemID + '" style="position: absolute; left: ' + itemX + '; top: ' + itemY + '; width: ' + w + '; height: ' + h + '; visibility: inherit; ';
if (backCol) str += 'background: ' + backCol + '; ';
str += '" ';
}
if (isNS4) {
str += '<layer id="' + itemID + '" left="' + itemX + '" top="' + itemY + '" width="' +  w + '" height="' + h + '" visibility="inherit" ';
if (backCol) str += 'bgcolor="' + backCol + '" ';
}
if (borderClass) str += 'class="' + borderClass + '" ';

// Add mouseover handlers and finish div/layer.
str += 'onMouseOver="popOver(' + currMenu + ',' + currItem + ')" onMouseOut="popOut(' + currMenu + ',' + currItem + ')">';

// Add contents of item (default: table with link inside).
// In IE/NS6+, add padding if there's a border to emulate NS4's layer padding.
// If a target frame is specified, also add that to the <a> tag.

str += '<table width="' + (w - 8) + '" border="0" cellspacing="0" cellpadding="' + (!isNS4 && borderClass ? 3 : 0) + '"><tr><td align="left" height="' + (h - 7) + '">' + '<a class="' + textClass + '" href="' + href + '"' + (frame ? ' target="' + frame + '">' : '>') + text + '</a></td>';
if (target > 0) {

// Set target's parents to this menu item.
menu[target][0].parentMenu = currMenu;
menu[target][0].parentItem = currItem;

// Add a popout indicator.
if (popInd) str += '<td class="' + textClass + '" align="right">' + popInd + '</td>';
}
str += '</tr></table>' + (isNS4 ? '</layer>' : '</div>');
if (isVert) itemY += length + spacing;
else itemX += length + spacing;
}
if (isDOM) {
var newDiv = document.createElement('div');
document.getElementsByTagName('body').item(0).appendChild(newDiv);
newDiv.innerHTML = str;
ref = newDiv.style;
ref.position = 'absolute';
ref.visibility = 'hidden';
}

// Insert a div tag to the end of the BODY with menu HTML in place for IE4.
if (isIE4) {
document.body.insertAdjacentHTML('beforeEnd', '<div id="menu' + currMenu + 'div" ' + 'style="position: absolute; visibility: hidden">' + str + '</div>');
ref = getSty('menu' + currMenu + 'div');
}

// In NS4, create a reference to a new layer and write the items to it.
if (isNS4) {
ref = new Layer(0);
ref.document.write(str);
ref.document.close();
}

for (currItem = 1; currItem < menu[currMenu].length; currItem++) {
itemName = 'menu' + currMenu + 'item' + currItem;
if (isDOM || isIE4) menu[currMenu][currItem].ref = getSty(itemName);
if (isNS4) menu[currMenu][currItem].ref = ref.document[itemName];
   }
}
with(menu[0][0]) {
ref.left = x;
ref.top = y;
ref.visibility = 'visible';
   }
}

// Syntaxes: *** START EDITING HERE, READ THIS SECTION CAREFULLY! ***
//
// menu[menuNumber][0] = new Menu(Vertical menu? (true/false), 'popout indicator', left, top,
// width, 'mouseover colour', 'background colour', 'border stylesheet', 'text stylesheet');
//
// Left and Top are measured on-the-fly relative to the top-left corner of its trigger, or
// for the root menu, the top-left corner of the page.
//
// menu[menuNumber][itemNumber] = new Item('Text', 'URL', 'target frame', length of menu item,
//  additional spacing to next menu item, number of target menu to popout);
//
// If no target menu (popout) is desired, set it to 0. Likewise, if your site does not use
// frames, pass an empty string as a frame target.
//
// Something that needs explaining - the Vertical Menu setup. You can see most menus below
// are 'true', that is they are vertical, except for the first root menu. The 'length' and
// 'width' of an item depends on its orientation -- length is how long the item runs for in
// the direction of the menu, and width is the lateral dimension of the menu. Just look at
// the examples and tweak the numbers, they'll make sense eventually :).

var menu = new Array();

// Default colours passed to most menu constructors (just passed to functions, not
// a global variable - makes things easier to change later in bulk).
var defOver = '#9999CC', defBack = '#9999CC';

// Default 'length' of menu items - item height if menu is vertical, width if horizontal.
var defLength = 20;

// Menu 0 is the special, 'root' menu from which everything else arises.
menu[0] = new Array();
// A non-vertical menu with a few different colours and no popout indicator, as an example.
menu[0][0] = new Menu(false, '', 0, 48, 18, '#9999CC', '#9999CC', '', 'itemText');
menu[0][1] = new Item('&nbsp;&nbsp;&nbsp;&nbsp;Libraries', 'http://flyers.udayton.edu/screens/libraries.html', '', 105, 1, 1);
//menu[0][2] = new Item('nothing!;', '#', '', 5, 0, 0);
//menu[0][2] = new Item('&nbsp;&nbsp;&nbsp;&nbsp;Search Tips', '#', '', 191, 2, 2);
//menu[0][3] = new Item('View Your Record', '#', '', 115, 0, 0);
//menu[0][4] = new Item('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;OhioLINK', '#', '#', 115, 0, 0);



// Libraries menu.
menu[1] = new Array();
// The File menu is positioned 0px across and 22 down from its trigger, and is 80 wide.
// All text in this menu has the stylesheet class 'item' -- see the <style> section above.
// We've passed a 'greater-than' sign '>' as a popout indicator. Try an image...?
menu[1][0] = new Menu(true, '>', 0, 18, 192, defOver, defBack, 'itemBorder', 'itemText');
menu[1][1] = new Item('Roesch Library', 'http://www.udayton.edu/libraries', '', defLength, 0, 0);
menu[1][2] = new Item('Zimmerman Law Library', 'http://www.law.udayton.edu/library/', '', defLength, 0, 0);
menu[1][3] = new Item('Marian Library', 'http://www.udayton.edu/mary/', '', defLength, 0, 0);
menu[1][4] = new Item('Curriculum Materials Center', 'http://soeap.udayton.edu/support/cmc', '', defLength, 0, 0);



// Search Tips Menu.
//menu[2] = new Array();
// The File menu is positioned 0px across and 22 down from its trigger, and is 80 wide.
// All text in this menu has the stylesheet class 'item' -- see the <style> section above.
// We've passed a 'greater-than' sign '>' as a popout indicator. Try an image...?
//menu[2][0] = new Menu(true, '>', 0, 18, 192, defOver, defBack, 'itemBorder', 'itemText');
//menu[2][1] = new Item('Search Tip 1', '#', '', defLength, 0, 0);
//menu[2][2] = new Item('Search Tip 2', '#', '', defLength, 0, 0);
//menu[2][3] = new Item('Search Tip 3', '#', '', defLength, 0, 0);


//  End


//////////////////////////////////
//END PASTE


function sf(){document.f.searcharg.focus();}
function getObj(name)
{
  if (document.getElementById)
	{this.obj = document.getElementById(name);this.style = document.getElementById(name).style;}
  else if (document.all)
  	{this.obj = document.all[name];this.style = document.all[name].style;}
  else if (document.layers)
  	{this.obj = document.layers[name];this.style = document.layers[name];}
}
//usage : <BODY onLoad="preload('first.gif', 'second.gif', 'third.gif')">
function preload() {
  if (!document.images) return;var ar = new Array();var arguments = preload.arguments;
  for (var i = 0; i < arguments.length; i++)
  	{ar[i] = new Image();ar[i].src = arguments[i];}
}
function imageSwap(){
	if (!DHTML) return;var inc, endInc=arguments.length;
	for (inc=0; inc<endInc; inc+=2)
	{
		var objStr,obj;
		if(document.images)
		{if (typeof(arguments[inc]) == 'string') {objStr = 'document.' + arguments[inc];obj = eval(objStr);obj.src = arguments[inc+1];}

		else if ((typeof(arguments[inc]) == 'object') && arguments[inc]&& arguments[inc].src) {arguments[inc].src = arguments[inc+1];}}
	}
}
  if (document.layers)
  	{var h = "hide";var v = "show";}
  else
  	{var h = "hidden";var v = "visible";}
  var toggle = "toggle";

function invi()
{
	if (!DHTML) return;var inc, endInc=arguments.length;
	for (inc=0; inc<endInc; inc+=2)
		{var x = new getObj(arguments[inc]);
		if (arguments[inc+1] == h)
			{x.style.visibility = h;}
		else if (arguments[inc+1] == v)
			{x.style.visibility = v;}
		else if (arguments[inc+1] == toggle)
			{if (x.style.visibility == v)
        			{x.style.visibility = h;}
			else
				{x.style.visibility = v;}
		}
        }
}


var DHTML = (document.getElementById || document.all || document.layers);
