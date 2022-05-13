import { NavLink } from './../../../constants/menuLinks'

const actionPrefix = 'mega-menu'
const wholeSection = 'whole-section'
const baseUrl = (window && window.location ? window.location.origin : 'https://learn.qiskit.org') + '/course'

type PageYAML = {
  title: string,
  id: string
}

type CourseYAML = {
  title: string,
  type: string,
  url: string,
  sections: PageYAML[]
}

type MegaDropdownMenuGroup = {
  title: NavLink,
  content: NavLink[]
}

type MegaDropdownMenuColumn = MegaDropdownMenuGroup[]
type MegaDropdownMenu = MegaDropdownMenuColumn[]

function extractMenuData (toc: CourseYAML[]) {
  /* Takes the parsed `notebooks/toc.yaml` and
     outputs a list of MegaDropdownMenuGroup */
  const groupsList: MegaDropdownMenuGroup[] = []
  for (const course of toc) {
    if (course.type === 'legacy-chapter') {
      // Create group with correct name and empty `content`
      const groupShorthand = course.title?.toLowerCase()?.replace(/ /g, '-')
      const newGroup: MegaDropdownMenuGroup = {
        title: {
          label: course.title,
          url: `${baseUrl}${course.url}`,
          segment: {
            action: `${actionPrefix} > ${groupShorthand} > ${wholeSection}`
          }
        },
        content: []
      }
      // Fill in `content`
      for (const page of course.sections) {
        const pageShorthand = page.title.toLowerCase().replace(/ /g, '-')
        const newPage = {
          label: page.title,
          url: `${baseUrl}${course.url}/${page.id}`,
          segment: {
            action: `${actionPrefix} > ${groupShorthand} > ${pageShorthand}`
          }
        }
        newGroup.content.push(newPage)
      }

      groupsList.push(newGroup)
    }
  }
  return groupsList
}

function createColumns (groupsList: MegaDropdownMenuGroup[]) {
  const megaMenu: MegaDropdownMenu = []
  /* Splits the groups into three columns */
  // To do: Take into account no. of pages in group
  // to get even heights
  const columnHeight = Math.ceil(groupsList.length / 3)
  for (let i = 0; i < groupsList.length; i += columnHeight) {
    megaMenu.push(groupsList.slice(i, i + columnHeight))
  }
  return megaMenu
}

const toc = JSON.parse(process.env.VUE_APP_MEGA_MENU_TOC as string) as CourseYAML[]
const groupsList = extractMenuData(toc)
const TEXTBOOK_DEMO_MEGA_MENU = createColumns(groupsList)

export {
  TEXTBOOK_DEMO_MEGA_MENU
}
