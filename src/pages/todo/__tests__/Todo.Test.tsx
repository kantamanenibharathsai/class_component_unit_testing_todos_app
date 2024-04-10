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

        // Add a large number of todo items
        const numberOfItems = 100; // Choose a sufficiently large number
        for (let i = 1; i <= numberOfItems; i++) {
            const textField = await screen.findByPlaceholderText("What needs to be done?");
            userEvent.type(textField, `desired${i}`);
            const addButton = screen.getByTestId("add-button");
            fireEvent.click(addButton);
        }

        // Randomly select an item to update
        const randomIndex = Math.floor(Math.random() * numberOfItems);
        const editButtons = screen.getAllByTestId("edit-button");
        fireEvent.click(editButtons[randomIndex]);

        // Update the selected item
        const textFieldEdit = await screen.findByPlaceholderText("What needs to be done?");
        userEvent.clear(textFieldEdit);
        userEvent.type(textFieldEdit, "updated");
        const updateButton = screen.getByTestId("update-button");
        fireEvent.click(updateButton);

        // Check if the selected todo item is updated
        const updatedTodo = screen.queryAllByTestId("each-todo-item")[randomIndex];
        expect(updatedTodo).toHaveTextContent("updated");

        //  Check if the rest of the todo items remain unchanged
        for (let i = 0; i < numberOfItems; i++) {
            if (i !== randomIndex) {
                const todoItem = screen.queryAllByTestId("each-todo-item")[i];
                expect(todoItem).toHaveTextContent(`desired${i + 1}`);
            }
        }
    });
});