var divElm = document.createElement('div');
function getElemId(elemId) {
    return document.getElementById(elemId);
}
function setTextNode(text) {
    return document.createTextNode(text);
}
function createElementWithProp(elmtag, propObj, apndElem) {
    var newElem = document.createElement(elmtag);
    for (var key in propObj){
        var propValue  = propObj[key];
        if(key === 'button-i'){
            var iDownload = document.createElement('i');
            iDownload.setAttribute('class', propValue);
            newElem.appendChild(iDownload);
        }else if(key === 'elemText'){
            newElem.appendChild(setTextNode(propValue));
        }else{
            newElem.setAttribute(key, propValue);
        }
    }
    apndElem.appendChild(newElem);
    return newElem;
}
function createFormElement(type) {
    var element = type;
    var inputField = '';
    var divFormFields = divElm.cloneNode(false);
    getElemId('dynamicform').insertBefore(divFormFields, getElemId('divBtn'));
    divFormFields.setAttribute('class', 'form-fields');
    var labelTitle = type.charAt(0).toUpperCase() + type.slice(1) + ' :';
    var labelName = createElementWithProp('label',
      {
        'class':'modal-Heading',
        'elemText':labelTitle
      }, divFormFields);

    getElemId('submitFormButton').style.display = 'inline';
    getElemId('formDesc').style.display = 'inline';
    if (element === 'text' || element === 'checkbox') {
        inputField = createElementWithProp('input',
        {
          'type':element,
          'data-type': element
        }, divFormFields);
    } else if (element === 'textarea') {
        inputField = createElementWithProp('textarea',
          {
            'data-type': element
          }, divFormFields);
    } else if (element === 'select') {
        inputField = createElementWithProp('select',
          {
            'data-type': element
          }, divFormFields);
        var optionField = createElementWithProp('option', {}, inputField);
        optionField.text = 'select value';
    } else if (element === 'radio') {
        var radioLabel = createElementWithProp('label', {}, divFormFields);
        inputField = createElementWithProp('input',
          {
            'type':element,
            'data-type':element
          }, radioLabel);
        var radioLabel2 = createElementWithProp('label', {}, divFormFields);
        var inputField2 = createElementWithProp('input',
          {
            'type':element,
            'data-type':element
          }, radioLabel2);
    }else if (element === 'button') {
        inputField = createElementWithProp('button',
          {
            'type':'button',
            'class':'form-field-button',
            'elemText':'Submit',
            'data-type':element
          }, divFormFields);
    }
    var editButton = createElementWithProp('button',
      {
        'type':'button',
        'class':'edit-form-input edit-form-fields',
        'button-i':'fa fa-pencil',
        'title':'Edit',
        'onclick':'editFormAttr()'
      }, divFormFields);
    var deleteButton = createElementWithProp('button',
      {
        'type':'button',
        'class':'edit-form-input edit-form-fields',
        'button-i':'fa fa-times',
        'title':'Delete',
        'onclick':'deleteFields()'
      }, divFormFields);
}
function constructTextForm(type, activeEvent) {
    var field = activeEvent.previousSibling;
    var field2, label2, labelValue1, labelValue2;

    if (type == 'radio') {
        var label1 = field;
        field = label1.firstChild;
        label2 = label1.previousSibling;
        field2 = label2.firstChild;
    }
    var placeHolderValue = field.placeholder || '';
    var labelValue = field.dataset.labelName || '';
    var nameValue = field.name || '';
    var idValue = field.id || '';
    var colsValue = field.cols || '';
    var rowsValue = field.rows || '';
    var optionValue = '' , btnValue;
    var classvalue = field.className;
    if(type == 'button') {
        btnValue = field.firstChild.nodeValue;
    }
    if (type == 'select') {
        var options = field.options;
        for (var k = 0; k < field.options.length; k++) {
            var optval = options[k];
            if (optval.innerText !== 'select value') {
                if (k > 0) {
                    optionValue += ',';
                }
                optionValue += optval.innerText;
            }
        }
    }
    if (type == 'radio') {
        labelValue = field.dataset.radioLabelName || '';
        labelValue1 = field.dataset.labelName || '';
        labelValue2 = field2.dataset.labelName || '';
    }
    modalFormCreate('Label :', 'labelValue', labelValue);
    modalFormCreate('Class :', 'classValue', classvalue);
    modalFormCreate('Name :', 'nameValue', nameValue);
    if (type !== 'radio'){
        modalFormCreate('ID :', 'idValue', idValue);
    }
    switch(type) {
        case 'text':
            modalFormCreate('Placeholder :', 'placeholderValue', placeHolderValue);
            break;
        case 'textarea':
            modalFormCreate('Placeholder :', 'placeholderValue', placeHolderValue);
            modalFormCreate('Col No:', 'colNo', colsValue);
            modalFormCreate('Row No:', 'rowNo', rowsValue);
            break;
        case 'radio':
            modalFormCreate('Radio Name 1:', 'radLable1', labelValue1);
            modalFormCreate('Radio Name 2:', 'radLable2', labelValue2);
            break;
        case 'select':
            modalFormCreate('Options:', 'option', optionValue);
            break;
        case 'button':
            modalFormCreate('Button Name:', 'btnName', btnValue);
            break;
        default:
            break;
    }

    var modalDivButton = createElementWithProp('div', {}, getElemId('divModalContent'));

    var randomNo = Math.floor((Math.random() * 50000) + 1);
    var modalButton = createElementWithProp('button',
      {
        'type':'button',
        'class':'model-form-fields',
        'button-i':'fa fa-floppy-o',
        'elemText':'Save',
        'onclick':'formOverRide(' + randomNo + ')'
      }, modalDivButton);
    activeEvent.setAttribute('id', randomNo);
}

function modalFormCreate(labelName, inputId, value) {
    var modalDivPlaceholder = createElementWithProp('div',
      {
        'class':'model-form-fields'
      }, getElemId('divModalContent'));
    var placeholderLabelName = createElementWithProp('label',
      {
        'elemText':labelName
      }, modalDivPlaceholder);
    var placeholderInputField = createElementWithProp('input',
      {
        'type':'text',
        'id':inputId,
        'value':value
      }, modalDivPlaceholder);
}

var divContainer = createElementWithProp('div',
  {
    'class':'container'
  }, document.body);
createHeaderContent(divContainer);
cerateSidePanelContent(divContainer);
createMainContent(divContainer);
createFooterContent(divContainer);
createModalContent(divContainer);

function createHeaderContent(appndDOMElement) {
  var header = createElementWithProp('header', {}, appndDOMElement);
  var divHeaderContainer = createElementWithProp('div',
    {
      'class':'header-container'
    }, header);
  var divHeaderheading = createElementWithProp('div',
    {
      'class':'header-heading'
    }, divHeaderContainer);
  createElementWithProp('h3',
    {
      'elemText':'Visual Form Builder'
    }, divHeaderheading);
}

function cerateSidePanelContent(appndDOMElement) {
  var divSidePanel = createElementWithProp('div',
    {
      'class':'side-panel'
    }, appndDOMElement);
  createElementWithProp('h3',
    {
      'elemText':'Components'
    }, divSidePanel);
  var divFormInput = createElementWithProp('div',
    {
      'class':'form-input'
    }, divSidePanel);
  var formName = createElementWithProp('input',
    {
      'type':'text',
      'id':'formName',
      'placeholder':'Enter Form Name'
    }, divFormInput);
var sidePanelBtn = [
  {'class':'create-form-element', 'button-i':'fa fa-text-width', 'elemText':'Text','elemFn':'text'},
  {'class':'create-form-element', 'button-i':'fa fa-pencil-square-o', 'elemText':'Text Area','elemFn':'textarea'},
  {'class':'create-form-element', 'button-i':'fa fa-check-square-o', 'elemText':'Checkbox','elemFn':'checkbox'},
  {'class':'create-form-element', 'button-i':'fa fa-circle-o', 'elemText':'Radio','elemFn':'radio'},
  {'class':'create-form-element', 'button-i':'fa fa-th-list', 'elemText':'Select','elemFn':'select'},
  {'class':'create-form-element', 'button-i':'fa fa-square', 'elemText':'Button','elemFn':'button'},
];
sidePanelBtn.forEach(function(sidePnlElement) {
  createElementWithProp('button',
    {
      'type':'button',
      'class':sidePnlElement.class,
      'button-i':sidePnlElement['button-i'],
      'elemText':sidePnlElement.elemText,
      'onclick':'createFormElement("'+sidePnlElement.elemFn+'")'
    }, divFormInput);
});
}

function createFooterContent(appndDOMElement) {
  var footer = createElementWithProp('footer',{},appndDOMElement);
  createElementWithProp('div',
    {
      'class':'footer-content',
      'button-i':'fa fa-copyright',
      'elemText':' copyright 2017'
    }, footer);
}
function createMainContent(appndDOMElement) {

  var divContent = createElementWithProp('div',
    {
      'class':'content'
    }, appndDOMElement);
  createElementWithProp('div',
    {
      'class':'content-heading',
      'elemText':'Your Form'
    }, divContent);
  var divResult = createElementWithProp('div',
    {
      'class':'result'
    }, appndDOMElement);
  createElementWithProp('div',
    {
      'class':'result-heading',
      'elemText':'Result'
    }, divResult);
  var divResultContent = createElementWithProp('div',
    {
      'class':'result-content'
    }, divResult);
  var resultTextArea = createElementWithProp('textarea',
    {
      'id':'resultArea',
      'cols':'80',
      'rows':'20',
      'style':'display:none'
    }, divResultContent);
  var divForm = createElementWithProp('form',
    {
      'class':'dynamic-form',
      'id':'dynamicform'
    }, divContent);
  var formDescription = createElementWithProp('input',
    {
      'id':'formDesc',
      'type':'text',
      'class':'not-form-field form-desc',
      'placeholder':'Enter Form Description'
    }, divForm);
  var divButton = createElementWithProp('div',
    {
      'id':'divBtn',
      'class':'btn-submit'
    }, divForm);
  var submitFormButton = createElementWithProp('button',
    {
      'type':'button',
      'id':'submitFormButton',
      'class':'edit-form-input btn-covert',
      'button-i':'fa fa-download',
      'elemText':'Convert to jSON',
      'onclick':'objectifyForm(dynamicform)'
    }, divButton);
}

function createModalContent(appndDOMElement) {
  var divModal = createElementWithProp('div',
    {
      'class':'modal',
      'id':'myModal'
    }, appndDOMElement);
  var divModalContent = createElementWithProp('div',
    {
      'id':'divModalContent',
      'class':'modal-content'
    }, divModal);
  createElementWithProp('div',
    {
      'class':'modal-Heading',
      'elemText':'Edit Form'
    }, divModalContent);
}
