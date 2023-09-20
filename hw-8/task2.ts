// // 🍕 Задание 2

// const differenceOptional = (a?: number, b?: number): number | string => {
//     if (a === undefined && b === undefined) {
//         return 'ERROR !!! Both parameters are undefined';
//         // throw new Error('Both parameters are undefined')
//     };
//     if (b === undefined) {
//         return a! * a!; 
//     };
//     return a! - b!;
// }

// console.log(`Result: ${differenceOptional(100, 5)}`);
// console.log(`Result: ${differenceOptional(10)}`);
// console.log(`Result: ${differenceOptional()}`);
