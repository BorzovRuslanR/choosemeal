export interface Ingredient {
    name: string;
    quantity: string;
  }
  
  export interface Recipe {
    category: string;
    cuisine: string;
    type: string;
    title: string;
    author: string;
    image: string;
    ingredients: Ingredient[];
    servings: string;
    cookingTime: string;
    recipe: string[];
  }
  
  export interface Database {
    recipes: Recipe[];
  }
  
  export default Database;