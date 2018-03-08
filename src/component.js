const compObj = {
    element: (text = "Hello world") => {
        const element = document.createElement("button")
        element.className = "pure-button"
        element.innerHTML = text

        element.onclick = () => {
            console.log(require("./lazy").default())
            require("./lazy").default()
                .then(lazy => {
                    console.log("promise suceeded: ", lazy)
              }).catch((err) => console.error(err));
          };
        
        return element;
    },
    bkgImg: (text = "this is a test") => {
        const element = document.createElement("div")
        element.className = "bear-img"
        element.innerHTML = text

        return element;
    },
    bkgSvgImg: (text = "this is an SVG") => {
        const element = document.createElement("div")
        element.className = "svg-img" 
        element.innerHTML = text

        return element
    }

}

export default compObj;