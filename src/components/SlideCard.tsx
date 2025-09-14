'use client';

import { Slide } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar } from 'lucide-react';

interface SlideCardProps {
  slide: Slide;
}

export default function SlideCard({ slide }: SlideCardProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  };

  const truncateContent = (content: string, maxLength: number = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <Link href={`/slide/${slide.id}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        {/* Image */}
        <div className="relative h-48 bg-gradient-to-br from-red-600 to-red-800">
          {slide.imageUrl ? (
            <Image
              src={slide.imageUrl}
              alt={slide.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-white">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl font-bold">SCI</span>
                </div>
                <p className="text-sm opacity-80">Sport Club Internacional</p>
              </div>
            </div>
          )}
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          
          {/* Date badge */}
          <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            {formatDate(slide.createdAt)}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-colors line-clamp-2">
            {slide.title}
          </h3>
          
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
            {truncateContent(slide.content)}
          </p>

          <div className="mt-4 flex items-center justify-between">
            <span className="text-red-600 text-sm font-medium group-hover:underline">
              Ler mais
            </span>
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center group-hover:bg-red-600 transition-colors">
              <svg 
                className="w-4 h-4 text-red-600 group-hover:text-white transition-colors" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

