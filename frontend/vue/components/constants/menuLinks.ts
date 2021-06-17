type SegmentData = {
  action: string
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

type LabeledLinks = {
  [key: string]: NavLink
}

const SOCIAL_MEDIA: LabeledLinks = {
  github: {
    label: 'GitHub',
    url: 'https://github.com/Qiskit'
  },
  slack: {
    label: 'Slack',
    url: 'https://ibm.co/joinqiskitslack'
  },
  twitter: {
    label: 'Twitter',
    url: 'https://twitter.com/Qiskit'
  },
  medium: {
    label: 'Medium',
    url: 'https://medium.com/Qiskit'
  },
  youtube: {
    label: 'YouTube',
    url: 'https://www.youtube.com/Qiskit'
  },
  stack: {
    label: 'Stack Exchange',
    url: 'https://quantumcomputing.stackexchange.com/questions/tagged/qiskit'
  }
}

const COMMUNITY_SUB_LINKS: LabeledLinks = {
  events: {
    label: 'Events',
    url: '/events',
    segment: {
      action: 'Events'
    }
  },
  advocates: {
    label: 'Advocates',
    url: '/advocates',
    segment: {
      action: 'Advocates'
    }
  }
}

const ORDERED_COMMUNITY_SUB_LINKS: Array<NavLink> = [
  COMMUNITY_SUB_LINKS.events,
  COMMUNITY_SUB_LINKS.advocates
]

const QISKIT_EDUCATION: LabeledLinks = {
  textbook: {
    label: 'Textbook',
    url: 'https://qiskit.org/textbook'
  }
}

const QISKIT_ADVOCATES: LabeledLinks = {
  advocates: {
    label: 'Advocates',
    url: '/advocates#become-an-advocate'
  }
}

const OVERVIEW_LINK: NavLink = {
  label: 'Overview',
  url: '/overview',
  segment: {
    action: 'Overview'
  }
}

const LEARN_LINK: NavLink = {
  label: 'Learn',
  url: '/learn',
  segment: {
    action: 'Learn'
  }
}

const DOCUMENTATION_LINK: NavLink = {
  label: 'Documentation',
  url: 'https://qiskit.org/documentation/'
}

const QISKIT_VIDEOS: NavLink = {
  label: 'Videos',
  url: 'https://www.youtube.com/qiskit'
}

const TUTORIALS_LINK: NavLink = {
  label: 'Tutorials',
  url: 'https://github.com/Qiskit/qiskit-tutorials',
  segment: {
    action: 'Tutorials'
  }
}

// TODO: enable when #663 is done
// const QISKIT_CAREERS: NavLink = {
//   label: 'Careers',
//   url: '#'
// }

type FooterSection = {
  title: string,
  elements: Array<NavLink>
}

type FooterStructure = Array<FooterSection>

// Each entry represents a column
const FOOTER_ELEMENTS: FooterStructure = [
  {
    title: 'Learn',
    elements: [
      QISKIT_EDUCATION.textbook,
      TUTORIALS_LINK,
      QISKIT_VIDEOS
    ]
  },
  {
    title: 'Community',
    elements: [
      COMMUNITY_SUB_LINKS.events,
      QISKIT_ADVOCATES.advocates
      // TODO: enable when #663 is done
      // QISKIT_CAREERS
    ]
  },
  {
    title: 'Support',
    elements: [
      SOCIAL_MEDIA.github,
      SOCIAL_MEDIA.stack,
      DOCUMENTATION_LINK
    ]
  }
]

const STAY_CONNECTED_LINKS: FooterSection = {
  title: 'Stay Connected',
  elements: [
    {
      label: 'Twitter',
      icon: 'LogoTwitter20',
      url: SOCIAL_MEDIA.twitter.url
    },
    {
      label: 'Slack',
      icon: 'LogoSlack20',
      url: SOCIAL_MEDIA.slack.url
    },
    {
      label: 'Youtube',
      icon: 'LogoYouTube20',
      url: SOCIAL_MEDIA.youtube.url
    },
    {
      label: 'Medium',
      icon: 'LogoMedium20',
      url: SOCIAL_MEDIA.medium.url
    }
  ]
}

const SECONDARY_FOOTER_LINKS: Array<NavLink> = [
  {
    label: 'Terms of use',
    url: 'https://www.ibm.com/legal?lnk=flg-tous-usen'
  },
  {
    label: 'Accessibility',
    url: 'https://www.ibm.com/accessibility/us/en/?lnk=flg-acce-usen'
  },
  {
    label: 'Contact',
    url: 'mailto:hello@qiskit.camp'
  },
  {
    label: 'Privacy',
    url: 'https://quantum-computing.ibm.com/terms/privacy'
  }
]

const HOME_LINK: NavLink = {
  label: 'Qiskit',
  url: '/'
}

const GITHUB_REPOSITORY: NavLink = {
  label: 'GitHub',
  url: 'https://github.com/Qiskit/qiskit',
  segment: { action: 'GitHub repository' }
}

const COMMUNITY_LINK: NavLink = {
  label: 'Community',
  url: '/advocates'
}

type InnerNavLink = {
  anchor: string,
  label: string,
}

export {
  ORDERED_COMMUNITY_SUB_LINKS,
  FOOTER_ELEMENTS,
  SECONDARY_FOOTER_LINKS,
  HOME_LINK,
  GITHUB_REPOSITORY,
  COMMUNITY_LINK,
  TUTORIALS_LINK,
  DOCUMENTATION_LINK,
  STAY_CONNECTED_LINKS,
  LEARN_LINK,
  OVERVIEW_LINK,
  SOCIAL_MEDIA,
  NavLink,
  InnerNavLink
}
