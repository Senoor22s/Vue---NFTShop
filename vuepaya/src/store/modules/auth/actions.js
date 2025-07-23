const API_ENDPOINT = 'https://cloud.appwrite.io/v1';
const PROJECT_ID = '68809a0300162782b84f';
const API_KEY ='standard_4de5c337e0dab1043ebaf82a8f9da8ba94bc4a858eed6f98c134e7349514586ef70e626be29bf44c1e34e7c714beed0b7577955b32fa9230991887d7f667c326df2c8768b714a1f610ca4e77cd2dc5ad13e6e221675a38b0349208cc1ad3e1cae86e0bb850759b6bc950562d1bf56955a57b162d7610fafd98e6f4ae3b4ba88f';

export default {
  async signup(context, payload) {
    try {
      const userRes = await fetch(`${API_ENDPOINT}/account`, {
        method: 'POST',
        headers: {
          'X-Appwrite-Project': PROJECT_ID,
          'X-Appwrite-Key': API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 'unique()',
          email: payload.email,
          password: payload.password,
        }),
      });
      const userData = await userRes.json();
      if (!userRes.ok) {
        throw new Error(userData.message || 'User creation failed');
      }

      const response = await fetch(`${API_ENDPOINT}/account/sessions/email`, {
        method: 'POST',
        headers: {
          'X-Appwrite-Project': PROJECT_ID,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Login failed after signup');
      }

      context.commit('setUser', {
        token: data.$id,
        userId: data.userId,
      });
      localStorage.setItem('token', data.$id);
      localStorage.setItem('userId', data.userId);

    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  async login(context, payload) {
    try {
      const response = await fetch(`${API_ENDPOINT}/account/sessions/email`, {
        method: 'POST',
        headers: {
          'X-Appwrite-Project': PROJECT_ID,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        const error= new Error(data.message || 'Login failed');
        throw error;
      }

      context.commit('setUser', {
        token: data.$id,
        userId: data.userId,
      });
      localStorage.setItem('token', data.$id);
      localStorage.setItem('userId', data.userId);

    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  autoLogin(context) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (token && userId) {
      context.commit('setUser', { token, userId });
    }
  },
  logout(context) {
    context.commit('setUser', {
      token: null,
      userId: null,
    });
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }
};
