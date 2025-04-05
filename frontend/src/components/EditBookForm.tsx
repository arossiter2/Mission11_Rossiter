import { useState } from "react";
import { Book } from "../types/Book";
import { updateBook } from "../api/BooksAPI";

interface EditBookFormProps {
  book: Book;
  onSuccess: () => void;
  onCancel: () => void;
}

const EditBookForm = ({ book, onSuccess, onCancel }: EditBookFormProps) => {
  const [formData, setFormData] = useState<Book>({ ...book });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateBook(formData.bookID, formData);
    onSuccess();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="card p-2 mb-3 shadow-sm"
      style={{
        maxWidth: "600px",
        fontSize: "0.85rem",
        lineHeight: "1.2rem",
      }}
    >
      <h6 className="mb-2">Edit Book</h6>

      <div className="row g-2">
        {/* First column */}
        <div className="col-6">
          <div className="mb-1">
            <label className="form-label form-label-sm">Title</label>
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

        {/* Second column */}
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

      {/* Action buttons */}
      <div className="d-flex justify-content-end gap-2 mt-2">
        <button type="submit" className="btn btn-sm btn-primary">
          Save
        </button>
        <button type="button" onClick={onCancel} className="btn btn-sm btn-secondary">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditBookForm;
