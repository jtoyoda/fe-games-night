export const bggService = {
  getAutoComplete,
};

export interface IOption {
  value?: number,
  label: string,
}

function getAutoComplete(search: string): Promise<IOption> {
  const requestOptions: RequestInit = {
    method: 'GET',
    headers: {
      'Origin': window.location.origin.toString(),
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    mode: 'cors',
  };

  return fetch(`${process.env.REACT_APP_API_URL}/api/v1/bgg/search?q=${search}`, requestOptions)
    .then((response: Response) => {
      return response.text().then(text => {
        return text && JSON.parse(text)['items'].map(item => {
            return {
              'value': item['objectid'],
              'label': `${item['name']} (${item['yearpublished']})`,
            }
          },
        );
      })
    })
}
