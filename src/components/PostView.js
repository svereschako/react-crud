import React from 'react';
import data from "../db";

var posts = data;

function getPost(id){
		id = Number(id);
		for(var i=0;i<posts.length;i++){
			if(id == posts[i].id)
				return posts[i].content;
		}
}
	
export default function PostView(props) {
	if(sessionStorage.getItem("data"))
	posts = JSON.parse(sessionStorage.getItem("data"));
	var post = getPost(props.match.params.postId);

	function handleBack(){
	  history.back();	  
	}

	return (
		<div>
			<div>{post}</div>
			<button type="button" className="btn btn-secondary" onClick={handleBack} >Back</button>
		</div>
	);

}