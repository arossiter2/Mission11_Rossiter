import { useEffect, useState } from "react";
import "./CategoryFilter.css";

// Props definition: receives the currently selected categories
// and a function to update them from the parent component
type CategoryFilterProps = {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
};

// Main component for displaying category checkboxes and handling filtering logic
function CategoryFilter({
  selectedCategories,
  setSelectedCategories,
}: CategoryFilterProps) {
  const [categories, setCategories] = useState<string[]>([]); // State to hold the list of available categories from the API

  // Fetch category types from the backend API once when the component first mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://mission13rossiterbackend-fxhjaqc0eubqhtb3.eastus-01.azurewebsites.net/api/book/GetBookTypes"
        );
        const data = await response.json();
        console.log("Fetched categories: ", data);

        setCategories(data); // Save fetched categories in local state
      } catch (error) {
        console.error("Error fetching categories", error); // Log error if fetch fails
      }
    };
    fetchCategories();
  }, []);

  // Handle checkbox toggle logic
  function handleCheckboxChange({ target }: { target: HTMLInputElement }) {
    // If the category is already selected, remove it; otherwise, add it
    const updatedCategories = selectedCategories.includes(target.value)
      ? selectedCategories.filter((x) => x !== target.value)
      : [...selectedCategories, target.value];

    setSelectedCategories(updatedCategories); // Update selected categories in parent component
  }

  return (
    <>
      <div className="categoryFilter">
        <h5>Categories:</h5>
        <div className="categoryList">
          {/* Render each category as a checkbox */}
          {categories.map((c) => (
            <div key={c} className="form-check mb-2 categoryItem">
              <input
                type="checkbox"
                id={c}
                value={c}
                className="form-check-input category-checkbox"
                onChange={handleCheckboxChange}
                checked={selectedCategories.includes(c)} // Keeps the checkbox state in sync
              />
              <label className="form-check-label" htmlFor={c}>{c}</label>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default CategoryFilter;
