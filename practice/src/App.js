import NavBar from "./NavBar";

export default function App() {
  return (
    <div className="App">
      <NavBar/>
      <h1>hello</h1>
      <p>The Time now is {new Date().toLocaleTimeString()}</p>
    </div>
  );
}

