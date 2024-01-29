/**
 * @typedef {import('hast').Root} Root
 */

/**
 * @typedef {import('hast').Node} Node
 */

import Slugger from 'github-slugger'
import {hasProperty} from 'hast-util-has-property'
import {headingRank} from 'hast-util-heading-rank'
import {toString} from 'hast-util-to-string'
import {visit} from 'unist-util-visit'
import deburr from 'lodash/deburr.js'

export const slugs = new Slugger()

/**
 * Exported function to get a Node's ID
 *
 * @param {Node} node
 * @param {{
 *   enableCustomId?: boolean,
 *   maintainCase?: boolean,
 *   removeAccents?: boolean
 * }} props
 */
export function getHeaderNodeId(node, props = {}) {
  const {
    enableCustomId = false,
    maintainCase = false,
    removeAccents = false
  } = props

  /**
   * @type {Node & HTMLElement}
   */
  // @ts-ignore
  const headerNode = node

  let id
  let isCustomId = false
  if (enableCustomId && headerNode.children.length > 0) {
    const last = headerNode.children[headerNode.children.length - 1]
    // This regex matches to preceding spaces and {#custom-id} at the end of a string.
    // Also, checks the text of node won't be empty after the removal of {#custom-id}.
    // @ts-ignore
    const match = /^(.*?)\s*{#([\w-]+)}$/.exec(toString(last))
    if (match && (match[1] || headerNode.children.length > 1)) {
      id = match[2]
      // Remove the custom ID from the original text.
      if (match[1]) {
        // @ts-ignore
        last.value = match[1]
      } else {
        isCustomId = true
      }
    }
  }

  if (!id) {
    // @ts-ignore
    const slug = slugs.slug(toString(headerNode), maintainCase)
    id = removeAccents ? deburr(slug) : slug
  }

  return {id, isCustomId}
}

/**
 * Plugin to add `id`s to headings.
 *
 * @type {import('unified').Plugin<[{
 *   enableCustomId?: boolean,
 *   maintainCase?: boolean,
 *   removeAccents?: boolean
 * }], Root>}
 */
export default function rehypeSlug(props = {}) {
  return (tree) => {
    slugs.reset()

    visit(tree, 'element', (node) => {
      if (headingRank(node) && node.properties && !hasProperty(node, 'id')) {
        const {id, isCustomId} = getHeaderNodeId(node, props)

        if (isCustomId) node.children.pop()
        node.properties.id = id
      }
    })
  }
}
