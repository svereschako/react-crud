import React from "react";
import data from "../db";
import PostsList from "./PostList";

var posts = data;

export default function PostIndex(props) {
	if(sessionStorage.getItem("data"))
		posts = JSON.parse(sessionStorage.getItem("data"));
	return (
		<div>
			<PostsList posts={posts} />
		</div>
	);
}