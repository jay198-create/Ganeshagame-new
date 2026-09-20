(() => {
  "use strict";

  const architectures = [
    "Temple Arch","Royal Pavilion","Lotus Canopy","Heritage Mantap",
    "Village Pandal","Floral Dome","Maratha Darbar","South Indian Gopuram",
    "Moon Pavilion","Bamboo Eco Mandap","Rangoli Court","Deepam Hall"
  ];

  const themes = [
    ["Saffron Gold","#d99a2b","#7b2519"],
    ["Emerald","#15805f","#0c3f35"],
    ["Royal Blue","#315cc7","#18245f"],
    ["Rose","#d4507e","#6f2145"],
    ["Ivory","#e9dfc8","#7c6752"],
    ["Marigold","#f2a50c","#7d3d00"],
    ["Moon Silver","#9aa9bf","#2f3a50"],
    ["Lotus Pink","#e67fa6","#6f2b49"],
    ["Forest","#3d7f47","#233f2b"],
    ["Festival Red","#c84137","#6e1717"]
  ];

  const decorCategories = [
    ["Flower Garland",""],["Marigold Toran",""],["Mango Leaf Toran",""],
    ["Fairy Lights",""],["Deepam Row",""],["Brass Bells",""],
    ["Rangoli",""],["Lotus Arrangement",""],["Banana Stem",""],
    ["Kalash",""],["Fabric Drapes",""],["Backdrop",""],
    ["Flower Pillar",""],["Ceiling Hangings",""],["Floor Lamps",""],
    ["Coconut Decor",""],["Sugarcane Arch",""],["Rice Sheaf",""],
    ["Peacock Accent",""],["Umbrella Canopy",""]
  ];

  const pujaItems = [
  {
    "id": "puja-1",
    "name": "Durva grass",
    "artKey": "durva",
    "price": 8,
    "ritualUse": "Traditional sacred grass offering to Ganapati."
  },
  {
    "id": "puja-2",
    "name": "Red hibiscus",
    "artKey": "hibiscus",
    "price": 9,
    "ritualUse": "Fresh red flower offering."
  },
  {
    "id": "puja-3",
    "name": "Lotus",
    "artKey": "lotus",
    "price": 12,
    "ritualUse": "Lotus flower for archana and altar decoration."
  },
  {
    "id": "puja-4",
    "name": "Marigold flowers",
    "artKey": "marigold",
    "price": 8,
    "ritualUse": "Fresh flowers for archana and garlands."
  },
  {
    "id": "puja-5",
    "name": "Coconut",
    "artKey": "coconut",
    "price": 10,
    "ritualUse": "Whole coconut used as a traditional offering."
  },
  {
    "id": "puja-6",
    "name": "Bananas",
    "artKey": "banana",
    "price": 8,
    "ritualUse": "Fruit naivedya."
  },
  {
    "id": "puja-7",
    "name": "Seasonal fruit platter",
    "artKey": "fruit",
    "price": 12,
    "ritualUse": "Assorted fruit naivedya."
  },
  {
    "id": "puja-8",
    "name": "Modaks",
    "artKey": "modak",
    "price": 12,
    "ritualUse": "Sweet naivedya closely associated with Ganapati."
  },
  {
    "id": "puja-9",
    "name": "Panchamrit",
    "artKey": "panchamrit",
    "price": 12,
    "ritualUse": "Traditional mixture used in worship in many traditions."
  },
  {
    "id": "puja-10",
    "name": "Milk",
    "artKey": "milk",
    "price": 8,
    "ritualUse": "Milk offering or ingredient for panchamrit."
  },
  {
    "id": "puja-11",
    "name": "Ghee",
    "artKey": "ghee",
    "price": 9,
    "ritualUse": "Used for lamps and offerings."
  },
  {
    "id": "puja-12",
    "name": "Honey",
    "artKey": "honey",
    "price": 9,
    "ritualUse": "Common panchamrit ingredient."
  },
  {
    "id": "puja-13",
    "name": "Jaggery",
    "artKey": "jaggery",
    "price": 7,
    "ritualUse": "Traditional sweet offering ingredient."
  },
  {
    "id": "puja-14",
    "name": "Akshata rice",
    "artKey": "rice",
    "price": 6,
    "ritualUse": "Unbroken rice used in worship."
  },
  {
    "id": "puja-15",
    "name": "Turmeric",
    "artKey": "turmeric",
    "price": 5,
    "ritualUse": "Traditional auspicious powder."
  },
  {
    "id": "puja-16",
    "name": "Kumkum",
    "artKey": "kumkum",
    "price": 5,
    "ritualUse": "Sacred red powder used in worship."
  },
  {
    "id": "puja-17",
    "name": "Sandal paste",
    "artKey": "sandal",
    "price": 8,
    "ritualUse": "Fragrant sandal paste for tilaka and worship."
  },
  {
    "id": "puja-18",
    "name": "Betel leaves",
    "artKey": "betel-leaf",
    "price": 7,
    "ritualUse": "Traditional leaf offering."
  },
  {
    "id": "puja-19",
    "name": "Betel nuts",
    "artKey": "betel-nut",
    "price": 6,
    "ritualUse": "Traditional offering paired with betel leaves."
  },
  {
    "id": "puja-20",
    "name": "Kalash",
    "artKey": "kalash",
    "price": 14,
    "ritualUse": "Consecrated vessel used in puja."
  },
  {
    "id": "puja-21",
    "name": "Mango leaves",
    "artKey": "mango-leaves",
    "price": 7,
    "ritualUse": "Leaves commonly arranged with a kalash."
  },
  {
    "id": "puja-22",
    "name": "Incense sticks",
    "artKey": "incense",
    "price": 6,
    "ritualUse": "Fragrant incense offering."
  },
  {
    "id": "puja-23",
    "name": "Dhoop burner",
    "artKey": "dhoop",
    "price": 9,
    "ritualUse": "Incense resin or dhoop offering."
  },
  {
    "id": "puja-24",
    "name": "Camphor",
    "artKey": "camphor",
    "price": 7,
    "ritualUse": "Used during aarti in many worship traditions."
  },
  {
    "id": "puja-25",
    "name": "Brass ghee diya",
    "artKey": "diya",
    "price": 12,
    "ritualUse": "Lamp for deepa offering."
  },
  {
    "id": "puja-26",
    "name": "Cotton wicks",
    "artKey": "wicks",
    "price": 5,
    "ritualUse": "Wicks for the ritual lamp."
  },
  {
    "id": "puja-27",
    "name": "Brass bell",
    "artKey": "bell",
    "price": 12,
    "ritualUse": "Bell used during worship and aarti."
  },
  {
    "id": "puja-28",
    "name": "Aarti thali",
    "artKey": "aarti",
    "price": 16,
    "ritualUse": "Brass plate arranged for aarti."
  },
  {
    "id": "puja-29",
    "name": "Prasadam plate",
    "artKey": "prasadam",
    "price": 14,
    "ritualUse": "Plate for presenting naivedya and prasadam."
  },
  {
    "id": "puja-30",
    "name": "Flower basket",
    "artKey": "flower-basket",
    "price": 12,
    "ritualUse": "Basket of fresh flowers for archana."
  },
  {
    "id": "puja-31",
    "name": "Sacred thread",
    "artKey": "thread",
    "price": 6,
    "ritualUse": "Thread used according to family or temple custom."
  },
  {
    "id": "puja-32",
    "name": "Vastra cloth",
    "artKey": "vastra",
    "price": 15,
    "ritualUse": "Clean cloth offered as vastra."
  }
];

  const mantras = [
  {
    "id": "vakratunda",
    "title": "Vakratunda Mahakaya",
    "collection": "Common Prayers",
    "type": "Traditional invocation shloka",
    "devanagari": "वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ । निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥",
    "transliteration": "vakratuṇḍa mahākāya sūryakoṭi samaprabha | nirvighnaṃ kuru me deva sarvakāryeṣu sarvadā ||",
    "simple": "vakratuṇḍa mahākāya sūryakoṭi samaprabha | nirvighnaṃ kuru me deva sarvakāryeṣu sarvadā ||",
    "meaning": "A prayer to the mighty curved-trunked Lord to remove obstacles from every undertaking.",
    "source": "Traditional Ganapati invocation.",
    "script": "Devanagari"
  },
  {
    "id": "shuklambaradharam",
    "title": "Shuklambaradharam",
    "collection": "Common Prayers",
    "type": "Traditional opening prayer",
    "devanagari": "शुक्लाम्बरधरं विष्णुं शशिवर्णं चतुर्भुजम् । प्रसन्नवदनं ध्यायेत् सर्वविघ्नोपशान्तये ॥",
    "transliteration": "śuklāmbaradharaṃ viṣṇuṃ śaśivarṇaṃ caturbhujam | prasannavadanaṃ dhyāyet sarvavighnopaśāntaye ||",
    "simple": "śuklāmbaradharaṃ viṣṇuṃ śaśivarṇaṃ caturbhujam | prasannavadanaṃ dhyāyet sarvavighnopaśāntaye ||",
    "meaning": "Meditate on the serene, all-pervading Lord for the pacification of obstacles.",
    "source": "Traditional opening prayer.",
    "script": "Devanagari"
  },
  {
    "id": "gajananam",
    "title": "Gajananam Bhuta Ganadi Sevitam",
    "collection": "Common Prayers",
    "type": "Ganesha dhyana shloka",
    "devanagari": "गजाननं भूतगणादिसेवितं कपित्थजम्बूफलचारुभक्षणम् । उमासुतं शोकविनाशकारकं नमामि विघ्नेश्वरपादपङ्कजम् ॥",
    "transliteration": "gajānanaṃ bhūtagaṇādisevitaṃ kapitthajambūphalacārubhakṣaṇam | umāsutaṃ śokavināśakārakaṃ namāmi vighneśvarapādapaṅkajam ||",
    "simple": "gajānanaṃ bhūtagaṇādisevitaṃ kapitthajambūphalacārubhakṣaṇam | umāsutaṃ śokavināśakārakaṃ namāmi vighneśvarapādapaṅkajam ||",
    "meaning": "I bow to the elephant-faced son of Uma, remover of sorrow and Lord of obstacles.",
    "source": "Traditional Ganesha dhyana shloka.",
    "script": "Devanagari"
  },
  {
    "id": "agajanana",
    "title": "Agajanana Padmarkam",
    "collection": "Common Prayers",
    "type": "Ganesha meditation shloka",
    "devanagari": "अगजानन पद्मार्कं गजाननमहर्निशम् । अनेकदन्तं भक्तानामेकदन्तमुपास्महे ॥",
    "transliteration": "agajānana padmārkaṃ gajānanam aharniśam | anekadantaṃ bhaktānām ekadantam upāsmahe ||",
    "simple": "agajānana padmārkaṃ gajānanam aharniśam | anekadantaṃ bhaktānām ekadantam upāsmahe ||",
    "meaning": "We meditate day and night on Ekadanta, whose grace is compared to the sun opening the lotus-face of Parvati.",
    "source": "Traditional Ganesha shloka; wording cross-checked with Greenmesg/Shlokam.",
    "script": "Devanagari"
  },
  {
    "id": "ganapati-bija",
    "title": "Om Gam Ganapataye Namah",
    "collection": "Common Prayers",
    "type": "Ganapati bija mantra",
    "devanagari": "ॐ गं गणपतये नमः ॥",
    "transliteration": "oṃ gaṃ gaṇapataye namaḥ ||",
    "simple": "oṃ gaṃ gaṇapataye namaḥ ||",
    "meaning": "Salutations to Ganapati.",
    "source": "Traditional Ganapati bija mantra.",
    "script": "Devanagari"
  },
  {
    "id": "ganapati-gayatri",
    "title": "Ganapati Gayatri",
    "collection": "Common Prayers",
    "type": "Ganapati Gayatri",
    "devanagari": "ॐ एकदन्ताय विद्महे वक्रतुण्डाय धीमहि । तन्नो दन्तिः प्रचोदयात् ॥",
    "transliteration": "oṃ ekadantāya vidmahe vakratuṇḍāya dhīmahi | tanno dantiḥ pracodayāt ||",
    "simple": "oṃ ekadantāya vidmahe vakratuṇḍāya dhīmahi | tanno dantiḥ pracodayāt ||",
    "meaning": "May we know the one-tusked Lord, meditate on the curved-trunked Lord, and may he inspire our understanding.",
    "source": "Ganapati Atharvashirsha tradition.",
    "script": "Devanagari"
  },
  {
    "id": "gananam-tva",
    "title": "Gananam Tva Ganapatim Havamahe",
    "collection": "Vedic",
    "type": "Rigveda 2.23.1",
    "devanagari": "गणानां त्वा गणपतिं हवामहे कविं कवीनामुपमश्रवस्तमम् । ज्येष्ठराजं ब्रह्मणां ब्रह्मणस्पत आ नः शृण्वन्नूतिभिः सीद सादनम् ॥",
    "transliteration": "gaṇānāṃ tvā gaṇapatiṃ havāmahe kaviṃ kavīnām upamaśravastamam | jyeṣṭharājaṃ brahmaṇāṃ brahmaṇaspata ā naḥ śṛṇvannūtibhiḥ sīda sādanam ||",
    "simple": "gaṇānāṃ tvā gaṇapatiṃ havāmahe kaviṃ kavīnām upamaśravastamam | jyeṣṭharājaṃ brahmaṇāṃ brahmaṇaspata ā naḥ śṛṇvannūtibhiḥ sīda sādanam ||",
    "meaning": "A Vedic invocation calling the foremost lord of sacred utterance and asking him to hear the prayer and take his seat.",
    "source": "Rigveda 2.23.1. In its Vedic context the deity is Brahmanaspati; the verse is widely used in later Ganapati worship.",
    "script": "Devanagari"
  },
  {
    "id": "dvadasa-nama",
    "title": "Ganesha Dvadasha Nama",
    "collection": "Common Prayers",
    "type": "Twelve names of Ganesha",
    "devanagari": "सुमुखश्चैकदन्तश्च कपिलो गजकर्णकः । लम्बोदरश्च विकटो विघ्ननाशो गणाधिपः ॥ धूम्रकेतुर्गणाध्यक्षो भालचन्द्रो गजाननः । द्वादशैतानि नामानि यः पठेच्छृणुयादपि ॥",
    "transliteration": "sumukhaścaikadantaśca kapilo gajakarṇakaḥ | lambodaraśca vikaṭo vighnanāśo gaṇādhipaḥ || dhūmraketur gaṇādhyakṣo bhālacandro gajānanaḥ | dvādaśaitāni nāmāni yaḥ paṭhecchṛṇuyād api ||",
    "simple": "sumukhaścaikadantaśca kapilo gajakarṇakaḥ | lambodaraśca vikaṭo vighnanāśo gaṇādhipaḥ || dhūmraketur gaṇādhyakṣo bhālacandro gajānanaḥ | dvādaśaitāni nāmāni yaḥ paṭhecchṛṇuyād api ||",
    "meaning": "A traditional recitation of twelve names of Ganesha.",
    "source": "Traditional Dvadasha Nama recitation.",
    "script": "Devanagari"
  },
  {
    "id": "sankata-1",
    "title": "Pranamya Shirasa Devam",
    "collection": "Sankata Nashana Ganesha Stotram",
    "type": "Narada Purana tradition",
    "devanagari": "प्रणम्य शिरसा देवं गौरीपुत्रं विनायकम् । भक्तावासं स्मरेन्नित्यमायुःकामार्थसिद्धये ॥",
    "transliteration": "praṇamya śirasā devaṃ gaurīputraṃ vināyakam | bhaktāvāsaṃ smarennityam āyuḥkāmārthasiddhaye ||",
    "simple": "praṇamya śirasā devaṃ gaurīputraṃ vināyakam | bhaktāvāsaṃ smarennityam āyuḥkāmārthasiddhaye ||",
    "meaning": "Bow to Vinayaka, son of Gauri, and remember him daily.",
    "source": "Sankata Nashana Ganesha Stotram; Narada Purana tradition.",
    "script": "Devanagari"
  },
  {
    "id": "sankata-2",
    "title": "Twelve Names I",
    "collection": "Sankata Nashana Ganesha Stotram",
    "type": "Narada Purana tradition",
    "devanagari": "प्रथमं वक्रतुण्डं च एकदन्तं द्वितीयकम् । तृतीयं कृष्णपिङ्गाक्षं गजवक्त्रं चतुर्थकम् ॥",
    "transliteration": "prathamaṃ vakratuṇḍaṃ ca ekadantaṃ dvitīyakam | tṛtīyaṃ kṛṣṇapiṅgākṣaṃ gajavaktraṃ caturthakam ||",
    "simple": "prathamaṃ vakratuṇḍaṃ ca ekadantaṃ dvitīyakam | tṛtīyaṃ kṛṣṇapiṅgākṣaṃ gajavaktraṃ caturthakam ||",
    "meaning": "The first four names: Vakratunda, Ekadanta, Krishna-Pingaksha and Gajavaktra.",
    "source": "Sankata Nashana Ganesha Stotram; Narada Purana tradition.",
    "script": "Devanagari"
  },
  {
    "id": "sankata-3",
    "title": "Twelve Names II",
    "collection": "Sankata Nashana Ganesha Stotram",
    "type": "Narada Purana tradition",
    "devanagari": "लम्बोदरं पञ्चमं च षष्ठं विकटमेव च । सप्तमं विघ्नराजं च धूम्रवर्णं तथाष्टमम् ॥",
    "transliteration": "lambodaraṃ pañcamaṃ ca ṣaṣṭhaṃ vikaṭam eva ca | saptamaṃ vighnarājaṃ ca dhūmravarṇaṃ tathāṣṭamam ||",
    "simple": "lambodaraṃ pañcamaṃ ca ṣaṣṭhaṃ vikaṭam eva ca | saptamaṃ vighnarājaṃ ca dhūmravarṇaṃ tathāṣṭamam ||",
    "meaning": "Names five through eight: Lambodara, Vikata, Vighnaraja and Dhumravarna.",
    "source": "Sankata Nashana Ganesha Stotram; Narada Purana tradition.",
    "script": "Devanagari"
  },
  {
    "id": "sankata-4",
    "title": "Twelve Names III",
    "collection": "Sankata Nashana Ganesha Stotram",
    "type": "Narada Purana tradition",
    "devanagari": "नवमं भालचन्द्रं च दशमं तु विनायकम् । एकादशं गणपतिं द्वादशं तु गजाननम् ॥",
    "transliteration": "navamaṃ bhālacandraṃ ca daśamaṃ tu vināyakam | ekādaśaṃ gaṇapatiṃ dvādaśaṃ tu gajānanam ||",
    "simple": "navamaṃ bhālacandraṃ ca daśamaṃ tu vināyakam | ekādaśaṃ gaṇapatiṃ dvādaśaṃ tu gajānanam ||",
    "meaning": "Names nine through twelve: Bhalachandra, Vinayaka, Ganapati and Gajanana.",
    "source": "Sankata Nashana Ganesha Stotram; Narada Purana tradition.",
    "script": "Devanagari"
  },
  {
    "id": "sankata-5",
    "title": "Dvadashaitani Namani",
    "collection": "Sankata Nashana Ganesha Stotram",
    "type": "Narada Purana tradition",
    "devanagari": "द्वादशैतानि नामानि त्रिसन्ध्यं यः पठेन्नरः । न च विघ्नभयं तस्य सर्वसिद्धिकरः प्रभुः ॥",
    "transliteration": "dvādaśaitāni nāmāni trisandhyaṃ yaḥ paṭhennaraḥ | na ca vighnabhayaṃ tasya sarvasiddhikaraḥ prabhuḥ ||",
    "simple": "dvādaśaitāni nāmāni trisandhyaṃ yaḥ paṭhennaraḥ | na ca vighnabhayaṃ tasya sarvasiddhikaraḥ prabhuḥ ||",
    "meaning": "The hymn praises remembrance of these twelve names as a protection from obstacles.",
    "source": "Sankata Nashana Ganesha Stotram; Narada Purana tradition.",
    "script": "Devanagari"
  },
  {
    "id": "sankata-6",
    "title": "Vidyarthi Labhate Vidyam",
    "collection": "Sankata Nashana Ganesha Stotram",
    "type": "Narada Purana tradition",
    "devanagari": "विद्यार्थी लभते विद्यां धनार्थी लभते धनम् । पुत्रार्थी लभते पुत्रान् मोक्षार्थी लभते गतिम् ॥",
    "transliteration": "vidyārthī labhate vidyāṃ dhanārthī labhate dhanam | putrārthī labhate putrān mokṣārthī labhate gatim ||",
    "simple": "vidyārthī labhate vidyāṃ dhanārthī labhate dhanam | putrārthī labhate putrān mokṣārthī labhate gatim ||",
    "meaning": "The phalashruti describes traditional fruits sought by different devotees.",
    "source": "Sankata Nashana Ganesha Stotram; Narada Purana tradition.",
    "script": "Devanagari"
  },
  {
    "id": "sankata-7",
    "title": "Japet Ganapati Stotram",
    "collection": "Sankata Nashana Ganesha Stotram",
    "type": "Narada Purana tradition",
    "devanagari": "जपेद्गणपतिस्तोत्रं षड्भिर्मासैः फलं लभेत् । संवत्सरेण सिद्धिं च लभते नात्र संशयः ॥",
    "transliteration": "japed gaṇapatistotraṃ ṣaḍbhir māsaiḥ phalaṃ labhet | saṃvatsareṇa siddhiṃ ca labhate nātra saṃśayaḥ ||",
    "simple": "japed gaṇapatistotraṃ ṣaḍbhir māsaiḥ phalaṃ labhet | saṃvatsareṇa siddhiṃ ca labhate nātra saṃśayaḥ ||",
    "meaning": "A traditional statement praising steady recitation over time.",
    "source": "Sankata Nashana Ganesha Stotram; Narada Purana tradition.",
    "script": "Devanagari"
  },
  {
    "id": "sankata-8",
    "title": "Ashtabhyo Brahmanebhyashcha",
    "collection": "Sankata Nashana Ganesha Stotram",
    "type": "Narada Purana tradition",
    "devanagari": "अष्टभ्यो ब्राह्मणेभ्यश्च लिखित्वा यः समर्पयेत् । तस्य विद्या भवेत्सर्वा गणेशस्य प्रसादतः ॥",
    "transliteration": "aṣṭabhyo brāhmaṇebhyaśca likhitvā yaḥ samarpayet | tasya vidyā bhavetsarvā gaṇeśasya prasādataḥ ||",
    "simple": "aṣṭabhyo brāhmaṇebhyaśca likhitvā yaḥ samarpayet | tasya vidyā bhavetsarvā gaṇeśasya prasādataḥ ||",
    "meaning": "Concluding phalashruti of the traditional hymn.",
    "source": "Sankata Nashana Ganesha Stotram; Narada Purana tradition.",
    "script": "Devanagari"
  },
  {
    "id": "pancharatnam-1",
    "title": "Mudakaratta Modakam",
    "collection": "Ganesha Pancharatnam",
    "type": "Traditional stotra attributed to Adi Shankaracharya",
    "devanagari": "मुदाकरात्तमोदकं सदाविमुक्तिसाधकं कलाधरावतंसकं विलासिलोकरक्षकम् । अनायकैकनायकं विनाशितेभदैत्यकं नताशुभाशुनाशकं नमामि तं विनायकम् ॥",
    "transliteration": "mudākarāttamodakaṃ sadāvimuktisādhakaṃ kalādharāvataṃsakaṃ vilāsilokarakṣakam | anāyakaikanāyakaṃ vināśitebhadaityakaṃ natāśubhāśunāśakaṃ namāmi taṃ vināyakam ||",
    "simple": "mudākarāttamodakaṃ sadāvimuktisādhakaṃ kalādharāvataṃsakaṃ vilāsilokarakṣakam | anāyakaikanāyakaṃ vināśitebhadaityakaṃ natāśubhāśunāśakaṃ namāmi taṃ vināyakam ||",
    "meaning": "I bow to Vinayaka, giver of joy and remover of misfortune.",
    "source": "Ganesha Pancharatnam tradition; traditionally attributed to Adi Shankaracharya.",
    "script": "Devanagari"
  },
  {
    "id": "pancharatnam-2",
    "title": "Natetarati Bhikaram",
    "collection": "Ganesha Pancharatnam",
    "type": "Traditional stotra attributed to Adi Shankaracharya",
    "devanagari": "नतेतरातिभीकरं नवोदितार्कभास्वरं नमद्सुरारिनिर्जरं नताधिकापदुद्धरम् । सुरेश्वरं निधीश्वरं गजेश्वरं गणेश्वरं महेश्वरं तमाश्रये परात्परं निरन्तरम् ॥",
    "transliteration": "natetarātibhīkaraṃ navoditārkabhāsvaraṃ namatsurārinirjaraṃ natādhikāpaduddharam | sureśvaraṃ nidhīśvaraṃ gajeśvaraṃ gaṇeśvaraṃ maheśvaraṃ tam āśraye parātparaṃ nirantaram ||",
    "simple": "natetarātibhīkaraṃ navoditārkabhāsvaraṃ namatsurārinirjaraṃ natādhikāpaduddharam | sureśvaraṃ nidhīśvaraṃ gajeśvaraṃ gaṇeśvaraṃ maheśvaraṃ tam āśraye parātparaṃ nirantaram ||",
    "meaning": "A verse taking refuge in Ganesha as supreme lord and rescuer from difficulty.",
    "source": "Ganesha Pancharatnam tradition; traditionally attributed to Adi Shankaracharya.",
    "script": "Devanagari"
  },
  {
    "id": "pancharatnam-3",
    "title": "Samasta Loka Shankaram",
    "collection": "Ganesha Pancharatnam",
    "type": "Traditional stotra attributed to Adi Shankaracharya",
    "devanagari": "समस्तलोकशङ्करं निरस्तदैत्यकुञ्जरं दरेतरोदरं वरं वरेभवक्त्रमक्षरम् । कृपाकरं क्षमाकरं मुदाकरं यशस्करं मनस्करं नमस्कृतां नमस्करोमि भास्वरम् ॥",
    "transliteration": "samastalokaśaṅkaraṃ nirastadaityakuñjaraṃ daretarodaraṃ varaṃ varebhavaktramakṣaram | kṛpākaraṃ kṣamākaraṃ mudākaraṃ yaśaskaraṃ manaskaraṃ namaskṛtāṃ namaskaromi bhāsvaram ||",
    "simple": "samastalokaśaṅkaraṃ nirastadaityakuñjaraṃ daretarodaraṃ varaṃ varebhavaktramakṣaram | kṛpākaraṃ kṣamākaraṃ mudākaraṃ yaśaskaraṃ manaskaraṃ namaskṛtāṃ namaskaromi bhāsvaram ||",
    "meaning": "Praise of the radiant Lord as a source of grace, patience and joy.",
    "source": "Ganesha Pancharatnam tradition; traditionally attributed to Adi Shankaracharya.",
    "script": "Devanagari"
  },
  {
    "id": "pancharatnam-4",
    "title": "Akinchanarti Marjanam",
    "collection": "Ganesha Pancharatnam",
    "type": "Traditional stotra attributed to Adi Shankaracharya",
    "devanagari": "अकिञ्चनार्तिमार्जनं चिरन्तनोक्तिभाजनं पुरारिपूर्वनन्दनं सुरारिगर्वचर्वणम् । प्रपञ्चनाशभीषणं धनञ्जयादिभूषणं कपोलदानवारणं भजे पुराणवारणम् ॥",
    "transliteration": "akiñcanārtimārjanaṃ cirantanoktibhājanaṃ purāripūrvanandanaṃ surārigarvacarvaṇam | prapañcanāśabhīṣaṇaṃ dhanañjayādibhūṣaṇaṃ kapoladānavāraṇaṃ bhaje purāṇavāraṇam ||",
    "simple": "akiñcanārtimārjanaṃ cirantanoktibhājanaṃ purāripūrvanandanaṃ surārigarvacarvaṇam | prapañcanāśabhīṣaṇaṃ dhanañjayādibhūṣaṇaṃ kapoladānavāraṇaṃ bhaje purāṇavāraṇam ||",
    "meaning": "A devotional verse praising the ancient elephant-faced Lord and remover of distress.",
    "source": "Ganesha Pancharatnam tradition; traditionally attributed to Adi Shankaracharya.",
    "script": "Devanagari"
  },
  {
    "id": "pancharatnam-5",
    "title": "Nitantakanta Dantakanti",
    "collection": "Ganesha Pancharatnam",
    "type": "Traditional stotra attributed to Adi Shankaracharya",
    "devanagari": "नितान्तकान्तदन्तकान्तिमन्तकान्तकात्मजमचिन्त्यरूपमन्तहीनमन्तरायकृन्तनम् । हृदन्तरे निरन्तरं वसन्तमेव योगिनां तमेकदन्तमेव तं विचिन्तयामि सन्ततम् ॥",
    "transliteration": "nitāntakāntadantakāntimantakāntakātmajam acintyarūpam antahīnam antarāyakṛntanam | hṛdantare nirantaraṃ vasantam eva yogināṃ tam ekadantam eva taṃ vicintayāmi santatam ||",
    "simple": "nitāntakāntadantakāntimantakāntakātmajam acintyarūpam antahīnam antarāyakṛntanam | hṛdantare nirantaraṃ vasantam eva yogināṃ tam ekadantam eva taṃ vicintayāmi santatam ||",
    "meaning": "Meditation on Ekadanta as the inconceivable remover of inner and outer obstacles.",
    "source": "Ganesha Pancharatnam tradition; traditionally attributed to Adi Shankaracharya.",
    "script": "Devanagari"
  },
  {
    "id": "pancharatnam-6",
    "title": "Mahaganesha Pancharatna Phala",
    "collection": "Ganesha Pancharatnam",
    "type": "Traditional stotra attributed to Adi Shankaracharya",
    "devanagari": "महागणेशपञ्चरत्नमादरेण योऽन्वहं प्रजल्पति प्रभातके हृदि स्मरन् गणेश्वरम् । अरोगतामदोषतां सुसाहितीं सुपुत्रतां समाहितायुरष्टभूतिमभ्युपैति सोऽचिरात् ॥",
    "transliteration": "mahāgaṇeśapañcaratnam ādareṇa yo'nvahaṃ prajalpati prabhātake hṛdi smaran gaṇeśvaram | arogatām adoṣatāṃ susāhitīṃ suputratāṃ samāhitāyur aṣṭabhūtim abhyupaiti so'cirāt ||",
    "simple": "mahāgaṇeśapañcaratnam ādareṇa yo'nvahaṃ prajalpati prabhātake hṛdi smaran gaṇeśvaram | arogatām adoṣatāṃ susāhitīṃ suputratāṃ samāhitāyur aṣṭabhūtim abhyupaiti so'cirāt ||",
    "meaning": "Traditional concluding verse describing the fruits of devoted recitation.",
    "source": "Ganesha Pancharatnam tradition; traditionally attributed to Adi Shankaracharya.",
    "script": "Devanagari"
  },
  {
    "id": "atharva-1",
    "title": "Namaste Ganapataye",
    "collection": "Ganapati Atharvashirsha",
    "type": "Upanishadic / Atharvashirsha passage",
    "devanagari": "ॐ नमस्ते गणपतये । त्वमेव प्रत्यक्षं तत्त्वमसि । त्वमेव केवलं कर्ताऽसि । त्वमेव केवलं धर्ताऽसि । त्वमेव केवलं हर्ताऽसि । त्वमेव सर्वं खल्विदं ब्रह्मासि । त्वं साक्षादात्माऽसि नित्यम् ॥",
    "transliteration": "oṃ namaste gaṇapataye | tvam eva pratyakṣaṃ tattvam asi | tvam eva kevalaṃ kartā'si | tvam eva kevalaṃ dhartā'si | tvam eva kevalaṃ hartā'si | tvam eva sarvaṃ khalvidaṃ brahmāsi | tvaṃ sākṣādātmā'si nityam ||",
    "simple": "oṃ namaste gaṇapataye | tvam eva pratyakṣaṃ tattvam asi | tvam eva kevalaṃ kartā'si | tvam eva kevalaṃ dhartā'si | tvam eva kevalaṃ hartā'si | tvam eva sarvaṃ khalvidaṃ brahmāsi | tvaṃ sākṣādātmā'si nityam ||",
    "meaning": "Salutation to Ganapati as the immediately present reality, source, sustainer and dissolver.",
    "source": "Ganapati Atharvashirsha / Ganapati Upanishad tradition.",
    "script": "Devanagari"
  },
  {
    "id": "atharva-2",
    "title": "Ritam Vachmi Satyam Vachmi",
    "collection": "Ganapati Atharvashirsha",
    "type": "Upanishadic / Atharvashirsha passage",
    "devanagari": "ऋतं वच्मि । सत्यं वच्मि ॥",
    "transliteration": "ṛtaṃ vacmi | satyaṃ vacmi ||",
    "simple": "ṛtaṃ vacmi | satyaṃ vacmi ||",
    "meaning": "A declaration to speak cosmic order and truth.",
    "source": "Ganapati Atharvashirsha / Ganapati Upanishad tradition.",
    "script": "Devanagari"
  },
  {
    "id": "atharva-3",
    "title": "Ava Tvam Mam",
    "collection": "Ganapati Atharvashirsha",
    "type": "Upanishadic / Atharvashirsha passage",
    "devanagari": "अव त्वं माम् । अव वक्तारम् । अव श्रोतारम् । अव दातारम् । अव धातारम् । अवानूचानमव शिष्यम् ॥",
    "transliteration": "ava tvaṃ mām | ava vaktāram | ava śrotāram | ava dātāram | ava dhātāram | avānūcānam ava śiṣyam ||",
    "simple": "ava tvaṃ mām | ava vaktāram | ava śrotāram | ava dātāram | ava dhātāram | avānūcānam ava śiṣyam ||",
    "meaning": "A prayer for protection of speaker, listener, giver, sustainer, teacher and student.",
    "source": "Ganapati Atharvashirsha / Ganapati Upanishad tradition.",
    "script": "Devanagari"
  },
  {
    "id": "atharva-4",
    "title": "Tvam Vangmayas Tvam Chinmayah",
    "collection": "Ganapati Atharvashirsha",
    "type": "Upanishadic / Atharvashirsha passage",
    "devanagari": "त्वं वाङ्मयस्त्वं चिन्मयः । त्वमानन्दमयस्त्वं ब्रह्ममयः । त्वं सच्चिदानन्दाद्वितीयोऽसि ॥",
    "transliteration": "tvaṃ vāṅmayas tvaṃ cinmayaḥ | tvam ānandamayas tvaṃ brahmamayaḥ | tvaṃ saccidānandādvitīyo'si ||",
    "simple": "tvaṃ vāṅmayas tvaṃ cinmayaḥ | tvam ānandamayas tvaṃ brahmamayaḥ | tvaṃ saccidānandādvitīyo'si ||",
    "meaning": "Ganapati is praised as speech, consciousness, bliss and non-dual reality.",
    "source": "Ganapati Atharvashirsha / Ganapati Upanishad tradition.",
    "script": "Devanagari"
  },
  {
    "id": "atharva-5",
    "title": "Sarvam Jagadidam Tvatto Jayate",
    "collection": "Ganapati Atharvashirsha",
    "type": "Upanishadic / Atharvashirsha passage",
    "devanagari": "सर्वं जगदिदं त्वत्तो जायते । सर्वं जगदिदं त्वत्तस्तिष्ठति । सर्वं जगदिदं त्वयि लयमेष्यति । सर्वं जगदिदं त्वयि प्रत्येति ॥",
    "transliteration": "sarvaṃ jagad idaṃ tvatto jāyate | sarvaṃ jagad idaṃ tvattas tiṣṭhati | sarvaṃ jagad idaṃ tvayi layam eṣyati | sarvaṃ jagad idaṃ tvayi pratyeti ||",
    "simple": "sarvaṃ jagad idaṃ tvatto jāyate | sarvaṃ jagad idaṃ tvattas tiṣṭhati | sarvaṃ jagad idaṃ tvayi layam eṣyati | sarvaṃ jagad idaṃ tvayi pratyeti ||",
    "meaning": "The universe is described as arising from, abiding in and returning to the same reality.",
    "source": "Ganapati Atharvashirsha / Ganapati Upanishad tradition.",
    "script": "Devanagari"
  },
  {
    "id": "atharva-6",
    "title": "Tvam Bhumir Apo'nalo'nilo Nabhah",
    "collection": "Ganapati Atharvashirsha",
    "type": "Upanishadic / Atharvashirsha passage",
    "devanagari": "त्वं भूमिरापोऽनलोऽनिलो नभः । त्वं चत्वारि वाक्पदानि ॥",
    "transliteration": "tvaṃ bhūmir āpo'nalo'nilo nabhaḥ | tvaṃ catvāri vākpadāni ||",
    "simple": "tvaṃ bhūmir āpo'nalo'nilo nabhaḥ | tvaṃ catvāri vākpadāni ||",
    "meaning": "Ganapati is identified with the elemental world and the levels of speech.",
    "source": "Ganapati Atharvashirsha / Ganapati Upanishad tradition.",
    "script": "Devanagari"
  },
  {
    "id": "atharva-7",
    "title": "Ganadim Purvam Uccharya",
    "collection": "Ganapati Atharvashirsha",
    "type": "Upanishadic / Atharvashirsha passage",
    "devanagari": "गणादिं पूर्वमुच्चार्य वर्णादिं तदनन्तरम् । अनुस्वारः परतरः । अर्धेन्दुलसितम् । तारेण ऋद्धम् । एतत्तव मनुस्वरूपम् ॥",
    "transliteration": "gaṇādiṃ pūrvam uccārya varṇādiṃ tadanantaram | anusvāraḥ parataraḥ | ardhendulasitam | tāreṇa ṛddham | etat tava manusvarūpam ||",
    "simple": "gaṇādiṃ pūrvam uccārya varṇādiṃ tadanantaram | anusvāraḥ parataraḥ | ardhendulasitam | tāreṇa ṛddham | etat tava manusvarūpam ||",
    "meaning": "A traditional explanation of the sound-form of the Ganapati mantra.",
    "source": "Ganapati Atharvashirsha / Ganapati Upanishad tradition.",
    "script": "Devanagari"
  },
  {
    "id": "atharva-8",
    "title": "Gam Bija",
    "collection": "Ganapati Atharvashirsha",
    "type": "Upanishadic / Atharvashirsha passage",
    "devanagari": "गकारः पूर्वरूपम् । अकारो मध्यमरूपम् । अनुस्वारश्चान्त्यरूपम् । बिन्दुरुत्तररूपम् । नादः सन्धानम् । संहिता सन्धिः ॥",
    "transliteration": "gakāraḥ pūrvarūpam | akāro madhyamarūpam | anusvāraścāntyarūpam | binduruttararūpam | nādaḥ sandhānam | saṃhitā sandhiḥ ||",
    "simple": "gakāraḥ pūrvarūpam | akāro madhyamarūpam | anusvāraścāntyarūpam | binduruttararūpam | nādaḥ sandhānam | saṃhitā sandhiḥ ||",
    "meaning": "The syllable 'gam' is analyzed as a sacred sound-form.",
    "source": "Ganapati Atharvashirsha / Ganapati Upanishad tradition.",
    "script": "Devanagari"
  },
  {
    "id": "atharva-9",
    "title": "Ekadantam Chaturhastam",
    "collection": "Ganapati Atharvashirsha",
    "type": "Upanishadic / Atharvashirsha passage",
    "devanagari": "एकदन्तं चतुर्हस्तं पाशमङ्कुशधारिणम् । रदं च वरदं हस्तैर्बिभ्राणं मूषकध्वजम् ॥",
    "transliteration": "ekadantaṃ caturhastaṃ pāśam aṅkuśadhāriṇam | radaṃ ca varadaṃ hastair bibhrāṇaṃ mūṣakadhvajam ||",
    "simple": "ekadantaṃ caturhastaṃ pāśam aṅkuśadhāriṇam | radaṃ ca varadaṃ hastair bibhrāṇaṃ mūṣakadhvajam ||",
    "meaning": "A dhyana description of one-tusked, four-armed Ganapati holding traditional attributes.",
    "source": "Ganapati Atharvashirsha / Ganapati Upanishad tradition.",
    "script": "Devanagari"
  },
  {
    "id": "atharva-10",
    "title": "Namo Vratapataye",
    "collection": "Ganapati Atharvashirsha",
    "type": "Upanishadic / Atharvashirsha passage",
    "devanagari": "नमो व्रातपतये । नमो गणपतये । नमः प्रमथपतये । नमस्तेऽस्तु लम्बोदरायैकदन्ताय विघ्ननाशिने शिवसुताय श्रीवरदमूर्तये नमो नमः ॥",
    "transliteration": "namo vrātapataye | namo gaṇapataye | namaḥ pramathapataye | namaste'stu lambodarāyaikadantāya vighnanāśine śivasutāya śrīvaradamūrtaye namo namaḥ ||",
    "simple": "namo vrātapataye | namo gaṇapataye | namaḥ pramathapataye | namaste'stu lambodarāyaikadantāya vighnanāśine śivasutāya śrīvaradamūrtaye namo namaḥ ||",
    "meaning": "Repeated salutations to Ganapati, Lambodara, Ekadanta, remover of obstacles and son of Shiva.",
    "source": "Ganapati Atharvashirsha / Ganapati Upanishad tradition.",
    "script": "Devanagari"
  },
  {
    "id": "talam-1",
    "title": "Ganapati Talam 1",
    "collection": "Sri Ganapati Talam",
    "type": "Traditional rhythmic Ganapati hymn",
    "devanagari": "",
    "transliteration": "vikaṭotkaṭasundaradantimukhaṃ bhujagendrasusarpagadābharaṇam | gajanīlagajendra gaṇādhipatiṃ praṇato'smi vināyaka hastimukham ||",
    "simple": "vikaṭotkaṭasundaradantimukhaṃ bhujagendrasusarpagadābharaṇam | gajanīlagajendra gaṇādhipatiṃ praṇato'smi vināyaka hastimukham ||",
    "meaning": "Salutation to the majestic elephant-faced Vinayaka.",
    "source": "Traditional Sri Ganapati Talam; cross-checked against Stotra Nidhi / Stotrams.",
    "script": "IAST"
  },
  {
    "id": "talam-2",
    "title": "Ganapati Talam 2",
    "collection": "Sri Ganapati Talam",
    "type": "Traditional rhythmic Ganapati hymn",
    "devanagari": "",
    "transliteration": "sura sura gaṇapati sundarakeśaṃ ṛṣi ṛṣi gaṇapati yajñasamānam | bhava bhava gaṇapati padmaśarīraṃ jaya jaya gaṇapati divyanamaste ||",
    "simple": "sura sura gaṇapati sundarakeśaṃ ṛṣi ṛṣi gaṇapati yajñasamānam | bhava bhava gaṇapati padmaśarīraṃ jaya jaya gaṇapati divyanamaste ||",
    "meaning": "A rhythmic verse of praise: victory and salutations to divine Ganapati.",
    "source": "Traditional Sri Ganapati Talam; cross-checked against Stotra Nidhi / Stotrams.",
    "script": "IAST"
  },
  {
    "id": "talam-3",
    "title": "Ganapati Talam 3",
    "collection": "Sri Ganapati Talam",
    "type": "Traditional rhythmic Ganapati hymn",
    "devanagari": "",
    "transliteration": "gajamukhavaktraṃ girijāputraṃ gaṇaguṇamitraṃ gaṇapatim īśapriyam ||",
    "simple": "gajamukhavaktraṃ girijāputraṃ gaṇaguṇamitraṃ gaṇapatim īśapriyam ||",
    "meaning": "Praise of the elephant-faced son of Girija, dear to Shiva.",
    "source": "Traditional Sri Ganapati Talam; cross-checked against Stotra Nidhi / Stotrams.",
    "script": "IAST"
  },
  {
    "id": "talam-4",
    "title": "Ganapati Talam 4",
    "collection": "Sri Ganapati Talam",
    "type": "Traditional rhythmic Ganapati hymn",
    "devanagari": "",
    "transliteration": "karadhṛtaparaśuṃ kaṅkaṇapāṇiṃ kabalitapadmarucim | surapativandyaṃ sundaranṛttaṃ suracitamaṇimakuṭam ||",
    "simple": "karadhṛtaparaśuṃ kaṅkaṇapāṇiṃ kabalitapadmarucim | surapativandyaṃ sundaranṛttaṃ suracitamaṇimakuṭam ||",
    "meaning": "Praise of Ganapati's divine form, ornaments and graceful movement.",
    "source": "Traditional Sri Ganapati Talam; cross-checked against Stotra Nidhi / Stotrams.",
    "script": "IAST"
  },
  {
    "id": "talam-5",
    "title": "Ganapati Talam 5",
    "collection": "Sri Ganapati Talam",
    "type": "Traditional rhythmic Ganapati hymn",
    "devanagari": "",
    "transliteration": "praṇamata devaṃ prakaṭita tālaṃ ṣaḍgiri tālamidam | tattat ṣaḍgiri tālamidaṃ tattat ṣaḍgiri tālamidam ||",
    "simple": "praṇamata devaṃ prakaṭita tālaṃ ṣaḍgiri tālamidam | tattat ṣaḍgiri tālamidaṃ tattat ṣaḍgiri tālamidam ||",
    "meaning": "A transition into the hymn's rhythmic tala pattern.",
    "source": "Traditional Sri Ganapati Talam; cross-checked against Stotra Nidhi / Stotrams.",
    "script": "IAST"
  },
  {
    "id": "talam-6",
    "title": "Ganapati Talam 6",
    "collection": "Sri Ganapati Talam",
    "type": "Traditional rhythmic Ganapati hymn",
    "devanagari": "",
    "transliteration": "lambodaravara kuñjāsurakṛta kuṅkumavarṇadharam | śvetasaśṛṅgaṃ modakahastaṃ prītisapanasaphalam ||",
    "simple": "lambodaravara kuñjāsurakṛta kuṅkumavarṇadharam | śvetasaśṛṅgaṃ modakahastaṃ prītisapanasaphalam ||",
    "meaning": "Praise of Lambodara with modaka in hand and auspicious form.",
    "source": "Traditional Sri Ganapati Talam; cross-checked against Stotra Nidhi / Stotrams.",
    "script": "IAST"
  },
  {
    "id": "talam-7",
    "title": "Ganapati Talam 7",
    "collection": "Sri Ganapati Talam",
    "type": "Traditional rhythmic Ganapati hymn",
    "devanagari": "",
    "transliteration": "nayanatrayavara nāgavibhūṣita nānāgaṇapatidaṃ tattat | nayanatrayavara nāgavibhūṣita nānāgaṇapatidaṃ tattat | nānāgaṇapati taṃ tattat nānāgaṇapatidam ||",
    "simple": "nayanatrayavara nāgavibhūṣita nānāgaṇapatidaṃ tattat | nayanatrayavara nāgavibhūṣita nānāgaṇapatidaṃ tattat | nānāgaṇapati taṃ tattat nānāgaṇapatidam ||",
    "meaning": "A rhythmic praise of Ganapati adorned with serpent ornaments.",
    "source": "Traditional Sri Ganapati Talam; cross-checked against Stotra Nidhi / Stotrams.",
    "script": "IAST"
  },
  {
    "id": "talam-8",
    "title": "Ganapati Talam 8",
    "collection": "Sri Ganapati Talam",
    "type": "Traditional rhythmic Ganapati hymn",
    "devanagari": "",
    "transliteration": "dhavalitajaladharadhavalitacandraṃ phaṇimaṇikiraṇavibhūṣitakhaḍgam | tanutanuviṣaharaśūlakapālaṃ hara hara śiva śiva gaṇapatimabhayam ||",
    "simple": "dhavalitajaladharadhavalitacandraṃ phaṇimaṇikiraṇavibhūṣitakhaḍgam | tanutanuviṣaharaśūlakapālaṃ hara hara śiva śiva gaṇapatimabhayam ||",
    "meaning": "A vivid praise verse invoking fearlessness and auspiciousness.",
    "source": "Traditional Sri Ganapati Talam; cross-checked against Stotra Nidhi / Stotrams.",
    "script": "IAST"
  },
  {
    "id": "talam-9",
    "title": "Ganapati Talam 9",
    "collection": "Sri Ganapati Talam",
    "type": "Traditional rhythmic Ganapati hymn",
    "devanagari": "",
    "transliteration": "kaṭataṭavigalitamadajalajaladhita-gaṇapativādyamidaṃ | kaṭataṭavigalitamadajalajaladhita-gaṇapativādyamidaṃ | tattak gaṇapativādyamidaṃ tattak gaṇapativādyamidam ||",
    "simple": "kaṭataṭavigalitamadajalajaladhita-gaṇapativādyamidaṃ | kaṭataṭavigalitamadajalajaladhita-gaṇapativādyamidaṃ | tattak gaṇapativādyamidaṃ tattak gaṇapativādyamidam ||",
    "meaning": "Percussive syllables and praise merge into a rhythmic offering.",
    "source": "Traditional Sri Ganapati Talam; cross-checked against Stotra Nidhi / Stotrams.",
    "script": "IAST"
  },
  {
    "id": "talam-10",
    "title": "Ganapati Talam 10",
    "collection": "Sri Ganapati Talam",
    "type": "Traditional rhythmic Ganapati hymn",
    "devanagari": "",
    "transliteration": "takka dhiṃ naṃ tariku tarijanaku kukutaddi kukutakiṭa ḍiṇḍiṅgu ḍiguṇa kukutaddi | tatta jhaṃ jhaṃ tarita ta jhaṃ jhaṃ tarita takata jhaṃ jhaṃ tarita | tari tanata tanajhaṇuta jhaṇudhimita kiṭataka tarikiṭatoṃ takiṭa kiṭataka tarikiṭatoṃ tām ||",
    "simple": "takka dhiṃ naṃ tariku tarijanaku kukutaddi kukutakiṭa ḍiṇḍiṅgu ḍiguṇa kukutaddi | tatta jhaṃ jhaṃ tarita ta jhaṃ jhaṃ tarita takata jhaṃ jhaṃ tarita | tari tanata tanajhaṇuta jhaṇudhimita kiṭataka tarikiṭatoṃ takiṭa kiṭataka tarikiṭatoṃ tām ||",
    "meaning": "A tala-jati passage using rhythmic percussion syllables as devotional offering.",
    "source": "Traditional Sri Ganapati Talam; cross-checked against Stotra Nidhi / Stotrams.",
    "script": "IAST"
  },
  {
    "id": "talam-11",
    "title": "Ganapati Talam 11",
    "collection": "Sri Ganapati Talam",
    "type": "Traditional rhythmic Ganapati hymn",
    "devanagari": "",
    "transliteration": "takatakiṭa takatakiṭa takatakiṭa tattoṃ śaśikalita maulinaṃ śūlinam | takatakiṭa takatakiṭa takatakiṭa tattoṃ vimalaśubha kamalajala pādukaṃ pāṇinam | dhittakiṭa dhittakiṭa dhittakiṭa tattoṃ pramathagaṇaguṇakhacita śobhanaṃ śobhitam | takatakiṭa takatakiṭa takatakiṭa tattoṃ panasaphala kadaliphala modanaṃ modakam | dhittakiṭa dhittakiṭa dhittakiṭa tattoṃ pramathaguru śivatanaya gaṇapati tālanam ||",
    "simple": "takatakiṭa takatakiṭa takatakiṭa tattoṃ śaśikalita maulinaṃ śūlinam | takatakiṭa takatakiṭa takatakiṭa tattoṃ vimalaśubha kamalajala pādukaṃ pāṇinam | dhittakiṭa dhittakiṭa dhittakiṭa tattoṃ pramathagaṇaguṇakhacita śobhanaṃ śobhitam | takatakiṭa takatakiṭa takatakiṭa tattoṃ panasaphala kadaliphala modanaṃ modakam | dhittakiṭa dhittakiṭa dhittakiṭa tattoṃ pramathaguru śivatanaya gaṇapati tālanam ||",
    "meaning": "The concluding rhythmic section celebrates Ganapati with tala syllables, offerings and praise.",
    "source": "Traditional Sri Ganapati Talam; cross-checked against Stotra Nidhi / Stotrams.",
    "script": "IAST"
  }
];

  function pad(n){ return String(n).padStart(3,"0"); }

  const idols = Array.from({length:105},(_,i)=>{
    const n=i+1;
    const sizes=[1,2,3,4,5];
    const styles=["Traditional","Eco clay","Royal","Lotus","Dancing","Scholar","Village","Temple","Floral","Gemstone"];
    const colors=["Saffron","Ivory","Emerald","Ruby","Royal blue","Rose","Gold","Terracotta","Silver","Multicolor"];
    return {
      id:`idol-${pad(n)}`,
      name:`Ganesha Idol ${pad(n)}`,
      image:`assets/idols/idol_${pad(n)}.png`,
      sizeFt:sizes[i%sizes.length],
      style:styles[i%styles.length],
      color:colors[(i*3)%colors.length],
      price:45 + (i%5)*20 + Math.floor(i/20)*5,
      rarity:i%17===0?"heritage":i%9===0?"special":"classic"
    };
  });

  const mandaps = [];
  architectures.forEach((arch,a)=>{
    themes.forEach((theme,t)=>{
      mandaps.push({
        id:`mandap-${pad(mandaps.length+1)}`,
        name:`${theme[0]} ${arch}`,
        architecture:arch,
        theme:theme[0],
        primary:theme[1],
        secondary:theme[2],
        pattern:(a+t)%6,
        pillars:2 + ((a+t)%4),
        roof:["arch","dome","canopy","gopuram"][(a*3+t)%4],
        price:70 + a*9 + t*6
      });
    });
  });

  const decorations = Array.from({length:500},(_,i)=>{
    const cat=decorCategories[i%decorCategories.length];
    const tier=1+(i%5);
    const theme=themes[(i*7)%themes.length];
    return {
      id:`decor-${pad(i+1)}`,
      name:`${theme[0]} ${cat[0]} ${1+Math.floor(i/decorCategories.length)}`,
      category:cat[0],
      icon:cat[1],
      tier,
      primary:theme[1],
      secondary:theme[2],
      price:4 + tier*3 + (i%7)
    };
  });

  window.GFJData = {
    version:5,
    difficulties:{
      easy:{label:"Easy",multiplier:0.8,reward:1},
      medium:{label:"Medium",multiplier:1,reward:1.35},
      hard:{label:"Hard",multiplier:1.25,reward:1.8}
    },
    stages:[
      {id:"memory",name:"Ganesha Memory",icon:"◈",skill:"Spatial focus"},
      {id:"math",name:"Modak Math",icon:"×",skill:"Mental arithmetic"},
      {id:"hunt",name:"Mushak Hunt",icon:"⌕",skill:"Visual discovery"},
      {id:"sequence",name:"Ganesha Sequence",icon:"♫",skill:"Sequential recall"},
      {id:"pattern",name:"Festival Pattern",icon:"✥",skill:"Pattern logic"}
    ],
    durations:[3,6,9,11],
    idols,
    mandaps,
    decorations,
    pujaItems,
    mantras
  };
})();