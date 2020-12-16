import { Vue, Options } from 'vue-class-component'
import VueRouter from 'vue-router';

import {
  ORDERED_COMMUNITY_SUB_LINKS,
  HOME_LINK,
  COMMUNITY_LINK,
  TUTORIALS_LINK,
  DOCUMENTATION_LINK,
  LEARN_LINK,
  OVERVIEW_LINK,
  NavLink
} from '../constants/menuLinks'

export default class extends Vue {
  homeLink: NavLink = HOME_LINK

  learnMore: Array<NavLink> = [TUTORIALS_LINK, DOCUMENTATION_LINK]

  mainLevelLinks: Array<NavLink> = [
    OVERVIEW_LINK,
    LEARN_LINK,
    { ...COMMUNITY_LINK, sublinks: ORDERED_COMMUNITY_SUB_LINKS },
    DOCUMENTATION_LINK
  ]

  communityLink: NavLink = COMMUNITY_LINK

  communitySubLinks: Array<NavLink> = ORDERED_COMMUNITY_SUB_LINKS

  isPathStartingWith (linkPath: string): boolean {
    return this.$route.path.startsWith(linkPath)
  }

  isActiveHome (link: NavLink): boolean {
    return this.$route.path === (link.url)
  }

  isActive (link: NavLink): boolean {
    // TODO: Should remove after the new menu (second menu included) is
    // completely done. #573
    return this.isPathStartingWith(link.url)
  }

  isCommunityActive (): boolean {
    return this.communitySubLinks.some(link => this.isActive(link))
  }

  getSubLinks (item: NavLink): NavLink[] {
    return typeof item.sublinks !== 'undefined' ? item.sublinks : []
  }

  isParent (item: NavLink): boolean {
    return this.getSubLinks(item).length !== 0
  }

  appLinkFromNavLink (item: NavLink): any {
    return {
      url: item.url,
      segment: item.segment
    }
  }
}
