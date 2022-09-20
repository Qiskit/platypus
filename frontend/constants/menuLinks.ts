type SegmentData = {
  action?: string,
  cta?: string,
  location?: string
}

/**
 * Represent a navigation link for the menus of the site
 */
interface NavLink {
  /** The visible name of the link */
  label: string
  /** Where we want to go */
  url: string
  /** Includes an object with the information of the action. Example:
   * ```ts
   * {
      action: 'Qiskit Community: GitHub'
     }
    ```
   */
  segment?: SegmentData
  /** Only for <a> links. Use `_blank` to open the link in a new tab */
  target?: string
  /** Only for <a> links. Specifies the relationship between the current document
   *  and the linked document. Possible values: `nofollow`, `noreferrer`, `noopener`,
   *  `me` or a combination of them
   */
  rel?: string
  /** The visible icon of the link */
  icon?: 'LogoTwitter20'|'LogoSlack20'|'LogoYouTube20'|'LogoMedium20'
  /**
   * TODO: This is for enabling a quick fix of a menu hierarchy for addressing:
   * https://github.com/Qiskit/qiskit.org/issues/700
   *
   * If we are going to deal with link hierarchies, it is better to keep
   * separated NavLink instances from HierarchyNode instances. For instance
   * creating a node made of a root and children or providing a ParentNode
   * interface a-la HTML DOM.
   */
  sublinks?: NavLink[]
}

export type { NavLink }
