// src/lib/api.ts

import { Airdrop, CommentWithReplies, Guide, Comment, Profile, KnowledgeBaseSectionWithGuides, Notification } from "./types";

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

export async function getGuides(): Promise<Guide[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/guides`, {
      next: { revalidate: 60 } // Revalidate data setiap 60 detik (ISR)
    });

    if (!response.ok) {
      throw new Error("Failed to fetch guides");
    }

    const data: Guide[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching guides:", error);
    return [];
  }
}

export async function getGuideBySlug(slug: string): Promise<Guide | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/guides/${slug}`, {
      next: { revalidate: 60 } // Revalidate data setiap 60 detik (ISR)
    });
    
    if (response.status === 404) {
      return null;
    }
    if (!response.ok) {
      throw new Error(`Failed to fetch guide: ${response.statusText}`);
    }

    const data: Guide = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching guide with slug ${slug}:`, error);
    return null;
  }
}

export async function getComments(params: { guideId?: number; airdropId?: number }): Promise<CommentWithReplies[]> {
  const { guideId, airdropId } = params;
  let url = `${API_BASE_URL}/comments?`;

  if (guideId) {
    url += `guide_id=${guideId}`;
  } else if (airdropId) {
    url += `airdrop_id=${airdropId}`;
  } else {
    throw new Error("Either guideId or airdropId must be provided");
  }
  
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch comments");
  return response.json();
}

export async function postComment(
  data: { content: string; guide_id?: number; airdrop_id?: number; parent_id?: number },
  token: string
): Promise<Comment> { // <-- TAMBAHKAN TIPE RETURN DI SINI
  const response = await fetch(`${API_BASE_URL}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Failed to post comment");
  }
  
  // Sekarang TypeScript tahu bahwa response.json() adalah objek Comment
  return response.json();
}

// Ambil profil berdasarkan ID
export async function getProfile(userId: string): Promise<Profile | null> {
  // Panggil endpoint /profiles/{profile_id} dari backend
  const response = await fetch(`${API_BASE_URL}/profiles/${userId}`);
  if (!response.ok) return null;
  return response.json();
}

// Update profil
export async function updateProfile(
  userId: string,
  data: Partial<Profile>,
  token: string
): Promise<Profile> {
  const response = await fetch(`${API_BASE_URL}/profiles/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Failed to update profile");
  }
  return response.json();
}


export async function getKnowledgeBaseData(): Promise<KnowledgeBaseSectionWithGuides[]> {
  try {
    // Panggil endpoint backend yang sudah kita buat
    const response = await fetch(`${API_BASE_URL}/guides/knowledge-base`, {
      next: { revalidate: 300 } // Revalidate setiap 5 menit (300 detik)
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Knowledge Base data: ${response.statusText}`);
    }

    const data: KnowledgeBaseSectionWithGuides[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching Knowledge Base data:", error);
    // Kembalikan array kosong jika terjadi error agar halaman tidak crash
    return []; 
  }
}

export async function followAirdrop(airdropId: number, token: string) {
  await fetch(`${API_BASE_URL}/airdrops/${airdropId}/follow`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` }
  });
}

export async function unfollowAirdrop(airdropId: number, token: string) {
  await fetch(`${API_BASE_URL}/airdrops/${airdropId}/follow`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
}

export async function getFollowedAirdrops(token: string): Promise<Airdrop[]> {
  const res = await fetch(`${API_BASE_URL}/airdrops/followed/me`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) throw new Error("Failed to fetch followed airdrops");
  return res.json();
}

export async function getFollowStatus(airdropId: number, token: string): Promise<boolean> {
  const res = await fetch(`${API_BASE_URL}/airdrops/${airdropId}/follow-status`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) return false; // Jika error (misal, 401), anggap saja belum follow
  return res.json();
}

export async function getNotifications(token: string): Promise<Notification[]> {
  const response = await fetch(`${API_BASE_URL}/notifications`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Kirim token di header
    },
    // Opsi caching bisa disesuaikan, untuk notifikasi lebih baik selalu fetch yang baru
    next: { revalidate: 0 } 
  });
  console.log(token)
  if (!response.ok) {
    // Jika token tidak valid atau error lain, throw error
    throw new Error('Failed to fetch notifications');
  }

  return response.json();
}

export async function markNotificationsAsRead(
  payload: { notification_ids: number[] },
  token: string
): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/notifications/read`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({})); // Tangkap error jika body JSON kosong
    throw new Error(errorData.detail || 'Failed to mark notifications as read');
  }

  // Untuk response 204 No Content, tidak ada body yang perlu di-parse
  return; 
}