"use server";

import { APIError } from "better-auth/api";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { signInSchema, signUpSchema } from "@/lib/validations";

export type AuthFormState = { error: string | null };

export async function signInWithEmail(
	_prev: AuthFormState,
	formData: FormData,
): Promise<AuthFormState> {
	const parsed = signInSchema.safeParse(Object.fromEntries(formData));
	if (!parsed.success) {
		return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
	}

	try {
		await auth.api.signInEmail({ body: parsed.data });
	} catch (error) {
		if (error instanceof APIError) {
			return { error: error.message };
		}
		throw error;
	}

	redirect("/");
}

export async function signUpWithEmail(
	_prev: AuthFormState,
	formData: FormData,
): Promise<AuthFormState> {
	const parsed = signUpSchema.safeParse(Object.fromEntries(formData));
	if (!parsed.success) {
		return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
	}

	try {
		await auth.api.signUpEmail({ body: parsed.data });
	} catch (error) {
		if (error instanceof APIError) {
			return { error: error.message };
		}
		throw error;
	}

	redirect("/");
}

export async function signOut() {
	await auth.api.signOut({ headers: await headers() });
	redirect("/sign-in");
}
