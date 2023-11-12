import { isWithinRange } from "../helpers/helpers";

describe('isWithinRange function', () => {
    it('should return false if currentValue is within the range', () => {
        const initialValue = 10;
        const currentValue = 10;
        expect(isWithinRange(initialValue, currentValue)).toBe(false);
    });

    it('should return false if currentValue is equal to the upper limit of the range', () => {
        const initialValue = 100;
        const currentValue = 110;
        expect(isWithinRange(initialValue, currentValue)).toBe(false);
    });

    it('should return false if currentValue is equal to the lower limit of the range', () => {
        const initialValue = 100;
        const currentValue = 90;
        expect(isWithinRange(initialValue, currentValue)).toBe(false);
    });

    it('should return true if currentValue is below the lower limit of the range', () => {
        const initialValue = 100;
        const currentValue = 80;
        expect(isWithinRange(initialValue, currentValue)).toBe(true);
    });

    it('should return true if currentValue is above the upper limit of the range', () => {
        const initialValue = 100;
        const currentValue = 120;
        expect(isWithinRange(initialValue, currentValue)).toBe(true);
    });

    it('should handle decimal values correctly', () => {
        const initialValue = 40.00670;
        const currentValue = 40.00670 + (40.00670 / 100 * 10) / 2;
        expect(isWithinRange(initialValue, currentValue)).toBe(false);
    });

    it('should handle large values correctly', () => {
        const initialValue = 1.56860;
        const currentValue = 1.56860 + (1.56860 / 100 * 10) * 1.5;
        expect(isWithinRange(initialValue, currentValue)).toBe(true);
    });
});
