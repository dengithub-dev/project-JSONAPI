//model 
function doGet(e) {
  Logger.log( Utilities.jsonStringify(e) );
  if (!e.parameter.page) {
    return HtmlService.createTemplateFromFile('login').evaluate().setTitle('JSONAPI').setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  }
  return HtmlService.createTemplateFromFile(e.parameter['page']).evaluate().setTitle('JSONAPI').setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function getScriptUrl() {
    var url = ScriptApp.getService().getUrl();
    return url;
}

function include(File) {
  return HtmlService.createHtmlOutputFromFile(File).getContent();
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
  let scriptCache = CacheService.getScriptCache();
  let cache = scriptCache.get("active");
  ss.appendRow([new Date(), method, get_link,username_a, password_a, bearer_token,header_,body_,cache]);
  
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
  var url = id_link;
  var header_data = header_link;
  var username = username_link;
  var password = password_link;
  var content =  body;
  
  var headers = {
    "Authorization": 'Bearer ' + token,
    header_data
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

function getCredentialCode(username, password){
  let message = "error";
  let ss = SpreadsheetApp.openById("1kvQqq0VdP2LwZTmytwyMAVJhPlcVGXkKmwbdgEp5NUo");
  let credSheet = ss.getSheetByName("Credentials"); 
  let last_row = credSheet.getLastRow();
  let cred_values_username = credSheet.getRange(2,2,last_row,1).getValues();
  let cred_values_password = credSheet.getRange(2,3,last_row,1).getValues();
  //ES6 
  let find_cred_values_username = cred_values_username.find(value => value == username);
  if (find_cred_values_username){
    let find_cred_values_password = cred_values_password.find(value => {
      value == password? message="success" : "error"
    });
  }
  
  /* //for loop
  let ss_credentials_sheet = ss.getSheetByName("Credentials").getDataRange().getDisplayValues(); 
  let message = "error";
  for (let i = 1; i < ss_credentials_sheet.length; i++) { 
    let getUsername = ss_credentials_sheet[i][1];
    let getPassword = ss_credentials_sheet[i][2];
    if (username === getUsername) {
     if (password === getPassword){
       message = "success"
     } 
    } 
  } 
  */
  let data = { message: message };
  return data;
}

function signupCredentialCode(username, password, name, email){
  let ss = SpreadsheetApp.openById("1kvQqq0VdP2LwZTmytwyMAVJhPlcVGXkKmwbdgEp5NUo");
  let ss_credentials_sheet = ss.getSheetByName("Credentials");
  let date = new Date();
  ss_credentials_sheet.appendRow([date,username,password,name,email])
  let data = { message: "Success." };
  return data;
}

function putDataInCache(username){
 let scriptCache = CacheService.getScriptCache()
 scriptCache.put("active", username);
}

function getDataInCache(){
 let scriptCache = CacheService.getScriptCache();
 let message;
 let cache = scriptCache.get("active");
 cache? message = "active": message = "inactive"
 let data = { message : message, user: cache };
 return data;
}

function deleteDataInCache(){
let scriptCache = CacheService.getScriptCache();
scriptCache.remove("active");
}