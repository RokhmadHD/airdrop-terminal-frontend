// src/components/airdrops/FollowButton.tsx
"use client";

import { useState, useEffect } from "react";
import { useUser } from "@/contexts/UserProvider";
import { Button } from "@/components/ui/button";
import { Heart, Loader2 } from "lucide-react";
import { getFollowStatus, followAirdrop, unfollowAirdrop } from "@/lib/api";

interface FollowButtonProps {
  airdropId: number;
}

export function FollowButton({ airdropId }: FollowButtonProps) {
  const { user, session } = useUser();
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!session) {
      setIsLoading(false);
      return;
    }
    getFollowStatus(airdropId, session.access_token).then(status => {
      setIsFollowing(status);
      setIsLoading(false);
    });
  }, [airdropId, session]);

  const handleToggleFollow = async () => {
    if (!session) {
      // Redirect to login or show modal
      alert("Please log in to follow airdrops.");
      return;
    }
    
    setIsLoading(true);
    try {
      if (isFollowing) {
        await unfollowAirdrop(airdropId, session.access_token);
        setIsFollowing(false);
      } else {
        await followAirdrop(airdropId, session.access_token);
        setIsFollowing(true);
      }
    } catch (error) {
      console.error("Failed to toggle follow status", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) return null; // Jangan tampilkan tombol jika tidak login

  return (
    <Button onClick={handleToggleFollow} disabled={isLoading} variant={isFollowing ? "default" : "outline"}>
      {isLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Heart className={`mr-2 h-4 w-4 ${isFollowing ? "fill-current" : ""}`} />
      )}
      {isFollowing ? "Following" : "Follow"}
    </Button>
  );
}