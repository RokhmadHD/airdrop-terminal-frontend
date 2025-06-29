// src/components/profile/UpdateEmailCard.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useUser } from "@/contexts/UserProvider";
import { createClient } from "@/lib/supabase/client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const emailFormSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

type EmailFormValues = z.infer<typeof emailFormSchema>;

export function UpdateEmailCard() {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const form = useForm<EmailFormValues>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      email: user?.email || "",
    },
  });

  async function onSubmit(data: EmailFormValues) {
    setIsLoading(true);
    setMessage("");
    const supabase = createClient();
    
    // Fungsi Supabase untuk update email
    const { error } = await supabase.auth.updateUser({ email: data.email });

    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage("Success! Please check your new email address for a confirmation link.");
    }
    setIsLoading(false);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Email</CardTitle>
        <CardDescription>
          Update the email address associated with your account. A confirmation link will be sent.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="name@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {message && <p className="text-sm font-medium">{message}</p>}
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Update Email
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}