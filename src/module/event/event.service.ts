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
      favorites: [],
    };
  }

  // TODO: Implement actual favorites logic
  removeFavorite(ud:string, id: string) {
    return {
      message: "Feature not implemented yet"
    };
  }


}
