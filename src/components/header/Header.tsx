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
import Logo from '../logo/Logo';
import ShadowText from '../shadowText/ShadowText';
import { Howl } from 'howler';





export default function Header() {
  const [selectedCuisine, setSelectedCuisine] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    fetch("../src/db/db.json", {
      headers: {
        accept: 'application/json',
        'User-agent': 'learning app',
      }
    })
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

  const buttonClickSound = new Howl({
    src: ['src/sounds/button5.mp3']
  });

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
      buttonClickSound.play();
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
    <div className="flex flex-col justify-around items-center h-screen bg-[#2d283e]">
      <div className='mb-14'>
        <Logo />
      </div>
      <div className="flex justify-center items-center gap-4 mb-20">
        <div>
          <Select
            defaultValue={selectedCuisine}
            onValueChange={setSelectedCuisine}
          >
            <SelectTrigger className='w-[175px] bg-[#d1d7e0]'>
              <SelectValue placeholder="Выбери кухню" />
            </SelectTrigger>
            <SelectContent className='bg-[#d1d7e0]'>
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
            <SelectTrigger className='w-[95px] bg-[#d1d7e0]'>
              <SelectValue placeholder="Выбери тип" />
            </SelectTrigger>
            <SelectContent className='bg-[#d1d7e0] w-[95px]'>
              <SelectItem value="Завтрак">Завтрак</SelectItem>
              <SelectItem value="Обед">Обед</SelectItem>
              <SelectItem value="Ужин">Ужин</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className='mb-10'>
        <Button
          variant="rounded"
          size="round"
          className={isLoading ? "animate-spin-pulse-scale" : ""}
          onClick={handleFilterRecipes}
        >
          <ShadowText />
        </Button>
      </div>
      {showModal && filteredRecipes.length > 0 ? (
        <Modal onClose={toggleModal}>
          {filteredRecipes.map((recipe: Recipe, index) => (
            <div className="m-10" key={index}>
              <h2 className='text-[#802bb1] text-lg font-bold mb-4'>{recipe.title}</h2>
              <img
                className="w-72 h-60 rounded-lg object-contain aspect-w-4 border border-[#564f6f] "
                src={recipe.image}
                alt={recipe.title}
              />
              <div className='mb-4 mt-4 bg-[#7c7494] rounded-md'>
                <p>Время готовки: {recipe.cookingTime}</p>
                <p>Количество порций: {recipe.servings}</p>
              </div>
              <h3>Ингредиенты:</h3>
              <ul>
                {recipe.ingredients.map((ingredient, ingredientIndex) => (
                  <li key={ingredientIndex}>
                    {ingredient.quantity} {ingredient.name}
                  </li>
              ))}
            </ul>
            <h3 className='mt-4'>Инструкции:</h3>
            <p>{recipe.recipe}</p>
          </div>
        ))}
      </Modal>
    ) : null}
  </div>
  );
}


