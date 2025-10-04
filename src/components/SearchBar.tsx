"use client";

import { FormEvent, useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        placeholder="Buscar livros..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 rounded-lg hover:bg-blue-700 cursor-pointer"
      >
        Buscar
      </button>
    </form>
  );
}
