const compObj = {
    element: (text = "Hello world") => {
        const element = document.createElement("button")
        element.className = "pure-button"
        element.innerHTML = text

        element.onclick = () => {
            require("./lazy")
                .then(lazy => {
                element.textContent = lazy.default;
              })
              .catch(err => {
                console.error(err);
              });
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