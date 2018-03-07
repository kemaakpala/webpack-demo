import component from "./component"
import "purecss";
//import "./logo.png";
//import "./bear.jpg";
import "./main.css";

//append component to body
console.log(component);
document.body.appendChild(component.element());
document.body.appendChild(component.bkgImg());
document.body.appendChild(component.bkgSvgImg());