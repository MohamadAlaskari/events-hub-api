import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AppConfigService } from '../../common/utils/app-config.service';
import axios from 'axios';
import { TICKETMASTER_BASE_URL } from '../../common/utils/constants/event.constant';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class EventService {
    private readonly apiKey: string;

  constructor(private readonly appConfigService: AppConfigService) {
    this.apiKey = appConfigService.getTicketmasterApiKey();
  }

 


  
  async getEventById(id: string): Promise<any> {
    const params = {
      apikey: this.apiKey,
      id,
    };

       
      
   const response = await axios.get<any>(TICKETMASTER_BASE_URL, { params });

      if (!response.data._embedded?.events) {
        return {
          page: response.data.page,
          events: [],
        };
      }

      return {
        page: response.data.page,
        events: response.data._embedded.events.map((event) => ({
          id: event.id,
          name: event.name,
          type: event.type,
          description: event.description ?? null,
          url: event.url ?? null,
          images: event.images,
          salesStart: event.sales?.public?.startDateTime ?? null,
          salesEnd: event.sales?.public?.endDateTime ?? null,
          startDate: event.dates?.start?.localDate ?? null,
          startTime: event.dates?.start?.localTime ?? null,
          endDate: event.dates?.end?.localDate ?? null,
          timezone: event.dates?.timezone ?? null,
          status: event.dates?.status?.code ?? null,
          //priceRanges: event.priceRanges ?? [],
          minPrice: event.priceRanges && event.priceRanges.length > 0 
            ? event.priceRanges[0].min 
            : null,
          maxPrice: event.priceRanges && event.priceRanges.length > 0 
            ? event.priceRanges[0].max 
            : null,
          currency: event.priceRanges && event.priceRanges.length > 0 
            ? event.priceRanges[0].currency 
            : null,

          segment: event.classifications?.[0]?.segment?.name ?? null,
          genre: event.classifications?.[0]?.genre?.name ?? null,
          subGenre: event.classifications?.[0]?.subGenre?.name ?? null,
          venue: event._embedded?.venues?.[0]?.name ?? null,
          address: event._embedded?.venues?.[0]?.address?.line1 ?? null,
          postalCode: event._embedded?.venues?.[0]?.postalCode ?? null,
          city: event._embedded?.venues?.[0]?.city?.name ?? null,
          country: event._embedded?.venues?.[0]?.country?.name ?? null,
          latitude: event._embedded?.venues?.[0]?.location?.latitude ?? null,
          longitude: event._embedded?.venues?.[0]?.location?.longitude ?? null,
          promoter: event.promoter?.name ?? null,
          attractions:
            event._embedded?.attractions?.map((a) => ({
              name: a.name,
              url: a.url,
              images: a.images,
            })) ?? [],
        })),
      };
  }
  
  
  async getEvents(
    startDate?: string,
    countryCode?: string,
    size?: number,
    page?: number,
  ): Promise<any> {
    try {
      const params = {
        apikey: this.apiKey,
        countryCode: countryCode ?? 'DE',
        startDateTime:
          new Date(startDate ?? new Date()).toISOString().split('.')[0] + 'Z',
        sort: 'date,asc',
        size: (size ?? 10).toString(),
        page: (page ?? 0).toString(),
      };

      console.log('Requesting events with params:', params);

      const response = await axios.get<any>(TICKETMASTER_BASE_URL, { params });

      if (!response.data._embedded?.events) {
        return {
          page: response.data.page,
          events: [],
        };
      }

      return {
        page: response.data.page,
        events: response.data._embedded.events.map((event) => ({
          id: event.id,
          name: event.name,
          type: event.type,
          description: event.description ?? null,
          url: event.url ?? null,
          images: event.images,
          salesStart: event.sales?.public?.startDateTime ?? null,
          salesEnd: event.sales?.public?.endDateTime ?? null,
          startDate: event.dates?.start?.localDate ?? null,
          startTime: event.dates?.start?.localTime ?? null,
          endDate: event.dates?.end?.localDate ?? null,
          timezone: event.dates?.timezone ?? null,
          status: event.dates?.status?.code ?? null,
          //priceRanges: event.priceRanges ?? [],
          minPrice: event.priceRanges && event.priceRanges.length > 0 
            ? event.priceRanges[0].min 
            : null,
          maxPrice: event.priceRanges && event.priceRanges.length > 0 
            ? event.priceRanges[0].max 
            : null,
          currency: event.priceRanges && event.priceRanges.length > 0 
            ? event.priceRanges[0].currency 
            : null,

          segment: event.classifications?.[0]?.segment?.name ?? null,
          genre: event.classifications?.[0]?.genre?.name ?? null,
          subGenre: event.classifications?.[0]?.subGenre?.name ?? null,
          venue: event._embedded?.venues?.[0]?.name ?? null,
          address: event._embedded?.venues?.[0]?.address?.line1 ?? null,
          postalCode: event._embedded?.venues?.[0]?.postalCode ?? null,
          city: event._embedded?.venues?.[0]?.city?.name ?? null,
          country: event._embedded?.venues?.[0]?.country?.name ?? null,
          latitude: event._embedded?.venues?.[0]?.location?.latitude ?? null,
          longitude: event._embedded?.venues?.[0]?.location?.longitude ?? null,
          promoter: event.promoter?.name ?? null,
          attractions:
            event._embedded?.attractions?.map((a) => ({
              name: a.name,
              url: a.url,
              images: a.images,
            })) ?? [],
        })),
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          'Ticketmaster API error:',
          error.response?.data || error.message,
        );
      } else {
        console.error('Unexpected error:', error);
      }
      throw new InternalServerErrorException(
        'Unable to retrieve events.',
      );
    }
  }

  // TODO: Implement actual favorites logic
  addFavorite(ud:string ,id: string) {

  return {
    message: "Feature not implemented yet"
  };
  }


  // TODO: Implement actual favorites logic
  getFavorites(ud:string) {

    return {
      page: { size: 0, totalElements: 0, totalPages: 0, number: 0 },
      favorites: {
  "page": {
    "size": 1,
    "totalElements": 1857,
    "totalPages": 1857,
    "number": 0
  },
  "events": [
    {
      "id": "LvZ18Q5kd4MMhuOZRco6p",
      "name": "STRANDZ Norderstedt Wiesn 2025",
      "type": "event",
      "description": " \nSTRANDZ Norderstedt Wiesn – O’zapft is am Strand! Der See glitzert, die Lichter gehen an, der Beat setzt ein – und du mittendrin! Wir bespielen Zelt, STRANDZ-Innenbereich und Strandterrasse: nah am Wasser, nah an der Ekstase.\n\nProgramm \n\nHolsteiner Lausbuam – Norddeutsche Wiesn-Power Herzhaft, handfest, hoch die Maß: Die Lausbuam liefern den Mix aus zünftigen Klassikern, Oberkrainer-Vibes und Mitsing-Partyhits. Publikumsnähe &amp; Stimmungsgarantie – perfekt fürs After-Work-Anstoßen.\nSilberklang (AT) – Original Alpen-Party aus Österreich Alpen-Schmäh trifft Partyfieber: Von „Ein Prosit“ bis Ohrwurm-Medleys – energiereiche Liveshow, viel Interaktion, beste Laune. Authentisch, mitreißend, festivalreif.\n\nDein Fahrplan \nFr. 19.09.2025 - 17:00–22:00 — Holsteiner Lausbuam (Live) + DJ · After-Work-Wiesn \nSa. 20.09.2025 - 15:00–22:00 — Silberklang (Live) + DJ · länger, lauter, legendär \nSo. 21.09.2025 - 11:00–18:00 — Frühschoppen mit Silberklang (Live) + DJ · entspannt &amp; bayrisch am See, EINTRITT FREI!\n\nGastro \nFrisch gezapfte Maß, Weinschorle &amp; alles was man braucht sowie alkoholfreies. \nHaxe, Leberkäs, Brezn &amp; vegetarische Optionen.\n\nTickets &amp; Einlass \nReines Eintrittsticket – keine Tischreservierung. Tische &amp; Sitzplätze: first come, first served. - Sonntag mit Sitzplatz \nEinlass ab Veranstaltungsbeginn (kein früherer Einlass). Allwetter: Zelt + Indoor, Strandfeeling garantiert.\n\nAnreise \nParken auf den Parkplätzen des Stadtparks (begrenzte Kapazität). ÖPNV/Fahrrad empfohlen.\nSichere dir deinen Eintritt – wenn’s heißt: „O’zapft is am Strand!“ ",
      "url": "https://www.universe.com/events/strandz-norderstedt-wiesn-2025-tickets-J03GL9?ref=ticketmaster",
      "images": [
        {
          "ratio": "16_9",
          "url": "https://s1.ticketm.net/dam/a/035/54da2611-420d-4ab5-85dd-ea9db3083035_TABLET_LANDSCAPE_LARGE_16_9.jpg",
          "width": 2048,
          "height": 1152,
          "fallback": false,
          "attribution": "Strandz Oktoberfest 2025"
        },
        {
          "ratio": "3_2",
          "url": "https://images.universe.com/7104e8eb-d166-440a-9fac-c83cff05dbdf/-/format/jpeg/-/scale_crop/640x427/center/-/progressive/yes/-/inline/yes/",
          "width": 640,
          "height": 427,
          "fallback": false
        },
        {
          "ratio": "3_2",
          "url": "https://images.universe.com/7104e8eb-d166-440a-9fac-c83cff05dbdf/-/format/jpeg/-/scale_crop/305x203/center/-/progressive/yes/-/inline/yes/",
          "width": 305,
          "height": 203,
          "fallback": false
        },
        {
          "ratio": "4_3",
          "url": "https://images.universe.com/7104e8eb-d166-440a-9fac-c83cff05dbdf/-/format/jpeg/-/scale_crop/305x225/center/-/progressive/yes/-/inline/yes/",
          "width": 305,
          "height": 225,
          "fallback": false
        },
        {
          "ratio": "16_9",
          "url": "https://s1.ticketm.net/dam/a/035/54da2611-420d-4ab5-85dd-ea9db3083035_RETINA_LANDSCAPE_16_9.jpg",
          "width": 1136,
          "height": 639,
          "fallback": false,
          "attribution": "Strandz Oktoberfest 2025"
        },
        {
          "ratio": "16_9",
          "url": "https://s1.ticketm.net/dam/a/035/54da2611-420d-4ab5-85dd-ea9db3083035_RECOMENDATION_16_9.jpg",
          "width": 100,
          "height": 56,
          "fallback": false,
          "attribution": "Strandz Oktoberfest 2025"
        },
        {
          "ratio": "16_9",
          "url": "https://s1.ticketm.net/dam/a/035/54da2611-420d-4ab5-85dd-ea9db3083035_RETINA_PORTRAIT_16_9.jpg",
          "width": 640,
          "height": 360,
          "fallback": false,
          "attribution": "Strandz Oktoberfest 2025"
        },
        {
          "ratio": "3_2",
          "url": "https://images.universe.com/7104e8eb-d166-440a-9fac-c83cff05dbdf/-/format/jpeg/-/scale_crop/1024x683/center/-/progressive/yes/-/inline/yes/",
          "width": 1024,
          "height": 683,
          "fallback": false
        },
        {
          "ratio": "16_9",
          "url": "https://s1.ticketm.net/dam/a/035/54da2611-420d-4ab5-85dd-ea9db3083035_EVENT_DETAIL_PAGE_16_9.jpg",
          "width": 205,
          "height": 115,
          "fallback": false,
          "attribution": "Strandz Oktoberfest 2025"
        },
        {
          "ratio": "16_9",
          "url": "https://images.universe.com/7104e8eb-d166-440a-9fac-c83cff05dbdf/-/format/jpeg/-/scale_crop/1024x576/center/-/progressive/yes/-/inline/yes/",
          "width": 1024,
          "height": 576,
          "fallback": false
        }
      ],
      "salesStart": "2025-08-29T10:39:19Z",
      "salesEnd": "2025-09-21T16:00:00Z",
      "startDate": "2025-09-19",
      "startTime": "17:00:00",
      "endDate": null,
      "timezone": "Europe/Berlin",
      "status": "onsale",
      "minPrice": null,
      "maxPrice": null,
      "currency": null,
      "segment": "Miscellaneous",
      "genre": "Food & Drink",
      "subGenre": "Food & Drink",
      "venue": "STRANDZ Norderstedt",
      "address": "Am Kulturwerk 1",
      "postalCode": "22844",
      "city": "Norderstedt",
      "country": "Germany",
      "latitude": "53.74395",
      "longitude": "10.03399",
      "promoter": null,
      "attractions": [
        {
          "name": "STRANDZ Norderstedt",
          "url": "https://www.ticketmaster.com/strandz-norderstedt-tickets/artist/3913794",
          "images": [
            {
              "ratio": "3_2",
              "url": "https://s1.ticketm.net/dam/a/035/54da2611-420d-4ab5-85dd-ea9db3083035_RETINA_PORTRAIT_3_2.jpg",
              "width": 640,
              "height": 427,
              "fallback": false,
              "attribution": "Strandz Oktoberfest 2025"
            },
            {
              "ratio": "16_9",
              "url": "https://s1.ticketm.net/dam/a/035/54da2611-420d-4ab5-85dd-ea9db3083035_TABLET_LANDSCAPE_LARGE_16_9.jpg",
              "width": 2048,
              "height": 1152,
              "fallback": false,
              "attribution": "Strandz Oktoberfest 2025"
            },
            {
              "ratio": "16_9",
              "url": "https://s1.ticketm.net/dam/a/035/54da2611-420d-4ab5-85dd-ea9db3083035_RETINA_LANDSCAPE_16_9.jpg",
              "width": 1136,
              "height": 639,
              "fallback": false,
              "attribution": "Strandz Oktoberfest 2025"
            },
            {
              "ratio": "16_9",
              "url": "https://s1.ticketm.net/dam/a/035/54da2611-420d-4ab5-85dd-ea9db3083035_RECOMENDATION_16_9.jpg",
              "width": 100,
              "height": 56,
              "fallback": false,
              "attribution": "Strandz Oktoberfest 2025"
            },
            {
              "ratio": "16_9",
              "url": "https://s1.ticketm.net/dam/a/035/54da2611-420d-4ab5-85dd-ea9db3083035_TABLET_LANDSCAPE_16_9.jpg",
              "width": 1024,
              "height": 576,
              "fallback": false,
              "attribution": "Strandz Oktoberfest 2025"
            },
            {
              "ratio": "16_9",
              "url": "https://s1.ticketm.net/dam/a/035/54da2611-420d-4ab5-85dd-ea9db3083035_RETINA_PORTRAIT_16_9.jpg",
              "width": 640,
              "height": 360,
              "fallback": false,
              "attribution": "Strandz Oktoberfest 2025"
            },
            {
              "ratio": "3_2",
              "url": "https://s1.ticketm.net/dam/a/035/54da2611-420d-4ab5-85dd-ea9db3083035_ARTIST_PAGE_3_2.jpg",
              "width": 305,
              "height": 203,
              "fallback": false,
              "attribution": "Strandz Oktoberfest 2025"
            },
            {
              "ratio": "3_2",
              "url": "https://s1.ticketm.net/dam/a/035/54da2611-420d-4ab5-85dd-ea9db3083035_TABLET_LANDSCAPE_3_2.jpg",
              "width": 1024,
              "height": 683,
              "fallback": false,
              "attribution": "Strandz Oktoberfest 2025"
            },
            {
              "ratio": "16_9",
              "url": "https://s1.ticketm.net/dam/a/035/54da2611-420d-4ab5-85dd-ea9db3083035_EVENT_DETAIL_PAGE_16_9.jpg",
              "width": 205,
              "height": 115,
              "fallback": false,
              "attribution": "Strandz Oktoberfest 2025"
            },
            {
              "ratio": "4_3",
              "url": "https://s1.ticketm.net/dam/a/035/54da2611-420d-4ab5-85dd-ea9db3083035_CUSTOM.jpg",
              "width": 305,
              "height": 225,
              "fallback": false,
              "attribution": "Strandz Oktoberfest 2025"
            }
          ]
        }
      ]
    }
  ]
},
    };
  }

  // TODO: Implement actual favorites logic
  removeFavorite(ud:string, id: string) {
    return {
      message: "Feature not implemented yet"
    };
  }


}
