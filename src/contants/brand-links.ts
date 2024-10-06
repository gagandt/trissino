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
  logo: any;
  division: number;
}

export const brandLinks: BrandItem[] = [
  {
    name: "sweetgreen",
    url: "https://www.sweetgreen.com",
    logo: SweetgreenLogo,
    division: 1
  },
  {
    name: "clover food lab",
    url: "https://www.cloverfoodlab.com",
    logo: CloverLogo,
    division: 1,
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
    division: 1,
  },
  {
    name: "Shake Shack",
    url: "https://www.shakeshack.com",
    logo: ShakeShackLogo,
    division: 1,
  },
  {
    name: "Tasty Burger",
    url: "https://www.tastyburger.com",
    logo: TastyBurgerLogo,
    division: 2,
  },
  {
    name: "Wild Willy's Burgers",
    url: "http://www.wildwillysburgers.com",
    logo: WildWillysLogo,
    division: 2,
  },
  {
    name: "Mainely Burgers",
    url: "https://www.mainelyburgers.com",
    logo: MainelyBurgersLogo,
    division: 2,
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
    division: 3,
  },
  {
    name: "Gregg's Restaurant",
    url: "https://www.greggsusa.com",
    logo: GreggsLogo,
    division: 3,
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
    division: 3,
  },
  {
    name: "McDonald's",
    url: "https://www.mcdonalds.com",
    logo: McDonaldsLogo,
    division: 3,
  },
  {
    name: "KFC",
    url: "https://www.kfc.com/",
    logo: KFCLogo,
    division: 3
  }
];
