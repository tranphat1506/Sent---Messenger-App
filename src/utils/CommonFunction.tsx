function throttleFunction(
    func: (params?: any) => void,
    delay: number,
    params?: any,
) {
    let lastTime = 0;
    return function () {
        const now = new Date().getTime();
        if (now - lastTime >= delay) {
            func(params);
            lastTime = now;
        }
    };
}
export { throttleFunction };
