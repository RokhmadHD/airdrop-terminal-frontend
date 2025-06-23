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