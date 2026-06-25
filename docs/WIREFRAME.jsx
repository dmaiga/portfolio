import { useState } from "react";

const PAGES = ["Home", "Projets", "Projet détail", "About", "Contact"];

// ── Primitives ──────────────────────────────────────────────────────────────

const Box = ({ w = "100%", h = 12, label = "", className = "", style = {} }) => (
  <div
    className={`flex items-center justify-center rounded text-xs font-mono text-slate-400 border border-dashed border-slate-300 bg-slate-100 ${className}`}
    style={{ width: w, height: `${h * 4}px`, ...style }}
  >
    {label}
  </div>
);

const Label = ({ children, size = "xs", muted = false }) => (
  <p className={`font-mono text-${size} uppercase tracking-widest ${muted ? "text-slate-400" : "text-slate-500"} mb-1`}>
    {children}
  </p>
);

const Divider = () => <div className="border-t border-dashed border-slate-200 my-4" />;

const Tag = ({ children }) => (
  <span className="inline-block border border-slate-300 text-slate-400 font-mono text-xs px-2 py-0.5 rounded mr-1">
    {children}
  </span>
);

const Annotation = ({ children }) => (
  <p className="text-xs text-blue-400 font-mono mt-1 pl-2 border-l-2 border-blue-200">{children}</p>
);

// ── Nav ──────────────────────────────────────────────────────────────────────

const Nav = () => (
  <div className="flex items-center justify-between px-6 py-3 border-b border-dashed border-slate-300 bg-white mb-6">
    <div className="font-mono text-sm text-slate-600">M. Maiga</div>
    <div className="flex gap-6">
      {["Réalisations", "About", "Contact"].map(l => (
        <span key={l} className="font-mono text-xs text-slate-400">{l}</span>
      ))}
    </div>
  </div>
);

// ── Pages ────────────────────────────────────────────────────────────────────

const HomePage = () => (
  <div>
    <Nav />
    <div className="px-6 space-y-6">

      {/* Hero — deux colonnes */}
      <div>
        <Label>Hero</Label>
        <div className="flex gap-4">
          {/* Colonne gauche sticky */}
          <div className="w-1/3 space-y-3">
            <Box h={8} label="Photo / Avatar" />
            <div className="space-y-1">
              <div className="h-5 bg-slate-200 rounded w-3/4" />
              <div className="h-3 bg-slate-100 rounded w-1/2" />
            </div>
            <div className="space-y-1">
              <div className="h-2 bg-slate-100 rounded w-full" />
              <div className="h-2 bg-slate-100 rounded w-5/6" />
              <div className="h-2 bg-slate-100 rounded w-4/6" />
            </div>
            <Annotation>Titre → compétence, pas intitulé</Annotation>
            {/* Démarche ici */}
            <Divider />
            <Label muted>Démarche</Label>
            <div className="space-y-1">
              <div className="h-2 bg-slate-100 rounded w-full" />
              <div className="h-2 bg-slate-100 rounded w-5/6" />
              <div className="h-2 bg-slate-100 rounded w-4/6" />
            </div>
            <Annotation>Owner → Dev · artefacts repo → lien GitHub</Annotation>
            <Divider />
            <div className="flex gap-2">
              <Box h={5} w="45%" label="GitHub" />
              <Box h={5} w="45%" label="LinkedIn" />
            </div>
          </div>

          {/* Colonne droite — projets mis en avant */}
          <div className="w-2/3 space-y-3">
            <Label muted>Réalisations récentes</Label>
            {[1, 2, 3].map(i => (
              <div key={i} className="border border-dashed border-slate-300 rounded p-3 space-y-1">
                <div className="flex items-center gap-2">
                  <Tag>Professional</Tag>
                  <div className="h-2 bg-slate-200 rounded w-1/3" />
                </div>
                <div className="h-3 bg-slate-200 rounded w-2/3" />
                <div className="h-2 bg-slate-100 rounded w-full" />
                <div className="h-2 bg-slate-100 rounded w-5/6" />
                <div className="flex gap-1 mt-1">
                  <Tag>Django</Tag><Tag>PostgreSQL</Tag>
                </div>
              </div>
            ))}
            <Annotation>Carte = problème résolu · rôle · contexte · tech</Annotation>
            <Box h={6} label="→ Voir toutes les réalisations" className="border-solid border-slate-300 bg-white text-slate-500" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ProjectsPage = () => (
  <div>
    <Nav />
    <div className="px-6 space-y-4">
      <Label>Réalisations</Label>

      {/* Filtre */}
      <div className="flex gap-2">
        {["Tous", "Professional", "Consulting", "Academic", "Personal"].map(f => (
          <span key={f} className={`font-mono text-xs px-3 py-1 rounded border border-dashed border-slate-300 ${f === "Tous" ? "bg-slate-200 text-slate-600" : "text-slate-400"}`}>
            {f}
          </span>
        ))}
      </div>
      <Annotation>Filtre par contexte — pas par techno en priorité</Annotation>

      <Divider />

      {/* Grille projets */}
      <div className="grid grid-cols-2 gap-4">
        {[
          { badge: "Professional", role: "Référent technique · Architecte" },
          { badge: "Consulting", role: "Développeur solo" },
          { badge: "Academic", role: "Data Engineer" },
          { badge: "Personal", role: "Owner + Dev" },
        ].map(({ badge, role }, i) => (
          <div key={i} className="border border-dashed border-slate-300 rounded p-4 space-y-2">
            <Tag>{badge}</Tag>
            <div className="h-3 bg-slate-200 rounded w-3/4" />   {/* titre */}
            <div className="text-xs font-mono text-slate-400">{role}</div>
            <div className="h-2 bg-slate-100 rounded w-full" />
            <div className="h-2 bg-slate-100 rounded w-5/6" />   {/* accroche problème */}
            <Divider />
            <div className="flex gap-1 flex-wrap">
              <Tag>Python</Tag><Tag>Django</Tag><Tag>dbt</Tag>
            </div>
          </div>
        ))}
      </div>
      <Annotation>Pas d'image seule — le texte porte le sens</Annotation>
    </div>
  </div>
);

const ProjectDetailPage = () => (
  <div>
    <Nav />
    <div className="px-6">
      <div className="flex gap-6">

        {/* Colonne gauche — ancre sticky */}
        <div className="w-1/4 space-y-2 sticky top-4 self-start">
          <Label>Sur cette page</Label>
          {["Résumé", "Contexte", "Problème", "Solution", "Résultats", "Technologies", "Approfondir"].map(s => (
            <div key={s} className="font-mono text-xs text-slate-400 py-1 border-l-2 border-slate-200 pl-2 hover:border-blue-300 hover:text-slate-600 cursor-pointer">
              {s}
            </div>
          ))}
          <Divider />
          <Box h={5} label="↗ GitHub" className="border-solid bg-white text-slate-500" />
          <Box h={5} label="↗ Démo" className="border-solid bg-white text-slate-500" />
        </div>

        {/* Colonne droite — contenu */}
        <div className="w-3/4 space-y-5">

          {/* En-tête */}
          <div className="space-y-2">
            <div className="flex gap-2 items-center">
              <Tag>Professional</Tag>
              <span className="font-mono text-xs text-slate-400">2023 – présent</span>
            </div>
            <div className="h-6 bg-slate-200 rounded w-2/3" /> {/* titre H1 */}
            <div className="h-3 bg-slate-100 rounded w-1/2" /> {/* rôle */}
          </div>

          <Divider />

          {/* Résumé */}
          <div>
            <Label>Résumé</Label>
            <div className="space-y-1">
              <div className="h-2 bg-slate-100 rounded w-full" />
              <div className="h-2 bg-slate-100 rounded w-5/6" />
              <div className="h-2 bg-slate-100 rounded w-4/6" />
            </div>
            <Annotation>Parle à tout le monde · 2–3 lignes max</Annotation>
          </div>

          {/* Cover */}
          <Box h={24} label="Cover image / screenshot principal" />

          {/* Contexte */}
          <div>
            <Label>Contexte — état des lieux initial</Label>
            <div className="space-y-1">
              <div className="h-2 bg-slate-100 rounded w-full" />
              <div className="h-2 bg-slate-100 rounded w-5/6" />
            </div>
            <Annotation>L'avant — pose le contraste avec la solution</Annotation>
          </div>

          {/* Problème */}
          <div>
            <Label>Problème</Label>
            <div className="space-y-1">
              <div className="h-2 bg-slate-100 rounded w-full" />
              <div className="h-2 bg-slate-100 rounded w-4/6" />
            </div>
          </div>

          {/* Solution */}
          <div>
            <Label>Solution</Label>
            <div className="space-y-1">
              <div className="h-2 bg-slate-100 rounded w-full" />
              <div className="h-2 bg-slate-100 rounded w-5/6" />
              <div className="h-2 bg-slate-100 rounded w-3/6" />
            </div>
          </div>

          {/* Résultats */}
          <div>
            <Label>Résultats</Label>
            <div className="grid grid-cols-3 gap-3">
              {["Résultat 1", "Résultat 2", "Résultat 3"].map(r => (
                <div key={r} className="border border-dashed border-slate-300 rounded p-2 text-center">
                  <div className="h-4 bg-slate-200 rounded w-1/2 mx-auto mb-1" />
                  <div className="h-2 bg-slate-100 rounded w-3/4 mx-auto" />
                </div>
              ))}
            </div>
            <Annotation>Chiffres ou énoncés d'impact — pas de métriques décoratives</Annotation>
          </div>

          {/* Technologies */}
          <div>
            <Label>Technologies</Label>
            <div className="flex gap-1 flex-wrap">
              {["Python", "Django", "PostgreSQL", "dbt", "Docker", "GitHub Actions"].map(t => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          </div>

          <Divider />

          {/* Approfondir */}
          <div>
            <Label>Approfondir</Label>
            <Annotation>Visible uniquement si des artefacts existent pour ce projet</Annotation>
            <div className="grid grid-cols-2 gap-3 mt-2">
              <Box h={8} label="Architecture (schéma)" />
              <Box h={8} label="Schéma BDD" />
              <Box h={8} label="Sprint / Décisions" />
              <Box h={8} label="Document TDR / CDC" />
            </div>
            <Annotation>Rendu inline (Markdown / PDF) · Téléchargeable si voulu</Annotation>
          </div>

          <Divider />

          {/* Galerie */}
          <div>
            <Label>Galerie</Label>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5].map(i => (
                <Box key={i} h={14} label={`Asset ${i}`} />
              ))}
            </div>
          </div>

          <Divider />

          {/* Navigation entre projets */}
          <div className="flex justify-between">
            <Box h={8} w="45%" label="← Projet précédent" className="border-solid bg-white text-slate-500" />
            <Box h={8} w="45%" label="Projet suivant →" className="border-solid bg-white text-slate-500" />
          </div>

        </div>
      </div>
    </div>
  </div>
);

const AboutPage = () => (
  <div>
    <Nav />
    <div className="px-6">
      <div className="flex gap-6">

        {/* Colonne gauche */}
        <div className="w-1/3 space-y-4 sticky top-4 self-start">
          <Box h={20} label="Photo" />
          <div className="space-y-1">
            <div className="h-4 bg-slate-200 rounded w-3/4" />
            <div className="h-2 bg-slate-100 rounded w-1/2" />
          </div>
          <Divider />
          <div className="flex gap-2">
            <Box h={6} w="45%" label="GitHub" />
            <Box h={6} w="45%" label="LinkedIn" />
          </div>
          <Box h={6} label="Télécharger CV" className="border-solid bg-white text-slate-500" />
        </div>

        {/* Colonne droite */}
        <div className="w-2/3 space-y-5">

          <div>
            <Label>Qui suis-je</Label>
            <div className="space-y-1">
              <div className="h-2 bg-slate-100 rounded w-full" />
              <div className="h-2 bg-slate-100 rounded w-5/6" />
              <div className="h-2 bg-slate-100 rounded w-4/6" />
            </div>
            <Annotation>Compétences · spectre de bout en bout · autonomie assumée</Annotation>
          </div>

          <Divider />

          {/* Démarche — le vrai contenu de l'ex-page Méthode */}
          <div>
            <Label>Ma démarche</Label>
            <div className="space-y-1 mb-2">
              <div className="h-2 bg-slate-100 rounded w-full" />
              <div className="h-2 bg-slate-100 rounded w-5/6" />
              <div className="h-2 bg-slate-100 rounded w-4/6" />
            </div>
            <Annotation>Owner avant Dev · specs versionnées · artefacts publics · lien repo</Annotation>
            <div className="grid grid-cols-3 gap-2 mt-3">
              <Box h={10} label="rules/" />
              <Box h={10} label="docs/sprints/" />
              <Box h={10} label="DECISIONS.md" />
            </div>
          </div>

          <Divider />

          {/* Compétences */}
          <div>
            <Label>Compétences</Label>
            {["Développement", "Data & BI", "Infrastructure & Cloud"].map(cat => (
              <div key={cat} className="mb-3">
                <div className="font-mono text-xs text-slate-500 mb-1">{cat}</div>
                <div className="flex gap-1 flex-wrap">
                  {[1, 2, 3, 4].map(i => (
                    <Tag key={i}>Skill</Tag>
                  ))}
                </div>
              </div>
            ))}
            <Annotation>Pas de barres de progression — elles ne signifient rien</Annotation>
          </div>

          <Divider />

          {/* Parcours */}
          <div>
            <Label>Parcours</Label>
            {[1, 2, 3].map(i => (
              <div key={i} className="flex gap-3 mb-3">
                <div className="font-mono text-xs text-slate-300 w-16 flex-shrink-0 pt-0.5">202{i}</div>
                <div className="space-y-1">
                  <div className="h-2 bg-slate-200 rounded w-48" />
                  <div className="h-2 bg-slate-100 rounded w-36" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  </div>
);

const ContactPage = () => (
  <div>
    <Nav />
    <div className="px-6 max-w-lg mx-auto space-y-6 py-8">
      <div>
        <Label>Contact</Label>
        <div className="h-5 bg-slate-200 rounded w-2/3 mb-2" />
        <div className="space-y-1">
          <div className="h-2 bg-slate-100 rounded w-full" />
          <div className="h-2 bg-slate-100 rounded w-4/6" />
        </div>
        <Annotation>Phrase directe · pas de formulaire en V1</Annotation>
      </div>

      <Divider />

      <div className="space-y-3">
        {["Email", "LinkedIn", "GitHub"].map(c => (
          <div key={c} className="flex items-center gap-3 border border-dashed border-slate-300 rounded p-3">
            <div className="font-mono text-xs text-slate-400 w-16">{c}</div>
            <div className="h-2 bg-slate-100 rounded flex-1" />
          </div>
        ))}
      </div>

      <Divider />

      <Box h={6} label="Télécharger CV" className="border-solid bg-white text-slate-500" />
      <Annotation>CV toujours accessible depuis Contact et About</Annotation>
    </div>
  </div>
);

const VIEWS = { Home: HomePage, Projets: ProjectsPage, "Projet détail": ProjectDetailPage, About: AboutPage, Contact: ContactPage };

// ── Shell ────────────────────────────────────────────────────────────────────

export default function Wireframes() {
  const [active, setActive] = useState("Home");
  const Page = VIEWS[active];

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Tab bar */}
      <div className="flex gap-1 px-4 pt-4 pb-0 border-b border-slate-200 bg-white sticky top-0 z-50">
        {PAGES.map(p => (
          <button
            key={p}
            onClick={() => setActive(p)}
            className={`px-4 py-2 font-mono text-xs rounded-t border border-b-0 transition-colors ${
              active === p
                ? "bg-slate-50 border-slate-300 text-slate-700"
                : "border-transparent text-slate-400 hover:text-slate-600"
            }`}
          >
            {p}
          </button>
        ))}
        <div className="ml-auto font-mono text-xs text-slate-300 self-center pr-2">
          wireframe basse fidélité
        </div>
      </div>

      {/* Page */}
      <div className="py-6 max-w-4xl mx-auto">
        <Page />
      </div>
    </div>
  );
}