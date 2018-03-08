export default () => {
    return (new Promise((resolve, reject) => {
        const newText = "Hello from lazy";
        const element = document.querySelector('.pure-button')
        setTimeout(() => {
            element.innerHTML = newText
            resolve()
        }, 1000)

        setTimeout(() => {
            element.innerHTML = newText
            reject()
        }, 2000)
    }))
}