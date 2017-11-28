
var div_container = document.createElement("div");
    document.body.appendChild(div_container);
    div_container.setAttribute("class", "container");

var div_side_panel = document.createElement("div");
    div_container.appendChild(div_side_panel);
    div_side_panel.setAttribute("class", "side-panel");

var div_content = document.createElement("div");
    div_container.appendChild(div_content);
    div_content.setAttribute("class", "content");
var div_form = document.createElement("form");
    div_content.appendChild(div_form);
    div_form.setAttribute("id", "dynamicform");

    var submit_form_button = document.createElement("button");
    var submit_form_label = document.createTextNode("jSON");
        submit_form_button.setAttribute("type", "button");
        submit_form_button.setAttribute("onclick", "objectifyForm(dynamicform)");
        submit_form_button.appendChild(submit_form_label);
        div_form.appendChild(submit_form_button);
var div_form_input = document.createElement("div");
    div_side_panel.appendChild(div_form_input);
    div_form_input.setAttribute("class", "form-input");

///////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////sidePanalFields//////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
var sidePanalFields = function(label,attrfn,id  ){
  var select_button = document.createElement("button");
  var select_label = document.createTextNode(label);
      select_button.setAttribute("class", "create_form_element");
      submit_form_button.setAttribute("type", "button");
      select_button.setAttribute("onclick", "createFormElement('"+attrfn+"')");
      select_button.appendChild(select_label);
      div_form_input.appendChild(select_button);
}
sidePanalFields('Text', 'text');
sidePanalFields('Text Area', 'textarea');
sidePanalFields('Checkbox', 'checkbox');
sidePanalFields('Radio', 'radio');
sidePanalFields('Select', 'select');
var div_modal = document.createElement("div");
    div_modal.setAttribute("class", "modal");
    div_modal.setAttribute("id", "myModal");
    document.body.appendChild(div_modal);

var div_modal_content = document.createElement("div");
    div_modal_content.setAttribute("class", "modal-content");
    div_modal.appendChild(div_modal_content);

var createFormElement = function(type) {
      var element = type;
      var input_field = '';
      var div_form_fields = document.createElement("div");
          div_form.appendChild(div_form_fields);
          div_form_fields.setAttribute("class", "form-fields");

          var label_name = document.createElement("label");
          var label = document.createTextNode("Name:");
              label_name.appendChild(label);
              div_form_fields.appendChild(label_name);
      if(element === 'text' || element === 'checkbox' ){
            input_field = document.createElement("input");
            input_field.type = element;
            input_field.setAttribute("data-type", element);
            div_form_fields.appendChild(input_field);

      }else if(element === 'textarea'){
            input_field = document.createElement("textarea");
            input_field.setAttribute("data-type", element);
            div_form_fields.appendChild(input_field);
      }else if(element === 'select'){
            input_field = document.createElement("select");
            input_field.setAttribute("data-type", element);
            div_form_fields.appendChild(input_field);
            var option_field = document.createElement("option");
            option_field.value = '';
            option_field.text = 'select value';
            input_field.appendChild(option_field);
      }else if(element === 'radio'){
              var radio_label = document.createElement("label");
              input_field = document.createElement("input");
              input_field.type = element;
              input_field.setAttribute("data-type", element);
              div_form_fields.appendChild(radio_label);
              radio_label.appendChild(input_field);

              var radio_label2 = document.createElement("label");
              var input_field2 = document.createElement("input");
              input_field2.type = element;
              input_field2.setAttribute("data-type", "radio");
              div_form_fields.appendChild(radio_label2);
              radio_label2.appendChild(input_field2);
      }
      var edit_button = document.createElement("button");
      var edit_label = document.createTextNode("Edit");
          edit_button.setAttribute("class", "edit-form-input");
          edit_button.setAttribute("type", "button");
          edit_button.setAttribute("onclick", "sample()");
          edit_button.appendChild(edit_label);
          div_form_fields.appendChild(edit_button);

}

function sample(){
  var activeEvent = document.activeElement;
  console.log(activeEvent.previousSibling);

  var field = activeEvent.previousSibling;
  if(field.localName === 'label'){
    field = field.firstChild;
  }
  console.log(field.dataset.type);
      var div_modal = document.getElementById('myModal');
      div_modal.style.display = "block";
  // var transform_attr = document.querySelector("#"+field.id+"");
  // if(field.dataset.type === 'text' || field.dataset.type === 'textarea' || field.dataset.type === 'checkbox' || ){
    constructTextForm(field.dataset.type, activeEvent)
  // }
}

var constructTextForm = function(type, activeEvent){

      modalFormCreate('Placeholder :', 'placeholderValue')
      modalFormCreate('Label Name :', 'labelValue')
      if(type !== 'radio')
      modalFormCreate('ID :', 'idValue')
      modalFormCreate('Name :', 'nameValue')

      if(type === 'textarea'){
        modalFormCreate('Col No:', 'colNo')
        modalFormCreate('Row No:', 'rowNo')
      }

      if(type === 'radio'){
        modalFormCreate('Radio Label 1:', 'radLable1')
        modalFormCreate('Radio Label 2:', 'radLable2')
      }
      if(type === 'select'){
        modalFormCreate('Options:', 'option')

      }
      var modal_div_button = document.createElement("div");
          // modal_div_placeholder.setAttribute("class", "model-form-fields");
          div_modal_content.appendChild(modal_div_button);
      var modal_button = document.createElement("button");
      var button_label = document.createTextNode("Submit");
          modal_button.appendChild(button_label);
          modal_button.setAttribute("type", "button");
          modal_div_button.appendChild(modal_button);
          var randomNo = Math.floor((Math.random() * 50000) + 1);
          modal_button.setAttribute("onclick", "formOverRide("+randomNo+")");
          activeEvent.setAttribute("id", randomNo);
}

var modalFormCreate = function(labelName, inputId){

  var modal_div_placeholder = document.createElement("div");
      modal_div_placeholder.setAttribute("class", "model-form-fields");
      div_modal_content.appendChild(modal_div_placeholder);

      var placeholder_label_name = document.createElement("label");
      var placeholder_label = document.createTextNode(labelName);
          placeholder_label_name.appendChild(placeholder_label);
          modal_div_placeholder.appendChild(placeholder_label_name);

      var placeholder_input_field = document.createElement("input");
          placeholder_input_field.type = 'text';
          placeholder_input_field.id = inputId;
          modal_div_placeholder.appendChild(placeholder_input_field);
}

var formOverRide = function(radNo) {
  var buttonAct = document.getElementById(radNo);
  var field = buttonAct.previousSibling;
  if(field.localName === 'label'){
    var radLabel1 = field;
    field = radLabel1.firstChild;
  }
  var fieldType =field.dataset.type;
  console.log(fieldType);
  var placeholderValue = document.getElementById('placeholderValue').value;
  var labelValue = document.getElementById('labelValue').value;
  if(fieldType !== 'radio')
  var idValue = document.getElementById('idValue').value;
  if(fieldType == 'radio'){
    var radLableName1 = document.getElementById('radLable1').value;
    var radLableName2 = document.getElementById('radLable2').value;
  }
  var nameValue = document.getElementById('nameValue').value;
  if(fieldType == 'radio'){
    var radLabel2 = radLabel1.previousSibling;
    var field2 = radLabel2.firstChild;
    var label = radLabel2.previousSibling;
  }else{
    var label = field.previousSibling;
  }
  var button = buttonAct;
  if(placeholderValue)
  field.setAttribute("placeholder", placeholderValue);
  if(idValue)
  field.setAttribute("id", idValue);
  if(nameValue)
  field.setAttribute("name", nameValue);
  if(fieldType == 'radio'){
    field2.setAttribute("name", nameValue);
    field.setAttribute("id", '');
    field2.setAttribute("id", '');
  }
if(fieldType === 'textarea'){
  var colNo = document.getElementById('colNo').value;
  var rowNo = document.getElementById('rowNo').value;
  if(colNo)
  field.setAttribute("cols", colNo);
  if(rowNo)
  field.setAttribute("rows", rowNo);

}
if(fieldType === 'radio'){
  if(radLableName1){
    field.setAttribute("data-label-name",radLableName1 );
    if(labelValue)
    field.setAttribute("data-radio-label-name",labelValue );
    radLabel1.innerHTML = '';
    radLabel1.appendChild(field);
    radLabel1.innerHTML += radLableName1;
  }
  if(radLableName2){
    field2.setAttribute("data-label-name",radLableName2 );
    if(labelValue)
    field2.setAttribute("data-radio-label-name",labelValue );
    radLabel2.innerHTML = '';
    radLabel2.appendChild(field2);
    radLabel2.innerHTML += radLableName2;
  }
}
if(fieldType === 'select'){
  var option = document.getElementById('option').value;
  var aOption = option.split(",");
  for (var i = 0; i < aOption.length; i++) {
      var option = document.createElement("option");
      option.value = aOption[i];
      option.text = aOption[i];
      field.appendChild(option);
  }
}
  if(labelValue){
    label.innerHTML = labelValue+' :';
    if(fieldType !== 'radio'){
      field.setAttribute("data-label-name",labelValue );
    }else{
      field.setAttribute("data-radio-label-name",labelValue );
      field2.setAttribute("data-radio-label-name",labelValue );
    }
console.log(field);
console.log(field2);
  }
  div_modal.style.display = "none";
  div_modal_content.innerHTML = '';
}

window.onclick = function(event) {
  var div_modal = document.getElementById('myModal');
    if (event.target == div_modal) {
        div_modal.style.display = "none";
        div_modal_content.innerHTML = '';
    }
}

function objectifyForm(formArray) {//serialize data function
  console.log(formArray);
  var returnArray = [];
  for (var i = 0; i < formArray.length; i++){
    if(formArray[i]['classList'][0] !== "edit-form-input"){
      var formDetails = {
        'type':'',
        'id':'',
        'name':'',
        'placeholder':'',
        'dataLabelName':'',
        'options':[],
        'colNo':'',
        'rowNo':'',
        'dataRadioLabelName':''
      }
      formDetails.type = formArray[i].type;
      formDetails.id = formArray[i].id;
      formDetails.name = formArray[i].name;
      formDetails.placeholder = formArray[i].placeholder;
      formDetails.dataLabelName = formArray[i].dataset.labelName;
      formDetails.colNo = formArray[i].cols;
      formDetails.rowNo = formArray[i].rows;
      formDetails.radioLabelName = formArray[i].dataset.RadioLabelName;
      returnArray.push(formDetails);
      // if(formArray[i].type == 'select'){
      //   var options = formArray[i].options;
      //   console.log(options);
      // }
    }

    // returnArray[formArray[i]['name']] = formArray[i]['data-type'];
  }
  console.log(returnArray);
  // console.log(returnArray);
  return returnArray;
}
