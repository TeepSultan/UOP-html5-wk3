var hoverBorderStyle = '2px dashed blue';
var normalBorderStyle = '2px solid purple';
var eventListeners = new Array();
var statusM;

//The detectDragDrop code was copied directly from Lynda files from the RockPaperScissors game created in this week's activity
function detectDragDrop() {
    if (navigator.appName == 'Microsoft Internet Explorer') {
        var ua = navigator.userAgent;
        var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null) {
            var rv = parseFloat( RegExp.$1 );
            if(rv >= 6.0) return true;
        }
        return false;
    }
    if ('draggable' in document.createElement('span')) return true;
    return false;
}

var element = function(id) {
    return document.getElementById(id);
};

function addEventListeners() {
    if((dragSupported = detectDragDrop())) {
        statusMessage('Using HTML5 Drag and Drop');
        eventListeners.push(element('trash1'), element('trash2'), element('trash3'), element('recycle'));
        for(var i = 0; i < eventListeners.length; i++) {
            eventListeners[i].addEventListener('dragstart', dragStart, false);
            eventListeners[i].addEventListener('dragend', dragEnd, false);
            eventListeners[i].addEventListener('dragover', dragOver, false);
            eventListeners[i].addEventListener('dragenter', dragEnter, false);
            eventListeners[i].addEventListener('dragleave', dragLeave, false);
            eventListeners[i].addEventListener('drop', onDrop, false);
        }
        // element('recyclebin').addEventListener('drop', onDrop, false);
    } else {
        statusMessage('This browser does not support Drag and Drop');
    }
}



var draggingItem;
var droppedToItem;

function dragStart(evt) {
    var typeOfTrash = getTrashType(this);
    draggingItem = this;
    droppedToItem = null;
    draggingItem.className = 'box moving';
    statusMessage('Moving ' + typeOfTrash);
    evt.dataTransfer.setDragImage(getImg(this), 100, 100);
}
function dragEnd(evt) {
    var trashed = draggingItem.children[1].innerHTML;
    if (draggingItem.id == 'recycle') {
        statusMessage("Don't pollute the environment!");
        draggingItem.className = 'box still';
        return;
    }
    if (!droppedToItem || droppedToItem.parentNode.id != 'recycle') {
        draggingItem.className.replace(" moving", "");
        draggingItem.className = 'box still';
        statusMessage("That's not the recycle bin!");
    } else {
        if (draggingItem.parentNode.id == 'recyle') {
            statusMessage("Do not throw the recycle bin into the environment!");
        } else {
            statusMessage(getTrashType(draggingItem) + " dropped into the recycling bin.");
            draggingItem.parentNode.removeChild(draggingItem);
        }
    }
}

function dragOver(evt) {
    if(evt.preventDefault) evt.preventDefault();
    this.style.border = hoverBorderStyle;
}
function dragEnter(evt) {
    this.style.border = hoverBorderStyle;
    if(this !== draggingItem) statusMessage(getTrashType(draggingItem) + " going over " + getTrashType(this));
}
function dragLeave(evt) {
    this.style.border = normalBorderStyle;
}
function onDrop(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    droppedToItem = evt.target;
}

function getTrashType(evt) {
    var footer = getFooter(evt);
    if(footer) {
        return footer.innerHTML;
    } else {
        return undefined;
    }
}

function getFooter(evt) {
    var children = evt.childNodes;
    for( var i = 0; i < children.length; i++ ) {
        if( children[i].nodeName.toLowerCase() == 'footer' ) return children[i];
    }
    return undefined;
}

function getImg(evt) {
    var children = evt.childNodes;
    for( var i = 0; i < children.length; i++ ) {
        if( children[i].nodeName.toLowerCase() == 'img' ) return children[i];
    }
    return undefined;
}

//utility functions
function statusMessage(message) {
    if(!statusM) statusM = element('messageDiv');
    if(!statusM) return;
    if(message) {
        statusM.innerHTML = message;
    }else {
        statusM.innerHTML = 'No Status Message';
    }
}

