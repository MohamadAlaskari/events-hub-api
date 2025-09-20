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

        const response = await axios.get<any>(TICKETMASTER_BASE_URL, {
        params,
      });
      
      const events = (response.data as any[]) ?? ([] as any[]);

      return events;
  }
  
  
  
   async getEvents(
     startDate?: string,      
     countryCode?: string,
        size?: number,
        page?: number,
    ): Promise<any[]> {
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

          
            const response = await axios.get<any>(TICKETMASTER_BASE_URL, {
                params,
            });
            let events = response.data?? [];

            return events;
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


}
