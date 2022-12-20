import React from "react";
import moment from "moment/moment";
import "./Post.css"
import { useState} from "react";
const Post = ({text,ipAdders,time,}) => {
  const [isUrl, setIsUrl] = useState("");


  const isValidUrl = urlString=> {
    var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
    '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
  return !!urlPattern.test(urlString);
}





  return (
    <li>
            <div className="info">
              <div className="equal">
                <div className="ip">{ipAdders}</div>
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
               {isValidUrl(text)?<a href={text} target="blank" style={{"color":"#00a1ff"}}>{text}</a>:text}
            </div>
          </li>
  );
}
export default Post;
