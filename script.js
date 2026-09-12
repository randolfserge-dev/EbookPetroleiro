/**
 * IMERSÃO NA SONDA — VOLUME I: SISTEMA DE ROTAÇÃO
 * Arquitetura de Interatividade e Simulação Técnica (Vanilla JS)
 * Autor da obra: Sergio Ramón Gay Lozada
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. BARRA DE PROGRESSO DE LEITURA & HEADER SCROLLED
     ========================================================================== */
  const progressBar = document.getElementById('readingProgress');
  const mainHeader = document.getElementById('mainHeader');

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
      const progressPercent = (window.scrollY / totalHeight) * 100;
      progressBar.style.width = `${progressPercent}%`;
    }

    if (window.scrollY > 40) {
      mainHeader.classList.add('scrolled');
    } else {
      mainHeader.classList.remove('scrolled');
    }
  }, { passive: true });

  /* ==========================================================================
     2. MENU MOBILE RESPONSIVO
     ========================================================================== */
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mainNav = document.getElementById('mainNav');

  if (mobileMenuBtn && mainNav) {
    const closeMobileMenu = () => {
      mainNav.classList.remove('open');
      mobileMenuBtn.classList.remove('active');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };

    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = mainNav.classList.toggle('open');
      mobileMenuBtn.classList.toggle('active', isOpen);
      mobileMenuBtn.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Fechar menu mobile ao clicar em qualquer link (inclusive o botão de compra interno)
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });

    // Fechar ao clicar fora
    document.addEventListener('click', (e) => {
      if (mainNav.classList.contains('open') && !mainNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        closeMobileMenu();
      }
    });
  }

  /* ==========================================================================
     3. SCROLL REVEAL SUAVE (INTERSECTION OBSERVER)
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal-item');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

    /* ==========================================================================
      4. HERO VIDEO SCROLL-SCRUBBING (CINEMATIC SCROLL) - OTIMIZADO
      ========================================================================== */
  const heroScrollWrapper = document.getElementById('heroScrollWrapper');
  const heroVideo = document.getElementById('heroVideo');

  if (heroScrollWrapper && heroVideo) {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const frameCount = 240;
    const frameImages = [];
    const frameContext = heroVideo.getContext('2d');
    let loadedFrameCount = 0;
    let targetFrame = 0;
    let drawnFrame = -1;
    let frameDrawScheduled = false;

    const drawFrame = () => {
      frameDrawScheduled = false;
      if (!frameImages[targetFrame] || drawnFrame === targetFrame) return;

      frameContext.drawImage(frameImages[targetFrame], 0, 0, heroVideo.width, heroVideo.height);
      drawnFrame = targetFrame;
    };

    const scheduleFrameDraw = () => {
      if (frameDrawScheduled) return;
      frameDrawScheduled = true;
      requestAnimationFrame(drawFrame);
    };

    const calculateScrollProgress = () => {
      const rect = heroScrollWrapper.getBoundingClientRect();
      const scrollableDistance = heroScrollWrapper.offsetHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, -rect.top / scrollableDistance));
      targetFrame = Math.round(progress * (frameCount - 1));
      scheduleFrameDraw();
    };

    for (let frameIndex = 0; frameIndex < frameCount; frameIndex += 1) {
      const frameImage = new Image();
      frameImage.decoding = 'async';
      frameImage.src = `assets/hero-frames-hq/frame-${String(frameIndex + 1).padStart(3, '0')}.webp`;
      frameImage.addEventListener('load', () => {
        loadedFrameCount += 1;
        if (frameIndex === targetFrame || loadedFrameCount === frameCount) calculateScrollProgress();
      });
      frameImages.push(frameImage);
    }

    if (!prefersReducedMotion) {
      window.addEventListener('scroll', calculateScrollProgress, { passive: true });
      window.addEventListener('resize', calculateScrollProgress, { passive: true });
    }
  }

  /* ==========================================================================
     5. DADOS ESTRUTURADOS DOS 10 CAPÍTULOS / MÓDULOS
     ========================================================================== */
  const chaptersData = [
    {
      num: '01',
      kicker: 'MECÂNICA DE SUPERFÍCIE // BLOCO 01',
      title: 'MESA ROTATIVA',
      desc: 'Análise profunda da cinemática de transmissão de torque através de eixo Cardan, acoplamentos reforçados, lubrificação de carcaça e alinhamento axial milimétrico com o poço.',
      foco: 'Inspeção rigorosa do Master Bushing, folgas de pinos de trava e buchas bipartidas.',
      risco: 'Mitigação de desgaste prematuro no acoplamento e neutralização de vibrações de superfície.'
    },
    {
      num: '02',
      kicker: 'TRANSMISSÃO PRIMÁRIA // BLOCO 01',
      title: 'KELLY & BUCHAS DE ENCAIXE',
      desc: 'Geometrias quadrada e hexagonal, dinâmica do Kelly Bushing de roletes, limites mecânicos de torque e a função primordial das válvulas de segurança Upper e Lower Kelly Cock.',
      foco: 'Manobras de conexão simples, preservação de roscas e inspeção de roletes de contato.',
      risco: 'Vantagens operacionais e limites em operações críticas de limpeza e fresagem em Workover.'
    },
    {
      num: '03',
      kicker: 'ALTA EFICIÊNCIA // BLOCO 01',
      title: 'TOP DRIVE',
      desc: 'O ápice da tecnologia de rotação: acionamento direto no topo da coluna. Detalhamento do Pipe Handler, elevador hidráulico remoto, IBOP de cabine e trilho de reação Torque Track.',
      foco: 'Perfuração ininterrupta por stands triplos (28.5m) e back-reaming com circulação plena.',
      risco: 'Corte de até 66% no tempo de manobra de conexões e blindagem contra prisão de coluna diferencial.'
    },
    {
      num: '04',
      kicker: 'SUSTENTAÇÃO & FLUIDOS // BLOCO 01',
      title: 'SWIVEL (CABEÇA DE INJEÇÃO)',
      desc: 'Componente híbrido de alta responsabilidade: suspende centenas de toneladas de coluna em rotação enquanto injeta lama sob pressões contínuas superiores a 5.000 PSI.',
      foco: 'Inspeção periódica de gaxetas de vedação, conjunto Washpipe e rolamentos axiais de carga.',
      risco: 'Protocolos rigorosos de LOTO e alívio seguro de pressão em linhas de circulação pesada.'
    },
    {
      num: '05',
      kicker: 'MECÂNICA ESTRUTURAL // BLOCO 02',
      title: 'COLUNA DE PERFURAÇÃO',
      desc: 'Dimensionamento de tensões combinadas, limites de flambagem e fadiga cíclica de conexões API. Função da transição com Heavy Weight (HWDP) e transmissão de WOB com comandos.',
      foco: 'Controle de torque make-up de aperto segundo especificações API e testes não destrutivos.',
      risco: 'Aplicação de Hardbanding adequado para proteger a coluna e o revestimento contra desgaste mútuo.'
    },
    {
      num: '06',
      kicker: 'MECÂNICA DE CORTE // BLOCO 02',
      title: 'BROCAS DE PERFURAÇÃO',
      desc: 'Princípios fundamentais de avanço litológico: ação de cisalhamento das pastilhas de diamante policristalino (PDC) vs. compressão e britagem das brocas tricônicas dentadas.',
      foco: 'Classificação sistemática dos 8 fatores de desgaste da matriz IADC Dull Grading.',
      risco: 'Equilíbrio de torque reativo para eliminação do fenômeno de Stick-Slip e quebra prematura.'
    },
    {
      num: '07',
      kicker: 'POTÊNCIA HIDRÁULICA // BLOCO 02',
      title: 'MOTOR DE FUNDO (PDM)',
      desc: 'Motores de deslocamento positivo acionados por fluxo de fluido via princípio Moineau. Configuração de estágios de potência, relação de lobos e cotovelo regulável (Bent Housing).',
      foco: 'Transição suave entre modos Sliding (direcional) e Rotary (perfuração rotativa plana).',
      risco: 'Prevenção de estolamento hidráulico e monitoramento da temperatura do estator elastomérico.'
    },
    {
      num: '08',
      kicker: 'CINEMÁTICA INTEGRADA // BLOCO 03',
      title: 'SISTEMA INTEGRADO',
      desc: 'A visão integrada da coluna como uma imensa mola torcional de quilômetros de comprimento. Propagação de ondas de torque, dinâmica de atrito e controle de vórtice (whirl).',
      foco: 'Sintonia fina entre vazão de bombeamento, RPM de superfície e peso sobre a broca.',
      risco: 'Leitura rápida de oscilações anômalas no tacômetro e torquímetro da cabine do sondador.'
    },
    {
      num: '09',
      kicker: 'CASOS REAIS DE CAMPO // BLOCO 03',
      title: 'CAMPO REAL: ESTUDOS DE CASO',
      desc: 'Situações operacionais críticas vivenciadas pelo autor: desprendimento de ferramentas, falha de eixo de rotação durante circulação pesada e recuperação de poços em colapso.',
      foco: 'Protocolos de resposta imediata no piso da sonda antes de mobilizar frentes caras de pescaria.',
      risco: 'Análise de causa raiz e institucionalização de barreiras operacionais preventivas.'
    },
    {
      num: '10',
      kicker: 'GESTÃO & COMANDO // BLOCO 03',
      title: 'O PAPEL DO LÍDER DE SONDA',
      desc: 'A engenharia é inútil sem liderança de campo assertiva. Estruturação de DDS com impacto prático, comunicação clara no piso da sonda e autoridade de parada (Stop Work Authority).',
      foco: 'Eliminação de acidentes com ferramentas de alta inércia, guinchos e chaves flutuantes.',
      risco: 'Condução de equipes de alta performance com disciplina técnica, produtividade e zero acidentes.'
    }
  ];

  /* ==========================================================================
     6. ACCORDION DOS 10 CAPÍTULOS (ESTRITAMENTE 1 ABERTO POR VEZ)
     ========================================================================== */
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach(item => {
    const headerBtn = item.querySelector('.accordion-header');
    const content = item.querySelector('.accordion-content');

    headerBtn.addEventListener('click', () => {
      const isAlreadyOpen = item.classList.contains('active');

      // Fecha todos os itens
      accordionItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        const otherBtn = otherItem.querySelector('.accordion-header');
        const otherContent = otherItem.querySelector('.accordion-content');
        if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        if (otherContent) otherContent.hidden = true;
      });

      // Se não estava aberto, abre o clicado
      if (!isAlreadyOpen) {
        item.classList.add('active');
        headerBtn.setAttribute('aria-expanded', 'true');
        content.hidden = false;
      }
    });

    // Suporte ao teclado (Enter e Espaço já funcionam por padrão em <button>, garantimos acessibilidade)
    headerBtn.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        headerBtn.click();
      }
    });
  });

  // Abrir o Módulo 01 por padrão para o visitante ver a estrutura
  if (accordionItems[0]) {
    accordionItems[0].classList.add('active');
    const firstBtn = accordionItems[0].querySelector('.accordion-header');
    const firstContent = accordionItems[0].querySelector('.accordion-content');
    if (firstBtn) firstBtn.setAttribute('aria-expanded', 'true');
    if (firstContent) firstContent.hidden = false;
  }

  /* ==========================================================================
     7. CARROSSEL SINCRONIZADO COM SUPORTE A TECLADO E DOTS NUMERADOS
     ========================================================================== */
  const carouselTrack = document.getElementById('carouselTrack');
  const carouselDots = document.getElementById('carouselDots');
  const carouselPrev = document.getElementById('carouselPrev');
  const carouselNext = document.getElementById('carouselNext');
  const carouselContainer = document.getElementById('carouselContainer');
  const accordionContainer = document.getElementById('accordionContainer');
  const btnShowAccordion = document.getElementById('btnShowAccordion');
  const btnShowCarousel = document.getElementById('btnShowCarousel');

  let currentSlideIndex = 0;

  // Gerar os slides dinamicamente
  if (carouselTrack && carouselDots) {
    chaptersData.forEach((ch, idx) => {
      // Slide HTML
      const slide = document.createElement('div');
      slide.className = `carousel-slide ${idx === 0 ? 'active' : ''}`;
      slide.id = `slide-${idx}`;
      slide.setAttribute('role', 'tabpanel');
      slide.setAttribute('aria-labelledby', `dot-${idx}`);

      slide.innerHTML = `
        <div class="slide-grid">
          <div class="slide-main-col">
            <div class="slide-meta-badge">
              <span class="slide-chap-num">MÓDULO ${ch.num}</span>
              <span class="slide-block-kicker">${ch.kicker}</span>
            </div>
            <h3 class="slide-title">${ch.title}</h3>
            <p class="slide-desc">${ch.desc}</p>
            <button type="button" class="btn btn-secondary btn-sm sync-acc-btn" data-chapter="${idx + 1}">
              <span>VER NO CATÁLOGO EXPANSÍVEL ↓</span>
            </button>
          </div>
          <div class="slide-specs-col">
            <div class="slide-specs-panel">
              <div class="slide-spec-row">
                <span class="slide-spec-key">FOCO OPERACIONAL & CAMPO</span>
                <span class="slide-spec-value">${ch.foco}</span>
              </div>
              <div class="slide-spec-row">
                <span class="slide-spec-key">CONTROLE DE RISCO & NPT</span>
                <span class="slide-spec-value">${ch.risco}</span>
              </div>
            </div>
          </div>
        </div>
      `;
      carouselTrack.appendChild(slide);

      // Dot HTML
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = `carousel-dot ${idx === 0 ? 'active' : ''}`;
      dot.id = `dot-${idx}`;
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-selected', idx === 0 ? 'true' : 'false');
      dot.setAttribute('aria-controls', `slide-${idx}`);
      dot.textContent = ch.num;
      dot.title = `Ir para o Módulo ${ch.num}: ${ch.title}`;

      dot.addEventListener('click', () => {
        goToSlide(idx);
      });

      carouselDots.appendChild(dot);
    });

    // Botão de sincronização no slide que abre o accordion correspondente
    carouselTrack.querySelectorAll('.sync-acc-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const chapNum = e.currentTarget.getAttribute('data-chapter');
        // Alterna para visualização de accordion
        btnShowAccordion.click();
        const targetAcc = document.querySelector(`.accordion-item[data-chapter="${chapNum}"]`);
        if (targetAcc) {
          const header = targetAcc.querySelector('.accordion-header');
          if (header) {
            header.click();
            targetAcc.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
      });
    });
  }

  const goToSlide = (newIndex) => {
    const slides = carouselTrack.querySelectorAll('.carousel-slide');
    const dots = carouselDots.querySelectorAll('.carousel-dot');

    if (newIndex < 0) {
      newIndex = slides.length - 1;
    } else if (newIndex >= slides.length) {
      newIndex = 0;
    }

    slides.forEach((s, i) => {
      s.classList.toggle('active', i === newIndex);
    });

    dots.forEach((d, i) => {
      const isActive = i === newIndex;
      d.classList.toggle('active', isActive);
      d.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    currentSlideIndex = newIndex;
  };

  if (carouselPrev) {
    carouselPrev.addEventListener('click', () => {
      goToSlide(currentSlideIndex - 1);
    });
  }

  if (carouselNext) {
    carouselNext.addEventListener('click', () => {
      goToSlide(currentSlideIndex + 1);
    });
  }

  // Suporte à navegação pelas setas do teclado (ArrowLeft e ArrowRight)
  document.addEventListener('keydown', (e) => {
    if (!carouselContainer.classList.contains('hidden')) {
      if (e.key === 'ArrowLeft') {
        goToSlide(currentSlideIndex - 1);
      } else if (e.key === 'ArrowRight') {
        goToSlide(currentSlideIndex + 1);
      }
    }
  });

  // Suporte a gesto de arrastar (swipe touch) no carrossel em celulares
  const carouselViewport = document.getElementById('carouselViewport');
  if (carouselViewport) {
    let swipeStartX = 0;
    let swipeEndX = 0;

    carouselViewport.addEventListener('touchstart', (e) => {
      swipeStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carouselViewport.addEventListener('touchend', (e) => {
      swipeEndX = e.changedTouches[0].screenX;
      const diffX = swipeStartX - swipeEndX;
      if (Math.abs(diffX) > 40) {
        if (diffX > 0) {
          goToSlide(currentSlideIndex + 1); // Arrastou para a esquerda -> próximo
        } else {
          goToSlide(currentSlideIndex - 1); // Arrastou para a direita -> anterior
        }
      }
    }, { passive: true });
  }

  // Alternância de modo de visualização (Accordion vs Carrossel)
  if (btnShowAccordion && btnShowCarousel) {
    btnShowAccordion.addEventListener('click', () => {
      btnShowAccordion.classList.add('active');
      btnShowCarousel.classList.remove('active');
      accordionContainer.classList.remove('hidden');
      carouselContainer.classList.add('hidden');
    });

    btnShowCarousel.addEventListener('click', () => {
      btnShowCarousel.classList.add('active');
      btnShowAccordion.classList.remove('active');
      carouselContainer.classList.remove('hidden');
      accordionContainer.classList.add('hidden');
    });
  }

  /* ==========================================================================
     8. SIMULADOR: LABORATÓRIO DE EFICIÊNCIA DA SONDA
     ========================================================================== */
  // Seletores dos elementos do simulador
  const btnModeOnshore = document.getElementById('btnModeOnshore');
  const btnModeOffshore = document.getElementById('btnModeOffshore');

  const sliderDrillHours = document.getElementById('sliderDrillHours');
  const sliderWellDepth = document.getElementById('sliderWellDepth');
  const sliderConnTime = document.getElementById('sliderConnTime');
  const sliderDowntime = document.getElementById('sliderDowntime');

  const valDrillHours = document.getElementById('valDrillHours');
  const valWellDepth = document.getElementById('valWellDepth');
  const valConnTime = document.getElementById('valConnTime');
  const valDowntime = document.getElementById('valDowntime');

  // Outputs da Telemetria
  const kellyConnCount = document.getElementById('kellyConnCount');
  const kellyConnDuration = document.getElementById('kellyConnDuration');
  const tdConnCount = document.getElementById('tdConnCount');
  const tdConnDuration = document.getElementById('tdConnDuration');
  const timeSavedPerShift = document.getElementById('timeSavedPerShift');

  const trippingTimeEst = document.getElementById('trippingTimeEst');
  const standsCountLabel = document.getElementById('standsCountLabel');
  const depthGaugeNumber = document.getElementById('depthGaugeNumber');
  const depthProgressBar = document.getElementById('depthProgressBar');

  const nptAlertCard = document.getElementById('nptAlertCard');
  const nptPercentVal = document.getElementById('nptPercentVal');
  const nptBadgeState = document.getElementById('nptBadgeState');
  const downtimeCostVal = document.getElementById('downtimeCostVal');
  const downtimeCostNote = document.getElementById('downtimeCostNote');
  const nptGaugeFill = document.getElementById('nptGaugeFill');
  const simStatusPill = document.getElementById('simStatusPill');

  // Estado operacional padrão
  let currentEnvironment = 'onshore'; // 'onshore' ou 'offshore'

  // Taxas médias de referência horária em Reais
  const RATES = {
    onshore: 6250,   // ~ R$ 150.000 / dia
    offshore: 75000  // ~ R$ 1.800.000 / dia (sonda flutuante + spread)
  };

  // Atualizar visual de preenchimento do slider track
  const updateSliderTrackFill = (slider) => {
    const min = parseFloat(slider.min);
    const max = parseFloat(slider.max);
    const val = parseFloat(slider.value);
    const percentage = ((val - min) / (max - min)) * 100;
    slider.style.setProperty('--slider-fill', `${percentage}%`);
  };

  // Motor de cálculo do simulador
  const recalculateSimulator = () => {
    const drillHours = parseFloat(sliderDrillHours.value);
    const depth = parseFloat(sliderWellDepth.value);
    const connTimeMin = parseFloat(sliderConnTime.value);
    const downtimeHours = parseFloat(sliderDowntime.value);

    // Atualiza os labels dos sliders
    valDrillHours.textContent = `${drillHours.toFixed(1)} h`;
    valWellDepth.textContent = `${depth.toLocaleString('pt-BR')} m`;
    valConnTime.textContent = `${connTimeMin.toFixed(1)} min`;
    valDowntime.textContent = `${downtimeHours.toFixed(1)} h`;

    // Atualiza o visual dos tracks
    [sliderDrillHours, sliderWellDepth, sliderConnTime, sliderDowntime].forEach(updateSliderTrackFill);

    /* -------------------------------------------------------------
       A) Kelly vs Top Drive (Conexões no Turno)
       ------------------------------------------------------------- */
    // Taxa de penetração média estimada (ROP): ~22 metros/hora de rotação efetiva
    const avgRop = 22;
    const metersDrilled = drillHours * avgRop;

    // Sistema Kelly perfura junta a junta (~9.5m cada tubo individual)
    const kellyConns = Math.max(1, Math.round(metersDrilled / 9.5));
    const kellyTotalMinutes = kellyConns * connTimeMin;
    const kellyH = Math.floor(kellyTotalMinutes / 60);
    const kellyM = Math.round(kellyTotalMinutes % 60);

    // Top Drive perfura em stands triplos (~28.5m cada stand)
    const tdConns = Math.max(1, Math.round(metersDrilled / 28.5));
    const tdTotalMinutes = tdConns * connTimeMin;
    const tdH = Math.floor(tdTotalMinutes / 60);
    const tdM = Math.round(tdTotalMinutes % 60);

    // Economia de tempo
    const savedMinutes = Math.max(0, Math.round(kellyTotalMinutes - tdTotalMinutes));
    const savedConns = Math.max(0, kellyConns - tdConns);

    kellyConnCount.textContent = `${kellyConns} conexões`;
    kellyConnDuration.textContent = `Total gasto: ${kellyH}h ${kellyM.toString().padStart(2, '0')}min`;

    tdConnCount.textContent = `${tdConns} conexões`;
    tdConnDuration.textContent = `Total gasto: ${tdH}h ${tdM.toString().padStart(2, '0')}min`;

    timeSavedPerShift.textContent = `+ ${savedMinutes} minutos economizados (${savedConns} conexões a menos)`;

    /* -------------------------------------------------------------
       B) Manobra Completa de Coluna (Tripping Time)
       ------------------------------------------------------------- */
    const totalStandsInWell = Math.round(depth / 28.5);
    const tripTotalHours = (totalStandsInWell * connTimeMin) / 60;

    trippingTimeEst.textContent = `${tripTotalHours.toFixed(1)} horas`;
    standsCountLabel.textContent = `Baseado em ${totalStandsInWell} stands a ${connTimeMin.toFixed(1)} min/stand`;
    depthGaugeNumber.textContent = `${depth.toLocaleString('pt-BR')} m`;

    const depthPercent = Math.min(100, (depth / 6000) * 100);
    depthProgressBar.style.width = `${depthPercent}%`;

    /* -------------------------------------------------------------
       C) NPT (% de Tempo Não Produtivo) e Custo Financeiro
       ------------------------------------------------------------- */
    const shiftTotalHours = 12; // Turno padrão da sonda
    const nptPercent = Math.min(100, (downtimeHours / shiftTotalHours) * 100);
    nptPercentVal.textContent = `${nptPercent.toFixed(1)}%`;

    // Custo das paradas no turno
    const hourlyRate = RATES[currentEnvironment];
    const downtimeCost = downtimeHours * hourlyRate;
    downtimeCostVal.textContent = `R$ ${Math.round(downtimeCost).toLocaleString('pt-BR')}`;
    downtimeCostNote.textContent = `perdidos no turno (${currentEnvironment.toUpperCase()})`;

    // Gauge do NPT
    nptGaugeFill.style.width = `${Math.min(100, nptPercent * 2.5)}%`;

    // Estados e Cores de Alerta
    nptAlertCard.classList.remove('status-safe', 'status-warn', 'status-crit');

    if (nptPercent < 8) {
      nptAlertCard.classList.add('status-safe');
      nptBadgeState.textContent = 'OPERAÇÃO EFICIENTE';
      simStatusPill.textContent = 'STATUS: EFICIÊNCIA MÁXIMA';
      simStatusPill.style.color = 'var(--status-safe)';
      simStatusPill.style.backgroundColor = 'var(--status-safe-bg)';
    } else if (nptPercent <= 18) {
      nptAlertCard.classList.add('status-warn');
      nptBadgeState.textContent = 'ATENÇÃO OPERACIONAL';
      simStatusPill.textContent = 'STATUS: NPT MODERADO';
      simStatusPill.style.color = 'var(--status-warn)';
      simStatusPill.style.backgroundColor = 'var(--status-warn-bg)';
    } else {
      nptAlertCard.classList.add('status-crit');
      nptBadgeState.textContent = 'RISCO CRÍTICO DE CUSTO';
      simStatusPill.textContent = 'STATUS: INVESTIGAÇÃO DE CAUSA RAIZ';
      simStatusPill.style.color = 'var(--status-crit)';
      simStatusPill.style.backgroundColor = 'var(--status-crit-bg)';
    }
  };

  // Eventos de Sliders
  [sliderDrillHours, sliderWellDepth, sliderConnTime, sliderDowntime].forEach(slider => {
    slider.addEventListener('input', recalculateSimulator);
  });

  // Eventos de Toggle Onshore / Offshore
  if (btnModeOnshore && btnModeOffshore) {
    btnModeOnshore.addEventListener('click', () => {
      currentEnvironment = 'onshore';
      btnModeOnshore.classList.add('active');
      btnModeOnshore.setAttribute('aria-checked', 'true');
      btnModeOffshore.classList.remove('active');
      btnModeOffshore.setAttribute('aria-checked', 'false');
      recalculateSimulator();
    });

    btnModeOffshore.addEventListener('click', () => {
      currentEnvironment = 'offshore';
      btnModeOffshore.classList.add('active');
      btnModeOffshore.setAttribute('aria-checked', 'true');
      btnModeOnshore.classList.remove('active');
      btnModeOnshore.setAttribute('aria-checked', 'false');
      recalculateSimulator();
    });
  }

  // Execução inicial do simulador
  recalculateSimulator();

  /* ==========================================================================
     9. VOLTAR AO TOPO SUAVE
     ========================================================================== */
  const btnBackToTop = document.getElementById('btnBackToTop');
  if (btnBackToTop) {
    btnBackToTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

});