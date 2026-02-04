import { defineStore } from 'pinia'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/services/firebase'
import { userLogin, userLogout, userRegister } from '@/services/auth.service'




export const useAuthStore = defineStore('authStore',{
	state: () => {
		return{
			loading : false,
			error : null,			 
			user :null,
			Token : null,

			inited: false,
    		initialized: false,
    		unsub: null,
		}
	},
	getters: {
		isLoggedIn: (state) => !!state.user,

	},
	actions :{	
 	async syncToken(currentUser) {
  		if (!currentUser) {
			this.Token = null
		return
  		}
  		this.Token= await currentUser.getIdToken()
	},

	initAuthListener() {
  		if (this.inited) return
  		this.inited = true

  		this.loading = true
  		this.unsub = onAuthStateChanged(auth, async (currentUser) => {
		this.user = currentUser

		try {
	  		await this.syncToken(currentUser)
		} finally {
			this.loading = false
		}
  		})
	},
		async login(email, password) {
			this.loading = true
			this.error = null
			
			try {
			  const res = await userLogin(email, password)
			    this.user = res.user
        		this.token = res.token
			  return res
			} catch (e) {
			  this.error = e
			  throw e
			} finally {
			  this.loading = false
			}
		  },
		
		async register(email, password) {
			this.loading = true
			this.error = null
			try {
			  const res = await userRegister(email, password)
			  this.user = res.user
			  this.Token = res.token
			  return res
			} catch (e) {
			  this.error = e
			  throw e
			} finally {
			  this.loading = false
			}
		  },
		async logout() {
			this.loading = true
		
			try {
			  await userLogout()
			  this.user = null
			  this.Token = null
			} catch (e) {
			  this.error = e
			  throw e
			} finally {
			  this.loading =false
			}
		  },
		
		 async refreshToken() {
			await this.syncToken(auth.currentUser)
			return this.Token
		  },
		  disposeListener() {
			if(this.unsub) {
				this.unsub()
				this.unsub = null
			}
			this.inited = false
		  }
	}
})