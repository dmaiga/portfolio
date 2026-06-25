// Fenêtre de revalidation ISR (en secondes).
// La fraîcheur est surtout assurée par la revalidation à la demande
// (signaux Django -> /api/revalidate) ; cette valeur n'est qu'un filet
// pour le cas dégradé (egress bloqué) : 1 h borne le pire cas, et le coût
// d'un refetch arrière-plan est négligeable pour un portfolio peu fréquenté.
export const REVALIDATE = 60 * 60
