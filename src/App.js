import React from "react";
import NavBar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./views/home";
import Blog from "./views/blog";
import NewBlogPost from "./views/new";
import { BrowserRouter, HashRouter, Route } from "react-router-dom";
const Router =
  process.env.NODE_ENV === "production" ? HashRouter : BrowserRouter;
function App() {
  return (
    <Router basename="/">
      <NavBar />
      <Route path="/" exact component={Home} />
      <Route path="/blog/:id" exact component={Blog} />
      <Route path="/new" exact component={NewBlogPost} />
      <Footer />
    </Router>
  );
}

export default App;
