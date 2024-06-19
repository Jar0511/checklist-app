import { supabase } from "@/shared/api";
import type { LoginType, RegisterType } from "..";

export async function signInWithEmail(params: LoginType) {
	return await supabase.auth.signInWithPassword(params);
}

export async function signUpWithEmail(
	params: RegisterType
) {
	return await supabase.auth.signUp({
		email: params.email,
		password: params.password,
		options: {
			data: {
				display_name: params.display_name,
			},
		},
	});
}

export async function logOut() {
	return await supabase.auth.signOut();
}
