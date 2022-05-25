interface CheeseStorageFormat {
  [id: string]: Cheese;
}

interface CheeseUpdate extends Cheese {
  id: string;
}

interface Cheese {
  name: string;
  url: string;
  pricePerKilo: number;
  colour: string;
}

export { CheeseStorageFormat, CheeseUpdate, Cheese };
