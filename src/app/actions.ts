"use server";

import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { todos } from "@/db/schema";
import { getSession } from "@/lib/session";
import { todoSchema } from "@/lib/validations";

async function requireUser() {
	const session = await getSession();
	if (!session) redirect("/sign-in");
	return session.user;
}

export async function getTodos() {
	const user = await requireUser();
	return db.select().from(todos).where(eq(todos.userId, user.id)).orderBy(todos.createdAt).all();
}

export async function createTodo(formData: FormData) {
	const user = await requireUser();
	const parsed = todoSchema.safeParse({ text: formData.get("text") });
	if (!parsed.success) return;

	db.insert(todos).values({ text: parsed.data.text, userId: user.id }).run();
	revalidatePath("/");
}

export async function toggleTodo(id: number, completed: boolean) {
	const user = await requireUser();
	db.update(todos)
		.set({ completed })
		.where(and(eq(todos.id, id), eq(todos.userId, user.id)))
		.run();
	revalidatePath("/");
}

export async function deleteTodo(id: number) {
	const user = await requireUser();
	db.delete(todos)
		.where(and(eq(todos.id, id), eq(todos.userId, user.id)))
		.run();
	revalidatePath("/");
}
