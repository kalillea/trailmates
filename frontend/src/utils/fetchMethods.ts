const baseUserURI = "http://localhost:3001/";

export const get = async (path: string): Promise<any> => {
  const response = await fetch(baseUserURI + path);
  return response.json();
};

export const put = async (path: string, body: {}): Promise<any> => {
  const response = await fetch(baseUserURI + path, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return response.json();
};

export const post = async (path: string, body: {}): Promise<any> => {
  const response = await fetch(baseUserURI + path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  return response.json();
};

export const del = async (path: string): Promise<any> => {
  const response = await fetch(baseUserURI + path, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  return response.json();
};