

export default class HttpClient {
  url = 'https://json-server-rs.herokuapp.com';

  getData = async (address) => {
    const res = await fetch(`${this.url}/${address}`);
    if (!res.ok) {
      throw new Error(`Error: server error ${res.status}`)
    }
    const json = await res.json();
    return json;
  };

  createData = async (address, data) => {
    const response = await fetch(`${this.url}/${address}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      throw new Error(`Error: server error ${response.status}`)
    }

    const result = await response.json();
    return result;
  }

  modifyData = async (address, data) => {
    // const withoutId = Object.fromEntries(Object.entries(data).filter(el => el[0] !== 'id'));
    const response = await fetch(`${this.url}/${address}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      throw new Error(`Error: server error ${response.status}`)
    }

    const result = await response.json();
    return result;
  }

  deleteData = async (address) => {
    const response = await fetch(`${this.url}/${address}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    });
    if (!response.ok) {
      throw new Error(`Error: server error ${response.status}`)
    }

    const result = await response.json();
    return result;
  }
}
