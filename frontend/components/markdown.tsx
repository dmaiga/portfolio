import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { cn } from "@/lib/utils"

// Rendu Markdown des champs riches (description, challenge, solution, bio…).
// La couleur du texte est héritée du conteneur (className) ; on ne style ici
// que la structure (paragraphes, listes, liens, emphase, code, titres).
// Pas de HTML brut : react-markdown ne l'interprète pas par défaut (sûr).
export function Markdown({
  children,
  className,
}: {
  children: string
  className?: string
}) {
  return (
    <div
      className={cn(
        "space-y-3 leading-relaxed",
        "[&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-foreground",
        "[&_strong]:font-medium [&_strong]:text-foreground",
        "[&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:my-1",
        "[&_h2]:text-base [&_h2]:font-semibold [&_h3]:text-base [&_h3]:font-semibold",
        "[&_code]:rounded [&_code]:bg-muted [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-xs",
        className,
      )}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children }) => (
            <a href={href} target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  )
}
