new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log(1);
        resolve();
    }, 1000);
}).then(() => {
    console.log(2);
});