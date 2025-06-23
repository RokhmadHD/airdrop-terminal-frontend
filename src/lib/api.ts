// src/lib/api.ts

import { Airdrop } from "./types";

// Pastikan URL ini menunjuk ke backend FastAPI Anda
// Gunakan variabel environment untuk ini di produksi!
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export async function getAirdrops(): Promise<Airdrop[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/airdrops`);

    if (!response.ok) {
      throw new Error("Failed to fetch airdrops");
    }

    const data: Airdrop[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching airdrops:", error);
    // Di aplikasi nyata, Anda mungkin ingin menangani error ini dengan lebih baik
    return []; // Kembalikan array kosong jika terjadi error
  }
}

export async function getAirdropBySlug(slug: string): Promise<Airdrop | null> {
  try {
    // Panggil endpoint backend yang sudah kita buat
    const response = await fetch(`${API_BASE_URL}/airdrops/${slug}`);

    // Jika response 404 Not Found, kembalikan null
    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error(`Failed to fetch airdrop: ${response.statusText}`);
    }

    const data: Airdrop = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching airdrop with slug ${slug}:`, error);
    return null;
  }
}