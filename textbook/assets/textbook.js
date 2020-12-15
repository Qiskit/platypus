
(function() {
  'use strict'

  const STORAGE_KEY = 'qiskit/textbook/course'

  const merge = (target, source) => {
    for (const key of Object.keys(source)) {
      if (target[key] instanceof Object) {
        const m = merge(target[key], source[key])
        Object.assign(source[key], m)
      }
    }
    Object.assign(target || {}, source)
    return target
  }

  const textbook = {
    storeUserData: function (data) {
      try {
        let userData = merge(this.getUserData(), data)
        const value = JSON.stringify(userData)
        window.localStorage.setItem(STORAGE_KEY, value)
        return true
      } catch (e) {
        console.error(e)
        return false
      }
    },

    getUserData: function () {
      let userData = {}
      try {
        const value = window.localStorage.getItem(STORAGE_KEY)
        userData = value ? JSON.parse(value) : {}
      } catch (e) {
        console.error(e)
      }
      return userData
    },

    initUserData: function (courseId, sectionId) {
      this.courseId = courseId
      this.sectionId = sectionId

      const userData = this.getUserData()
  
      if (courseId) {
        const progress = userData[courseId].progress
        for (let k in progress) {
          const elt = document.querySelector(`[data-section-id="${k}"] x-progress`)
          if (elt) {
            elt.setAttribute('p', progress[k])
          }
        }
        if (userData[courseId].activeStep) {
          const active = userData[courseId].activeStep[sectionId]
          if (active) {
            userData.activeStep = active
          }
        }
      }
  
      document.getElementById('userdata').innerText = JSON.stringify(userData)
    },

    runAfterDOMLoaded: function (cb) {
      if (document.readyState != 'loading') {
        cb()
      } else if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', cb)
      } else {
        document.attachEvent('onreadystatechange', function() {
          if (document.readyState == 'complete') cb()
        })
      }
    }
  }

  window.textbook = textbook
})();

