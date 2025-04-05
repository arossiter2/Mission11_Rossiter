import { useState } from "react";
import { Book } from "../types/Book";
import { addBook } from "../api/BooksAPI";

interface NewBookFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const NewBookForm = ({ onSuccess, onCancel }: NewBookFormProps) => {
  const [formData, setFormData] = useState<Book>({
    bookID: 0,
    title: "",
    author: "",
    publisher: "",
    isbn: "",
    classification: "",
    category: "",
    pageCount: 0,
    price: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting book:", formData);
    await addBook(formData);
    onSuccess();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="card p-2 mb-3 shadow-sm"
      style={{ maxWidth: "600px", fontSize: "0.85rem", lineHeight: "1.2rem" }}
    >
      <h6 className="mb-2">Add a New Book</h6>

      <div className="row g-2">
        {/* Left column */}
        <div className="col-6">
          <div className="mb-1">
            <label className="form-label">Title</label>
            <input
              type="text"
              name="title"
              className="form-control form-control-sm"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div className="mb-1">
            <label className="form-label">Author</label>
            <input
              type="text"
              name="author"
              className="form-control form-control-sm"
              value={formData.author}
              onChange={handleChange}
            />
          </div>
          <div className="mb-1">
            <label className="form-label">Publisher</label>
            <input
              type="text"
              name="publisher"
              className="form-control form-control-sm"
              value={formData.publisher}
              onChange={handleChange}
            />
          </div>
          <div className="mb-1">
            <label className="form-label">ISBN</label>
            <input
              type="text"
              name="isbn"
              className="form-control form-control-sm"
              value={formData.isbn}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Right column */}
        <div className="col-6">
          <div className="mb-1">
            <label className="form-label">Classification</label>
            <input
              type="text"
              name="classification"
              className="form-control form-control-sm"
              value={formData.classification}
              onChange={handleChange}
            />
          </div>
          <div className="mb-1">
            <label className="form-label">Category</label>
            <input
              type="text"
              name="category"
              className="form-control form-control-sm"
              value={formData.category}
              onChange={handleChange}
            />
          </div>
          <div className="mb-1">
            <label className="form-label">Page Count</label>
            <input
              type="number"
              name="pageCount"
              className="form-control form-control-sm"
              value={formData.pageCount}
              onChange={handleChange}
            />
          </div>
          <div className="mb-1">
            <label className="form-label">Price</label>
            <input
              type="number"
              name="price"
              className="form-control form-control-sm"
              value={formData.price}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="d-flex justify-content-end gap-2 mt-2">
        <button type="submit" className="btn btn-sm btn-success">
          Add Book
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="btn btn-sm btn-secondary"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default NewBookForm;
