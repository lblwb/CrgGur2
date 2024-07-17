// store/user/account.js

export const state = () => {
  return {
    User: {
      Data: null, //
      Account: {
        Account_Role: {
          name: "Покупатель"
        }
      }
    }, Telegram: {
      UserId: 0
    }
  }
}

export const mutations = {
  SET_TG_USER_ID(state, payload = {id: 0}) {
    state.Telegram.UserId = payload.id
  }, //Set user role
  SET_USER_ACCOUNT_ROLE_NAME(state, payload = {name: "Покупатель"}) {
    state.User.Account.Account_Role.name = payload.name
  },
  SET_USER_DATA(state, payload = {userData: null}) {
    state.User.Data = payload.userData;
  }
}

export const actions = {
  async fetchUserData({commit}) {
    try {
      const {user} = await this.$axios.$get("/api/tg/user_info/");
      await commit('SET_USER_DATA', {userData: user});
    } catch (error) {
      console.error('Error fetching user data:', error);
      // Handle error if needed
    }
  },
  async fetchUserAccountByTgId(action_payload = {initData: null, tgId: 0}) {
    try {
      if (action_payload.initData !== null || action_payload.tgId !== 0) {
        this.SET_TG_USER_ID({id: action_payload.tgId});
        this.state.User.Data = await this.$axios.$post("/api/account/checkAccount", {
          hashAccId: this.state.Telegram.UserId,
          hash: "" //Хэш нужный для сверки
        })
      } else {
        console.error("[App][FetchUserAccount] Not Found Tg Id")
      }
    } catch (e) {
      console.error("[App][FetchUserAccount] Error:", e)
    }

  }
}

export const getters = {
  getInfUserData(state) {
    return state.User.Data
  },
  getModeExecUsr(state) {
    return state.User.Data && state.User.Data.exec_driver !== undefined ? state.User.Data.exec_driver : false;
  }
}
