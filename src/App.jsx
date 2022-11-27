import Nav from "./component/nav/Nav";
import "./App.css";
import Input from "./component/inputs and button/Input";
import Post from "./component/post/Post";
import Danger from "./component/Alert/Danger";
import Success from "./component/Alert/Success";
import Warning from "./component/Alert/Warning";

export const App = () => {
  return (
    <>
     
      <header>
        <Nav />
      </header>
      <main>
        <section className="top">
          <Input />
        </section>

        <section class="main-content">
          <ul class="list">
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            
          </ul>
        </section>
      </main>
    </>
  );
};

export default App;
