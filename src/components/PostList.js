import React from 'react';
import { PostsListRow } from './PostListRow';

const PostsList = (props) => {
  return (
    <table className="table table-hover">
      <thead>
      <tr>
        <th>Id</th>
        <th>Subject</th>
        <th>Date</th>
        <th>UserName</th>
      </tr>
      </thead>
      <tbody>
      {props.posts.map(post => <PostsListRow key={post.id} post={post} />)}
      </tbody>
    </table>
  )
};
export default PostsList;