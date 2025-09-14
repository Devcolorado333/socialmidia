import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import dotenv from "dotenv";

dotenv.config({ path: "../.env.local" });

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const categories = [
  { id: "introducao", nome: "Introdução", ordem: 1, descricao: "Apresentação do Departamento" },
  { id: "estrutura", nome: "Estrutura Organizacional", ordem: 2, descricao: "Organograma e Atuação" },
  { id: "atribuicoes", nome: "Atribuições da Equipe", ordem: 3, descricao: "Funções dos Assistentes Sociais" },
  { id: "registros", nome: "Registros de Ações", ordem: 4, descricao: "Material informativo e Campanhas" },
  { id: "alojamento", nome: "Alojamento", ordem: 5, descricao: "Informações sobre o alojamento" },
  { id: "parcerias", nome: "Parcerias", ordem: 6, descricao: "Parcerias e Colaborações" },
  { id: "acoes", nome: "Ações Realizadas", ordem: 7, descricao: "Eventos e atividades realizadas" },
  { id: "projetos", nome: "Projetos Futuros", ordem: 8, descricao: "Planos e iniciativas futuras" },
  { id: "consideracoes", nome: "Considerações Finais", ordem: 9, descricao: "Conclusão e agradecimentos" },
];

async function populateCategories() {
  console.log("Iniciando a população da coleção 'categorias'...");
  for (const category of categories) {
    try {
      await addDoc(collection(db, "categorias"), category);
      console.log(`Categoria '${category.nome}' adicionada com sucesso.`);
    } catch (e) {
      console.error(`Erro ao adicionar categoria '${category.nome}':`, e);
    }
  }
  console.log("População da coleção 'categorias' concluída.");
}

populateCategories();


