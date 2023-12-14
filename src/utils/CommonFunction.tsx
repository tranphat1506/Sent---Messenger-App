function throttleFunction(func: () => void, delay: number) {
    let lastTime = 0;
    return function () {
        const now = new Date().getTime();
        if (now - lastTime >= delay) {
            func();
            lastTime = now;
        }
    };
}
export { throttleFunction };
