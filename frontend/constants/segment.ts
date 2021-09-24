/**
 * IBM Cloud Common schema for Segment events.
 * Only the properties used in this project are included in this interface.
 * https://segment-standards.prod.ddp.cis.ibm.net/events/performed-search#IBM%20Cloud%20Common
 */
 interface IbmCloudCommonEventSegmentSchema {
  category: string
  productTitle: string
  uiElement?: string
}

/**
 * Properties sent to Segment for the event "CTA Clicked".
 * Only the properties used in this project are included in this interface.
 * https://segment-standards.prod.ddp.cis.ibm.net/events/cta-clicked
 */
export interface CtaClickedEventSegmentSchema
  extends IbmCloudCommonEventSegmentSchema {
  CTA: string
  location: string
}

/**
 * Vue prop with data for the Segment event "CTA Clicked".
 * Based on the interface CtaClickedEventSegmentSchema.
 */
export interface CtaClickedEventProp {
  cta: string
  location: string
}

/**
 * Properties sent to Segment for the event "Performed Search".
 * Only the properties used in this project are included in this interface.
 * https://segment-standards.prod.ddp.cis.ibm.net/events/performed-search
 */
export interface PerformedSearchEventSegmentSchema
  extends IbmCloudCommonEventSegmentSchema {
  field: string
}

/**
 * Properties sent to Segment for the event "Updated Object".
 * Only the properties used in this project are included in this interface.
 * https://segment-standards.prod.ddp.cis.ibm.net/events/updated-object
 */
export interface UpdatedObjectEventSegmentSchema
 extends IbmCloudCommonEventSegmentSchema {
  object: string
  objectType: string
}
