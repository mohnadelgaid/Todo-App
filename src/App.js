import "./App.css";
import TodoList from "./components/TodoList";
import { createTheme,ThemeProvider } from "@mui/material/styles";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import {TodosContext} from "./Contexts/TodosContext"





const initialTodos = [
  {
    id: uuidv4(),
    title: "قراءة كتاب",
    details: "تفاصيل المهمة الاولى",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "قراءة كتاب",
    details: "تفاصيل المهمة الاولى",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "قراءة كتاب",
    details: "تفاصيل المهمة الاولى",
    isCompleted: false,
  },
];

function App() {
  const [todos, setTodos] = useState(initialTodos);
  const theme = createTheme({
    typography: {
      fontFamily:[
        "Alexandria"
      ]
    },
    palette:{
      primary:{
        main:'#dd2c00'
      }
    }
  });
  return (
    <ThemeProvider theme={theme}>
      <div
      className="App"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:"#191b1f",
        height:"100vh",
        direction:"rtl"
      }}
    >
<TodosContext.Provider value={{todos,setTodos}}>
<TodoList/>
</TodosContext.Provider>
      
      
      
      
    </div>
    </ThemeProvider>
    
  );
}

export default App;
