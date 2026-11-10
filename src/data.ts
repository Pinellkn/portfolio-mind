export const ME = {
  first: "Pinel",
  name: "Pinel LOKONON",
  nick: "PINEL",
  mono: "PL",
  code: "PL-001",
  city: "ABOMEY-CALAVI",
  country: "BJ",
  tz: "Africa/Porto-Novo",
  place: "Abomey-Calavi · Maria-Gléta, Bénin",
  email: "lokononpinel@gmail.com",
  whatsapp: "+229 01 65 25 32 79",
  waUrl: "https://wa.me/2290165253279",
  tel: "+229 01 42 05 14 99",
  telUrl: "tel:+2290142051499",
  linkedin: "https://www.linkedin.com/in/pinel-lokonon-665610416",
  github: "https://github.com/pinellkn",
  cv: "/assets/CV_Pinel_LOKONON_2026.pdf",
  portrait: "/assets/me/pinel-costume.jpg",
  portrait2: "/assets/me/pinel-1.jpg",
  title: "Développeur Fullstack Web & Mobile",
  availability: "Disponible : missions freelance, emploi ou stage professionnel",
  bio: "Développeur passionné et rigoureux, je travaille sur des applications web et mobiles, de la conception à la mise en ligne. Je m'investis autant dans mes projets personnels que dans le travail en équipe, avec une attention particulière à la qualité du code et à la résolution des problèmes techniques. J'accompagne également des apprenants et partage mes connaissances avec des explications concrètes.",
  story:
    "Passé par HECM Calavi puis Beta2 Afrique Technologies, j'ai appris à construire des applications complètes de bout en bout, du modèle de données à l'expérience mobile.",
  languages: "Français : courant · Anglais : débutant · Fon et nago : courants",
  interests: "Jeux · Lecture · Musique",
};

export type Project = {
  id: string;
  name: string;
  kind: string;
  tagline: string;
  status?: "live" | "wip";
  role: string;
  problem: string;
  stack: string[];
  highlights: string[];
  images: string[];
  liveUrl?: string;
  cats: string[];
  metrics?: { k: string; v: string }[];
};

const im = (d: string, n: number, ext: string) =>
  Array.from({ length: n }, (_, i) => `/assets/projects/${d}/${d}-${i + 1}.${ext}`);

export const PROJECTS: Project[] = [
  {
    id: "acadpay",
    name: "AcadPay",
    kind: "ACADEMIC PLATFORM",
    tagline:
      "Plateforme complète de gestion académique : 5 portails web, app mobile Flutter et paiements intégrés.",
    status: "live",
    role: "Développeur Fullstack · projet de fin d'études (HECM)",
    problem:
      "Digitaliser tout le cycle académique et financier d'une université : inscriptions, scolarité, comptabilité, admin, pour étudiants, secrétaires, comptables, directeurs et superadmins.",
    stack: ["PHP natif", "MySQL", "Flutter / Dart", "REST API", "FedaPay"],
    highlights: [
      "5 portails web dédiés (étudiant, secrétaire, comptable, directeur, superadmin)",
      "App mobile Flutter : paiement FedaPay via WebView, avatar builder, upload de documents",
      "API REST + base MySQL structurée pour la scolarité complète",
      "Projet de soutenance validé, proposition de commercialisation à HECM",
    ],
    images: im("acadpay", 5, "png"),
    liveUrl: "https://acadpay-xu70.onrender.com",
    cats: ["Web", "Mobile", "Backend"],
    metrics: [
      { k: "5", v: "portails web dédiés" },
      { k: "1", v: "app mobile Flutter" },
      { k: "3", v: "opérateurs de paiement mobile" },
      { k: "✓", v: "soutenance validée (HECM)" },
    ],
  },
  {
    id: "fripay",
    name: "FriPay",
    kind: "MOBILE MONEY APP",
    tagline: "Application de mobile money inter-opérateurs : MTN, Moov et Celtiis dans une seule app.",
    status: "wip",
    role: "Développeur Fullstack · projet en équipe (web, mobile, API)",
    problem:
      "Au Bénin, envoyer de l'argent d'un opérateur à un autre reste compliqué et coûteux. FriPay relie les portefeuilles, affiche les frais avant validation et sécurise les transferts par QR code.",
    stack: ["Flutter / Dart", "React / TanStack Start", "Laravel (microservices)", "PHP (API gateway)", "MySQL", "QR code signé"],
    highlights: [
      "Projet réalisé en équipe (travail collaboratif sur le web, le mobile et l'API)",
      "App mobile Flutter portée à l'identique depuis la version web : transferts, recharge, retrait, factures, portefeuilles, historique, plaintes",
      "Backend en 3 microservices Laravel (utilisateurs, paiements, administration) derrière une API gateway",
      "Inscription avec OTP et code PIN, paiement de factures (eau, électricité, forfaits)",
      "Audit de l'API réalisé et corrigé, analyse Flutter sans aucune erreur",
    ],
    images: im("fripay", 6, "jpg"),
    cats: ["Mobile", "Web", "Backend"],
  },
  {
    id: "allopharm",
    name: "AllôPharm",
    kind: "HEALTH PLATFORM",
    tagline: "Plateforme de réservation de médicaments en pharmacie : « Un clic, un prix, un sachet prêt ».",
    status: "wip",
    role: "Développeur Fullstack",
    problem:
      "En zone rurale, les patients parcourent 20 à 40 km pour découvrir qu'un médicament est en rupture. AllôPharm permet de vérifier la disponibilité et le prix, puis de réserver avant de se déplacer.",
    stack: ["React / TanStack Start", "Tailwind CSS", "Laravel", "MySQL", "REST API", "Vercel / Render"],
    highlights: [
      "Recherche de médicaments tolérante aux fautes d'orthographe, avec prix et stock par officine",
      "Réservation avec code de retrait / ticket, suivi par code ou par numéro de téléphone",
      "Espaces officine par rôle : pharmacien, caissier et manager",
      "Backend Laravel : import de stock, expiration automatique des réservations, notifications et journal d'activité",
    ],
    images: im("allopharm", 4, "jpg"),
    liveUrl: "https://allopharm.vercel.app",
    cats: ["Web", "Backend"],
  },
  {
    id: "edugest",
    name: "EduGest-Plus",
    kind: "SCHOOL MANAGEMENT",
    tagline: "Application de gestion scolaire complète, de l'inscription au bulletin trimestriel.",
    status: "wip",
    role: "Développeur Fullstack",
    problem:
      "Un établissement secondaire (6ème → Terminale) gérait inscriptions, notes, paiements et bulletins à la main. EduGest-Plus centralise tout et calcule automatiquement moyennes et classements.",
    stack: ["React / TanStack Start", "Tailwind CSS", "Laravel 12", "Laravel Sanctum", "MySQL", "REST API"],
    highlights: [
      "5 rôles : secrétariat, comptabilité, enseignants, direction et parents",
      "Saisie des notes avec moyennes, rangs de classe et rangs de promotion recalculés à chaque saisie",
      "Comptabilité par tranches, génération de reçus et suivi du recouvrement",
      "Bulletins trimestriels et espace parent sécurisé par code d'accès",
      "Fonctionne aussi hors connexion, sur le poste de l'école",
    ],
    images: im("edugest", 5, "jpg"),
    cats: ["Web", "Backend"],
  },
  {
    id: "lbc",
    name: "LBC — Tout le Bénin en un clic",
    kind: "LOCAL DIRECTORY",
    tagline: "Plateforme numérique du Bénin : entreprises, emplois & stages, actualités et démarches utiles.",
    status: "live",
    role: "Développeur Fullstack (web + mobile)",
    problem:
      "Les informations locales (entreprises, offres, démarches administratives) sont dispersées. LBC les regroupe au même endroit, avec recherche, filtres et assistant IA.",
    stack: ["React", "Vite", "TanStack Router", "Tailwind CSS", "Flutter / Dart", "Vercel"],
    highlights: [
      "Annuaire des entreprises avec filtres par secteur, commune et statut de vérification",
      "Offres d'emploi, stages et alternances filtrables par type et niveau d'études",
      "Fil d'actualités multi-sources et guide des démarches du quotidien",
      "Site déployé sur Vercel + application mobile Flutter associée",
    ],
    images: im("lbc", 4, "jpg"),
    liveUrl: "https://lbclboncoin.vercel.app",
    cats: ["Web", "Mobile"],
  },
  {
    id: "klebe",
    name: "Klébé Plan Pro",
    kind: "WHATSAPP ASSISTANT",
    tagline: "Assistant WhatsApp qui gère les rendez-vous d'un DG et envoie les rappels automatiquement.",
    status: "wip",
    role: "Développeur Backend · projet d'équipe (5 personnes)",
    problem:
      "Un dirigeant rate des rendez-vous faute de rappels fiables. Klébé planifie les rendez-vous avec son équipe et envoie des rappels WhatsApp à J-1, le jour même et 15 minutes avant.",
    stack: ["Laravel", "MySQL", "REST API", "React / TanStack Start", "WhatsApp", "Scheduler / Cron"],
    highlights: [
      "Projet réalisé en équipe de 5 personnes : ma contribution porte sur le back-end",
      "Ma part : données et API des rendez-vous (modèle multi-tenant, endpoints REST)",
      "MySQL choisi pour les accès concurrents multi-tenant et le planificateur de rappels",
      "Interface : rendez-vous, messages, gestion d'équipe et suivi du quota de messages",
      "Travail en sprint avec 2 développeurs front et un collègue back-end",
    ],
    images: im("klebe", 4, "jpg"),
    cats: ["Backend", "Web"],
  },
  {
    id: "veloce",
    name: "Veloce / Vogue Motors",
    kind: "CAR MARKETPLACE",
    tagline: "Plateforme de vente de véhicules avec authentification sécurisée et paiement en ligne.",
    status: "live",
    role: "Développeur Fullstack",
    problem:
      "Construire un marketplace véhicules fiable, avec un flux d'auth sécurisé et un checkout robuste : deux versions successives du backend pour valider l'architecture.",
    stack: ["Node.js", "SQLite (node:sqlite)", "Supabase", "Google OAuth (PKCE)", "FedaPay"],
    highlights: [
      "Auth Google OAuth avec flow PKCE",
      "Backend refactoré : Supabase → SQLite natif node:sqlite",
      "Paiement FedaPay pour l'achat de véhicules",
      "Interface responsive et déployée en production",
    ],
    images: im("veloce", 5, "png"),
    liveUrl: "https://veloce-vogue-motors.onrender.com/",
    cats: ["Web", "Backend"],
  },
  {
    id: "ong",
    name: "ONG Nature & Compassion",
    kind: "DONATION SITE",
    tagline: "Site vitrine solidaire avec dons en ligne pour un client réel.",
    status: "wip",
    role: "Développeur Fullstack · mission client (Mme LAWANI)",
    problem:
      "Donner à une ONG une vitrine crédible et un canal de dons en ligne fiable, tout en gérant l'ensemble du cycle client (devis, développement, livraison).",
    stack: ["PHP", "MySQL", "FedaPay"],
    highlights: [
      "Site PHP responsive orienté conversion",
      "Intégration FedaPay pour les dons en ligne",
      "Panel admin pour la gestion du contenu",
      "Gestion complète du cycle client : devis → livraison",
    ],
    images: im("ong", 5, "png"),
    cats: ["Web", "Backend"],
  },
  {
    id: "beta2",
    name: "Beta2 Afrique Technologies",
    kind: "INSTITUTIONAL SITE",
    tagline: "Site vitrine institutionnel pour un centre de formation en informatique & électronique.",
    status: "live",
    role: "Développeur Frontend · stage Beta2",
    problem:
      "Présenter clairement l'offre de formation, les événements et les tarifs (étudiants / lycéens) dans un site rapide et cohérent avec l'identité visuelle blanc / bleu / orange.",
    stack: ["HTML", "CSS", "JavaScript"],
    highlights: [
      "Design cohérent blanc / bleu / orange",
      "Présentation structurée des formations",
      "Gestion des événements et grille tarifaire",
      "Déployé en production via GitHub Pages",
    ],
    images: im("beta2", 3, "png"),
    liveUrl: "https://pinellkn.github.io/beta2/",
    cats: ["Web"],
  },
  {
    id: "cool-cariba",
    name: "Cool Cariba",
    kind: "RESTAURANT SITE",
    tagline: "Refonte d'un site restaurant avec menu réel et interface soignée.",
    status: "wip",
    role: "Développeur Fullstack",
    problem:
      "Refondre un site restaurant existant pour lui donner un menu à jour, une navigation claire et un rendu moderne sur mobile comme sur desktop.",
    stack: ["PHP", "HTML", "CSS"],
    highlights: [
      "Refonte complète de l'expérience",
      "Menu réel structuré et éditable",
      "Design responsive orienté restauration",
    ],
    images: im("cool-cariba", 3, "jpg"),
    cats: ["Web", "Backend"],
  },
];

export const CAPS: [string, string, string][] = [
  ["01", "FRT", "Frontend (React, TanStack, TypeScript)"],
  ["02", "MOB", "Mobile (Flutter / Dart)"],
  ["03", "BCK", "Backend & API (PHP, Laravel, Node.js)"],
  ["04", "DBS", "Databases (MySQL, SQLite, PostgreSQL)"],
  ["05", "DEV", "Tools & Cloud (Git, Vercel, Render)"],
  ["06", "UIX", "UI / Product (Tailwind CSS, client delivery)"],
];

export const CREDITS: [string, string[]][] = [
  ["FRONTEND", ["AllôPharm", "EduGest-Plus", "FriPay", "LBC", "Klébé Plan Pro", "Beta2"]],
  ["MOBILE", ["FriPay", "AcadPay", "LBC"]],
  ["BACKEND", ["AcadPay", "AllôPharm", "EduGest-Plus", "FriPay", "Klébé Plan Pro", "Veloce", "ONG Nature & Compassion"]],
  ["DATABASES", ["MySQL · AcadPay", "SQLite · Veloce", "Supabase / PostgreSQL · Veloce"]],
  ["DEVOPS", ["Vercel", "Render", "GitHub Pages", "Git & GitHub"]],
  ["PRODUCT", ["Cool Cariba", "ONG Nature & Compassion", "Veloce", "Paiements FedaPay", "OTP / PIN"]],
];

export const SKILLS: [string, string[]][] = [
  ["Backend", ["PHP natif", "Laravel (Sanctum, microservices)", "Node.js", "API REST", "Auth OAuth / PKCE", "OTP / PIN"]],
  ["Frontend", ["React", "TanStack Start / Router", "TypeScript", "HTML5 / CSS3", "TailwindCSS", "JavaScript ES6+"]],
  ["Mobile", ["Flutter / Dart", "Java", "Android Studio", "WebView natif", "Paiements mobiles", "Apps connectées à une API REST", "QR code"]],
  ["Bases de données", ["MySQL", "PostgreSQL", "SQLite (node:sqlite)", "Supabase"]],
  ["Outils & intégrations", ["Git & GitHub", "FedaPay", "Google OAuth", "Vercel", "Render", "VS Code"]],
  ["Soft skills", ["Gestion client", "Livraison en autonomie", "Travail en équipe", "Transmission des connaissances", "Rigueur produit"]],
];

export const EXPS = [
  {
    role: "Développeur — stage en équipe à distance",
    org: "Benidev Studio",
    period: "Juillet 2026 — aujourd'hui",
    points: ["Projets en équipe : Fripay, Klébé, Pointage…", "Développement web et mobile ; API et données"],
  },
  {
    role: "Enseignant en développement web et mobile",
    org: "Beta2 Afrique Technologie — stage professionnel",
    period: "17 août — 17 octobre 2026",
    points: ["Cours auprès des apprenants du centre de formation", "Explications concrètes et accompagnement des apprenants"],
  },
  {
    role: "Développeur Fullstack & Backend",
    org: "Projets 2026 — FriPay, AllôPharm, EduGest-Plus, LBC, Klébé Plan Pro",
    period: "2026 — présent",
    points: [
      "Apps mobiles Flutter et microservices Laravel (paiement mobile, API gateway, OTP / PIN)",
      "Plateformes locales : santé (réservation en pharmacie), éducation (notes et bulletins), emploi",
      "Travail en équipe sur FriPay et Klébé Plan Pro (équipe de 5 ; ma part : données et API des rendez-vous)",
    ],
  },
  {
    role: "Stagiaire Développeur",
    org: "Beta2 Afrique Technologie",
    period: "Févr. — mai 2026 · Juin — août 2025",
    points: [
      "Applications web, bases de données et site institutionnel (HTML/CSS/JS)",
      "Design cohérent blanc / bleu / orange, mobile-first",
      "Mise en ligne et itérations avec l'équipe pédagogique",
    ],
  },
  {
    role: "Développeur Fullstack — Projet de fin d'études",
    org: "AcadPay — HECM",
    period: "2024 — 2026",
    points: [
      "Conception d'une plateforme complète : 5 portails web + app Flutter",
      "Backend PHP natif, base MySQL, API REST, paiement FedaPay",
      "Soutenance validée, proposition de commercialisation à HECM",
    ],
  },
  {
    role: "Développeur freelance",
    org: "Missions clients — Nature & Compassion, Cool Cariba, Veloce",
    period: "2025 — présent",
    points: [
      "Cycle client complet : devis, développement, livraison",
      "Intégration paiements FedaPay et auth Google OAuth (PKCE)",
      "Sites livrés en production, itérations avec retours clients",
    ],
  },
];

export const FORMS = [
  {
    role: "Licence en Système informatique et logiciel",
    org: "HECM, Calavi Arconville",
    period: "2024 — 2026",
    points: ["Entrée pendant l'année universitaire 2023–2024", "Projet de fin d'études : AcadPay · soutenance validée"],
  },
  { role: "Baccalauréat série D", org: "CEG 1 Pobè", period: "2022", points: [] as string[] },
];
