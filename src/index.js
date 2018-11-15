import home from './home'
import article from './article'

if (location.pathname === '/mobile/homes.html') {
  home(window.moose)
} else if (location.pathname === '/') {
  home(window.moose)
} else if (/\/mobile\/articles\/\d+\.html/.test(location.pathname)) {
  article(window.moose)
}
