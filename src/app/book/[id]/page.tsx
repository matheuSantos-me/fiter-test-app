"use client";

import { useEffect, useState, use } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";

import HTTPClient from "@/server";

import { BookProps } from "@/_interfaces/book.interface";

export default function BookDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [book, setBook] = useState<BookProps | null>(null);
  const [loading, setLoading] = useState(true);

  const getBook = async () => {
    try {
      const { data }: { data: { data: BookProps } } = await HTTPClient.get(
        `/books/${id}`
      );
      setBook(data.data);
    } catch (err) {
      console.error("Erro ao buscar livro:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBook();
  }, [id]);

  const formattedDate = book?.publishedat
    ? new Intl.DateTimeFormat("pt-BR", { dateStyle: "medium" }).format(
        new Date(book.publishedat)
      )
    : "Data desconhecida";

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto p-6">
        <div className="flex flex-col md:flex-row gap-8 animate-pulse">
          <div className="w-60 h-80 bg-gray-300 rounded-lg mx-auto md:mx-0"></div>

          <div className="flex-1 space-y-4">
            <div className="h-7 bg-gray-300 rounded w-2/3"></div>
            <div className="h-5 bg-gray-200 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!book) return notFound();

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="relative w-60 h-80 mx-auto md:mx-0 flex-shrink-0">
          <Image
            src={book.imagelink.replace(/[\]\s]+$/, "") || "/placeholder.png"}
            alt={`Capa do livro ${book.name}`}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 240px"
            className="object-contain rounded-lg shadow-md"
          />
        </div>

        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 text-white">
            {book.name}
          </h1>

          <p className="text-lg text-gray-700 mb-1">
            <span className="font-medium">Autor:</span>{" "}
            {book.authors?.join(", ")}
          </p>

          <p className="text-sm text-gray-500 mb-4">
            Publicado em: {formattedDate}
          </p>

          <div className="border-t border-gray-200 pt-4">
            <h2 className="text-lg font-semibold mb-2">Descrição</h2>
            <p className="text-gray-700 leading-relaxed">{book.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
