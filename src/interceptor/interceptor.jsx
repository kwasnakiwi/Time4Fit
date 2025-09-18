import { BASE_URL } from '../utils/Endopoints';
import { ENDPOINTS } from '../utils/Endopoints';
import { useNavigate } from 'react-router-dom';

export async function apiFetch(url, options = {}){

  const access = localStorage.getItem('access');

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
    ...(access ? { Authorization: `Bearer ${access}` } : {}),
  }

  try{
    const response = await fetch(url, {
      ...options,
      headers
    });

    if(response.status === 401){
      const refresh = localStorage.getItem('refresh');
      if(refresh){
        const refreshResponse = await fetch(`${BASE_URL}${ENDPOINTS.refresh}`, {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({refresh}),
        });
          
        let data;

        try{
          data = await refreshResponse.json();
        }
        catch{
          data = null;
        }

        if(refreshResponse.ok){
          localStorage.setItem('access', data?.access);

          const retryResponse = await fetch(url, {
            ...options,
            headers: {
              ...headers,
              Authorization: `Bearer ${data?.access}`,
            },
          });
          return retryResponse;
        }
        else{
          localStorage.removeItem('access');
          localStorage.removeItem('refresh');

          window.location.href = '/';
        }
      }
    }
    
    return response;
  }
  catch(err){
    console.error("Fetch error:", err);
    throw err;
  }
}

