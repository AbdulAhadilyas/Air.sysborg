import React from "react";
import "./Post.css"
const Post = () => {
  return (
    <li>
            <div class="info">
              <div class="equal">
                <div class="ip">192.168.20.0</div>
              </div>
              <div class="equal">
                <div class="time">1 minutes ago</div>
              </div>
              <div class="equal">
                <div class="delte-button">
                  <button>Delete</button>
                </div>
              </div>
            </div>
            <div class="text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Blanditiis voluptatibus aliquid id adipisci! Hic, sunt? Earum
              dolorum praesentium velit itaque similique minima. Temporibus
              corporis ex excepturi nostrum aliquid numquam eaque. Lorem ipsum
              dolor sit amet consectetur adipisicing elit. Blanditiis
              voluptatibus aliquid id adipisci! Hic, sunt? Earum dolorum
              praesentium velit itaque similique minima. Temporibus corporis ex
              excepturi nostrum aliquid numquam eaque.
            </div>
          </li>
  );
}
export default Post;
