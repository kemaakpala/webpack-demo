export default () => {
    return (
        new Promise( (resolve, reject) => {
            resolve("Hello from lazy")
        })
    )
}