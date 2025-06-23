/* eslint-disable @typescript-eslint/no-unused-vars */
// src/components/airdrops/AirdropPageComponent.tsx

"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Zap, Network, ChevronLeft, ChevronRight, ChevronsRight } from "lucide-react";
import { Airdrop } from "@/lib/types"; // Gunakan tipe data terpusat kita

// Komponen shadcn/ui untuk tampilan yang lebih baik
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Definisikan tipe untuk properti komponen
interface AirdropComponentProps {
  initialAirdrops: Airdrop[];
}

// Fungsi untuk menentukan status berdasarkan data boolean
const getAirdropStatus = (airdrop: Airdrop): string => {
  if (!airdrop.is_active) return 'FINISHED';
  if (airdrop.is_confirmed) return 'CONFIRMED';
  return 'RUMORED';
};

// Mapping warna untuk status baru kita
const statusColors: { [key: string]: string } = {
  RUMORED: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  CONFIRMED: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  FINISHED: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
};

const difficultyColors: { [key: string]: string } = {
  Easy: 'text-green-400',
  Medium: 'text-yellow-400',
  Hard: 'text-red-400',
};

export function AirdropPageComponent({ initialAirdrops }: AirdropComponentProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [networkFilter, setNetworkFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6; // Mungkin lebih baik 6 untuk grid 3 kolom

  const filteredAirdrops = useMemo(() => {
    return initialAirdrops.filter((airdrop) => {
      const matchesSearch = airdrop.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      
      const airdropStatus = getAirdropStatus(airdrop);
      const matchesStatus =
        statusFilter === "All" || airdropStatus === statusFilter;
      
      const matchesNetwork =
        networkFilter === "All" || airdrop.network === networkFilter;

      return matchesSearch && matchesStatus && matchesNetwork;
    });
  }, [searchTerm, statusFilter, networkFilter, initialAirdrops]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, networkFilter]);

  const totalPages = Math.ceil(filteredAirdrops.length / ITEMS_PER_PAGE);
  const currentAirdrops = filteredAirdrops.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const networkOptions = ["All", ...new Set(initialAirdrops.map((a) => a.network).filter(Boolean) as string[])];
  const statusOptions = ["All", "CONFIRMED", "RUMORED", "FINISHED"];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Filter Bar */}
      <div className="mb-8 p-4 border rounded-lg bg-card">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map(opt => <SelectItem key={opt} value={opt}>{opt === 'All' ? 'All Statuses' : opt}</SelectItem>)}
            </SelectContent>
          </Select>

          <Select value={networkFilter} onValueChange={setNetworkFilter}>
            <SelectTrigger>
              <SelectValue placeholder="All Networks" />
            </SelectTrigger>
            <SelectContent>
              {networkOptions.map(opt => <SelectItem key={opt} value={opt}>{opt === 'All' ? 'All Networks' : opt}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Airdrop Grid */}
      {currentAirdrops.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {currentAirdrops.map(airdrop => {
            const status = getAirdropStatus(airdrop);
            const difficulty = airdrop.difficulty || 'N/A';
            const difficultyColor = difficultyColors[difficulty as keyof typeof difficultyColors] || 'text-muted-foreground';

            return (
              // --- INI BAGIAN UTAMA YANG DIUBAH ---
              <div key={airdrop.id} className="rounded-xl overflow-hidden flex flex-col group border bg-card text-card-foreground shadow-sm hover:border-primary/60 transition-all duration-300">
                {/* Bagian Konten Utama Kartu */}
                <div className="p-6 flex-grow flex flex-col">
                  {/* Header: Logo, Nama, Status */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      {airdrop.image_url ? (
                        <Image src={airdrop.image_url} alt={`${airdrop.name} logo`} width={40} height={40} className="rounded-full" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center font-bold">
                          {airdrop.name.charAt(0)}
                        </div>
                      )}
                      <h3 className="text-xl font-bold">{airdrop.name}</h3>
                    </div>
                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${statusColors[status]}`}>
                      {status}
                    </span>
                  </div>
                  
                  {/* Deskripsi */}
                  <p className="text-muted-foreground text-sm mb-6 h-12 line-clamp-3 flex-grow">
                    {airdrop.description || "No description provided."}
                  </p>
                  
                  {/* Footer: Network & Difficulty */}
                  <div className="flex justify-between items-center text-sm border-t pt-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Network size={16} />
                      <span>{airdrop.network || 'N/A'}</span>
                    </div>
                    <div className={`flex items-center gap-2 font-semibold ${difficultyColor}`}>
                      <Zap size={16} />
                      <span>{difficulty}</span>
                    </div>
                  </div>
                </div>
                
                {/* Tombol "View Guide" di Bawah */}
                <Link 
                  href={`/airdrops/${airdrop.slug}`} 
                  className="block bg-muted/50 p-4 text-center font-semibold text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300"
                >
                  <div className="flex items-center justify-center gap-2">
                    View Guide <ChevronsRight size={20} className="transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </div>
              // --- AKHIR BAGIAN YANG DIUBAH ---
            );
          })}
        </div>
      ) : (
        <div className="col-span-full text-center py-16 text-muted-foreground">
          <p className="text-lg font-semibold">No airdrops found</p>
          <p>Try adjusting your search or filter criteria.</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-12 flex justify-center items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
            <ChevronLeft size={20} />
          </Button>
          <span className="text-sm font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <Button variant="outline" size="icon" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
            <ChevronRight size={20} />
          </Button>
        </div>
      )}
    </div>
  );
}