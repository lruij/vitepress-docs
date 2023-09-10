import type { Plugin } from 'vite'

export function MarkdownTransform(): Plugin {
  return {
    name: 'vueuse-md-transform',
    enforce: 'pre',
    transform(code, id) {
      // console.log(id)
      if (!id.match(/\.md\b/))
        return null

      // const [pkg, _name, i] = id.split('/').slice(-3)

      return code
    }
  }
}
