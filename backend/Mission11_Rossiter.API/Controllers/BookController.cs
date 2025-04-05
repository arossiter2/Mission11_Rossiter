using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mission11_Rossiter.API.Data;

namespace Mission11_Rossiter.API.Controllers
{
    // This sets up routing so API calls to "api/Book" are handled by this controller
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        // Field to hold the database context
        private BookDbContext _bookContext;

        // Constructor that receives the BookDbContext via dependency injection
        public BookController(BookDbContext temp)
        {
            _bookContext = temp;
        }

        // GET: api/Book/AllBooks
        // Returns a paginated list of books, with optional sorting and filtering by category
        [HttpGet("AllBooks")]
        public IActionResult GetBooks(int pageSize = 10, int pageNum = 1, string? sortBy = null, [FromQuery] List<string> bookTypes = null)
        {
            // Start with all books in the database
            IQueryable<Book> query = _bookContext.Books;

            // If book types (categories) are specified, filter the results
            if (bookTypes != null && bookTypes.Any())
            {
                query = query.Where(b => bookTypes.Contains(b.Category));
            }

            // Optional sorting by title
            if (!string.IsNullOrEmpty(sortBy) && sortBy.ToLower() == "title")
            {
                query = query.OrderBy(b => b.Title);
            }

            // Get the total number of matching books (before pagination)
            var totalNumBooks = query.Count();

            // Apply pagination using Skip and Take
            var pageOfBooks = query
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            // Return both the paginated books and total count
            var response = new
            {
                Books = pageOfBooks,
                TotalNumBooks = totalNumBooks
            };

            return Ok(response);
        }
      

        // GET: api/Book/GetBookTypes
        // Returns a distinct list of all book categories in the database
        [HttpGet("GetBookTypes")]
        public IActionResult GetBookTypes()
        {
            var bookTypes = _bookContext.Books
                .Select(b => b.Category)
                .Distinct()
                .ToList();

            return Ok(bookTypes);
        }

        // POST: api/Book/AddBook
        // Adds a new book to the database
        [HttpPost("AddBook")]
        public IActionResult AddProject([FromBody] Book newBook)
        {
            _bookContext.Books.Add(newBook);
            _bookContext.SaveChanges();
            return Ok(newBook);
        }

        // PUT: api/Book/updateBook/{bookID}
        // Updates an existing book’s details
        [HttpPut("updateBook/{bookID}")]
        public IActionResult UpdateBook(int bookID, [FromBody] Book updatedBook)
        {
            var existingBook = _bookContext.Books.Find(bookID);

            // Optionally check if the book exists
            if (existingBook == null)
            {
                return NotFound(new { message = "Book not found" });
            }

            // Update fields
            existingBook.Title = updatedBook.Title;
            existingBook.Author = updatedBook.Author;
            existingBook.Publisher = updatedBook.Publisher;
            existingBook.ISBN = updatedBook.ISBN;
            existingBook.Classification = updatedBook.Classification;
            existingBook.Category = updatedBook.Category;
            existingBook.PageCount = updatedBook.PageCount;
            existingBook.Price = updatedBook.Price;

            // Save changes
            _bookContext.Books.Update(existingBook);
            _bookContext.SaveChanges();

            return Ok(existingBook);
        }

        // DELETE: api/Book/DeleteBook/{bookID}
        // Deletes a book by its ID
        [HttpDelete("DeleteBook/{bookID}")]
        public IActionResult DeleteBook(int bookID)
        {
            var book = _bookContext.Books.Find(bookID);

            // Return 404 if not found
            if (book == null)
            {
                return NotFound(new { message = "Book not found" });
            }

            _bookContext.Books.Remove(book);
            _bookContext.SaveChanges();

            // No content response for successful deletion
            return NoContent();
        }
    }
}
