// src/components/profile/UpdateProfileForm.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Profile } from "@/lib/types";
import { updateProfile } from "@/lib/api";
import { useUser } from "@/contexts/UserProvider";
import { AvatarUploader } from "./AvatarUploader";
import {toast} from 'sonner'

const profileFormSchema = z.object({
    full_name: z.string().max(50, "Name is too long.").optional(),
    username: z.string().min(3, "Username must be at least 3 characters.").max(20).optional(),
    website: z.string().url("Please enter a valid URL.").optional().or(z.literal('')),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface UpdateProfileFormProps {
    profile: Profile;
}

export function UpdateProfileForm({ profile }: UpdateProfileFormProps) {
    const router = useRouter();
    const { session } = useUser();
    const [isLoading, setIsLoading] = useState(false);
    const [serverError, setServerError] = useState<string>('')
    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            full_name: profile.full_name || "",
            username: profile.username || "",
            website: profile.website || "",
        },
    });

    async function onSubmit(data: ProfileFormValues) {
        if (!session) {
            toast.error("Session expired. Please log in again.");
            return;
        }
        setIsLoading(true);
        try {
            await updateProfile(profile.id, data, session.access_token);
            toast.success("Profile updated successfully!");
            router.refresh(); // Refresh halaman untuk menampilkan data baru
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error.message);
                setServerError(error.message)
                toast.error("Failed to update profile.");
            } else {
                console.error("Unknown error:", error);
                toast.error("An unexpected error occurred.");
            }
        } finally {
            setIsLoading(false);
        }
    }
    const handleAvatarUpdate = async (newUrl: string) => {
        if (!session) return;
        setIsLoading(true);
        try {
            // Langsung panggil API untuk update avatar_url
            await updateProfile(profile.id, { avatar_url: newUrl }, session.access_token);
            toast.success("Avatar updated!");
            router.refresh();
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error.message);
                toast.error("Failed to save new avatar.");
            } else {
                console.error("Unknown error:", error);
                toast.error("An unexpected error occurred.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <AvatarUploader
                initialUrl={profile.avatar_url}
                onUploadSuccess={handleAvatarUpdate}
            />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* --- Form Field untuk Full Name --- */}
                    <FormField
                        control={form.control}
                        name="full_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g., John Doe" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is your public display name.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* --- Form Field untuk Username --- */}
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g., johndoe" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This will be part of your profile URL. Must be unique.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* --- Form Field untuk Website --- */}
                    <FormField
                        control={form.control}
                        name="website"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Website</FormLabel>
                                <FormControl>
                                    <Input placeholder="https://yourwebsite.com" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Your personal website or social media link.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* --- Tombol Submit --- */}
                    <div className="flex flex-col">
                        {serverError && <p className="text-sm font-medium text-destructive mb-4">{serverError}</p>}
                        <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Update Profile
                        </Button>
                    </div>
                </form>
            </Form>
        </>
    );
}