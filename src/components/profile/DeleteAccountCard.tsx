// src/components/profile/DeleteAccountCard.tsx
"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";


export function DeleteAccountCard() {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    // Ini adalah operasi yang sangat berbahaya.
    // Di aplikasi nyata, Anda harus memanggil endpoint backend
    // yang melakukan validasi tambahan sebelum menghapus.
    // Memanggil RPC function 'delete_user()' adalah cara terbaik.
    
    alert("Delete functionality is not implemented yet for safety. This would call a secure backend endpoint.");
    console.log("Simulating user deletion...");
    
    // Contoh jika diimplementasikan:
    // const supabase = createClient();
    // const { error } = await supabase.rpc('delete_user');
    // if (error) {
    //   alert(`Error: ${error.message}`);
    // } else {
    //   router.push('/?message=Account deleted successfully');
    // }

    setIsLoading(false);
  };

  return (
    <Card className="border-destructive">
      <CardHeader>
        <CardTitle>Delete Account</CardTitle>
        <CardDescription>
          Permanently delete your account and all associated data. This action cannot be undone.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Delete My Account
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action is permanent and will delete all your airdrops, comments, and profile data.
                You cannot undo this.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>
                Yes, delete my account
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
}