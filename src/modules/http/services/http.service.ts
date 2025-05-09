import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { ResponseType } from '../http.types';
import { ConfigService } from '@nestjs/config';
import { handleApiError } from '@/shared/utils/helpers';

@Injectable()
export class HttpService {

  private apiClient: AxiosInstance;

  constructor(private readonly config: ConfigService) {
    this.apiClient = axios.create({
    });
  }


  public async getData<T>(endpoint: string, token?: string): Promise<ResponseType<T>> {

    try {


    } catch (error) {

      return handleApiError(error, endpoint, 'GET');

    }

  }

  public async postData<T, D = {}>(endpoint: string, data: D, token?: string): Promise<ResponseType<T>> {

    try {


    } catch (error) {

      return handleApiError(error, endpoint, 'POST');

    }

  }

}