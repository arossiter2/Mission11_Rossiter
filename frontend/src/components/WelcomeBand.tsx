// This component displays a simple header banner with a title (e.g., "Books")
// You can customize this to show a subtitle, icon, or background style later
function WelcomeBand() {
    return (
      <>
        {/* Row with a custom class for styling the welcome banner */}
        <div className="row welcome-banner">
          <h1>Books</h1>
        </div>
      </>
    );
  }
  
  export default WelcomeBand;
  