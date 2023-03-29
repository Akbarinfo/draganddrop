import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  return (
    <>
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="main">
          <Main />
        </main>
      </div>
    </>
  );
}

export default App;
