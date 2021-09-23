import defaultSettings from '@/settings'

const title = defaultSettings.title || 'Large Screen Designer'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
