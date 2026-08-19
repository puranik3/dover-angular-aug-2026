import { IPerson } from './06-interface';

class Person implements IPerson {
    children?: string[] = []; // directly initialized

    // ! -> tell TS that you will initialize before you use it
    company!: string;

    constructor( public name : string, public readonly age : number, private aadhaarNumber : string ) {
        // this.name = name;
        // this.age = age;
        // this.aadhaarNumber = aadhaarNumber;
    }
}

// Explore: How to use inheritance in TS
// Explore: Interface inheriting from another interface

const john2 = new Person( 'John Doe', 32, '1234-5678-1234' );