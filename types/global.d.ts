export {}

declare global {
  interface Window {
    __siteSettings?: {
      branding?: {
        theme_default?: 'light' | 'dark' | 'system'
        accent_default?: string
        palette?: string[]
      }
      seo?: { site_title?: string; site_description?: string }
    }
    DFTheme?: {
      applyTheme: (mode: 'light' | 'dark' | 'system', persist?: boolean) => void
      applyAccent: (hex: string, persist?: boolean) => void
      resetToDefaults: () => void
      palette?: string[]
    }
  }
}
