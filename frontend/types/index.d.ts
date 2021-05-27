declare module '@carbon/icons-vue'
declare module '@carbon/icons-vue/*'

interface XCourse {
  id: string,
  section: string,
  goals?: number
}

interface SectionProgress {
  progress: number;
  completed: boolean;
  activeStep?: string;
  steps: {scores: string[], data: any}[];
  messages?: {content: string, kind: string}[]
}
