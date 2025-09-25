import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AppConfigService } from '../../common/utils/app-config.service';
import axios from 'axios';
import { TICKETMASTER_BASE_URL } from '../../common/utils/constants/event.constant';


@Injectable()
export class EventService {
    private readonly apiKey: string;

  constructor(private readonly appConfigService: AppConfigService) {
    this.apiKey = appConfigService.getTicketmasterApiKey();
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

      const response = await axios.get<any>(`${TICKETMASTER_BASE_URL}events.json`, { params });

      if (!response.data._embedded?.events) {
        return {
          page: response.data.page,
          events: [],
        };
      }
      
      return {
        page: response.data.page,
        events: response.data._embedded.events.map(
          (event) => this.mapEvent(event),
        ),
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

   async getEventById(id: string): Promise<any> {
    const params = {
      apikey: this.apiKey,

    };
      
   const response = await axios.get<any>(`${TICKETMASTER_BASE_URL}events/${id}.json`, { params });
   
      if (!response.data) {
        return {
          event: {},
        };
      }

      return this.mapEvent(response.data);
      
      
  }
  
async getEventsByIds(eventIds: string[]): Promise<any> {
    try {
      const ids = eventIds.join(',');
      
      const response = await axios.get<any>(`${TICKETMASTER_BASE_URL}events.json`, 
        {params: { id: ids, apikey: this.apiKey }
      });
        
      if (!response.data._embedded?.events) return [];
      
      return {
        page: response.data.page,
        events:response.data._embedded.events.map((event) => this.mapEvent(event))
      }

    } catch (error) {
      console.error('Error fetching events by IDs:', error);
      throw new InternalServerErrorException('Unable to retrieve events by IDs.');
    }

  }


  private mapEvent(event: any) {
  return {
    id: event.id,
    name: event.name,
    type: event.type,
    description: event.description ?? event.info ?? event.pleaseNote ?? null,
    url: event.url ?? null,
    images: event.images,
    salesStart: event.sales?.public?.startDateTime ?? null,
    salesEnd: event.sales?.public?.endDateTime ?? null,
    startDate: event.dates?.start?.localDate ?? null,
    startTime: event.dates?.start?.localTime ?? null,
    endDate: event.dates?.end?.localDate ?? null,
    timezone: event.dates?.timezone ?? null,
    status: event.dates?.status?.code ?? null,
    minPrice: event.priceRanges?.[0]?.min ?? null,
    maxPrice: event.priceRanges?.[0]?.max ?? null,
    currency: event.priceRanges?.[0]?.currency ?? null,
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
    attractions: event._embedded?.attractions?.map((a) => ({
      name: a.name,
      url: a.url,
      images: a.images,
    })) ?? [],
  };
}

}



