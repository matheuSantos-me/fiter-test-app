"use client";

import { useEffect, useState } from "react";

import BookCard from "../components/BookCard";
import SearchBar from "../components/SearchBar";

import HTTPClient from "@/server";
import { BookProps } from "@/_interfaces/book.interface";

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMorePage, setHasMorePage] = useState(true);
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState<BookProps[]>([]);

  const limit = 5;

  const listBooks = async () => {
    try {
      const { data }: { data: { data: BookProps[]; hasMore: boolean } } =
        await HTTPClient.get(
          `/books?page=${page}&limit=${limit}&text=${search}`
        );

      setHasMorePage(data.hasMore);
      setBooks(data.data);
    } catch (e) {
      console.log(e, "error");
    } finally {
      setLoading(false);
    }
  };

  const listBooksSearch = async () => {
    try {
      const { data }: { data: { data: BookProps[] } } = await HTTPClient.get(
        `/books/search?text=${search}`
      );

      setBooks(data.data);
    } catch (e) {
      console.log(e, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!search.length) {
      listBooks();
    }

    if (search.length) {
      listBooksSearch();
    }
  }, [page, search]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-12">
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight mb-4 sm:mb-0">
          Livros disponíveis
        </h1>

        <SearchBar
          onSearch={(q) => {
            setPage(1);
            setSearch(q);
          }}
        />
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {loading
          ? Array.from({ length: limit }).map((_, idx) => (
              <BookCard
                key={`skeleton-${idx}`}
                loading={true}
                id=""
                name=""
                authors={[]}
                imagelink=""
                description=""
                createdat={new Date()}
                publishedat={new Date()}
                searchable=""
              />
            ))
          : books.map((book) => (
              <BookCard key={book.id} loading={false} {...book} />
            ))}
      </div>

      {!loading && books.length === 0 && (
        <p className="text-center text-gray-500 mt-8 text-lg">
          Nenhum livro encontrado.
        </p>
      )}

      <div className="flex justify-center gap-2 mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Anterior
        </button>

        <span className="px-3 py-1">{page}</span>

        <button
          disabled={!hasMorePage}
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Próxima
        </button>
      </div>
    </div>
  );
}
