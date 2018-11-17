import renderHome from './home'
import renderArticle from './article'

if (location.pathname === '/mobile/homes.html') {
  renderHome(window.moose)
} else if (location.pathname === '/') {
  renderHome(window.moose)
} else if (/\/mobile\/articles\/\d+\.html/.test(location.pathname)) {
  renderArticle(window.moose)
}
