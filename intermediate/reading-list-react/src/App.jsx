import NewBookForm from "./components/NewBookForm";
import BookList from "./components/BookList";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="app">
      <Navbar />
      <BookList />
      <NewBookForm />
    </div>
  );
}

export default App;
