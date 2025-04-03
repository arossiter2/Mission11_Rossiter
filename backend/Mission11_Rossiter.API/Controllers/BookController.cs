using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mission11_Rossiter.API.Data;

namespace Mission11_Rossiter.API.Controllers
{
    // This sets up routing so API calls to "api/Book" are handled here
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        // Private field to access the database context
        private BookDbContext _bookContext;

        // Constructor receives the BookDbContext via dependency injection
        public BookController(BookDbContext temp)
        {
            _bookContext = temp;
        }

        // GET endpoint: api/Book/AllBooks
        [HttpGet("AllBooks")]
        public IActionResult GetBooks(int pageSize = 10, int pageNum = 1, string? sortBy = null, [FromQuery] List<string> bookTypes = null)
        {
            // Start by selecting all books from the database
            IQueryable<Book> query = _bookContext.Books;

            if (bookTypes != null && bookTypes.Any())
            {
                query = query.Where(b => bookTypes.Contains(b.Category));
            }

            // If the query string includes sortBy=title, sort books alphabetically by title
            if (!string.IsNullOrEmpty(sortBy) && sortBy.ToLower() == "title")
            {
                query = query.OrderBy(b => b.Title);
            }

            // Count the total number of books (for pagination info)
            var totalNumBooks = query.Count();

            // Apply pagination using Skip and Take
            var something = query
                .Skip((pageNum - 1) * pageSize)  // Skip books from previous pages
                .Take(pageSize)                  // Take only the number of books for the current page
                .ToList();                       // Execute the query and convert to a list

            // Create a response object with the current page of books and total count
            var response = new
            {
                Books = something,
                TotalNumBooks = totalNumBooks
            };

            // Return the response as a 200 OK with JSON data
            return Ok(response);
        }

        [HttpGet("GetBookTypes")]
        public IActionResult GetBookTypes()
        {
            var bookTypes = _bookContext.Books
                .Select(b => b.Category)
                .Distinct()
                .ToList();
            return Ok(bookTypes);
        }
    }
}
