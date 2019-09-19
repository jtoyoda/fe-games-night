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

  return fetch(`https://cors-anywhere.herokuapp.com/https://boardgamegeek.com/search/boardgame?q=${search}&showcount=20`, requestOptions)
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
