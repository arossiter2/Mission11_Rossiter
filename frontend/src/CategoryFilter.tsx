import { useEffect, useState } from "react";
import "./CategoryFilter.css";

type CategoryFilterProps = {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
};
function CategoryFilter({
  selectedCategories,
  setSelectedCategories,
}: CategoryFilterProps) {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://localhost:5000/api/Book/GetBookTypes"
        );
        const data = await response.json();
        console.log("Fetched categories: ", data);

        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };
    fetchCategories();
  }, []);

  function handleCheckboxChange({ target }: { target: HTMLInputElement }) {
    const updatedCategories = selectedCategories.includes(target.value)
      ? selectedCategories.filter((x) => x !== target.value)
      : [...selectedCategories, target.value];

    setSelectedCategories(updatedCategories);
  }

  return (
    <>
      <div className="categoryFilter">
        <h5>Categories:</h5>
        <div className="categoryList">
          {categories.map((c) => (
            <div key={c} className="categoryItem">
              <input
                type="checkbox"
                id={c}
                value={c}
                className="category-checkbox"
                onChange={handleCheckboxChange}
              />
              <label htmlFor={c}>{c}</label>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default CategoryFilter;
