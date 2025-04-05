import { useEffect, useState } from "react";
import { Book } from "../types/Book";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination";
import {fetchBooks} from "../api/BooksAPI"

type BookListProps = {
  selectedCategories: string[];
};

function BookList({ selectedCategories }: BookListProps) {
  // State variables for books, pagination, and sorting
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortByTitle, setSortByTitle] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate();

  // Fetch books from the ASP.NET backend when dependencies change
  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const data = await fetchBooks(pageSize, pageNum, selectedCategories);

        if (data) {
          setBooks(data.books);
          setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
          setError(null);
        } else {
          setError("No data returned from server.");
        }
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, [pageSize, pageNum, sortByTitle, selectedCategories]);

  if (loading) return <p>loading projects...</p>;
  if (error) return <p className="text-red-500">Error</p>;
  
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

      <Pagination
        currentPage={pageNum}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setPageNum}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setPageNum(1);
        }}
      />

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
