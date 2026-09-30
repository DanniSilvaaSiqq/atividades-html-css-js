window.onload = function({ target: Document }) {
  const OnInit = () => styleSheet({
    html: Document.querySelector('html'),
    body: Document.querySelector('body'),
    create: (element) => onlyCreateElement(element),
  }).controller(() => {
    const resolution = 1280; // Min resolution
    const html = document.querySelector('html'); // Html
    const head = document.querySelector('head'); // Head
    const original = document.querySelector('body'); // Original body
    const body = document.createElement('body'); // Body
    const css = document.createElement('link');
    const icon = document.createElement('link');

    css.setAttribute('rel', 'stylesheet');
    css.setAttribute('href', './css/style.css');
    icon.setAttribute('rel', 'icon');
    icon.setAttribute('href', './img/favico.ico');
    head.appendChild(css);
    head.appendChild(icon);

    window.innerWidth <= Number(resolution)-1
      ? html.removeChild(original) && html.appendChild(body)
      : null;

   // Default message 
    body.innerHTML = `
      <style>
        .resolution {
          display: flex;
          flex-direction: column;
          flex-wrap: nowrap;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }

        .anchor {
          margin-top: 20px;
          font-size: 18px;
        }
      </style>

      <div class="resolution">
        <h1>Resolution not supported!</h1>
        <a class="anchor" href="https://www.instagram.com/codansoficial">
          Follow @codans in social medias
        </a>
      </div>
    `;

    window.addEventListener('resize', ({ target }) => {
      if (target.innerWidth >= resolution) {
          html.removeChild(body);
          html.appendChild(original);
      } else if (window.innerWidth <= Number(resolution)-1) {
          html.removeChild(original);
          html.appendChild(body);
      }
    });
  });

  /**
   * function used to streamline the element creation procedure.
   * @param { HTMLElement } element - common HTML element, by default it is a div.
   * @returns Object
   */
  function onlyCreateElement(element) {
    return {
      classList: [],
      elType: element,
      elementByTimes: [],
      times: 1,
      setType(type) {
        this.elType = type;
        return this;
      },
      setClass(...list) {
        this.classList = list;
        return this;
      },
      setTimes(times) {
        this.times = times;
        return this;
      },
      build() {
        if (this.times >= 2) {
          for (let i=this.times;i>=0;i--) {
            if (i>=1) {
              let component = Document.createElement(this.elType??'div');
              let copy = this.classList[this.classList.length-1];
              component.classList.add(...this.classList);
              component.classList.remove(copy);
              component.classList.add(copy.replace(copy, copy+'-'+i));
              this.elementByTimes.push(component);
            }
          }
        }
        if (this.elementByTimes.length>0)
          return this.elementByTimes;
        const component = Document.createElement(this.elType??'div');
        component.classList.add(...this.classList);
        return component;
      }
    }
  }

  /**
   * This will start working after
   * the document is loaded.
   */
  Document.addEventListener('load', OnInit(), {
    once: true,
    passive: false,
  });
}

// Factory
// This role is responsible for sorting and cataloging the items
// Each item is an HTML element that will be created within the project
function factoryBuilder(HTMLContentNative, body) {
  function addUtils({ toInside }) {
    return {
      items: [],
      mount(itemRef) {
        this.items.push({[itemRef]: toInside});
        body.component = body;
        HTMLContentNative.component = toInside;
        return this;
      },
      insideOf(component) {
        if (!component)
        return body.appendChild(toInside);
        component.appendChild(toInside);
        return this;
      }
    }
  }

  // Builder
  return Object.defineProperty(HTMLContentNative, 'build', {
    configurable: true,
    enumerable: true,
    writable: false,
    value(node, callback) {
      const allContentItems = Object.values(HTMLContentNative)
        .filter((value) => typeof value != "function");
      return callback(node, {
        item: allContentItems,
        itemName: Object.keys(allContentItems),
      }, addUtils);
    },
  });
}

// Initialize
function styleSheet({ body, create }) {
  const onSelector = onSelectorManager({});
  const header = createHeader(body);
  const navigation = createNavigation(body);
  const article = createArticle(body);
  const download = createDownload(body);
  const footer = createFooter(body);

  // Items
  const myHeader = [
    create().setType('header').setClass('header').build(),
    create().setClass('actions').build(),
    create().setClass('hero').build(),
  ]
  
  const myMenu = [
    create().setClass('navbar').build(),
    create().setClass('menu').build(),
  ]

  const myArticle = [
    create().setType('article').setClass('article').build(),
    create().setType('section').setClass('content', 'current').setTimes(4).build(),
    create().setClass('wrapper', 'item').setTimes(4).build(),
    create().setClass('text', 'item').setTimes(4).build(),
  ]

  const myDownload = [
    create().setType('section').setClass('download').build(),
    create().setClass('content', 'container', 'row').build(),
    create().setClass('sparkles', 'flexbox').build(),
  ]

  const myFooter = [
    create().setType('footer').setClass('footer', 'wrapper').build(),
    create().setClass('content', 'row').setTimes(2).build(),
    create().setClass('route').setTimes(6).build(),
    create().setClass('language').build(),
    create().setClass('social').build(),
    create().setClass('container', 'container-flex').build(),
  ]

  // Compose elements
  header.build(myHeader, (...content) => {
    return onSelector.add(content, body).header();
  }).mount('header').insideOf(body.component);

  navigation.build(myMenu, (...content) => {
    return onSelector.add(content, body).navigation();
  }).mount('navigation').insideOf(header.component);

  article.build(myArticle, (...content) => {
    return onSelector.add(content, body).article();
  }).mount('article').insideOf(body.component);

  download.build(myDownload, (...content) => {
    return onSelector.add(content, body).download();
  }).mount('download').insideOf(body.component);

  footer.build(myFooter, (...content) => {
    return onSelector.add(content, body).footer();
  }).mount('footer').insideOf(body.component);

  // Listener
  return Object.defineProperty({}, 'controller', {
    writable: false,
    configurable: true,
    enumerable: true,
    value: (fnController) => fnController(),
  });
}

function createNavigation(body) {
  const HTMLContentNative = {
    1: body.querySelector(':nth-child(1)'),
    2: body.querySelector(':nth-child(2)'),
    3: body.querySelector(':nth-child(3)'),
    4: body.querySelector(':nth-child(4)'),
    5: body.querySelector(':nth-child(5)'),
    6: body.querySelector(':nth-child(6)'),
  }

  return factoryBuilder(HTMLContentNative, body);
}

function createHeader(body) {
  const HTMLContentNative = {
    1: body.querySelector(':nth-child(7)'),
    2: body.querySelector(':nth-child(8)'),
    3: body.querySelector(':nth-child(9)'),
    4: body.querySelector(':nth-child(10)'),
    5: body.querySelector(':nth-child(11)'),
  }

  return factoryBuilder(HTMLContentNative, body);
}

function createArticle(body) {
  const HTMLContentNative = {
    1: body.querySelector(':nth-child(12)'),
    2: body.querySelector(':nth-child(13)'),
    3: body.querySelector(':nth-child(14)'),
    4: body.querySelector(':nth-child(15)'),
    5: body.querySelector(':nth-child(16)'),
    6: body.querySelector(':nth-child(17)'),
    7: body.querySelector(':nth-child(18)'),
    8: body.querySelector(':nth-child(19)'),
    9: body.querySelector(':nth-child(20)'),
    10: body.querySelector(':nth-child(21)'),
    11: body.querySelector(':nth-child(22)'),
    12: body.querySelector(':nth-child(23)'),
  }

  return factoryBuilder(HTMLContentNative, body);
}

function createDownload(body) {
  const HTMLContentNative = {
    1: body.querySelector(':nth-child(24)'),
    2: body.querySelector(':nth-child(25)'),
    3: body.querySelector(':nth-child(26)'),
  }

  return factoryBuilder(HTMLContentNative, body);
}

function createFooter(body) {
  const HTMLContentNative = {
    1: body.querySelector(':nth-child(27)'),
    2: body.querySelector(':nth-child(28)'),
    3: body.querySelector(':nth-child(29)'),
    4: body.querySelector(':nth-child(30)'),
    5: body.querySelector(':nth-child(31)'),
    6: body.querySelector(':nth-child(32)'),
    7: body.querySelector(':nth-child(33)'),
    8: body.querySelector(':nth-child(34)'),
    9: body.querySelector(':nth-child(35)'),
    10: body.querySelector(':nth-child(36)'),
    11: body.querySelector(':nth-child(37)'),
    12: body.querySelector(':nth-child(38)'),
    13: body.querySelector(':nth-child(39)'),
    14: body.querySelector(':nth-child(40)'),
    15: body.querySelector(':nth-child(41)'),
    16: body.querySelector(':nth-child(42)'),
  }

  return factoryBuilder(HTMLContentNative, body);
}

// Resolve SVG to /download button
function additionalImageFunction(content) {
  let OSName = "Unknown";
  if (navigator.userAgent.indexOf("Win") != -1) OSName = "Windows";
  if (navigator.userAgent.indexOf("Mac") != -1) OSName = "Mac";
  if (navigator.userAgent.indexOf("X11") != -1) OSName = "UNIX";
  if (navigator.userAgent.indexOf("Linux") != -1) OSName = "Linux";
  if (navigator.userAgent.indexOf("Android") != -1) OSName = "Android";
  if (navigator.userAgent.indexOf("Like Mac") != -1) OSName = "iOS";

  // Builder
  function sourceVectorBuilder(element, resolve, reject) {
    fetch(element.src).then((data) => {
      data.text().then((text) => {
          const source = document.createElement('i');
          const removeScript = text.substr(text.search('<!-- Code injected by live-server -->'),
            text.search('</script>'));
          source.innerHTML = text.replace(removeScript, '</svg>');
          return resolve({html: source, element});
        }).catch((error) => reject(error));
    }).catch((error) => reject(error));
  }

  /**
   * This promise will read the SVG file into the /img folder
   * and render it into the HTML element of type button.
   */
  if (content[0]?.nodeName) {
    return new Promise((resolve, reject) => {
      content.forEach((element) => {
        if (element.nodeName === 'IMG')
          return sourceVectorBuilder(element, resolve, reject);
        if (element.nodeName === 'A' &&
          element.firstChild.data.search('Baixar para') !== -1)
        element.innerText = `Baixar para ${OSName}`;
      });
    });
  } else {
    return new Promise((resolve, reject) => {
      return sourceVectorBuilder(content, resolve, reject);
    });
  }
}

function createToggleMode() {
  const context = {
    items: [],
    time: {
      default: 0,
      changed: false,
    },
    seems: false,
    component: [],
    to(time) {
      this.time.default = time;
      this.time.changed = true;
      return this;
    },
    document(document) {
      this.component = document;
      return this;
    },
    build(fnCallback) {
      for (const iterator in this.component) {
        if (!this.time.changed) {
          this.items.push(this.items[iterator]);
          this.component[iterator].classList.add(this.items[iterator]);
        }
        if (this.time.changed) {
          if (this.time.default > iterator) {
            this.items.push(this.items[iterator]);
            this.component[iterator].classList.add(this.items[iterator]);
          }
        }
        
        for (const key of this.component[iterator].childNodes) {
          if (fnCallback)
            fnCallback(this.stop, key, Number.parseInt(iterator)+1);
        }
      }
    }
  }

  /**
   * Object responsible for the factory function that will
   * define the type of switch between data.
   */
  return Object.defineProperties(context, {
    stop: {
      configurable: true,
      enumerable: false,
      writable: false,
      value() {
        this.seems = !this.seems;
        return this;
      }
    },
    create: {
      configurable: true,
      enumerable: true,
      writable: false,
      value(...items) {
        this.items = items;
        return this;
      },
    }
  });
}

/**
 * Here are the constructors of all elements
 * belonging to the styleSheet function.
 */
function onSelectorManager(scope) {
  return Object.defineProperty(scope, 'add', {
    configurable: true,
    enumerable: true,
    writable: false,
    value([node, content, next], body) {
      return {
        header() {
          const [header, actions, hero] = node;
          content.itemName.forEach((name) => {
            if (content.item[name].nodeName === 'IMG') {
              const imgSrc = content.item[name].getAttribute('src');
              header.style = `background-image: url(${imgSrc})`;
              return body.removeChild(content.item[name]);
            }
            if (content.item[name].nodeName === 'BUTTON') {
              additionalImageFunction(content.item[name].childNodes)
                .then((data) => {
                  content.item[name].removeChild(data.element);
                  content.item[name].appendChild(data.html);
                })
                .catch(error => console.error(error));
              return actions.appendChild(content.item[name]);
            }
            hero.appendChild(actions);
            hero.appendChild(content.item[name]);
          });
          header.appendChild(hero);
          return next({ toInside: header });
        },
        navigation() {
          const [navbar, menu] = node;
          content.itemName.forEach((name) => {
            if (content.item[name].nodeName === 'A')
            return menu.appendChild(content.item[name]);
            navbar.appendChild(content.item[name]);
          });
          navbar.appendChild(menu);
          return next({ toInside: navbar });
        },
        article() {
          const [article, sections, wrappers, texts] = node;
          const moldes = createToggleMode();

          // Filtered
          const image = content.item.filter((value) => value.nodeName === 'IMG');
          const title = content.item.filter((value) => value.nodeName === 'H2');
          const description = content.item.filter((value) => value.nodeName === 'P');

          /**
           * This will organize the items from all
           * the main sections of the article.
           */
          texts.forEach((text, idx) => {
            text.appendChild(title[idx]);
            text.appendChild(description[idx]);
          });

          wrappers.forEach((wrapper, idx) => {
            wrapper.appendChild(image[idx]);
            wrapper.appendChild(texts[idx]);
          });

          sections.forEach((section, idx) => {
            section.appendChild(wrappers[idx]);
            article.appendChild(section);
          });

          moldes.create('ltr', 'rtl')
            .to(3)
            .document(sections)
            .build();

          moldes.create(null, 'bg-section')
            .to(4)
            .document(sections)
            .build((state, child, current) => {
              if (current >= 4)
                child.classList.add('section-extended-mode');
              return state();
            });

          return next({ toInside: article });
        },
        download() {
          const [section, container, sparkles] = node;

          content.item.forEach((item) => {
            if (item.nodeName == 'IMG')
              return sparkles.appendChild(item);
            if (item.nodeName == 'BUTTON')
              return additionalImageFunction(item.childNodes)
                .then((data) => {
                  item.removeChild(data.element);
                  item.appendChild(data.html);
                  container.appendChild(item);
                })
                .catch(error => console.error(error));
            container.appendChild(item);
          });

          section.appendChild(container);
          section.appendChild(sparkles);

          return next({ toInside: section });
        },
        footer() {
          const [
            footer,
            rows,
            routes,
            language,
            social,
            container
          ] = node;

          content.item.forEach((element, idx) => {
            if (Number.parseInt(idx) <= 5) {
              if (element.nodeName == 'H4') {
                routes[0].appendChild(element);
              }
              if (element.nodeName == 'SELECT') {
                element.dataset.country = element.value;
                element.addEventListener('change', (item) => {
                  element.dataset.country = item.target.value;
                });
                language.appendChild(element);
                routes[0].appendChild(language);
              }
              if (element.nodeName == 'IMG') {
                additionalImageFunction(element)
                  .then((data) => {
                    social.appendChild(data.html);
                    routes[0].appendChild(social);
                    body.removeChild(element);
                  })
                  .catch((error) => console.error(error));
              }
              // Final
              rows[0].appendChild(routes[0]);
            } else if (Number.parseInt(idx) <= 7) {
              routes[2].appendChild(element);
              rows[0].appendChild(routes[1]);
              rows[0].appendChild(routes[2]);
            } else if (Number.parseInt(idx) <= 9) {
              routes[3].appendChild(element);
              rows[0].appendChild(routes[3]);
            } else if (Number.parseInt(idx) <= 11) {
              routes[4].appendChild(element);
              rows[0].appendChild(routes[4]);
            } else if (Number.parseInt(idx) <= 13) {
              routes[5].appendChild(element);
              rows[0].appendChild(routes[5]);
            } else if (Number.parseInt(idx) <= 15) {
              container.appendChild(element);
              rows[1].appendChild(container);
            }
          });

          footer.appendChild(rows[0]);
          footer.appendChild(rows[1]);

          return next({ toInside: footer });
        }
      };
    },
  });
}
