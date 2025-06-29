"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";

// Tipe data & fungsi API
import { CommentWithReplies, Comment as AppComment } from "@/lib/types";
import { getComments, postComment } from "@/lib/api";

// Komponen UI dari shadcn/ui
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "../ui/skeleton";
import { useUser } from "@/contexts/UserProvider";

// --- Komponen #1: Form Komentar Reusable ---

const commentSchema = z.object({
  content: z.string().min(1, "Comment cannot be empty.").max(1000, "Comment is too long."),
});

type CommentFormValues = z.infer<typeof commentSchema>;

interface CommentFormProps {
  onSubmit: (values: CommentFormValues) => Promise<void>;
  placeholder?: string;
  submitButtonText?: string;
  isSubmitting: boolean;
}

function CommentForm({
  onSubmit,
  placeholder = "Write a comment...",
  submitButtonText = "Post Comment",
  isSubmitting,
}: CommentFormProps) {
  const form = useForm<CommentFormValues>({
    resolver: zodResolver(commentSchema),
    defaultValues: { content: "" },
  });

  const handleFormSubmit = async (values: CommentFormValues) => {
    await onSubmit(values);
    // Reset form hanya jika submit berhasil (tidak ada error di parent)
    form.reset({ content: "" });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder={placeholder} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting} size="sm">
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {submitButtonText}
        </Button>
      </form>
    </Form>
  );
}


// --- Komponen #2: Item Komentar Individual (dengan rekursi) ---

interface CommentItemProps {
  comment: CommentWithReplies;
  target: { guideId?: number; airdropId?: number };
  onReplySuccess: (newReply: AppComment, parentId: number) => void;
}

function CommentItem({ comment, target, onReplySuccess }: CommentItemProps) {
  const { session } = useUser();
  const [isReplying, setIsReplying] = useState(false);
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);

  const handleReplySubmit = async (values: { content: string }) => {
    setIsSubmittingReply(true);
    if (!session) {
      alert("You must be logged in to reply.");
      setIsSubmittingReply(false);
      return;
    }

    try {
      const newReply: AppComment = await postComment({
        content: values.content,
        guide_id: target.guideId,
        airdrop_id: target.airdropId,
        parent_id: comment.id,
      }, session.access_token);

      onReplySuccess(newReply, comment.id);
      setIsReplying(false);
    } catch (error) {
      console.error("Failed to post reply:", error);
      alert("Failed to post reply.");
    } finally {
      setIsSubmittingReply(false);
    }
  };

  return (
    <div className="flex items-start gap-4">
      <Avatar>
        <AvatarImage src={comment.author.avatar_url} alt={comment.author.full_name || 'User Avatar'} />
        <AvatarFallback>{comment.author.full_name?.charAt(0).toUpperCase() || 'U'}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="font-semibold">{comment.author.full_name || 'Anonymous'}</p>
          <p className="text-xs text-muted-foreground">
            {new Date(comment.created_at).toLocaleDateString()}
          </p>
        </div>
        <p className="text-sm my-1 whitespace-pre-wrap">{comment.content}</p>

        <Button variant="ghost" size="sm" className="h-auto p-1 text-xs" onClick={() => setIsReplying(!isReplying)}>
          {isReplying ? 'Cancel' : 'Reply'}
        </Button>

        {isReplying && (
          <div className="mt-2">
            <CommentForm
              onSubmit={handleReplySubmit}
              placeholder={`Replying to ${comment.author.full_name || 'Anonymous'}...`}
              submitButtonText="Post Reply"
              isSubmitting={isSubmittingReply}
            />
          </div>
        )}

        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-4 pl-6 border-l-2 space-y-6">
            {comment.replies.map(reply => (
              <CommentItem
                key={reply.id}
                comment={reply}
                target={target}
                onReplySuccess={onReplySuccess}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


// --- Komponen #3: Komponen Utama (Container) ---
interface CommentSectionProps {
  target: { guideId?: number; airdropId?: number };
}


export function CommentSection({ target }: CommentSectionProps) {
  const { user, session } = useUser();
  const [comments, setComments] = useState<CommentWithReplies[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmittingNew, setIsSubmittingNew] = useState(false);

  const addReplyToState = (allComments: CommentWithReplies[], newReply: AppComment, parentId: number): CommentWithReplies[] => {
    return allComments.map(comment => {
      if (comment.id === parentId) {
        const newReplyWithReplies: CommentWithReplies = { ...newReply, replies: [] };
        return { ...comment, replies: [...(comment.replies || []), newReplyWithReplies] };
      }
      if (comment.replies && comment.replies.length > 0) {
        return { ...comment, replies: addReplyToState(comment.replies, newReply, parentId) };
      }
      return comment;
    });
  };

  useEffect(() => {
    setIsLoading(true);
    async function loadComments() {
      const fetchedComments = await getComments(target);
      setComments(fetchedComments)
      setIsLoading(false)
    }
    loadComments()
  }, [target]);

  const handleReplySuccess = (newReply: AppComment, parentId: number) => {
    setComments(prevComments => addReplyToState(prevComments, newReply, parentId));
  };


  const handlePostNewComment = async (values: { content: string }) => {
    setIsSubmittingNew(true);
    if (!session) {
      alert("You must be logged in to comment.");
      setIsSubmittingNew(false);
      return;
    }

    try {
      const newCommentData: AppComment = await postComment({
        content: values.content,
        guide_id: target.guideId,
        airdrop_id: target.airdropId
      }, session.access_token);

      setComments(prev => [...prev, { ...newCommentData, replies: [] }]);
    } catch (error) {
      console.error("Failed to post comment:", error);
      alert("Failed to post comment.");
    } finally {
      setIsSubmittingNew(false);
    }
  };

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Discussion</h2>

      <Card className="mb-8">
        <CardContent className="p-6 py-2">
          <h3 className="font-semibold mb-2">Leave a Comment</h3>
          {user ? (
            <CommentForm
              onSubmit={handlePostNewComment}
              isSubmitting={isSubmittingNew}
            />
          ) : (
            <div className="text-sm text-muted-foreground">
              You must be{' '}
              <Link href="/auth/login" className="font-semibold text-primary underline-offset-4 hover:underline">
                logged in
              </Link>
              {' '}to post a comment.
            </div>
          )}
        </CardContent>
      </Card>

      {isLoading ? (
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        </div>
      ) : comments.length > 0 ? (
        <div className="space-y-6">
          {comments.map(comment => (
            <CommentItem
              key={comment.id}
              comment={comment}
              target={target}
              onReplySuccess={handleReplySuccess}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-sm text-muted-foreground py-8">
          No comments yet. Be the first to start the discussion!
        </p>
      )}
    </div>
  );
}