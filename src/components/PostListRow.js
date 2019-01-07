import React from 'react';
import { Link } from 'react-router-dom';

export const PostsListRow = (props) => {
  return (
    <tr key={props.post.id}>
      <td>{props.post.id}</td>
      <td>{props.post.subject}</td>
      <td>{props.post.date}</td>
      <td>{props.post.userName}</td>
      <td>
        <div className="btn-toolbar pull-right">
          <Link to={`/post/${props.post.id}`} className="btn btn-primary">View</Link>          
        </div>
      </td>
    </tr>
  )
};