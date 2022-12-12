import React from "react";
import moment from "moment/moment";
import "./Post.css"
const Post = ({text,ipAdders,time,}) => {

  return (
    <li>
            <div className="info">
              <div className="equal">
                <div className="ip">192.168.20.0</div>
              </div>
              <div className="equal">
                <div className="time">{moment(time).fromNow()}</div>
              </div>
              <div className="equal">
                <div className="delte-button">
                  <button>Delete</button>
                </div>
              </div>
            </div>
            <div className="text">
              {text}
            </div>
          </li>
  );
}
export default Post;
