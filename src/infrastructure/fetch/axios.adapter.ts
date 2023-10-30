import axios from 'axios';
import { FetchRepository } from '../../domain/repositories/fetch.repository';
import { FetchConfig } from '../../domain/interfaces/fetch.interface';

export class AxiosAdapter implements FetchRepository {
  execute(queryConfig: FetchConfig) {
    if (!queryConfig.url) {
      return;
    }
    axios({ method: queryConfig.type, url: queryConfig.url })
      .then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }
}
