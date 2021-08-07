import axios from 'axios';

const BASE_PATH = 'https://epr.codes';
export default {
  users(route = '/users') {
    return {
      getById: async (uid: string) => {
        let response = await axios.get(`${BASE_PATH}${route}/${uid}`);
        return response.data;
      },
      getAll: async () => {
        let response = await axios.get(`${BASE_PATH}${route}`);
        return response.data;
      },
      getByName: async (username: string) => {
        let response = await axios.get(`${BASE_PATH}/find/${username}`);
        return response.data;
      },
      create: async (
        uid: string,
        email: string,
        username: string,
        country: string,
        afflictions: string[]
      ) => {
        let response = await axios.post(`${BASE_PATH}${route}`, {
          uid,
          username,
          email,
          country,
          afflictions,
        });
        return response.data;
      },
      addToGroup: async (userId: number, groupId: number) => {
        let response = await axios.post(`${BASE_PATH}${route}/addUser`, {
          userId,
          groupId,
        });
        return response.data;
      },

      delete: async (id: number) => {
        let response = await axios.delete(`${BASE_PATH}${route}/${id}`);
        return response.data;
      },

      updateAfflictions: async (id: number, afflictions: string[]) => {
        let response = await axios.patch(`${BASE_PATH}${route}`, {
          id,
          afflictions,
        });
        return response.data;
      },
    };
  },
  groups(route = '/groups') {
    return {
      getPosts: async (id: number) => {
        let response = await axios.get(`${BASE_PATH}${route}/${id}`);
        return response.data;
      },
      getAll: async () => {
        let response = await axios.get(`${BASE_PATH}${route}`);
        return response.data;
      },
      getById: async (groupId: number) => {
        let response = await axios.get(`${BASE_PATH}${route}/${groupId}`);
        return response.data;
      },
      getByName: async (groupName: string) => {
        let response = await axios.get(`${BASE_PATH}${route}/name/${groupName}`);
        return response.data;
      },
      getByTags: async (tagName: string) => {
        let response = await axios.get(`${BASE_PATH}${route}/tag/${tagName}`);
        return response.data;
      },
      create: async (userId: number, name: string, description: string, tags: string[]) => {
        let response = await axios.post(`${BASE_PATH}${route}`, {
          userId,
          group: {
            name,
            description,
            tags,
          },
        });
        return response.data;
      },
      removeUser: async (userId: number, groupId: number) => {
        let response = await axios.post(`${BASE_PATH}${route}/removeUser`, {
          userId,
          groupId,
        });
        return response.data;
      },
      delete: async (id: number) => {
        let response = await axios.delete(`${BASE_PATH}${route}/${id}`);
        return response.data;
      },
    };
  },
  posts(route = '/posts') {
    return {
      getById: async (id: number) => {
        let response = await axios.get(`${BASE_PATH}${route}/${id}`);
        return response.data;
      },
      create: async (userId: number, groupId: number, content: string) => {
        let response = await axios.post(`${BASE_PATH}${route}`, {
          userId,
          groupId,
          post: {
            content,
          },
        });
        return response.data;
      },
      delete: async (id: number) => {
        let response = await axios.delete(`${BASE_PATH}${route}/${id}`);
        return response.data;
      },
    };
  },
  comments(route = '/comments') {
    return {
      getById: async (id: number) => {
        let response = await axios.get(`${BASE_PATH}${route}/${id}`);
        return response.data;
      },
      create: async (userId: number, postId: number, content: string) => {
        let response = await axios.post(`${BASE_PATH}${route}`, {
          userId,
          postId,
          comment: {
            content,
          },
        });
        return response.data;
      },
      delete: async (id: number) => {
        let response = await axios.delete(`${BASE_PATH}${route}/${id}`);
        return response.data;
      },
    };
  },
  files(route = '/files') {
    return {
      // getById: async (id: number) => {
      //     let response = await axios.get(`${BASE_PATH}${route}/${id}`);
      //     return response.data;
      //   },
      //   create: async (userId: number, postId: number, content: string) => {
      //     let response = await axios.post(`${BASE_PATH}${route}`, {
      //       userId,
      //       postId,
      //       comment: {
      //         content,
      //       },
      //     });
      //     return response.data;
      //   },
      //   delete: async (id: number) => {
      //     let response = await axios.delete(`${BASE_PATH}${route}/${id}`);
      //     return response.data;
      //   },
    };
  },
  models() {
    return {
      predict: async (message: string) => {
        let response = await axios.post(
          `https://proyecto-final-isc-ml-server-lyb9a.ondigitalocean.app/predict`,
          { message }
        );
        return response.data;
      },
      // recommend: async () => {
      //   let response = await axios.post(`${process.env.modelUrl}/predict`, { message });
      //   return response.data;
      // },
    };
  },
  predictions(route = '/predictions') {
    return {
      create: async (label: string, group: string) => {
        let response = await axios.post(`${BASE_PATH}${route}`, {
          label,
          group,
        });
        return response.data;
      },
    };
  },
  utils() {
    return {
      getQuoteOfTheDay: async () => {
        let response: any = await axios.get('https://quotes.rest/qod?language=en');
        return {
          quote: response.data.contents.quotes[0].quote,
          author: response.data.contents.quotes[0].author,
        };
      },
    };
  },
};
