import { fireEvent, render, screen, } from "@testing-library/react";
import Todo from "../Todo";
import userEvent from "@testing-library/user-event";



describe("todos", () => {
    it("shows error message when user enters nothing", () => {
        render(<Todo />);
        const textField = screen.getByTestId("input-field");
        // fireEvent.change(textField, { target: { value: "" } });
        expect(textField).toHaveValue("");
        const addButton = screen.getByTestId("add-button");
        fireEvent.click(addButton);
        const errorTypo = screen.getByTestId("error-message");
        expect(errorTypo).toBeInTheDocument();
    });

    it("add-todo", async () => {
        render(<Todo />);
        const textField = screen.getByTestId("input-field");
        fireEvent.change(textField, { target: { value: "desired" } });
        expect(textField).toHaveValue("desired");
        const addButton = screen.getByTestId("add-button");
        fireEvent.click(addButton);
        const todoList = screen.queryAllByTestId("each-todo-item");
        expect(todoList.length).toBe(1);
    });

    it("shows error message when user enters nothing during update", async () => {
        render(<Todo />);
        const textField = screen.getByTestId("input-field");
        fireEvent.change(textField, { target: { value: "desired" } });
        expect(textField).toHaveValue("desired");
        const addButton = screen.getByTestId("add-button");
        fireEvent.click(addButton);
        const editBtn = screen.getByTestId("edit-button");
        fireEvent.click(editBtn);
        const textField2 = screen.getByTestId("input-field");
        fireEvent.change(textField2, { target: { value: "" } });
        expect(textField).toHaveValue("");
        const updateButton = screen.getByTestId("update-button");
        fireEvent.click(updateButton);
        const errorTypo = screen.getByTestId("error-message");
        expect(errorTypo).toBeInTheDocument();
    });

    it("update-todo", async () => {
        render(<Todo />);
        const textField = await screen.findByPlaceholderText("What needs to be done?");
        userEvent.type(textField, "desired");
        const addButton = screen.getByTestId("add-button");
        fireEvent.click(addButton);
        const editBtn = screen.getByTestId("edit-button");
        fireEvent.click(editBtn);
        const textField2 = await screen.findByPlaceholderText("What needs to be done?");
        userEvent.type(textField2, "desired");
        const updateButton = screen.getByTestId("update-button");
        fireEvent.click(updateButton);
        const todoList = screen.queryAllByTestId("each-todo-item")[0];
        expect(todoList).toHaveTextContent("desired");
    });

    it("delete-todo", async () => {
        render(<Todo />);
        const textField = await screen.findByPlaceholderText("What needs to be done?");
        userEvent.type(textField, "desired");
        const addButton = screen.getByTestId("add-button");
        fireEvent.click(addButton);
        const deleteBtn = screen.getByTestId("delete-button");
        fireEvent.click(deleteBtn);
    });


    it("update-todo2", async () => {
        render(<Todo />);
        const textField = await screen.findByPlaceholderText("What needs to be done?");
        userEvent.type(textField, `desired1`);
        const addButton = screen.getByTestId("add-button");
        fireEvent.click(addButton);

        const textField2 = await screen.findByPlaceholderText("What needs to be done?");
        userEvent.type(textField2, `desired1`);
        const addButton2 = screen.getByTestId("add-button");
        fireEvent.click(addButton2);

        const editButtons = screen.getAllByTestId("edit-button");
        fireEvent.click(editButtons[0]);

        const textFieldEdit = await screen.findByPlaceholderText("What needs to be done?");
        userEvent.type(textFieldEdit, "updated");
        const updateButton = screen.getByTestId("update-button");
        fireEvent.click(updateButton);

        const updatedTodo = screen.queryAllByTestId("each-todo-item")[0];
        expect(updatedTodo).toHaveTextContent("updated");
    });
});