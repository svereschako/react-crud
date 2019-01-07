import React, { Component } from "react";
import { render } from "react-dom";
import Form from "react-jsonschema-form";
import data from "../db";

var appls = data;
if(sessionStorage.getItem("data"))
  appls = JSON.parse(sessionStorage.getItem("data"));

const schema = {
  title: "Application",
  type: "object",
  required: ["subject"],
  properties: {
    subject: {type: "string", title: "Subject", default: "A new task"},
    date: {type: "number", title: "Date", default: ""},
    content: {type: "string", title: "Content", default: ""},
    userName: {type: "string", title: "userName", default: ""}
  }
};


function onSubmit({formData}) {
    var appl = {};
    appl.id = appls[appls.length-1].id+1;
    appl.subject = formData.subject;
    appl.date = formData.date;
    appl.content = formData.content;
    appl.userName = formData.userName;
    appls.push(appl);
    document.querySelector("#root_subject").value = "";
    document.querySelector("#root_date").value = "";
    document.querySelector("#root_content").value = "";
    document.querySelector("#root_userName").value = "";
    sessionStorage.setItem("data", JSON.stringify(appls));
    console.log(appls);

} 

export default function Element() {
  return <Form schema={schema} onSubmit={onSubmit} />;
} 
  

