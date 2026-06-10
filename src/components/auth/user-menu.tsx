"use client";

import { LogOut } from "lucide-react";
import { signOut } from "@/app/(auth)/actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type UserMenuProps = {
	user: { name: string; email: string; image?: string | null | undefined };
};

export function UserMenu({ user }: UserMenuProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="size-9 rounded-full p-0">
					<Avatar className="size-9">
						<AvatarImage src={user.image ?? undefined} alt={user.name} />
						<AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuLabel>
					<p className="font-medium">{user.name}</p>
					<p className="text-xs font-normal text-muted-foreground">{user.email}</p>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem onSelect={() => signOut()}>
					<LogOut />
					Sign out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
