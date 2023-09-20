// 🍣 Задание 4

interface Person1 {
  name: string;
  age: number;
  pet: string;
}

const displayInfo1 = (obj: Person1) => {
    const { name, age, pet } = obj;
    console.log(`Name: ${name}, \nAge: ${age}, \nPet: ${pet}`)
};

displayInfo1({name:'Yaroslava', age: 28 , pet: 'cat'})