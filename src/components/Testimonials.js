import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect'
import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'

let testimonials = [
  // Column 1
  [
    {
      content: 'Bitcoin: A Peer-to-Peer Electronic Cash System.',
      url: 'https://btc.543x.com/',
      author: {
        name: 'BTC',
        role: 'CA:ArXETDYEcKmPWTN7CbLtAtw3bruJbrtwb3FD1RnvXFuf',
        avatar: require('@/img/avatars/ryan-florence.png').default.src,
      },
    },
    {
      content: `USD-pegged stablecoin for digital transactions.`,
      url: 'http://usdc.543x.com',
      author: {
        name: 'USDC',
        role: 'CA:3zwVdm5GkUFfJDMJSaMGjQtaMA7sqVWpCynoXcJ6kaX7',
        avatar: require('@/img/avatars/bret-hart.png').default.src,
      },
    },
    {
      content: `Rare digital collectibles on the blockchain.`,
      url: 'http://busd.543x.com',
      author: {
        name: 'BUSD',
        role: 'CA:J8ctjxNqi8vsKS5awupxoe3oK2qzcD3haJdrU8NnwP3x',
        avatar: require('@/img/avatars/dacey-nolan.png').default.src,
      },
    },
    {
      content: 'Girlfriend\'s worth, usually used humorously',
      url: 'https://fdusd.543x.com',
      author: {
        name: 'FDUSD',
        role: 'CA:6fyVxagdYGtYv1u117cctvrYGJQwEYmg8LivELTT5yZL',
        avatar: require('@/img/avatars/gilbert-rabut-tsurwa.png').default.src,
      },
    },
    {
      content:
        'Chinese gold coins with varying panda designs',
      url: 'http://panda.543x.com',
      author: {
        name: 'PANDA',
        role: 'CA:FvWxbAxMTrYVNVrvUusjNNSLFd55CwATZ2dYnUWy4XYU',
        avatar: require('@/img/avatars/graeme-houston.png').default.src,
      },
    },
    {
      content: `1 Bitcoin is equivalent to 100 million Satoshi`,
      url: 'http://satoshi.543x.com',
      author: {
        name: 'SATOSHI',
        role: 'CA:F37bUysKLHJBvFNCxAfGhDMArbZdk7LY1xAEc2MaqZja',
        avatar: require('@/img/avatars/aaron-bushnell.png').default.src,
      },
    },
    {
      content: 'Efficient, low-cost, decentralized blockchain platform.',
      url: 'http://ton.543x.com',
      author: {
        name: 'TON',
        role: `CA:F37bUysKLHJBvFNCxAfGhDMArbZdk7LY1xAEc2MaqZja`,
        avatar: require('@/img/avatars/ken-wheeler.png').default.src,
      },
    },
    {
      content: `USD-pegged stablecoin for blockchain transactions .`,
      url: 'https://usdt.543x.com',
      author: {
        name: 'USDT',
        role: 'CA:45t4Cpoj5uZFmurz2bD1pEmXD4x1WaD3kSnetpHx9ZNi',
        avatar: require('@/img/avatars/jad-limcaco.png').default.src,
      },
    },
    {
      content: `It works right now, there's no need for a sidechain, the only token needed is bitcoin itself.`,
      url: 'http://shib.543x.com',
      author: {
        name: 'SHIB',
        role: 'CA:45t4Cpoj5uZFmurz2bD1pEmXD4x1WaD3kSnetpHx9ZNi',
        avatar: require('@/img/avatars/luke-redpath.png').default.src,
      },
    },
    {
      content:
        "An internet meme used to express emotion and create humor",
      url: 'http://no.543x.com/',
      author: {
        name: 'NO',
        role: 'CA:8FSGagHqgjWDb3FKz8DrXuPjf5U4eX26YTmpTpk1iYsG',
        avatar: require('@/img/avatars/jon-bloomer.png').default.src,
      },
    },
    
    {
      content:
        'A currency that delivers positivity, optimism, friendship and fun.',
      url: 'http://clown.543x.com',
      author: {
        name: 'CLOWN',
        role: 'CA:Hv4D1ohDS6xTiBfHU4gXxCLUM5ekFAb74s9J3H5TzdBx',
        avatar: require('@/img/avatars/skttl.png').default.src,
      },
    },
    {
      content: 'Native cryptocurrency of the Binance platform.',
      url: 'https://bnb.543x.com',
      author: {
        name: 'BNB',
        role: 'CA:124XZFhE8ABFYSuDZkxbkKTKjqrB7CpHCspCPsQJPQvL',
        avatar: require('@/img/avatars/aarondfrancis.png').default.src,
      },
    },
    {
      content:
        "The most memeable memecoin on the Bitcoin Chain known for its significant cultural impact and mascot status.",
      url: 'http://sats.543x.com',
      author: {
        name: 'SATS',
        role: 'CA:124XZFhE8ABFYSuDZkxbkKTKjqrB7CpHCspCPsQJPQvL',
        avatar: require('@/img/avatars/Megasanjay.png').default.src,
      },
    },
    {
      content:
        'Cardano blockchain’s cryptocurrency for payments and investments.',
      url: 'http://dog.543x.com',
      author: {
        name: 'DOG•GO•TO•THE•MOON',
        role: 'CA:124XZFhE8ABFYSuDZkxbkKTKjqrB7CpHCspCPsQJPQvL',
        avatar: require('@/img/avatars/brentgarner.png').default.src,
      },
    },
  ],
  [
    {
      content:
        'decentralized platform for smart contracts DApps.',
      url: 'https://eth.543x.com',
      author: {
        name: 'ETH',
        role: 'CA:EBBHUma1N1pAZBFjSHEqRRaZ6zGYjWsbiQDrkftFSQuh',
        avatar: require('@/img/avatars/guillermo-rauch.png').default.src,
      },
    },
    {
      content: `Native cryptocurrency of the Solana blockchain`,
      url: 'http://sol.543x.com',
      author: {
        name: 'SOL',
        role: 'CA:ATvWFEriuCm5ES26sXncc8tYBiDnjGbahzG6fp3uYQBk',
        avatar: require('@/img/avatars/sara-vieira.png').default.src,
      },
    },
    {
      content:
        "Native cryptocurrency of the Ripple network .",
      url: 'https://xrpl.org',
      author: {
        name: 'XRP',
        role: 'CA:2qkVV1aJSq29RCufbc7yCcGsS7k97ZkQaZzUb9pM1Nnh',
        avatar: require('@/img/avatars/igor_randj.png').default.src,
      },
    },
    {
      content:
        'The most memeable memecoin on the Bitcoin Chain  known for its significant cultural impact and mascot status.',
      url: 'http://rats.543x.com',
      author: {
        name: 'RATS',
        role: 'CA:2qkVV1aJSq29RCufbc7yCcGsS7k97ZkQaZzUb9pM1Nnh',
        avatar: require('@/img/avatars/ohhdanm.png').default.src,
      },
    },
    {
      content:
        'Meme based cryptocurrency known as dogecoin.',
      url: 'https://dogecoin.com',
      author: {
        name: 'DOGE',
        role: 'CA:AncaR5NrA9ZbDY8tWntGyb5CZAK8QhDLfGhJBG3NWwrR',
        avatar: require('@/img/avatars/sertxudev.png').default.src,
      },
    },
    {
      content:
        "Inspired by the snake flexibility, stealth, alertness, metamorphosis, evolution and global interconnection!",
      url: 'https://snake.543x.com',
      author: {
        name: 'SNAKE',
        role: 'CA:2qkVV1aJSq29RCufbc7yCcGsS7k97ZkQaZzUb9pM1Nnh',
        avatar: require('@/img/avatars/tesla.png').default.src,
      },
    },
    {
      content:
        'It has the characteristics of agile adaptation, community power, hidden security, and reproductive expansion.',
      url: 'https://rat.543x.com',
      author: {
        name: 'RAT',
        role: 'CA:DaZacZ6z8jAMgwBsMsGfFjuUeVpnoTxTLMkweSXgUyap ',
        avatar: require('@/img/avatars/walmart.png').default.src,
      },
    },
    {
      content:
        "Mysterious, unique, possessing inner strength, exploring the unknown, aiming to become a highly personalized.",
      url: 'https://dragon.543x.com',
      author: {
        name: 'dragon',
        role: 'CA:5Pg797Jd9CFCi8MUUoh7N7g6iWsboHC2SeWs7rRyxVwe',
        avatar: require('@/img/avatars/words2.png').default.src,
      },
    },
    {
      content:
        'Inspired by the Navy SEALs, it emphasizes high security, covert transactions and global adaptability.',
      url: 'https://seal.543x.com',
      author: {
        name: 'SEAL',
        role: 'CA:CzA7tZRbUBtfzJRUDRBf7V1YQFJJ2pLhajUVjKBm8Ahu',
        avatar: require('@/img/avatars/callofduty_companion.png').default.src,
      },
    },
    {
      content:
        'With characteristics such as agile adaptability, community cooperation, exploration of the unknown.',
      url: 'https://otter.543x.com',
      author: {
        name: 'OTTER',
        role: 'CA:7BkF2u2nUe3MrTUXY2sYdyuCQHrDBtrRzHqARrRWSg7g',
        avatar: require('@/img/avatars/lendmn.png').default.src,
      },
    },
    {
      content: 'It combines the characteristics of robustness, durability, investment returns, community mutual assistance.',
      url: 'https://cow.543x.com',
      author: {
        name: 'Cow',
        role: 'CA:EMQvrURJHps2qZYb4mRb8pNRDmWjzBt57krsoc4B8cHc ',
        avatar: require('@/img/avatars/cow.png').default.src,
      },
    },
    {
      content:
        'Fast, agile, strong network, strong adaptability and cute affinity, aiming to provide users with efficient.',
      url: 'https://rabbit.543x.com',
      author: {
        name: 'RABBIT',
        role: 'CA:ECGz3d727sk2iECrQxTkTLgSDKeiheTcPkoBZn9UWc4n',
        avatar: require('@/img/avatars/pinterest.png').default.src,
      },
    },
    {
      content:
        'it combines loneliness, despair, exploration spirit and community power, aiming to become a unique existence in the cryptocurrency field.',
      url: 'http://a.543x.com',
      author: {
        name: 'A',
        role: 'CA:26BH9BqQQG6WLGoGmWYsW5qd6bM4Bzuz59hBxRAkg6ak',
        avatar: require('@/img/avatars/shrutibalasa.png').default.src,
      },
    },
  ],
  // Column 3
  [
    {
      content:
        'Girlfriend worth, usually used humorously.',
      url: 'http://gf.543x.com',
      author: {
        name: 'GF',
        role: 'CA:4RtELABCLKgbptLRLGitdzcLrFnkhpgA57xj53QgoTTA',
        avatar: require('@/img/avatars/zachknicker.png').default.src,
      },
    },
    {
      content:
        "A cultural symbolic currency full of fun, love of life and friendship.",
      url: 'https://yaya.543x.com',
      author: {
        name: 'YAYA',
        role: 'CA:GFXzsU8XJCCLRqr7PWcK1gihEi88LVHE49HjkvcMjkiT',
        avatar: require('@/img/avatars/grossmeyer.png').default.src,
      },
    },
    {
      content:
        'An elegant and unique cat-themed platform for trading cat supplies, inspired by a cat with pearl earrings.',
      url: 'http://cat.543x.com',
      author: {
        name: "CAT",
        role: 'CA:nVS6UVNVL2zQsorZpqmsrR527eqGacMAHtSV7tHKci7',
        avatar: require('@/img/avatars/wordpress.png').default.src,
      },
    },
    {
      content:
        'Avalanche native token used to validate the network, vote and pay transaction fees, etc.',
      url: 'https://www.avax.network',
      author: {
        name: 'AVAX',
        role: 'CA:nVS6UVNVL2zQsorZpqmsrR527eqGacMAHtSV7tHKci7',
        avatar: require('@/img/avatars/dave.png').default.src,
      },
    },
    {
      content:
        "It works right now, there is no need for a sidechain, the only token needed is bitcoin itself.",
      url: 'http://ord.543x.com',
      author: {
        name: 'ORD',
        role: 'CA:B96wBokgFf5KsuPra3dSnd3nPeiY3fAD48bAshMALQ44',
        avatar: require('@/img/avatars/tableau.png').default.src,
      },
    },
    {
      content:
        'An internet meme used to express emotion and create humor.',
      url: 'http://qq.543x.com',
      author: {
        name: 'QQ',
        role: 'CA:6nr68C4TW9ZTXddKp3QHHcbaQyRMiPPeqqkUcf2wjU2d',
        avatar: require('@/img/avatars/flipkart.png').default.src,
      },
    },
    {
      content: 'community-driven meme coin with a mission to reach the moon. You can have fun with meme coins while gaining pepe trust.',
      url: 'http://jump.543x.com',
      author: {
        name: 'JUMP',
        role: 'CA:EgNMgTbTFy1pE15YfhFTpsB97ATpojMWsFPvpHnH8vdV',
        avatar: require('@/img/avatars/kentcdodds.png').default.src,
      },
    },
    {
      content: "Fast, agile, strong network, strong adaptability and cute affinity, aiming to provide users with efficient, stable and friendly cryptocurrency trading experience",
      url: 'https://miqi.543x.com',
      author: {
        name: 'MIQI',
        role: 'CA:42RrRKsSPbYYcfBzBgVFHg6txmgTdiqoLttCjPJoeJWW',
        avatar: require('@/img/avatars/levelsio.png').default.src,
      },
    },
    {
      content:
        'Inspired by the snake flexibility, stealth, alertness, metamorphosis, evolution and global interconnection, we aim to become .',
      url: 'https://sheep.543x.com',
      author: {
        name: 'SHEEP',
        role: 'CA:5BLtJtMYYw3QxWcXGr9fTPHAVFe766to1WRYLQYJBJrn',
        avatar: require('@/img/avatars/gregsvn.png').default.src,
      },
    },
    {
      content: 'It has the characteristics of agile adaptation, community power, hidden security, and reproductive expansion. It provides users with a safe.',
      url: 'https://peace.543x.com',
      author: {
        name: 'PEACE',
        role: 'CA:2qkVV1aJSq29RCufbc7yCcGsS7k97ZkQaZzUb9pM1Nnh',
        avatar: require('@/img/avatars/enunomaduro.png').default.src,
      },
    },
    {
      content:
        'A currency that delivers positivity, optimism, friendship and fun',
      url: 'http://yy.543x.com',
      author: {
        name: 'yy',
        role: 'CA:7pajZABTSzNciQaXBBeKn93DxjCZmU8fur8X3VpNG6eo',
        avatar: require('@/img/avatars/mercari.png').default.src,
      },
    },
    {
      content:
        'Inspired by Disney Donald Duck, with its unique naming and branding, efficient and secure transactions, active community',
      url: 'https://donald.543x.com',
      author: {
        name: 'DONALD',
        role: 'CA:AkfGJmaS6DznynN8xA9FhbdbGGYhXSwJv5ZdC6P5TRB4',
        avatar: require('@/img/avatars/discord.png').default.src,
      },
    },
    {
      content:
        'Sweet and cute, fashionable and changeable, stable and reliable, by integrating these qualities.',
      url: 'https://mimi.543x.com',
      author: {
        name: 'MIMI',
        role: 'CA:A8sv51gvHR5a9wynBAf88SmJS7YZ5NpurPTSpeK52kLk ',
        avatar: require('@/img/avatars/bloomberg.png').default.src,
      },
    },
  ],
]

function Testimonial({ author, content, url, expanded }) {
  let [focusable, setFocusable] = useState(true)
  let ref = useRef()

  useEffect(() => {
    if (ref.current.offsetTop !== 0) {
      setFocusable(false)
    }
  }, [])

  return (
    <li ref={ref} className="text-sm leading-6">
      <figure className="relative flex flex-col-reverse bg-slate-50 rounded-lg p-6 dark:bg-slate-800 dark:highlight-white/5">
        <blockquote className="mt-6 text-slate-700 dark:text-slate-300">
          {typeof content === 'string' ? <p>{content}</p> : content}
        </blockquote>
        <figcaption className="flex items-center space-x-4">
          <img
            src={author.avatar}
            alt=""
            className="flex-none w-14 h-14 rounded-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div className="flex-auto max-w-[calc(100%-4rem)]">
            <div className="text-base text-slate-900 font-semibold dark:text-slate-300">
              {url ? (
                <a href={url} tabIndex={focusable || expanded ? 0 : -1}>
                  <span className="absolute inset-0" />
                  {author.name}
                </a>
              ) : (
                author.name
              )}
            </div>
            <div className="mt-0.5 whitespace-pre-wrap break-words">{author.role}</div>
          </div>
        </figcaption>
      </figure>
    </li>
  )
}

export function Testimonials() {
  let ref = useRef()
  let [expanded, setExpanded] = useState(false)
  let [showCollapseButton, setShowCollapseButton] = useState(false)
  let [transition, setTransition] = useState(false)
  let { ref: inViewRef, inView } = useInView({ threshold: 0 })
  let initial = useRef(true)

  useIsomorphicLayoutEffect(() => {
    if (initial.current) {
      initial.current = false
      return
    }
    if (expanded) {
      ref.current.focus({ preventScroll: expanded })
    } else {
      ref.current.focus()
      ref.current.scrollIntoView()
    }
    if (expanded) {
      setShowCollapseButton(false)
    }
  }, [expanded])

  useEffect(() => {
    setTimeout(() => setTransition(expanded), 0)
  }, [expanded])

  useEffect(() => {
    if (!expanded || !inView) return
    function onScroll() {
      let bodyRect = document.body.getBoundingClientRect()
      let rect = ref.current.getBoundingClientRect()
      let middle = rect.top + rect.height / 4 - bodyRect.top - window.innerHeight / 2
      let isHalfWay = window.scrollY > middle
      if (showCollapseButton && !isHalfWay) {
        setShowCollapseButton(false)
      } else if (!showCollapseButton && isHalfWay) {
        setShowCollapseButton(true)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll, { passive: true })
    }
  }, [expanded, showCollapseButton, inView])

  return (
    <section
      ref={ref}
      tabIndex="-1"
      className="relative max-w-7xl mx-auto px-4 focus:outline-none sm:px-3 md:px-5"
    >
      <h2 className="sr-only">Testimonials</h2>
      <div
        ref={inViewRef}
        className={clsx(
          'grid grid-cols-1 gap-6 lg:gap-8 sm:grid-cols-2 lg:grid-cols-3',
          !expanded && 'max-h-[33rem] overflow-hidden'
        )}
      >
        {testimonials.map((column, i) => (
          <ul
            key={i}
            className={clsx(
              'space-y-8',
              i === 1 && 'hidden sm:block',
              i === 2 && 'hidden lg:block'
            )}
          >
            {column.map((testimonial) => (
              <Testimonial key={testimonial.author.name} expanded={expanded} {...testimonial} />
            ))}
          </ul>
        ))}
      </div>
      <div
        className={clsx(
          'inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-white pt-32 pb-8 pointer-events-none dark:from-slate-900',
          expanded ? 'sticky -mt-52' : 'absolute',
          transition && 'transition-opacity duration-300',
          expanded && (showCollapseButton ? 'opacity-100' : 'opacity-0')
        )}
      >
        <button
          type="button"
          className={clsx(
            'relative bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 text-sm text-white font-semibold h-12 px-6 rounded-lg flex items-center dark:bg-slate-700 dark:hover:bg-slate-600',
            transition && 'transition-transform',
            expanded && !showCollapseButton && 'translate-y-4',
            (!expanded || showCollapseButton) && 'pointer-events-auto'
          )}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? 'Okay, I get the point' : 'Show more...'}
        </button>
      </div>
    </section>
  )
}
