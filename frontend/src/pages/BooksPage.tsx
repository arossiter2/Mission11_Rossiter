import { useState } from "react";
import BookList from "../components/BookList";
import CategoryFilter from "../components/CategoryFilter";
import WelcomeBand from "../components/WelcomeBand";
import CartSummary from "../components/CartSummary";

function BooksPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <div className="container mt-4">
      <CartSummary />

      <div className="mb-4">
        <WelcomeBand />
      </div>

      <div className="row">
        {/* Fixed-width filter column */}
        <div style={{ maxWidth: "250px" }}>
          <div className="card shadow-sm">
            <div className="card-header bg-light fw-bold text-center text-nowrap">
              Filter by&nbsp;Category
            </div>
            <div className="card-body p-3">
              <CategoryFilter
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
              />
            </div>
          </div>
        </div>

        {/* Main content takes the remaining width */}
        <div className="col">
          <div className="card shadow-sm">
            <div className="card-header bg-light fw-bold text-center">
              Book Catalog
            </div>
            <div className="card-body">
              <BookList selectedCategories={selectedCategories} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BooksPage;
