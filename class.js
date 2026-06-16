
class Person{
    constructor(name, age){
        console.log(`Hello, I'm ${name} e tenho ${age}`)

        this.name = name
        this.age = age
    }
    talk(){
        console.log(`Hello, my name is ${this.name} and I'm ${this.age} years old.`)
    }
}

const newPerson = new Person("Caio", 35)
const newPerson1 = new Person("Renata", 30)
const newPerson2 = new Person("Adam", 3)

newPerson.talk()
newPerson1.talk()
newPerson2.talk()


