var AppDispatcher = require('../AppDispatcher');
require('whatwg-fetch');

// Open Conversation function
exports.openConversation = (data) => {
   fetch('/api/openConversation', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+sessionStorage.getItem('token'),
    },
    body : JSON.stringify(data)
  }).then(function(res){
    return res.json();
  }).then(function(json){
    if(json.status){
      AppDispatcher.dispatch({
            eventType: 'openConversation',
            data: json,
      })
    }
    else{
      
    }
    return json;
  }).catch(function(err){
    return err;
  });
}

// Check User for authorization
exports.checkUser = () =>{
    fetch('/api/checkUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+sessionStorage.getItem('token'),
    }
  }).then(function(res){
    return res.json();
  }).then(function(json){
    if(json.status){
       AppDispatcher.dispatch({
            eventType: 'userChecked',
            data: json,
      });
    }
    else{
      AppDispatcher.dispatch({
            eventType: 'userOut',
            data: json,
      });
    }
    return json;
}).catch(function(err){
    return err;
  });
}

// Register User 
exports.registerUser = (data) =>{
    fetch('/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(function(res){
    return res.json();
  }).then(function(json){
       AppDispatcher.dispatch({
            eventType: 'register',
            data: json,
      });
    return json;
}).catch(function(err){
    return err;
  });
}
// Login
exports.loginUser = (data) =>{
    fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(function(res){
    return res.json();
  }).then(function(json){
    AppDispatcher.dispatch({
      eventType: 'login',
      data: json
    });
    return json;
}).catch(function(err){
    return err;
  });
}

exports.getConversations = () =>{
  fetch('/api/getConversations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+sessionStorage.getItem('token'),
    }
  }).then(function(res){
    return res.json();
  }).then(function(json){
    if(json.status){
       AppDispatcher.dispatch({
            eventType: 'loadConversations',
            data: json,
      });
    }
    return json;
}).catch(function(err){
    return err;
  });
}

exports.sendRead = (data) =>{
  fetch('/api/setNotificationRead', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+sessionStorage.getItem('token'),
    },
    body: JSON.stringify({id : data}),
  }).then(function(res){
    return res.json();
  }).then(function(json){
    if(json.status){
       AppDispatcher.dispatch({
            eventType: 'notificationRead',
            data: json,
      });
    }
    return json;
}).catch(function(err){
    return err;
  });
}

exports.deleteNotification = (id) =>{
  fetch('/api/deleteNotification', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+sessionStorage.getItem('token'),
    },
    body: JSON.stringify({id : id}),
  }).then(function(res){
    return res.json();
  }).then(function(json){
    if(json.status){
       AppDispatcher.dispatch({
            eventType: 'notificationDeleted',
            data: json,
      });
    }
    return json;
}).catch(function(err){
    return err;
  });
}