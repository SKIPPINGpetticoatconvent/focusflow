
// this file is generated — do not edit it


/// <reference types="@sveltejs/kit" />

/**
 * This module provides access to environment variables that are injected _statically_ into your bundle at build time and are limited to _private_ access.
 * 
 * |         | Runtime                                                                    | Build time                                                               |
 * | ------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
 * | Private | [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private) | [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private) |
 * | Public  | [`$env/dynamic/public`](https://svelte.dev/docs/kit/$env-dynamic-public)   | [`$env/static/public`](https://svelte.dev/docs/kit/$env-static-public)   |
 * 
 * Static environment variables are [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env` at build time and then statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * **_Private_ access:**
 * 
 * - This module cannot be imported into client-side code
 * - This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured)
 * 
 * For example, given the following build time environment:
 * 
 * ```env
 * ENVIRONMENT=production
 * PUBLIC_BASE_URL=http://site.com
 * ```
 * 
 * With the default `publicPrefix` and `privatePrefix`:
 * 
 * ```ts
 * import { ENVIRONMENT, PUBLIC_BASE_URL } from '$env/static/private';
 * 
 * console.log(ENVIRONMENT); // => "production"
 * console.log(PUBLIC_BASE_URL); // => throws error during build
 * ```
 * 
 * The above values will be the same _even if_ different values for `ENVIRONMENT` or `PUBLIC_BASE_URL` are set at runtime, as they are statically replaced in your code with their build time values.
 */
declare module '$env/static/private' {
	export const VSCODE_CWD: string;
	export const GIT_IDENTITY_CODEBERG_EMAIL: string;
	export const npm_config_devdir: string;
	export const VSCODE_ESM_ENTRYPOINT: string;
	export const PUPPETEER_CACHE_DIR: string;
	export const HTTPS_PROXY: string;
	export const USER: string;
	export const VSCODE_NLS_CONFIG: string;
	export const no_proxy: string;
	export const npm_config_user_agent: string;
	export const VSCODE_HANDLES_UNCAUGHT_ERRORS: string;
	export const CARGO_TARGET_DIR: string;
	export const CCACHE_DIR: string;
	export const all_proxy: string;
	export const CI: string;
	export const BUN_INSTALL: string;
	export const PIP_CACHE_DIR: string;
	export const HOMEBREW_CACHE: string;
	export const NUGET_PACKAGES: string;
	export const npm_node_execpath: string;
	export const SHLVL: string;
	export const SOCKS_PROXY: string;
	export const npm_config_noproxy: string;
	export const HOME: string;
	export const OLDPWD: string;
	export const LESS: string;
	export const GIT_IDENTITY_CODEBERG_NAME: string;
	export const VSCODE_IPC_HOOK_CLI: string;
	export const NO_PROXY: string;
	export const npm_package_json: string;
	export const ZSH: string;
	export const LSCOLORS: string;
	export const PAGER: string;
	export const FNM_ARCH: string;
	export const npm_config_userconfig: string;
	export const npm_config_local_prefix: string;
	export const DBUS_SESSION_BUS_ADDRESS: string;
	export const CONDA_PKGS_DIRS: string;
	export const NO_COLOR: string;
	export const WSL_DISTRO_NAME: string;
	export const COLOR: string;
	export const COMPOSER_HOME: string;
	export const OVSX_REGISTRY_URL: string;
	export const FNM_VERSION_FILE_STRATEGY: string;
	export const FNM_LOGLEVEL: string;
	export const VSCODE_L10N_BUNDLE_LOCATION: string;
	export const https_proxy: string;
	export const LOGNAME: string;
	export const FORCE_COLOR: string;
	export const ALL_PROXY: string;
	export const NAME: string;
	export const WSL_INTEROP: string;
	export const _: string;
	export const VSCODE_HANDLES_SIGPIPE: string;
	export const FNM_NODE_DIST_MIRROR: string;
	export const BUN_INSTALL_CACHE_DIR: string;
	export const http_proxy: string;
	export const npm_config_prefix: string;
	export const npm_config_npm_version: string;
	export const GOMODCACHE: string;
	export const TERM: string;
	export const CP_HOME_DIR: string;
	export const EVERYSPHERE_RIPGREP_PATH: string;
	export const socks_proxy: string;
	export const SOCKS5_PROXY: string;
	export const GIT_IDENTITY_GITLAB_EMAIL: string;
	export const GIT_IDENTITY_BITBUCKET_EMAIL: string;
	export const POETRY_CACHE_DIR: string;
	export const npm_config_node_gyp: string;
	export const PATH: string;
	export const YARN_CACHE_FOLDER: string;
	export const NODE: string;
	export const npm_package_name: string;
	export const XDG_RUNTIME_DIR: string;
	export const UV_CACHE_DIR: string;
	export const PLAYWRIGHT_BROWSERS_PATH: string;
	export const BUNDLE_PATH: string;
	export const CURSOR_AGENT: string;
	export const LANG: string;
	export const NX_CACHE_DIRECTORY: string;
	export const LS_COLORS: string;
	export const FNM_DIR: string;
	export const GIT_IDENTITY_GITHUB_WORK_EMAIL: string;
	export const CYPRESS_CACHE_FOLDER: string;
	export const npm_lifecycle_script: string;
	export const FNM_RESOLVE_ENGINES: string;
	export const PNPM_STORE_PATH: string;
	export const SHELL: string;
	export const GIT_IDENTITY_GITLAB_NAME: string;
	export const GIT_IDENTITY_BITBUCKET_NAME: string;
	export const GOCACHE: string;
	export const CURSOR_SANDBOX: string;
	export const npm_package_version: string;
	export const npm_lifecycle_event: string;
	export const ELECTRON_RUN_AS_NODE: string;
	export const GIT_HTTP_PROXY: string;
	export const GIT_IDENTITY_GITHUB_DARK_EMAIL: string;
	export const GIT_IDENTITY_GITHUB_WORK_NAME: string;
	export const socks5_proxy: string;
	export const npm_config_globalconfig: string;
	export const npm_config_init_module: string;
	export const PWD: string;
	export const FNM_MULTISHELL_PATH: string;
	export const NPM_CONFIG_CACHE: string;
	export const GRADLE_USER_HOME: string;
	export const npm_execpath: string;
	export const npm_config_global_prefix: string;
	export const HTTP_PROXY: string;
	export const GIT_HTTPS_PROXY: string;
	export const npm_command: string;
	export const FNM_COREPACK_ENABLED: string;
	export const TURBO_CACHE_DIR: string;
	export const HOSTTYPE: string;
	export const GEM_SPEC_CACHE: string;
	export const _ZO_DOCTOR: string;
	export const CURSOR_SANDBOX_LANDLOCK_STATUS: string;
	export const __CURSOR_SANDBOX_ENV_RESTORE: string;
	export const WSLENV: string;
	export const DPRINT_INSTALL: string;
	export const GIT_IDENTITY_GITHUB_DARK_NAME: string;
	export const INIT_CWD: string;
	export const EDITOR: string;
}

/**
 * This module provides access to environment variables that are injected _statically_ into your bundle at build time and are _publicly_ accessible.
 * 
 * |         | Runtime                                                                    | Build time                                                               |
 * | ------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
 * | Private | [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private) | [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private) |
 * | Public  | [`$env/dynamic/public`](https://svelte.dev/docs/kit/$env-dynamic-public)   | [`$env/static/public`](https://svelte.dev/docs/kit/$env-static-public)   |
 * 
 * Static environment variables are [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env` at build time and then statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * **_Public_ access:**
 * 
 * - This module _can_ be imported into client-side code
 * - **Only** variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`) are included
 * 
 * For example, given the following build time environment:
 * 
 * ```env
 * ENVIRONMENT=production
 * PUBLIC_BASE_URL=http://site.com
 * ```
 * 
 * With the default `publicPrefix` and `privatePrefix`:
 * 
 * ```ts
 * import { ENVIRONMENT, PUBLIC_BASE_URL } from '$env/static/public';
 * 
 * console.log(ENVIRONMENT); // => throws error during build
 * console.log(PUBLIC_BASE_URL); // => "http://site.com"
 * ```
 * 
 * The above values will be the same _even if_ different values for `ENVIRONMENT` or `PUBLIC_BASE_URL` are set at runtime, as they are statically replaced in your code with their build time values.
 */
declare module '$env/static/public' {
	
}

/**
 * This module provides access to environment variables set _dynamically_ at runtime and that are limited to _private_ access.
 * 
 * |         | Runtime                                                                    | Build time                                                               |
 * | ------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
 * | Private | [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private) | [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private) |
 * | Public  | [`$env/dynamic/public`](https://svelte.dev/docs/kit/$env-dynamic-public)   | [`$env/static/public`](https://svelte.dev/docs/kit/$env-static-public)   |
 * 
 * Dynamic environment variables are defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/main/packages/adapter-node) (or running [`vite preview`](https://svelte.dev/docs/kit/cli)), this is equivalent to `process.env`.
 * 
 * **_Private_ access:**
 * 
 * - This module cannot be imported into client-side code
 * - This module includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured)
 * 
 * > [!NOTE] In `dev`, `$env/dynamic` includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 * 
 * > [!NOTE] To get correct types, environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * >
 * > ```env
 * > MY_FEATURE_FLAG=
 * > ```
 * >
 * > You can override `.env` values from the command line like so:
 * >
 * > ```sh
 * > MY_FEATURE_FLAG="enabled" npm run dev
 * > ```
 * 
 * For example, given the following runtime environment:
 * 
 * ```env
 * ENVIRONMENT=production
 * PUBLIC_BASE_URL=http://site.com
 * ```
 * 
 * With the default `publicPrefix` and `privatePrefix`:
 * 
 * ```ts
 * import { env } from '$env/dynamic/private';
 * 
 * console.log(env.ENVIRONMENT); // => "production"
 * console.log(env.PUBLIC_BASE_URL); // => undefined
 * ```
 */
declare module '$env/dynamic/private' {
	export const env: {
		VSCODE_CWD: string;
		GIT_IDENTITY_CODEBERG_EMAIL: string;
		npm_config_devdir: string;
		VSCODE_ESM_ENTRYPOINT: string;
		PUPPETEER_CACHE_DIR: string;
		HTTPS_PROXY: string;
		USER: string;
		VSCODE_NLS_CONFIG: string;
		no_proxy: string;
		npm_config_user_agent: string;
		VSCODE_HANDLES_UNCAUGHT_ERRORS: string;
		CARGO_TARGET_DIR: string;
		CCACHE_DIR: string;
		all_proxy: string;
		CI: string;
		BUN_INSTALL: string;
		PIP_CACHE_DIR: string;
		HOMEBREW_CACHE: string;
		NUGET_PACKAGES: string;
		npm_node_execpath: string;
		SHLVL: string;
		SOCKS_PROXY: string;
		npm_config_noproxy: string;
		HOME: string;
		OLDPWD: string;
		LESS: string;
		GIT_IDENTITY_CODEBERG_NAME: string;
		VSCODE_IPC_HOOK_CLI: string;
		NO_PROXY: string;
		npm_package_json: string;
		ZSH: string;
		LSCOLORS: string;
		PAGER: string;
		FNM_ARCH: string;
		npm_config_userconfig: string;
		npm_config_local_prefix: string;
		DBUS_SESSION_BUS_ADDRESS: string;
		CONDA_PKGS_DIRS: string;
		NO_COLOR: string;
		WSL_DISTRO_NAME: string;
		COLOR: string;
		COMPOSER_HOME: string;
		OVSX_REGISTRY_URL: string;
		FNM_VERSION_FILE_STRATEGY: string;
		FNM_LOGLEVEL: string;
		VSCODE_L10N_BUNDLE_LOCATION: string;
		https_proxy: string;
		LOGNAME: string;
		FORCE_COLOR: string;
		ALL_PROXY: string;
		NAME: string;
		WSL_INTEROP: string;
		_: string;
		VSCODE_HANDLES_SIGPIPE: string;
		FNM_NODE_DIST_MIRROR: string;
		BUN_INSTALL_CACHE_DIR: string;
		http_proxy: string;
		npm_config_prefix: string;
		npm_config_npm_version: string;
		GOMODCACHE: string;
		TERM: string;
		CP_HOME_DIR: string;
		EVERYSPHERE_RIPGREP_PATH: string;
		socks_proxy: string;
		SOCKS5_PROXY: string;
		GIT_IDENTITY_GITLAB_EMAIL: string;
		GIT_IDENTITY_BITBUCKET_EMAIL: string;
		POETRY_CACHE_DIR: string;
		npm_config_node_gyp: string;
		PATH: string;
		YARN_CACHE_FOLDER: string;
		NODE: string;
		npm_package_name: string;
		XDG_RUNTIME_DIR: string;
		UV_CACHE_DIR: string;
		PLAYWRIGHT_BROWSERS_PATH: string;
		BUNDLE_PATH: string;
		CURSOR_AGENT: string;
		LANG: string;
		NX_CACHE_DIRECTORY: string;
		LS_COLORS: string;
		FNM_DIR: string;
		GIT_IDENTITY_GITHUB_WORK_EMAIL: string;
		CYPRESS_CACHE_FOLDER: string;
		npm_lifecycle_script: string;
		FNM_RESOLVE_ENGINES: string;
		PNPM_STORE_PATH: string;
		SHELL: string;
		GIT_IDENTITY_GITLAB_NAME: string;
		GIT_IDENTITY_BITBUCKET_NAME: string;
		GOCACHE: string;
		CURSOR_SANDBOX: string;
		npm_package_version: string;
		npm_lifecycle_event: string;
		ELECTRON_RUN_AS_NODE: string;
		GIT_HTTP_PROXY: string;
		GIT_IDENTITY_GITHUB_DARK_EMAIL: string;
		GIT_IDENTITY_GITHUB_WORK_NAME: string;
		socks5_proxy: string;
		npm_config_globalconfig: string;
		npm_config_init_module: string;
		PWD: string;
		FNM_MULTISHELL_PATH: string;
		NPM_CONFIG_CACHE: string;
		GRADLE_USER_HOME: string;
		npm_execpath: string;
		npm_config_global_prefix: string;
		HTTP_PROXY: string;
		GIT_HTTPS_PROXY: string;
		npm_command: string;
		FNM_COREPACK_ENABLED: string;
		TURBO_CACHE_DIR: string;
		HOSTTYPE: string;
		GEM_SPEC_CACHE: string;
		_ZO_DOCTOR: string;
		CURSOR_SANDBOX_LANDLOCK_STATUS: string;
		__CURSOR_SANDBOX_ENV_RESTORE: string;
		WSLENV: string;
		DPRINT_INSTALL: string;
		GIT_IDENTITY_GITHUB_DARK_NAME: string;
		INIT_CWD: string;
		EDITOR: string;
		[key: `PUBLIC_${string}`]: undefined;
		[key: `${string}`]: string | undefined;
	}
}

/**
 * This module provides access to environment variables set _dynamically_ at runtime and that are _publicly_ accessible.
 * 
 * |         | Runtime                                                                    | Build time                                                               |
 * | ------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
 * | Private | [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private) | [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private) |
 * | Public  | [`$env/dynamic/public`](https://svelte.dev/docs/kit/$env-dynamic-public)   | [`$env/static/public`](https://svelte.dev/docs/kit/$env-static-public)   |
 * 
 * Dynamic environment variables are defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/main/packages/adapter-node) (or running [`vite preview`](https://svelte.dev/docs/kit/cli)), this is equivalent to `process.env`.
 * 
 * **_Public_ access:**
 * 
 * - This module _can_ be imported into client-side code
 * - **Only** variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`) are included
 * 
 * > [!NOTE] In `dev`, `$env/dynamic` includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 * 
 * > [!NOTE] To get correct types, environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * >
 * > ```env
 * > MY_FEATURE_FLAG=
 * > ```
 * >
 * > You can override `.env` values from the command line like so:
 * >
 * > ```sh
 * > MY_FEATURE_FLAG="enabled" npm run dev
 * > ```
 * 
 * For example, given the following runtime environment:
 * 
 * ```env
 * ENVIRONMENT=production
 * PUBLIC_BASE_URL=http://example.com
 * ```
 * 
 * With the default `publicPrefix` and `privatePrefix`:
 * 
 * ```ts
 * import { env } from '$env/dynamic/public';
 * console.log(env.ENVIRONMENT); // => undefined, not public
 * console.log(env.PUBLIC_BASE_URL); // => "http://example.com"
 * ```
 * 
 * ```
 * 
 * ```
 */
declare module '$env/dynamic/public' {
	export const env: {
		[key: `PUBLIC_${string}`]: string | undefined;
	}
}
