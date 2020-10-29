import { deepCopy } from '../src/Utils/deepCopy';

test('deepCopy Number', () => {
    const startingNumber = 2;
    const copyNumber = deepCopy(startingNumber);
    expect(startingNumber).toEqual(copyNumber);
});

test('deepCopy String', () => {
    const startingString = 'test';
    const copyString = deepCopy(startingString);
    expect(startingString).toEqual(copyString);
});

test('deepCopy Object', () => {
    const startingObject = { a: 'a', b: 'b' };
    const copyObject = deepCopy(startingObject);
    expect(startingObject).toEqual(copyObject);
});

test('deepCopy Nested Object', () => {
    const startingObject = { a: 'a', b: 'b', c: { d: 'd', e: { f: 'f' } } };
    const copyObject = deepCopy(startingObject);
    expect(startingObject).toEqual(copyObject);
});
test('deepCopy Array', () => {
    const startingArray = [1, 'd', 5, 'f'];
    const copyArray = deepCopy(startingArray);
    expect(startingArray).toEqual(copyArray);
});

test('deepCopy Nested Array', () => {
    const startingArray = [1, 'd', 5, 'f', ['g', 4, ['f', 7]]];
    const copyArray = deepCopy(startingArray);
    expect(startingArray).toEqual(copyArray);
});

test('deepCopy Date', () => {
    const startingDate = new Date();
    const copyDate = deepCopy(startingDate);
    expect(startingDate).toEqual(copyDate);
});
test('deepCopy Date Array', () => {
    const startingDateArray = [new Date(), new Date()];
    const copyDateArray = deepCopy(startingDateArray);
    expect(startingDateArray).toEqual(copyDateArray);
});

test('deepCopy Date Array', () => {
    const startingDateArray = [new Date(), new Date()];
    const copyDateArray = deepCopy(startingDateArray);
    expect(startingDateArray).toEqual(copyDateArray);
});
