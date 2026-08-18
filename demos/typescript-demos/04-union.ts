// union type - number | string
const names : (number | string)[] = [];

names.push( 'Jane Doe' );
names.push( 'Mark Smith' );
names.push( 123 );
// names.push( true ); // error

// Explain the difference between these 3 data types
let x : (number | string)[];
let y : number | string[];
let z : number[] | string[];

let a = 1;
let b = [ 1, 2 ];
let c = 'Hello';
let d = [ 'Hello', 'Bye' ];
let e = [ 1, 'Hello' ];

x = b;
x = d;
x = e;
// x = a;
// x = c;

y = a;
// y = b;
// y = c;
y = d;
// y = e;

// z = a;
z = b;
// z = c;
z = d;
// z = e;
