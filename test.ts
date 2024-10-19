

function createFunction(){
  const adder = (a:number, b:number) => a + b;
  adder.fish = 'smelly';

  return adder;
}



const fn = createFunction();

console.log(
  fn(1,2),
  fn.fish
)