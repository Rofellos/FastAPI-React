import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Flex,
    Input,
    InputGroup,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
    Text,
    useDisclosure
} from "@chakra-ui/react";

// Here we create the react context, which provides a way to pass data through
// the component tree without having to pass props down manually at every level
const TodosContext = React.createContext({
    todos: [], fetchTodos: () => {}
  })

//Here we define the function Todos
export default function Todos() {
  //define todos as an empty state variable array
  const todos = useState([]);
  //define a state method called setTodos so we can update the state variable
  const setTodos = useState([]);
  //define a function to retrieve todos from the backend asynchronously 
  //and update the todo state variable at the end of the function
  const fetchTodos = async() => {
    //here we get a response from our /todo endpoint
    const response = await fetch("http://localhost:8000/todo")
    // convert the response to json and save it under todos const
    const todos = await response.json()
    //then we set the todos using the setTodos state method
    setTodos(todos.data)
  }
  useEffect(()=>{
    fetchTodos()
  },[])
  return(
    <TodosContext.Provider value={{todos, fetchTodos}}>
      <Stack spacing={5}>
        {todos.map((todo) => (
          <b>{todo.item}</b>
        ))}
      </Stack>
    </TodosContext.Provider>
  )
}
