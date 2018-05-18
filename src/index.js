import component from "./component"
import "purecss";
//import "./logo.png";
//import "./bear.jpg";
import "./main.css";
import "react";
import "react-dom";
// import {bake} from "./shake"

//append component to body
console.log(component);
document.body.appendChild(component.element());
document.body.appendChild(component.bkgImg());
document.body.appendChild(component.bkgSvgImg());