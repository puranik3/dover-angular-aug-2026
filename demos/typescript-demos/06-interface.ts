// Used to define the public facing API for a class
// Interface cal also act as a data type for an object

/*export */interface IPerson {
    readonly name: string,
    age: number,
    children?: string[]
}

let john : IPerson = {
    name: 'John Doe',
    age: 32
};

john.children = [ 'Jack', 'Jill' ];

// If you do not specify the access modifier, it is public in TS
class Person implements IPerson {
    // data members MUST be initialized either directly or in constructor
    readonly name: string;
    age: number;
    private aadhaarNumber : string;

    children?: string[] = []; // directly initialized

    // ! -> tell TS that you will initialize before you use it
    company!: string;

    constructor( name : string, age : number, aadhaarNumber : string ) {
        this.name = name;
        this.age = age;
        this.aadhaarNumber = aadhaarNumber;
    }
}

// Explore: How to use inheritance in TS
// Explore: Interface inheriting from another interface

const john2 = new Person( 'John Doe', 32, '1234-5678-1234' );

export {
    IPerson
}