// Fenêtre de revalidation ISR (en secondes).
// La fraîcheur est surtout assurée par la revalidation à la demande
// (signaux Django -> /api/revalidate) ; cette valeur n'est qu'un filet
// de sécurité — une semaine suffit pour un portfolio peu modifié.
export const REVALIDATE = 60 * 60 * 24 * 7
