"use client";

import { useState, useEffect, useRef } from "react";

function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, visible] as const;
}

const WHATSAPP = "https://wa.me/5541920512260";
const PHONE = "(41) 9 2051-2260";

const areas = [
  { num: "01", title: "Direito Penal e Processo Penal", desc: "Defesa técnica completa em todas as fases do processo criminal, do inquérito ao trânsito em julgado." },
  { num: "02", title: "Tribunal do Júri", desc: "Atuação especializada em crimes dolosos contra a vida, com plenária estratégica e tese de defesa sólida." },
  { num: "03", title: "Habeas Corpus", desc: "Impetração imediata para combater prisões ilegais e garantir o direito à liberdade." },
  { num: "04", title: "Audiência de Custódia", desc: "Atendimento imediato nas primeiras horas após a prisão, garantindo todos os direitos fundamentais." },
  { num: "05", title: "Inquéritos Policiais", desc: "Acompanhamento e defesa desde a fase investigativa, evitando abusos e construindo a melhor estratégia." },
  { num: "06", title: "Execução Penal", desc: "Defesa dos direitos do preso: progressão de regime, livramento condicional e benefícios legais." },
  { num: "07", title: "Lei de Drogas", desc: "Defesa em crimes de tráfico e uso, com distinção técnica entre traficante e usuário." },
  { num: "08", title: "Crimes Contra a Vida", desc: "Homicídio doloso e culposo, feminicídio, latrocínio — defesa especializada nos casos mais complexos." },
];

const allAreas = [
  { title: "Direito Penal e Processo Penal", desc: "Defesa completa em todas as fases do processo criminal, do inquérito policial até os recursos nos tribunais." },
  { title: "Tribunal do Júri", desc: "Atuação especializada nos julgamentos populares, com estratégia e oratória afiada para crimes dolosos contra a vida." },
  { title: "Habeas Corpus", desc: "Instrumento jurídico para garantir sua liberdade imediata em casos de prisão ilegal ou abusiva." },
  { title: "Audiência de Custódia", desc: "Defesa técnica na apresentação ao juiz após prisão em flagrante, buscando sua soltura com urgência." },
  { title: "Inquéritos Policiais", desc: "Acompanhamento e defesa desde a fase investigativa, antes mesmo do início da ação penal." },
  { title: "Execução Penal", desc: "Atuação no cumprimento da pena, buscando progressão de regime, livramento condicional e demais benefícios legais." },
  { title: "Lei de Drogas", desc: "Defesa em casos de porte e tráfico de entorpecentes, com análise criteriosa das provas e circunstâncias." },
  { title: "Crimes Contra a Vida", desc: "Defesa em homicídio, feminicídio e demais crimes dolosos perante o Tribunal do Júri." },
  { title: "Tráfico de Drogas", desc: "Estratégia jurídica sólida para garantir uma defesa justa e eficaz em casos de tráfico de drogas." },
  { title: "Latrocínio e Roubo", desc: "Defesa em crimes contra o patrimônio com resultado morte ou praticados com grave ameaça." },
];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [logoVisible, setLogoVisible] = useState(false);
  const [nameVisible, setNameVisible] = useState(false);
  const [lineVisible, setLineVisible] = useState(false);
  const [parasVisible, setParasVisible] = useState(false);
  const [photoY, setPhotoY] = useState(0);
  const [photoOpacity, setPhotoOpacity] = useState(1);
  const [activeArea, setActiveArea] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [areasTabOpen, setAreasTabOpen] = useState(false);
  const [openCard, setOpenCard] = useState<number | null>(null);
  const [formData, setFormData] = useState({ nome: "", email: "", telefone: "", mensagem: "" });
  const [sobreRef, sobreVisible] = useReveal();
  const [areasRef, areasVisible] = useReveal();
  const [contatoRef, contatoVisible] = useReveal();
  const [footerRef, footerVisible] = useReveal(0.05);

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    setTimeout(() => setLogoVisible(true), 150);
  }, []);

  useEffect(() => {
    const details = document.querySelectorAll<HTMLDetailsElement>(".areas-item-mobile");
    const handleToggle = (e: Event) => {
      const opened = e.target as HTMLDetailsElement;
      if (opened.open) {
        details.forEach((d) => { if (d !== opened) d.open = false; });
      }
    };
    details.forEach((d) => d.addEventListener("toggle", handleToggle));
    return () => details.forEach((d) => d.removeEventListener("toggle", handleToggle));
  }, []);

  useEffect(() => {
    if (nameVisible && !lineVisible) {
      const t = setTimeout(() => setLineVisible(true), 1400);
      return () => clearTimeout(t);
    }
  }, [nameVisible]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
      if (!nameVisible && window.scrollY >= window.innerHeight * 0.5) setNameVisible(true);
      const sobreEl2 = (sobreRef as React.MutableRefObject<HTMLElement | null>).current;
      if (!parasVisible && sobreEl2 && window.scrollY >= sobreEl2.offsetTop + sobreEl2.offsetHeight * 0.2) setParasVisible(true);
      const sobreEl = (sobreRef as React.MutableRefObject<HTMLElement | null>).current;
      const stopAt = sobreEl ? sobreEl.offsetTop + sobreEl.offsetHeight * 1.3 : 999999;
      const clampedScroll = Math.min(window.scrollY, stopAt);
      setPhotoY(clampedScroll * 0.6);

      if (sobreEl) {
        const sobreBottom = sobreEl.offsetTop + sobreEl.offsetHeight;
        const fadeStart = sobreBottom - 200;
        const fadeEnd = sobreBottom + 100;
        const opacity = 1 - Math.max(0, Math.min(1, (window.scrollY - fadeStart) / (fadeEnd - fadeStart)));
        setPhotoOpacity(opacity);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ color: "#fff", minHeight: "100vh", background: "#000000" }}>

      {/* NAVBAR */}
      <nav style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: scrolled ? "rgba(10,10,10,0.98)" : "#000000",
        borderBottom: "1px solid rgba(232,232,232,0.2)",
        backdropFilter: "blur(10px)",
        padding: "0 2rem",
        height: "68px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        transition: "background 0.3s",
      }}>
        {/* Logo */}
        <div style={{
          display: "flex", flexDirection: "column", lineHeight: 1.2,
          opacity: logoVisible ? 1 : 0,
          transform: logoVisible ? "translateX(0)" : "translateX(-30px)",
          transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
        }}>
          <span className="nav-logo-name" style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontWeight: "bold",
            fontSize: "1.2rem",
            letterSpacing: "0.05em",
            background: "linear-gradient(135deg, #E8E8E8, #F5F5F5)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            Douglas Miranda Tosi
          </span>
          <span className="nav-logo-sub" style={{
            fontFamily: "var(--font-inter), Arial, sans-serif",
            fontSize: "0.6rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#888",
          }}>
            Advogado Criminalista
          </span>
        </div>

        {/* Desktop Links */}
        <div style={{ display: "flex", gap: "2.5rem", alignItems: "center" }} className="nav-desktop">
          {[
            { label: "Início", href: "#inicio" },
            { label: "Sobre", href: "#sobre" },
            { label: "Áreas", href: "#areas" },
            { label: "Contato", href: "#contato" },
          ].map((l) => (
            <a key={l.label} href={l.href} className="nav-link">{l.label}</a>
          ))}
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: "linear-gradient(135deg, #E8E8E8, #F5F5F5)",
              color: "#000000",
              padding: "8px 22px",
              borderRadius: "2px",
              textDecoration: "none",
              fontFamily: "var(--font-inter), Arial, sans-serif",
              fontSize: "0.75rem",
              fontWeight: "bold",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Consulta Imediata
          </a>
        </div>

        {/* Mobile */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="nav-mobile-btn" style={{
          background: "none", border: "none", color: "#E8E8E8",
          fontSize: "1.5rem", cursor: "pointer", display: "none",
        }}>
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          position: "fixed", top: "104px", left: 0, right: 0, zIndex: 99,
          background: "#0f0f0f", borderBottom: "1px solid rgba(232,232,232,0.2)",
          padding: "1.5rem 2rem", display: "flex", flexDirection: "column", gap: "1.2rem",
        }}>
          {["Início", "Sobre", "Áreas", "Contato"].map((item) => (
            <a key={item} href={`#${item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`}
              className="nav-link" onClick={() => setMenuOpen(false)} style={{ fontSize: "1rem" }}>
              {item}
            </a>
          ))}
        </div>
      )}

      {/* HERO */}
      <section id="inicio" style={{
        minHeight: "90vh",
        position: "relative",
        overflow: "visible",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        {/* Foto — esquerda */}
        <div className="hero-photo-left" style={{
          position: "absolute",
          top: 0, left: "5%",
          bottom: 0,
          width: "45%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          zIndex: 1,
        }}>
          <img
            src="/carin.jpg"
            alt=""
            className="slide-from-left"
            style={{
              animationDelay: "0.2s",
              height: "100%",
              maxHeight: "90vh",
              width: "auto",
              objectFit: "contain",
              objectPosition: "bottom left",
              display: "block",
              maskImage: "linear-gradient(to left, transparent 0%, black 20%, black 70%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
              maskComposite: "intersect",
              WebkitMaskImage: "linear-gradient(to left, transparent 0%, black 20%, black 70%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
              WebkitMaskComposite: "source-in",
              filter: "brightness(0.7)",
            }}
          />
        </div>

        {/* Foto — direita */}
        <div className="hero-photo-right" style={{
          position: "absolute",
          top: 0, right: 0,
          height: "100%",
          width: "55%",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          zIndex: 3,
          pointerEvents: "none",
          opacity: 1,
          transform: `translateY(${photoY * 0.25}px)`,
        }}>
          {/* Overlay topo mobile */}
          <div className="hero-photo-right-top-overlay" style={{
            display: "none",
            position: "absolute",
            top: 0, left: 0, right: 0,
            height: "22%",
            background: "linear-gradient(to bottom, #000 0%, #000 30%, transparent 100%)",
            zIndex: 4,
            pointerEvents: "none",
          }} />
          <div className="photo-float" style={{ height: "100%", display: "flex", alignItems: "flex-end", justifyContent: "flex-end" }}>
          <img
            src="/doug.jpg"
            alt="Douglas Miranda Tosi"
            className="hero-photo-right-img slide-from-right"
            style={{
              height: "100%",
              maxHeight: "90vh",
              width: "auto",
              objectFit: "contain",
              objectPosition: "bottom right",
              display: "block",
              maskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
              maskComposite: "intersect",
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
              WebkitMaskComposite: "source-in",
              mixBlendMode: "lighten",
              filter: "brightness(0.85)",
            }}
          />
          </div>
        </div>

        {/* Texto — centro */}
        <div className="hero-text fade-up" style={{
          position: "relative",
          zIndex: 5,
          textAlign: "center",
          padding: "0 2rem",
          maxWidth: "680px",
          opacity: 0,
          ["--anim-delay" as string]: "0.3s",
        } as React.CSSProperties}>
          <div style={{
            display: "inline-block",
            width: "40px", height: "1px",
            background: "#E8E8E8",
            marginBottom: "1.5rem",
          }} />
          <h1 style={{
            lineHeight: 1.1,
            marginBottom: "1.2rem",
            fontFamily: "var(--font-josefin), sans-serif",
            letterSpacing: "0.08em",
            textAlign: "left",
            width: "100%",
          }}>
            <span className="word-move-1" style={{ fontSize: "clamp(1.2rem, 2vw, 2rem)", fontWeight: "100", color: "#bbb", display: "block", marginLeft: "4rem", textTransform: "uppercase" }}>
              Sua
            </span>
            <span className="word-move-2" style={{ fontSize: "clamp(4rem, 8vw, 8rem)", fontWeight: "100", color: "#fff", display: "block", marginLeft: "-0.5rem", letterSpacing: "0.05em", textTransform: "uppercase" }}>
              DEFESA
            </span>
            <span className="word-move-3" style={{ fontSize: "clamp(2rem, 4vw, 4rem)", fontWeight: "300", color: "#aaa", display: "block", marginLeft: "6rem", textTransform: "uppercase", letterSpacing: "0.15em" }}>
              CRIMINAL
            </span>
            <span className="word-move-2 word-comeca" style={{
              fontSize: "clamp(2.5rem, 5vw, 5rem)",
              fontWeight: "100",
              fontStyle: "italic",
              display: "block",
              marginLeft: "1rem",
              color: "#fff",
              letterSpacing: "0.06em",
            }}>
              começa aqui.
            </span>
          </h1>
          <div className="hero-btn-wrapper" style={{ display: "flex", gap: "1.2rem", flexWrap: "wrap", justifyContent: "center", alignItems: "center", marginTop: "7rem" }}>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
              className="hero-btn"
              style={{
                padding: "15px 36px",
                borderRadius: "2px",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                background: "#fff",
                color: "#000",
                fontFamily: "var(--font-josefin), sans-serif",
                fontSize: "0.78rem",
                fontWeight: "600",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                transition: "all 0.3s ease",
                boxShadow: "0 0 0 1px rgba(255,255,255,0.3)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "#000";
                el.style.color = "#fff";
                el.style.boxShadow = "0 0 0 1px rgba(255,255,255,0.8)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "#fff";
                el.style.color = "#000";
                el.style.boxShadow = "0 0 0 1px rgba(255,255,255,0.3)";
              }}
            >
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "currentColor", display: "inline-block", flexShrink: 0 }} />
              Falar com o Advogado
            </a>
          </div>
          <p className="hero-subtext" style={{
            color: "#666",
            fontSize: "0.8rem",
            lineHeight: 1.9,
            marginTop: "1.2rem",
            fontFamily: "var(--font-inter), Arial, sans-serif",
            fontWeight: "300",
            letterSpacing: "0.02em",
          }}>
            Pós-graduado em Direito Penal e Processo Penal.<br />
            Especialista em Tribunal do Júri. Atendimento ágil, defesa sólida e objetiva.
          </p>
        </div>

        {/* Botão mobile — Áreas de Atuação */}
        <button
          className="areas-tab-mobile"
          onClick={() => document.getElementById("areas")?.scrollIntoView({ behavior: "smooth" })}
          style={{
            display: "none",
            position: "absolute",
            left: "1rem", top: "55%",
            zIndex: 20,
            background: "rgba(15,15,15,0.92)",
            border: "1px solid rgba(232,232,232,0.25)",
            color: "#E8E8E8",
            padding: "8px 14px",
            cursor: "pointer",
            fontFamily: "var(--font-inter), Arial, sans-serif",
            fontSize: "0.6rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            borderRadius: "2px",
          }}
        >
          Áreas de Atuação
        </button>


        {/* Sidebar esquerda — serviços */}
        <div style={{
          position: "absolute",
          left: 0, top: 0, bottom: 0,
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          width: "260px",
          overflow: "hidden",
        }} className="hero-sidebar">

          {/* Label topo */}
          <div className="bar-drop" style={{
            padding: "1.2rem 1.2rem 0.8rem",
            borderLeft: "2px solid #E8E8E8",
            background: "rgba(10,10,10,0.85)",
            backdropFilter: "blur(8px)",
            animationDelay: "0.9s",
          }}>
            <div style={{
              fontSize: "0.6rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#E8E8E8",
              fontFamily: "var(--font-inter), Arial, sans-serif",
              marginBottom: "2px",
            }}>
              Áreas de Atuação
            </div>
            <div style={{
              width: "24px",
              height: "1px",
              background: "rgba(232,232,232,0.4)",
            }} />
          </div>

          {areas.map((area, i) => (
            <div
              key={i}
              className="sidebar-item bar-drop"
              style={{
                animationDelay: `${0.95 + (i + 1) * 0.12}s`,
                borderLeft: "2px solid rgba(232,232,232,0.2)",
                borderBottom: "1px solid rgba(232,232,232,0.08)",
                padding: "1.8rem 1.2rem",
                cursor: "default",
                transition: "all 0.3s ease",
                background: "rgba(10,10,10,0.6)",
                backdropFilter: "blur(8px)",
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.borderLeftColor = "#E8E8E8";
                el.style.background = "rgba(20,14,0,0.85)";
                const desc = el.querySelector(".sidebar-desc") as HTMLElement;
                if (desc) { desc.style.maxHeight = "80px"; desc.style.opacity = "1"; desc.style.marginTop = "0.5rem"; }
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.borderLeftColor = "rgba(232,232,232,0.2)";
                el.style.background = "rgba(10,10,10,0.6)";
                const desc = el.querySelector(".sidebar-desc") as HTMLElement;
                if (desc) { desc.style.maxHeight = "0"; desc.style.opacity = "0"; desc.style.marginTop = "0"; }
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <span style={{
                  color: "rgba(232,232,232,0.4)",
                  fontFamily: "var(--font-playfair), Georgia, serif",
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  minWidth: "20px",
                }}>
                  {area.num}
                </span>
                <span style={{
                  color: "#ccc",
                  fontFamily: "var(--font-inter), Arial, sans-serif",
                  fontSize: "0.8rem",
                  letterSpacing: "0.02em",
                }}>
                  {area.title}
                </span>
              </div>
              <div className="sidebar-desc" style={{
                maxHeight: "0",
                opacity: "0",
                overflow: "hidden",
                transition: "all 0.3s ease",
                marginTop: "0",
                color: "#888",
                fontSize: "0.75rem",
                lineHeight: 1.6,
                fontFamily: "var(--font-inter), Arial, sans-serif",
              }}>
                {area.desc}
              </div>
            </div>
          ))}
        </div>

        {/* Fade mobile — cobre a borda inferior do hero */}
        <div className="hero-bottom-fade" style={{
          display: "none",
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          height: "40%",
          background: "linear-gradient(to bottom, transparent 0%, #000 100%)",
          zIndex: 10,
          pointerEvents: "none",
        }} />
      </section>

      {/* WRAPPER COM VÍDEO DE FUNDO — a partir daqui */}
      <div style={{ position: "relative" }}>
        {/* Vídeo de fundo */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="fundo-video"
          style={{
            position: "absolute",
            top: "0%", left: "-8%",
            width: "135vw",
            height: "165vh",
            objectFit: "contain",
            objectPosition: "top left",
            zIndex: 0,
            maskImage: "none",
            WebkitMaskImage: "none",
          }}
        >
          <source src="/fundopaginad.mov" type="video/mp4" />
        </video>

        {/* Overlay desktop — fade todos os lados */}
        <div className="fundo-video-overlay-desktop" style={{ position: "absolute", top: 0, left: "-8%", width: "135vw", height: "165vh", zIndex: 1, pointerEvents: "none",
          background: "linear-gradient(to bottom, #000 0%, transparent 20%), linear-gradient(to top, #000 0%, transparent 20%), linear-gradient(to right, #000 0%, transparent 30%), linear-gradient(to left, #000 0%, #000 55%, transparent 95%)",
        }} />

        {/* Overlay mobile — fade borda direita e topo */}
        <div className="fundo-video-overlay" style={{ display: "none", position: "absolute", top: 0, left: "-10%", width: "60vw", height: "80vh", zIndex: 1, pointerEvents: "none",
          background: "linear-gradient(to bottom, #000 0%, transparent 30%), linear-gradient(to left, #000 0%, transparent 40%), linear-gradient(to right, #000 0%, transparent 90%)",
        }} />
        {/* Overlay mobile — fade borda baixo */}
        <div className="fundo-video-overlay-bottom" style={{ display: "none", position: "absolute", top: "50vh", left: 0, width: "60vw", height: "35vh", zIndex: 1, pointerEvents: "none",
          background: "linear-gradient(to top, #000 0%, transparent 100%)",
        }} />



      {/* SOBRE */}
      <section id="sobre" ref={sobreRef as React.Ref<HTMLElement>} style={{
        background: "transparent",
        padding: "120px 4rem 100px",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        paddingRight: "2rem",
      }} className="section-pad">
        {/* Vídeo da estátua — fundo mobile */}
        <video autoPlay loop muted playsInline className="sobre-estatua-video" style={{ display: "none" }}>
          <source src="/fundopaginad.mov" type="video/mp4" />
        </video>
        <div style={{
          maxWidth: "550px",
          width: "100%",
          textAlign: "center",
          position: "relative",
          marginLeft: "20%",
        }} className="sobre-content">
          {/* Drop cap title */}
          <div style={{
            marginBottom: "2rem",
            position: "relative",
            zIndex: 2,
            transform: nameVisible ? "translateX(0)" : "translateX(120vw)",
            transition: "transform 1.6s cubic-bezier(0.16,1,0.6,1)",
          }} className="sobre-name">
            <div style={{ display: "flex", alignItems: "flex-start", gap: "0" }}>
              <span style={{
                fontSize: "5rem",
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontWeight: "bold",
                lineHeight: 0.85,
                marginRight: "0.1em",
                background: "linear-gradient(135deg, #E8E8E8, #F5F5F5)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                float: "left",
              }}>D</span>
              <div>
                <div style={{
                  fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                  fontWeight: "bold",
                  color: "#fff",
                  fontFamily: "var(--font-playfair), Georgia, serif",
                }}>
                  ouglas Miranda Tosi
                </div>
                <div style={{
                  color: "#888",
                  fontFamily: "var(--font-inter), Arial, sans-serif",
                  fontSize: "0.85rem",
                  letterSpacing: "0.05em",
                  marginTop: "4px",
                }}>
                  Advogado Criminalista · Cuiabá – MT
                </div>
              </div>
            </div>
          </div>

          {/* Conteúdo abaixo do nome — na frente da foto */}
          <div style={{ position: "relative", zIndex: 5 }}>

          {/* Linha separadora */}
          <div className="sobre-linha" style={{
            height: "1px",
            background: "rgba(232,232,232,0.4)",
            width: lineVisible ? "100%" : "0%",
            transition: "width 0.35s cubic-bezier(0.22,1,0.36,1)",
            marginBottom: "2.5rem",
            marginLeft: "auto",
            marginRight: "auto",
          }} />

          {/* Two column text */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "3rem",
            overflow: "hidden",
          }} className="two-col">
            <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
              {[
                "Douglas Miranda Tosi é advogado criminalista com pós-graduação em Direito Penal e Processo Penal e especialização em Tribunal do Júri — as mais complexas e exigentes esferas do direito criminal.",
                "Membro da Comissão de Direito Penal e Processo Penal e da Comissão do Tribunal do Júri da OAB, além de Secretário-Geral da ANACRIM – Mato Grosso, atua com excelência técnica e dedicação integral à defesa criminal.",
              ].map((text, i) => (
                <p key={i} style={{
                  color: "#ccc",
                  lineHeight: 2,
                  fontSize: "0.92rem",
                  fontFamily: "var(--font-inter), Arial, sans-serif",
                  margin: 0,
                  opacity: lineVisible ? 1 : 0,
                  transform: lineVisible ? "translateY(0)" : "translateY(-20px)",
                  transition: "opacity 0.6s ease, transform 0.6s ease",
                  transitionDelay: "0.38s",
                }}>
                  {text}
                </p>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
              {[
                "Com atendimento ágil e acompanhamento próximo, garante que o cliente esteja sempre informado e amparado em cada etapa do processo — sem juridiquês, sem distância.",
                "Disponível fora do horário comercial para casos urgentes, porque quando a liberdade está em jogo, cada hora importa.",
              ].map((text, i) => (
                <p key={i} style={{
                  color: "#ccc",
                  lineHeight: 2,
                  fontSize: "0.92rem",
                  fontFamily: "var(--font-inter), Arial, sans-serif",
                  margin: 0,
                  opacity: lineVisible ? 1 : 0,
                  transform: lineVisible ? "translateY(0)" : "translateY(-20px)",
                  transition: "opacity 0.6s ease, transform 0.6s ease",
                  transitionDelay: "0.38s",
                }}>
                  {text}
                </p>
              ))}
            </div>
          </div>

          {/* Cards mobile */}
          {[
            { titulo: "Formação", texto: "Douglas Miranda Tosi é advogado criminalista com pós-graduação em Direito Penal e Processo Penal e especialização em Tribunal do Júri — as mais complexas e exigentes esferas do direito criminal." },
            { titulo: "Atuação", texto: "Membro da Comissão de Direito Penal e Processo Penal e da Comissão do Tribunal do Júri da OAB, além de Secretário-Geral da ANACRIM – Mato Grosso, atua com excelência técnica e dedicação integral à defesa criminal." },
            { titulo: "Atendimento", texto: "Com atendimento ágil e acompanhamento próximo, garante que o cliente esteja sempre informado e amparado em cada etapa do processo — sem juridiquês, sem distância." },
            { titulo: "Disponibilidade", texto: "Disponível fora do horário comercial para casos urgentes, porque quando a liberdade está em jogo, cada hora importa." },
          ].map((card, i) => (
            <details key={i} className="sobre-card-mobile" style={{ borderBottom: "1px solid rgba(232,232,232,0.05)" }}>
              <summary style={{
                color: "#E8E8E8", padding: "0.9rem 0", display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem",
                fontFamily: "var(--font-inter), Arial, sans-serif", fontSize: "0.65rem",
                letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", listStyle: "none",
              }}>
                {card.titulo} <span style={{ color: "#666" }}>+</span>
              </summary>
              <p style={{ color: "#888", fontSize: "0.65rem", lineHeight: 1.8, fontFamily: "var(--font-inter), Arial, sans-serif", margin: "0 0 0.9rem 0", textAlign: "left", animation: "cardOpen 0.6s ease forwards" }}>
                {card.texto}
              </p>
            </details>
          ))}

          {/* Qualificações */}
          <div className="sobre-qualif" style={{
            marginTop: "3.5rem",
            paddingTop: "2rem",
            borderTop: "none",
            marginLeft: "15%",
          }}>
            <div style={{
              fontSize: "0.85rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#888",
              fontFamily: "var(--font-inter), Arial, sans-serif",
              marginBottom: "1.8rem",
              opacity: sobreVisible ? 1 : 0,
              transition: "opacity 0.6s ease",
            }}>
              Formação &amp; Atuação
            </div>
            {[
              { num: "01", text: "Pós-Graduado em Direito Penal e Processo Penal" },
              { num: "02", text: "Especialista em Tribunal do Júri" },
              { num: "03", text: "Membro da Comissão de Direito Penal e Processo Penal — OAB" },
              { num: "04", text: "Membro da Comissão do Tribunal do Júri — OAB" },
              { num: "05", text: "Secretário-Geral da ANACRIM – Mato Grosso" },
            ].map((q, i) => (
              <div key={q.num} style={{
                display: "flex",
                alignItems: "center",
                gap: "1.2rem",
                padding: "1rem 0",
                borderBottom: "1px solid rgba(232,232,232,0.07)",
                opacity: sobreVisible ? 1 : 0,
                transform: sobreVisible ? "translateX(0)" : "translateX(-50px)",
                transition: "opacity 0.55s ease, transform 0.55s ease",
                transitionDelay: `${0.05 + i * 0.1}s`,
              }}>
                <span style={{
                  color: "rgba(232,232,232,0.25)",
                  fontFamily: "var(--font-playfair), Georgia, serif",
                  fontSize: "0.8rem",
                  fontWeight: "600",
                  minWidth: "22px",
                  flexShrink: 0,
                }}>
                  {q.num}
                </span>
                <div style={{
                  width: "18px",
                  height: "1px",
                  background: "rgba(232,232,232,0.25)",
                  flexShrink: 0,
                  opacity: sobreVisible ? 1 : 0,
                  transform: sobreVisible ? "scaleX(1)" : "scaleX(0)",
                  transformOrigin: "left",
                  transition: "opacity 0.4s ease, transform 0.4s ease",
                  transitionDelay: `${0.1 + i * 0.1}s`,
                }} />
                <span style={{
                  color: "#bbb",
                  fontFamily: "var(--font-inter), Arial, sans-serif",
                  fontSize: "0.9rem",
                  letterSpacing: "0.02em",
                  lineHeight: 1.5,
                  textAlign: "left",
                }}>
                  {q.text}
                </span>
              </div>
            ))}
          </div>

          </div>{/* fim wrapper zIndex 5 */}
        </div>
      </section>

      {/* FORMAÇÃO & ATUAÇÃO — mobile only */}
      <div className="mobile-qualif" style={{ display: "none", padding: "0 1.5rem 3rem" }}>
        <div style={{ fontSize: "0.85rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#888", fontFamily: "var(--font-inter), Arial, sans-serif", marginBottom: "1.8rem" }}>
          Formação &amp; Atuação
        </div>
        {[
          { num: "01", text: "Pós-Graduado em Direito Penal e Processo Penal" },
          { num: "02", text: "Especialista em Tribunal do Júri" },
          { num: "03", text: "Membro da Comissão de Direito Penal e Processo Penal — OAB" },
          { num: "04", text: "Membro da Comissão do Tribunal do Júri — OAB" },
          { num: "05", text: "Secretário-Geral da ANACRIM – Mato Grosso" },
        ].map((q) => (
          <div key={q.num} style={{ display: "flex", alignItems: "center", gap: "1.2rem", padding: "1rem 0", borderBottom: "1px solid rgba(232,232,232,0.07)" }}>
            <span style={{ color: "rgba(232,232,232,0.25)", fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "0.8rem", fontWeight: "600", minWidth: "22px" }}>{q.num}</span>
            <div style={{ width: "18px", height: "1px", background: "rgba(232,232,232,0.25)", flexShrink: 0 }} />
            <span style={{ fontFamily: "var(--font-inter), Arial, sans-serif", fontSize: "0.8rem", color: "#ccc" }}>{q.text}</span>
          </div>
        ))}
      </div>

      {/* ÁREAS */}
      <section id="areas" ref={areasRef as React.Ref<HTMLElement>} className="areas-section" style={{
        position: "relative",
        zIndex: 2,
        height: "700px",
        overflow: "hidden",
      }}>

        {/* Vídeo */}
        <video autoPlay loop muted playsInline className="areas-video" style={{
          position: "absolute",
          top: "50%", left: "60%",
          transform: "translate(-50%, -50%)",
          width: "50%",
          zIndex: 0,
          filter: "brightness(0.35) contrast(1.1)",
          pointerEvents: "none",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 100%)",
        }}>
          <source src="/marteli.mp4" type="video/mp4" />
        </video>

        {/* Tagline — posicionada livremente */}
        <div className="areas-tagline" style={{ position: "absolute", top: "15%", left: "10%", zIndex: 1, maxWidth: "480px" }}>
          <div className={`reveal reveal-slide-left ${areasVisible ? "revealed" : ""}`} style={{ display: "flex", alignItems: "flex-start", animationDelay: "0s" }}>
            <span style={{
              fontSize: "6rem", fontWeight: "bold", lineHeight: 0.85, marginRight: "0.05em",
              background: "linear-gradient(135deg, #E8E8E8, #F5F5F5)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              fontFamily: "var(--font-playfair), Georgia, serif",
            }}>V</span>
            <div style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: "bold", fontFamily: "var(--font-playfair), Georgia, serif" }}>
              ocê precisa de um advogado criminalista especializado?
            </div>
          </div>
          <p className={`reveal reveal-fade-rise areas-subtitle ${areasVisible ? "revealed" : ""}`} style={{ color: "#888", fontFamily: "var(--font-inter), Arial, sans-serif", fontSize: "0.9rem", lineHeight: 1.8, marginTop: "1.5rem", animationDelay: "0.15s" }}>
            Atuo em todas as áreas do Direito Penal, com foco total na proteção da sua liberdade e dos seus direitos.
          </p>
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
            className={`reveal reveal-fade-in areas-cta ${areasVisible ? "revealed" : ""}`}
            style={{
              display: "inline-block", marginTop: "2rem", marginLeft: "7rem", animationDelay: "0.25s",
              background: "linear-gradient(135deg, #E8E8E8, #F5F5F5)", color: "#000000",
              padding: "12px 28px", textDecoration: "none",
              fontFamily: "var(--font-inter), Arial, sans-serif",
              fontSize: "0.8rem", fontWeight: "bold", letterSpacing: "0.08em", textTransform: "uppercase",
            }}>
            Consultar Agora
          </a>
        </div>

        {/* Lista — posicionada livremente */}
        <div className="areas-list" style={{ position: "absolute", bottom: "9%", left: "2%", right: "2%", zIndex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "0" }}>
            {allAreas.map((area, i) => (
              <div key={area.title} className={`reveal reveal-slide-left areas-list-item ${areasVisible ? "revealed" : ""}`} style={{
                padding: "0.6rem 0.8rem",
                borderBottom: "1px solid rgba(232,232,232,0.06)",
                borderRight: i % 5 !== 4 ? "1px solid rgba(232,232,232,0.06)" : "none",
                transition: "background 0.2s", cursor: "default",
                animationDelay: `${i * 0.1}s`,
              }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(232,232,232,0.05)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
              >
                {/* Desktop */}
                <div className="areas-item-desktop" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ color: "#E8E8E8", fontSize: "0.6rem" }}>◆</span>
                  <span style={{ fontFamily: "var(--font-inter), Arial, sans-serif", fontSize: "0.78rem", color: "#aaa" }}>
                    {area.title}
                  </span>
                </div>
                {/* Mobile expandable */}
                <details className="areas-item-mobile" style={{ display: "none", width: "100%" }}>
                  <summary style={{ listStyle: "none", display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                    <span style={{ color: "#E8E8E8", fontSize: "0.6rem" }}>◆</span>
                    <span style={{ fontFamily: "var(--font-inter), Arial, sans-serif", fontSize: "0.78rem", color: "#ccc", flex: 1 }}>
                      {area.title}
                    </span>
                    <span className="areas-item-arrow" style={{ fontSize: "0.6rem", color: "#666", transition: "transform 0.3s" }}>▼</span>
                  </summary>
                  <p style={{ fontFamily: "var(--font-inter), Arial, sans-serif", fontSize: "0.72rem", color: "#888", lineHeight: 1.6, margin: "0.5rem 0 0.2rem 1.2rem" }}>
                    {area.desc}
                  </p>
                </details>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* VÍDEO MOBILE — marteli abaixo da seção áreas */}
      <div className="mobile-videos-block" style={{ display: "none" }}>
        <video autoPlay loop muted playsInline style={{
          width: "100%", display: "block",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
          filter: "brightness(0.5) contrast(1.1)",
        }}>
          <source src="/marteli.mp4" type="video/mp4" />
        </video>
      </div>

      {/* CONTATO */}
      <section id="contato" ref={contatoRef as React.Ref<HTMLElement>} style={{
        background: "transparent",
        borderTop: "none",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        minHeight: "600px",
        position: "relative",
        zIndex: 2,
      }} className="contact-grid">
        {/* Left — visual */}
        <div className="contato-left" style={{
          position: "relative",
          background: "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "4rem",
          overflow: "hidden",
          minHeight: "inherit",
        }}>
          {/* Foto mobile */}
          <div className="contato-photo-mobile" style={{ display: "none", position: "absolute", top: "60px", left: 0, right: 0, bottom: 0, backgroundImage: "url('/dougpostura.jpg')", backgroundSize: "cover", backgroundPosition: "center top", zIndex: 0 }} />
          <div className="contato-glow" style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse at center, rgba(255,102,0,0.1) 0%, transparent 70%)",
          }} />
          <div className={`reveal reveal-fade-in contato-content ${contatoVisible ? "revealed" : ""}`} style={{ position: "relative", zIndex: 1, textAlign: "center", animationDelay: "0s", display: "flex", flexDirection: "column", height: "100%" }}>
            <div style={{ fontSize: "6rem", marginBottom: "1.5rem" }} className="float-anim contato-emoji">⚖️</div>
            <div className="contato-titulo" style={{
              fontSize: "1.5rem",
              fontFamily: "var(--font-playfair), Georgia, serif",
              color: "#E8E8E8",
              marginBottom: "0.5rem",
            }}>
              Fale conosco
            </div>
            <p className="contato-subtitulo" style={{ color: "#888", fontFamily: "var(--font-inter), Arial, sans-serif", fontSize: "0.88rem", lineHeight: 1.7 }}>
              Entre em contato e receba<br />atendimento especializado
            </p>
            <div className="contato-info" style={{ marginTop: "2rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <div style={{ color: "#ccc", fontFamily: "var(--font-inter), Arial, sans-serif", fontSize: "0.88rem" }}>
                📱 {PHONE}
              </div>
              <div style={{ color: "#ccc", fontFamily: "var(--font-inter), Arial, sans-serif", fontSize: "0.88rem" }}>
                📍 Cuiabá – MT · Atendimento Nacional
              </div>
              <div style={{ color: "#ccc", fontFamily: "var(--font-inter), Arial, sans-serif", fontSize: "0.88rem" }}>
                🕐 Casos urgentes: 24 horas
              </div>
            </div>
          </div>
        </div>

        {/* Right — form */}
        <div style={{ padding: "5rem 4rem", display: "flex", flexDirection: "column", justifyContent: "center" }} className="form-pad">
          {/* Info mobile — aparece acima do form */}
          <div className="contato-info-mobile" style={{ display: "none", marginBottom: "2rem", textAlign: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <div style={{ color: "#ccc", fontFamily: "var(--font-inter), Arial, sans-serif", fontSize: "0.82rem" }}>📱 {PHONE}</div>
              <div style={{ color: "#ccc", fontFamily: "var(--font-inter), Arial, sans-serif", fontSize: "0.82rem" }}>📍 Cuiabá – MT · Atendimento Nacional</div>
              <div style={{ color: "#ccc", fontFamily: "var(--font-inter), Arial, sans-serif", fontSize: "0.82rem" }}>🕐 Casos urgentes: 24 horas</div>
            </div>
          </div>
          <h2 className={`reveal reveal-fade-up ${contatoVisible ? "revealed" : ""}`} style={{
            fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
            fontWeight: "bold",
            marginBottom: "0.5rem",
            animationDelay: "0.1s",
          }}>
            Entre em contato
          </h2>
          <p className={`reveal reveal-fade-rise ${contatoVisible ? "revealed" : ""}`} style={{ color: "#888", fontFamily: "var(--font-inter), Arial, sans-serif", fontSize: "0.88rem", marginBottom: "2.5rem", animationDelay: "0.2s" }}>
            Preencha o formulário e retornaremos o mais rápido possível.
          </p>

          <form onSubmit={(e) => { e.preventDefault(); window.open(WHATSAPP, "_blank"); }}
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[
              { key: "nome", placeholder: "Seu Nome", type: "text" },
              { key: "email", placeholder: "Seu E-mail", type: "email" },
              { key: "telefone", placeholder: "Telefone / WhatsApp", type: "tel" },
            ].map((f) => (
              <input key={f.key} type={f.type} placeholder={f.placeholder}
                value={formData[f.key as keyof typeof formData]}
                onChange={(e) => setFormData({ ...formData, [f.key]: e.target.value })}
                style={{
                  background: "transparent",
                  border: "none",
                  borderBottom: "1px solid rgba(232,232,232,0.3)",
                  padding: "12px 4px",
                  color: "#fff",
                  fontFamily: "var(--font-inter), Arial, sans-serif",
                  fontSize: "0.9rem",
                  outline: "none",
                  transition: "border-color 0.3s",
                }}
                onFocus={(e) => { e.target.style.borderBottomColor = "#E8E8E8"; }}
                onBlur={(e) => { e.target.style.borderBottomColor = "rgba(232,232,232,0.3)"; }}
              />
            ))}
            <textarea placeholder="Sua mensagem" rows={4}
              value={formData.mensagem}
              onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
              style={{
                background: "transparent",
                border: "none",
                borderBottom: "1px solid rgba(232,232,232,0.3)",
                padding: "12px 4px",
                color: "#fff",
                fontFamily: "var(--font-inter), Arial, sans-serif",
                fontSize: "0.9rem",
                outline: "none",
                resize: "none",
                transition: "border-color 0.3s",
              }}
              onFocus={(e) => { e.target.style.borderBottomColor = "#E8E8E8"; }}
              onBlur={(e) => { e.target.style.borderBottomColor = "rgba(232,232,232,0.3)"; }}
            />
            <button type="submit" style={{
              background: "linear-gradient(135deg, #E8E8E8, #F5F5F5)",
              color: "#000000",
              border: "none",
              padding: "14px",
              fontFamily: "var(--font-inter), Arial, sans-serif",
              fontSize: "0.85rem",
              fontWeight: "bold",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              cursor: "pointer",
              marginTop: "0.5rem",
              transition: "opacity 0.2s",
            }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.opacity = "0.85"; }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.opacity = "1"; }}
            >
              Enviar Mensagem →
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer ref={footerRef as React.Ref<HTMLElement>} style={{
        background: "transparent",
        borderTop: "none",
        padding: "4rem 4rem 0",
        position: "relative",
        zIndex: 2,
      }} className="footer-pad">
        <div style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1.5fr 1fr 1fr 1fr",
          gap: "3rem",
          paddingBottom: "3rem",
          borderBottom: "1px solid rgba(232,232,232,0.1)",
        }} className="footer-grid">

          {/* Brand */}
          <div className={`reveal reveal-fade-rise ${footerVisible ? "revealed" : ""}`} style={{ animationDelay: "0s" }}>
            <div style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontWeight: "500",
              fontSize: "1.1rem",
              background: "linear-gradient(135deg, #E8E8E8, #F5F5F5)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: "4px",
            }}>
              Douglas Miranda Tosi
            </div>
            <div style={{ color: "#666", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-inter), Arial, sans-serif", marginBottom: "1.2rem" }}>
              Advogado Criminalista
            </div>
            <p style={{ color: "#666", fontFamily: "var(--font-inter), Arial, sans-serif", fontSize: "0.8rem", lineHeight: 1.8 }}>
              Quando o que está em jogo é sua liberdade, presença e precisão fazem toda a diferença.
            </p>
          </div>

          {/* Contato */}
          <div className={`reveal reveal-fade-rise ${footerVisible ? "revealed" : ""}`} style={{ animationDelay: "0.1s" }}>
            <div style={{ color: "#E8E8E8", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-inter), Arial, sans-serif", marginBottom: "1rem" }}>Contato</div>
            {[
              `📱 ${PHONE}`,
              "📍 Cuiabá – MT",
              "🌎 Atendimento Nacional",
            ].map((c) => (
              <div key={c} style={{ color: "#777", fontFamily: "var(--font-inter), Arial, sans-serif", fontSize: "0.82rem", marginBottom: "0.5rem" }}>{c}</div>
            ))}
          </div>

          {/* Áreas */}
          <div className={`reveal reveal-fade-rise ${footerVisible ? "revealed" : ""}`} style={{ animationDelay: "0.15s" }}>
            <div style={{ color: "#E8E8E8", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-inter), Arial, sans-serif", marginBottom: "1rem" }}>Áreas</div>
            {["Direito Penal", "Tribunal do Júri", "Habeas Corpus", "Execução Penal", "Lei de Drogas"].map((a) => (
              <div key={a} style={{ color: "#777", fontFamily: "var(--font-inter), Arial, sans-serif", fontSize: "0.82rem", marginBottom: "0.5rem" }}>{a}</div>
            ))}
          </div>

          {/* Horários */}
          <div className={`reveal reveal-fade-rise ${footerVisible ? "revealed" : ""}`} style={{ animationDelay: "0.2s" }}>
            <div style={{ color: "#E8E8E8", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-inter), Arial, sans-serif", marginBottom: "1rem" }}>Horários</div>
            <div style={{ color: "#777", fontFamily: "var(--font-inter), Arial, sans-serif", fontSize: "0.82rem", lineHeight: 1.9 }}>
              Segunda – Sexta<br />08:00 – 18:00<br /><br />
              <span style={{ color: "#E8E8E8" }}>Casos urgentes: 24h</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={`reveal reveal-fade-in ${footerVisible ? "revealed" : ""}`} style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "1.5rem 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
          animationDelay: "0.3s",
        }}>
          <div style={{ color: "#555", fontFamily: "var(--font-inter), Arial, sans-serif", fontSize: "0.75rem" }}>
            © {new Date().getFullYear()} Douglas Miranda Tosi – Advogado Criminalista. OAB/MT.
          </div>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {["Início", "Sobre", "Áreas", "Contato"].map((l) => (
              <a key={l} href={`#${l.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`}
                style={{ color: "#555", fontFamily: "var(--font-inter), Arial, sans-serif", fontSize: "0.75rem", textDecoration: "none", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                {l}
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* Modal áreas de atuação */}
      {areasTabOpen && (
        <div
          onClick={() => setAreasTabOpen(false)}
          style={{
            position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 999,
            background: "rgba(0,0,0,0.6)",
            display: "flex", alignItems: "stretch", justifyContent: "flex-start",
          }}
        >
          <div onClick={(e) => e.stopPropagation()} style={{
            background: "rgba(10,10,10,0.98)",
            borderRight: "1px solid rgba(232,232,232,0.15)",
            width: "75vw",
            maxWidth: "280px",
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
          }}>
            {/* Header */}
            <div style={{
              padding: "1rem 1rem 0.6rem",
              borderLeft: "2px solid #E8E8E8",
              borderBottom: "1px solid rgba(232,232,232,0.08)",
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <div>
                <div style={{ fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#E8E8E8", fontFamily: "var(--font-inter), Arial, sans-serif", marginBottom: "4px" }}>
                  Áreas de Atuação
                </div>
                <div style={{ width: "24px", height: "1px", background: "rgba(232,232,232,0.4)" }} />
              </div>
              <button onClick={() => setAreasTabOpen(false)} style={{ background: "none", border: "none", color: "#666", fontSize: "1rem", cursor: "pointer", padding: "4px" }}>✕</button>
            </div>

            {/* Items */}
            {areas.map((area, i) => (
              <div key={i} style={{
                borderLeft: "2px solid rgba(232,232,232,0.2)",
                borderBottom: "1px solid rgba(232,232,232,0.08)",
                padding: "1rem",
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                minHeight: "52px",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  <span style={{ color: "rgba(232,232,232,0.4)", fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "0.7rem", fontWeight: "600", minWidth: "18px" }}>
                    {area.num}
                  </span>
                  <span style={{ color: "#ccc", fontFamily: "var(--font-inter), Arial, sans-serif", fontSize: "0.75rem", letterSpacing: "0.01em" }}>
                    {area.title}
                  </span>
                </div>
                <p style={{ color: "#666", fontSize: "0.65rem", lineHeight: 1.5, fontFamily: "var(--font-inter), Arial, sans-serif", margin: "0.4rem 0 0 1.6rem" }}>
                  {area.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Responsive */}
      <style>{`
        @media (max-width: 900px) {
          /* Nav */
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: block !important; }
          .areas-tab-mobile { display: none !important; }
          .nav-logo-name { font-size: 0.95rem !important; -webkit-text-fill-color: #E8E8E8 !important; color: #E8E8E8 !important; }
          .nav-logo-sub { font-size: 0.5rem !important; }

          /* Hero — mantém layout desktop, só escala */
          #inicio { min-height: 100vw !important; overflow: visible !important; }
          #sobre { z-index: 5 !important; }
          .hero-photo-right { z-index: 2 !important; }
          .hero-photo-right-img { -webkit-mask-image: linear-gradient(to bottom right, transparent 0%, black 35%, black 65%, transparent 85%) !important; mask-image: linear-gradient(to bottom right, transparent 0%, black 35%, black 65%, transparent 85%) !important; }
          .hero-sidebar { display: none !important; }
          .hero-photo-left {
            width: 80% !important;
            top: 0 !important;
            bottom: 0 !important;
            left: -8% !important;
            opacity: 0.55 !important;
            -webkit-mask-image: radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 100%) !important;
            mask-image: radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 100%) !important;
            pointer-events: none !important;
            z-index: 1 !important;
          }
          .hero-photo-right {
            width: 70% !important;
            top: 0 !important;
            right: -18% !important;
            opacity: 0.8 !important;
            pointer-events: none !important;
          }
          .photo-float { animation: none !important; }
          .hero-photo-right-img {
            -webkit-mask-image: linear-gradient(to right, transparent 0%, black 30%, black 35%, transparent 100%), linear-gradient(to top, transparent 0%, black 30%) !important;
            mask-image: linear-gradient(to right, transparent 0%, black 30%, black 35%, transparent 100%), linear-gradient(to top, transparent 0%, black 30%) !important;
            -webkit-mask-composite: source-in !important;
            mask-composite: intersect !important;
          }
          .hero-text {
            padding: 0 1rem !important;
            max-width: 100% !important;
          }
          .word-move-1 { font-size: 0.7rem !important; }
          .word-move-2 { font-size: clamp(2rem, 11vw, 3.2rem) !important; font-weight: 700 !important; }
          .word-move-3 { font-size: clamp(1rem, 4.5vw, 1.5rem) !important; }
          .word-comeca { font-size: clamp(1.3rem, 6vw, 2rem) !important; }
          .hero-btn { padding: 6px 12px !important; font-size: 0.45rem !important; letter-spacing: 0.08em !important; }
          .hero-btn-wrapper { margin-top: 1rem !important; justify-content: flex-start !important; }
          .hero-subtext { font-size: 0.6rem !important; margin-top: 11rem !important; }

          /* Sobre */
          .sobre-name { transform: none !important; transition: none !important; width: fit-content !important; margin-left: auto !important; margin-top: -5rem !important; margin-right: -1rem !important; }
          .sobre-name span { margin-top: -0.3em !important; margin-right: -0.3em !important; font-size: 2.8rem !important; }
          .sobre-name > div > div > div:first-child { font-size: 1rem !important; }
          .sobre-name > div > div > div:last-child { font-size: 0.6rem !important; }
          .sobre-content { padding: 40px 1.5rem 40px !important; margin-left: 0 !important; }
          #sobre { overflow: visible !important; }
          .sobre-linha { display: none !important; }
          .hero-bottom-fade { display: none !important; }
          .hero-photo-right-top-overlay { display: block !important; }
          .two-col { display: none !important; }

          /* Áreas */
          .areas-section { height: auto !important; padding: 40px 1.5rem 30px !important; display: flex !important; flex-direction: column !important; gap: 1.5rem !important; }
          .areas-tagline { position: relative !important; top: auto !important; left: auto !important; max-width: 100% !important; }
          .areas-tagline a { margin-left: 0 !important; }
          .areas-list { position: relative !important; bottom: auto !important; left: auto !important; right: auto !important; }
          .areas-list > div { grid-template-columns: 1fr !important; }
          .areas-list-item { border-right: none !important; }
          .areas-video-overlay { display: none !important; }
          .areas-video {
            position: absolute !important; top: 120px !important; left: 0 !important;
            transform: none !important; width: 100% !important; height: 350px !important;
            object-fit: cover !important;
            filter: brightness(0.35) contrast(1.1) !important;
            -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 10%, black 85%, transparent 100%) !important;
            mask-image: linear-gradient(to bottom, transparent 0%, black 10%, black 85%, transparent 100%) !important;
            z-index: 0 !important;
          }
          .areas-tagline { order: 1 !important; position: relative !important; z-index: 2 !important; margin-top: -20px !important; }
          .areas-tagline { display: flex !important; flex-direction: column !important; }
          .areas-subtitle { order: 3 !important; margin-top: 3rem !important; }
          .areas-cta { order: 2 !important; margin-top: 11.5rem !important; margin-left: auto !important; margin-right: auto !important; display: block !important; text-align: center !important; background: rgba(255,255,255,0.04) !important; backdrop-filter: blur(6px) !important; -webkit-backdrop-filter: blur(6px) !important; border: 1px solid rgba(255,255,255,0.2) !important; color: #E8E8E8 !important; }
          .areas-list { order: 3 !important; position: relative !important; z-index: 2 !important; margin-top: 2.5rem !important; background-size: cover !important; background-position: center top !important; border-radius: 4px !important; overflow: hidden !important; }
          .areas-section { min-height: 500px !important; }
          .sobre-estatua-video {
            display: block !important;
            position: absolute !important; top: 3% !important; left: -14% !important;
            width: 90% !important; height: 420px !important;
            object-fit: cover !important; object-position: center top !important;
            filter: brightness(0.45) contrast(1.1) !important;
            -webkit-mask-image: linear-gradient(to right, black 95%, transparent 100%), linear-gradient(to bottom, black 70%, transparent 100%) !important;
            mask-image: linear-gradient(to right, black 95%, transparent 100%), linear-gradient(to bottom, black 70%, transparent 100%) !important;
            -webkit-mask-composite: source-in !important;
            mask-composite: intersect !important;
            z-index: 0 !important; pointer-events: none !important;
          }
          .areas-list-item { animation-duration: 0.5s !important; }
          .areas-item-desktop { display: none !important; }
          .areas-item-mobile { display: block !important; }
          details[open] .areas-item-arrow { transform: rotate(180deg); }
          @keyframes photoSlideIn { from { opacity: 0; transform: scaleX(-1) translateX(-30%); } to { opacity: 1; transform: scaleX(-1) translateX(-10%); } }
          @keyframes photoFloat { 0%, 100% { transform: scaleX(-1) translateX(-10%) scale(1); } 50% { transform: scaleX(-1) translateX(-12%) scale(1.03); } }
          .areas-list::before { content: '' !important; position: absolute !important; inset: 0 !important; background-image: url('/dougskin.jpg') !important; background-size: cover !important; background-position: center top !important; z-index: 0 !important; animation: photoSlideIn 1s ease-out forwards, photoFloat 8s ease-in-out 1s infinite !important; }
          .areas-list::after { content: '' !important; position: absolute !important; inset: 0 !important; background: linear-gradient(to bottom, #000 0%, transparent 20%, transparent 50%, #000 90%), linear-gradient(to left, #000 0%, transparent 40%) !important; z-index: 1 !important; pointer-events: none !important; }
          .areas-list { position: relative !important; }
          .areas-list-item { position: relative !important; z-index: 2 !important; }

          /* Contato */
          .contact-grid { grid-template-columns: 1fr !important; }
          .form-pad { padding: 2rem 1.5rem 1.5rem !important; }
          .contato-photo-mobile { display: block !important; }
          .contato-glow { display: none !important; }
          .contato-emoji { display: none !important; }
          .contato-left { height: 460px !important; min-height: unset !important; padding: 1.5rem 1rem !important; overflow: hidden !important; align-items: flex-start !important; justify-content: flex-start !important; }
          .contato-left::after { content: '' !important; position: absolute !important; bottom: 0 !important; left: 0 !important; right: 0 !important; height: 40% !important; background: linear-gradient(to bottom, transparent, #000) !important; z-index: 1 !important; pointer-events: none !important; }
          .contato-left::before { content: '' !important; position: absolute !important; inset: 0 !important; background: linear-gradient(to bottom, #000 0%, #000 15%, transparent 50%), linear-gradient(to right, #000 0%, transparent 35%), linear-gradient(to left, #000 0%, transparent 35%) !important; z-index: 2 !important; pointer-events: none !important; }
          .contato-content { background: transparent !important; position: absolute !important; inset: 0 !important; z-index: 3 !important; display: flex !important; flex-direction: column !important; justify-content: flex-start !important; align-items: center !important; padding: 0.3rem 1rem 0 !important; }
          .contato-info { display: none !important; }
          .contato-info-mobile { display: block !important; }

          /* Footer */
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
          .footer-pad { padding: 3rem 1.5rem 0 !important; }
          .section-pad { padding: 60px 1.5rem !important; }
          .fundo-video-overlay { display: none !important; }
          .fundo-video-overlay-bottom { display: none !important; }
          .fundo-video-overlay-desktop { display: none !important; }
          .fundo-video { display: none !important; }
          .mobile-videos-block { display: none !important; }
          .mobile-qualif { display: block !important; }
        }
        @media (min-width: 901px) {
          .nav-mobile-btn { display: none !important; }
          .sobre-card-mobile { display: none !important; }
          .hero-photo-right { transform: none !important; }
        }
        @media (max-width: 900px) {
          .sobre-card-mobile { width: calc(100% + 3rem) !important; margin-left: -1.5rem !important; margin-right: -1.5rem !important; padding-left: 1.5rem !important; padding-right: 1.5rem !important; box-sizing: border-box !important; }
          .sobre-card-mobile:first-of-type { margin-top: 6rem !important; }
          .sobre-qualif { display: none !important; }
          .sobre-card-mobile summary { font-size: 0.75rem !important; padding: 0.6rem 0 !important; justify-content: center !important; gap: 0.5rem !important; }
          .sobre-card-mobile p { font-size: 0.75rem !important; }
        }
        @keyframes cardOpen {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 600px) {
          .footer-grid { grid-template-columns: 1fr !important; }
          .service-card { display: none !important; }
          .areas-list > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
      </div>{/* fim wrapper vídeo */}
    </div>
  );
}
