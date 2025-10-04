import Link from "next/link";
import Image from "next/image";

import { BookProps } from "@/_interfaces/book.interface";

interface BookCardProps extends BookProps {
  loading: boolean;
}

export default function BookCard({
  loading = false,
  id,
  name,
  description,
  publishedat,
  authors,
  imagelink,
}: BookCardProps) {
  const formattedDate = publishedat
    ? new Intl.DateTimeFormat("pt-BR", { dateStyle: "medium" }).format(
        new Date(publishedat)
      )
    : "Data desconhecida";

  if (loading) {
    return (
      <div className="border rounded-lg shadow-md p-4 flex gap-4 animate-pulse">
        <div className="w-20 h-28 bg-gray-300 rounded" />

        <div className="flex flex-col justify-between flex-1">
          <div className="h-5 bg-gray-300 rounded w-3/4 mb-2" />

          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />

          <div className="h-4 bg-gray-200 rounded w-1/3 mb-2" />

          <div className="h-4 bg-gray-200 rounded w-2/5" />
        </div>
      </div>
    );
  }

  return (
    <Link href={`/book/${id}`} aria-label={`Ver detalhes do livro ${name}`}>
      <div className="border rounded-lg shadow-md p-4 hover:shadow-lg transition cursor-pointer flex flex-col gap-4 h-full">
        <div className="relative w-full h-52 flex items-center justify-center bg-gray-100 rounded">
          <Image
            src={imagelink}
            alt={`Capa do livro ${name}`}
            fill
            className="object-cover rounded"
            onError={(e) =>
              ((e.target as HTMLImageElement).src = "/placeholder.png")
            }
          />
        </div>

        <div className="flex flex-col justify-between flex-1">
          <h3 className="font-semibold text-lg line-clamp-2">{name}</h3>

          {description && (
            <p className="text-sm text-gray-600 line-clamp-2 mt-2">{description}</p>
          )}

          <p className="text-sm text-gray-600 mt-6">Autor: {authors[0]}</p>

          <p className="text-sm text-gray-600">Publicado em: {formattedDate}</p>
        </div>
      </div>
    </Link>
  );
}
