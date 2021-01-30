import { doCalculations, sum } from '../progresscontrol/utilities/calculations';

test('360 degress with 100%', () => {
    const percentage = 100;
    const expectedDegrees = 360;
    var expectedObject = {
        calculationLeft: 180, calculationRight: 180
    }
    expect(sum(expectedObject.calculationLeft, expectedObject.calculationRight)).toBe(expectedDegrees);
    expect(doCalculations(percentage)).toStrictEqual(expectedObject);
});

test('90 degress with 25%', () => {
    const percentage = 25;
    const expectedDegrees = 90;

    var expectedObject = {
        calculationLeft: 90, calculationRight: 0
    }
    expect(sum(expectedObject.calculationLeft, expectedObject.calculationRight)).toBe(expectedDegrees);
    expect(doCalculations(percentage)).toStrictEqual(expectedObject);
});

test('180 degress with 50%', () => {
    const percentage = 50;
    const expectedDegrees = 180;

    var expectedObject = {
        calculationLeft: 180, calculationRight: 0
    }
    expect(sum(expectedObject.calculationLeft, expectedObject.calculationRight)).toBe(expectedDegrees);
    expect(doCalculations(percentage)).toStrictEqual(expectedObject);
});

test('270 degress with 75%', () => {
    const percentage = 75;
    const expectedDegrees = 270;

    var expectedObject = {
        calculationLeft: 180, calculationRight: 90
    }
    expect(sum(expectedObject.calculationLeft, expectedObject.calculationRight)).toBe(expectedDegrees);
    expect(doCalculations(percentage)).toStrictEqual(expectedObject);
});

