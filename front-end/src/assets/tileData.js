const tileData = [
  {
    img: 'http://dummyimage.com/170x102.png/dddddd/000000',
    title: 'Oriental short-clawed otter',
    author: 'Ned Mettetal',
  },
  {
    img: 'http://dummyimage.com/120x159.bmp/cc0000/ffffff',
    title: 'Possum, common brushtail',
    author: 'Athene Pease',
  },
  {
    img: 'http://dummyimage.com/134x125.bmp/ff4444/ffffff',
    title: 'Galapagos mockingbird',
    author: 'Arlen Gilfoy',
  },
  {
    img: 'http://dummyimage.com/164x250.bmp/5fa2dd/ffffff',
    title: 'Common genet',
    author: 'Marcille Wyburn',
  },
  {
    img: 'http://dummyimage.com/209x204.bmp/cc0000/ffffff',
    title: 'Fork-tailed drongo',
    author: 'Cos Afield',
  },
  {
    img: 'http://dummyimage.com/141x174.bmp/ff4444/ffffff',
    title: 'Old world fruit bat (unidentified)',
    author: 'Peyton Fensome',
  },
  {
    img: 'http://dummyimage.com/230x154.png/5fa2dd/ffffff',
    title: 'Mynah, indian',
    author: 'Hobard Smiley',
  },
  {
    img: 'http://dummyimage.com/185x208.bmp/dddddd/000000',
    title: 'Common genet',
    author: 'Denni Emes',
  },
  {
    img: 'http://dummyimage.com/202x211.png/5fa2dd/ffffff',
    title: 'Mexican boa',
    author: 'Shanna Antonat',
  },
  {
    img: 'http://dummyimage.com/105x161.bmp/5fa2dd/ffffff',
    title: 'Admiral, indian red',
    author: 'Roxanne Dooley',
  },
  {
    img: 'http://dummyimage.com/211x230.jpg/cc0000/ffffff',
    title: 'Helmeted guinea fowl',
    author: 'Edward Ducastel',
  },
  {
    img: 'http://dummyimage.com/198x194.bmp/cc0000/ffffff',
    title: 'Pied avocet',
    author: 'Petr Benedicte',
  },
  {
    img: 'http://dummyimage.com/118x243.bmp/ff4444/ffffff',
    title: "Smith's bush squirrel",
    author: 'Fonzie Bayman',
  },
  {
    img: 'http://dummyimage.com/228x241.bmp/cc0000/ffffff',
    title: 'Black-footed ferret',
    author: 'Yvon Malyj',
  },
  {
    img: 'http://dummyimage.com/216x193.jpg/ff4444/ffffff',
    title: 'Frilled lizard',
    author: 'Lorelle Kemmett',
  },
  {
    img: 'http://dummyimage.com/200x239.png/cc0000/ffffff',
    title: 'Rock dove',
    author: 'Alaine Backler',
  },
  {
    img: 'http://dummyimage.com/135x186.bmp/5fa2dd/ffffff',
    title: 'Mississippi alligator',
    author: 'Freida Lewsley',
  },
  {
    img: 'http://dummyimage.com/110x137.bmp/5fa2dd/ffffff',
    title: 'Leopard',
    author: 'Barrie Do',
  },
  {
    img: 'http://dummyimage.com/198x135.bmp/ff4444/ffffff',
    title: 'Short-beaked echidna',
    author: 'Minda Streat',
  },
  {
    img: 'http://dummyimage.com/217x179.jpg/dddddd/000000',
    title: 'American buffalo',
    author: 'Roi Gallehawk',
  },
  {
    img: 'http://dummyimage.com/230x142.bmp/ff4444/ffffff',
    title: 'Spider, wolf',
    author: 'Bianca Hunting',
  },
  {
    img: 'http://dummyimage.com/164x212.bmp/5fa2dd/ffffff',
    title: 'Purple grenadier',
    author: 'Booth Routh',
  },
  {
    img: 'http://dummyimage.com/115x246.jpg/ff4444/ffffff',
    title: 'Barking gecko',
    author: 'Frederik Nosworthy',
  },
  {
    img: 'http://dummyimage.com/144x104.jpg/ff4444/ffffff',
    title: 'Glider, feathertail',
    author: 'Hagan Lowndes',
  },
  {
    img: 'http://dummyimage.com/185x228.bmp/ff4444/ffffff',
    title: 'Thrasher, curve-billed',
    author: 'Adey Symons',
  },
  {
    img: 'http://dummyimage.com/249x128.bmp/5fa2dd/ffffff',
    title: 'White-bellied sea eagle',
    author: 'Maegan Hunnywell',
  },
  {
    img: 'http://dummyimage.com/223x178.bmp/5fa2dd/ffffff',
    title: 'Warthog',
    author: 'Larisa Syne',
  },
  {
    img: 'http://dummyimage.com/159x236.bmp/5fa2dd/ffffff',
    title: 'Red phalarope',
    author: "Luci O'Hone",
  },
  {
    img: 'http://dummyimage.com/171x249.png/ff4444/ffffff',
    title: 'Feathertail glider',
    author: 'Perla Hattersley',
  },
  {
    img: 'http://dummyimage.com/189x117.png/cc0000/ffffff',
    title: 'Python, carpet',
    author: 'Sawyer Rain',
  },
  {
    img: 'http://dummyimage.com/244x246.jpg/dddddd/000000',
    title: 'Red-breasted nuthatch',
    author: 'Teriann Questier',
  },
  {
    img: 'http://dummyimage.com/100x147.png/5fa2dd/ffffff',
    title: 'Southern black-backed gull',
    author: 'Desiree Hakewell',
  },
  {
    img: 'http://dummyimage.com/203x167.png/cc0000/ffffff',
    title: 'Giant otter',
    author: 'Alyosha Lorent',
  },
  {
    img: 'http://dummyimage.com/201x235.png/dddddd/000000',
    title: 'Tayra',
    author: 'Dulcinea Witch',
  },
  {
    img: 'http://dummyimage.com/145x245.png/cc0000/ffffff',
    title: 'Skua, great',
    author: 'Justen Midlar',
  },
  {
    img: 'http://dummyimage.com/247x244.jpg/cc0000/ffffff',
    title: 'Boa, emerald green tree',
    author: 'Alisun Click',
  },
  {
    img: 'http://dummyimage.com/152x239.png/5fa2dd/ffffff',
    title: 'Green vine snake',
    author: 'Angeli Derell',
  },
  {
    img: 'http://dummyimage.com/151x205.png/dddddd/000000',
    title: 'Heron, black-crowned night',
    author: 'Stephan Birdwhistle',
  },
  {
    img: 'http://dummyimage.com/186x191.jpg/5fa2dd/ffffff',
    title: 'Common dolphin',
    author: 'Roddie Issacson',
  },
  {
    img: 'http://dummyimage.com/244x194.bmp/cc0000/ffffff',
    title: 'Wallaby, red-necked',
    author: 'Clement Hodgins',
  },
  {
    img: 'http://dummyimage.com/139x199.jpg/dddddd/000000',
    title: "Boa, cook's tree",
    author: 'Cristina Causer',
  },
  {
    img: 'http://dummyimage.com/200x247.png/ff4444/ffffff',
    title: 'Possum, golden brush-tailed',
    author: 'Ruddie Zorzin',
  },
  {
    img: 'http://dummyimage.com/222x131.bmp/ff4444/ffffff',
    title: 'Vulture, oriental white-backed',
    author: 'Goldarina Walsham',
  },
  {
    img: 'http://dummyimage.com/225x130.jpg/cc0000/ffffff',
    title: 'Bulbul, african red-eyed',
    author: 'Brit Cassie',
  },
  {
    img: 'http://dummyimage.com/151x106.png/ff4444/ffffff',
    title: 'Colobus, white-mantled',
    author: 'Rosana Amesbury',
  },
  {
    img: 'http://dummyimage.com/110x109.jpg/dddddd/000000',
    title: 'Wombat, southern hairy-nosed',
    author: 'Dorolisa Raithby',
  },
  {
    img: 'http://dummyimage.com/228x190.png/5fa2dd/ffffff',
    title: 'Goose, greylag',
    author: 'Josh Shakelade',
  },
  {
    img: 'http://dummyimage.com/106x151.jpg/cc0000/ffffff',
    title: 'White-winged tern',
    author: 'Theresita Lody',
  },
  {
    img: 'http://dummyimage.com/222x207.jpg/dddddd/000000',
    title: 'Tyrant flycatcher',
    author: 'Brooks Starte',
  },
  {
    img: 'http://dummyimage.com/231x134.png/dddddd/000000',
    title: 'Sociable weaver',
    author: 'Mechelle Maunsell',
  },
  {
    img: 'http://dummyimage.com/231x206.jpg/cc0000/ffffff',
    title: 'Vulture, bengal',
    author: 'Teodoor Ciccoloi',
  },
  {
    img: 'http://dummyimage.com/193x185.jpg/ff4444/ffffff',
    title: 'Badger, american',
    author: 'Andie Shackle',
  },
  {
    img: 'http://dummyimage.com/237x135.jpg/ff4444/ffffff',
    title: 'Antelope, roan',
    author: 'Patrice Phlippsen',
  },
  {
    img: 'http://dummyimage.com/170x143.bmp/cc0000/ffffff',
    title: "Hoffman's sloth",
    author: 'Erwin Curphey',
  },
  {
    img: 'http://dummyimage.com/111x177.png/5fa2dd/ffffff',
    title: 'Badger, honey',
    author: 'Goldi Jorger',
  },
  {
    img: 'http://dummyimage.com/213x228.jpg/5fa2dd/ffffff',
    title: 'Royal tern',
    author: 'Georgeta Splevin',
  },
  {
    img: 'http://dummyimage.com/210x139.jpg/ff4444/ffffff',
    title: 'Tyrant flycatcher',
    author: 'Lauren Upham',
  },
  {
    img: 'http://dummyimage.com/110x188.jpg/ff4444/ffffff',
    title: 'Golden-mantled ground squirrel',
    author: 'Eydie Chappel',
  },
  {
    img: 'http://dummyimage.com/187x128.png/dddddd/000000',
    title: 'Red-tailed wambenger',
    author: 'Tedra Motte',
  },
  {
    img: 'http://dummyimage.com/190x157.bmp/dddddd/000000',
    title: 'Gull, kelp',
    author: 'Packston Ebdon',
  },
  {
    img: 'http://dummyimage.com/189x122.jpg/cc0000/ffffff',
    title: 'Flicker, field',
    author: 'Selene Moores',
  },
  {
    img: 'http://dummyimage.com/143x218.jpg/ff4444/ffffff',
    title: 'Pheasant, ring-necked',
    author: 'Aleda Dolohunty',
  },
  {
    img: 'http://dummyimage.com/112x247.bmp/5fa2dd/ffffff',
    title: 'Ibex',
    author: 'Roslyn Cheesley',
  },
  {
    img: 'http://dummyimage.com/188x123.png/ff4444/ffffff',
    title: 'Secretary bird',
    author: 'Abbey Cracknall',
  },
  {
    img: 'http://dummyimage.com/113x232.png/ff4444/ffffff',
    title: 'Red-legged pademelon',
    author: 'Margarette Mussington',
  },
  {
    img: 'http://dummyimage.com/206x230.png/dddddd/000000',
    title: 'Australian pelican',
    author: 'Sybil Oxenden',
  },
  {
    img: 'http://dummyimage.com/177x132.jpg/cc0000/ffffff',
    title: 'Roller, lilac-breasted',
    author: 'Humfried Evenden',
  },
  {
    img: 'http://dummyimage.com/163x153.bmp/dddddd/000000',
    title: 'Arctic ground squirrel',
    author: 'Leanor Bunker',
  },
  {
    img: 'http://dummyimage.com/113x226.png/cc0000/ffffff',
    title: 'European shelduck',
    author: 'Odetta Abethell',
  },
  {
    img: 'http://dummyimage.com/212x225.png/cc0000/ffffff',
    title: "Richardson's ground squirrel",
    author: 'Salim Brunel',
  },
  {
    img: 'http://dummyimage.com/184x238.bmp/dddddd/000000',
    title: 'Common seal',
    author: 'Augy Edgerley',
  },
  {
    img: 'http://dummyimage.com/110x225.bmp/5fa2dd/ffffff',
    title: 'Kangaroo, red',
    author: 'Giffard Riche',
  },
  {
    img: 'http://dummyimage.com/158x184.bmp/cc0000/ffffff',
    title: 'Cheetah',
    author: 'Chevy Klulicek',
  },
  {
    img: 'http://dummyimage.com/245x195.bmp/dddddd/000000',
    title: 'Pheasant, ring-necked',
    author: 'Daloris Barratt',
  },
  {
    img: 'http://dummyimage.com/216x222.bmp/ff4444/ffffff',
    title: 'Black-backed magpie',
    author: 'Northrup Bimrose',
  },
  {
    img: 'http://dummyimage.com/140x160.png/5fa2dd/ffffff',
    title: 'Plover, three-banded',
    author: 'Ive Sandwick',
  },
  {
    img: 'http://dummyimage.com/158x183.bmp/dddddd/000000',
    title: 'Kaffir cat',
    author: 'Rosemaria Huggin',
  },
  {
    img: 'http://dummyimage.com/113x225.bmp/cc0000/ffffff',
    title: 'Penguin, little blue',
    author: 'Mathias Handrick',
  },
  {
    img: 'http://dummyimage.com/244x109.png/ff4444/ffffff',
    title: 'Aardwolf',
    author: 'Tiffanie Frend',
  },
  {
    img: 'http://dummyimage.com/109x103.png/dddddd/000000',
    title: 'Ferret, black-footed',
    author: 'Monty Greig',
  },
  {
    img: 'http://dummyimage.com/192x231.bmp/cc0000/ffffff',
    title: 'African buffalo',
    author: 'Wilone Boddam',
  },
  {
    img: 'http://dummyimage.com/173x115.jpg/ff4444/ffffff',
    title: 'Cat, long-tailed spotted',
    author: 'Anna-diana Skaif',
  },
  {
    img: 'http://dummyimage.com/155x202.png/ff4444/ffffff',
    title: 'Royal tern',
    author: 'De witt Longworth',
  },
  {
    img: 'http://dummyimage.com/222x202.jpg/5fa2dd/ffffff',
    title: 'Rhea, gray',
    author: 'Perice Merwood',
  },
  {
    img: 'http://dummyimage.com/195x118.bmp/cc0000/ffffff',
    title: 'Beaver, eurasian',
    author: 'Angelina Auguste',
  },
  {
    img: 'http://dummyimage.com/163x151.png/ff4444/ffffff',
    title: 'Australian masked owl',
    author: 'Tamiko Scanterbury',
  },
  {
    img: 'http://dummyimage.com/246x169.bmp/ff4444/ffffff',
    title: 'Darwin ground finch (unidentified)',
    author: 'Minette Greedier',
  },
  {
    img: 'http://dummyimage.com/123x103.jpg/cc0000/ffffff',
    title: 'White-faced tree rat',
    author: 'Demetra Cullrford',
  },
  {
    img: 'http://dummyimage.com/241x195.bmp/dddddd/000000',
    title: 'Eland, common',
    author: 'Lamar Espinel',
  },
  {
    img: 'http://dummyimage.com/136x101.png/ff4444/ffffff',
    title: 'Elephant, african',
    author: 'Trstram Whitmore',
  },
  {
    img: 'http://dummyimage.com/121x221.jpg/dddddd/000000',
    title: 'Cow, scottish highland',
    author: 'Yance Suarez',
  },
  {
    img: 'http://dummyimage.com/229x176.png/dddddd/000000',
    title: 'Yellow-billed stork',
    author: 'Ardith Wellard',
  },
  {
    img: 'http://dummyimage.com/219x121.png/dddddd/000000',
    title: 'Common wombat',
    author: 'Eve Bascomb',
  },
  {
    img: 'http://dummyimage.com/178x121.bmp/cc0000/ffffff',
    title: 'European shelduck',
    author: 'Blakeley Lansdowne',
  },
  {
    img: 'http://dummyimage.com/129x192.png/dddddd/000000',
    title: 'Eurasian red squirrel',
    author: 'Earl Gergher',
  },
  {
    img: 'http://dummyimage.com/182x147.png/5fa2dd/ffffff',
    title: 'Eastern fox squirrel',
    author: 'Tommie Brandle',
  },
  {
    img: 'http://dummyimage.com/108x131.png/ff4444/ffffff',
    title: 'Pied butcher bird',
    author: 'Krystal Edyson',
  },
  {
    img: 'http://dummyimage.com/229x107.png/dddddd/000000',
    title: 'Stork, openbill',
    author: 'Clarabelle Deetch',
  },
  {
    img: 'http://dummyimage.com/202x134.png/dddddd/000000',
    title: 'Magpie, black-backed',
    author: 'Franzen Curd',
  },
  {
    img: 'http://dummyimage.com/122x244.jpg/cc0000/ffffff',
    title: 'Snake, green vine',
    author: 'Derby Redrup',
  },
];

export default tileData;
