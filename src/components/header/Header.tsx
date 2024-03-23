import { Recipe }  from '@/db/db.types';
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"

import { 
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue } from "../ui/select";
import Modal from '../modal/Modal';






export default function Header() {
  const [selectedCuisine, setSelectedCuisine] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    fetch("/src/db/db.json")
      .then((response) => response.json())
      .then((data) => {
        setAllRecipes(data.recipes);
      })
      .catch((error) => {
        console.error("Failed to fetch recipes:", error);
      });
  }, []);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleFilterRecipes = async () => {
    const filteredRecipes = allRecipes.filter((recipe: Recipe) => {
      if (selectedCuisine && selectedCuisine !== "" && recipe.cuisine !== selectedCuisine) {
        return false;
      }
      if (selectedCategory && selectedCategory !== "") {
        const selectedCategories = selectedCategory.split(",");
        if (!selectedCategories.includes(recipe.category)) {
          return false;
        }
      }
      return true;
    });

    if (filteredRecipes.length > 0) {
      setIsLoading(true);
      setShowModal(false);

      await new Promise((resolve) => setTimeout(resolve, 2000));

      const randomIndex = Math.floor(Math.random() * filteredRecipes.length);
      const randomRecipe = filteredRecipes[randomIndex];
      setFilteredRecipes([randomRecipe]);
      setIsLoading(false);
      setShowModal(true);
    } else {
      setFilteredRecipes([]);
    }
  };


  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex justify-center items-center m-10 gap-4">
        <div>
          <Select
            defaultValue={selectedCuisine}
            onValueChange={setSelectedCuisine}
          >
            <SelectTrigger>
              <SelectValue placeholder="Выбери кухню" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Американская кухня">Американская кухня</SelectItem>
              <SelectItem value="Русская кухня">Русская кухня</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Select
            value={selectedCategory}
            onValueChange={setSelectedCategory}
          >
            <SelectTrigger>
              <SelectValue placeholder="Выбери тип" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Завтрак">Завтрак</SelectItem>
              <SelectItem value="Обед">Обед</SelectItem>
              <SelectItem value="Ужин">Ужин</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button
        variant="rounded"
        size="round"
        className={isLoading ? "animate-spin" : ""}
        onClick={handleFilterRecipes}
      >
        <span className="text-3xl m-2">Click me</span>
      </Button>
      {showModal && filteredRecipes.length > 0 ? (
        <Modal onClose={toggleModal}>
          {filteredRecipes.map((recipe: Recipe, index) => (
            <div className="m-10" key={index}>
              <h2>{recipe.title}</h2>
              <img
                className="w-72 h-60 rounded-lg object-contain aspect-w-4"
                src={recipe.image}
                alt={recipe.title}
              />
              <p>Время готовки: {recipe.cookingTime}</p>
              <p>Количество порций: {recipe.servings}</p>
              <h3>Ингредиенты:</h3>
              <ul>
                {recipe.ingredients.map((ingredient, ingredientIndex) => (
                  <li key={ingredientIndex}>
                    {ingredient.quantity} {ingredient.name}
                  </li>
              ))}
            </ul>
            <h3>Инструкции:</h3>
            <p>{recipe.recipe}</p>
          </div>
        ))}
      </Modal>
    ) : null}
  </div>
  );
}


