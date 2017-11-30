'use strict'
var divElm = document.createElement("div");
var btnElm = document.createElement("button");
var inputElm = document.createElement("input");
var textareaElm = document.createElement("textarea");
var selectElm = document.createElement("select");

var createDiv = function(classes, elemId, apndElem, apndNode) {
  var divCreateElm = divElm.cloneNode(false);
  divCreateElm.setAttribute("class", classes);
  divCreateElm.setAttribute("id", elemId);
  divCreateElm.appendChild(document.createTextNode(apndNode));
  apndElem.appendChild(divCreateElm);
  return divCreateElm;
}
var createBtn = function(classes, elemId, iconClass, apndElem, apndNode) {
  var btnCreateElm = btnElm.cloneNode(false);
  btnCreateElm.setAttribute("type", "button");
  btnCreateElm.setAttribute("class", classes);
  var iDownload = document.createElement('i');
        iDownload.setAttribute('class', iconClass);
        // apndElem.insertBefore(iDownload, btnCreateElm);
        btnCreateElm.appendChild(iDownload);
        btnCreateElm.appendChild(document.createTextNode(apndNode));
  apndElem.appendChild(btnCreateElm);
  return btnCreateElm;

}

var createInput = function(type, elemId, elemValue, dataType, apndElem) {
  var inputCreateElm = inputElm.cloneNode(false);
  inputCreateElm.type = type;
  inputCreateElm.id = elemId;
  inputCreateElm.value = elemValue;
  inputCreateElm.setAttribute("data-type", dataType);
  apndElem.appendChild(inputCreateElm);
  return inputCreateElm;
}
var divContainer = createDiv('container', '', document.body,'');
var header = document.createElement("header");
    divContainer.appendChild(header);

var divHeaderContainer = createDiv('header-container', '', header,'');
var divHeaderheading = createDiv('header-heading', '', divHeaderContainer,'');
var headerContent = document.createElement("h3");
    headerContent.appendChild(document.createTextNode('Form Builder'));
    divHeaderheading.appendChild(headerContent);

var divSidePanel = createDiv('side-panel', '', divContainer,'Select a field');
var divContent = createDiv('content', '', divContainer,'');
var divContentHeading = createDiv('content-heading', '', divContent,'Form Fields');
var divResult = createDiv('result', '', divContainer,'');
var divResultHeading = createDiv('result-heading', '', divResult,'Result');
var divResultContent = createDiv('result-content', '', divResult,'');
// var divResultContent = createDiv('result-content', '', divResult,'');

var resultTextArea = textareaElm.cloneNode(false);
    resultTextArea.setAttribute("id", 'resultArea');
    resultTextArea.setAttribute("cols", '80');
    resultTextArea.setAttribute("rows", '20');
    resultTextArea.style.display = "none";
    divResultContent.appendChild(resultTextArea);

var divForm = document.createElement("form");
divForm.setAttribute("class", "dynamic-form");
divForm.setAttribute("id", "dynamicform");
divContent.appendChild(divForm);
var divFormInput = createDiv('form-input', '', divSidePanel,'');
var divButton = createDiv('btn-submit', '', divForm,'');
var submitFormButton = createBtn('edit-form-input btn-covert', '', 'fa fa-download', divButton, 'Convert to jSON');
submitFormButton.setAttribute("onclick", "objectifyForm(dynamicform)");

///////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////sidePanalFields//////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
var sidePanalFields = function(label, attrfn, id, icon) {
  try {

    var selectButton = createBtn('create-form-element', '', icon, divFormInput, label);
    selectButton.setAttribute("onclick", "createFormElement('" + attrfn + "')");
  } catch (e) {
    console.log(e);
  }
}
sidePanalFields('Text', 'text', '', 'fa fa-text-width');
sidePanalFields('Text Area', 'textarea', '', 'fa fa-pencil-square-o');
sidePanalFields('Checkbox', 'checkbox', '', 'fa fa-check-square-o');
sidePanalFields('Radio', 'radio', '', 'fa fa-circle-o');
sidePanalFields('Select', 'select', '', 'fa fa-th-list');
var divModal = createDiv('modal', 'myModal', document.body,'');
var divModalContent = createDiv('modal-content', '', divModal,'');
var divModalHeading = createDiv('modal-Heading', '', divModalContent,'Edit Form');
var labelDefaultName = document.createElement("label");

var createFormElement = function(type) {
  try {
    var element = type;
    var inputField = '';
    var divFormFields = divElm.cloneNode(false);
    divForm.insertBefore(divFormFields, divButton);
    divFormFields.setAttribute("class", "form-fields");
    var labelName = labelDefaultName.cloneNode(true);
    var labelDefaultValue = document.createTextNode(type.charAt(0).toUpperCase() + type.slice(1) + ' :');
    labelName.appendChild(labelDefaultValue);
    divFormFields.appendChild(labelName);
    if (element === 'text' || element === 'checkbox') {
        inputField = createInput(element, '', '',element, divFormFields);
    } else if (element === 'textarea') {
      inputField = textareaElm.cloneNode(false);
      inputField.setAttribute("data-type", element);
      divFormFields.appendChild(inputField);
    } else if (element === 'select') {
      inputField = selectElm.cloneNode(false);
      inputField.setAttribute("data-type", element);
      divFormFields.appendChild(inputField);
      var optionField = document.createElement("option");
      optionField.value = '';
      optionField.text = 'select value';
      inputField.appendChild(optionField);
    } else if (element === 'radio') {
      var radioLabel = document.createElement("label");
      inputField = createInput(element, '', '',element, radioLabel);
      divFormFields.appendChild(radioLabel);
      radioLabel.appendChild(inputField);
      var radioLabel2 = document.createElement("label");
      var inputField2 = createInput(element, '', '',element, radioLabel2);
      divFormFields.appendChild(radioLabel2);
      radioLabel2.appendChild(inputField2);
    }
    var editButton = createBtn('edit-form-input', '', 'fa fa-pencil', divFormFields, '');
    editButton.setAttribute("onclick", "editFormAttr()");
    var deleteButton = createBtn('edit-form-input', '', 'fa fa-times', divFormFields, '');
    deleteButton.setAttribute("onclick", "deleteFields()");
  } catch (e) {
    console.log(e);
  }
}

function editFormAttr() {
  try {
    var activeEvent = document.activeElement;
    var field = activeEvent.previousSibling;
    if (field.localName === 'label') {
      field = field.firstChild;
    }
    var divModal = document.getElementById('myModal');
    divModal.style.display = "block";
    constructTextForm(field.dataset.type, activeEvent)
  } catch (e) {
    console.log(e);
  }
}
function deleteFields() {
  try {
    var activeEvent = document.activeElement;
    activeEvent.parentNode.remove();
  } catch (e) {
    console.log(e);
  }
}
var constructTextForm = function(type, activeEvent) {
  try {
    var field = activeEvent.previousSibling;
    if (type == 'radio') {
      var label1 = field;
      field = label1.firstChild;
      var label2 = label1.previousSibling;
      var field2 = label2.firstChild;
    }
    var placeHolderValue = field.placeholder || '';
    var labelValue = field.dataset.labelName || '';
    var nameValue = field.name || '';
    var idValue = field.id || '';
    var colsValue = field.cols || '';
    var rowsValue = field.rows || '';
    var optionValue = '';
    var classvalue = field.className;

    if (type == 'select') {
      var options = field.options;
      for (var k = 0; k < field.options.length; k++) {
        if (options[k].innerText !== 'select value') {
          if (k > 0) {
            optionValue += ',';
          }
          optionValue += options[k].innerText;
        }
      }
    }
    if (type == 'radio') {
      var labelValue = field.dataset.radioLabelName || '';
      var labelValue1 = field.dataset.labelName || '';
      var labelValue2 = field2.dataset.labelName || '';
    }
    if (type === 'text' || type === 'textarea')
      modalFormCreate('Placeholder :', 'placeholderValue', placeHolderValue)
      modalFormCreate('Label Name :', 'labelValue', labelValue)
      modalFormCreate('Class :', 'classValue', classvalue)
    if (type !== 'radio')
      modalFormCreate('ID :', 'idValue', idValue)
      modalFormCreate('Name :', 'nameValue', nameValue)
    if (type === 'textarea') {
      modalFormCreate('Col No:', 'colNo', colsValue)
      modalFormCreate('Row No:', 'rowNo', rowsValue)
    }
    if (type === 'radio') {
      modalFormCreate('Radio Label 1:', 'radLable1', labelValue1)
      modalFormCreate('Radio Label 2:', 'radLable2', labelValue2)
    }
    if (type === 'select') {
      modalFormCreate('Options:', 'option', optionValue)
    }
    var modalDivButton = createDiv('', '', divModalContent,'');

    var modalButton = createBtn('model-form-fields', '', 'fa fa-download', modalDivButton, 'Submit');
    var randomNo = Math.floor((Math.random() * 50000) + 1);
    modalButton.setAttribute("onclick", "formOverRide(" + randomNo + ")");
    activeEvent.setAttribute("id", randomNo);


  } catch (e) {
    console.log(e);
  }
}

var modalFormCreate = function(labelName, inputId, value) {
  try {
    var modalDivPlaceholder = createDiv('model-form-fields', '', divModalContent,'');

    var placeholderLabelName = document.createElement("label");
    var placeholderLabel = document.createTextNode(labelName);
    placeholderLabelName.appendChild(placeholderLabel);
    modalDivPlaceholder.appendChild(placeholderLabelName);

    var placeholderInputField = createInput('text', inputId, value, '', modalDivPlaceholder);
  } catch (e) {
    console.log(e);
  }
}

var formOverRide = function(radNo) {
  try {
    var buttonAct = document.getElementById(radNo);
    var field = buttonAct.previousSibling;
    if (field.localName === 'label') {
      var radLabel1 = field;
      field = radLabel1.firstChild;
    }
    var fieldType = field.dataset.type;
    if (fieldType === 'text' || fieldType === 'textarea')
      var placeholderValue = document.getElementById('placeholderValue').value;
    var labelValue = document.getElementById('labelValue').value;
    var classValue = document.getElementById('classValue').value;
    if (fieldType !== 'radio')
      var idValue = document.getElementById('idValue').value;
    if (fieldType == 'radio') {
      var radLableName1 = document.getElementById('radLable1').value;
      var radLableName2 = document.getElementById('radLable2').value;
    }
    var nameValue = document.getElementById('nameValue').value;
    if (fieldType == 'radio') {
      var radLabel2 = radLabel1.previousSibling;
      var field2 = radLabel2.firstChild;
      var label = radLabel2.previousSibling;
    } else {
      var label = field.previousSibling;
    }
    var button = buttonAct;
    if (classValue)
      field.setAttribute("class", classValue);
    if (placeholderValue)
      field.setAttribute("placeholder", placeholderValue);
    if (idValue)
      field.setAttribute("id", idValue);
    if (nameValue)
      field.setAttribute("name", nameValue);
    if (fieldType == 'radio') {
      field2.setAttribute("name", nameValue);
      field2.setAttribute("class", classValue);
      field.setAttribute("id", '');
      field2.setAttribute("id", '');
    }
    if (fieldType === 'textarea') {
      var colNo = document.getElementById('colNo').value;
      var rowNo = document.getElementById('rowNo').value;
      if (colNo)
        field.setAttribute("cols", colNo);
      if (rowNo)
        field.setAttribute("rows", rowNo);
    }
    if (fieldType === 'radio') {
      if (radLableName1) {
        field.setAttribute("data-label-name", radLableName1);
        if (labelValue)
          field.setAttribute("data-radio-label-name", labelValue);
        radLabel1.innerHTML = '';
        radLabel1.appendChild(field);

        radLabel1.appendChild(document.createTextNode(radLableName1));
      }
      if (radLableName2) {
        field2.setAttribute("data-label-name", radLableName2);
        if (labelValue)
          field2.setAttribute("data-radio-label-name", labelValue);
        radLabel2.innerHTML = '';
        radLabel2.appendChild(field2);
        radLabel2.appendChild(document.createTextNode(radLableName2));
      }
    }
    if (fieldType === 'select') {
      var option = document.getElementById('option').value;
      var aOption = option.split(",");
      field.innerHTML = '';
      for (var i = 0; i < aOption.length; i++) {
        var option = document.createElement("option");
        field.setAttribute("class", 'select-options');
        option.value = aOption[i];
        option.text = aOption[i];
        field.appendChild(option);
      }
    }
    if (labelValue) {
      label.innerHTML = labelValue + ' :';
      if (fieldType !== 'radio') {
        field.setAttribute("data-label-name", labelValue);
      } else {
        field.setAttribute("data-radio-label-name", labelValue);
        field2.setAttribute("data-radio-label-name", labelValue);
      }
    }
    divModal.style.display = "none";
    var formElements = divModalContent.getElementsByClassName("model-form-fields");
    while (formElements[0]) {
        formElements[0].parentNode.removeChild(formElements[0]);
    }

  } catch (e) {
    console.log(e);
  }
}

window.onclick = function(event) {
  try {
    var divModal = document.getElementById('myModal');
    if (event.target == divModal) {
      divModal.style.display = "none";
      var formElements = divModalContent.getElementsByClassName("model-form-fields");
      while (formElements[0]) {
          formElements[0].parentNode.removeChild(formElements[0]);
      }
    }
  } catch (e) {
    console.log(e);
  }
}

function objectifyForm(formArray) {
  try {
    var returnArray = [];
    console.log(formArray.length);
    for (var i = 0; i < formArray.length; i++) {
      var formList = formArray[i];
      if (formList['classList'][0] !== "edit-form-input") {
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
        }
        if (formList.type == 'select-one') {
          var options = formList.options;
          for (var j = 0; j < options.length; j++) {
            if (options[j].innerText !== 'select value') {
              formDetails.options.push(options[j].innerText)
            }
          }
        }
        returnArray.push(formDetails);
      }
    }
    var pretty = JSON.stringify(returnArray, undefined, 4);
    var jsonresultArea = document.getElementById('resultArea');
        jsonresultArea.style.display = "block";
        jsonresultArea.value = pretty;
    // divResultContent.innerHTML = JSON.stringify(pretty);
    download('test.txt', pretty);

  } catch (e) {
    console.log(e);
  }
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
