// src/lib/types.ts

// Ini merepresentasikan satu langkah partisipasi
export interface ParticipationStep {
  step: number;
  instruction: string;
  link?: string;
}

// Ini adalah tipe utama untuk data Airdrop
export interface Airdrop {
  id: number;
  slug:string;
  created_at: string; // datetime dari backend menjadi string di JSON
  created_by: string; // UUID dari backend menjadi string di JSON
  name: string;
  token_symbol: string;
  project_url?: string;
  image_url?: string;
  description?: string;
  category?: string;
  network?: string;
  token_contract_address?: string;
  airdrop_allocation?: number;
  estimated_value_usd?: number;
  difficulty?: string;
  participation_steps?: ParticipationStep[];
  is_confirmed: boolean;
  start_date?: string;
  end_date?: string;
  is_active: boolean;
}

export interface AuthorProfile {
  id: string; // UUID
  full_name?: string;
  avatar_url?: string;
}

export interface Guide {
  id: number;
  slug: string;
  created_at: string;
  updated_at: string;
  published_at?: string;
  author_id?: AuthorProfile | null;
  title: string;
  description?: string;
  content?: string;
  image_url?: string;
  category?: 'Beginner' | 'Strategy' | 'Security' | 'Tools' | 'News';
  status: 'draft' | 'published' | 'archived';
}


export interface CommentAuthor {
  id: string; // UUID
  full_name?: string;
  avatar_url?: string;
}

export interface Comment {
  id: number;
  content: string;
  created_at: string;
  author: CommentAuthor;
  parent_id?: number;
  guide_id?: number;
  airdrop_id?: number;
}

export interface CommentWithReplies extends Comment {
  replies: CommentWithReplies[];
}

export interface Profile {
  id: string; // UUID
  username?: string;
  full_name?: string;
  avatar_url?: string;
  website?: string;
}

export interface KnowledgeBaseSection {
  id: number;
  title: string;
  subtitle?: string | null;
  display_order: number;
}

export interface KnowledgeBaseSectionWithGuides extends KnowledgeBaseSection {
  guides: Guide[]; 
}

export interface Notification {
  id:number;
  created_at:string;
  title: string;
  message?:string;
  link_url?: string;
  is_read: boolean;
}

