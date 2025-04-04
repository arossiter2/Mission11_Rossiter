import { useEffect, useState } from "react";
import { Book } from "../types/Book";
import { useNavigate } from "react-router-dom";

type BookListProps = {
  selectedCategories: string[];
};

function BookList({ selectedCategories }: BookListProps) {
  // State variables for books, pagination, and sorting
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortByTitle, setSortByTitle] = useState<boolean>(false);
  const navigate = useNavigate();

  // Fetch books from the ASP.NET backend when dependencies change
  useEffect(() => {
    const fetchBooks = async () => {
      const sortParam = sortByTitle ? "&sortBy=title" : "";
      const categoryParams = selectedCategories
        .map((cat) => `bookTypes=${encodeURIComponent(cat)}`)
        .join("&");

      const response = await fetch(
        `https://localhost:5000/api/Book/AllBooks?pageSize=${pageSize}&pageNum=${pageNum}${sortParam}${selectedCategories.length ? `&${categoryParams}` : ""}`
      );
      const data = await response.json();

      // Update state with book data and total item count
      setBooks(data.books);
      setTotalItems(data.totalNumBooks);

      // Calculate total pages based on updated total items and page size
      setTotalPages(Math.ceil(totalItems / pageSize));
    };
    fetchBooks();
  }, [pageSize, pageNum, totalItems, sortByTitle, selectedCategories]);

  return (
    <>
      <br />

      {/* Render each book in a styled card */}
      {books.map((b) => (
        <div
          id="projectCard"
          className="card"
          style={{ maxWidth: "600px", width: "100%", margin: "auto" }}
          key={b.bookID}
        >
          <h3
            className="cardTitle text-center"
            style={{ wordWrap: "break-word", whiteSpace: "normal" }}
          >
            {b.title}
          </h3>
          <div className="cardBody">
            <ul className="list-unstyled">
              <li>
                <strong>Author: </strong>
                {b.author}
              </li>
              <li>
                <strong>Publisher:</strong> {b.publisher}
              </li>
              <li>
                <strong>IBSN:</strong> {b.isbn}
              </li>
              <li>
                <strong>Classification:</strong> {b.classification}
              </li>
              <li>
                <strong>Category:</strong> {b.category}
              </li>
              <li>
                <strong>Page Count: </strong>
                {b.pageCount}
              </li>
              <li>
                <strong>Price: </strong>${b.price}
              </li>
            </ul>
            <button
              className="btn btn-success"
              onClick={() =>
                navigate(`/purchase/${b.title}/${b.bookID}/${b.price}`)
              }
            >
              Purchase
            </button>
          </div>
        </div>
      ))}

      {/* Pagination buttons */}
      <button disabled={pageNum === 1} onClick={() => setPageNum(pageNum - 1)}>
        Previous
      </button>
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index + 1}
          onClick={() => setPageNum(index + 1)}
          disabled={pageNum === index + 1}
        >
          {index + 1}
        </button>
      ))}
      <button
        disabled={pageNum === totalPages}
        onClick={() => setPageNum(pageNum + 1)}
      >
        Next
      </button>

      <br />

      {/* Page size selector */}
      <label>
        Number Results per page:
        <select
          value={pageSize}
          onChange={(p) => {
            setPageSize(Number(p.target.value));
            setPageNum(1);
          }}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </label>

      <br />

      {/* Toggle sort order by title */}
      <button
        onClick={() => {
          setSortByTitle((prev) => !prev);
          setPageNum(1); // reset to first page when sorting changes
        }}
      >
        {sortByTitle ? "Unsort" : "Sort by Title"}
      </button>
    </>
  );
}

export default BookList;
