/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_BLOG: string
	readonly VITE_BLOG_ID: string
	readonly VITE_POST_ID: string
	// more env vars
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}

export {}
