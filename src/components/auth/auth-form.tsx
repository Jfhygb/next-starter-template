"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { signInWithEmail, signUpWithEmail, type AuthFormState } from "@/app/(auth)/actions";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const copy = {
	"sign-in": {
		action: signInWithEmail,
		title: "Welcome back",
		description: "Sign in to your account to continue",
		submit: "Sign in",
		footer: "Don't have an account?",
		footerLink: { href: "/sign-up", label: "Sign up" },
	},
	"sign-up": {
		action: signUpWithEmail,
		title: "Create an account",
		description: "Get started with your free account",
		submit: "Create account",
		footer: "Already have an account?",
		footerLink: { href: "/sign-in", label: "Sign in" },
	},
} as const;

const initialState: AuthFormState = { error: null };

export function AuthForm({ mode }: { mode: keyof typeof copy }) {
	const { title, description, submit, footer, footerLink } = copy[mode];
	const action = mode === "sign-in" ? signInWithEmail : signUpWithEmail;
	const [state, formAction, pending] = useActionState(action, initialState);
	const [googlePending, setGooglePending] = useState(false);

	async function signInWithGoogle() {
		setGooglePending(true);
		await authClient.signIn.social({ provider: "google", callbackURL: "/" });
		setGooglePending(false);
	}

	return (
		<Card className="w-full max-w-sm">
			<CardHeader className="text-center">
				<CardTitle className="text-xl">{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent className="grid gap-4">
				<Button
					variant="outline"
					className="w-full"
					onClick={signInWithGoogle}
					disabled={googlePending}
				>
					<GoogleIcon />
					Continue with Google
				</Button>

				<div className="flex items-center gap-3">
					<Separator className="flex-1" />
					<span className="text-xs text-muted-foreground">OR</span>
					<Separator className="flex-1" />
				</div>

				<form action={formAction} className="grid gap-4">
					{mode === "sign-up" && (
						<div className="grid gap-2">
							<Label htmlFor="name">Name</Label>
							<Input id="name" name="name" placeholder="Jane Doe" required />
						</div>
					)}
					<div className="grid gap-2">
						<Label htmlFor="email">Email</Label>
						<Input id="email" name="email" type="email" placeholder="jane@example.com" required />
					</div>
					<div className="grid gap-2">
						<Label htmlFor="password">Password</Label>
						<Input
							id="password"
							name="password"
							type="password"
							autoComplete={mode === "sign-up" ? "new-password" : "current-password"}
							required
						/>
					</div>

					{state.error && (
						<p className="text-sm text-destructive" role="alert">
							{state.error}
						</p>
					)}

					<Button type="submit" className="w-full" disabled={pending}>
						{pending ? "Please wait…" : submit}
					</Button>
				</form>
			</CardContent>
			<CardFooter className="justify-center text-sm text-muted-foreground">
				{footer}&nbsp;
				<Link href={footerLink.href} className="text-foreground underline underline-offset-4">
					{footerLink.label}
				</Link>
			</CardFooter>
		</Card>
	);
}

function GoogleIcon() {
	return (
		<svg viewBox="0 0 24 24" aria-hidden="true" className="size-4">
			<path
				d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z"
				fill="#4285F4"
			/>
			<path
				d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"
				fill="#34A853"
			/>
			<path
				d="M5.84 14.1A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.43.34-2.1V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z"
				fill="#FBBC05"
			/>
			<path
				d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15A11 11 0 0 0 2.18 7.07L5.84 9.9C6.71 7.31 9.14 5.38 12 5.38Z"
				fill="#EA4335"
			/>
		</svg>
	);
}
