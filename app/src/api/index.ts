import axios from 'axios';

const BASE_PATH = process.env.NODE_ENV === 'production' ? process.env.prodUrl : process.env.devUrl;
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
      create: async (uid: string, email: string, username: string, country: string) => {
        let response = await axios.post(`${BASE_PATH}${route}`, {
          uid,
          username,
          email,
          country,
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
        let response = await axios.get(`${BASE_PATH}/${groupId}`);
        return response.data;
      },
      create: async (userId: number, name: string, description: string) => {
        let response = await axios.post(`${BASE_PATH}${route}`, {
          userId,
          group: {
            name,
            description,
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
};