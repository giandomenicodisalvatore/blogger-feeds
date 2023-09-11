/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly EXAMPLE_BLOG: string
	// more env vars
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}

export {} from '@lib'
