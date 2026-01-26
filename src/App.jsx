import React, { useState, useEffect, useRef } from 'react';
import { 
  Ruler, HardHat, FileCheck, Phone, ArrowRight, Building2, CheckCircle2, 
  Menu, X, ChevronDown, Instagram, Linkedin, Users, BrainCircuit, ShieldCheck, MapPin, Award, Star, Quote
} from 'lucide-react';

// --- DADOS DO SISTEMA (Baseados no PDF) ---

const TEAM_DETAILS = {
  tania: {
    name: "Tânia Albuquerque",
    role: "Sócia Proprietária",
    crea: "CREA-MG 95614/D",
    img: "/foto-tania.jpeg", // [SUBSTITUIR FOTO]
    bio: [
      "Engenheira Civil graduada pela UFMG (Ago/2007)",
      "Pós-Graduada em Estruturas (Jul/2012)",
      "18 anos de experiência no mercado ",
      "17 anos de experiência com projetos estruturais",
      "8 anos dedicados exclusivamente a parede de concreto"
    ]
  },
  thais: {
    name: "Thaís Albuquerque",
    role: "Sócia Proprietária",
    crea: "CREA-MG 229528/D",
    img: "/foto-thais.jpeg", // [SUBSTITUIR FOTO]
    bio: [
      "Engenheira Civil graduada pela PUC-MG (Jul/2017)",
      "Pós-Graduada em Gestão de Projetos (Jul/2020)",
      "12 anos de experiência no mercado",
      "6 anos de experiência com execução, gestão de processos e formas metálicas",
      "Expertise em manutenção, limpeza e controle de estoque de formas"
    ]
  }
};

const SERVICES_DETAILS = {
  modulacao: {
    title: "Projetos de Modulação de Formas",
    content: [
      "Modulação dos painéis de alumínio/aço e variações técnicas ",
      "Modulação dos acessórios de travamento e lista de peças completa",
      "Indicação clara de peças novas vs. utilizadas",
      "Cronograma de entrega e reuniões técnicas de apresentação"
    ]
  },
  estrutural: {
    title: "Projetos Estruturais - Parede de Concreto",
    content: [
      "Projeto da superestrutura em parede de concreto",
      "Cálculo e detalhamento das armações das paredes e lajes",
      "Projeto de fundação (cintas, blocos, lajão) com base no levantamento geotécnico",
      "Tabela de quantitativos precisa e emissão de ART"
    ]
  },
  consultoria: {
    title: "Consultoria Técnica e Executiva",
    content: [
      "Estudo de viabilidade estrutural e comparativos de métodos construtivos",
      "Análise de propostas comerciais para aquisição ou locação de formas",
      "Apoio técnico para execução e cuidados com a forma (limpeza e manutenção)",
      "Modelos de depreciação e gestão de ativo"
    ]
  },
  escadas: {
    title: "Projetos de Escadas em 3D",
    content: [
      "Detalhamento complexo de escadas para execução perfeita",
      "Otimização de peças e encaixes",
      "Visualização tridimensional para facilitar o entendimento da equipe de obra"
    ]
  },
  compatibilizacao: {
    title: "Compatibilização de Projetos",
    content: [
      "Integração total entre Arquitetura, Estrutura e Sistema de Formas",
      "Previsão de interferências antes da obra começar",
      "Garantia de que o projeto arquitetônico é executável no sistema de formas"
    ]
  },
  treinamento: {
    title: "Treinamentos Técnicos",
    content: [
      "Capacitação para equipes de projeto e obra",
      "Documentação de treinamento e processos executivos",
      "Foco em montagem, manuseio e preservação das formas"
    ]
  },
  viabilidade: {
    title: "Estudos de Viabilidade e Sequenciamento",
    content: [
      "Análise para sequenciar o ativo (forma) em múltiplos empreendimentos",
      "Adaptação de formas existentes para novas obras (Retrofit de forma)",
      "Planejamento de ciclo de concretagem"
    ]
  },
  alvenaria: {
    title: "Projetos Estruturais - Alvenaria",
    content: [
      "Projetos completos para alvenaria estrutural",
      "Detalhamento de fiadas e grauteamento",
      "Otimização de blocos e redução de desperdício"
    ]
  }
};

const PORTFOLIO_DETAILS = {
  'modulacao': {
    title: "Modulação de Parede",
    img: "/portfolio/modulacao-parede.jpg",
    desc: "Detalhamento para 1ª concretagem com precisão milimétrica e otimização de formas."
  },
  'escada': {
    title: "Escadas e Acessórios",
    img: "/portfolio/escada-3d.jpg",
    desc: "Projeto de tensores e otimização de peças para escadas complexas, garantindo execução perfeita."
  },
  'seguranca': {
    title: "Sistema de Segurança",
    img: "/portfolio/seguranca.jpg",
    desc: "Projetos de linha de vida e guarda-corpo com emissão de ART e total conformidade com normas."
  },
  'estrutural': {
    title: "Estrutural Parede Concreto",
    img: "/portfolio/estrutural.jpg",
    desc: "Cálculo de superestrutura e fundação otimizada para o sistema de parede de concreto."
  },
  'consultoria': {
    title: "Consultoria de Campo",
    img: "/portfolio/consultoria-tunel.jpg",
    desc: "Validação técnica in loco (Túnel de forma), ajustes de processos e otimização de estoque."
  },
  'pecaaluminio': {
    title: "Lista de Peças de alumínio",
    img: "/portfolio/peca-aluminio.jpg",
    desc: "Planilha com levantamento de itens e orçamentos para modulãção de forma com otimização de estoque."
  },
};

// --- COMPONENTES AUXILIARES ---

const Counter = ({ end, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        let start = 0;
        const duration = 2000; 
        const stepTime = Math.abs(Math.floor(duration / end));
        const timer = setInterval(() => {
          start += 1;
          setCount(start);
          if (start === end) clearInterval(timer);
        }, stepTime);
        observer.disconnect();
      }
    });
    if (ref.current) observer.observe(ref.current);
  }, [end]);

  return <span ref={ref} className="font-bold text-4xl md:text-5xl">{count}{suffix}</span>;
};

const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 py-4">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="flex justify-between items-center w-full text-left font-semibold text-slate-800 hover:text-haam-blue transition"
      >
        <span>{question}</span>
        <ChevronDown className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && <p className="mt-2 text-slate-600 text-sm leading-relaxed">{answer}</p>}
    </div>
  );
};

// Modal Genérico
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 relative animate-fade-in" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-800">
          <X size={24} />
        </button>
        <h3 className="text-2xl font-bold text-haam-blue mb-4 pr-8">{title}</h3>
        <div className="max-h-[70vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

// --- COMPONENTE PRINCIPAL ---

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const [activeModal, setActiveModal] = useState(null); // 'tania', 'thais', or serviceKey
  const [modalType, setModalType] = useState(null); // 'bio' or 'service'

  const whatsappLink = "https://wa.me/5531998153205"; 

  // Controle do Sticky CTA
  useEffect(() => {
    const handleScroll = () => {
      setShowStickyCTA(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openBio = (person) => {
    setModalType('bio');
    setActiveModal(person);
  };

  const openService = (serviceKey) => {
    setModalType('service');
    setActiveModal(serviceKey);
  };

  const closeModal = () => {
    setActiveModal(null);
    setModalType(null);
  };

  return (
    <div className="font-sans text-slate-800 bg-white">
      
      {/* --- STICKY CTA MOBILE --- */}
      <div className={`fixed bottom-0 left-0 w-full z-40 bg-white p-4 shadow-[0_-4px_10px_rgba(0,0,0,0.1)] md:hidden transition-transform duration-300 ${showStickyCTA ? 'translate-y-0' : 'translate-y-full'}`}>
        <a href={whatsappLink} className="flex items-center justify-center gap-2 w-full bg-green-600 text-white font-bold py-3 rounded-full shadow-lg pulse-animation">
          <Phone size={20} />
          Solicitar Proposta
        </a>
      </div>

      {/* --- HEADER --- */}
      <header className="bg-white shadow-md fixed w-full z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          {/* Logo (Substituir SRC) */}
          <div className="flex items-center gap-2 cursor-pointer">
            <img src="/logo-haam-colorida.png" alt="Logo HAAM Engenharia" className="h-12 w-auto" /> 
          </div>

          {/* Menu Desktop */}
          <nav className="hidden md:flex gap-8 text-sm font-semibold text-slate-600">
            <a href="#sobre" className="hover:text-haam-blue transition">Sobre Nós</a>
            <a href="#servicos" className="hover:text-haam-blue transition">Serviços</a>
            <a href="#projetos" className="hover:text-haam-blue transition">Projetos</a>
            <a href="#clientes" className="hover:text-haam-blue transition">Clientes</a>
            <a href="#faq" className="hover:text-haam-blue transition">Dúvidas</a>
          </nav>

          {/* CTA Header */}
          <a href={whatsappLink} className="hidden md:flex bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-full font-bold text-sm transition items-center gap-2 shadow-lg">
            <Phone size={16} />
            Agendar Reunião Técnica
          </a>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-slate-800" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t p-4 flex flex-col gap-4 shadow-xl absolute w-full">
            <a href="#sobre" className="text-lg font-medium" onClick={() => setIsMenuOpen(false)}>Sobre Nós</a>
            <a href="#servicos" className="text-lg font-medium" onClick={() => setIsMenuOpen(false)}>Serviços</a>
            <a href="#projetos" className="text-lg font-medium" onClick={() => setIsMenuOpen(false)}>Projetos</a>
            <a href="#clientes" className="text-lg font-medium" onClick={() => setIsMenuOpen(false)}>Clientes</a>
            <a href={whatsappLink} className="bg-green-600 text-white p-3 rounded text-center font-bold">Agendar no WhatsApp</a>
          </div>
        )}
      </header>

      {/* --- HERO SECTION --- */}
      <section className="pt-32 pb-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-700 to-slate-900"></div>
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-6 animate-slide-in-left">
            <div className="inline-block bg-haam-blue/20 text-blue-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-blue-500/30">
              Engenharia Especializada
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Integramos <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-white">Planejamento, Projeto e Execução.</span>
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed max-w-lg">
              Soluções focadas em parede de concreto com replicabilidade, viabilidade e eficiência para construtoras e incorporadoras.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a href={whatsappLink} className="bg-haam-red hover:bg-red-700 text-white px-8 py-4 rounded-md font-bold text-lg transition flex justify-center items-center gap-2 shadow-red-900/50 shadow-lg">
                Agendar Reunião Técnica <ArrowRight size={20} />
              </a>
            </div>
          </div>
          
          <div className="relative bg-white/5 border border-white/10 p-2 rounded-xl backdrop-blur-sm animate-slide-in-right">
             {/* [IMAGEM HERO] */}
            <div className="bg-slate-800 aspect-video rounded-lg overflow-hidden border border-slate-700">
               <img src="/hero-image-3d..webp" alt="Projeto 3D Parede de Concreto" className="w-full h-full object-cover opacity-80" />
            </div>
             <div className="absolute -bottom-6 -left-6 bg-white text-slate-900 p-4 rounded-lg shadow-xl border-l-4 border-haam-blue">
               <p className="text-sm font-bold flex items-center gap-2"><Award size={16} className="text-yellow-500"/> Certificação BNO 2025</p>
               <p className="text-xs text-slate-600">Profissional Extraordinário - Prata</p>
             </div>
          </div>
        </div>
      </section>

      {/* --- CONTADORES --- */}
      <section className="bg-haam-blue py-10 text-white">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-blue-500/30">
          <div>
            <Counter end={21} suffix="+" />
            <p className="text-blue-200 text-sm mt-1 uppercase tracking-wide">Clientes Ativos</p>
          </div>
          <div>
            <Counter end={90} suffix="+" />
            <p className="text-blue-200 text-sm mt-1 uppercase tracking-wide">Contratos Finalizados</p>
          </div>
          <div>
            <Counter end={18} suffix="+" />
            <p className="text-blue-200 text-sm mt-1 uppercase tracking-wide">Anos de Experiência </p>
          </div>
          <div>
            <Counter end={100} suffix="%" />
            <p className="text-blue-200 text-sm mt-1 uppercase tracking-wide">Foco em Parede de Concreto</p>
          </div>
        </div>
      </section>
{/* --- CLIENTES (Carrossel Infinito) --- */}
      <section className="py-12 bg-slate-50 border-b border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 mb-10">
          <p className="text-center text-slate-400 font-bold uppercase tracking-widest text-xs">
            Quem constrói com a HAAM
          </p>
        </div>

        {/* Container do Carrossel */}
        <div className="relative w-full overflow-hidden mask-linear-fade">
          {/* Wrapper que move */}
          <div className="flex w-max animate-infinite-scroll hover:[animation-play-state:paused]">
            
            {/* --- LISTA DE LOGOS (ORIGINAL) --- */}
            <div className="flex items-center gap-12 md:gap-24 px-6 md:px-12">
              {[
                "Tenda", "Direcional", "MRV", "Emccamp", "HM", 
                "Realiza", "RDR", "G3", "Emcorp", "LBX", 
                "Village", "Essence", "MC3", "CAC"
              ].map((cliente, index) => (
                <div key={index} className="flex items-center justify-center h-12 w-32 md:w-40 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer">
                  {/* Substitua os SRCS pelos arquivos reais ex: /clientes/tenda.png */}
                  <img 
                    src={`/clientes/${cliente.toLowerCase()}.png`} 
                    alt={`Logo ${cliente}`} 
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              ))}
            </div>

            {/* --- LISTA DE LOGOS (DUPLICADA PARA O LOOP) --- */}
            <div className="flex items-center gap-12 md:gap-24 px-6 md:px-12">
              {[
                "Tenda", "Direcional", "MRV", "Emccamp", "HM", 
                "Realiza", "RDR", "G3", "Emcorp", "LBX", 
                "Village", "Essence", "MC3", "CAC"
              ].map((cliente, index) => (
                <div key={`dup-${index}`} className="flex items-center justify-center h-12 w-32 md:w-40 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer">
                  <img 
                    src={`/clientes/${cliente.toLowerCase()}.png`} 
                    alt={`Logo ${cliente}`} 
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* --- SOBRE NÓS --- */}
      <section id="sobre" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              {/* [FOTO SÓCIAS] */}
              <div className="bg-slate-200 aspect-[4/5] rounded-lg shadow-2xl relative overflow-hidden group">
                <img src="/foto-socias.jpeg" alt="Tânia e Thais Albuquerque" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="font-bold text-lg">Tânia & Thais Albuquerque</p>
                  <p className="text-sm opacity-90">Sócias Proprietárias</p>
                </div>
              </div>
            </div>
            
            <div>
              <span className="text-haam-red font-bold uppercase tracking-wider text-sm">Nossa História</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-6">União de expertises: Escritório + Obra</h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                A HAAM nasceu em Setembro de 2023 para suprir a carência do mercado em modulação de formas assertiva. Fundada por <strong>Tânia Albuquerque</strong> e reforçada por <strong>Thais Albuquerque</strong>, integramos o conhecimento estrutural profundo com a visão prática de execução e canteiro.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <button onClick={() => openBio('tania')} className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200 hover:border-haam-blue hover:bg-blue-50 transition group text-left">
                  <div className="h-12 w-12 rounded-full overflow-hidden bg-slate-300 shrink-0">
                    <img src={TEAM_DETAILS.tania.img} alt="Tania" className="w-full h-full object-cover"/>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 group-hover:text-haam-blue">Conheça a Tânia</h4>
                    <p className="text-xs text-slate-500">Engenharia Estrutural</p>
                  </div>
                </button>

                <button onClick={() => openBio('thais')} className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200 hover:border-haam-blue hover:bg-blue-50 transition group text-left">
                  <div className="h-12 w-12 rounded-full overflow-hidden bg-slate-300 shrink-0">
                    <img src={TEAM_DETAILS.thais.img} alt="Thais" className="w-full h-full object-cover"/>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 group-hover:text-haam-blue">Conheça a Thais</h4>
                    <p className="text-xs text-slate-500">Gestão & Execução</p>
                  </div>
                </button>
              </div>

            <div className="space-y-4 mb-8">
                <div className="flex gap-4 items-start p-4 bg-slate-50 rounded-lg border border-slate-100">
                   <div className="bg-haam-blue/10 p-2 rounded text-haam-blue"><Users size={24} /></div>
                   <div>
                     <h4 className="font-bold text-slate-900">Presença no Mercado</h4>
                     <p className="text-sm text-slate-600">Participação ativa na <strong>ConstruirAi</strong> (Balneário Camboriú), <strong>ConstruNordeste</strong> (Salvador) e presença na <strong>Concrete Show</strong>.</p>
                   </div>
                </div>
              </div>

              {/* Destaque Certificação */}
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg flex items-start gap-3">
                 <Award className="text-yellow-600 shrink-0 mt-1" />
                 <div>
                   <h5 className="font-bold text-yellow-800">Destaque BNO 2025</h5>
                   <p className="text-sm text-yellow-700">Certificação Prata - Profissional Extraordinário</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- PARA QUEM É --- */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">Para quem é a HAAM Engenharia?</h2>
          <div className="grid md:grid-cols-3 gap-8">
             <div className="bg-slate-800 p-8 rounded-lg border border-slate-700 hover:border-haam-blue transition">
               <h3 className="text-xl font-bold mb-4 text-blue-400">Construtoras Minha Casa Minha Vida</h3>
               <p className="text-slate-300">Que buscam escala industrial e precisam de projetos que garantam a repetitividade.</p>
             </div>
             <div className="bg-slate-800 p-8 rounded-lg border border-slate-700 hover:border-haam-blue transition">
               <h3 className="text-xl font-bold mb-4 text-blue-400">Engenheiros de Obra</h3>
               <p className="text-slate-300">Que sofrem com projetos teóricos que não "conversam" com a realidade do canteiro.</p>
             </div>
             <div className="bg-slate-800 p-8 rounded-lg border border-slate-700 hover:border-haam-blue transition">
               <h3 className="text-xl font-bold mb-4 text-blue-400">Gestores de Ativos</h3>
               <p className="text-slate-300">Que precisam otimizar o uso, manutenção e a vida útil do estoque de formas.</p>
             </div>
          </div>
        </div>
      </section>

      {/* --- SERVIÇOS (Cards Clicáveis) --- */}
      <section id="servicos" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-10 text-center md:text-left">
             <span className="text-haam-blue font-bold uppercase tracking-wider text-sm">Áreas de Atuação</span>
             <h2 className="text-3xl font-bold text-slate-900 mt-2">Nossos Serviços</h2>
             <p className="text-slate-500 mt-2 text-sm md:hidden">Toque nos cards para ver detalhes</p>
          </div>

          <div className="flex overflow-x-auto md:grid md:grid-cols-4 gap-6 pb-8 snap-x snap-mandatory scroll-smooth p-2">
            {[
              { id: 'modulacao', title: "Modulação de Formas", icon: <Ruler /> },
              { id: 'estrutural', title: "Projetos Estruturais (Concreto)", icon: <Building2 /> },
              { id: 'consultoria', title: "Consultoria Técnica", icon: <HardHat /> },
              { id: 'compatibilizacao', title: "Compatibilização", icon: <FileCheck /> },
              { id: 'escadas', title: "Escadas em 3D", icon: <BrainCircuit /> },
              { id: 'viabilidade', title: "Estudos de Viabilidade", icon: <CheckCircle2 /> },
              { id: 'treinamento', title: "Treinamentos", icon: <Users /> },
              { id: 'alvenaria', title: "Projetos Alvenaria", icon: <Building2 /> },
            ].map((servico) => (
              <button 
                key={servico.id} 
                onClick={() => openService(servico.id)}
                className="min-w-[260px] md:min-w-0 bg-white p-6 rounded-xl border border-slate-200 shadow-card hover:shadow-lg hover:-translate-y-1 hover:border-haam-blue transition duration-300 snap-center text-left group"
              >
                <div className="text-haam-red mb-4 group-hover:scale-110 transition-transform">{servico.icon}</div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">{servico.title}</h3>
                <span className="text-sm text-haam-blue font-semibold flex items-center gap-1">Ver detalhes <ArrowRight size={14}/></span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* --- PROJETOS (Clicáveis com Zoom) --- */}
      <section id="projetos" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-2 text-center">Cases e Portfólio</h2>
          <p className="text-center text-slate-500 mb-10 text-sm">Clique nos projetos para ampliar a imagem</p>
          
          {/* Scroll horizontal no mobile */}
          <div className="flex overflow-x-auto md:grid md:grid-cols-3 gap-8 pb-6 snap-x snap-mandatory p-2">
            
            {Object.entries(PORTFOLIO_DETAILS).map(([key, item]) => (
              <button 
                key={key}
                onClick={() => {
                  setModalType('portfolio');
                  setActiveModal(key);
                }}
                className="min-w-[300px] bg-white rounded-lg shadow-md overflow-hidden snap-center border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-left group"
              >
                 <div className="h-56 bg-slate-200 overflow-hidden relative">
                   <img 
                     src={item.img} 
                     alt={item.title} 
                     className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                   />
                   {/* Ícone de Zoom no Hover */}
                   <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="bg-white/90 text-slate-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">Ver Ampliado</span>
                   </div>
                 </div>
                 <div className="p-6">
                   <h3 className="font-bold text-lg mb-2 text-slate-900 group-hover:text-haam-blue transition-colors">{item.title}</h3>
                   <p className="text-sm text-slate-600">{item.desc}</p>
                 </div>
              </button>
            ))}

          </div>
        </div>
      </section>

      {/* --- PARCEIROS (Novo) --- */}
      <section className="py-12 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-slate-400 font-bold uppercase tracking-widest text-xs mb-8">Empresas Parceiras</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            {/* [IMAGENS LOGOS PARCEIROS] - Substitua pelos arquivos reais */}
            <img src="/logos/rml.png" alt="RML" className="h-12 object-contain" />
            <img src="/logos/enpm.png" alt="ENPM" className="h-10 object-contain" />
            <img src="/logos/duo.png" alt="Duo" className="h-10 object-contain" />
            <img src="/logos/sf-formas.png" alt="SF Formas" className="h-12 object-contain" />
            <img src="/logos/septem.png" alt="Septem" className="h-10 object-contain" />
            <img src="/logos/soldas-fusion.png" alt="Soldas Fusion" className="h-10 object-contain" />
          </div>
        </div>
      </section>

      {/* --- DEPOIMENTOS (Novo) --- */}
      <section className="py-20 bg-haam-blue text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Quote size={48} className="text-blue-300 mx-auto mb-6 opacity-50" />
          <h2 className="text-2xl md:text-3xl font-bold mb-8">"O atendimento é o que recebemos maior elogio no dia a dia. Cumprimento de cronograma, organização e técnica."</h2>
          <div className="flex items-center justify-center gap-2">
            <Star className="text-yellow-400 fill-current" size={20} />
            <Star className="text-yellow-400 fill-current" size={20} />
            <Star className="text-yellow-400 fill-current" size={20} />
            <Star className="text-yellow-400 fill-current" size={20} />
            <Star className="text-yellow-400 fill-current" size={20} />
          </div>
          <p className="mt-4 text-blue-200">Feedback consolidado de clientes parceiros</p>
        </div>
      </section>

      {/* --- FAQ --- */}
      <section id="faq" className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Dúvidas Frequentes</h2>
          <div className="bg-gray-50 rounded-2xl p-6 md:p-10 border border-gray-100">
            <FaqItem 
              question="Onde a HAAM atende?" 
              answer="Atendemos em todo o território nacional (Brasil), com sede em Minas Gerais. Realizamos consultorias presenciais e projetos de forma remota com total eficiência." 
            />
            <FaqItem 
              question="Quando devo contratar a HAAM?" 
              answer="O ideal é na concepção do método construtivo ou quando você já usa parede de concreto e precisa adaptar formas para uma nova obra (sequenciamento de ativo)." 
            />
            <FaqItem 
              question="Vocês atendem todos os tipos de forma?" 
              answer="Sim! Temos expertise com os principais sistemas de formas (alumínio, aço) e fabricantes do mercado." 
            />
             <FaqItem 
              question="Quanto custa contratar a HAAM?" 
              answer="Nossos orçamentos são personalizados baseados na complexidade e metragem do projeto. Agende uma reunião rápida para entendermos sua necessidade." 
            />
          </div>
        </div>
      </section>

      {/* --- FOOTER (Claro) --- */}
      <footer className="bg-slate-100 text-slate-700 py-16 text-sm border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
             <div className="flex items-center gap-2 mb-4">
                <img src="/logo-haam-colorida.png" alt="HAAM" className="h-10" />
             </div>
             <p className="mb-6 max-w-sm text-slate-600">
               Especialistas em projetos estruturais e modulação de formas. Transformando a construção civil com técnica, viabilidade e eficiência.
             </p>
             <div className="flex gap-4">
               <a href="https://www.instagram.com/haam_engenharia/" target="_blank" className="bg-white border border-slate-200 p-2 rounded-full hover:bg-haam-red hover:text-white hover:border-haam-red transition"><Instagram size={20}/></a>
               <a href="https://www.linkedin.com/company/haamengenharia/" target="_blank" className="bg-white border border-slate-200 p-2 rounded-full hover:bg-haam-blue hover:text-white hover:border-haam-blue transition"><Linkedin size={20}/></a>
             </div>
          </div>
          
          <div>
            <h4 className="text-slate-900 font-bold mb-4 uppercase tracking-wider">Contato</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2"><Phone size={14} className="text-haam-blue"/> (31) 9 9815-3205 (Thais)</li>
              <li className="flex items-center gap-2"><Phone size={14} className="text-haam-blue"/> (31) 9 8718-8900 (Tânia)</li>
              <li className="hover:text-haam-blue transition cursor-pointer">haam_geral@outlook.com</li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 font-bold mb-4 uppercase tracking-wider">Serviços</h4>
            <ul className="space-y-2">
              <li>Modulação de Formas</li>
              <li>Projetos Estruturais</li>
              <li>Consultoria Técnica</li>
              <li>Treinamentos</li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 mt-12 pt-8 border-t border-slate-200 text-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} HAAM Engenharia. Todos os direitos reservados.</p>
        </div>
      </footer>

      {/* --- MODAL (POPUP ATUALIZADO) --- */}
      <Modal 
        isOpen={!!activeModal} 
        onClose={closeModal}
        // Se for portfólio, o título fica menor ou oculto se preferir, aqui mantivemos padrão
        title={
          modalType === 'bio' ? TEAM_DETAILS[activeModal]?.name : 
          modalType === 'service' ? SERVICES_DETAILS[activeModal]?.title :
          modalType === 'portfolio' ? PORTFOLIO_DETAILS[activeModal]?.title : ''
        }
      >
        {/* CONTEÚDO BIO (EQUIPE) */}
        {modalType === 'bio' && TEAM_DETAILS[activeModal] && (
          <div className="space-y-4">
            <p className="text-lg font-semibold text-slate-700">{TEAM_DETAILS[activeModal].role}</p>
            <p className="text-sm text-slate-500 bg-slate-100 inline-block px-2 py-1 rounded">{TEAM_DETAILS[activeModal].crea}</p>
            <ul className="space-y-2 mt-4">
              {TEAM_DETAILS[activeModal].bio.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-green-500 shrink-0 mt-1" />
                  <span className="text-slate-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* CONTEÚDO SERVIÇOS */}
        {modalType === 'service' && SERVICES_DETAILS[activeModal] && (
          <div className="space-y-4">
             <ul className="space-y-3">
              {SERVICES_DETAILS[activeModal].content.map((item, i) => (
                <li key={i} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                  <div className="h-2 w-2 bg-haam-blue rounded-full mt-2 shrink-0"></div>
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-4 border-t border-slate-100">
              <a href={whatsappLink} className="flex items-center justify-center gap-2 w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition">
                <Phone size={18} />
                Solicitar Orçamento Desse Serviço
              </a>
            </div>
          </div>
        )}

        {/* CONTEÚDO PORTFOLIO (IMAGEM GRANDE) */}
        {modalType === 'portfolio' && PORTFOLIO_DETAILS[activeModal] && (
          <div className="flex flex-col gap-4">
             <div className="rounded-lg overflow-hidden border border-slate-200 bg-slate-100">
                <img 
                  src={PORTFOLIO_DETAILS[activeModal].img} 
                  alt={PORTFOLIO_DETAILS[activeModal].title} 
                  className="w-full h-auto max-h-[60vh] object-contain mx-auto"
                />
             </div>
             <p className="text-slate-600 text-sm text-center">{PORTFOLIO_DETAILS[activeModal].desc}</p>
          </div>
        )}
      </Modal>

    </div>
  );
}

export default App;