/**
 * Dzongkha (རྫོང་ཁ) translations — Home page content only, per the current
 * brief in `docs/brief.md`. Keyed flat, one entry per English string that
 * appears in `src/components/home/*` and `src/pages/HomePage.jsx`; the
 * English original stays inline at each call site as the fallback (see
 * `useLanguage()`'s `t(key, fallbackEnglish)`), so nothing is duplicated
 * for the default English experience.
 *
 * TRANSLATION NOTE: this is a best-effort machine translation, not a
 * native-speaker review. Proper nouns (person names), technical
 * certification names (e.g. "CompTIA Network+"), and loanwords with no
 * common Dzongkha equivalent (Wi-Fi, CCTV, UPS, IoT) are intentionally
 * left in Latin script/English, matching everyday Dzongkha usage. Have a
 * native Dzongkha speaker review this copy before it goes live.
 */
export const dzHomeTranslations = {
  // Hero
  'hero.badgeSuffix': 'འབྲུག་ནང་',
  'hero.headline':
    'འབྲུག་གི་ཨའི་ཊི་གཞི་རྟེན་ཚུ་ བཙོང་ནི་དང་སྒྲིག་ནི། སྔ་མཇུག་མཐའ་དོན་ཚུན་ རྒྱབ་སྐྱོར་འབད་མིའི་ ཁྱོད་ཀྱི་མཉམ་རོགས།',
  'hero.subcopy':
    'ང་བཅས་ཀྱིས་ འབྲུག་གི་ད་ལྟོའི་ཚོང་ལས་དང་ མི་སྒེར་སོ་སོའི་དགོས་མཁོ་དང་འཁྲིལ་ཏེ་ ཡིད་ཆེས་ཅན་གྱི་ཨའི་ཊི་ཐོན་རྫས་དང་། སྨར་ཊི་གློག་ཕྲན། དེ་ལས་ལག་ལེན་ཐབས་ཤེས་ཚུ་ སྤྲོད་དོ་ཡོདཔ་ཨིན།',
  'hero.award': 'འཐོན་གསར་ཨའི་ཊི་ཐབས་ཤེས་སྤྲོད་མི་ལེགས་ཤོས། — འབྲུག་ཨའི་ཊི་གཟེངས་བསྟོད་ ༢༠༢༥།',
  'hero.card1.title': 'ཚོགས་གཅིག་གིས་ཚུན་མཐའ་ཆ་ཚང་།',
  'hero.card1.desc':
    'བཙོང་ནི་དང་སྒྲིག་ནི། སྒྲིག་སྟངས་གཏད་ནི། རྒྱབ་སྐྱོར་ཚུ་ — མཐའ་དོན་ཚུན་ང་བཅས་ཀྱིས་ལེན་དོ་ཡོདཔ་ལས་ ཚོང་བཙུགས་པའི་ཤུལ་ལས་ཕྱིར་བཏང་མི་ཨིན།',
  'hero.card2.title': 'Wi-Fi དང་ནེཊི་ཝརཀ།',
  'hero.card2.desc': 'ཐོག་ཁག་མང་པོའི་ཁྱབ་ཚད། ས་གནས་ནང་སྒྲིག་སྟངས་བཟོ་ཡི།',
  'hero.card3.title': 'CCTV དང་ཉེན་སྲུང་།',
  'hero.card3.desc': 'དབུས་འཛིན་དང་ཐག་རིང་ལས་ལྟ་རྟོག',

  // Shared CTA / conversion strings
  'cta.requestQuote': 'རིན་བསྡུར་ཞུ་བ།',
  'cta.exploreProducts': 'ཐོན་རྫས་ཚུ་བལྟ།',
  'leadMagnet.text': 'རིན་མེད་ཨའི་ཊི་གཞི་རྟེན་གྲོས་བསྟུན།',
  'common.noObligation': 'བཀོད་ཁྲིམས་མེད་པ་དང་། རིན་བཀལ་མེད་པ',
  'common.viewAllWork': 'ལཱ་ཆ་ཚང་བལྟ།',
  'common.readCaseStudy': 'ལཱ་གྱི་གནས་ཚུལ་ལྷག',
  'common.exploreServices': 'ཞབས་ཏོག་ཚུ་བལྟ།',
  'common.readAllTestimonials': 'ཞུ་སྙན་ཆ་ཚང་ལྷག',
  'common.readFullStory': 'ང་བཅས་ཀྱི་གནས་ཚུལ་ཆ་ཚང་ལྷག',
  'common.close': 'ཁ་བསྡམས།',
  'common.fullQuoteRequestForm': 'རིན་བསྡུར་ཞུ་ཡིག་ཆ་ཚང་།',
  'common.fullRequestForm': 'ཞུ་ཡིག་ཆ་ཚང་།',
  'common.contactPage': 'འབྲེལ་བ་ཤོག་ལེབ།',

  // Featured Work
  'featuredWork.heading': 'གནད་སྟོན་ལཱ་གཡོག',
  'featuredWork.desc':
    'ཚོང་ལས། ཉེན་སྲུང་། དེ་ལས་ནེཊི་ཝརཀ་ལཱ་གཡོག་ཐོག་ལུ་ དངོས་སུ་བཙུགས་ཡོད་མི་ཚུ་ — ཚོགས་གཅིག་གིས་བཙོང་། སྒྲིག་། རྒྱབ་སྐྱོར་འབད་ཡི།',
  'vertical.corporate': 'ཚོང་ལས།',
  'vertical.security': 'ཉེན་སྲུང་།',
  'vertical.networking': 'ནེཊི་ཝརཀ།',
  'project.corporate-office-it-infrastructure.name': 'ཚོང་ལས་ལས་ཁུངས་ཨའི་ཊི་གཞི་རྟེན།',
  'project.corporate-office-it-infrastructure.description':
    'འཕེལ་རྒྱས་འགྱོ་མིའི་ཚོང་ལས་ལས་ཁུངས་ཅིག་གི་དོན་ལུ་ གློག་རིག་དང་ ནེཊི་ཝརཀ། Wi-Fi། པར་སྐྲུན་འཕྲུལ་ཆས། དེ་ལས་ཨའི་ཊི་གཞི་རྟེན་ཚུ་ བཟོ་བཀོད་དང་བཙུགས་ཡི།',
  'project.smart-cctv-security-system.name': 'སྨར་ཊི་ CCTV ཉེན་སྲུང་མ་ལག',
  'project.smart-cctv-security-system.description':
    'ཚོང་འབྲེལ་ས་ཁོངས་ཅིག་གི་དོན་ལུ་ དབུས་འཛིན་ཐག་རིང་འཛུལ་སྤྱོད་དང་བཅས་པའི་ IP ལུ་བརྟེན་པའི་ CCTV དང་ལྟ་རྟོག་མ་ལག་ཅིག་བཙུགས་ཡི།',
  'project.enterprise-wifi-deployment.name': 'ཚོང་ལས་ཆེན་པོའི་ Wi-Fi བཙུགས་ནི།',
  'project.enterprise-wifi-deployment.description':
    'ཐོག་ཁག་མང་པོ་ཡོད་པའི་ལས་ཁུངས་ཁྱབ་ཁོངས་ཅིག་ནང་ ཡིད་ཆེས་ཅན་གྱི་མགྱོགས་ཤོས་ Wi-Fi ཁྱབ་ཚད་ཅིག་ བཟོ་བཀོད་དང་ལག་ལེན་བསྟར་ཡི།',

  // Services Overview
  'servicesOverview.heading': 'ང་བཅས་ཀྱིས་ག་ཅི་འབད་དོ་ཡོདཔ།',
  'servicesOverview.desc':
    'མི་སྒེར་ཐོན་རྫས་ལས་འགོ་བཙུགས་ཏེ་ གཞི་རྟེན་ཆ་ཚང་ཚུན་ — འོག་གི་དབྱེ་ཁག་རེ་རེ་ཚོགས་གཅིག་གིས་ བཙོང་། སྒྲིག་། རྒྱབ་སྐྱོར་འབདཝ་ཨིན།',
  'serviceCategory.computers.title': 'གློག་རིག་དང་ལཱ་འཐབ་ས།',
  'serviceCategory.computers.description':
    'ལེཔ་ཊོཔ། ཌེསཀ་ཊོཔ། དེ་ལས་ལཱ་འཐབ་ས་ཚུ་དང་། དེ་ཚུ་ལག་ལེན་འཐབ་ནིའི་དོན་ལུ་དགོས་མཁོའི་ཆས་ཆུང་ཚུ།',
  'serviceCategory.networking.title': 'ནེཊི་ཝརཀ་དང་ Wi-Fi',
  'serviceCategory.networking.description':
    'ཁྱབ་ཚད་ཆ་ཚང་གི་དོན་ལུ་བཟོ་བཀོད་འབད་མིའི་ ནེཊི་ཝརཀ་ཆས་ཆུང་། སྒྲིག་སྟངས། དེ་ལས་ Wi-Fi གཞི་རྟེན།',
  'serviceCategory.security.title': 'ཉེན་སྲུང་དང་ལྟ་རྟོག',
  'serviceCategory.security.description':
    'དབུས་འཛིན་ལྟ་རྟོག་དང་ཐག་རིང་འཛུལ་སྤྱོད་དང་བཅས་པའི་ CCTV དང་ཉེན་སྲུང་མ་ལག',
  'serviceCategory.smart.title': 'སྨར་ཊི་ལག་ཆས་དང་གློག་ཤུགས།',
  'serviceCategory.smart.description': 'སྨར་ཊི་ཁྱིམ་དང་ IoT ལག་ཆས་ཚུ། དེ་ལས་ UPS དང་གློག་ཤུགས་རྒྱབ་སྐྱོར་ཐབས་ཤེས།',
  'serviceCategory.printing.title': 'པར་སྐྲུན་དང་གནས་ཁོངས།',
  'serviceCategory.printing.description': 'པར་འཕྲུལ། པར་སྐྲུན་ཐབས་ཤེས། དེ་ལས་གནད་སྡུད་གནས་ཁོངས་དང་རྒྱབ་སྐྱོར་མ་ལག',
  'serviceCategory.infrastructure.title': 'གཞི་རྟེན་དང་རྒྱབ་སྐྱོར།',
  'serviceCategory.infrastructure.description':
    'སར་བར། མཉེན་ཆས། ཆས་ཆུང་བཙོང་ནི། སྒྲིག་སྟངས། དེ་ལས་རྒྱུན་མཐུད་གནད་དོན་རྒྱབ་སྐྱོར།',

  // Client Results
  'clientResults.heading': 'ལག་ལེན་ནང་དེ་ག་དེ་སྦེ་མཐོང་ཡི་ག།',
  'clientResults.desc':
    'ལཱ་གཡོག་རེ་རེ་ ས་ཁོངས་དང་འཁྲིལ་ཏེ་ཚད་བཟུང་འབདཝ་ཨིན། — འདི་ལུ་དངོས་སུ་བཙུགས་ཡོད་མི་ཚུ་གིས་སྤྲོད་མིའི་གྲུབ་འབྲས་དབྱེ་ཁག་ཨིན།',
  'result.wifi.outcome': 'ཡིད་ཆེས་ཅན་དང་མགྱོགས་ཤོས་ཁྱབ་ཚད།',
  'result.wifi.context': 'ལས་ཁུངས་ཁྱབ་ཁོངས་ཧྲིལ་བུའི་དོན་ལུ་ ཐོག་ཁག་མང་པོའི་ Wi-Fi བཙུགས་ཏེ་སྒྲིག་སྟངས་བཟོ་ཡི།',
  'result.cctv.outcome': 'དབུས་འཛིན་ཐག་རིང་ལྟ་རྟོག',
  'result.cctv.context': 'ཚོང་འབྲེལ་ས་ཁོངས་ཅིག་གི་དོན་ལུ་ ག་ཏེ་ལས་རང་འཛུལ་སྤྱོད་འབད་བཏུབ་པའི་ IP ལུ་བརྟེན་པའི་ CCTV',
  'result.server.outcome': 'དབུས་འཛིན་སར་བར་དང་རྒྱབ་སྐྱོར།',
  'result.server.context': 'ནེཊི་ཝརཀ་གནས་ཁོངས་དང་གནད་སྡུད་འཛིན་སྐྱོང་ མ་ལག་གཅིག་ནང་བསྡོམས་ཡི།',

  // Social Proof
  'socialProof.recognizedBy': 'ངོས་འཛིན་བྱུང་མི།',
  'award.best-emerging-technology-solutions-provider':
    'འཐོན་གསར་ཨའི་ཊི་ཐབས་ཤེས་སྤྲོད་མི་ལེགས་ཤོས། — འབྲུག་ཨའི་ཊི་གཟེངས་བསྟོད་ ༢༠༢༥།',
  'award.trusted-it-solutions-partner':
    'ཡིད་ཆེས་ཅན་གྱི་ཨའི་ཊི་ཐབས་ཤེས་མཉམ་རོགས། — ལུང་ཕྱོགས་ཚོང་ལས་ལེགས་ཤོས་ངོས་འཛིན་ ༢༠༢༥།',

  // Featured Testimonials
  'testimonials.heading': 'སྤྱོད་མི་ཚུ་གིས་ག་ཅི་ལབ་ཨིན་ན།',
  'testimonial.karma-dorji.quote':
    'ཚོགས་པ་གིས་ང་བཅས་ཀྱི་ལས་ཁུངས་གཞི་རྟེན་ཆ་ཚང་ དུས་ཐོག་ལུ་སྤྲོད་ནུག དེ་ལས་བཙུགས་བཞིན་དུའི་སྐབས་ ཏང་ཏང་རྒྱབ་སྐྱོར་ལེགས་ཤོམ་བྱིན་ནུག',
  'testimonial.karma-dorji.role': 'ཨའི་ཊི་འགོ་འདྲེན་པ།',
  'testimonial.sonam-choden.quote':
    'ང་བཅས་ཀྱི་སློབ་ཕྲུག་དང་སློབ་དཔོན་ཚུའི་དོན་ལུ་ གློག་རིག་ཤེས་ཡོན་ཁང་གི་སྒྲིག་སྟངས་དེ་ མཁས་མཆོག་ལྟར་འཆར་གཞི་བཟོ་སྟེ་ བཙུགས་ཏེ་སྒྲིག་ཡི།',
  'testimonial.sonam-choden.role': 'སློབ་གྲྭའི་བདག་སྐྱོང་པ།',

  // Brand Story
  'brandStory.eyebrow': 'ང་བཅས་ཀྱི་གནས་ཚུལ།',
  'brandStory.heading': 'ང་བཅས་ག་ཅི་འབད་འགོ་བཙུགས་ཡི་ག།',
  'brandStory.founderStory':
    'ཚོང་ལས་འདི་ ཤེས་ཡོན་ལུ་དགའ་མོས་ཡོད་མི་དང་། འབྲུག་ནང་སྤུས་ཚད་ཡོད་པའི་ཨའི་ཊི་དང་གློག་ཐོན་རྫས་ཚུ་ ཧེང་བཀལ་ཐོབ་ཚུགས་པའི་མནོ་བསམ་ལས་འགོ་བཙུགས་ཡི། ལོ་ངོ་མང་པོའི་རིང་ལུ། ང་བཅས་ཀྱིས་ གློག་རིག་ཆས་ཆུང་སྤྱིར་བཏང་བཙོང་ནི་ལས་འགོ་བཙུགས་ཏེ་ ནེཊི་ཝརཀ། ཉེན་སྲུང་། སྨར་ཊི་ལག་ཆས། དེ་ལས་ཚོང་ལས་ཨའི་ཊི་གཞི་རྟེན་བརྩིས་པའི་ ཐབས་ཤེས་ཆ་ཚང་སྤྲོད་ནིའི་བར་ན་རྒྱ་སྐྱེད་འབད་ཡི།',

  // Trust Indicators
  'trustIndicators.heading': 'བཙུགས་ནི་རེ་རེའི་རྒྱབ་ལུ་ ཤེས་ཚུལ་ངོས་སྦྱོར་ཡོད་མི།',
  'trustIndicators.descSuffix': 'ལཱ་གཡོག་འཐབ་མིའི་ལོ་རྒྱུས། སོ་ནམ་ལས་སྡེའི་ངོས་སྦྱོར་གྱིས་རྒྱབ་སྐྱོར་འབད་ཡི།',

  // Consultation CTA + Dialog
  'consultationCta.eyebrow': 'རིན་བསྡུར་ཆ་ཚང་ལུ་གྲ་སྒྲིག་མིན་འདུག་ག?',
  'consultationCta.heading': 'དེ་ལས་རིན་མེད་གྲོས་བསྟུན་ལས་འགོ་བཙུགས།',
  'consultationCta.descSuffix':
    'ཁྱོད་ཀྱི་དཀའ་ངལ་ག་ཅི་ཨིན་ན་ང་བཅས་ལུ་བཤད་གནང་། ག་ཅི་ཡང་ཚད་བཟུང་ཡང་ན་རིན་བཀལ་མ་འབད་བའི་ཧེ་མར་ ང་བཅས་ཀྱིས་གྲོས་བསྟུན་འབད་ནི་ཨིན།',
  'consultationCta.bookButton': 'ཁྱོད་ཀྱི་རིན་མེད་གྲོས་བསྟུན་ཐོ་བཀོད་འབད།',
  'consultationDialog.title': 'ཁྱོད་ཀྱི་རིན་མེད་གྲོས་བསྟུན་ཐོ་བཀོད་འབད།',
  'consultationDialog.descSuffix':
    'ག་ཅི་ཡང་ཚད་བཟུང་ཡང་ན་རིན་བཀལ་མ་འབད་བའི་ཧེ་མར་ ཁྱོད་ཀྱི་དགོས་མཁོ་ཐད་ལུ་གྲོས་བསྟུན་འབད་ནིའི་དོན་ལུ་ ང་བཅས་ཀྱིས་ཤུལ་མམ་འབྲེལ་བ་འཐབ་འོང་།',
  'consultationSuccess.thanksPrefix': 'ཐུགས་རྗེ་ཆེ།',
  'consultationSuccess.bodyBeforeLink':
    'དུས་ཚོད་ཅིག་གདམ་ཁ་རྐྱབ་ནིའི་དོན་ལུ་ ང་བཅས་ཀྱིས་གློག་འཕྲིན་ཐོག་ལས་འབྲེལ་བ་འཐབ་འོང་། ཁྱོད་ཀྱིས་དགོས་མཁོའི་ཚད་གཞི་ཧེ་མ་ལས་ཤེས་ཡོད་པ་ཅིན།',
  'consultationSuccess.bodyAfterLink': 'ཡང་ལེགས་ཤོམ་བེད་སྤྱོད་འབད་བཏུབ།',

  // Consultation form
  'field.fullName': 'མིང་ཆ་ཚང་།',
  'field.emailAddress': 'གློག་འཕྲིན་ཁ་བྱང་།',
  'field.talkThrough': 'ཁྱོད་ཀྱིས་ག་ཅི་གྲོས་བསྟུན་འབད་ནི་སམ?',
  'field.talkThroughHint': 'དགོས་མཁོ་མེད། — ཚིག་གྲུབ་གཅིག་གཉིས་ལང་ཚུགས།',
  'form.errorBanner': 'འོག་གི་ཨང་ཀེར་བཀྲམ་སྟོན་འབད་ཡོད་མི་ཚུ་ལེགས་བཅོས་འབད་གནང་།',
  'form.errorName': 'ཁྱོད་རའི་མིང་བཙུགས་གནང་།',
  'form.errorEmail': 'ཁྱོད་རའི་གློག་འཕྲིན་ཁ་བྱང་བཙུགས་གནང་།',
  'form.errorEmailInvalid': 'ནུས་ཅན་གྱི་གློག་འཕྲིན་ཁ་བྱང་བཙུགས་གནང་།',
  'form.sending': 'བཏང་བཞིན་འདུག...',
  'form.submitConsultation': 'ང་གི་རིན་མེད་གྲོས་བསྟུན་ཞུ་བ།',
  'form.footerPrefix':
    'ད་ལྟོ་ཚུན་གློག་འཕྲིན་བསྐྱལ་ནིའི་མ་ལག་ལུ་མཐུད་མ་ཚུགས། འདི་ནི་ཚོད་བལྟའི་ཐབས་ལམ་ཨིན། རིན་བསྡུར་དངོས་གནས་ཅིག་དགོཔ་ཨིན་ན?',
  'form.footerUseThe': 'བེད་སྤྱོད་འབད།',

  // Final CTA
  'finalCta.heading':
    'བཙོང་ནི་དང་སྒྲིག་ནི། སྔ་མཇུག་མཐའ་དོན་ཚུན་རྒྱབ་སྐྱོར་འབད་མིའི་ ཨའི་ཊི་གཞི་རྟེན་གྱི་དོན་ལུ་གྲ་སྒྲིག་ཡོད་ག?',
  'finalCta.whatsappPrefix': 'WhatsApp ཡང་ན་ཁ་པར་བརྒྱུད་འབྲེལ་བ་འབད་ནི་དགའཝ་ཨིན་ན? འོག་གི་',
};

export default dzHomeTranslations;
