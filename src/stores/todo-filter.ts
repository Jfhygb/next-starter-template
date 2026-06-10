import { create } from "zustand";

export type TodoFilter = "all" | "active" | "completed";

type TodoFilterState = {
	filter: TodoFilter;
	setFilter: (filter: TodoFilter) => void;
};

export const useTodoFilter = create<TodoFilterState>((set) => ({
	filter: "all",
	setFilter: (filter) => set({ filter }),
}));
