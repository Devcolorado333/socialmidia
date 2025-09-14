'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import CategoryTabs from '@/components/CategoryTabs';
import SlideGrid from '@/components/SlideGrid';
import { Category, Slide } from '@/types';

// Mock data - será substituído por dados do Firebase
const mockCategories: Category[] = [
  { id: 'introducao', name: 'Introdução', order: 1, description: 'Apresentação do Departamento' },
  { id: 'estrutura', name: 'Estrutura Organizacional', order: 2, description: 'Organograma e Atuação' },
  { id: 'atribuicoes', name: 'Atribuições da Equipe', order: 3, description: 'Funções dos Assistentes Sociais' },
  { id: 'registros', name: 'Registros de Ações', order: 4, description: 'Atividades e Campanhas Realizadas' },
  { id: 'alojamento', name: 'Alojamento', order: 5, description: 'Estrutura e Funcionamento' },
  { id: 'parcerias', name: 'Parcerias', order: 6, description: 'Parcerias Estabelecidas' },
  { id: 'acoes', name: 'Ações Realizadas', order: 7, description: 'Projetos e Atividades' },
  { id: 'futuros', name: 'Projetos Futuros', order: 8, description: 'Planejamento e Perspectivas' },
  { id: 'consideracoes', name: 'Considerações Finais', order: 9, description: 'Conclusões' },
];

const mockSlides: Slide[] = [
  {
    id: 'slide-001',
    title: 'Apresentação do Departamento de Serviço Social e Alojamento',
    content: 'O trabalho do Assistente Social no esporte é uma nova área de atuação e por isso ainda encontra-se em fase de construção. Existem várias outras possibilidades para o desenvolvimento do trabalho do Serviço Social nos Clubes, frente as questões que se apresentam, cabendo aos profissionais buscarem constantemente o crescimento, a evolução e a qualificação de sua prática.',
    categoryId: 'introducao',
    order: 1,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: 'slide-002',
    title: 'Introdução ao Serviço Social no Esporte',
    content: 'O papel do Assistente social nas Categorias de Base, serve para garantir o direito da criança e do adolescente, entendendo que este jovem atleta está em pleno processo de desenvolvimento pessoal e esportivo.',
    categoryId: 'introducao',
    order: 2,
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-01-16'),
  },
  {
    id: 'slide-003',
    title: 'Objetivos do Setor',
    content: 'Planejar e executar estudos sócio econômicos que possam contribuir para a análise da realidade social dos atletas e seus familiares, subsidiando ações que garantam um atendimento ético que auxilie no cumprimento das exigências sociais dos Clubes formadores.',
    categoryId: 'introducao',
    order: 3,
    createdAt: new Date('2024-01-17'),
    updatedAt: new Date('2024-01-17'),
  },
  {
    id: 'slide-004',
    title: 'Organograma do Departamento',
    content: 'Estrutura organizacional do Departamento de Serviço Social e Alojamento, com Leonardo Fortino como Coordenador de Performance e Saúde, Tiane Orleis Bitencourt como Coordenadora de Alojamento e Assistente Social, e Fabiana como Assistente Social.',
    categoryId: 'estrutura',
    order: 1,
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-18'),
  },
  {
    id: 'slide-005',
    title: 'Atuação do Serviço Social',
    content: 'O Serviço Social é uma profissão regulamentada pela Lei nº 8.662/93. Tem caráter interventivo e se utiliza do instrumental científico multidisciplinar das Ciencias Humanas, Biológicas e Sociais para análise e intervenções em situação de realidade social.',
    categoryId: 'estrutura',
    order: 2,
    createdAt: new Date('2024-01-19'),
    updatedAt: new Date('2024-01-19'),
  },
  {
    id: 'slide-006',
    title: 'Atribuições - Tiane Orleis Bittencourt',
    content: 'Responsável pelas categorias Sub-20, Sub-17 e Sub-15. Realiza entrevistas, visitas domiciliares, acompanhamento de treinos, grupos, contato com famílias, visitas e monitoramento da pensão, reuniões com famílias, confecção de documentação dos atletas.',
    categoryId: 'atribuicoes',
    order: 1,
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20'),
  },
];

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [filteredSlides, setFilteredSlides] = useState<Slide[]>(mockSlides);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    
    // Simular carregamento
    setTimeout(() => {
      if (activeCategory === 'all') {
        setFilteredSlides(mockSlides);
      } else {
        setFilteredSlides(mockSlides.filter(slide => slide.categoryId === activeCategory));
      }
      setLoading(false);
    }, 500);
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Serviço Social / Alojamento
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Apresentação Metodológica do Departamento
          </p>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg opacity-80 leading-relaxed">
              O trabalho do Assistente Social no esporte é uma nova área de atuação dedicada 
              a garantir os direitos da criança e do adolescente nas categorias de base do 
              Sport Club Internacional.
            </p>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <CategoryTabs 
        categories={mockCategories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {/* Content Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {activeCategory === 'all' 
                ? 'Todos os Slides' 
                : mockCategories.find(cat => cat.id === activeCategory)?.name
              }
            </h2>
            <p className="text-gray-600">
              {activeCategory === 'all' 
                ? `${filteredSlides.length} slides disponíveis`
                : mockCategories.find(cat => cat.id === activeCategory)?.description
              }
            </p>
          </div>

          {/* Slides Grid */}
          <SlideGrid slides={filteredSlides} loading={loading} />
        </div>
      </section>
    </div>
  );
}
