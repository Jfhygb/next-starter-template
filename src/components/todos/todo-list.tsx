"use client";

import { Trash2 } from "lucide-react";
import { useTransition } from "react";
import { deleteTodo, toggleTodo } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import type { Todo } from "@/db/schema";
import { useTodoFilter, type TodoFilter } from "@/stores/todo-filter";

const FILTERS: TodoFilter[] = ["all", "active", "completed"];

export function TodoList({ todos }: { todos: Todo[] }) {
	const { filter, setFilter } = useTodoFilter();

	const visible = todos.filter(
		(todo) => filter === "all" || (filter === "completed") === todo.completed,
	);
	const remaining = todos.filter((todo) => !todo.completed).length;

	return (
		<div className="grid gap-4">
			<div className="flex items-center justify-between">
				<p className="text-sm text-muted-foreground">
					{remaining} item{remaining === 1 ? "" : "s"} left
				</p>
				<div className="flex gap-1">
					{FILTERS.map((value) => (
						<Button
							key={value}
							variant={filter === value ? "secondary" : "ghost"}
							size="sm"
							className="capitalize"
							onClick={() => setFilter(value)}
						>
							{value}
						</Button>
					))}
				</div>
			</div>

			<ul className="grid gap-2">
				{visible.map((todo) => (
					<TodoItem key={todo.id} todo={todo} />
				))}
			</ul>

			{visible.length === 0 && (
				<p className="py-12 text-center text-sm text-muted-foreground">
					{todos.length === 0 ? "No todos yet. Add one above!" : `No ${filter} todos.`}
				</p>
			)}
		</div>
	);
}

function TodoItem({ todo }: { todo: Todo }) {
	const [, startTransition] = useTransition();

	return (
		<Card className="flex-row items-center gap-3 px-4 py-3">
			<Checkbox
				checked={todo.completed}
				onCheckedChange={(checked) => startTransition(() => toggleTodo(todo.id, checked === true))}
				aria-label={`Mark "${todo.text}" as ${todo.completed ? "active" : "completed"}`}
			/>
			<span
				className={`flex-1 text-sm ${todo.completed ? "text-muted-foreground line-through" : ""}`}
			>
				{todo.text}
			</span>
			<Button
				variant="ghost"
				size="icon"
				className="text-muted-foreground hover:text-destructive"
				onClick={() => startTransition(() => deleteTodo(todo.id))}
				aria-label={`Delete "${todo.text}"`}
			>
				<Trash2 />
			</Button>
		</Card>
	);
}
