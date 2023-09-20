// 🍣 Задание 4

const displayInfo = ({ name, age, pet }: { name: string; age: number; pet: string }) => {
    console.log(`Name: ${name}, \nAge: ${age}, \nPet: ${pet}\n`)
}

displayInfo({name:'Slava', age: 23 , pet: 'dog'})