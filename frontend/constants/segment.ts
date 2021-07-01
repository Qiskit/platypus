/**
 * Custom properties for the event "CTA Clicked".
 */
 export interface CtaClickedEventProperties {
  cta: string
  location: string
}

/**
 * Properties sent to Segment via the `track` API.
 */
interface SegmentTrackProperties {
  category: string
  location: string
  productTitle: string
}

/**
 * Properties sent to Segment via the `track` API for the event "CTA Clicked".
 */
export interface CtaClickedSegmentTrackProperties
  extends SegmentTrackProperties {
  /**
   * Description of the CTA link.
   */
  CTA: string
}

/**
 * Properties sent to Segment via the `track` API for the event "Searched Term".
 */
export interface SearchedTermSegmentTrackProperties
  extends SegmentTrackProperties {
  /**
   * Search term.
   */
  text: string
}
