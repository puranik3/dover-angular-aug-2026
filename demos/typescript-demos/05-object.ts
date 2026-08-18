// type alias
type Person = {
    name: string,
    readonly age : number,
    children?: string[]
};

let john : Person = {
    name: 'John',
    age: 32
};

john.children = [ 'Jack', 'Jill' ];

// ++john.age; // age is read only