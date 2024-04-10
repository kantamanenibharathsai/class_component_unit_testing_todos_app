import React, { Component } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import todoStyles from "./Todo.Styles";
import TodoItem from "../../components/todo_item/TodoItem";
import EditIcon from '@mui/icons-material/Edit';
import EditOffIcon from '@mui/icons-material/EditOff';

interface TodoObject {
    todoId: number;
    taskName: string;
    isTaskCompleted: boolean;
}

interface IState {
    enteredTaskName: string;
    todosList: TodoObject[];
    errorMsg: string;
    editedArray: [boolean, null | number];
}


class Todo extends Component<{}, IState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            enteredTaskName: "",
            todosList: [],
            errorMsg: "",
            editedArray: [false, null],
        };
    }


    errorHandlingFunction = (errorMessage: string) => {
        this.setState({ errorMsg: `*${errorMessage}` });
    };

    addTodoHandler = () => {
        const { enteredTaskName, todosList, } = this.state;

        const addTodoToTheTodoList = () => {
            const newTodoObj: TodoObject = {
                todoId: todosList.length + 1,
                taskName: enteredTaskName,
                isTaskCompleted: false,
            };
            this.setState((prevState) => ({
                todosList: [...prevState.todosList, newTodoObj],
                errorMsg: "",
                enteredTaskName: "",
            }));
        };

        if (enteredTaskName.trim().length === 0) {
            this.errorHandlingFunction("*Please Enter Valid Task Name");
        }
        else {
            addTodoToTheTodoList();
        }
    };

    deleteTodoHandler = (todoId: number) => {
        const { todosList } = this.state;
        const updatedTodoListWithDeletedTodoItem = todosList.filter(
            (eachTodo: TodoObject) => eachTodo.todoId !== todoId
        );
        this.setState({ todosList: updatedTodoListWithDeletedTodoItem });
    };

    saveEditedTodoEventHandler = (todoId: number, editedTodoTaskName: string) => {
        this.setState({
            enteredTaskName: editedTodoTaskName,
            editedArray: [true, todoId],
            errorMsg: "",
        });
    };

    updateEditedTodoHandler = () => {
        const { enteredTaskName, editedArray, todosList } = this.state;
        if (enteredTaskName === "") {
            this.errorHandlingFunction("*Please Enter Valid Task Name");
        } else {
            const updatedTodoList = todosList.map((eachTodo) => {
                if (eachTodo.todoId === editedArray[1]) {
                    return {
                        ...eachTodo,
                        taskName: enteredTaskName,
                    };
                }
                return eachTodo;

            });
            this.setState({
                editedArray: [false, null],
                enteredTaskName: "",
                todosList: updatedTodoList,
                errorMsg: "",
            });
        }
    };

    userEnteredInputEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ enteredTaskName: event.target.value })
    }

    render() {
        const { enteredTaskName, errorMsg, todosList, editedArray } = this.state;
        return (
            <Box sx={todoStyles.todosMainContainer}>
                <Box sx={todoStyles.todosChildContainer}>
                    <Typography component="h1" sx={todoStyles.todosHeading}>
                        Todos Application
                    </Typography>
                    <Box sx={todoStyles.createTaskContainer}>
                        <Typography component="h2" sx={todoStyles.createTaskHeading}>
                            Create
                            <Box component="span" sx={todoStyles.createTaskHeadingSubpart}>
                                Task
                            </Box>
                        </Typography>
                        <TextField
                            type="text"
                            placeholder="What needs to be done?"
                            sx={todoStyles.todoUserInput}
                            onChange={this.userEnteredInputEventHandler}
                            value={enteredTaskName}
                            inputProps={{ 'data-testid': "input-field" }}
                        />
                        {errorMsg && (
                            <Typography component="p" sx={todoStyles.errorMsg} data-testid="error-message">
                                {errorMsg}
                            </Typography>
                        )}
                        {!editedArray[0] ? (
                            <Button
                                onClick={this.addTodoHandler}
                                sx={todoStyles.todoButton}
                                type="button"
                                disableFocusRipple
                                disableRipple
                                disableTouchRipple
                                disableElevation
                                data-testid="add-button"
                            >
                                Add
                            </Button>
                        ) : (
                            <Button
                                disableFocusRipple
                                disableRipple
                                disableTouchRipple
                                disableElevation
                                onClick={this.updateEditedTodoHandler}
                                data-testid="update-button"
                                sx={{
                                    ...todoStyles.todoButton,
                                    ...todoStyles.updateBtn
                                }}
                            >
                                Update
                            </Button>
                        )}
                    </Box>
                    <Box sx={todoStyles.createTaskContainer}>
                        <Typography component="h2" sx={todoStyles.createTaskHeading}>
                            My
                            <Box component="span" sx={todoStyles.createTaskHeadingSubpart}>
                                Tasks
                            </Box>
                        </Typography>
                    </Box>
                    <Box component="ul" sx={todoStyles.unorderedList} data-testid="unorderd-list">
                        {todosList.map((eachTodo: TodoObject) => (
                            <TodoItem
                                key={eachTodo.todoId}
                                eachTodo={eachTodo}
                                deleteTodoHandler={this.deleteTodoHandler}
                                saveEditedTodoEventHandler={this.saveEditedTodoEventHandler}
                            />
                        ))}
                    </Box>
                </Box>
            </Box>
        );
    }
}

export default Todo;
