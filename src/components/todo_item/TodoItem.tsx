import React, { Component } from "react";
import { Box } from "@mui/material";
import todoItemStyles from "./TodoItem.Styles";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from "@mui/icons-material/Delete";

interface TodoObject {
    todoId: number;
    taskName: string;
    isTaskCompleted: boolean;
}

interface IProps {
    eachTodo: TodoObject;
    deleteTodoHandler: (id: number) => void;
    saveEditedTodoEventHandler: (
        todoId: number,
        editedTodoTaskName: string
    ) => void;
}

class TodoItem extends Component<IProps> {
    render() {
        const { eachTodo, deleteTodoHandler, saveEditedTodoEventHandler } = this.props;
        return (
            <Box sx={todoItemStyles.todoItemContainer} data-testid="each-todo-item">
                <Box sx={todoItemStyles.labelContainer}>
                    <Box
                        component="label"
                        sx={{
                            ...todoItemStyles.checkboxLabel,
                        }}
                        htmlFor={`checkboxId${eachTodo.todoId}`}
                    >
                        {eachTodo.taskName}
                    </Box>
                    <Box sx={todoItemStyles.deleteIconContainer}>
                        <ModeEditIcon
                            data-testid="edit-button"
                            sx={todoItemStyles.icon}
                            onClick={() =>
                                saveEditedTodoEventHandler(eachTodo.todoId, eachTodo.taskName)
                            }
                        />
                        <DeleteIcon
                            sx={todoItemStyles.icon}
                            data-testid="delete-button"
                            onClick={() => deleteTodoHandler(eachTodo.todoId)}
                        />
                    </Box>
                </Box>
            </Box>
        );
    }
}

export default TodoItem;
