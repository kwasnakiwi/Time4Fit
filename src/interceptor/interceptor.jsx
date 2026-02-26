import { BASE_URL, ENDPOINTS } from "../utils/Endopoints";

export async function apiFetch(url, options = {}) {
  const access = localStorage.getItem("access");

  const isFormData = options.body instanceof FormData;

  const headers = {
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...(options.headers || {}),
    ...(access ? { Authorization: `Bearer ${access}` } : {}),
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (response.status === 401) {
      const refresh = localStorage.getItem("refresh");

      if (refresh) {
        const refreshResponse = await fetch(`${BASE_URL}${ENDPOINTS.refresh}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refresh }),
        });

        let data = null;
        try {
          data = await refreshResponse.json();
        } catch {}

        if (refreshResponse.ok) {
          localStorage.setItem("access", data?.access);

          const retryHeaders = {
            ...(isFormData ? {} : { "Content-Type": "application/json" }),
            ...(options.headers || {}),
            Authorization: `Bearer ${data?.access}`,
          };

          return fetch(url, {
            ...options,
            headers: retryHeaders,
          });
        } else {
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");
          window.location.href = "/";
        }
      }
    }

    return response;
  } catch (err) {
    console.error("Fetch error:", err);
    throw err;
  }
}
