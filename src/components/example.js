    import React from 'react';
    import Admin from "react-crud-admin";
    import "../../node_modules/react-crud-admin/public/main.css";
    import Form from "react-jsonschema-form";
    import data from "../db";

    var uuidv1 = require("uuid/v1");
    var createHistory = require('history').createBrowserHistory;
    //var history = createHistory();
    var appls = data;
    var display_type = {list: "list", change: "change"};

    if(sessionStorage.getItem("data"))
        appls = JSON.parse(sessionStorage.getItem("data"));
    

    export default class Example extends Admin
    {
        
        constructor()
        {
        super();        
        this.name='Contact'; // name of the objects 
        this.name_plural='Contacts'; // name of the objects in plural
        this.list_display_links=['subject']; // which property of the object is clickable
        this.list_display=['subject','date','userName'];// a list of properties of the object to displayed on the list display page
        }
        
        get_queryset(page_number,list_per_page,queryset){
        // the actual array containing objects to be displayed
        return appls;
        
        }
        get_form(object=null)
            {
                     
            const schema = {
                title: this.name,
                type: "object",
                required: ["subject"],
                properties: {
                id: {type: "number", title: "id", default: Math.floor(1000*Math.random())+1 },
                subject: {type: "string", title: "Subject", default: ""},
                date : {type: "string", title: "Date", default: ""},
                userName : {type: "string", title: "User", default: ""},
                content : {type: "string", title: "Content", default: ""}
                }                 
              };           
            const uiSchema = {
              content: {"ui:widget": "textarea"}              
            };   
             if(!object)
                  {
                        return <Form schema={schema} uiSchema={uiSchema} onSubmit={this.form_submit.bind(this)} />
                  }
                  else
                  {
                         return <Form schema={schema} uiSchema={uiSchema} formData={object} onSubmit={this.form_submit.bind(this)} />
                  }
        }
        get_actions()
                {
                    return { "delete" : (selected_objects)=>{
                                       let total=appls.length;
                                           for(let object of selected_objects){
                                   appls.splice(appls.indexOf(object),1);              
                                           }
                           this.set_queryset(appls);
                           this.set_total(total-selected_objects.length);
                           sessionStorage.setItem("data", JSON.stringify(appls));   
                        }
                    }
         
        }
        form_submit(form)
            {
            let contact=form.formData;
         
            if(form.edit)
            {
                
                this.state.queryset.splice(this.state.queryset.indexOf(this.state.object),1,contact);
                this.response_change();
            }
            else
            {
                this.state.queryset.push(contact);
                this.response_add();
                sessionStorage.setItem("data", JSON.stringify(appls));
            }
        }
        handleBack(){
          history.back();
          console.log(history.state);
        }
        render()
            {
            if(!this.has_module_permission())
            {
                return <div> <h1> Permission Denied </h1></div>
            }
         
            if(this.state.display_type == display_type.list)
            {   
                history.pushState({edit:"editp"},"Change View","/editp"); 
                return this.render_list_page();
            }
            else
            {
                //Important: the next two lines are for URL navigation and handling the browser back button
                this._change_uuid=uuidv1();                
                history.pushState({}, "Change View", window.location.hash+"/change/"+this._change_uuid);
                
         
                return this.render_change_page();
            }
         
            
            }
        render_below_change_view(){
          return(
            <div>
              <button type="button" className="btn btn-secondary" onClick={this.handleBack} >Back</button>
            </div>
            );
        }
        
    }