(function () {
    "use strict";

    const body = document.body;
    const languageButton = document.querySelector(".language-toggle");
    const themeButton = document.querySelector(".theme-toggle");
    const ukFlag = '<span class="flag-icon" aria-hidden="true"><svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg"><rect width="60" height="40" fill="#012169"/><path d="M0 0h7l53 35v5h-7L0 5zm60 0h-7L0 35v5h7L60 5z" fill="#fff"/><path d="M0 0h3l57 38v2h-3L0 2zm60 0h-3L0 38v2h3L60 2z" fill="#c8102e"/><path d="M24 0h12v40H24zM0 14h60v12H0z" fill="#fff"/><path d="M27 0h6v40h-6zM0 17h60v6H0z" fill="#c8102e"/></svg></span>';
    const spainFlag = '<span class="flag-icon" aria-hidden="true"><svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg"><rect width="60" height="40" fill="#aa151b"/><path d="M0 10h60v20H0z" fill="#f1bf00"/></svg></span>';
    const translations = {
        "Me presento": "About",
        "Obras": "Selected work",
        "Sobre mí": "About me",
        "¿Hablamos?": "Let's talk",
        "ESCRITOR | DISEÑADOR | PERIODISTA": "WRITER | DESIGNER | JOURNALIST",
        "Porque la ficción es la forma más elegante de mentir.": "Because fiction is the most elegant way to lie.",
        "Thriller policíaco.": "Crime thriller.",
        "Thriller psicológico": "Psychological thriller",
        "Relatos.": "Short stories.",
        "Thriller | Terror.": "Thriller | Horror.",
        "Ver más": "Discover more",
        "Thriller policíaco. Acompaña a la inspectora Aura Vega en una historia en dos tiempos, conectados por una trama de asesinatos.": "A crime thriller. Join Inspector Aura Vega in a story unfolding across two timelines, connected by a string of murders.",
        "Policíaco": "Crime",
        "Thriller psicológico. Laia despierta de un coma sin recuerdos. Y sin saber que nadie puede volver a la vida sin consecuencias.": "A psychological thriller. Laia wakes from a coma with no memories, unaware that returning to life always comes at a cost.",
        "Psicológico": "Psychological",
        "Relatos de thriller, humor y terror, conectados por la eterna pregunta y los miedos más humanos.": "Stories of suspense, humour and horror, connected by an age-old question and our most human fears.",
        "Relatos": "Short stories",
        "Thriller | Terror. Fábula de héroes y villanos en un pueblo sepultado por la corrupción, en el que un artista torturado luchará por entender la verdad": "Thriller | Horror. A tale of heroes and villains in a town buried in corruption, where a tormented artist fights to uncover the truth.",
        "Sobre mí": "About me",
        "Escritor, periodista y diseñador gráfico. Me equivoqué de pastilla y sigo en Matrix.": "Writer, journalist and graphic designer. I took the wrong pill and I'm still in the Matrix.",
        "Sobre mi último trabajo": "Read about my latest work",
        "Expertise": "What I do",
        "Comunicación": "Communications",
        "Diseño gráfico": "Graphic design",
        "Redacción": "Writing",
        "Fotografía": "Photography",
        "Experiencia": "Experience",
        "Responsable Gestión Comunicación": "Communications Manager",
        "Desde 2023": "Since 2023",
        "Organización y planificación de comunicaciones 360º. Estrategia e ideas de fidelización de Carrefour (El Club Carrefour).": "Planning and delivery of 360° communications. Strategy and loyalty initiatives for Carrefour's Club Carrefour programme.",
        "Responsable Maquetación": "Editorial Design Manager",
        "Maquetación y diseño editorial de folletos. Diseño de cartelería.": "Editorial layout and design for brochures and promotional materials.",
        "Diseñador gráfico y redactor": "Graphic designer and copywriter",
        "Organización, supervisión y diseño de eventos. Branding. Redacción, traducción y correción de textos.": "Event planning, coordination and design. Branding, copywriting, translation and proofreading.",
        "Responsable diseño gráfico, redactor y fotógrafo": "Graphic design lead, writer and photographer",
        "Diseño web. Branding y cartelería. Cobertura deportiva en el extranjero (Polonia y República Checa). Fotografía corporativa y deportiva.": "Web design, branding and print design. International sports coverage in Poland and the Czech Republic. Corporate and sports photography.",
        "Formación": "Education",
        "Periodismo": "Journalism",
        "Grado en Periodismo. Especialización en Ciencia y Cultura.": "BA in Journalism, specialising in Science and Culture.",
        "Máster en Diseño Gráfico y Multimedia": "MA in Graphic and Multimedia Design",
        "Máster en Diseño Gráfico y Multimedia. Especialización en Diseño editorial.": "MA in Graphic and Multimedia Design, specialising in Editorial Design.",
        "Contacto": "Contact",
        "Si quieres escribirme, no dudes en hacerlo. También puedes mandarme sushi o un poco de chocolate.": "If you'd like to get in touch, don't hesitate. You can also send me sushi or a little chocolate.",
        "Escríbeme": "Get in touch",
        "Correo": "Email",
        "Escríbeme.": "Say hello.",
        "Cambiar a modo claro": "Switch to light mode",
        "Cambiar a modo oscuro": "Switch to dark mode",
        "Cambiar tema": "Switch theme",
        "Preferencias de la web": "Website preferences",
        "Switch to English": "Cambiar a español",
        "Back to Top": "Volver arriba",
        "AFE (Asociación de Futbolistas Españoles)": "AFE (Spanish Footballers' Association)",
        "\"Me ha tenido con el corazón encogido [...] No dejes de leerla.\"": "\"It kept me on the edge of my seat [...] Don't miss it.\"",
        "\"Una de las mejores novelas de terror que he leído de un autor nacional.\"": "\"One of the best horror novels by a Spanish author that I've ever read.\"",
        "\"100% recomendado para fanáticos del suspense.\"": "\"Highly recommended for fans of suspense.\"",
        "\"Ágil, dinámico [...] Una prosa rítmica, ingeniosa y equilibrada.\"": "\"Fast-paced and dynamic [...] Rhythmic, clever and balanced prose.\""
    };

    const originalText = new Map();
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;

    while ((node = walker.nextNode())) {
        if (node.nodeValue.trim()) {
            originalText.set(node, node.nodeValue);
        }
    }

    function translatePage(language) {
        const toEnglish = language === "en";

        originalText.forEach(function (original, textNode) {
            const text = original.trim().replace(/\s+/g, " ");
            const translated = toEnglish ? translations[text] : null;
            const leading = original.match(/^\s*/)[0];
            const trailing = original.match(/\s*$/)[0];
            textNode.nodeValue = leading + (translated || text) + trailing;
        });

        document.documentElement.lang = toEnglish ? "en" : "es";
        const menuToggle = document.querySelector(".mobile-menu-toggle");
        menuToggle.setAttribute("aria-label", toEnglish ? "Menu" : "Menú");
        menuToggle.querySelector("span").textContent = toEnglish ? "Menu" : "Menú";
        const backToTop = document.querySelector(".ss-go-top a");
        backToTop.title = toEnglish ? "Back to Top" : "Volver arriba";
        document.querySelectorAll(".folio-list__proj-link").forEach(function (link) {
            link.title = toEnglish ? "Discover more" : "Ver más";
        });
        updateSliderLabels();
        languageButton.innerHTML = toEnglish ? spainFlag : ukFlag;
        languageButton.setAttribute("aria-label", toEnglish ? "Switch to Spanish" : "Switch to English");
        languageButton.title = toEnglish ? "Switch to Spanish" : "Switch to English";
        document.querySelector(".site-controls").setAttribute(
            "aria-label",
            toEnglish ? "Website preferences" : "Preferencias de la web"
        );
        themeButton.innerHTML = '<span aria-hidden="true">' + (body.classList.contains("theme-dark") ? "☼" : "☾") + "</span>";
        themeButton.setAttribute(
            "aria-label",
            body.classList.contains("theme-dark")
                ? (toEnglish ? "Switch to light mode" : "Cambiar a modo claro")
                : (toEnglish ? "Switch to dark mode" : "Cambiar a modo oscuro")
        );
        themeButton.title = toEnglish ? "Switch theme" : "Cambiar tema";
    }

    let language = "es";
    let theme = "dark";

    function updateSliderLabels() {
        document.querySelectorAll(".swiper-pagination button").forEach(function (button, index) {
            button.setAttribute(
                "aria-label",
                language === "en" ? "Go to slide " + (index + 1) : "Ir a la diapositiva " + (index + 1)
            );
        });
    }

    const pagination = document.querySelector(".swiper-pagination");
    if (pagination) {
        new MutationObserver(updateSliderLabels).observe(pagination, { childList: true, subtree: true });
    }

    try {
        language = localStorage.getItem("portfolio-language") || language;
        theme = localStorage.getItem("portfolio-theme") || theme;
    } catch (error) {
        console.warn("Could not read saved display preferences.", error);
    }

    body.classList.toggle("theme-dark", theme !== "light");
    body.classList.toggle("theme-light", theme === "light");
    translatePage(language);

    languageButton.addEventListener("click", function () {
        language = language === "es" ? "en" : "es";
        translatePage(language);
        try {
            localStorage.setItem("portfolio-language", language);
        } catch (error) {
            console.warn("Could not save the selected language.", error);
        }
    });

    themeButton.addEventListener("click", function () {
        const isLight = body.classList.toggle("theme-light");
        body.classList.toggle("theme-dark", !isLight);
        themeButton.innerHTML = '<span aria-hidden="true">' + (isLight ? "☾" : "☼") + "</span>";
        themeButton.setAttribute(
            "aria-label",
            isLight
                ? (language === "en" ? "Switch to dark mode" : "Cambiar a modo oscuro")
                : (language === "en" ? "Switch to light mode" : "Cambiar a modo claro")
        );
        try {
            localStorage.setItem("portfolio-theme", isLight ? "light" : "dark");
        } catch (error) {
            console.warn("Could not save the selected theme.", error);
        }
    });

    const canvas = document.querySelector(".creative-canvas");
    const context = canvas.getContext("2d");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;

    function resizeCanvas() {
        const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = Math.round(width * pixelRatio);
        canvas.height = Math.round(height * pixelRatio);
        context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    }

    function drawGeometry(time) {
        context.clearRect(0, 0, width, height);
        const columns = Math.max(5, Math.ceil(width / 145));
        const rows = Math.max(7, Math.ceil(height / 130));
        const cellWidth = width / columns;
        const cellHeight = height / rows;
        const accent = getComputedStyle(body).getPropertyValue("--accent-color").trim();
        const points = [];

        for (let row = 0; row <= rows; row += 1) {
            points[row] = [];
            for (let column = 0; column <= columns; column += 1) {
                const phase = time * .00022;
                points[row][column] = {
                    x: column * cellWidth + Math.sin(phase + row * .7 + column * .42) * 16,
                    y: row * cellHeight + Math.cos(phase * .8 + column * .52 + row * .3) * 15
                };
            }
        }

        context.lineWidth = 1;
        context.strokeStyle = accent;
        context.fillStyle = accent;
        for (let row = 0; row < rows; row += 1) {
            for (let column = 0; column < columns; column += 1) {
                const a = points[row][column];
                const b = points[row][column + 1];
                const c = points[row + 1][column];
                const d = points[row + 1][column + 1];
                context.globalAlpha = .12 + ((row + column) % 3) * .025;
                context.beginPath();
                context.moveTo(a.x, a.y);
                context.lineTo(b.x, b.y);
                context.lineTo(d.x, d.y);
                context.lineTo(c.x, c.y);
                context.closePath();
                context.stroke();

                context.globalAlpha = .08 + ((row * 2 + column) % 4) * .025;
                context.beginPath();
                context.arc(a.x, a.y, 1.5, 0, Math.PI * 2);
                context.fill();
            }
        }
        context.globalAlpha = 1;
    }

    resizeCanvas();
    drawGeometry(0);
    window.addEventListener("resize", resizeCanvas, { passive: true });
    if (!reducedMotion) {
        window.requestAnimationFrame(function animate(time) {
            drawGeometry(time);
            window.requestAnimationFrame(animate);
        });
    }
})();
