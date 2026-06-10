import { redirect } from "next/navigation";
import { createTodo, getTodos } from "./actions";
import { UserMenu } from "@/components/auth/user-menu";
import { TodoList } from "@/components/todos/todo-list";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getSession } from "@/lib/session";

export default async function Home() {
	const session = await getSession();
	if (!session) redirect("/sign-in");

	const allTodos = await getTodos();

	return (
		<main className="mx-auto max-w-2xl p-6 sm:p-8">
			<header className="mb-8 flex items-center justify-between">
				<h1 className="text-2xl font-semibold tracking-tight">Todos</h1>
				<UserMenu user={session.user} />
			</header>

			<form action={createTodo} className="mb-6 flex gap-2">
				<Input name="text" placeholder="What needs to be done?" maxLength={500} required />
				<Button type="submit">Add</Button>
			</form>

			<TodoList todos={allTodos} />
		</main>
	);
}
