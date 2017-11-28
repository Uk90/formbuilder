function editFormAttr() {
    var activeEvent = document.activeElement;
    var field = activeEvent.previousSibling;
    if (field.localName === 'label') {
        field = field.firstChild;
    }
    var divModal = getElemId('myModal');
    divModal.style.display = 'block';
    constructTextForm(field.dataset.type, activeEvent);
}
function deleteFields() {
    var activeEvent = document.activeElement;
    activeEvent.parentNode.remove();
    var form  = getElemId('dynamicform');
    if(form.length <= 2){
        getElemId('submitFormButton').style.display = 'none';
        getElemId('formDesc').style.display = 'none';
    }
}
function formOverRide(radNo) {
    var buttonAct = getElemId(radNo);
    var field = buttonAct.previousSibling;
    var radLabel1, placeholderValue,
        idValue, radLableName2, radLableName1,
        label,radLabel2, field2, btntext;
    if (field.localName === 'label') {
        radLabel1 = field;
        field = radLabel1.firstChild;
    }
    var fieldType = field.dataset.type;
    if (fieldType === 'text' || fieldType === 'textarea')
        placeholderValue = getElemId('placeholderValue').value;
    var labelValue = getElemId('labelValue').value;
    var classValue = getElemId('classValue').value;
    if (fieldType !== 'radio'){
      idValue = getElemId('idValue').value;
      label = field.previousSibling;
    }else {
        radLableName2 = getElemId('radLable1').value;
        radLableName1 = getElemId('radLable2').value;

        radLabel2 = radLabel1.previousSibling;
        field2 = radLabel2.firstChild;
        label = radLabel2.previousSibling;
    }
    if(fieldType === 'button'){
        btntext = getElemId('btnName').value;
    }
    var nameValue = getElemId('nameValue').value;
    // var button = buttonAct;
    if (classValue)
        field.setAttribute('class', classValue);
    if (btntext)
        field.firstChild.nodeValue = btntext;
    if (placeholderValue)
        field.setAttribute('placeholder', placeholderValue);
    if (idValue)
        field.setAttribute('id', idValue);
    if (nameValue)
        field.setAttribute('name', nameValue);
    if (fieldType === 'radio') {
        field2.setAttribute('name', nameValue);
        field2.setAttribute('class', classValue);
        field.setAttribute('id', '');
        field2.setAttribute('id', '');
    }
    if (fieldType === 'textarea') {
        var colNo = getElemId('colNo').value;
        var rowNo = getElemId('rowNo').value;
        if (colNo)
            field.setAttribute('cols', colNo);
        if (rowNo)
            field.setAttribute('rows', rowNo);
    }
    if (fieldType === 'radio') {
        if (radLableName1) {
            field.setAttribute('data-label-name', radLableName1);
            if (labelValue)
                field.setAttribute('data-radio-label-name', labelValue);
            radLabel1.innerHTML = '';
            radLabel1.appendChild(field);
            radLabel1.appendChild(setTextNode(radLableName1));
        }
        if (radLableName2) {
            field2.setAttribute('data-label-name', radLableName2);
            if (labelValue)
                field2.setAttribute('data-radio-label-name', labelValue);
            radLabel2.innerHTML = '';
            radLabel2.appendChild(field2);
            radLabel2.appendChild(setTextNode(radLableName2));
        }
    }
    if (fieldType === 'select') {
        var option = getElemId('option').value;
        var aOption = option.split(',');
        field.innerHTML = '';
        for (var i = 0; i < aOption.length; i++) {
            var sltOption = document.createElement('option');
            field.setAttribute('class', 'select-options');
            sltOption.value = aOption[i];
            sltOption.text = aOption[i];
            field.appendChild(sltOption);
        }
    }
    if (labelValue) {
        label.innerHTML = labelValue + ' :';
        if (fieldType !== 'radio') {
            field.setAttribute('data-label-name', labelValue);
        } else {
            field.setAttribute('data-radio-label-name', labelValue);
            field2.setAttribute('data-radio-label-name', labelValue);
        }
    }
    getElemId('myModal').style.display = 'none';
    var formElements = getElemId('divModalContent').getElementsByClassName('model-form-fields');
    while (formElements[0]) {
        formElements[0].parentNode.removeChild(formElements[0]);
    }
}

getElemId('myModal').onclick = function(event) {
    var divModal = getElemId('myModal');
    if (event.target == divModal) {
        divModal.style.display = 'none';
        var formElements = getElemId('divModalContent').getElementsByClassName('model-form-fields');
        while (formElements[0]) {
            formElements[0].parentNode.removeChild(formElements[0]);
        }
    }
};

function objectifyForm(formArray) {
    var returnArray = [];
    var formName = getElemId('formName').value;
    if(formName === ''){
        alert('Enter Form Name');
        return;
    }
    for (var i = 0; i < formArray.length; i++) {
        var formList = formArray[i];
        if (formList.classList[0] !== 'edit-form-input' && formList.classList[0] !== 'not-form-field') {
            var formDetails = {
                'type': formList.type || '',
                'id': formList.id || '',
                'name': formList.name || '',
                'class': formList.className || '',
                'placeholder': formList.placeholder || '',
                'labelName': formList.dataset.labelName || '',
                'options': [],
                'colNo': formList.cols || '',
                'rowNo': formList.rows || '',
                'radioLabelName': formList.dataset.radioLabelName || ''
            };
            if(formList.type == 'button'){
                formDetails.labelName = formList.firstChild.nodeValue;
            }
            if (formList.type == 'select-one') {
                var options = formList.options;
                for (var j = 0; j < options.length; j++) {
                    if (options[j].innerText !== 'select value') {
                        formDetails.options.push(options[j].innerText);
                    }
                }
            }
            returnArray.push(formDetails);
        }
    }
    var jsonOutputform = {
        'formName':formName,
        'formDescription':getElemId('formDesc').value,
    };
    jsonOutputform.fieldset = returnArray;
    var prettyJson = JSON.stringify(jsonOutputform, undefined, 4);
    var jsonresultArea = getElemId('resultArea');
    jsonresultArea.style.display = 'block';
    jsonresultArea.value = prettyJson;
    download('test.txt', prettyJson);
}

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}
