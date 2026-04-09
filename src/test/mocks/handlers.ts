/**
 * MSW (Mock Service Worker) handlers
 * Mock das requisições à API para testes
 */

import { http, HttpResponse } from 'msw';

const API_BASE_URL = 'https://x8ki-letl-twmt.n7.xano.io/api:0ZLogqvx';

export const handlers = [
  // Mock da busca de unidades
  http.get(`${API_BASE_URL}/search`, ({ request }) => {
    const url = new URL(request.url);
    const query = url.searchParams.get('q');

    if (!query || query.trim() === '') {
      return HttpResponse.json(
        { message: 'Termo de busca não pode estar vazio' },
        { status: 400 }
      );
    }

    // Simula busca sem resultados
    if (query === 'naoexiste') {
      return HttpResponse.json({
        query: query,
        found: false,
        interpretation: {
          group: { slug: 'outros', name: 'Outros' },
          intent: { slug: 'geral', name: 'Geral' },
          targets: [],
        },
        units: [],
      });
    }

    // Resposta padrão com resultados
    return HttpResponse.json({
      query: query,
      found: true,
      interpretation: {
        group: { slug: 'saude_mulher', name: 'Saúde da Mulher' },
        intent: { slug: 'preventivo_rastreamento', name: 'Preventivo e Rastreamento' },
        targets: [
          {
            target_type: 'specialty',
            official_name: 'Ginecologia',
            weight: 0.93,
          },
          {
            target_type: 'procedure',
            official_name: 'Coleta Citopatológica',
            weight: 0.91,
          },
        ],
      },
      units: [
        {
          id: 2,
          cnes: '0003859',
          name: 'HOSPITAL GERAL ROBERTO SANTOS',
          unit_type_name: 'HOSPITAL GERAL',
          district: 'Pituba',
          match_reason: 'Matched specialty: Ginecologia',
        },
        {
          id: 3,
          cnes: '0003860',
          name: 'HOSPITAL DA MULHER',
          unit_type_name: 'HOSPITAL ESPECIALIZADO',
          district: 'Caminho das Árvores',
          match_reason: 'Matched procedure: Coleta Citopatológica',
        },
      ],
    });
  }),

  // Mock do detalhe da unidade
  http.get(`${API_BASE_URL}/units/:id`, ({ params }) => {
    const { id } = params;
    const unitId = parseInt(id as string, 10);

    if (isNaN(unitId) || unitId <= 0) {
      return HttpResponse.json(
        { message: 'ID da unidade inválido' },
        { status: 400 }
      );
    }

    if (unitId === 999) {
      return HttpResponse.json(
        { found: false },
        { status: 404 }
      );
    }

    return HttpResponse.json({
      found: true,
      unit: {
        id: unitId,
        cnes: '0003859',
        name: 'HOSPITAL GERAL ROBERTO SANTOS',
        legal_name: 'SECRETARIA DE SAUDE DO ESTADO DA BAHIA',
        unit_type_code: '05',
        unit_type_name: 'HOSPITAL GERAL',
        city_ibge_code: '292740',
        city_name: 'SALVADOR',
        state: 'BA',
        district: 'Pituba',
        street: 'Av. Octávio Mangabeira',
        number: '1234',
        zip_code: '41810000',
        phone: '7132021234',
        email: 'contato@hgrs.ba.gov.br',
        latitude: -12.9999,
        longitude: -38.4444,
        attends_sus: true,
        is_active: true,
        source_competence: 'CNES/MS - 2024',
      },
      specialties: [
        { name: 'Clínica Médica', code: '' },
        { name: 'Ginecologia', code: '' },
        { name: 'Pediatria', code: '' },
      ],
      services: [
        { name: 'Atendimento Hospitalar', code: '' },
        { name: 'Diagnóstico por Imagem', code: '' },
        { name: 'Laboratório', code: '' },
      ],
      procedures: [
        { name: 'Radiografia', code: '' },
        { name: 'Ultrassonografia', code: '' },
        { name: 'Coleta Citopatológica', code: '' },
      ],
    });
  }),
];