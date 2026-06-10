import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";

export default async function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	const session = await getSession();
	if (session) redirect("/");

	return <main className="flex min-h-svh items-center justify-center p-4">{children}</main>;
}
