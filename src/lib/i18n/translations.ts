export type SupportedLocale = "en" | "es" | "pt" | "ar" | "ur" | "hi" | "id" | "tr";

export interface TranslationDictionary {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  nav: {
    home: string;
    playlist: string;
    iphone: string;
    android: string;
    mac: string;
    podcast: string;
    mix: string;
    faq: string;
  };
  hero: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    inputPlaceholder: string;
    buttonPaste: string;
    buttonClear: string;
    buttonSubmit: string;
    buttonProcessing: string;
    complianceNote: string;
  };
  status: {
    analyzing: string;
    fetchingMetadata: string;
    verifyingLicense: string;
  };
  card: {
    artistLabel: string;
    durationLabel: string;
    licenseLabel: string;
    downloadPermitted: string;
    downloadDisabled: string;
    downloadMp3: string;
    openSoundCloud: string;
    whyDisabled: string;
    playlistTracks: string;
    downloadAllPermitted: string;
    permittedOfTotal: string;
    format: string;
    sizeEstimate: string;
  };
  mobileHelper: {
    title: string;
    iosTab: string;
    androidTab: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
  };
  howto: {
    title: string;
    subtitle: string;
    step1: string;
    step1Text: string;
    step2: string;
    step2Text: string;
    step3: string;
    step3Text: string;
  };
  features: {
    title: string;
    subtitle: string;
    f1Title: string;
    f1Desc: string;
    f2Title: string;
    f2Desc: string;
    f3Title: string;
    f3Desc: string;
    f4Title: string;
    f4Desc: string;
  };
  faq: {
    title: string;
    subtitle: string;
    q1: string;
    a1: string;
    q2: string;
    a2: string;
    q3: string;
    a3: string;
    q4: string;
    a4: string;
    q5: string;
    a5: string;
  };
  disclaimer: {
    title: string;
    text: string;
  };
  footer: {
    rights: string;
    terms: string;
    privacy: string;
    dmca: string;
    contact: string;
    disclaimer: string;
  };
  errors: {
    invalidUrl: string;
    notFound: string;
    privateResource: string;
    geoBlocked: string;
    rateLimited: string;
    captchaFailed: string;
    serverError: string;
  };
}

export const translations: Record<SupportedLocale, TranslationDictionary> = {
  en: {
    meta: {
      title: "SoundFetch - SoundCloud Downloader & Permitted Audio Helper",
      description:
        "Fast, free SoundCloud link helper and downloader. Save permitted tracks, Creative Commons music, and playlists. Mobile-friendly, high quality audio with zero file storage.",
      keywords:
        "soundcloud downloader, soundcloud to mp3, soundcloud playlist downloader, download soundcloud songs, creative commons audio downloader, free soundcloud tracks",
    },
    nav: {
      home: "Home",
      playlist: "Playlists",
      iphone: "iPhone / iOS",
      android: "Android",
      mac: "Mac",
      podcast: "Podcasts",
      mix: "DJ Mixes",
      faq: "FAQ",
    },
    hero: {
      badge: "Fast & Legal SoundCloud Helper",
      title: "SoundCloud Downloader &",
      titleHighlight: "Permitted Audio Helper",
      subtitle:
        "Paste any SoundCloud track, playlist, or set link. Automatically inspects artist licensing, highlights Creative Commons downloads, and saves permitted audio directly without storing files.",
      inputPlaceholder: "Paste SoundCloud track or playlist URL here...",
      buttonPaste: "Paste",
      buttonClear: "Clear",
      buttonSubmit: "Analyze Link",
      buttonProcessing: "Analyzing...",
      complianceNote:
        "Respecting artists: We only enable downloads for tracks explicitly permitted by uploaders or licensed under Creative Commons.",
    },
    status: {
      analyzing: "Resolving link via SoundCloud API...",
      fetchingMetadata: "Fetching artwork, duration and creator details...",
      verifyingLicense: "Validating Creative Commons and artist download permissions...",
    },
    card: {
      artistLabel: "Artist",
      durationLabel: "Duration",
      licenseLabel: "License",
      downloadPermitted: "Download Permitted",
      downloadDisabled: "Downloads are disabled by the artist",
      downloadMp3: "Download Permitted Audio",
      openSoundCloud: "Listen on SoundCloud",
      whyDisabled:
        "This track has not been enabled for free offline downloads by the creator. Please support the artist by streaming directly on SoundCloud.",
      playlistTracks: "Playlist Tracks",
      downloadAllPermitted: "Download Permitted Tracks (ZIP)",
      permittedOfTotal: "permitted tracks available for instant download",
      format: "Original Quality",
      sizeEstimate: "Direct Stream Pipe",
    },
    mobileHelper: {
      title: "How to copy link on Mobile (Share → Copy Link → Paste)",
      iosTab: "iOS / iPhone",
      androidTab: "Android",
      step1Title: "1. Tap Share in SoundCloud",
      step1Desc: "Open the SoundCloud app or browser, find the track/playlist, and tap the 'Share' arrow icon.",
      step2Title: "2. Tap 'Copy Link'",
      step2Desc: "From the native share sheet, tap 'Copy Link' to store the URL in your clipboard.",
      step3Title: "3. Paste & Download Here",
      step3Desc: "Switch back here, hit the 'Paste' button, and tap 'Analyze Link'.",
    },
    howto: {
      title: "How to Download Permitted SoundCloud Tracks",
      subtitle: "3 simple steps to get legal, high-quality audio files to your device",
      step1: "1. Copy SoundCloud URL",
      step1Text: "Find the track or playlist on SoundCloud and copy its URL from your browser address bar or app share sheet.",
      step2: "2. Paste & Inspect License",
      step2Text: "Paste the URL into our input box above. We query the official SoundCloud API to verify licensing and artwork.",
      step3: "3. Download Permitted Audio",
      step3Text: "If the artist allowed downloads or released it under Creative Commons, click Download to stream it directly to your device.",
    },
    features: {
      title: "Engineered for Speed, Quality, and Legal Compliance",
      subtitle: "A tool designed for music enthusiasts, DJs, content creators, and mobile users",
      f1Title: "No Storage & 100% Private",
      f1Desc: "Zero audio files are stored on our servers. Streams are proxied in memory directly from CDN to your browser.",
      f2Title: "Batch Permitted ZIP Downloads",
      f2Desc: "Process full sets and playlists. Batch compress and download all royalty-free and artist-permitted tracks in one click.",
      f3Title: "Core Web Vitals Optimized",
      f3Desc: "Ultra-fast Next.js architecture with instant response times, PWA capabilities, and lightning LCP under 2 seconds.",
      f4Title: "Artist-First Respect",
      f4Desc: "Strict compliance with copyright law. Copyrighted commercial tracks redirect fans to the official SoundCloud stream.",
    },
    faq: {
      title: "Frequently Asked Questions",
      subtitle: "Everything you need to know about SoundCloud audio downloads and licensing",
      q1: "Is it legal to download music from SoundCloud?",
      a1: "Yes, when downloading tracks that the artist has explicitly enabled for free download or released under Creative Commons licenses. SoundFetch strictly honors artist rights and will not facilitate downloading tracks marked 'All Rights Reserved' without artist consent.",
      q2: "Why do some tracks say 'Downloads are disabled by the artist'?",
      a2: "SoundCloud creators can choose whether their tracks can be downloaded. If an artist has disabled downloads or holds all rights reserved, our tool respects their decision and provides a direct link to listen on SoundCloud instead.",
      q3: "How do I download a full SoundCloud playlist?",
      a3: "Simply paste the playlist (/sets/) URL. Our tool will parse every track, identify which ones have permitted download access, and offer a 'Download Permitted Tracks (ZIP)' button to download all permitted audio files at once.",
      q4: "Can I use this tool on my iPhone or iPad?",
      a4: "Yes! In Mobile Safari or Chrome on iOS, open the SoundCloud app, tap Share → Copy Link, paste it into SoundFetch, and tap Download. Safari will save the audio file directly into your iOS Files app.",
      q5: "Do you store or retain any downloaded audio files?",
      a5: "No. Our service operates with zero disk storage. Audio chunks are piped directly and ephemeral in-memory from SoundCloud's authorized stream to your device, ensuring complete privacy.",
    },
    disclaimer: {
      title: "SoundCloud Disclaimer",
      text: "SoundFetch is an independent web utility and is NOT affiliated, endorsed, certified, or connected with SoundCloud Global Limited & Co. KG or SoundCloud Ltd. All SoundCloud logos, trademarks, and brand names are the property of their respective owners. SoundFetch does not host or store any audio on its servers.",
    },
    footer: {
      rights: "All rights reserved.",
      terms: "Terms of Service",
      privacy: "Privacy Policy",
      dmca: "DMCA Takedown",
      contact: "Contact",
      disclaimer: "Independent SoundCloud link inspection & audio helper.",
    },
    errors: {
      invalidUrl: "Please enter a valid SoundCloud track, playlist, or set URL.",
      notFound: "The requested track or playlist was not found. It may be deleted or private.",
      privateResource: "This item is private or inaccessible. Please verify the URL.",
      geoBlocked: "This audio is unavailable in your region due to territorial licensing restrictions.",
      rateLimited: "Too many requests. Please wait a few seconds before trying again.",
      captchaFailed: "Security verification failed. Please try again.",
      serverError: "An unexpected error occurred while communicating with SoundCloud. Please try again.",
    },
  },
  es: {
    meta: {
      title: "SoundFetch - Descargador de SoundCloud y Asistente de Audio",
      description: "Herramienta rápida y legal para SoundCloud. Descarga pistas permitidas, música Creative Commons y listas de reproducción sin almacenar archivos.",
      keywords: "descargar soundcloud, soundcloud a mp3, descargar playlist soundcloud, canciones creative commons",
    },
    nav: {
      home: "Inicio",
      playlist: "Listas de reproducción",
      iphone: "iPhone / iOS",
      android: "Android",
      mac: "Mac",
      podcast: "Podcasts",
      mix: "Sesiones DJ",
      faq: "Preguntas",
    },
    hero: {
      badge: "Herramienta Rápida y Legal de SoundCloud",
      title: "Descargador de SoundCloud y",
      titleHighlight: "Asistente de Audio",
      subtitle: "Pega cualquier enlace de SoundCloud. Comprueba licencias, pistas Creative Commons y descarga audio permitido al instante sin almacenar archivos.",
      inputPlaceholder: "Pega aquí el enlace de SoundCloud...",
      buttonPaste: "Pegar",
      buttonClear: "Limpiar",
      buttonSubmit: "Analizar Enlace",
      buttonProcessing: "Analizando...",
      complianceNote: "Respeto a los artistas: Solo permitimos descargas autorizadas expresamente o con licencia Creative Commons.",
    },
    status: {
      analyzing: "Resolviendo enlace con la API de SoundCloud...",
      fetchingMetadata: "Obteniendo carátula, duración y artista...",
      verifyingLicense: "Comprobando permisos de descarga y Creative Commons...",
    },
    card: {
      artistLabel: "Artista",
      durationLabel: "Duración",
      licenseLabel: "Licencia",
      downloadPermitted: "Descarga Permitida",
      downloadDisabled: "Descargas desactivadas por el artista",
      downloadMp3: "Descargar Audio Permitido",
      openSoundCloud: "Escuchar en SoundCloud",
      whyDisabled: "El creador no ha habilitado descargas para esta pista. Apoya al artista escuchando en SoundCloud.",
      playlistTracks: "Pistas de la lista",
      downloadAllPermitted: "Descargar Pistas Permitidas (ZIP)",
      permittedOfTotal: "pistas permitidas listas para descargar",
      format: "Calidad Original",
      sizeEstimate: "Transmisión Directa",
    },
    mobileHelper: {
      title: "Cómo copiar el enlace en móvil (Compartir → Copiar Enlace → Pegar)",
      iosTab: "iOS / iPhone",
      androidTab: "Android",
      step1Title: "1. Pulsa Compartir en SoundCloud",
      step1Desc: "Abre SoundCloud, busca la pista o lista y pulsa el icono de compartir.",
      step2Title: "2. Pulsa 'Copiar Enlace'",
      step2Desc: "En el menú de compartir, selecciona 'Copiar Enlace' para guardarlo en el portapapeles.",
      step3Title: "3. Pega y Descarga Aquí",
      step3Desc: "Vuelve aquí, pulsa 'Pegar' y luego 'Analizar Enlace'.",
    },
    howto: {
      title: "Cómo descargar pistas permitidas de SoundCloud",
      subtitle: "3 pasos sencillos para obtener archivos de audio legales en tu dispositivo",
      step1: "1. Copia el enlace de SoundCloud",
      step1Text: "Copia la URL de la pista o lista desde el navegador o la aplicación.",
      step2: "2. Pega e Inspecciona la Licencia",
      step2Text: "Pega el enlace en nuestra casilla. Verificamos la licencia oficial y metadatos.",
      step3: "3. Descarga el Audio Permitido",
      step3Text: "Si el artista habilitó la descarga o es Creative Commons, descárgalo con un solo clic.",
    },
    features: {
      title: "Diseñado para Velocidad, Calidad y Cumplimiento Legal",
      subtitle: "Una herramienta optimizada para creadores, DJs y usuarios móviles",
      f1Title: "Cero Almacenamiento y Privacidad",
      f1Desc: "No guardamos ningún archivo en nuestros servidores. Se transmite directamente a tu dispositivo.",
      f2Title: "Descarga de Listas en ZIP",
      f2Desc: "Descarga todas las canciones permitidas de una lista comprimidas en un archivo ZIP al instante.",
      f3Title: "Rendimiento y Core Web Vitals",
      f3Desc: "Arquitectura Next.js ultra rápida con carga LCP inferior a 2 segundos y soporte PWA.",
      f4Title: "Respeto a los Derechos de Autor",
      f4Desc: "Cumplimiento legal riguroso. Las pistas comerciales protegidas redirigen al reproductor oficial.",
    },
    faq: {
      title: "Preguntas Frecuentes",
      subtitle: "Respuestas a tus dudas sobre descargas de audio y licencias de SoundCloud",
      q1: "¿Es legal descargar música de SoundCloud?",
      a1: "Sí, siempre que sean pistas habilitadas para descarga por el artista o bajo licencia Creative Commons.",
      q2: "¿Por qué algunas pistas dicen 'Descargas desactivadas'?",
      a2: "El artista ha elegido mantener los derechos reservados y no permitir descargas gratuitas.",
      q3: "¿Puedo descargar una lista de reproducción completa?",
      a3: "Sí, analiza la lista y haz clic en 'Descargar Pistas Permitidas (ZIP)' para obtener las pistas autorizadas.",
      q4: "¿Funciona en iPhone y iPad?",
      a4: "Sí, compatible con Safari en iOS para guardar el archivo directamente en la aplicación Archivos.",
      q5: "¿Almacenan archivos de música en sus servidores?",
      a5: "No, el audio se transmite de forma efímera sin guardarse en ningún disco duro.",
    },
    disclaimer: {
      title: "Aviso de SoundCloud",
      text: "SoundFetch es un proyecto independiente y no está asociado ni patrocinado por SoundCloud. No almacenamos música en nuestros servidores.",
    },
    footer: {
      rights: "Todos los derechos reservados.",
      terms: "Términos de Servicio",
      privacy: "Política de Privacidad",
      dmca: "Aviso DMCA",
      contact: "Contacto",
      disclaimer: "Herramienta legal de inspección de enlaces de SoundCloud.",
    },
    errors: {
      invalidUrl: "Por favor, introduce un enlace válido de pista o lista de SoundCloud.",
      notFound: "Pista o lista no encontrada. Puede haber sido eliminada o ser privada.",
      privateResource: "Este contenido es privado o no está disponible.",
      geoBlocked: "Pista no disponible en tu región por restricciones de licencia.",
      rateLimited: "Demasiadas solicitudes. Espera un momento antes de reintentar.",
      captchaFailed: "Verificación de seguridad fallida. Inténtalo de nuevo.",
      serverError: "Error de conexión con SoundCloud. Por favor, reintenta.",
    },
  },
  pt: {
    meta: {
      title: "SoundFetch - Baixar do SoundCloud e Assistente de Áudio Permitido",
      description: "Ferramenta rápida e legal para SoundCloud. Baixe músicas autorizadas, Creative Commons e playlists completas sem armazenar arquivos.",
      keywords: "baixar soundcloud, soundcloud para mp3, baixar playlist soundcloud, musicas creative commons",
    },
    nav: {
      home: "Início",
      playlist: "Playlists",
      iphone: "iPhone / iOS",
      android: "Android",
      mac: "Mac",
      podcast: "Podcasts",
      mix: "Sets de DJ",
      faq: "Perguntas",
    },
    hero: {
      badge: "Rápido e 100% Legal",
      title: "Baixar do SoundCloud &",
      titleHighlight: "Assistente de Áudio",
      subtitle: "Cole links de faixas ou playlists do SoundCloud. Verifique permissões de artistas, baixe músicas Creative Commons e salve áudios permitidos diretamente.",
      inputPlaceholder: "Cole o link do SoundCloud aqui...",
      buttonPaste: "Colar",
      buttonClear: "Limpar",
      buttonSubmit: "Analisar Link",
      buttonProcessing: "Analisando...",
      complianceNote: "Respeito aos artistas: Apenas permitimos downloads de faixas com autorização explícita ou licença Creative Commons.",
    },
    status: {
      analyzing: "Consultando API do SoundCloud...",
      fetchingMetadata: "Obtendo capa, duração e artista...",
      verifyingLicense: "Verificando permissões de download e licenças...",
    },
    card: {
      artistLabel: "Artista",
      durationLabel: "Duração",
      licenseLabel: "Licença",
      downloadPermitted: "Download Permitido",
      downloadDisabled: "Downloads desativados pelo artista",
      downloadMp3: "Baixar Áudio Permitido",
      openSoundCloud: "Ouvir no SoundCloud",
      whyDisabled: "O criador não habilitou downloads para esta faixa. Apoie o artista ouvindo no SoundCloud.",
      playlistTracks: "Faixas da Playlist",
      downloadAllPermitted: "Baixar Permitidas (ZIP)",
      permittedOfTotal: "faixas permitidas para download",
      format: "Qualidade Original",
      sizeEstimate: "Fluxo Direto",
    },
    mobileHelper: {
      title: "Como copiar link no celular (Compartilhar → Copiar Link → Colar)",
      iosTab: "iOS / iPhone",
      androidTab: "Android",
      step1Title: "1. Toque em Compartilhar no SoundCloud",
      step1Desc: "Abra o SoundCloud, selecione a música e toque no ícone de compartilhar.",
      step2Title: "2. Selecione 'Copiar Link'",
      step2Desc: "No menu de compartilhamento, toque em 'Copiar Link' para salvar na área de transferência.",
      step3Title: "3. Cole e Baixe Aqui",
      step3Desc: "Volte para esta página, clique em 'Colar' e depois em 'Analisar Link'.",
    },
    howto: {
      title: "Como baixar músicas permitidas do SoundCloud",
      subtitle: "3 passos simples para ter áudio legal e de alta qualidade no seu dispositivo",
      step1: "1. Copie o link do SoundCloud",
      step1Text: "Copie a URL da faixa ou playlist no navegador ou app do SoundCloud.",
      step2: "2. Cole e Analise",
      step2Text: "Cole o link na caixa acima para verificar a licença oficial e os metadados.",
      step3: "3. Baixe o Áudio Permitido",
      step3Text: "Se o artista permitiu o download ou usou Creative Commons, clique para baixar.",
    },
    features: {
      title: "Desenvolvido para Velocidade, Qualidade e Legalidade",
      subtitle: "O assistente definitivo para ouvintes, DJs e criadores de conteúdo",
      f1Title: "Zero Armazenamento e Total Privacidade",
      f1Desc: "Não guardamos nenhum arquivo em servidores. A transmissão vai direto para seu dispositivo.",
      f2Title: "Download de Playlists em ZIP",
      f2Desc: "Baixe todas as músicas permitidas de uma playlist em um único arquivo compactado.",
      f3Title: "Alta Performance Next.js",
      f3Desc: "Carregamento instantâneo com Core Web Vitals e LCP inferior a 2 segundos.",
      f4Title: "Respeito aos Direitos Autorais",
      f4Desc: "Segurança jurídica total. Músicas comerciais protegidas contam com link para a reprodução oficial.",
    },
    faq: {
      title: "Perguntas Frequentes",
      subtitle: "Tudo o que você precisa saber sobre downloads no SoundCloud",
      q1: "É legal baixar músicas do SoundCloud?",
      a1: "Sim, para faixas onde o próprio artista habilitou o download ou publicou sob Creative Commons.",
      q2: "Por que algumas músicas não podem ser baixadas?",
      a2: "O criador optou por desativar o download gratuito para aquela faixa.",
      q3: "Posso baixar uma playlist inteira?",
      a3: "Sim, analisamos a playlist e oferecemos o download em ZIP de todas as faixas autorizadas.",
      q4: "Funciona no iPhone e Android?",
      a4: "Sim, totalmente compatível com navegadores mobile e app Arquivos do iOS.",
      q5: "Vocês salvam as músicas no servidor?",
      a5: "Não, todo o processamento de áudio é transmitido em tempo real sem armazenamento.",
    },
    disclaimer: {
      title: "Aviso Legal",
      text: "SoundFetch não tem vínculo comercial com o SoundCloud. Não hospedamos arquivos em servidores.",
    },
    footer: {
      rights: "Todos os direitos reservados.",
      terms: "Termos de Uso",
      privacy: "Privacidade",
      dmca: "Aviso DMCA",
      contact: "Contato",
      disclaimer: "Ferramenta de análise e download de áudios autorizados.",
    },
    errors: {
      invalidUrl: "Insira uma URL válida do SoundCloud.",
      notFound: "Faixa ou playlist não encontrada.",
      privateResource: "Conteúdo privado ou indisponível.",
      geoBlocked: "Faixa não disponível no seu país.",
      rateLimited: "Muitas requisições. Aguarde um instante.",
      captchaFailed: "Falha na verificação de segurança.",
      serverError: "Erro ao comunicar com o SoundCloud.",
    },
  },
  ar: {
    meta: {
      title: "SoundFetch - تحميل ساوند كلاود ومساعد الصوت المصرح به",
      description: "أداة سريعة وقانونية لتحميل المقاطع المصرح بها والموسيقى المشاع الإبداعي وقوائم التشغيل من ساوند كلاود.",
      keywords: "تحميل ساوند كلاود, ساوند كلاود الى mp3, تنزيل اغاني ساوند كلاود, تحميل قوائم تشغيل ساوند كلاود",
    },
    nav: {
      home: "الرئيسية",
      playlist: "قوائم التشغيل",
      iphone: "آيفون / iOS",
      android: "أندرويد",
      mac: "ماك",
      podcast: "بودكاست",
      mix: "ميكس دي جي",
      faq: "الأسئلة الشائعة",
    },
    hero: {
      badge: "أداة ساوند كلاود السريعة والقانونية",
      title: "تحميل ساوند كلاود و",
      titleHighlight: "مساعد المقاطع المصرح بها",
      subtitle: "الصق أي رابط لمقطع أو قائمة تشغيل من ساوند كلاود. نقوم بفحص الترخيص وتنزيل المقاطع المسموح بها والمشاع الإبداعي فوراً دون تخزين ملفات.",
      inputPlaceholder: "الصق رابط ساوند كلاود هنا...",
      buttonPaste: "لصق",
      buttonClear: "مسح",
      buttonSubmit: "تحليل الرابط",
      buttonProcessing: "جاري التحليل...",
      complianceNote: "احترام حقوق الفنانين: نتيح فقط تحميل المسارات المصرح بها من قبل الفنان أو الخاضعة لرخصة المشاع الإبداعي.",
    },
    status: {
      analyzing: "جاري فحص الرابط عبر واجهة ساوند كلاود...",
      fetchingMetadata: "جاري جلب تفاصيل الفنان والمدة والغلاف...",
      verifyingLicense: "التحقق من ترخيص التحميل والمشاع الإبداعي...",
    },
    card: {
      artistLabel: "الفنان",
      durationLabel: "المدة",
      licenseLabel: "الترخيص",
      downloadPermitted: "التحميل مصرح به",
      downloadDisabled: "التحميل معطل من قبل الفنان",
      downloadMp3: "تحميل المقطع المصرح به",
      openSoundCloud: "الاستماع على ساوند كلاود",
      whyDisabled: "لم يقم الفنان بتفعيل ميزة التحميل المجاني لهذا المقطع. يرجى دعمه بالاستماع عبر ساوند كلاود.",
      playlistTracks: "مسارات قائمة التشغيل",
      downloadAllPermitted: "تحميل المقاطع المصرح بها (ZIP)",
      permittedOfTotal: "مقاطع متاحة للتحميل الفوري",
      format: "الجودة الأصلية",
      sizeEstimate: "بث مباشر مباشر",
    },
    mobileHelper: {
      title: "كيفية نسخ الرابط من الهاتف (مشاركة ← نسخ الرابط ← لصق)",
      iosTab: "آيفون / iOS",
      androidTab: "أندرويد",
      step1Title: "1. اضغط على مشاركة في ساوند كلاود",
      step1Desc: "افتح تطبيق ساوند كلاود واضغط على أيقونة السهم للمشاركة.",
      step2Title: "2. اضغط على 'نسخ الرابط'",
      step2Desc: "من نافذة المشاركة، اختر 'نسخ الرابط' لحفظه في الحافظة.",
      step3Title: "3. الصق هنا وحمل المقطع",
      step3Desc: "عد إلى هنا واضغط على 'لصق' ثم 'تحليل الرابط'.",
    },
    howto: {
      title: "كيفية تحميل المقاطع المصرح بها من ساوند كلاود",
      subtitle: "3 خطوات سهلة للحصول على ملفات صوتية قانونية وعالية الجودة",
      step1: "1. انسخ رابط ساوند كلاود",
      step1Text: "انسخ رابط المقطع أو قائمة التشغيل من المتصفح أو التطبيق.",
      step2: "2. الصق وافحص الترخيص",
      step2Text: "الصق الرابط في المربع للتحقق من الترخيص الرسمي والبيانات.",
      step3: "3. حمل الملف المصرح به",
      step3Text: "إذا كان الفنان قد سمح بالتحميل، اضغط على زر التحميل المباشر.",
    },
    features: {
      title: "مصمم للسرعة الفائقة والجودة والامتثال القانوني",
      subtitle: "الأداة المثالية للموسيقيين والدي جي وصناع المحتوى",
      f1Title: "بدون تخزين وأمان تام",
      f1Desc: "لا نقوم بتخزين أي ملفات صوتية على خوادمنا نهائياً. يتم التدفق مباشرة لجهازك.",
      f2Title: "تحميل القوائم بصيغة ZIP",
      f2Desc: "تنزيل جميع المقاطع المصرح بها في قائمة التشغيل بملف مضغوط بضغطة زر واحدة.",
      f3Title: "أداء سريع جداً",
      f3Desc: "مبني بأحدث تقنيات Next.js مع سرعة تحميل LCP أقل من ثانيتين ودعم كامل لـ PWA.",
      f4Title: "احترام حقوق الملكية",
      f4Desc: "نلتزم بالقوانين الفكرية ونوجه للمقاطع المحمية للاستماع الرسمي على ساوند كلاود.",
    },
    faq: {
      title: "الأسئلة الشائعة",
      subtitle: "كل ما تحتاج معرفته عن تحميل الصوتيات من ساوند كلاود والتراخيص",
      q1: "هل تحميل المقاطع من ساوند كلاود قانوني؟",
      a1: "نعم، بالنسبة للمقاطع التي أتاح صاحبها التحميل المجاني أو نشرها تحت ترخيص المشاع الإبداعي.",
      q2: "لماذا تظهر بعض المقاطع بأن التحميل معطل؟",
      a2: "لأن الفنان اختار عدم السماح بالتحميل المجاني وحفظ جميع حقوق النشر.",
      q3: "هل يمكنني تنزيل قائمة تشغيل كاملة؟",
      a3: "نعم، سيقوم الموقع بفحص القائمة وتنزيل كافة المقاطع المصرح بها في ملف ZIP واحد.",
      q4: "هل يعمل على الآيفون والآيباد؟",
      a4: "نعم، متوافق بالكامل مع متصفح سفاري لحفظ الملف مباشرة في تطبيق الملفات.",
      q5: "هل تخزنون الملفات في خوادمكم؟",
      a5: "لا، لا يتم تخزين أي ملف على الإطلاق، بل يتدفق الصوت مباشرة إلى جهازك.",
    },
    disclaimer: {
      title: "إخلاء مسؤولية",
      text: "SoundFetch أداة مستقلة تماماً وليست تابعة لشركة ساوند كلاود. نحن لا نستضيف أو نخزن أي ملفات صوتية على خوادمنا.",
    },
    footer: {
      rights: "جميع الحقوق محفوظة.",
      terms: "شروط الاستخدام",
      privacy: "سياسة الخصوصية",
      dmca: "حقوق النشر DMCA",
      contact: "اتصل بنا",
      disclaimer: "أداة مستقلة للتحقق من روابط ساوند كلاود.",
    },
    errors: {
      invalidUrl: "يرجى إدخال رابط ساوند كلاود صالح للمقطع أو قائمة التشغيل.",
      notFound: "المقطع أو القائمة غير موجودة أو محذوفة.",
      privateResource: "هذا المحتوى خاص أو غير مصرح به.",
      geoBlocked: "هذا المقطع غير متاح في بلدك بسبب قيود الترخيص.",
      rateLimited: "طلبات كثيرة جداً. يرجى الانتظار قليلاً.",
      captchaFailed: "فشل التحقق الأمني. يرجى إعادة المحاولة.",
      serverError: "حدث خطأ في الاتصال بساوند كلاود. يرجى المحاولة لاحقاً.",
    },
  },
  ur: {
    meta: {
      title: "SoundFetch - ساؤنڈ کلاؤڈ ڈاؤنلوڈر اور قانونی آڈیو ہیلپر",
      description: "ساؤنڈ کلاؤڈ ٹریکس اور پلے لسٹس ڈاؤنلوڈ کرنے کا تیز اور قانونی ٹول۔ صرف اجازت یافتہ اور کری ایٹو کامنز گانے حاصل کریں۔",
      keywords: "ساؤنڈ کلاؤڈ ڈاؤنلوڈر, ساؤنڈ کلاؤڈ سے ایم پی 3, فری آڈیو ڈاؤنلوڈ",
    },
    nav: {
      home: "ہوم",
      playlist: "پلے لسٹس",
      iphone: "آئی فون / iOS",
      android: "اینڈرائیڈ",
      mac: "میک",
      podcast: "پوڈکاسٹ",
      mix: "ڈی جے مکس",
      faq: "سوالات",
    },
    hero: {
      badge: "تیز اور قانونی ساؤنڈ کلاؤڈ ٹول",
      title: "ساؤنڈ کلاؤڈ ڈاؤنلوڈر اور",
      titleHighlight: "آڈیو ہیلپر",
      subtitle: "ساؤنڈ کلاؤڈ کا کوئی بھی لنک یہاں درج کریں۔ ہم لائسنس کی تصدیق کرتے ہیں اور صرف اجازت یافتہ یا کری ایٹو کامنز آڈیو کو بغیر اسٹوریج کے فوری ڈاؤنلوڈ کرتے ہیں۔",
      inputPlaceholder: "ساؤنڈ کلاؤڈ لنک یہاں پیسٹ کریں...",
      buttonPaste: "پیسٹ کریں",
      buttonClear: "صاف کریں",
      buttonSubmit: "لنک چیک کریں",
      buttonProcessing: "جانچ ہو رہی ہے...",
      complianceNote: "فنکاروں کا احترام: ہم صرف ان ٹریکس کو ڈاؤنلوڈ کرنے کی اجازت دیتے ہیں جن کی فنکار نے باقاعدہ اجازت دی ہو۔",
    },
    status: {
      analyzing: "ساؤنڈ کلاؤڈ سے لنک کی تصدیق کی جا رہی ہے...",
      fetchingMetadata: "فنکار اور ٹریک کی معلومات حاصل کی جا رہی ہیں...",
      verifyingLicense: "ڈاؤنلوڈ لائسنس اور کری ایٹو کامنز کی تصدیق جاری ہے...",
    },
    card: {
      artistLabel: "فنکار",
      durationLabel: "دورانیہ",
      licenseLabel: "لائسنس",
      downloadPermitted: "ڈاؤنلوڈ کی اجازت ہے",
      downloadDisabled: "ڈاؤنلوڈ فنکار کی طرف سے بند ہے",
      downloadMp3: "اجازت یافتہ آڈیو ڈاؤنلوڈ کریں",
      openSoundCloud: "ساؤنڈ کلاؤڈ پر سنیں",
      whyDisabled: "اس ٹریک کے لیے مفت ڈاؤنلوڈ دستیاب نہیں ہے۔ براہ کرم ساؤنڈ کلاؤڈ پر سن کر فنکار کی مدد کریں۔",
      playlistTracks: "پلے لسٹ کے ٹریکس",
      downloadAllPermitted: "اجازت یافتہ ٹریکس ڈاؤنلوڈ کریں (ZIP)",
      permittedOfTotal: "ٹریکس ڈاؤنلوڈ کے لیے دستیاب ہیں",
      format: "اصل کوالٹی",
      sizeEstimate: "براہ راست اسٹریم",
    },
    mobileHelper: {
      title: "موبائل پر لنک کاپی کرنے کا طریقہ (Share ← Copy Link ← Paste)",
      iosTab: "آئی فون / iOS",
      androidTab: "اینڈرائیڈ",
      step1Title: "1. ساؤنڈ کلاؤڈ میں Share دبائیں",
      step1Desc: "ایپ کھولیں اور گانے کے نیچے شیئر کا بٹن دبائیں۔",
      step2Title: "2. 'Copy Link' منتخب کریں",
      step2Desc: "شیئر مینو سے لنک کاپی کریں۔",
      step3Title: "3. یہاں پیسٹ کر کے ڈاؤنلوڈ کریں",
      step3Desc: "واپس آئیں، 'پیسٹ کریں' دبائیں اور گانا حاصل کریں۔",
    },
    howto: {
      title: "اجازت یافتہ ساؤنڈ کلاؤڈ گانے کیسے ڈاؤنلوڈ کریں",
      subtitle: "3 آسان مراحل میں قانونی اور بہترین کوالٹی آڈیو حاصل کریں",
      step1: "1. ساؤنڈ کلاؤڈ لنک کاپی کریں",
      step1Text: "اپنے براؤزر یا ایپ سے گانے کا لنک کاپی کریں۔",
      step2: "2. پیسٹ کریں اور لائسنس دیکھیں",
      step2Text: "لنک یہاں پیسٹ کریں، ہم لائسنس اور معلومات دکھائیں گے۔",
      step3: "3. ڈاؤنلوڈ کریں",
      step3Text: "اگر اجازت ہے تو فوری ڈاؤنلوڈ کے بٹن پر کلک کریں۔",
    },
    features: {
      title: "تیز رفتار، بہترین کوالٹی اور قانونی تحفظ",
      subtitle: "موسیقی کے شوقین افراد اور موبائل صارفین کے لیے بہترین انتخاب",
      f1Title: "صفر اسٹوریج اور مکمل رازداری",
      f1Desc: "ہم اپنے سرورز پر کوئی گانا محفوظ نہیں کرتے۔ فائل براہ راست آپ کے موبائل پر جاتی ہے۔",
      f2Title: "پلے لسٹس ZIP میں حاصل کریں",
      f2Desc: "پوری پلے لسٹ کے تمام اجازت یافتہ گانے ایک ہی کلک میں زپ فائل میں حاصل کریں۔",
      f3Title: "بہترین رفتار",
      f3Desc: "جدید ٹیکنالوجی کے ساتھ 2 سیکنڈ سے بھی کم وقت میں صفحہ کھلتا ہے۔",
      f4Title: "کاپی رائٹ کا احترام",
      f4Desc: "ہم کاپی رائٹ قوانین کا مکمل احترام کرتے ہیں۔",
    },
    faq: {
      title: "عام سوالات",
      subtitle: "ساؤنڈ کلاؤڈ اور لائسنس کے بارے میں ضروری معلومات",
      q1: "کیا ساؤنڈ کلاؤڈ سے گانے ڈاؤنلوڈ کرنا قانونی ہے؟",
      a1: "جی ہاں، ان گانوں کے لیے جن کے فنکار نے باضابطہ مفت ڈاؤنلوڈ کی اجازت دی ہو۔",
      q2: "کچھ گانوں پر ڈاؤنلوڈ بند کیوں ہے؟",
      a2: "کیونکہ فنکار نے اپنے کاپی رائٹ محفوظ رکھے ہیں اور ڈاؤنلوڈ کی اجازت نہیں دی۔",
      q3: "کیا میں پوری پلے لسٹ ڈاؤنلوڈ کر سکتا ہوں؟",
      a3: "جی ہاں، ہماری سائٹ تمام اجازت یافتہ گانوں کو ایک ZIP فائل میں اکٹھا کر کے دیتی ہے۔",
      q4: "کیا یہ آئی فون پر کام کرتا ہے؟",
      a4: "جی ہاں، یہ سفاری براؤزر اور آئی فون فائلز ایپ کے ساتھ بہترین کام کرتا ہے۔",
      q5: "کیا آپ فائلز اپنے پاس محفوظ کرتے ہیں؟",
      a5: "ہرگز نہیں، ہم کوئی بھی فائل اپنے سرور پر محفوظ نہیں رکھتے۔",
    },
    disclaimer: {
      title: "وضاحت",
      text: "SoundFetch ایک آزاد ٹول ہے اور اس کا ساؤنڈ کلاؤڈ کمپنی سے کوئی باضابطہ تعلق نہیں ہے۔",
    },
    footer: {
      rights: "جملہ حقوق محفوظ ہیں۔",
      terms: "شرائط و ضوابط",
      privacy: "رازداری کی پالیسی",
      dmca: "کاپی رائٹ DMCA",
      contact: "رابطہ",
      disclaimer: "ساؤنڈ کلاؤڈ کا غیر جانبدار اور آزاد ہیلپر۔",
    },
    errors: {
      invalidUrl: "براہ کرم درست ساؤنڈ کلاؤڈ لنک درج کریں۔",
      notFound: "ٹریک یا پلے لسٹ نہیں مل سکی۔",
      privateResource: "یہ آئٹم پرائیویٹ ہے۔",
      geoBlocked: "یہ گانا آپ کے ملک میں دستیاب نہیں ہے۔",
      rateLimited: "بہت زیادہ درخواستیں۔ براہ کرم تھوڑا انتظار کریں۔",
      captchaFailed: "سیکیورٹی تصدیق مکمل نہیں ہو سکی۔",
      serverError: "ساؤنڈ کلاؤڈ سے رابطہ نہیں ہو سکا۔",
    },
  },
  hi: {
    meta: {
      title: "SoundFetch - साउंडक्लाउड डाउनलोडर और अनुमति प्राप्त ऑडियो टूल",
      description: "साउंडक्लाउड से अनुमत ट्रैक, क्रिएटिव कॉमन्स संगीत और प्लेलिस्ट डाउनलोड करने का तेज़ और कानूनी टूल।",
      keywords: "साउंडक्लाउड डाउनलोडर, soundcloud to mp3, साउंडक्लाउड गाने डाउनलोड, फ्री ऑडियो टूल",
    },
    nav: {
      home: "होम",
      playlist: "प्लेलिस्ट",
      iphone: "आईफोन / iOS",
      android: "एंड्रॉइड",
      mac: "मैक",
      podcast: "पॉडकास्ट",
      mix: "डीजे मिक्स",
      faq: "सवाल-जवाब",
    },
    hero: {
      badge: "तेज़ और कानूनी साउंडक्लाउड हेल्पर",
      title: "साउंडक्लाउड डाउनलोडर और",
      titleHighlight: "ऑडियो हेल्पर",
      subtitle: "साउंडक्लाउड का कोई भी ट्रैक या प्लेलिस्ट लिंक पेस्ट करें। लाइसेंस जांचें और केवल अनुमति प्राप्त और क्रिएटिव कॉमन्स संगीत बिना किसी सर्वर स्टोरेज के सीधे डाउनलोड करें।",
      inputPlaceholder: "साउंडक्लाउड का लिंक यहाँ पेस्ट करें...",
      buttonPaste: "पेस्ट करें",
      buttonClear: "साफ़ करें",
      buttonSubmit: "लिंक जांचें",
      buttonProcessing: "जांच जारी है...",
      complianceNote: "कलाकारों का सम्मान: हम केवल उन्हीं गानों को डाउनलोड करने की अनुमति देते हैं जिनकी कलाकार ने स्पष्ट छूट दी हो।",
    },
    status: {
      analyzing: "साउंडक्लाउड एपीआई से लिंक जांचा जा रहा है...",
      fetchingMetadata: "कलाकार, कवर और समय की जानकारी ली जा रही है...",
      verifyingLicense: "डाउनलोड अनुमति और क्रिएटिव कॉमन्स की जांच جاری है...",
    },
    card: {
      artistLabel: "कलाकार",
      durationLabel: "अवधि",
      licenseLabel: "लाइसेंस",
      downloadPermitted: "डाउनलोड की अनुमति है",
      downloadDisabled: "कलाकार द्वारा डाउनलोड अक्षम किया गया है",
      downloadMp3: "अनुमत ऑडियो डाउनलोड करें",
      openSoundCloud: "साउंडक्लाउड पर सुनें",
      whyDisabled: "इस ट्रैक के लिए कलाकार ने मुफ्त डाउनलोड की अनुमति नहीं दी है। कृपया साउंडक्लाउड पर सुनकर उनका समर्थन करें।",
      playlistTracks: "प्लेलिस्ट के गाने",
      downloadAllPermitted: "सभी अनुमत गाने डाउनलोड करें (ZIP)",
      permittedOfTotal: "गाने डाउनलोड के लिए उपलब्ध हैं",
      format: "मूल गुणवत्ता",
      sizeEstimate: "सीधा स्ट्रीम",
    },
    mobileHelper: {
      title: "मोबाइल पर लिंक कॉपी करने का तरीका (Share → Copy Link → Paste)",
      iosTab: "आईफोन / iOS",
      androidTab: "एंड्रॉइड",
      step1Title: "1. साउंडक्लाउड में शेयर दबाएं",
      step1Desc: "ऐप खोलें और गाने के नीचे शेयर तीर के निशान पर टैप करें।",
      step2Title: "2. 'Copy Link' पर टैप करें",
      step2Desc: "शेयर मेनू से 'कॉपी लिंक' चुनें।",
      step3Title: "3. यहाँ पेस्ट करें और डाउनलोड करें",
      step3Desc: "यहाँ वापस आकर 'पेस्ट करें' और फिर 'लिंक जांचें' पर टैप करें।",
    },
    howto: {
      title: "साउंडक्लाउड से अनुमत गाने कैसे डाउनलोड करें",
      subtitle: "अपने डिवाइस पर कानूनी ऑडियो प्राप्त करने के 3 आसान चरण",
      step1: "1. साउंडक्लाउड लिंक कॉपी करें",
      step1Text: "ब्राउज़र या ऐप से गाने या प्लेलिस्ट का लिंक कॉपी करें।",
      step2: "2. पेस्ट करें और लाइसेंस जांचें",
      step2Text: "यहाँ लिंक पेस्ट करें, हम आधिकारिक लाइसेंस और विवरण दिखाएंगे।",
      step3: "3. डाउनलोड करें",
      step3Text: "यदि डाउनलोड की अनुमति है तो डाउनलोड बटन पर क्लिक करें।",
    },
    features: {
      title: "गति, गुणवत्ता और कानूनी सुरक्षा के लिए निर्मित",
      subtitle: "संगीत प्रेमियों और मोबाइल उपयोगकर्ताओं के लिए श्रेष्ठ साधन",
      f1Title: "शून्य स्टोरेज और पूर्ण गोपनीयता",
      f1Desc: "हम अपने सर्वर पर कोई ऑडियो स्टोर नहीं करते। ऑडियो सीधे आपके फोन में जाता है।",
      f2Title: "प्लेलिस्ट ZIP डाउनलोड",
      f2Desc: "पूरी प्लेलिस्ट के अनुमत गानों को एक ही क्लिक में ज़िप फ़ाइल के रूप में प्राप्त करें।",
      f3Title: "अल्ट्रा फ़ास्ट परफॉरमेंस",
      f3Desc: "नेक्स्ट.जेएस द्वारा संचालित और 2 सेकंड से कम समय में खुलने वाला इंटरफ़ेस।",
      f4Title: "कॉपीराइट का पूर्ण सम्मान",
      f4Desc: "संरक्षित व्यावसायिक गानों के लिए हम आधिकारिक साउंडक्लाउड प्लेयर पर भेजते हैं।",
    },
    faq: {
      title: "अक्सर पूछे जाने वाले प्रश्न",
      subtitle: "साउंडक्लाउड डाउनलोड और लाइसेंसिंग के बारे में सब कुछ",
      q1: "क्या साउंडक्लाउड से गाने डाउनलोड करना कानूनी है?",
      a1: "हाँ, उन गानों के लिए जिन्हें कलाकार ने मुफ्त डाउनलोड के लिए सक्षम किया है या क्रिएटिव कॉमन्स के तहत जारी किया है।",
      q2: "कुछ गानों पर डाउनलोड क्यों बंद रहता है?",
      a2: "क्योंकि कलाकार ने अपने अधिकार सुरक्षित रखे हैं और मुफ्त डाउनलोड की अनुमति नहीं दी है।",
      q3: "क्या मैं पूरी प्लेलिस्ट डाउनलोड कर सकता हूँ?",
      a3: "हाँ, हमारी साइट प्लेलिस्ट के सभी अनुमत गानों को एक ZIP फाइल में देती है।",
      q4: "क्या यह आईफोन पर काम करता है?",
      a4: "हाँ, यह आईओएस सफारी और फाइल्स ऐप के साथ पूरी तरह अनुकूल है।",
      q5: "क्या आप फाइलें अपने सर्वर पर रखते हैं?",
      a5: "बिल्कुल नहीं, कोई भी फाइल हमारे सर्वर पर जमा नहीं होती।",
    },
    disclaimer: {
      title: "अस्वीकरण",
      text: "SoundFetch एक स्वतंत्र उपकरण है और साउंडक्लाउड से संबद्ध नहीं है।",
    },
    footer: {
      rights: "सर्वाधिकार सुरक्षित।",
      terms: "सेवा की शर्तें",
      privacy: "गोपनीयता नीति",
      dmca: "डीएमसीए",
      contact: "संपर्क",
      disclaimer: "स्वतंत्र साउंडक्लाउड लिंक और ऑडियो हेल्पर।",
    },
    errors: {
      invalidUrl: "कृपया वैध साउंडक्लाउड लिंक दर्ज करें।",
      notFound: "ट्रैक या प्लेलिस्ट नहीं मिली।",
      privateResource: "यह सामग्री निजी है।",
      geoBlocked: "यह गाना आपके क्षेत्र में उपलब्ध नहीं है।",
      rateLimited: "बहुत सारे अनुरोध। कृपया कुछ सेकंड प्रतीक्षा करें।",
      captchaFailed: "सुरक्षा जांच विफल रही।",
      serverError: "साउंडक्लाउड से जुड़ने में त्रुटि।",
    },
  },
  id: {
    meta: {
      title: "SoundFetch - Pengunduh SoundCloud & Pembantu Audio Legal",
      description: "Alat pengunduh SoundCloud cepat dan legal untuk trek yang diizinkan, musik Creative Commons, dan playlist tanpa penyimpanan file.",
      keywords: "download soundcloud, soundcloud to mp3, download lagu soundcloud, unduh playlist soundcloud",
    },
    nav: {
      home: "Beranda",
      playlist: "Playlist",
      iphone: "iPhone / iOS",
      android: "Android",
      mac: "Mac",
      podcast: "Podcast",
      mix: "DJ Mix",
      faq: "Tanya Jawab",
    },
    hero: {
      badge: "Alat Cepat & Legal untuk SoundCloud",
      title: "Pengunduh SoundCloud &",
      titleHighlight: "Pembantu Audio Legal",
      subtitle: "Tempel tautan SoundCloud apa pun. Periksa lisensi artis, unduh musik Creative Commons dan trek yang diizinkan secara langsung tanpa penyimpanan file.",
      inputPlaceholder: "Tempel URL trek atau playlist SoundCloud di sini...",
      buttonPaste: "Tempel",
      buttonClear: "Hapus",
      buttonSubmit: "Analisis Link",
      buttonProcessing: "Menganalisis...",
      complianceNote: "Menghormati kreator: Kami hanya mengaktifkan unduhan untuk trek yang diizinkan oleh pengunggah atau berlisensi Creative Commons.",
    },
    status: {
      analyzing: "Menghubungi API resmi SoundCloud...",
      fetchingMetadata: "Mengambil gambar sampul, durasi, dan artis...",
      verifyingLicense: "Memeriksa izin unduh dan lisensi Creative Commons...",
    },
    card: {
      artistLabel: "Artis",
      durationLabel: "Durasi",
      licenseLabel: "Lisensi",
      downloadPermitted: "Unduhan Diizinkan",
      downloadDisabled: "Unduhan dinonaktifkan oleh artis",
      downloadMp3: "Unduh Audio yang Diizinkan",
      openSoundCloud: "Dengarkan di SoundCloud",
      whyDisabled: "Kreator tidak mengaktifkan unduhan gratis untuk trek ini. Dukung artis dengan mendengarkan langsung di SoundCloud.",
      playlistTracks: "Daftar Trek Playlist",
      downloadAllPermitted: "Unduh Trek yang Diizinkan (ZIP)",
      permittedOfTotal: "trek diizinkan untuk diunduh langsung",
      format: "Kualitas Asli",
      sizeEstimate: "Aliran Langsung",
    },
    mobileHelper: {
      title: "Cara salin link di HP (Bagikan → Salin Tautan → Tempel)",
      iosTab: "iOS / iPhone",
      androidTab: "Android",
      step1Title: "1. Ketuk Bagikan di SoundCloud",
      step1Desc: "Buka aplikasi SoundCloud dan ketuk tombol bagikan pada lagu.",
      step2Title: "2. Pilih 'Salin Tautan'",
      step2Desc: "Dari menu bagikan, pilih 'Salin Tautan' ke papan klip.",
      step3Title: "3. Tempel & Unduh di Sini",
      step3Desc: "Kembali ke halaman ini, klik 'Tempel' lalu 'Analisis Link'.",
    },
    howto: {
      title: "Cara Mengunduh Lagu yang Diizinkan dari SoundCloud",
      subtitle: "3 langkah mudah untuk mendapatkan file audio legal berkualitas tinggi",
      step1: "1. Salin Tautan SoundCloud",
      step1Text: "Salin URL lagu atau playlist dari peramban atau aplikasi.",
      step2: "2. Tempel dan Periksa Lisensi",
      step2Text: "Tempelkan tautan di atas untuk melihat detail lisensi resmi.",
      step3: "3. Unduh Audio yang Diizinkan",
      step3Text: "Jika artis mengizinkan, klik unduh untuk menyimpan file langsung ke perangkat.",
    },
    features: {
      title: "Dirancang untuk Kecepatan, Kualitas, dan Kepatuhan Hukum",
      subtitle: "Alat terbaik untuk pecinta musik, DJ, dan pembuat konten",
      f1Title: "Tanpa Penyimpanan & Privasi Total",
      f1Desc: "Tidak ada file yang disimpan di server kami. Aliran audio langsung dikirim ke perangkat Anda.",
      f2Title: "Unduh Playlist dalam Format ZIP",
      f2Desc: "Unduh semua lagu yang diizinkan dalam sebuah playlist sekaligus dalam format ZIP.",
      f3Title: "Kinerja Cepat Next.js",
      f3Desc: "Waktu muat instan di bawah 2 detik dengan dukungan Core Web Vitals dan PWA.",
      f4Title: "Menghormati Hak Cipta",
      f4Desc: "Lagu komersial yang dilindungi akan dialihkan ke pemutar resmi SoundCloud.",
    },
    faq: {
      title: "Pertanyaan yang Sering Diajukan",
      subtitle: "Semua hal tentang pengunduhan audio dan lisensi SoundCloud",
      q1: "Apakah legal mengunduh musik dari SoundCloud?",
      a1: "Ya, untuk trek yang telah diizinkan oleh artisnya untuk unduhan gratis atau berlisensi Creative Commons.",
      q2: "Mengapa beberapa lagu tidak bisa diunduh?",
      a2: "Artis memilih untuk menonaktifkan unduhan gratis dan mempertahankan seluruh hak cipta.",
      q3: "Bisakah saya mengunduh seluruh playlist?",
      a3: "Bisa, alat kami akan memfilter semua lagu yang diizinkan dan menyediakannya dalam file ZIP.",
      q4: "Apakah berfungsi di iPhone?",
      a4: "Ya, berfungsi sempurna di Safari iOS dan tersimpan langsung ke aplikasi File.",
      q5: "Apakah Anda menyimpan audio di server?",
      a5: "Tidak, kami tidak menyimpan audio apa pun di server kami.",
    },
    disclaimer: {
      title: "Penafian",
      text: "SoundFetch adalah alat independen dan tidak berafiliasi dengan SoundCloud.",
    },
    footer: {
      rights: "Hak cipta dilindungi undang-undang.",
      terms: "Syarat Layanan",
      privacy: "Kebijakan Privasi",
      dmca: "Pemberitahuan DMCA",
      contact: "Kontak",
      disclaimer: "Alat pembantu audio SoundCloud independen.",
    },
    errors: {
      invalidUrl: "Harap masukkan tautan SoundCloud yang valid.",
      notFound: "Trek atau playlist tidak ditemukan.",
      privateResource: "Konten ini bersifat privat.",
      geoBlocked: "Trek ini tidak tersedia di wilayah Anda.",
      rateLimited: "Terlalu banyak permintaan. Silakan tunggu sebentar.",
      captchaFailed: "Verifikasi keamanan gagal.",
      serverError: "Gagal terhubung ke SoundCloud.",
    },
  },
  tr: {
    meta: {
      title: "SoundFetch - SoundCloud İndirici & İzinli Ses Yardımcısı",
      description: "Hızlı ve yasal SoundCloud link yardımcısı. İzin verilen parçaları, Creative Commons müzikleri ve çalma listelerini dosya depolamadan indirin.",
      keywords: "soundcloud indirici, soundcloud mp3 dönüştürücü, soundcloud şarkı indir, soundcloud playlist indir",
    },
    nav: {
      home: "Ana Sayfa",
      playlist: "Çalma Listeleri",
      iphone: "iPhone / iOS",
      android: "Android",
      mac: "Mac",
      podcast: "Podcast'ler",
      mix: "DJ Setleri",
      faq: "SSS",
    },
    hero: {
      badge: "Hızlı & Yasal SoundCloud Aracı",
      title: "SoundCloud İndirici &",
      titleHighlight: "İzinli Ses Yardımcısı",
      subtitle: "Herhangi bir SoundCloud parça veya çalma listesi bağlantısını yapıştırın. Lisansları inceleyin, izin verilen parçaları doğrudan ve güvenle indirin.",
      inputPlaceholder: "SoundCloud bağlantısını buraya yapıştırın...",
      buttonPaste: "Yapıştır",
      buttonClear: "Temizle",
      buttonSubmit: "Bağlantıyı İncele",
      buttonProcessing: "İnceleniyor...",
      complianceNote: "Sanatçılara saygı: Yalnızca yükleyen tarafından izin verilen veya Creative Commons lisanslı parçalar indirilebilir.",
    },
    status: {
      analyzing: "SoundCloud resmi API'si ile inceleniyor...",
      fetchingMetadata: "Kapak resmi, süre ve sanatçı bilgileri alınıyor...",
      verifyingLicense: "İndirme izinleri ve Creative Commons lisansı doğrulanıyor...",
    },
    card: {
      artistLabel: "Sanatçı",
      durationLabel: "Süre",
      licenseLabel: "Lisans",
      downloadPermitted: "İndirmeye İzin Verildi",
      downloadDisabled: "İndirmeler sanatçı tarafından kapatıldı",
      downloadMp3: "İzin Verilen Sesi İndir",
      openSoundCloud: "SoundCloud'da Dinle",
      whyDisabled: "Bu parça için sanatçı ücretsiz indirmeye izin vermemiştir. Lütfen parçayı SoundCloud üzerinden dinleyerek sanatçıyı destekleyin.",
      playlistTracks: "Çalma Listesi Parçaları",
      downloadAllPermitted: "İzin Verilen Parçaları İndir (ZIP)",
      permittedOfTotal: "izin verilen parça indirmeye hazır",
      format: "Orijinal Kalite",
      sizeEstimate: "Doğrudan Akış",
    },
    mobileHelper: {
      title: "Mobilde Bağlantı Nasıl Kopyalanır (Paylaş → Bağlantıyı Kopyala → Yapıştır)",
      iosTab: "iOS / iPhone",
      androidTab: "Android",
      step1Title: "1. SoundCloud'da Paylaş'a Dokunun",
      step1Desc: "SoundCloud uygulamasını açın ve şarkının altındaki paylaş simgesine dokunun.",
      step2Title: "2. 'Bağlantıyı Kopyala'yı Seçin",
      step2Desc: "Açılan menüden 'Bağlantıyı Kopyala' seçeneğini seçin.",
      step3Title: "3. Buraya Yapıştırın ve İndirin",
      step3Desc: "Buraya dönün, 'Yapıştır'a ve ardından 'Bağlantıyı İncele'ye dokunun.",
    },
    howto: {
      title: "İzin Verilen SoundCloud Parçaları Nasıl İndirilir?",
      subtitle: "Cihazınıza yasal ve yüksek kaliteli ses indirmek için 3 kolay adım",
      step1: "1. SoundCloud Bağlantısını Kopyalayın",
      step1Text: "Tarayıcınızdan veya uygulamadan parça veya çalma listesi bağlantısını kopyalayın.",
      step2: "2. Yapıştırın ve Lisansı İnceleyin",
      step2Text: "Bağlantıyı kutuya yapıştırın; lisans durumunu ve şarkı bilgilerini göreceksiniz.",
      step3: "3. İzin Verilen Sesi İndirin",
      step3Text: "Sanatçı izin verdiyse, indirme düğmesine basarak doğrudan cihazınıza kaydedin.",
    },
    features: {
      title: "Hız, Kalite ve Yasal Uyum İçin Tasarlandı",
      subtitle: "Müzikseverler, DJ'ler ve içerik üreticileri için güvenilir araç",
      f1Title: "Depolama Yok & Tam Gizlilik",
      f1Desc: "Sunucularımızda hiçbir ses dosyası tutulmaz. Parçalar doğrudan cihazınıza aktarılır.",
      f2Title: "Çalma Listesini ZIP Olarak İndirin",
      f2Desc: "Çalma listesindeki izin verilen tüm parçaları tek tıklamayla ZIP olarak indirin.",
      f3Title: "Ultra Hızlı Performans",
      f3Desc: "Next.js ile optimize edilmiş, 2 saniyenin altında açılış süresi ve PWA desteği.",
      f4Title: "Telif Haklarına Saygı",
      f4Desc: "Yasalara tam uyum. Korumalı ticari şarkılar için resmi SoundCloud sayfasına yönlendirilirsiniz.",
    },
    faq: {
      title: "Sıkça Sorulan Sorular",
      subtitle: "SoundCloud indirmeleri ve lisansları hakkında merak edilenler",
      q1: "SoundCloud'dan müzik indirmek yasal mı?",
      a1: "Evet; sanatçının indirmeye izin verdiği veya Creative Commons lisansıyla yayımlanan parçaları indirmek tamamen yasaldır.",
      q2: "Neden bazı parçalarda 'İndirmeler kapatıldı' uyarısı var?",
      a2: "Çünkü sanatçı ücretsiz indirmeyi devre dışı bırakmış ve tüm telif haklarını saklı tutmuştur.",
      q3: "Tüm bir çalma listesini indirebilir miyim?",
      a3: "Evet, çalma listesindeki izin verilen tüm parçaları topluca ZIP olarak indirebilirsiniz.",
      q4: "iPhone'da çalışır mı?",
      a4: "Evet, iOS Safari ile tamamen uyumludur ve indirilenler doğrudan Dosyalar uygulamasına kaydedilir.",
      q5: "Ses dosyalarını sunucularınızda saklıyor musunuz?",
      a5: "Hayır, sunucularımızda hiçbir ses dosyası saklanmaz.",
    },
    disclaimer: {
      title: "Yasal Uyarı",
      text: "SoundFetch bağımsız bir araçtır ve SoundCloud ile hiçbir ticari bağı yoktur.",
    },
    footer: {
      rights: "Tüm hakları saklıdır.",
      terms: "Kullanım Koşulları",
      privacy: "Gizlilik Politikası",
      dmca: "DMCA Bildirimi",
      contact: "İletişim",
      disclaimer: "Bağımsız SoundCloud bağlantı ve ses yardımcısı.",
    },
    errors: {
      invalidUrl: "Lütfen geçerli bir SoundCloud bağlantısı girin.",
      notFound: "Parça veya çalma listesi bulunamadı.",
      privateResource: "Bu içerik gizli veya erişilemez.",
      geoBlocked: "Bu parça ülkenizde dinlenemiyor.",
      rateLimited: "Çok fazla istek. Lütfen biraz bekleyin.",
      captchaFailed: "Güvenlik doğrulaması başarısız.",
      serverError: "SoundCloud bağlantısında hata oluştu.",
    },
  },
};

export function getDictionary(locale: string = "en"): TranslationDictionary {
  if (locale in translations) {
    return translations[locale as SupportedLocale];
  }
  return translations.en;
}

