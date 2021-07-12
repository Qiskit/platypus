import { CtaClickedEventProperties } from '../constants/segment'

/**
 * Represent a general link use on the site
 */
interface GeneralLink {
  /** The visible name of the link */
  label: string
  /** Where we want to go */
  url: string
  segment?: CtaClickedEventProperties
  /** Text shown when leaving the cursor on the link */
  title?: string,
}

export type { GeneralLink }
