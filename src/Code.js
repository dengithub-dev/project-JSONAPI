function doGet(e) {
  Logger.log( Utilities.jsonStringify(e) );
  if (!e.parameter.page) {
    return HtmlService.createTemplateFromFile('main').evaluate().setTitle('JSONAPI');
  }
  return HtmlService.createTemplateFromFile(e.parameter['page']).evaluate().setTitle('JSONAPI');
}

function getScriptUrl() {
    var url = ScriptApp.getService().getUrl();
    return url;
}

function deleteActivity_code(activity_e_id){
  var ss_delete_Activity = SpreadsheetApp.openById("1kvQqq0VdP2LwZTmytwyMAVJhPlcVGXkKmwbdgEp5NUo").getSheetByName("Summary");
  var ss_delete_Activity_match = ss_delete_Activity.getDataRange().getDisplayValues(); 
  for (var i = 1; i < ss_delete_Activity_match.length; i++) { 
    var get_toDelete_row_Activity = ss_delete_Activity_match[i][2];
    if (activity_e_id === get_toDelete_row_Activity){
     ss_delete_Activity.deleteRow([i][0] + 1) 
    }
  }
}

function activity_code_matching(target_clicked){
  var ss_activity_matching = SpreadsheetApp.openById("1kvQqq0VdP2LwZTmytwyMAVJhPlcVGXkKmwbdgEp5NUo");
  var activity_sheet_column_match = ss_activity_matching.getSheetByName("Summary").getDataRange().getDisplayValues(); 
  for (var i = 1; i < activity_sheet_column_match.length; i++) { 
    var get_link_match = activity_sheet_column_match[i][2];
    if (target_clicked === get_link_match){
      var method_d = activity_sheet_column_match[i][1];
      var link_d = activity_sheet_column_match[i][2];
      var username_d = activity_sheet_column_match[i][3];
      var password_d = activity_sheet_column_match[i][4];
      var token_d = activity_sheet_column_match[i][5];
      var header_d = activity_sheet_column_match[i][6];
      var body_d = activity_sheet_column_match[i][7];
    }
  } 
  var activity_data = { method: method_d , link: link_d, user: username_d, pass: password_d, token: token_d, header: header_d, body: body_d };
  return activity_data;
}

function activity_code(method, get_link,username_a, password_a, bearer_token,header_, body_){
  var ss = SpreadsheetApp.openById("1kvQqq0VdP2LwZTmytwyMAVJhPlcVGXkKmwbdgEp5NUo").getSheetByName("Summary");
  ss.appendRow([new Date(), method, get_link,username_a, password_a, bearer_token,header_,body_]);
}

function get_command_code(id_link, token_link, header_link, username_link, password_link){
  var token = token_link;
  var url = id_link;
  var header_data = header_link;
  var username = username_link;
  var password = password_link;
  var headers = { "Authorization": 'Bearer ' + token, header_data };
    //"Authorization" : "Basic " + Utilities.base64Encode(username + ':' + password),
    //"Content-Type": "application/json",
    //"Accept": "application/json"
  var options = {
    "method": "GET",
    "Content-Type": "application/json",
    "headers": headers
  };
  var data = UrlFetchApp.fetch(url, options).getContentText(); 
  var parse_ = JSON.parse(data);
  var parse_data = JSON.stringify(parse_, undefined, 2);
  var get_data = parse_data;
  return get_data;
}

function post_command_code(id_link, token_link, header_link, username_link, password_link, body){
  var token = token_link;
  var url = id_link;//"https://script.google.com/macros/s/AKfycbzqpbLcf4jg1it9rGlukOgoOwJPtcKCxoO69B1Oob8yqAJOQo4y/exec";
  var header_data = header_link;
  var username = username_link;
  var password = password_link;
  var content =  body;
  
  var headers = {
    "Authorization": 'Bearer ' + token,
    header_data
    //"Content-Type": "application/json",
    //"Accept": "application/json"
  };
  var options = {
    "method": "POST",
    "Content-Type": "application/json",
    "headers": headers,
    "payload": content
  };
  
  var data = UrlFetchApp.fetch(url, options); 
  var parse_ = JSON.parse(data);
  var parse_data = JSON.stringify(parse_, 2);
  var get_data = parse_data;
  return get_data;
}

function delete_command_code(id_link, token_link, header_link, username_link, password_link){
  var token = token_link;
  var url = id_link;
  var header_data = header_link;
  var username = username_link;
  var password = password_link;
  var headers = { "Authorization": 'Bearer ' + token, header_data };
    //"Authorization" : "Basic " + Utilities.base64Encode(username + ':' + password),
    //"Content-Type": "application/json",
    //"Accept": "application/json"
  var options = {
    "method": "DELETE",
    "Content-Type": "application/json",
    "headers": headers
  };
  var data = UrlFetchApp.fetch(url, options); 
  var parse_ = JSON.parse(data);
  var parse_data = JSON.stringify(parse_, undefined, 2);
  var get_data = parse_data;
  return get_data;
}