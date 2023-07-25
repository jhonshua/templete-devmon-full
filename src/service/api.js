import axios from 'axios';
import { get_api_url } from '../utility/url';

export const CREATE = 'CREATE';
export const FIND = 'FIND';
export const GET = 'GET';
export const UPDATE = 'UPDATE';

const sUrl = get_api_url();

export async function apiCall(operation, model, payload = {}, params = {}) {
  const { id, queries, limit, skip } = params || {};

  switch (operation) {
    case CREATE:
      return await axios.post(`${sUrl}/${model}`, payload);
    case FIND:
      return await axios.get(
        `${sUrl}/${model}?${queries ? queries + '&' : ''}${
          limit ? '$limit=' + limit : ''
        }&$skip=${skip}`
      );
    case GET:
      return await axios.get(`${sUrl}/${model}/${id}${queries || ''}`);
    case UPDATE:
      return await axios.patch(`${sUrl}/${model}/${id}`, payload);
    default:
      return null;
  }
}
