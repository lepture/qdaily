import {formatDate} from './util'

export default function(moose) {
  const sections = []

  const navItems = []
  moose.querySelectorMap('.categories > li > a', function(el) {
    const url = el.getAttribute('href')
    if (url) {
      navItems.push({url, text: el.textContent})
    }
  })
  sections.push({component: 'tabs', items: navItems})

  const sliderItems = moose.querySelectorMap('.swiper-wrapper a', function(el) {
    const text = el.getAttribute('data-title')
    const style = el.getAttribute('style')
    const src = style.match(/url\("?(https?:\S+?)"?\)/)[1]
    return {text, src, url: el.href}
  })
  sections.push({
    component: 'slider',
    style: {item: {width: 300, height: 168}},
    items: sliderItems
  })

  const listItems = moose.querySelectorMap('a.com-grid-article', function(el) {
    const img = el.querySelector('img')
    const media = {
      src: img.getAttribute('data-src'),
      alt: img.getAttribute('alt')
    }
    const date = el.querySelector('.smart-date').getAttribute('data-origindate')
    const metadata = [
      {text: formatDate(date)},
    ]
    let el1 = el.querySelector('.icon-message')
    if (el1) {
      metadata.push({icon: 'chatboxes', text: el1.textContent})
    }
    let el2 = el.querySelector('.icon-heart')
    if (el2) {
      metadata.push({icon: 'heart', text: el2.textContent})
    }
    return {url: el.href, subtitle: media.alt, media, metadata}
  })

  function loadMore(cursor, cb) {
    const url = `/mobile/homes/articlemore/${cursor}.json`
    fetch(url).then(resp => {
      return resp.json()
    }).then(data => {
      const items = data.data.feeds.map(item => {
        const post = item.post
        const image = item.image || post.image
        const url = `/mobile/${item.datatype}s/${post.id}.html`
        const subtitle = post.title
        const metadata = [
          {text: formatDate(post.publish_time)}
        ]
        if (post.comment_count) {
          metadata.push({icon: 'chatboxes', text: post.comment_count})
        }
        if (post.praise_count) {
          metadata.push({icon: 'heart', text: post.praise_count})
        }
        return {
          url,
          subtitle,
          media: {src: image},
          metadata,
        }
      })
      if (data.data.has_more) {
        const cursor = data.data.last_key
        cb({cursor, items})
      } else {
        cb({items})
      }
    })
  }

  const lastKey = moose.querySelector('[data-lastkey]')
  sections.push({
    component: 'list',
    cursor: lastKey.getAttribute('data-lastkey'),
    loadMore,
    style: {media: {width: 100}},
    items: listItems
  })

  moose.render({lang: 'zh', sections})
}
