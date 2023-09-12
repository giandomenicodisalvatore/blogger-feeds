/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_EXAMPLE_BLOG: string
	// more env vars
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}

export {} from '@lib'
