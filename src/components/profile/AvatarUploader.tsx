// src/components/profile/AvatarUploader.tsx
"use client";

import { useState, useEffect } from "react";
import { useUser } from "@/contexts/UserProvider";
import { createClient } from "@/lib/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface AvatarUploaderProps {
  initialUrl: string | null | undefined;
  onUploadSuccess: (newUrl: string) => void;
}

export function AvatarUploader({ initialUrl, onUploadSuccess }: AvatarUploaderProps) {
  const { user } = useUser();
  const [avatarUrl, setAvatarUrl] = useState<string | null | undefined>(initialUrl);
  const [isUploading, setIsUploading] = useState(false);

  // Update URL lokal jika prop initialUrl berubah
  useEffect(() => {
    setAvatarUrl(initialUrl);
  }, [initialUrl]);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0 || !user) {
      return;
    }

    const file = event.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}-${Math.random()}.${fileExt}`;
    const filePath = `${user.id}/${fileName}`;

    setIsUploading(true);
    const supabase = createClient();

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file);

    if (uploadError) {
      alert('Error uploading file. Please try again.');
      console.error(uploadError);
      setIsUploading(false);
      return;
    }

    // Dapatkan URL publik dari file yang baru di-upload
    const { data } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath);

    if (data.publicUrl) {
      setAvatarUrl(data.publicUrl);
      onUploadSuccess(data.publicUrl); // Kirim URL baru ke parent
    }
    
    setIsUploading(false);
  };

  const getInitials = () => {
    return user?.email?.charAt(0).toUpperCase() || 'U';
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <Avatar className="h-24 w-24 border-2">
        <AvatarImage src={avatarUrl ?? undefined} alt="User avatar" />
        <AvatarFallback className="text-3xl">{getInitials()}</AvatarFallback>
      </Avatar>
      
      <div className="relative">
        <Button asChild variant="outline" disabled={isUploading}>
          <label htmlFor="avatar-upload">
            {isUploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {isUploading ? 'Uploading...' : 'Change Avatar'}
          </label>
        </Button>
        <input
          id="avatar-upload"
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleUpload}
          disabled={isUploading}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>
    </div>
  );
}