// zoo.js
let getBarkStyle = isHowler => isHowler ? 'woooooow!' : 'woof, woof!';

export function Dog (name, breed) {
  this.name = name;
  this.bark = getBarkStyle(breed === 'husky');
};

export function Wolf(name) {
  this.name = name;
  this.bark = getBarkStyle(true);
};