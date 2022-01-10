import { useSelector } from "react-redux";

function App() {
  const { id } = useSelector((state) => state);
  return <div>{id}</div>;
}

export default App;
