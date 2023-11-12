export const isWithinRange = (initialValue: number, currentValue: number) => {
    const percentValue = initialValue / 100 * 10
    if(currentValue >= initialValue - percentValue && currentValue <= initialValue+percentValue) {
        return false
    }
    return true
}

export const inputValidations = (value:string) => {
    const minValue = 0;
    const maxValue = 100000;

    return Math.min(maxValue, Math.max(minValue, parseFloat(value)))
}
