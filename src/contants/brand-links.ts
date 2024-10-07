/* eslint-disable */

import SweetgreenLogo from '../../public/images/logo/Sweetgreen.png';
import CloverLogo from '../../public/images/logo/clover.png';
import TastyBurgerLogo from '../../public/images/logo/tasty-burger.png';
import WildWillysLogo from '../../public/images/logo/Wild-Willys.png';
import BGoodLogo from '../../public/images/logo/bgood.svg';
import FiveGuysLogo from '../../public/images/logo/Five-Guys.png';
import ShakeShackLogo from '../../public/images/logo/Shake-Shack.png';
import MainelyBurgersLogo from '../../public/images/logo/MainelyBurgers.png';
import JerseyMikesLogo from '../../public/images/logo/Jersey-Mikes.png';
import DohertysLogo from '../../public/images/logo/Dohertys.webp';
import GreggsLogo from '../../public/images/logo/Greggs.jpg';
import HalfwayLogo from '../../public/images/logo/halfway.jpg';
import PaneraBreadLogo from '../../public/images/logo/Panera-Bread.png';
import McDonaldsLogo from '../../public/images/logo/mcd.png';
import KFCLogo from '../../public/images/logo/KFC.png';

export interface BrandItem {
  name: string;
  url: string;
  logo: string;
  division: number;
}

export const burgerLinks: BrandItem[] = [
  {
    name: "sweetgreen",
    url: "https://www.sweetgreen.com",
    logo: SweetgreenLogo,
    division: 2
  },
  {
    name: "clover food lab",
    url: "https://www.cloverfoodlab.com",
    logo: CloverLogo,
    division: 3,
  },
  {
    name: "B.GOOD",
    url: "https://www.bgood.com",
    logo: BGoodLogo,
    division: 1,
  },
  {
    name: "FIVE GUYS",
    url: "https://www.fiveguys.com",
    logo: FiveGuysLogo,
    division: 3,
  },
  {
    name: "Shake Shack",
    url: "https://www.shakeshack.com",
    logo: ShakeShackLogo,
    division: 2,
  },
  {
    name: "Tasty Burger",
    url: "https://www.tastyburger.com",
    logo: TastyBurgerLogo,
    division: 1,
  },
  {
    name: "Wild Willy's Burgers",
    url: "http://www.wildwillysburgers.com",
    logo: WildWillysLogo,
    division: 3,
  },
  {
    name: "Mainely Burgers",
    url: "https://www.mainelyburgers.com",
    logo: MainelyBurgersLogo,
    division: 1,
  },
  {
    name: "Jersey Mike's Subs",
    url: "https://www.jerseymikes.com",
    logo: JerseyMikesLogo,
    division: 2,
  },
  {
    name: "Doherty's East Ave Irish Pub",
    url: "https://www.dohertysirishpubnc.com/",
    logo: DohertysLogo,
    division: 1,
  },
  {
    name: "Gregg's Restaurant",
    url: "https://www.greggsusa.com",
    logo: GreggsLogo,
    division: 2,
  },
  {
    name: "Halfway Café",
    url: "https://www.thehalfwaycafe.com",
    logo: HalfwayLogo,
    division: 3,
  },
  {
    name: "Panera Bread",
    url: "https://www.panerabread.com",
    logo: PaneraBreadLogo,
    division: 1,
  },
  {
    name: "McDonald's",
    url: "https://www.mcdonalds.com",
    logo: McDonaldsLogo,
    division: 2,
  },
  {
    name: "KFC",
    url: "https://www.kfc.com/",
    logo: KFCLogo,
    division: 3
  }
];

export const skincareLinks: BrandItem[] = [
    {
      name: "Vaseline",
      url: "https://www.vaseline.com",
      logo: "https://ygo-assets-entities-us.yougov.net/99532b6e-222c-11e8-91d7-d17ce050fa91.jpg",
      division: 2
    },
    {
      name: "Nivea",
      url: "https://www.nivea.com",
      logo: "https://ygo-assets-entities-us.yougov.net/2b2fd170-c708-11e8-8d12-4b6fc186e574.jpg?zcw=612&zch=612&zct=0&zcl=74",
      division: 3
    },
    {
      name: "Olay",
      url: "https://www.olay.com",
      logo: "https://ygo-assets-entities-us.yougov.net/fea1bf0e-2d08-11e6-9dc6-455dca91e85a.jpg",
      division: 1
    },
    {
      name: "Neutrogena",
      url: "https://www.neutrogena.com",
      logo: "https://ygo-assets-entities-us.yougov.net/a914cdd0-2d08-11e6-bce7-6ff134176666.jpg",
      division: 3
    },
    {
      name: "CeraVe",
      url: "https://www.cerave.com",
      logo: "https://ygo-assets-entities-us.yougov.net/e1f770f0-b7db-11e7-bee0-e301344be102.jpg",
      division: 1
    },
    {
      name: "Bath & Body Works",
      url: "https://www.bathandbodyworks.com",
      logo: "https://ygo-assets-entities-us.yougov.net/d327007e-1306-11e8-a56d-535a4e504290.jpg",
      division: 2
    },
    {
      name: "L'Oreal Paris",
      url: "https://www.lorealparis.com",
      logo: "https://ygo-assets-entities-us.yougov.net/88a7070c-14be-11e9-9e9a-63247b032ab8.jpg",
      division: 3
    },
    {
      name: "Aveeno",
      url: "https://www.aveeno.com",
      logo: "https://ygo-assets-entities-us.yougov.net/ce07b429-2d00-11e6-a4bd-71dbf5f2854a.jpg",
      division: 1
    },
    {
      name: "Johnson's Baby",
      url: "https://www.johnsonsbaby.com",
      logo: "https://ygo-assets-entities-us.yougov.net/7237c544-2d06-11e6-9570-cf1c514d3e57.jpg",
      division: 2
    },
    {
      name: "Unilever",
      url: "https://www.unilever.com",
      logo: "https://ygo-assets-entities-us.yougov.net/7a8a7e4d-2d0d-11e6-bce7-6ff134176666.jpg",
      division: 3
    }
];