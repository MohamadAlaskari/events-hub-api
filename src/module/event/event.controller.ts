import { Controller, Get, Post, Body, Patch, Param, Delete, Query,Request, UseGuards } from '@nestjs/common';
import { EventService } from './event.service';
import { GetEventsDto } from './dto/get-events.dto';
import { ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';


@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}



  @Get("events")
  getEventsByLocation(@Query() query: GetEventsDto) {
    
    return this.eventService.getEvents(
      query.startDate,
      query.countryCode,
      query.size,
      query.page,);
  }

 
  @Get(':id')
  getEventById(@Param('id') id: string) {
    return this.eventService.getEventById(id);
  }


  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post("favorite/:id")
  addFavorite(@Request() req, @Param('id') id: string) {
    return this.eventService.addFavorite(req.user.ud, id);
  }


@Get("test")
test() {
  return "test";
}

  //@ApiBearerAuth()
  //@UseGuards(JwtAuthGuard)
  @Get("fa")
  getFavorites() {
    return {
      page: { size: 2, totalElements: 2, totalPages: 0, number: 0 },    
      "favorites": [
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
    };
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete("favorite/:id")
  removeFavorite(@Request() req, @Param('id') id: string) {
    return this.eventService.removeFavorite(req.user.ud, id);
  }
 
}
