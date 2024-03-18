import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';

@Injectable()
export class VitalsService {
  constructor(private readonly httpService: HttpService) {}

  async getSonarMetrics(): Promise<AxiosResponse<string[]>> {
    const headers = {
      headers: {
        Authorization: '',
      },
    };
    const x = await this.httpService.axiosRef.get(
      'https://sonarcloud.io/api/measures/component?metricKeys=ncloc%2Ccode_smells%2Ccomplexity&component=refactorproject-ingenieria-software_202402-cali-back-montevideo',
      headers,
    );

    console.log('>>>>>>>>>>>>>>', x.data?.component?.measures);
    return x;
  }
}
