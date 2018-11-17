import {formatDate} from './util'

export default function (moose) {
  const data = {component: 'article'}
  let el = moose.querySelector('h1.title')
  if (el) {
    data.title = el.textContent
  }
  el = moose.querySelector('.author .name')
  if (el) {
    data.author = el.textContent
  }
  el = moose.querySelector('span.date')
  if (el) {
    data.date = formatDate(el.getAttribute('data-origindate'))
  }
  el = moose.querySelector('.banner img')
  if (el) {
    data.cover = el.src
  }
  el = moose.querySelector('.article-detail-bd .detail')
  if (el) {
    data.content = el.innerHTML
  }
  moose.render({lang: 'zh', sections: [data]})
}
