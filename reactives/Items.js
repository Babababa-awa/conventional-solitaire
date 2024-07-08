const TRAP_ITEMS = {
  'body-odor': {
    title: 'Someone Forgot To Shower',
    description: 'Body odor fills the area. The stench is so putrid, it prevents you from proceeding.',
    image: '/image/item/trap/body-odor.avif',
    frequency: 2,
    clear: ['deodorant'],
    price: 5,
    yes: 'Deodorize Him Against His Will',
    no: 'Bribe Security To Remove Him',
  },
  'furry': {
    title: 'Furry Spotted',
    description: 'Furry spotted on the convention floor, it kind of scares you. Maybe you should take a different route.',
    image: '/image/item/trap/furry.avif',
    imageCover: true,
    frequency: 2,
    happiness: -3,
    action: 'sort',
    clear: ['ember-creature', 'jfc'],
    "yes-ember-creature": 'Burn It!',
    "yes-jfc": 'Drink Some JFC To Relax',
    no: 'Find A Different Route',
  },
  'dizzy-rumor': {
    title: 'Unfounded Rumors',
    description: 'Dizzy has been spreadying rumors about Jelly again.',
    image: '/image/dizzy.avif',
    frequency: 5,
    happiness: -10,
    actionAudio: 'dizzy',
    clear: ['bug-spray'],
    yes: 'Spray Her!',
  },
  'luminid': {
    title: 'Lemon Theif',
    description: 'A lemon stealing lemon has been doing the rounds stealing lemons. You should probably kill it with fire.',
    actionDescription: 'This lemon stole half your lemons. They did leave a trail though, maybe you can get them back if you follow it.',
    image: '/image/item/trap/luminid.avif',
    frequency: 2,
    price: 0.5,
    priceMultiplyer: true,
    clear: ['ember-creature'],
    action: 'stars',
    yes: 'Burn It!',
    no: 'Let It Steal My Lemons',
  },
  'dizzy-creature': {
    title: 'Dizzgusting Creature',
    description: 'Dizzychi keeps getting in your way, what does it even want?',
    image: '/image/item/trap/dizzy-creature.avif',
    frequency: 2,
    happiness: -15,
    stock: 1,
    clear: ['ember-creature', 'bug-spray'],
    "yes-ember-creature": 'Burn It!',
    "yes-bug-spray": 'Spray It!',
  },
  'bump': {
    title: 'Hey No Running!',
    description: 'Some kid bumped into you while running down the convention floor. One of your lemons flew somewhere.',
    image: '/image/item/trap/bump.avif',
    frequency: 1,
    price: 1,
    priceZero: true,
    no: 'My Lemon!',
  },
  'bump': {
    title: 'Hey No Running!',
    description: 'Some kid bumped into you while running down the convention floor. Your lemons flew everywhere.',
    image: '/image/item/trap/bump.avif',
    frequency: 1,
    price: 2,
    priceZero: true,
    no: 'My Lemons!',
  },
  'bump': {
    title: 'Hey No Running!',
    description: 'Some kid bumped into you while running down the convention floor. Your lemons flew everywhere.',
    image: '/image/item/trap/bump.avif',
    frequency: 1,
    price: 3,
    priceZero: true,
    no: 'My Lemons!',
  },
}

const FAKE_ITEMS = {
  'fake-coffee': {
    title: 'Jelly Flavored Coffee',
    image: '/image/item/real/jelly-coffee.avif',
    description: 'Beloved, hopeful, and with plenty of room to dream, the Hoshiumi Jelly coffee - a light roast that has plenty of bright flavours. This Rwanda coffee bean comes with notes of pineapple juice and nuttiness that are roasted to fully bring out the sweetness. But don’t be fooled by all these gentle notes, Jelly Coffee still packs all the punch needed to chase your dreams!',
    price: 3,
    happiness: -5,
  },
  'jelle-hoshmi-poster': {
    title: 'Authentic Jelle Hoshmi Poster',
    image: '/image/item/fake/jelle-hoshmi.avif',
    description: 'A guenuine poster of the >w< super seiso >o< super cute >w< idol princess of the stars Jelle Hoshmi of Craze Collect.',
    price: 2,
    happiness: -4,
  },
}

const REAL_ITEMS = {
  'real-coffee': {
    title: 'Jelly Flavored Coffee',
    image: '/image/item/real/jelly-coffee.avif',
    description: 'Jelly, a lonely hardworking girl with an aspiration to be loved by millions. To help her realize this dream,  a robust coffee from Indonesia, known for having one of the heaviest and richest flavours, has been chosen. This particular coffee from Sumatra has one of the most profound flavour profiles and is loved by many.',
    frequency: 3,
    price: 3,
    happiness: 5,
  },
  'jorb': {
    title: 'Jorb',
    image: '/image/item/real/jorb.gif',
    description: 'You just want to stare at it and ponder.',
    frequency: 1,
    price: 20,
    happiness: 25,
  },
  'antennae': {
    title: 'Antennae Headband',
    image: '/image/item/real/antennae.avif',
    description: 'As humans, we will never have the real deal, but that doesn\'t stop us from dreaming.',
    frequency: 2,
    price: 5,
    happiness: 7,
  },
  'doro-1': {
    title: 'Jelly Doro',
    image: '/image/item/real/doro1.avif',
    description: 'How can you say no to that face?',
    frequency: 1,
    price: 2,
    happiness: 2,
  },
  'doro-2': {
    title: 'Jelly Doro',
    image: '/image/item/real/doro2.avif',
    description: 'How can you say no to that face?',
    frequency: 2,
    price: 2,
    happiness: 2,
  },
  'jelly-baba': {
    title: 'Jelly Is You',
    image: '/image/item/real/jelly-baba.avif',
    description: 'JELLY IS WIN',
    frequency: 1,
    price: 1,
    happiness: 2,
  },
  'doodle-1': {
    title: 'Jelly Doodle',
    image: '/image/item/real/jelly-doodle1.avif',
    description: 'She\'s so artistic!',
    frequency: 1,
    price: 1,
    happiness: 2,
  },
  'doodle-2': {
    title: 'Jelly Doodle',
    image: '/image/item/real/jelly-doodle2.avif',
    description: 'Hand Ribs!',
    frequency: 1,
    price: 1,
    happiness: 3,
  },
  'doodle-3': {
    title: 'Jelly Doodle',
    image: '/image/item/real/jelly-doodle3.avif',
    description: 'Awawawanya!',
    frequency: 1,
    price: 1,
    happiness: 2,
  },
  'doodle-4': {
    title: 'Jelly Doodle',
    image: '/image/item/real/jelly-doodle4.avif',
    description: 'Soy!',
    frequency: 1,
    price: 1,
    happiness: 2,
  },
  'doodle-5': {
    title: 'Jelly Doodle',
    image: '/image/item/real/jelly-doodle5.avif',
    description: 'Writing descriptions is hard.',
    frequency: 1,
    price: 1,
    happiness: 2,
  },
  'jelly-jar': {
    title: 'Jelly Jar',
    image: '/image/item/real/jelly-jar.avif',
    description: 'It looks so good, but what does it taste like?',
    frequency: 2,
    price: 5,
    happiness: 5,
  },
  'kettle': {
    title: 'Jelly Kettle',
    image: '/image/item/real/kettle.avif',
    description: 'Use it to brew your Jelly Flavored Coffed!',
    frequency: 1,
    price: 4,
    happiness: 4,
  },
  'milf-hat': {
    title: 'Man I Love Factories Hat',
    image: '/image/item/real/milf-hat.avif',
    description: 'Tell the world how much you love factories!',
    frequency: 1,
    price: 4,
    happiness: 3,
  },
  'ring-pop': {
    title: 'Jelly Ring Pop',
    image: '/image/item/real/ring-pop.avif',
    description: 'It looks just like Jelly\'s totally real diamond ring, only this one is candy.',
    frequency: 3,
    price: 1,
    happiness: 1,
  },
  'simp-hat': {
    title: 'Solitaire Is My Passion Hat',
    image: '/image/item/real/simp-hat.avif',
    description: 'Share your passion for solitaire with the world.',
    frequency: 1,
    price: 4,
    happiness: 5,
  },
  'test1-chan': {
    title: 'Test1-chan',
    image: '/image/item/real/test1-chan.avif',
    description: 'Wel-welcome home master~ Would you like to... add? Would you like to... subtract? Or... Or would you like to... to multiply?',
    frequency: 1,
    price: 8,
    happiness: 10,
  },
  'keycaps': {
    title: 'Jelly Keycaps',
    image: '/image/item/real/jelly-keycaps.avif',
    description: 'Your keyboard will never look better!',
    frequency: 1,
    price: 10,
    happiness: 15,
  },
}

const CONSUME_ITEMS = {
  'lemon-1': {
    title: '+1 Lemon',
    cardTitle: '+1 Lemon',
    image: '/image/lemon.svg',
    description: 'Lucky! You found a lemon on the floor!',
    frequency: 1,
    price: -1,
  },
  'lemon-2': {
    title: '+2 Lemons',
    cardTitle: '+2 Lemons',
    image: '/image/lemon.svg',
    description: 'Lucky! You found some lemons on the floor!',
    frequency: 1,
    price: -2,
  },
  'lemon-3': {
    title: '+3 Lemons',
    cardTitle: '+3 Lemons',
    image: '/image/lemon.svg',
    description: 'Lucky! You found some lemons on the floor!',
    frequency: 1,
    price: -3,
  },
  'bug-spray': {
    title: 'Bug Spray',
    description: 'Stops bugs dead in their tracks!',
    image: '/image/item/consume/bug-spray.avif',
    frequency: 2,
  },
  'jfc': {
    title: 'Jelly Flavored Coffee',
    description: 'Brewed on site, it\'s sure to keep you relaxed and focused.',
    image: '/image/item/consume/jfc.avif',
    frequency: 1,
    action: 'sort-optimal',
    yes: 'Find A Better Route Route'
  },
  'deodorant': {
    title: 'Deodorant',
    description: 'A staple of basic human hygene. Fast acting!',
    image: '/image/item/consume/deodorant.avif',
    frequency: 1,
  },
  'jellboro': {
    title: 'Jellboro Cigarettes',
    image: '/image/item/consume/jellboro.avif',
    description: 'Indulge in the unparalleled smoothness of Jellboro cigarettes. Each puff delivers a refined, velvety taste that caresses your senses. As you savor the rich, mellow flavor, you\'ll not only enjoy the superior quality but also exude an air of effortless cool.',
    actionDescription: 'Hey! You can\'t smoke in here! You get kicked out of the convention. Head back to your hotel and put on a new disguise. You might as well drop off your merch while you are at it.',
    frequency: 1,
    action: 'hotel',
    yes: 'Savor that rich mellow flavor!'
  },
  'jelly-monkey': {
    title: 'Monkey Creature',
    description: 'This thing is fast and efficient, displaying optimal stocking prowess.',
    image: '/image/item/consume/jelly-monkey.avif',
    frequency: 1,
    happiness: 10,
    stock: -1,
    yes: 'Send It To The Mines',
  },
  'ember-creature': {
    title: 'Smug Creature',
    description: 'Whatever this thing is, it means business.',
    actionDescription: 'Embergotchi is sure take care of deadliest of threats.',
    image: '/image/item/consume/ember-creature.avif',
    frequency: 1,
    actionAudio: 'burn',
    // suitAction: 'burn',
  },
}

export default class {
  constructor(state) {
    this.state = state

    this._trapItems = this._buildItems(TRAP_ITEMS, 'trap')
    this._fakeItems = this._buildItems(FAKE_ITEMS, 'fake')
    this._realItems = this._buildItems(REAL_ITEMS, 'real')
    this._consumeItems = this._buildItems(CONSUME_ITEMS, 'consume')

    this._ratio = [
      'trap',
      'trap',
      'trap',
      'fake',
      'real',
      'real',
      'real',
      'consume',
      'consume',
      'consume',
      'consume',
    ]
    this._ratio = this._shuffle(this._ratio)
    this._activeRatio = []
  }

  getItemFromName(name) {
    if (name in TRAP_ITEMS) {
      return TRAP_ITEMS[name]
    }

    if (name in FAKE_ITEMS) {
      return FAKE_ITEMS[name]
    }

    if (name in REAL_ITEMS) {
      return REAL_ITEMS[name]
    }

    if (name in CONSUME_ITEMS) {
      return CONSUME_ITEMS[name]
    }

    return null
  }

  addToRatio(type) {
    this._ratio.push(type)
  }

  _buildItems(items, type) {
    let result = []

    let keys = Object.keys(items)

    for (let key of keys) {
      let frequency = items[key].frequency || 1

      for (let i = 0; i < frequency; ++i) {
        let item = {
          key: key,
          type: type,
          ...items[key],
        }

        if (!('price' in item)) {
          item.price = 0
        }

        if (!('happiness' in item)) {
          item.happiness = 0
        }

        if (!('stock' in item)) {
          item.stock = 0
        }

        if (type === 'trap') {
          if (!('action' in item)) {
            item.action = null
          }

          if (!('actionDescription' in item)) {
            item.actionDescription = null
          }

          if (!('clear' in item)) {
            item.clear = []
          }
        }

        result.push(item)
      }
    }

    result = this._shuffle(result)

    return result
  }

  _buildRatio() {
    return this._shuffle(this._ratio.slice(0))
  }

  _shuffle(items) {
    for (let i = items.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1))

      let temp = items[i]
      items[i] = items[j]
      items[j] = temp
    }

    return items;
  }

  getItems(count) {
    let items = []

    for (let i = 0; i < count; ++i) {
      let type = this._getType()

      items.push(this._getItem(type))
    }

    return items
  }

  _getType() {
    if (this._activeRatio.length === 0) {
      this._activeRatio = this._buildRatio()
    }

    return this._activeRatio.pop()
  }
  _getItem(type) {
    let key = '_' + type + 'Items'

    if (this[key].length === 0) {
      switch (type) {
        case 'trap':
          this[key] = this._buildItems(TRAP_ITEMS, type)
          break;
        case 'fake':
          this[key] = this._buildItems(FAKE_ITEMS, type)
          break;
        case 'real':
          this[key] = this._buildItems(REAL_ITEMS, type)
          break;
        case 'consume':
          this[key] = this._buildItems(CONSUME_ITEMS, type)
          break;
      }
    }

    return this[key].pop()
  }
}
