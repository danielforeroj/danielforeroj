// Funnel chrome copy: everything the site says around the config the API
// serves. Questions, options and step titles never live here. Calm, B2B, no
// em dashes, no exclamation marks.

import type { Lang } from './types';

const COPY = {
  es: {
    // Head copy. The prerendered HTML carries the Spanish pair, which is the
    // default language; the client swaps it once it knows what the visitor reads.
    seoTitle: 'Recursos de AI para operar tu empresa',
    seoBody:
      'Responde unas preguntas sobre tu empresa en 2 minutos y te doy acceso a los recursos de AI que aplican a tu caso.',
    loading: 'Cargando',
    back: 'Atrás',
    next: 'Siguiente',
    step: (n: number, total: number) => `Paso ${n} de ${total}`,
    pickHint: 'Elige una opción',
    pickMultiHint: (min: number, max?: number) =>
      max ? `Elige de ${min} a ${max}` : min > 1 ? `Elige al menos ${min}` : 'Elige una o más',
    keysHint: 'Enter para seguir, Esc para volver',
    earned: (n: number) => (n === 1 ? '1 recurso desbloqueado' : `${n} recursos desbloqueados`),
    earnedIntro: (n: number) =>
      n === 1
        ? 'Con lo que me contaste ya desbloqueaste 1 recurso.'
        : `Con lo que me contaste ya desbloqueaste ${n} recursos.`,
    required: 'Este campo es obligatorio',
    invalidEmail: 'Revisa el email',
    invalidWebsite: 'Revisa el enlace, por ejemplo empresa.com o instagram.com/negocio',
    consentRequired: 'Necesito tu aceptación para enviarte el acceso',
    codeLabel: 'Código de 6 dígitos',
    codeInvalid: 'Ese código no funcionó. Revísalo o pide otro.',
    resendIn: (s: number) => `Puedes pedir otro código en ${s} s`,
    changeEmail: 'Cambiar email',
    sentTo: (email: string) => `Enviado a ${email}`,
    errorGeneric: 'Algo no salió bien. Inténtalo de nuevo en un momento.',
    errorLoad: 'No pude cargar el formulario. Revisa tu conexión e inténtalo de nuevo.',
    errorRateLimit: 'Demasiados intentos seguidos. Espera un momento y vuelve a intentarlo.',
    retry: 'Reintentar',
    langSwitch: 'English',
    // library
    libraryKicker: 'Recursos de AI',
    libraryTitle: (name: string) => (name ? `Tus recursos, ${name.split(' ')[0]}` : 'Tus recursos'),
    librarySub: (company: string) =>
      company ? `Elegidos para ${company} según lo que me contaste.` : 'Elegidos según lo que me contaste.',
    libraryEmpty: 'Todavía no hay recursos publicados para tu caso. Te aviso por email cuando estén listos.',
    open: 'Abrir',
    signOut: 'Cerrar sesión',
    loginTitle: 'Entra a tus recursos',
    loginBody: 'Escribe el email con el que te registraste y te envío un código.',
    loginEmail: 'Email',
    loginCta: 'Enviar código',
    confirm: 'Confirmar',
    resend: 'Enviar otro código',
    loginSent: 'Si ese email tiene acceso, te llegará un código en un momento.',
    noAccessYet: '¿Todavía no tienes acceso?',
    startFunnel: 'Responde las preguntas',
    // reader
    backToLibrary: 'Tus recursos',
    notAvailable: 'Este recurso no está disponible para tu cuenta.',
    readerLoading: 'Abriendo el recurso',
    sourceLabel: 'Fuente',
    takeawayLabel: 'Lo más importante',
    before: 'Antes',
    after: 'Después',
    chartTable: 'Datos del gráfico',
  },
  en: {
    seoTitle: 'AI resources to run your company',
    seoBody:
      'Answer a few questions about your company in 2 minutes and I will give you access to the AI resources that fit your case.',
    loading: 'Loading',
    back: 'Back',
    next: 'Next',
    step: (n: number, total: number) => `Step ${n} of ${total}`,
    pickHint: 'Pick one',
    pickMultiHint: (min: number, max?: number) =>
      max ? `Pick ${min} to ${max}` : min > 1 ? `Pick at least ${min}` : 'Pick one or more',
    keysHint: 'Enter to continue, Esc to go back',
    earned: (n: number) => (n === 1 ? '1 resource unlocked' : `${n} resources unlocked`),
    earnedIntro: (n: number) =>
      n === 1
        ? 'From what you told me, you have already unlocked 1 resource.'
        : `From what you told me, you have already unlocked ${n} resources.`,
    required: 'This field is required',
    invalidEmail: 'Check the email',
    invalidWebsite: 'Check the link, for example company.com or instagram.com/business',
    consentRequired: 'I need your consent to send you access',
    codeLabel: '6 digit code',
    codeInvalid: 'That code did not work. Check it or ask for another one.',
    resendIn: (s: number) => `You can ask for another code in ${s}s`,
    changeEmail: 'Change email',
    sentTo: (email: string) => `Sent to ${email}`,
    errorGeneric: 'Something went wrong. Try again in a moment.',
    errorLoad: 'I could not load the form. Check your connection and try again.',
    errorRateLimit: 'Too many attempts in a row. Wait a moment and try again.',
    retry: 'Try again',
    langSwitch: 'Español',
    libraryKicker: 'AI resources',
    libraryTitle: (name: string) => (name ? `Your resources, ${name.split(' ')[0]}` : 'Your resources'),
    librarySub: (company: string) =>
      company ? `Picked for ${company} from what you told me.` : 'Picked from what you told me.',
    libraryEmpty: 'There are no resources published for your case yet. I will email you when they are ready.',
    open: 'Open',
    signOut: 'Sign out',
    loginTitle: 'Get into your resources',
    loginBody: 'Type the email you signed up with and I will send you a code.',
    loginEmail: 'Email',
    loginCta: 'Send code',
    confirm: 'Confirm',
    resend: 'Send another code',
    loginSent: 'If that email has access, a code is on its way.',
    noAccessYet: 'No access yet?',
    startFunnel: 'Answer the questions',
    backToLibrary: 'Your resources',
    notAvailable: 'This resource is not available for your account.',
    readerLoading: 'Opening the resource',
    sourceLabel: 'Source',
    takeawayLabel: 'Key takeaway',
    before: 'Before',
    after: 'After',
    chartTable: 'Chart data',
  },
} as const;

export type Copy = (typeof COPY)[Lang];

// unbound-app lib/resource-types.ts. A type not listed here shows no label
// rather than a raw key.
const RESOURCE_TYPE_LABELS: Record<Lang, Record<string, string>> = {
  es: {
    research: 'Investigación',
    guide: 'Guía',
    '101': '101',
    playbook: 'Playbook',
    report: 'Reporte',
    case_study: 'Caso',
    one_pager: 'One pager',
  },
  en: {
    research: 'Research',
    guide: 'Guide',
    '101': '101',
    playbook: 'Playbook',
    report: 'Report',
    case_study: 'Case study',
    one_pager: 'One pager',
  },
};

export const resourceTypeLabel = (type: string, lang: Lang) => RESOURCE_TYPE_LABELS[lang][type] ?? '';

export const copyFor = (lang: Lang): Copy => COPY[lang] as Copy;
