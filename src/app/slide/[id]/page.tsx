'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import { Slide, Category } from '@/types';
import { Calendar, ArrowLeft, ArrowRight, Home } from 'lucide-react';

// Mock data - será substituído por dados do Firebase
const mockCategories: Category[] = [
  { id: 'introducao', name: 'Introdução', order: 1, description: 'Apresentação do Departamento' },
  { id: 'estrutura', name: 'Estrutura Organizacional', order: 2, description: 'Organograma e Atuação' },
  { id: 'atribuicoes', name: 'Atribuições da Equipe', order: 3, description: 'Funções dos Assistentes Sociais' },
];

const mockSlides: Slide[] = [
  {
    id: 'slide-001',
    title: 'Apresentação do Departamento de Serviço Social e Alojamento',
    content: 'O trabalho do Assistente Social no esporte é uma nova área de atuação e por isso ainda encontra-se em fase de construção. Existem várias outras possibilidades para o desenvolvimento do trabalho do Serviço Social nos Clubes, frente as questões que se apresentam, cabendo aos profissionais buscarem constantemente o crescimento, a evolução e a qualificação de sua prática.\n\nO papel do Assistente social nas Categorias de Base, serve para garantir o direito da criança e do adolescente, entendendo que este jovem atleta está em pleno processo de desenvolvimento pessoal e esportivo.\n\nO profissional de Serviço Social tem caráter interventivo: Deve trabalhar em conjunto com as demais áreas promovendo ações educacionais de cultura e lazer e principalmente, desenvolver ações vinculadas a questões socioeconômicas e familiares.',
    categoryId: 'introducao',
    order: 1,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: 'slide-002',
    title: 'Introdução ao Serviço Social no Esporte',
    content: 'O papel do Assistente social nas Categorias de Base, serve para garantir o direito da criança e do adolescente, entendendo que este jovem atleta está em pleno processo de desenvolvimento pessoal e esportivo.\n\nO profissional de Serviço Social tem caráter interventivo: Deve trabalhar em conjunto com as demais áreas promovendo ações educacionais de cultura e lazer e principalmente, desenvolver ações vinculadas a questões socioeconômicas e familiares.',
    categoryId: 'introducao',
    order: 2,
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-01-16'),
  },
  {
    id: 'slide-003',
    title: 'Objetivos do Setor',
    content: 'Planejar e executar estudos sócio econômicos que possam contribuir para a análise da realidade social dos atletas e seus familiares, subsidiando ações que garantam um atendimento ético que auxilie no cumprimento das exigências sociais dos Clubes formadores.\n\nAlém de:\n\n• Garantir atendimento de qualidade, ética e sigilo profissional\n• Auxiliar no processo de formação e profissional\n• Promover direitos e relembrar deveres\n• Ampliar vínculos\n• Acompanhar e acolher as famílias que chegam de outra cidade ou estado\n• Fortalecer a relação dos atletas e dos grupos\n• Incentivar o convívio social, escolar e familiar\n• Celebrar conquistas, estimular foco, disciplina e comprometimento\n• Incentivar a educação financeira',
    categoryId: 'introducao',
    order: 3,
    createdAt: new Date('2024-01-17'),
    updatedAt: new Date('2024-01-17'),
  },
];

export default function SlidePage() {
  const params = useParams();
  const router = useRouter();
  const [slide, setSlide] = useState<Slide | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const slideId = params.id as string;
    
    // Simular carregamento do Firebase
    setTimeout(() => {
      const foundSlide = mockSlides.find(s => s.id === slideId);
      if (foundSlide) {
        setSlide(foundSlide);
        const foundCategory = mockCategories.find(c => c.id === foundSlide.categoryId);
        setCategory(foundCategory || null);
      }
      setLoading(false);
    }, 500);
  }, [params.id]);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  };

  const formatContent = (content: string) => {
    return content.split('\n').map((paragraph, index) => {
      if (paragraph.trim() === '') return null;
      
      if (paragraph.startsWith('•')) {
        return (
          <li key={index} className="ml-4 mb-2">
            {paragraph.substring(1).trim()}
          </li>
        );
      }
      
      return (
        <p key={index} className="mb-4 leading-relaxed">
          {paragraph}
        </p>
      );
    });
  };

  const getNextSlide = () => {
    if (!slide) return null;
    const currentIndex = mockSlides.findIndex(s => s.id === slide.id);
    return currentIndex < mockSlides.length - 1 ? mockSlides[currentIndex + 1] : null;
  };

  const getPrevSlide = () => {
    if (!slide) return null;
    const currentIndex = mockSlides.findIndex(s => s.id === slide.id);
    return currentIndex > 0 ? mockSlides[currentIndex - 1] : null;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando slide...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!slide) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Slide não encontrado</h1>
          <p className="text-gray-600 mb-8">O slide que você está procurando não existe.</p>
          <Link 
            href="/"
            className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <Home className="w-5 h-5 mr-2" />
            Voltar ao início
          </Link>
        </div>
      </div>
    );
  }

  const nextSlide = getNextSlide();
  const prevSlide = getPrevSlide();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-red-600 hover:underline">
              Início
            </Link>
            <span className="text-gray-400">/</span>
            {category && (
              <>
                <span className="text-gray-600">{category.name}</span>
                <span className="text-gray-400">/</span>
              </>
            )}
            <span className="text-gray-900 font-medium">{slide.title}</span>
          </nav>
        </div>
      </div>

      {/* Content */}
      <article className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <header className="mb-8">
            <div className="flex items-center mb-4">
              <Calendar className="w-5 h-5 text-red-600 mr-2" />
              <time className="text-red-600 font-medium">
                {formatDate(slide.createdAt)}
              </time>
              {category && (
                <>
                  <span className="mx-2 text-gray-400">•</span>
                  <span className="text-gray-600">{category.name}</span>
                </>
              )}
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              {slide.title}
            </h1>
          </header>

          {/* Featured Image */}
          {slide.imageUrl ? (
            <div className="mb-8">
              <Image
                src={slide.imageUrl}
                alt={slide.title}
                width={800}
                height={400}
                className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
          ) : (
            <div className="mb-8">
              <div className="w-full h-64 md:h-96 bg-gradient-to-br from-red-600 to-red-800 rounded-lg shadow-lg flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-4xl font-bold">SCI</span>
                  </div>
                  <p className="text-xl opacity-80">Sport Club Internacional</p>
                  <p className="text-sm opacity-60">Serviço Social / Alojamento</p>
                </div>
              </div>
            </div>
          )}

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <div className="text-gray-700 text-lg leading-relaxed">
              {formatContent(slide.content)}
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              {prevSlide ? (
                <Link 
                  href={`/slide/${prevSlide.id}`}
                  className="flex items-center text-red-600 hover:text-red-700 transition-colors group"
                >
                  <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                  <div className="text-left">
                    <div className="text-sm text-gray-500">Anterior</div>
                    <div className="font-medium">{prevSlide.title}</div>
                  </div>
                </Link>
              ) : (
                <div></div>
              )}

              <Link 
                href="/"
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Voltar aos slides
              </Link>

              {nextSlide ? (
                <Link 
                  href={`/slide/${nextSlide.id}`}
                  className="flex items-center text-red-600 hover:text-red-700 transition-colors group"
                >
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Próximo</div>
                    <div className="font-medium">{nextSlide.title}</div>
                  </div>
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

